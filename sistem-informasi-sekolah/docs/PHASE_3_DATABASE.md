# Phase 3: Database & Schema - Complete Documentation

## 📋 Overview

Phase 3 implements the complete database schema, type definitions, service layer, and API routes for the Sistem Informasi Sekolah application.

---

## 🏗️ Architecture

```
API Routes (app/api/)
    ↓
Services (services/database.service.ts)
    ↓
Supabase Client (lib/supabase.ts)
    ↓
PostgreSQL Database
```

---

## 📁 Files Created

### 1. **docs/DATABASE_SCHEMA.sql** - Complete SQL Schema
- 9 tables with relationships
- Row-level security (RLS) policies
- Indexes for performance
- Triggers for automatic updated_at

### 2. **types/models.ts** - TypeScript Type Definitions
- All entity interfaces (Berita, Pengumuman, Galeri, etc.)
- Input/Output types
- API response types

### 3. **services/database.service.ts** - Database Service Layer
- Exported services: `beritaService`, `categoryService`, `pengumumanService`, `activityLogService`
- CRUD operations
- Search and filter functions

### 4. **app/api/berita/route.ts** - Berita API (GET, POST)
- Get published berita with pagination
- Search and filter by category
- Create new berita (admin only)

### 5. **app/api/berita/[slug]/route.ts** - Berita Detail API (GET, PUT, DELETE)
- Get berita by slug
- Update berita (admin only)
- Delete berita (admin only)

---

## 🗄️ Database Schema

### Tables Overview

```sql
┌─────────────────────────────────────────────────────────────┐
│                    Database Tables                          │
├─────────────────────────────────────────────────────────────┤
│ • categories              - News categories                 │
│ • berita                  - News articles                   │
│ • pengumuman              - Announcements                   │
│ • galeri                  - Photo galleries                 │
│ • gallery_images          - Images in gallery               │
│ • activity_log            - Admin activity tracking         │
│ • users_profile           - Extended user information       │
│ • berita_likes            - Article likes                   │
│ • berita_bookmarks        - Bookmarked articles            │
└─────────────────────────────────────────────────────────────┘
```

### Table Details

#### **categories**
```sql
id (UUID) → Primary Key
name (VARCHAR) → Unique category name
slug (VARCHAR) → URL-friendly slug (unique)
description (TEXT) → Optional description
created_at, updated_at (TIMESTAMP)

Indexes: idx_categories_slug
```

#### **berita**
```sql
id (UUID) → Primary Key
title (VARCHAR) → Article title
slug (VARCHAR) → URL-friendly slug (unique)
content (TEXT) → Article content (HTML)
excerpt (VARCHAR) → Short preview
featured_image (VARCHAR) → Image URL
category_id (UUID) → FK to categories
author_id (UUID) → FK to auth.users
status (VARCHAR) → 'draft' or 'published'
view_count (INTEGER) → View counter
like_count (INTEGER) → Like counter
published_at (TIMESTAMP) → Publication date
created_at, updated_at (TIMESTAMP)

Indexes: idx_berita_status, idx_berita_category_id, 
         idx_berita_author_id, idx_berita_published_at, 
         idx_berita_slug
```

#### **pengumuman**
```sql
id (UUID) → Primary Key
title (VARCHAR) → Announcement title
content (TEXT) → Announcement content
author_id (UUID) → FK to auth.users
status (VARCHAR) → 'draft' or 'published'
announcement_date (TIMESTAMP) → Announcement date
published_at (TIMESTAMP) → Publication date
created_at, updated_at (TIMESTAMP)

Indexes: idx_pengumuman_status, idx_pengumuman_author_id,
         idx_pengumuman_announcement_date
```

#### **galeri**
```sql
id (UUID) → Primary Key
title (VARCHAR) → Gallery title
description (TEXT) → Gallery description
author_id (UUID) → FK to auth.users
created_at, updated_at (TIMESTAMP)

Indexes: idx_galeri_author_id
```

#### **gallery_images**
```sql
id (UUID) → Primary Key
gallery_id (UUID) → FK to galeri (CASCADE delete)
image_url (VARCHAR) → Image URL/path
image_caption (VARCHAR) → Image caption
display_order (INTEGER) → Display order
created_at (TIMESTAMP)

Indexes: idx_gallery_images_gallery_id,
         idx_gallery_images_display_order
```

#### **activity_log**
```sql
id (UUID) → Primary Key
user_id (UUID) → FK to auth.users
action (VARCHAR) → 'create', 'update', 'delete', 'login', 'logout'
entity_type (VARCHAR) → 'berita', 'pengumuman', 'galeri', 'user'
entity_id (UUID) → ID of affected entity
details (JSONB) → Additional details (JSON)
ip_address (VARCHAR) → User IP address
user_agent (TEXT) → Browser info
created_at (TIMESTAMP)

Indexes: idx_activity_log_user_id, idx_activity_log_action,
         idx_activity_log_entity_type, idx_activity_log_created_at
```

#### **users_profile**
```sql
id (UUID) → Primary Key (FK to auth.users)
full_name (VARCHAR) → User full name
role (VARCHAR) → 'admin' or 'guest'
profile_image (VARCHAR) → Profile image URL
bio (TEXT) → User bio
last_login (TIMESTAMP) → Last login date
is_active (BOOLEAN) → Account active status
created_at, updated_at (TIMESTAMP)

Indexes: idx_users_profile_role
```

#### **berita_likes**
```sql
id (UUID) → Primary Key
berita_id (UUID) → FK to berita (CASCADE delete)
user_id (UUID) → FK to auth.users (CASCADE delete)
created_at (TIMESTAMP)
UNIQUE(berita_id, user_id) → Prevent duplicate likes
```

#### **berita_bookmarks**
```sql
id (UUID) → Primary Key
berita_id (UUID) → FK to berita (CASCADE delete)
user_id (UUID) → FK to auth.users (CASCADE delete)
created_at (TIMESTAMP)
UNIQUE(berita_id, user_id) → Prevent duplicate bookmarks
```

---

## 🔐 Row Level Security (RLS) Policies

### Categories
- **Public Read:** Anyone can read categories
- **Admin Write:** Only admins can create/update

### Berita
- **Public Read:** Anyone can read published articles
- **Admin Write:** Only admins can create/update articles

### Activity Log
- **Admin Read:** Only admins can view activity logs

### Bookmarks & Likes
- **User Manage Own:** Users can only manage their own bookmarks/likes
- **Admin View All:** Admins can view all bookmarks/likes

---

## 📦 Type Definitions (types/models.ts)

### Key Interfaces

```typescript
// Category
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Berita
interface Berita {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id?: string;
  author_id: string;
  status: "draft" | "published";
  view_count: number;
  like_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  category?: Category;
  author?: UserProfile;
}

// API Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
```

---

## 🔧 Service Layer (services/database.service.ts)

### beritaService

```typescript
// Get published berita with pagination
async getPublished(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>>

// Get berita by slug (with publication check)
async getBySlug(slug: string): Promise<Berita | null>

// Get all berita (admin - includes drafts)
async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>>

// Get berita by category
async getByCategory(categorySlug: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>>

// Create berita
async create(input: CreateBeritaInput, authorId: string): Promise<Berita>

// Update berita
async update(id: string, input: UpdateBeritaInput): Promise<Berita>

// Delete berita
async delete(id: string): Promise<void>

// Increment view count
async incrementViewCount(id: string): Promise<void>

// Search berita
async search(query: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>>
```

### categoryService

```typescript
// Get all categories
async getAll(): Promise<Category[]>

// Create category
async create(name: string, slug: string, description?: string): Promise<Category>

// Update category
async update(id: string, name?: string, description?: string): Promise<Category>

// Delete category
async delete(id: string): Promise<void>
```

### pengumumanService

```typescript
// Get published announcements
async getPublished(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Pengumuman>>

// Get all announcements (admin)
async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Pengumuman>>

// Create announcement
async create(title: string, content: string, announcementDate: string, authorId: string): Promise<Pengumuman>

// Update announcement
async update(id: string, updates: Partial<Pengumuman>): Promise<Pengumuman>

// Delete announcement
async delete(id: string): Promise<void>
```

### activityLogService

```typescript
// Get activity log (admin only)
async getAll(page: number = 1, limit: number = 20): Promise<PaginatedResponse<ActivityLog>>

// Log activity
async log(userId: string, action: string, entityType?: string, entityId?: string, details?: Record<string, any>): Promise<ActivityLog>
```

---

## 🌐 API Routes

### GET /api/berita
**Get published berita with pagination, search, and filter**

Query Parameters:
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10)
- `category` (string) - Filter by category slug
- `search` (string) - Search in title, excerpt, content

Response:
```json
{
  "success": true,
  "data": [{ berita objects }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "total_pages": 5
  }
}
```

### POST /api/berita
**Create new berita (Admin only)**

Request Body:
```json
{
  "title": "Berita Terbaru",
  "slug": "berita-terbaru",
  "content": "<p>Content HTML</p>",
  "excerpt": "Short preview",
  "featured_image": "https://...",
  "category_id": "uuid",
  "status": "draft"
}
```

Response:
```json
{
  "success": true,
  "data": { berita object },
  "message": "Berita created successfully"
}
```

### GET /api/berita/[slug]
**Get berita by slug (increments view count)**

Response:
```json
{
  "success": true,
  "data": { berita object }
}
```

### PUT /api/berita/[slug]
**Update berita (Admin only)**

Request Body:
```json
{
  "title": "Updated title",
  "content": "Updated content",
  "status": "published"
}
```

### DELETE /api/berita/[slug]
**Delete berita (Admin only)**

Response:
```json
{
  "success": true,
  "message": "Berita deleted successfully"
}
```

---

## 🔑 Setup Instructions

### Step 1: Run SQL Migration

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy content from `docs/DATABASE_SCHEMA.sql`
4. Paste in SQL Editor
5. Click **Run**

### Step 2: Verify Tables

1. Go to **Table Editor** in Supabase
2. Verify all tables created:
   - categories
   - berita
   - pengumuman
   - galeri
   - gallery_images
   - activity_log
   - users_profile
   - berita_likes
   - berita_bookmarks

### Step 3: Test API

```bash
# Get published berita
curl http://localhost:3000/api/berita

# Search berita
curl "http://localhost:3000/api/berita?search=judul"

# Get berita by category
curl "http://localhost:3000/api/berita?category=kategori-slug"

# Get berita by slug
curl http://localhost:3000/api/berita/berita-slug
```

---

## 💻 Usage Examples

### From React Component

```typescript
import { beritaService } from "@/services/database.service";

export function BeritaList() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const result = await beritaService.getPublished(1, 10);
        setBerita(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBerita();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {berita.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### From API Route

```typescript
// In server action or API route
import { beritaService } from "@/services/database.service";

const berita = await beritaService.getBySlug("berita-slug");
```

---

## 🔍 Query Examples

### Search Berita
```typescript
const results = await beritaService.search("sekolah", 1, 10);
```

### Get by Category
```typescript
const results = await beritaService.getByCategory("category-slug", 1, 10);
```

### Increment View Count
```typescript
await beritaService.incrementViewCount(beritaId);
```

### Log Activity
```typescript
import { activityLogService } from "@/services/database.service";

await activityLogService.log(
  userId,
  "create",
  "berita",
  beritaId,
  { title: "Berita Title" }
);
```

---

## 📊 Performance Optimizations

✅ **Implemented:**
- Indexes on foreign keys
- Indexes on frequently searched fields (slug, status)
- Indexes on sorting fields (published_at, created_at)
- UNIQUE constraints to prevent duplicates
- CASCADE deletes for data integrity

---

## 🔐 Security Features

✅ **Implemented:**
- Row Level Security (RLS) policies
- Role-based access control
- Admin-only operations validation
- Public/private data separation
- SQL injection prevention (via Supabase)

---

## ✅ Phase 3 Checklist

- [x] Database schema designed
- [x] SQL migrations created
- [x] Type definitions written
- [x] Service layer implemented
- [x] API routes created (GET, POST, PUT, DELETE)
- [x] RLS policies configured
- [x] Indexes for performance
- [x] Documentation complete

---

## 🔗 Next Steps (Phase 4)

### Core Features Implementation
- Berita CRUD UI (Admin)
- Pengumuman CRUD UI (Admin)
- Galeri Upload UI (Admin)
- Public Pages (Home, Berita List, Berita Detail)
- Category Filter & Search

---

## 📝 Code Statistics

```
Database Tables:        9
SQL Schema Lines:       300+
Type Definitions:       15+
Service Functions:      25+
API Routes:            2 files (5 endpoints)
Documentation:         500+ lines
```

---

**Phase 3 Status: ✅ COMPLETE**

All database infrastructure ready for Phase 4 (Core Features)!
