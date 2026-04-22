"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function GaleriFormPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <GaleriForm />
    </ProtectedRoute>
  );
}

function GaleriForm() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const id = params.id as string;
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    images: [] as string[],
  });
  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch existing galeri if editing
  useEffect(() => {
    if (!isNew) {
      fetchGaleri();
    }
  }, [id, isNew]);

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      // API endpoint akan ditambahkan di backend
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput],
      }));
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judul || formData.images.length === 0) {
      setError("Judul dan minimal satu gambar harus diisi");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        images: formData.images,
      };

      // API endpoint akan ditambahkan di backend
      alert(isNew ? "Galeri berhasil dibuat!" : "Galeri berhasil diperbarui!");
      router.push("/admin/galeri");
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
            {isNew ? "Buat Galeri Baru" : "Edit Galeri"}
          </h1>
          <Link
            href="/admin/galeri"
            className="mt-2 inline-flex text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke Daftar Galeri
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
              Judul Galeri *
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Masukkan judul galeri"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Masukkan deskripsi galeri"
              rows={4}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL Gambar *
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddImage();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                + Tambah
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Tekan Enter atau klik Tambah untuk menambahkan gambar
            </p>
          </div>

          {/* Preview Gambar */}
          {formData.images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gambar Terpilih ({formData.images.length})
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt={`Gambar ${idx + 1}`}
                      className="aspect-square w-full rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3C/svg%3E";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : isNew ? "Buat Galeri" : "Simpan Perubahan"}
            </button>
            <Link
              href="/admin/galeri"
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
