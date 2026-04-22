"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pengumuman } from "@/types/models";

export default function PengumumanPublicPage() {
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      // Simulasi fetch API
      setTimeout(() => setPengumuman([]), 1500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. HERO SECTION & SEARCH BAR */}
      <div className="bg-slate-900 relative overflow-hidden">
        {/* Background Pattern (Subtle Grid) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-40"></div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8 group">
            <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Beranda
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-500/30">
                Pusat Informasi
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Papan Pengumuman
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Akses cepat ke seluruh edaran resmi, jadwal akademik, dan informasi terkini dari SMAN 1 Nusantara.
              </p>
            </div>

            {/* Search Box - Floating right */}
            <div className="w-full lg:w-96">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-800 transition-all backdrop-blur-sm"
                  placeholder="Cari pengumuman..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (SIDEBAR + CONTENT) */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- SIDEBAR KIRI --- */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Kategori */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Kategori
              </h3>
              <ul className="space-y-2">
                {['Semua Pengumuman', 'Akademik', 'Kesiswaan', 'Sarana & Prasarana', 'Umum'].map((kategori, idx) => (
                  <li key={idx}>
                    <button className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                      {kategori}
                      {idx === 0 && <span className="bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">{pengumuman.length}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget Info Penting */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-lg shadow-blue-900/20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
              </div>
              <h3 className="font-bold text-lg relative z-10 mb-2">Notifikasi SMS/WA</h3>
              <p className="text-blue-100 text-sm mb-4 relative z-10">Dapatkan update pengumuman langsung ke nomor Anda.</p>
              <button className="w-full bg-white text-blue-700 font-bold text-sm py-2.5 rounded-lg hover:bg-blue-50 transition-colors relative z-10">
                Daftar Layanan
              </button>
            </div>
          </div>

          {/* --- KONTEN UTAMA (KANAN) --- */}
          <div className="lg:col-span-9">
            
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 shadow-sm">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            {/* Header List Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Daftar Edaran</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Urutkan:</span>
                <select className="text-sm border-slate-200 rounded-lg text-slate-700 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm px-3 py-1.5">
                  <option>Terbaru</option>
                  <option>Terlama</option>
                </select>
              </div>
            </div>

            {/* Area Data */}
            <div className="space-y-4">
              {loading ? (
                /* Skeleton Premium */
                [...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex gap-6 animate-pulse">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-4 py-2">
                      <div className="flex justify-between">
                        <div className="h-5 bg-slate-100 rounded-md w-1/2" />
                        <div className="h-5 bg-slate-100 rounded-full w-16" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-100 rounded w-full" />
                        <div className="h-3 bg-slate-100 rounded w-4/5" />
                      </div>
                    </div>
                  </div>
                ))
              ) : pengumuman.length === 0 ? (
                /* Empty State Elite */
                <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                    <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak Ada Data</h3>
                  <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                    Belum ada pengumuman yang diterbitkan untuk kategori ini. Silakan ubah filter pencarian Anda.
                  </p>
                </div>
              ) : (
                /* Announcement Cards */
                pengumuman.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:gap-6 relative overflow-hidden"
                  >
                    {/* Hover Accent Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                    {/* Date Block (Kalender Aesthetic) */}
                    <div className="flex-shrink-0 flex flex-row sm:flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-3 sm:w-24 sm:h-24 gap-3 sm:gap-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                      <span className="text-3xl font-black text-slate-800 group-hover:text-white leading-none">
                        {new Date(item.announcement_date).toLocaleDateString("id-ID", { day: "2-digit" })}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-100 sm:mt-1">
                        {new Date(item.announcement_date).toLocaleDateString("id-ID", { month: "short" })}
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <Link href={`/pengumuman/${item.id}`} className="block">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug truncate sm:whitespace-normal">
                            {item.judul}
                          </h3>
                        </Link>
                        <span className={`inline-flex flex-shrink-0 self-start items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          item.status === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {item.status === "published" ? "Publik" : "Draft"}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {item.isi}
                      </p>
                      
                      {/* Footer Actions / Meta */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {new Date(item.created_at).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
                          </span>
                        </div>
                        <Link href={`/pengumuman/${item.id}`} className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all flex items-center gap-1">
                          Baca Detail <span className="text-lg leading-none">›</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Pagination Placeholder */}
              {!loading && pengumuman.length > 0 && (
                <div className="flex justify-center pt-8">
                  <nav className="flex items-center gap-1">
                    <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1 rounded-md bg-blue-600 text-white font-medium shadow-sm">1</button>
                    <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">2</button>
                    <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">3</button>
                    <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}