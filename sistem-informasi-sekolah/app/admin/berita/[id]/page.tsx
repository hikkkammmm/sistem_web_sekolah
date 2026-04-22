"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Berita, Category } from "@/types/models";

export default function BeritaFormPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <BeritaForm />
    </ProtectedRoute>
  );
}

function BeritaForm() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const id = params.id as string;
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    judul: "",
    slug: "",
    excerpt: "",
    isi: "",
    kategori_id: "",
    status: "draft",
    gambar: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch existing berita if editing
  useEffect(() => {
    if (!isNew) {
      fetchBerita();
    }
    fetchCategories();
  }, [id, isNew]);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      // Need slug, let's fetch from list first
      const listResponse = await fetch(`/api/berita`);
      if (listResponse.ok) {
        const listData = await listResponse.json();
        const item = listData.data?.find((b: Berita) => b.id === id);
        if (item) {
          setFormData({
            judul: item.judul,
            slug: item.slug,
            excerpt: item.excerpt || "",
            isi: item.isi,
            kategori_id: item.kategori_id || "",
            status: item.status,
            gambar: item.gambar || "",
          });
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // For now, we'll create a simple category list
      // In production, you'd fetch from /api/kategori
      const mockCategories: Category[] = [
        { id: "1", nama: "Berita Sekolah", slug: "berita-sekolah", deskripsi: "" },
        { id: "2", nama: "Pengumuman", slug: "pengumuman", deskripsi: "" },
        { id: "3", nama: "Prestasi", slug: "prestasi", deskripsi: "" },
      ];
      setCategories(mockCategories);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from judul
    if (name === "judul") {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judul || !formData.isi) {
      setError("Judul dan isi berita harus diisi");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        judul: formData.judul,
        slug: formData.slug,
        excerpt: formData.excerpt,
        isi: formData.isi,
        kategori_id: formData.kategori_id || null,
        status: formData.status,
        gambar: formData.gambar,
      };

      let response;
      if (isNew) {
        response = await fetch("/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // For update, we need to use slug
        const slug = formData.slug;
        response = await fetch(`/api/berita/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menyimpan berita");
      }

      alert(isNew ? "Berita berhasil dibuat!" : "Berita berhasil diperbarui!");
      router.push("/admin/berita");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isNew ? "Buat Berita Baru" : "Edit Berita"}
          </h1>
          <Link
            href="/admin/berita"
            className="mt-2 inline-flex text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke Daftar Berita
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-8 shadow">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul Berita *
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug (URL-friendly)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="slug-berita"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Diisi otomatis dari judul. Edit jika diperlukan.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              name="kategori_id"
              value={formData.kategori_id}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ringkasan
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Ringkasan singkat berita (opsional)"
              rows={2}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Isi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Isi Berita *
            </label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Masukkan isi berita lengkap"
              rows={8}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Saat ini mendukung teks biasa. Format HTML akan didukung di fase berikutnya.
            </p>
          </div>

          {/* Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL Gambar
            </label>
            <input
              type="url"
              name="gambar"
              value={formData.gambar}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {formData.gambar && (
              <div className="mt-2">
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg"
                  onError={() => (
                    <div className="mt-2 text-sm text-red-600">
                      URL gambar tidak valid
                    </div>
                  )}
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="draft">Draft (Belum Dipublikasikan)</option>
              <option value="published">Dipublikasikan</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : isNew ? "Buat Berita" : "Simpan Perubahan"}
            </button>
            <Link
              href="/admin/berita"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
