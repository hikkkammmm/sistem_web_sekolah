# Phase 2 - Quick Reference Guide

## 🎯 Quick Navigation

### Core Auth Files
| File | Purpose | Key Function |
|------|---------|--------------|
| `types/auth.ts` | Type definitions | `AuthUser`, `AuthState`, `LoginCredentials` |
| `contexts/AuthContext.tsx` | Auth state management | `AuthProvider`, `useAuth()` |
| `hooks/useAuthHook.ts` | Custom hook | `useAuthHook()` |
| `components/ProtectedRoute.tsx` | Route protection | `ProtectedRoute` component |
| `middleware.ts` | Server-side protection | Route authorization |

### Page Files
| Path | Purpose | Protected |
|------|---------|-----------|
| `app/page.tsx` | Home page | No |
| `app/admin/login/page.tsx` | Login form | No |
| `app/admin/page.tsx` | Dashboard | Yes (Admin only) |
| `app/layout.tsx` | Root layout | - |

---

## 📌 Key Code Snippets

### 1. Using Auth in a Component
```typescript
"use client";

import { useAuth } from "@/contexts/AuthContext";

export function MyComponent() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout {user.email}</button>
      ) : (
        <button onClick={() => login({email, password})}>Login</button>
      )}
    </div>
  );
}
```

### 2. Creating Protected Page
```typescript
// app/admin/protected/page.tsx
"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProtectedPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Only admins can see this</div>
    </ProtectedRoute>
  );
}
```

### 3. Adding AuthProvider
```typescript
// app/layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

---

## 🔄 Data Flow

### Login Process
```
LoginForm (email, password)
  ↓
AuthContext.login()
  ↓
supabase.auth.signInWithPassword()
  ↓
Session created
  ↓
useAuth() updates
  ↓
Components re-render
```

### State Access
```
useAuth() {
  ├── user: AuthUser | null
  ├── loading: boolean
  ├── error: string | null
  ├── login: (creds) => Promise<void>
  ├── logout: () => Promise<void>
  └── signup: (creds) => Promise<void>
}
```

---

## 🚀 Commands

```bash
# Install dependencies (already done)
npm install @supabase/supabase-js

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📊 File Structure Added
```
docs/
  └── PHASE_2_AUTHENTICATION.md    # Detailed documentation

types/
  └── auth.ts                      # Auth types

contexts/
  └── AuthContext.tsx              # Auth provider & hook

hooks/
  └── useAuthHook.ts              # Custom auth hook

components/
  └── ProtectedRoute.tsx          # Protected route wrapper

app/
  ├── layout.tsx                  # Updated root layout
  ├── page.tsx                    # Updated home page
  ├── admin/
  │   ├── page.tsx                # Admin dashboard
  │   └── login/
  │       └── page.tsx            # Login page
  └── middleware.ts               # Route protection
```

---

## ✅ Setup Checklist

- [x] AuthContext created with useAuth hook
- [x] Login page UI built
- [x] Protected routes implemented
- [x] Middleware for server-side protection
- [x] Admin dashboard created
- [x] Home page updated with auth UI
- [x] AuthProvider integrated in root layout
- [x] TypeScript types defined
- [x] Documentation created

---

## 🔗 Related Documentation
- Main: [DOKUMENTASI.md](../DOKUMENTASI.md)
- Setup: [SETUP_GUIDE.md](../SETUP_GUIDE.md)
- Phase 2 Detailed: [PHASE_2_AUTHENTICATION.md](./PHASE_2_AUTHENTICATION.md)

---

**Last Updated:** Phase 2 Complete
