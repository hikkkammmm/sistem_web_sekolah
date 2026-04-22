# Phase 2 - Code Architecture & Best Practices

## 🏗️ Architecture Overview

### Component Hierarchy
```
RootLayout
├── AuthProvider (Context)
│   ├── HomePage
│   ├── LoginPage
│   ├── AdminPage
│   │   └── ProtectedRoute
│   └── OtherPages
```

---

## 🎨 Design Patterns Used

### 1. Context Pattern (AuthContext)
**Purpose:** Share auth state globally without prop drilling

**Benefits:**
- Avoids passing props through multiple levels
- Single source of truth for auth state
- Easy to update all components when auth changes

**Implementation:**
```typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [state, setState] = useState<AuthState>({...});
  
  return (
    <AuthContext.Provider value={{...state, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Must be in provider");
  return context;
}
```

### 2. Custom Hook Pattern
**Purpose:** Encapsulate auth logic for reusability

**Benefits:**
- Clean component code
- Logic reusable across components
- Easy to test

**Usage:**
```typescript
const { user, loading, login, logout } = useAuth();
```

### 3. Middleware Pattern
**Purpose:** Server-side route protection

**Benefits:**
- Protects routes before rendering
- Works even with JavaScript disabled
- Prevents security leaks from client-side only protection

**Implementation:**
```typescript
export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  
  return NextResponse.next();
}
```

### 4. Component Wrapper Pattern (ProtectedRoute)
**Purpose:** Client-side protection with better UX

**Benefits:**
- Shows loading state
- Redirects if unauthorized
- Role-based access control

**Implementation:**
```typescript
export function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== requiredRole)) {
      router.push("/admin/login");
    }
  }, [user, loading]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;
  
  return <>{children}</>;
}
```

---

## 📦 State Management Strategy

### Auth State Structure
```typescript
interface AuthState {
  user: AuthUser | null;      // Current user data
  loading: boolean;           // Loading during async operations
  error: string | null;       // Error messages
}
```

### State Updates
1. **On Mount:** Check existing session
2. **On Login:** Fetch user data from DB
3. **On Logout:** Clear user state
4. **On Auth Change:** Listen via Supabase listener

### Real-time Sync
```typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  async (event, session) => {
    // Update state automatically
  }
);
```

---

## 🔐 Security Layers

### Layer 1: Supabase Auth
- **Password hashing:** Bcrypt on Supabase backend
- **Session management:** Secure tokens
- **Account verification:** Email verification available

### Layer 2: Middleware
- **Server-side check:** Before page render
- **Token validation:** Session verification
- **Redirect protection:** Prevent unauthorized access

### Layer 3: Client Components
- **ProtectedRoute wrapper:** Role-based access
- **useAuth hook:** Prevent direct API calls
- **Error handling:** User-friendly error messages

### Best Practices Implemented
```typescript
// ✅ GOOD: Check auth in middleware first
export async function middleware(request: NextRequest) {
  // Server-side protection before rendering
}

// ✅ GOOD: Double-check in component
export function ProtectedRoute({ children, requiredRole }) {
  // Client-side verification with loading state
}

// ✅ GOOD: Type-safe credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// ✅ GOOD: Error handling and user feedback
const [formError, setFormError] = useState("");
if (error) {
  setFormError(error); // Display to user
}
```

---

## 🎯 Code Organization Principles

### 1. Separation of Concerns
```
types/           → Type definitions only
contexts/        → State management logic
components/      → Reusable UI components
hooks/          → Logic encapsulation
app/            → Pages and routes
lib/            → Utilities and configurations
```

### 2. Single Responsibility
Each file handles one thing:
- `auth.ts` → Only type definitions
- `AuthContext.tsx` → Only auth state
- `ProtectedRoute.tsx` → Only route protection
- `LoginPage` → Only login UI

### 3. Reusability
```typescript
// ❌ NOT reusable: Hardcoded logic in component
export function AdminDashboard() {
  const session = await supabase.auth.getSession();
  // ...
}

// ✅ Reusable: Logic in context/hook
export function AdminDashboard() {
  const { user } = useAuth();
  // ...
}
```

---

## 🧪 Testing Strategy

### Manual Testing Scenarios

#### 1. Login Flow
```
Test Case: User login with valid credentials
Steps:
  1. Navigate to /admin/login
  2. Enter valid email and password
  3. Click "Login"
Expected:
  - Redirects to /admin
  - User email visible in navbar
  - Dashboard loads correctly
```

#### 2. Session Persistence
```
Test Case: Session persists on page refresh
Steps:
  1. Login
  2. Refresh page (F5)
  3. Check localStorage/auth
Expected:
  - Still logged in
  - User data loaded from DB
  - No re-login needed
```

#### 3. Protected Routes
```
Test Case: Non-authenticated users blocked
Steps:
  1. Logout
  2. Navigate to /admin/page
Expected:
  - Middleware redirects to login
  - Or component redirects after load
```

#### 4. Role-Based Access
```
Test Case: Non-admin users blocked from admin
Steps:
  1. Create user with "guest" role
  2. Login with guest account
  3. Try to access admin routes
Expected:
  - Redirected to home
  - Dashboard not accessible
```

---

## 📝 Code Style & Conventions

### Naming Conventions
```typescript
// ✅ Good
const { user, loading, error } = useAuth();
const handleSubmit = async (e) => { };
const isAdmin = user?.role === "admin";

// ❌ Avoid
const u = useAuth();
const onSub = async (e) => { };
const admin = user?.role === "admin";
```

### Component Structure
```typescript
"use client";  // Mark as client component if needed

import { ... };  // Imports at top

interface Props { }  // Type definitions

export default function MyComponent(props: Props) {
  // Hooks
  const { } = useAuth();
  
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => { }, []);
  
  // Handlers
  const handleEvent = () => { };
  
  // Render
  return <div>...</div>;
}
```

### Error Handling
```typescript
// ✅ Good: User-friendly messages
try {
  await login(credentials);
} catch (error) {
  setFormError("Email atau password salah");
}

// ✅ Good: Type-safe errors
const error = (err as Error).message;

// ❌ Avoid: Generic errors
catch (error) {
  console.log("Error");
}
```

---

## 🚀 Performance Optimizations

### 1. Session Check on Mount
```typescript
// Only check once when component mounts
useEffect(() => {
  checkAuth();
}, []); // Empty dependency array
```

### 2. Real-time Updates
```typescript
// Subscribe once, cleanup on unmount
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(...);
  return () => subscription?.unsubscribe();
}, []);
```

### 3. Lazy Loading
```typescript
// Protected components only render when authorized
if (!user || user.role !== requiredRole) {
  return null; // Don't render admin content for non-admins
}
```

### 4. Loading State
```typescript
// Show skeleton while loading
if (loading) {
  return <div className="animate-spin">Loading...</div>;
}
```

---

## 📚 Dependency Insights

### Supabase Client
- Handles authentication
- Manages session tokens
- Connects to PostgreSQL
- Real-time updates

### React Context API
- No external state library needed
- Built-in to React
- Sufficient for medium complexity
- Can upgrade to Redux later

### Next.js App Router
- Server-side rendering support
- Built-in middleware
- Route protection at server level
- Optimal performance

### TypeScript
- Type safety for auth state
- Prevents runtime errors
- Better IDE autocomplete
- Self-documenting code

---

## 🔄 Migration Path

### From Phase 2 to Phase 3
The architecture supports easy feature addition:

```typescript
// Example: Adding role check before DB operations
export async function POST(request: Request) {
  const { user } = await getAuthUser();  // Uses auth context
  
  if (user?.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Process request...
}
```

---

## 📖 Documentation Structure

```
docs/
├── PHASE_2_AUTHENTICATION.md  # Detailed code documentation
├── QUICK_REFERENCE.md         # Quick lookup guide
└── ARCHITECTURE.md            # This file
```

---

## ✨ Summary of Best Practices

✅ **Implemented in Phase 2:**
- Server-side and client-side protection layers
- Type-safe authentication system
- Real-time session management
- Separation of concerns
- Reusable components and hooks
- Error handling and user feedback
- Loading states and skeletons
- Clean code organization

---

**Architecture Documentation Complete ✅**
