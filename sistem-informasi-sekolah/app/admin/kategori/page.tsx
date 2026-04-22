"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Category } from "@/types/models";

export default function KategoriPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <KategoriListAdmin />
    </ProtectedRoute>
  );
}

function KategoriListAdmin() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", nama: "Berita Sekolah", slug: "berita-sekolah", deskripsi: "Berita umum sekolah" },
    { id: "2", nama: "Pengumuman", slug: "pengumuman", deskripsi: "Pengumuman penting" },
    { id: "3", nama: "Prestasi", slug: "prestasi", deskripsi: "Prestasi siswa dan sekolah" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nama: "", slug: "", deskripsi: "" });

  const handleDelete = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    alert("Kategori berhasil dihapus");
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      nama: category.nama,
      slug: category.slug,
      deskripsi: category.deskripsi,
    });
  };

  const handleSave = () => {
    if (!formData.nama) {
      setError("Nama kategori harus diisi");
      return;
    }

    if (editingId) {
      setCategories(
        categories.map((c) =>
          c.id === editingId
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newId = (Math.max(...categories.map(c => parseInt(c.id) || 0)) + 1).toString();
      setCategories([...categories, { id: newId, ...formData }]);
    }

    setEditingId(null);
    setFormData({ nama: "", slug: "", deskripsi: "" });
    alert(editingId ? "Kategori berhasil diperbarui" : "Kategori berhasil ditambahkan");
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ nama: "", slug: "", deskripsi: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug
    if (name === "nama") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Kategori</h1>
          <p className="mt-2 text-gray-600">Kelola kategori berita sekolah</p>
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

        {/* Add/Edit Form */}
        {editingId !== null || true ? (
          <div className="mt-6 rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Kategori" : "Tambah Kategori Baru"}
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Kategori *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama kategori"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slug (URL-friendly)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="slug-kategori"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Diisi otomatis dari nama. Edit jika diperlukan.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi kategori"
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  {editingId ? "Simpan Perubahan" : "Tambah Kategori"}
                </button>
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Categories Table */}
        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {category.nama}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.deskripsi}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
      </div>
    </div>
  );
}
