"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Berita } from "@/types/models";

export default function BeritaPublicPage() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 12;

  useEffect(() => {
    fetchBerita();
  }, [page, searchQuery]);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (searchQuery) {
        query.append("search", searchQuery);
      }

      const response = await fetch(`/api/berita?${query}`);
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      setBerita(data.data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Berita Sekolah</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-3 rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 rounded-lg bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : berita.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">Belum ada berita ditemukan.</p>
          </div>
        ) : (
          <div>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {berita.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition-shadow"
                >
                  {item.gambar && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {item.excerpt || item.isi}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </span>
                      <span>👁 {item.view_count || 0}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {berita.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  ← Sebelumnya
                </button>
                <span className="text-gray-600">Halaman {page}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={berita.length < limit}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
