# Sistem Informasi Sekolah - Setup Guide

## Phase 1: Setup Project ✅ COMPLETED

### ✨ What's Done
- ✅ Next.js 14+ initialized with App Router
- ✅ TypeScript configured
- ✅ ESLint enabled
- ✅ Tailwind CSS installed and configured
- ✅ Supabase JavaScript client installed
- ✅ Environment variables template created

### 📂 Project Structure
```
sistem-informasi-sekolah/
├── app/                  # Next.js App Router
├── components/           # Reusable React components
├── lib/                  # Utility and configuration files
│   └── supabase.ts      # Supabase client initialization
├── public/              # Static assets
├── .env.local           # Local environment variables (git ignored)
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

### 🔧 Environment Setup

#### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or login
3. Create a new project
4. Wait for project initialization

#### 2. Get Supabase Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 3. Configure .env.local
Copy the credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_NAME=Sistem Informasi Sekolah
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 🚀 Running the Project

```bash
# Navigate to project directory
cd sistem-informasi-sekolah

# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 📦 Installed Packages
- **next**: ^15.0.0
- **react**: ^19.0.0
- **typescript**: ^5.0.0
- **tailwindcss**: ^3.0.0
- **@supabase/supabase-js**: ^2.104.0

### ✅ Next Steps
After Phase 1 is complete:
1. Configure your Supabase credentials in `.env.local`
2. Move to **Phase 2: Authentication** to setup login system
3. Follow the development roadmap in DOKUMENTASI.md

### 📝 Notes
- Never commit `.env.local` to Git
- Use `.env.example` as template for other developers
- Tailwind CSS is already configured and ready to use
- Supabase client is initialized in `lib/supabase.ts`

---

**Status:** Phase 1 Setup Complete ✅
