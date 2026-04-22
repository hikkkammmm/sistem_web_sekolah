import { supabase } from "@/lib/supabase";
import {
  Berita,
  CreateBeritaInput,
  UpdateBeritaInput,
  Category,
  Pengumuman,
  Galeri,
  ActivityLog,
  PaginatedResponse,
} from "@/types/models";

// ============================================
// BERITA (News/Articles) Services
// ============================================

export const beritaService = {
  // Get all published berita with pagination
  async getPublished(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("berita")
      .select("*, categories(id, name, slug)", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Berita[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Get berita by slug
  async getBySlug(slug: string): Promise<Berita | null> {
    const { data, error } = await supabase
      .from("berita")
      .select("*, categories(id, name, slug)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error && error.code === "PGRST116") return null; // Not found
    if (error) throw error;

    return data as Berita;
  },

  // Get all berita (admin only - includes drafts)
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("berita")
      .select("*, categories(id, name, slug)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Berita[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Get berita by category
  async getByCategory(
    categorySlug: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Berita>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("berita")
      .select(
        "*, categories(id, name, slug)",
        { count: "exact" }
      )
      .eq("status", "published")
      .eq("categories.slug", categorySlug)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Berita[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Create berita
  async create(input: CreateBeritaInput, authorId: string): Promise<Berita> {
    const { data, error } = await supabase
      .from("berita")
      .insert([
        {
          ...input,
          author_id: authorId,
        },
      ])
      .select("*, categories(id, name, slug)")
      .single();

    if (error) throw error;
    return data as Berita;
  },

  // Update berita
  async update(id: string, input: UpdateBeritaInput): Promise<Berita> {
    const { data, error } = await supabase
      .from("berita")
      .update(input)
      .eq("id", id)
      .select("*, categories(id, name, slug)")
      .single();

    if (error) throw error;
    return data as Berita;
  },

  // Delete berita
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("berita")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Increment view count
  async incrementViewCount(id: string): Promise<void> {
    const { error } = await supabase.rpc("increment_view_count", { berita_id: id });
    if (error) throw error;
  },

  // Search berita
  async search(query: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Berita>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("berita")
      .select(
        "*, categories(id, name, slug)",
        { count: "exact" }
      )
      .eq("status", "published")
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Berita[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },
};

// ============================================
// CATEGORIES Services
// ============================================

export const categoryService = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    return data as Category[];
  },

  // Create category
  async create(name: string, slug: string, description?: string): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, slug, description }])
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  // Update category
  async update(id: string, name?: string, description?: string): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .update({ name, description })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  // Delete category
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

// ============================================
// PENGUMUMAN (Announcements) Services
// ============================================

export const pengumumanService = {
  // Get all published announcements
  async getPublished(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Pengumuman>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("pengumuman")
      .select("*, users_profile(id, full_name)", { count: "exact" })
      .eq("status", "published")
      .order("announcement_date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Pengumuman[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Get all announcements (admin)
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Pengumuman>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("pengumuman")
      .select("*, users_profile(id, full_name)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Pengumuman[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Create announcement
  async create(title: string, content: string, announcementDate: string, authorId: string): Promise<Pengumuman> {
    const { data, error } = await supabase
      .from("pengumuman")
      .insert([
        {
          title,
          content,
          announcement_date: announcementDate,
          author_id: authorId,
          status: "draft",
        },
      ])
      .select("*, users_profile(id, full_name)")
      .single();

    if (error) throw error;
    return data as Pengumuman;
  },

  // Update announcement
  async update(id: string, updates: Partial<Pengumuman>): Promise<Pengumuman> {
    const { data, error } = await supabase
      .from("pengumuman")
      .update(updates)
      .eq("id", id)
      .select("*, users_profile(id, full_name)")
      .single();

    if (error) throw error;
    return data as Pengumuman;
  },

  // Delete announcement
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("pengumuman")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

// ============================================
// ACTIVITY LOG Services
// ============================================

export const activityLogService = {
  // Get activity log (admin only)
  async getAll(page: number = 1, limit: number = 20): Promise<PaginatedResponse<ActivityLog>> {
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from("activity_log")
      .select("*, users_profile(id, full_name)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as ActivityLog[],
      page,
      limit,
      total: count || 0,
      total_pages: Math.ceil((count || 0) / limit),
    };
  },

  // Log activity
  async log(
    userId: string,
    action: string,
    entityType?: string,
    entityId?: string,
    details?: Record<string, any>
  ): Promise<ActivityLog> {
    const { data, error } = await supabase
      .from("activity_log")
      .insert([
        {
          user_id: userId,
          action,
          entity_type: entityType,
          entity_id: entityId,
          details,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as ActivityLog;
  },
};
