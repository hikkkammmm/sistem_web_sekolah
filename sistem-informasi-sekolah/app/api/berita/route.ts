import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { beritaService } from "@/services/database.service";

// GET /api/berita - Get all published berita (public)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("search");

    let result;

    if (search) {
      result = await beritaService.search(search, page, limit);
    } else if (categorySlug) {
      result = await beritaService.getByCategory(categorySlug, page, limit);
    } else {
      result = await beritaService.getPublished(page, limit);
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          total_pages: result.total_pages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/berita error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to fetch berita",
      },
      { status: 500 }
    );
  }
}

// POST /api/berita - Create new berita (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check admin role
    const { data: user } = await supabase
      .from("users_profile")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (user?.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden - Admin only" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const berita = await beritaService.create(body, session.user.id);

    // Log activity
    const { activityLogService } = await import("@/services/database.service");
    await activityLogService.log(session.user.id, "create", "berita", berita.id, {
      title: berita.title,
    });

    return NextResponse.json(
      {
        success: true,
        data: berita,
        message: "Berita created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/berita error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to create berita",
      },
      { status: 500 }
    );
  }
}
