// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "guest";
  created_at: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  role?: "admin" | "guest";
}
