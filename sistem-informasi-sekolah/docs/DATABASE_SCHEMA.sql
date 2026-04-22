-- Phase 3: Database Schema Migrations
-- Run these SQL scripts in Supabase SQL Editor

-- ============================================
-- Table 1: categories (Kategori Berita)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================
-- Table 2: berita (News/Articles)
-- ============================================
CREATE TABLE IF NOT EXISTS berita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  featured_image VARCHAR(500),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft' or 'published'
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_berita_status ON berita(status);
CREATE INDEX idx_berita_category_id ON berita(category_id);
CREATE INDEX idx_berita_author_id ON berita(author_id);
CREATE INDEX idx_berita_published_at ON berita(published_at);
CREATE INDEX idx_berita_slug ON berita(slug);

-- ============================================
-- Table 3: pengumuman (Announcements)
-- ============================================
CREATE TABLE IF NOT EXISTS pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft' or 'published'
  announcement_date TIMESTAMP NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pengumuman_status ON pengumuman(status);
CREATE INDEX idx_pengumuman_author_id ON pengumuman(author_id);
CREATE INDEX idx_pengumuman_announcement_date ON pengumuman(announcement_date);

-- ============================================
-- Table 4: galeri (Gallery)
-- ============================================
CREATE TABLE IF NOT EXISTS galeri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_galeri_author_id ON galeri(author_id);

-- ============================================
-- Table 5: gallery_images (Gallery Images)
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES galeri(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  image_caption VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_gallery_images_gallery_id ON gallery_images(gallery_id);
CREATE INDEX idx_gallery_images_display_order ON gallery_images(display_order);

-- ============================================
-- Table 6: activity_log (Admin Activity Log)
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout'
  entity_type VARCHAR(100), -- 'berita', 'pengumuman', 'galeri', 'user'
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_action ON activity_log(action);
CREATE INDEX idx_activity_log_entity_type ON activity_log(entity_type);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);

-- ============================================
-- Table 7: users (Extended User Info)
-- ============================================
-- Note: Basic auth.users table dari Supabase Auth sudah ada
-- Kita buat extended table untuk additional info
CREATE TABLE IF NOT EXISTS users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'guest', -- 'admin', 'guest'
  profile_image VARCHAR(500),
  bio TEXT,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_users_profile_role ON users_profile(role);

-- ============================================
-- Table 8: berita_likes (For Like Feature)
-- ============================================
CREATE TABLE IF NOT EXISTS berita_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  berita_id UUID NOT NULL REFERENCES berita(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(berita_id, user_id) -- Prevent duplicate likes
);

-- Indexes
CREATE INDEX idx_berita_likes_berita_id ON berita_likes(berita_id);
CREATE INDEX idx_berita_likes_user_id ON berita_likes(user_id);

-- ============================================
-- Table 9: berita_bookmarks (For Bookmark Feature)
-- ============================================
CREATE TABLE IF NOT EXISTS berita_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  berita_id UUID NOT NULL REFERENCES berita(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(berita_id, user_id) -- Prevent duplicate bookmarks
);

-- Indexes
CREATE INDEX idx_berita_bookmarks_berita_id ON berita_bookmarks(berita_id);
CREATE INDEX idx_berita_bookmarks_user_id ON berita_bookmarks(user_id);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita_bookmarks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies
-- ============================================

-- Categories: Everyone can read, only admin can write
CREATE POLICY "Allow public read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow admin write categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

CREATE POLICY "Allow admin update categories"
  ON categories FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Berita: Everyone can read published, only admin can write
CREATE POLICY "Allow public read published berita"
  ON berita FOR SELECT
  USING (status = 'published' OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

CREATE POLICY "Allow admin write berita"
  ON berita FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

CREATE POLICY "Allow admin update berita"
  ON berita FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Activity Log: Only admin can read
CREATE POLICY "Allow admin read activity_log"
  ON activity_log FOR SELECT
  USING (auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

-- Users can manage their own bookmarks
CREATE POLICY "Allow user read own bookmarks"
  ON berita_bookmarks FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

CREATE POLICY "Allow user insert own bookmarks"
  ON berita_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can manage their own likes
CREATE POLICY "Allow user read own likes"
  ON berita_likes FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM users_profile WHERE role = 'admin'));

CREATE POLICY "Allow user insert own likes"
  ON berita_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Triggers for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_berita_updated_at BEFORE UPDATE ON berita
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pengumuman_updated_at BEFORE UPDATE ON pengumuman
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_galeri_updated_at BEFORE UPDATE ON galeri
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_profile_updated_at BEFORE UPDATE ON users_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- End of Schema Migration
-- ============================================
