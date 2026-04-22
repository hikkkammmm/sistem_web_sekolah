"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { AuthState, AuthUser, LoginCredentials, SignUpCredentials } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  signup: (credentials: SignUpCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Helper: fetch or auto-create user record in users table
  const getOrCreateUserRecord = async (
    sessionUser: { id: string; email?: string | null }
  ): Promise<AuthUser | null> => {
    // Try to fetch existing record
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("id, email, role, created_at")
      .eq("id", sessionUser.id)
      .single();

    if (!fetchError && userData) {
      return userData as AuthUser;
    }

    // Record not found (PGRST116) → auto-create with role 'admin'
    if (fetchError?.code === "PGRST116") {
      const newUser = {
        id: sessionUser.id,
        email: sessionUser.email ?? "",
        role: "admin" as const,
        created_at: new Date().toISOString(),
      };
      const { data: inserted, error: insertError } = await supabase
        .from("users")
        .insert([newUser])
        .select("id, email, role, created_at")
        .single();

      if (!insertError && inserted) {
        return inserted as AuthUser;
      }

      // Insert failed (e.g. RLS) → fallback using session data
      console.warn("Could not insert user record, using session fallback:", insertError?.message);
      return newUser;
    }

    // Other DB error → fallback using session data so login still works
    console.warn("Could not fetch user record, using session fallback:", fetchError?.message);
    return {
      id: sessionUser.id,
      email: sessionUser.email ?? "",
      role: "admin",
      created_at: new Date().toISOString(),
    };
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const userData = await getOrCreateUserRecord(session.user);
          setState({
            user: userData,
            loading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await getOrCreateUserRecord(session.user);
        setState({
          user: userData,
          loading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => subscription?.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
      throw error;
    }
  };

  const signup = async (credentials: SignUpCredentials) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp(credentials);
      if (authError) throw authError;

      if (authData.user) {
        // Create user record in database
        const { error: dbError } = await supabase.from("users").insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            role: credentials.role || "guest",
            created_at: new Date().toISOString(),
          },
        ]);

        if (dbError) throw dbError;
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
