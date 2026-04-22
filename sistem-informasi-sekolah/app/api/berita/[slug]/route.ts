import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { beritaService, activityLogService } from "@/services/database.service";

// GET /api/berita/[slug] - Get berita by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const berita = await beritaService.getBySlug(params.slug);

    if (!berita) {
      return NextResponse.json(
        { success: false, error: "Berita not found" },
        { status: 404 }
      );
    }

    // Increment view count asynchronously
    beritaService.incrementViewCount(berita.id).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        data: berita,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/berita/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to fetch berita",
      },
      { status: 500 }
    );
  }
}

// PUT /api/berita/[slug] - Update berita (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    // Get berita by slug
    const { data: berita } = await supabase
      .from("berita")
      .select("id")
      .eq("slug", params.slug)
      .single();

    if (!berita) {
      return NextResponse.json(
        { success: false, error: "Berita not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updated = await beritaService.update(berita.id, body);

    // Log activity
    await activityLogService.log(session.user.id, "update", "berita", berita.id, {
      title: updated.title,
    });

    return NextResponse.json(
      {
        success: true,
        data: updated,
        message: "Berita updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/berita/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to update berita",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/berita/[slug] - Delete berita (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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

    // Get berita by slug
    const { data: berita } = await supabase
      .from("berita")
      .select("id, title")
      .eq("slug", params.slug)
      .single();

    if (!berita) {
      return NextResponse.json(
        { success: false, error: "Berita not found" },
        { status: 404 }
      );
    }

    await beritaService.delete(berita.id);

    // Log activity
    await activityLogService.log(session.user.id, "delete", "berita", berita.id, {
      title: berita.title,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berita deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/berita/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to delete berita",
      },
      { status: 500 }
    );
  }
}
