"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function PengumumanFormPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <PengumumanForm />
    </ProtectedRoute>
  );
}

function PengumumanForm() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const id = params.id as string;
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    announcement_date: new Date().toISOString().split("T")[0],
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch existing pengumuman if editing
  useEffect(() => {
    if (!isNew) {
      fetchPengumuman();
    }
  }, [id, isNew]);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      // API endpoint akan ditambahkan di backend
      // Untuk sekarang skip
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judul || !formData.isi) {
      setError("Judul dan isi pengumuman harus diisi");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        announcement_date: formData.announcement_date,
        status: formData.status,
      };

      // API endpoint akan ditambahkan di backend
      alert(isNew ? "Pengumuman berhasil dibuat!" : "Pengumuman berhasil diperbarui!");
      router.push("/admin/pengumuman");
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
            {isNew ? "Buat Pengumuman Baru" : "Edit Pengumuman"}
          </h1>
          <Link
            href="/admin/pengumuman"
            className="mt-2 inline-flex text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke Daftar Pengumuman
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
              Judul Pengumuman *
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Masukkan judul pengumuman"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tanggal Pengumuman */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Pengumuman
            </label>
            <input
              type="date"
              name="announcement_date"
              value={formData.announcement_date}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Isi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Isi Pengumuman *
            </label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Masukkan isi pengumuman lengkap"
              rows={8}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
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
              {saving ? "Menyimpan..." : isNew ? "Buat Pengumuman" : "Simpan Perubahan"}
            </button>
            <Link
              href="/admin/pengumuman"
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
