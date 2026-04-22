"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Galeri } from "@/types/models";

export default function GaleriPublicPage() {
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGaleri, setSelectedGaleri] = useState<Galeri | null>(null);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      // API endpoint akan dibuat di backend
      setGaleri([]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      
      {/* 1. HERO SECTION (Premium Header) */}
      <header className="bg-slate-900 pb-24 pt-10 sm:pt-16 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-500/30">
                Dokumentasi
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Galeri Kegiatan
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Jelajahi momen berharga, prestasi, dan berbagai aktivitas membanggakan dari civitas akademika SMAN 1 Nusantara.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-24">
        
        {/* Error Message */}
        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 shadow-sm">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Loading State (Premium Skeleton) */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 animate-pulse">
                <div className="h-48 rounded-xl bg-slate-200 mb-4" />
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-1/4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : galeri.length === 0 ? (
          
          /* Empty State Elite */
          <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
              <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum Ada Galeri</h3>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Belum ada foto kegiatan yang diunggah saat ini. Silakan kunjungi kembali halaman ini di lain waktu.
            </p>
          </div>

        ) : (
          
          /* Gallery Grid */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galeri.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGaleri(item)}
                className="group cursor-pointer flex flex-col rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                {/* Image Box */}
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                  {/* Glassmorphism Photo Count Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                    </svg>
                    {item.images?.length || 0} Foto
                  </div>

                  {item.images && item.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.images[0]}
                      alt={item.judul}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Gambar tidak tersedia</span>
                    </div>
                  )}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.judul}
                  </h3>
                  {/* Jika Anda punya data deskripsi singkat, bisa ditaruh di sini */}
                  <p className="mt-2 text-sm text-slate-500 flex items-center gap-1 font-medium">
                    Lihat Koleksi <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">›</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. MODAL PREVIEW (Lightbox Elite) */}
      {selectedGaleri && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 opacity-100 transition-opacity"
          onClick={() => setSelectedGaleri(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-white z-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedGaleri.judul}</h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                  {selectedGaleri.deskripsi || "Tidak ada deskripsi untuk galeri ini."}
                </p>
              </div>
              <button
                onClick={() => setSelectedGaleri(null)}
                className="p-2 ml-4 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                title="Tutup Preview"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Scrollable Image Grid) */}
            <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
              {selectedGaleri.images && selectedGaleri.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedGaleri.images.map((img, idx) => (
                    <div key={idx} className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${selectedGaleri.judul} - Foto ${idx + 1}`}
                        className="w-full h-auto object-contain bg-slate-100"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Tidak ada foto dalam galeri ini.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}