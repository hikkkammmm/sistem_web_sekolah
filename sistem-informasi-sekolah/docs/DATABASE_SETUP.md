# Phase 3: Database Setup - Quick Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Run SQL Migration

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click **SQL Editor** in left sidebar
   - Click **New query**

3. **Copy & Paste Schema**
   - Open file: `docs/DATABASE_SCHEMA.sql`
   - Copy all SQL content
   - Paste into SQL Editor
   - Click **Run**

4. **Verify**
   - Go to **Table Editor**
   - Should see 9 new tables

### Step 2: Create Test Data (Optional)

```sql
-- Create test category
INSERT INTO categories (name, slug, description) 
VALUES ('Berita Sekolah', 'berita-sekolah', 'Berita umum sekolah');

-- Create test berita
INSERT INTO berita (
  title, slug, content, excerpt, category_id, 
  author_id, status, published_at
) VALUES (
  'Selamat Datang di Sistem Informasi Sekolah',
  'selamat-datang-sistem',
  '<p>Ini adalah artikel pertama</p>',
  'Artikel pertama kami',
  (SELECT id FROM categories WHERE slug = 'berita-sekolah'),
  'your-admin-user-id', -- Replace with actual admin user ID
  'published',
  NOW()
);
```

---

## 📊 File Structure

```
/docs
├── DATABASE_SCHEMA.sql           ← SQL migrations
├── PHASE_3_DATABASE.md           ← Detailed docs
└── DATABASE_SETUP.md             ← This file

/types
└── models.ts                     ← Type definitions

/services
└── database.service.ts           ← Database functions

/app/api
├── berita/
│   ├── route.ts                 ← GET, POST
│   └── [slug]/
│       └── route.ts             ← GET, PUT, DELETE
└── (future: pengumuman, galeri)
```

---

## 🧪 Testing

### Test via cURL

```bash
# Get all berita
curl http://localhost:3000/api/berita

# Get berita by slug
curl http://localhost:3000/api/berita/selamat-datang-sistem

# Search berita
curl "http://localhost:3000/api/berita?search=sekolah"

# Filter by category
curl "http://localhost:3000/api/berita?category=berita-sekolah"
```

### Test via Browser

1. Open http://localhost:3000/api/berita
2. Should see JSON response with berita data

---

## 🔑 Key Features

✅ **Database**
- 9 tables with relationships
- Row Level Security (RLS)
- Auto-increment timestamps
- Comprehensive indexes

✅ **API**
- RESTful endpoints
- Pagination support
- Search functionality
- Category filtering
- Admin authentication

✅ **Service Layer**
- CRUD operations
- Error handling
- Type-safe queries
- Activity logging

---

## ⚠️ Troubleshooting

### Error: "Missing Supabase environment variables"
→ Make sure `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "Unauthorized" on POST /api/berita
→ Make sure you're logged in as admin user before creating berita

### Error: "Relation does not exist"
→ SQL migration may have failed. Check Supabase SQL Editor for errors

### Error: "Row not found" on PUT/DELETE
→ Make sure the berita slug exists

---

## 📖 API Documentation

### Endpoints Overview

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | /api/berita | None | List berita |
| POST | /api/berita | Admin | Create berita |
| GET | /api/berita/[slug] | None | Get berita detail |
| PUT | /api/berita/[slug] | Admin | Update berita |
| DELETE | /api/berita/[slug] | Admin | Delete berita |

---

## 🎯 Next Steps

1. ✅ Run SQL migration
2. ✅ Test API endpoints
3. → **Phase 4: Build UI for CRUD operations**

---

**Setup Complete! Ready for Phase 4 ✅**
