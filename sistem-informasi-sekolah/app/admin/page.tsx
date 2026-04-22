"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}

function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- TOP NAVIGATION --- */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Left: Brand / Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white font-bold shadow-sm">
                SIS
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Admin Workspace</h1>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">SMAN 1 Nusantara</p>
              </div>
            </div>

            {/* Right: User Profile & Logout */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{user?.email}</p>
                  <p className="text-xs font-medium text-emerald-600 flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden md:block h-8 w-px bg-slate-200"></div>

              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition-all hover:bg-red-100 hover:text-red-700"
              >
                <span>Logout</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-10 shadow-lg shadow-blue-900/10">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Selamat datang di Dashboard, <span className="text-blue-400">Admin</span>! 👋
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Anda memiliki akses penuh untuk mengelola konten portal SMAN 1 Nusantara. Mulai kelola berita, pengumuman, galeri, dan konfigurasi sistem di bawah ini.
            </p>
          </div>
        </div>

        {/* 2. Quick Stats Overview */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Ringkasan Data
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Berita", value: "0", icon: "📰", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { label: "Pengumuman Aktif", value: "0", icon: "📢", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
              { label: "Album Galeri", value: "0", icon: "🖼️", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { label: "Total Pengguna", value: "0", icon: "👥", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.bg} ${stat.border} border text-2xl group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Main Modules Grid */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Modul Manajemen
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Manajemen Berita", desc: "Tulis, edit, dan kelola artikel berita sekolah.", href: "/admin/berita", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
              { name: "Pengumuman", desc: "Kelola edaran, jadwal, dan informasi penting.", href: "/admin/pengumuman", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
              { name: "Galeri & Media", desc: "Unggah dan atur dokumentasi foto kegiatan.", href: "/admin/galeri", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" },
              { name: "Kategori Sistem", desc: "Atur label dan pengelompokan data portal.", href: "/admin/kategori", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
              { name: "Kelola Pengguna", desc: "Manajemen akses admin dan hak akses user.", href: "#", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { name: "Log Aktivitas", desc: "Pantau riwayat perubahan dan keamanan sistem.", href: "#", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}