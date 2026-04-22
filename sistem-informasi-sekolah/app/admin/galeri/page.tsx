"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Galeri } from "@/types/models";

export default function GaleriPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <GaleriListAdmin />
    </ProtectedRoute>
  );
}

function GaleriListAdmin() {
  const { user } = useAuth();
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchGaleri();
  }, [page]);

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      // API endpoint untuk galeri akan dibuat di backend
      setGaleri([]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus galeri ini?")) return;

    try {
      setGaleri(galeri.filter((g) => g.id !== id));
      alert("Galeri berhasil dihapus");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Galeri</h1>
            <p className="mt-2 text-gray-600">Kelola galeri kegiatan sekolah</p>
          </div>
          <Link
            href="/admin/galeri/new"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Tambah Galeri
          </Link>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : galeri.length === 0 ? (
          <div className="mt-6 rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">Belum ada galeri. Silakan buat yang baru.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galeri.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200">
                  {item.images && item.images[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.judul}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Tidak ada gambar
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{item.judul}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {item.deskripsi}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/admin/galeri/${item.id}`}
                      className="flex-1 rounded bg-blue-100 px-3 py-2 text-center text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 rounded bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
