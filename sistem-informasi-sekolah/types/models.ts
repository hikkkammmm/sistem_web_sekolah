// Model/Database Type Definitions

// ============================================
// Categories
// ============================================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
}

// ============================================
// Berita (Articles)
// ============================================
export interface Berita {
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

export interface CreateBeritaInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id?: string;
  status?: "draft" | "published";
}

export interface UpdateBeritaInput extends Partial<CreateBeritaInput> {}

// ============================================
// Pengumuman (Announcements)
// ============================================
export interface Pengumuman {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: "draft" | "published";
  announcement_date: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  author?: UserProfile;
}

export interface CreatePengumumanInput {
  title: string;
  content: string;
  announcement_date: string;
  status?: "draft" | "published";
}

export interface UpdatePengumumanInput extends Partial<CreatePengumumanInput> {}

// ============================================
// Galeri (Gallery)
// ============================================
export interface GalleryImage {
  id: string;
  gallery_id: string;
  image_url: string;
  image_caption?: string;
  display_order: number;
  created_at: string;
}

export interface Galeri {
  id: string;
  title: string;
  description?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  // Relations
  images?: GalleryImage[];
  author?: UserProfile;
}

export interface CreateGaleriInput {
  title: string;
  description?: string;
  images?: File[];
}

export interface UpdateGaleriInput extends Partial<CreateGaleriInput> {}

// ============================================
// Activity Log
// ============================================
export type ActivityAction = "create" | "update" | "delete" | "login" | "logout";
export type EntityType = "berita" | "pengumuman" | "galeri" | "user" | "category";

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: ActivityAction;
  entity_type?: EntityType;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  // Relations
  user?: UserProfile;
}

export interface CreateActivityLogInput {
  action: ActivityAction;
  entity_type?: EntityType;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

// ============================================
// User Profile
// ============================================
export interface UserProfile {
  id: string;
  full_name?: string;
  role: "admin" | "guest";
  profile_image?: string;
  bio?: string;
  last_login?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserProfileInput extends Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">> {}

// ============================================
// Likes
// ============================================
export interface BeritaLike {
  id: string;
  berita_id: string;
  user_id: string;
  created_at: string;
}

// ============================================
// Bookmarks
// ============================================
export interface BeritaBookmark {
  id: string;
  berita_id: string;
  user_id: string;
  created_at: string;
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
