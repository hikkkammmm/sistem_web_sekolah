"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Pengumuman } from "@/types/models";

export default function PengumumanPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <PengumumanListAdmin />
    </ProtectedRoute>
  );
}

function PengumumanListAdmin() {
  const { user } = useAuth();
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchPengumuman();
  }, [page]);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      // Note: API endpoint untuk pengumuman akan dibuat di backend
      // Untuk sekarang kami simulate dengan data kosong
      setPengumuman([]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) return;

    try {
      // API call akan ditambahkan di backend
      setPengumuman(pengumuman.filter((p) => p.id !== id));
      alert("Pengumuman berhasil dihapus");
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
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengumuman</h1>
            <p className="mt-2 text-gray-600">Kelola semua pengumuman sekolah</p>
          </div>
          <Link
            href="/admin/pengumuman/new"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Tambah Pengumuman
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
          <div className="mt-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : pengumuman.length === 0 ? (
          <div className="mt-6 rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600">Belum ada pengumuman. Silakan buat yang baru.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Tanggal Pengumuman
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Dibuat
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pengumuman.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{item.judul}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status === "published" ? "Dipublikasikan" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.announcement_date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/pengumuman/${item.id}`}
                          className="inline-block rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
