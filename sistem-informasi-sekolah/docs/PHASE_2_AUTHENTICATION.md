# Phase 2: Authentication System - Code Documentation

## 📋 Overview

Phase 2 implements a complete authentication system using Supabase Auth integrated with a custom React Context for state management. This documentation covers all code created for authentication functionality.

---

## 🏗️ Architecture

```
User (Client)
    ↓
[Login Form] → [AuthContext] → [useAuth Hook]
    ↓
[Supabase Auth Client]
    ↓
[Supabase Backend]
    ↓
[PostgreSQL Database - users table]
```

---

## 📁 Files Created & Structure

```
sistem-informasi-sekolah/
├── types/
│   └── auth.ts                    # TypeScript types for authentication
├── contexts/
│   └── AuthContext.tsx            # React Context for auth state management
├── hooks/
│   └── useAuthHook.ts            # Custom hook for using auth context
├── components/
│   └── ProtectedRoute.tsx         # Component wrapper for route protection
├── app/
│   ├── layout.tsx                 # Updated with AuthProvider
│   ├── page.tsx                   # Home page with auth UI
│   └── admin/
│       ├── page.tsx               # Protected admin dashboard
│       └── login/
│           └── page.tsx           # Login page
├── middleware.ts                  # Route protection middleware
└── lib/
    └── supabase.ts               # Supabase client initialization
```

---

## 🔑 Core Files Explanation

### 1. **types/auth.ts** - Type Definitions

```typescript
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
```

**Purpose:** Provides strict TypeScript types for:
- `AuthUser`: Represents authenticated user with role-based access
- `AuthState`: Tracks user, loading, and error states
- `LoginCredentials`: Type-safe login form data

---

### 2. **contexts/AuthContext.tsx** - Auth State Management

**Key Features:**

#### a) Context Creation
```typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);
```
- Creates a React Context for global auth state
- Provides auth state and methods to all child components

#### b) AuthProvider Component
```typescript
export function AuthProvider({ children }: { children: ReactNode })
```
- Wrapper component that initializes auth state
- Checks session on mount (`useEffect`)
- Listens for auth changes in real-time

#### c) Session Check Logic
```typescript
const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    const { data: userData } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("id", session.user.id)
      .single();
    // Set user state...
  }
};
```
- Gets current session from Supabase
- Fetches user data from PostgreSQL table
- Handles session restoration on page refresh

#### d) Auth Methods

**Login Method:**
```typescript
const login = async (credentials: LoginCredentials) => {
  const { error } = await supabase.auth.signInWithPassword(credentials);
  // Handle error and update state
};
```
- Authenticates user with email/password
- Supabase handles password hashing and verification

**Logout Method:**
```typescript
const logout = async () => {
  const { error } = await supabase.auth.signOut();
  setState({ user: null, loading: false, error: null });
};
```
- Clears auth session
- Resets user state to null

**Signup Method:**
```typescript
const signup = async (credentials: SignUpCredentials) => {
  const { data: authData } = await supabase.auth.signUp(credentials);
  // Create user record in database
  await supabase.from("users").insert([{
    id: authData.user.id,
    email: authData.user.email,
    role: credentials.role || "guest",
    created_at: new Date().toISOString(),
  }]);
};
```
- Creates new Supabase auth user
- Creates corresponding record in users table

#### e) Real-time Auth Listener
```typescript
supabase.auth.onAuthStateChange(async (event, session) => {
  // Update state when auth changes
});
```
- Listens for login/logout events
- Updates component automatically

#### f) useAuth Hook
```typescript
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```
- Custom hook to access auth context
- Throws error if used outside AuthProvider
- Prevents accidental misuse

---

### 3. **app/admin/login/page.tsx** - Login Page

**Features:**

#### Form State Management
```typescript
const [formData, setFormData] = useState({
  email: "",
  password: "",
});
```
- Tracks email and password inputs
- Updates on user input

#### Form Submission
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await login(formData);
  router.push("/admin");
};
```
- Calls `login()` from auth context
- Redirects to admin dashboard on success
- Displays errors if login fails

#### UI Components
- Error alert display
- Email input field
- Password input field
- Loading button state
- Link to home page

**Design:** Modern, clean login form with:
- Centered layout
- Tailwind CSS styling
- Responsive design
- Loading state management

---

### 4. **app/admin/page.tsx** - Protected Admin Dashboard

**Key Features:**

#### Protected Route Wrapper
```typescript
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```
- Wraps component with `ProtectedRoute`
- Ensures only admins can access

#### Dashboard Components
- **Navigation Bar:** Shows user email and logout button
- **Quick Stats:** Displays counters for content (berita, pengumuman, galeri, users)
- **Menu Utama:** Links to admin features (to be implemented in future phases)

#### Logout Functionality
```typescript
const handleLogout = async () => {
  await logout();
  router.push("/");
};
```
- Calls logout from auth context
- Redirects to home page

---

### 5. **components/ProtectedRoute.tsx** - Route Protection

**Purpose:** Ensures only authorized users can access admin pages

**Logic Flow:**
```typescript
useEffect(() => {
  if (!loading && !user) {
    router.push("/admin/login");  // Redirect to login
  } else if (!loading && user && user.role !== requiredRole) {
    router.push("/");              // Redirect to home if wrong role
  }
}, [user, loading, router, requiredRole]);
```

**Features:**
- Checks if user exists
- Verifies user role matches requirement
- Shows loading spinner while checking
- Returns null if unauthorized

---

### 6. **middleware.ts** - Server-side Route Protection

**Purpose:** Server-level protection before page loads

```typescript
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Features:**
- Checks session before rendering page
- Prevents access to `/admin/*` routes without login
- Config matcher specifies which routes to protect

---

### 7. **app/layout.tsx** - Root Layout with AuthProvider

```typescript
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

**Purpose:**
- Wraps entire app with AuthProvider
- Makes auth context available to all pages
- Must be at root level for global access

---

### 8. **app/page.tsx** - Home Page with Auth UI

**Features:**
- Displays different UI based on auth state
- Shows "Login" button if not authenticated
- Shows user email and "Dashboard" button if authenticated
- Features grid showcasing app modules
- Navigation header

**Auth-aware Navigation:**
```typescript
{user ? (
  <>
    <span>{user.email}</span>
    <Link href="/admin">Dashboard</Link>
  </>
) : (
  <Link href="/admin/login">Login</Link>
)}
```

---

## 🔐 Authentication Flow Diagram

### Login Flow
```
1. User enters email/password
   ↓
2. Clicks "Login" button
   ↓
3. AuthContext.login() called
   ↓
4. Supabase Auth verifies credentials
   ↓
5. If valid → Session created
   ↓
6. AuthContext updates user state
   ↓
7. redirect("/admin") → Admin dashboard
```

### Session Restoration Flow
```
1. Page refresh/reload
   ↓
2. RootLayout renders with AuthProvider
   ↓
3. AuthProvider.useEffect checks session
   ↓
4. Supabase.auth.getSession() called
   ↓
5. If session exists → Fetch user from DB
   ↓
6. AuthContext updates user state
   ↓
7. Components re-render with user data
```

### Protected Route Flow
```
1. User tries to access /admin
   ↓
2. middleware.ts checks session
   ↓
3. If no session → Redirect to /admin/login
   ↓
4. If session exists → Page loads
   ↓
5. ProtectedRoute component verifies role
   ↓
6. If admin → Show dashboard
   ↓
7. If not admin → Redirect to home
```

---

## 🗄️ Database Schema (users table)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,           -- From Supabase Auth
  email VARCHAR(255) NOT NULL,   -- User email
  role VARCHAR(50) NOT NULL,     -- "admin" or "guest"
  created_at TIMESTAMP,          -- Account creation date
);
```

**Setup in Supabase:**
1. Go to SQL Editor
2. Run the above query
3. Set row-level security (RLS) policies if needed

---

## 🔌 Integration Points

### Supabase Configuration
```typescript
// lib/supabase.ts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### Required Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚀 How to Use in Components

### Simple Usage
```typescript
"use client";
import { useAuth } from "@/contexts/AuthContext";

export function MyComponent() {
  const { user, loading, error, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes
```typescript
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin Content Only</div>
    </ProtectedRoute>
  );
}
```

---

## ✅ Phase 2 Completion Checklist

- ✅ Supabase Auth integration
- ✅ Custom AuthContext with hooks
- ✅ Login page UI
- ✅ Protected routes (client-side)
- ✅ Middleware protection (server-side)
- ✅ Admin dashboard
- ✅ Home page with auth UI
- ✅ Session persistence
- ✅ Real-time auth state updates
- ✅ TypeScript types

---

## 📝 Testing Guide

### Test Login
1. Go to `http://localhost:3000/admin/login`
2. Enter test credentials
3. Should redirect to `/admin` dashboard
4. User email shown in navbar

### Test Session Persistence
1. Login
2. Refresh page
3. Should stay logged in
4. User data preserved

### Test Protected Routes
1. Logout
2. Try to access `http://localhost:3000/admin`
3. Should redirect to `/admin/login`

### Test Role-Based Access
1. Create users with different roles
2. Login with each
3. Verify access control

---

## 🔐 Security Notes

1. **Never expose secret keys:** Use `NEXT_PUBLIC_` only for public keys
2. **Validate on backend:** Always validate auth in API routes
3. **Secure cookies:** Supabase handles auth tokens securely
4. **CORS setup:** Configure Supabase for your domain
5. **Row-level security:** Use PostgreSQL RLS for data access control

---

## 🔗 Next Steps (Phase 3)

- Database schema creation for content tables
- Create tables: berita, pengumuman, galeri, kategori
- Setup relationships and indexes
- Create API routes for CRUD operations

---

**Phase 2 Documentation Complete ✅**
