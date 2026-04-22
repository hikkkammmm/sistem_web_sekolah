"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Berita } from "@/types/models";

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBerita();
  }, [slug]);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/berita/${slug}`);
      if (!response.ok) throw new Error("Berita tidak ditemukan");
      const data = await response.json();
      setBerita(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="h-10 rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg bg-white p-8 text-center">
            <p className="text-red-600">{error || "Berita tidak ditemukan"}</p>
            <Link href="/berita" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              ← Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/berita" className="text-blue-600 hover:text-blue-700">
            ← Kembali ke Berita
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <article className="rounded-lg bg-white p-8 shadow">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">{berita.judul}</h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-4 border-b pb-4 text-sm text-gray-600">
            <span>
              📅 {new Date(berita.created_at).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>👁 {berita.view_count || 0} views</span>
            <span>❤️ {berita.like_count || 0} likes</span>
          </div>

          {/* Featured Image */}
          {berita.gambar && (
            <div className="mt-8 overflow-hidden rounded-lg">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full"
              />
            </div>
          )}

          {/* Excerpt */}
          {berita.excerpt && (
            <div className="mt-8 rounded-lg bg-gray-100 p-4 text-lg italic text-gray-700">
              {berita.excerpt}
            </div>
          )}

          {/* Content */}
          <div className="mt-8 prose prose-sm max-w-none text-gray-700">
            {berita.isi.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 border-t pt-8">
            <div className="flex items-center gap-4">
              <button className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200">
                ❤️ Suka
              </button>
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
                🔖 Simpan
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Berita Terkait</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="rounded-lg bg-white p-4 shadow hover:shadow-lg">
                <h3 className="font-semibold text-gray-900">Berita Terkait {i + 1}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  Deskripsi berita terkait akan ditampilkan di sini...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
