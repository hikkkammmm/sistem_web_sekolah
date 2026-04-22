"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Top Contact Bar */}
      <div className="bg-blue-950 px-4 py-2 text-xs text-blue-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              info@sman1nusantara.sch.id
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (021) 1234-5678
            </span>
          </div>
          <div className="flex gap-4 font-medium">
            <Link href="/pendaftaran" className="hover:text-white transition-colors text-amber-400 tracking-wide">INFO PPDB 2024</Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-950 text-white font-bold shadow-lg shadow-blue-900/20">
                <span className="text-xl">SN</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                  SMAN 1 Nusantara
                </h1>
                <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">Cerdas & Berintegritas</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              
              {/* Dropdown Profil Sekolah (Paling Kiri) */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors py-8">
                  Profil Sekolah
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/profil/sejarah" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors">Sejarah Sekolah</Link>
                    <Link href="/profil/visi-misi" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors">Visi & Misi</Link>
                    <Link href="/profil/struktur" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors">Struktur Organisasi</Link>
                    <Link href="/profil/fasilitas" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors">Fasilitas Kampus</Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <Link href="/direktori-guru" className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors">Direktori Guru</Link>
                  </div>
                </div>
              </div>

              <Link href="#berita" className="text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors py-8">Berita</Link>
              <Link href="#pengumuman" className="text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors py-8">Pengumuman</Link>
              <Link href="#galeri" className="text-sm font-semibold text-gray-600 hover:text-blue-800 transition-colors py-8">Galeri</Link>
            </div>

            {/* Auth Action */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm font-bold text-gray-700 md:block">{user.email}</span>
                  <Link
                    href="/admin"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-6 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-blue-950 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Portal Admin
                  </Link>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="rounded-lg border-2 border-blue-900 px-6 py-2 text-sm font-bold text-blue-900 transition-all hover:bg-blue-900 hover:text-white"
                >
                  Login Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <section 
        className="relative pt-32 pb-48 lg:pt-40 lg:pb-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl mb-6 leading-[1.1]">
              Membentuk Karakter, <br/>
              <span className="text-amber-400">Meraih Masa Depan.</span>
            </h1>
            <p className="text-lg text-blue-50 mb-10 leading-relaxed font-light">
              Selamat datang di portal informasi resmi SMA Negeri 1 Nusantara. Berdedikasi untuk menciptakan lingkungan belajar yang inspiratif, inklusif, dan berwawasan global.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#berita" className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-900/50 transition-all hover:-translate-y-1 hover:bg-blue-500">
                Informasi Terkini
              </Link>
              <Link href="/pendaftaran" className="rounded-lg bg-white/10 backdrop-blur-md border border-white/30 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-white/20 hover:-translate-y-1">
                Jelajahi Profil
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sambutan Kepala Sekolah (Overlapping Design) */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Foto Kepsek */}
            <div className="w-full lg:w-1/3 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                  alt="Kepala Sekolah" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 md:-right-8 bg-blue-900 text-white p-5 rounded-2xl shadow-xl border-4 border-white">
                <h4 className="font-bold text-lg">Dr. H. Ahmad Dahlan, M.Pd.</h4>
                <p className="text-sm text-blue-200">Kepala Sekolah SMAN 1 Nusantara</p>
              </div>
            </div>
            
            {/* Teks Sambutan */}
            <div className="w-full lg:w-2/3 pt-8 lg:pt-0 pl-0 md:pl-6">
              <div className="text-amber-500 mb-4">
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Mencetak Generasi Emas Masa Depan</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Melalui website portal ini, kami berupaya menjembatani komunikasi antara pihak sekolah, peserta didik, orang tua, dan masyarakat luas secara transparan dan informatif.
                </p>
                <p>
                  Di era digitalisasi saat ini, pendidikan tidak lagi terbatas oleh dinding ruang kelas. SMAN 1 Nusantara terus berinovasi mengadaptasi teknologi terbaru untuk menciptakan ekosistem pembelajaran yang interaktif dan menyenangkan. Kami berkomitmen tidak hanya mengejar keunggulan akademik, tetapi juga pembentukan karakter yang berintegritas.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/profil/sambutan" className="text-blue-700 font-bold hover:text-blue-900 inline-flex items-center gap-2 group">
                  Baca Selengkapnya 
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quick Features */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Akreditasi A", icon: "🏆", desc: "Sertifikasi Nasional", color: "bg-blue-50 text-blue-600" },
              { title: "85+ Pengajar", icon: "👨‍🏫", desc: "Tenaga Pendidik Profesional", color: "bg-emerald-50 text-emerald-600" },
              { title: "24 Ekskul", icon: "🎯", desc: "Pengembangan Bakat", color: "bg-amber-50 text-amber-600" },
              { title: "E-Learning", icon: "💻", desc: "Sistem Belajar Digital", color: "bg-purple-50 text-purple-600" },
            ].map((fitur, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className={`h-16 w-16 flex items-center justify-center rounded-2xl ${fitur.color} text-3xl mb-4 shadow-sm`}>
                  {fitur.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{fitur.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Papan Pengumuman */}
      <section id="pengumuman" className="bg-blue-900 py-20 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-50"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 text-white">
              <span className="text-amber-400 font-bold tracking-wider text-sm uppercase mb-2 block">Informasi</span>
              <h2 className="text-3xl font-bold mb-4">Papan Pengumuman</h2>
              <p className="text-blue-200 text-lg mb-8">
                Pantau terus informasi penting, jadwal ujian, dan edaran resmi terbaru dari pihak sekolah.
              </p>
              <Link href="/pengumuman" className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-sm font-bold text-white border border-white/20 hover:bg-white hover:text-blue-900 transition-all">
                Lihat Semua Pengumuman
              </Link>
            </div>
            
            <div className="md:w-2/3 w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {[
                  { date: "15", month: "Okt", title: "Jadwal Ujian Tengah Semester Ganjil 2024", tag: "Akademik", status: "Terbaru" },
                  { date: "10", month: "Okt", title: "Pemberitahuan Libur Nasional & Cuti Bersama", tag: "Umum", status: "" },
                  { date: "05", month: "Okt", title: "Pengambilan Rapor Siswa Kelas X & XI", tag: "Informasi", status: "" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-6 hover:bg-gray-50 transition-colors group cursor-pointer relative">
                    {item.status && (
                      <span className="absolute top-4 right-6 text-[10px] font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse">
                        {item.status}
                      </span>
                    )}
                    <div className="flex-shrink-0 bg-blue-50 text-center rounded-xl p-3 min-w-[75px] border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                      <div className="text-2xl font-black leading-none">{item.date}</div>
                      <div className="text-xs font-bold uppercase mt-1 text-blue-600 group-hover:text-blue-200">{item.month}</div>
                    </div>
                    <div className="ml-6 pr-10">
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md uppercase tracking-wider">{item.tag}</span>
                      <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Berita Terkini */}
      <section id="berita" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Kabar Sekolah</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Berita Terkini</h2>
              <div className="mt-4 h-1 w-20 bg-amber-400 rounded-full"></div>
            </div>
            <Link href="/berita" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800">
              Lihat Indeks Berita
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tim Robotik SMAN 1 Meraih Juara 1 Tingkat Nasional",
                date: "12 Oktober 2024",
                desc: "Prestasi membanggakan kembali diraih oleh siswa-siswi kita dalam ajang kompetisi robotik tahunan...",
                img: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?q=80&w=800&auto=format&fit=crop", 
              },
              {
                title: "Sosialisasi Kampus Merdeka Bersama Alumni",
                date: "08 Oktober 2024",
                desc: "Acara sharing session bersama alumni yang telah sukses masuk ke Perguruan Tinggi Negeri ternama.",
                img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Porseni 2024: Menumbuhkan Semangat Sportivitas",
                date: "01 Oktober 2024",
                desc: "Pekan Olahraga dan Seni (Porseni) tahun ini berlangsung meriah dengan partisipasi seluruh kelas.",
                img: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
              }
            ].map((news, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
                <div className="h-56 w-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900">
                    {news.date}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-700 transition-colors cursor-pointer">{news.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">{news.desc}</p>
                  <Link href="#" className="text-blue-600 text-sm font-bold mt-auto inline-flex items-center gap-1">
                    Baca Selengkapnya <span className="text-lg leading-none">›</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Galeri Sekolah */}
      <section id="galeri" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Dokumentasi</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Galeri & Kegiatan</h2>
            <div className="mt-4 h-1 w-20 bg-amber-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            {/* Main Featured Image */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group shadow-md">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" alt="Kegiatan Kelas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-amber-400 text-sm font-bold mb-1">Akademik</span>
                <h3 className="text-white font-bold text-2xl">Kegiatan Belajar Mengajar</h3>
              </div>
            </div>
            {/* Small Images */}
            <div className="relative rounded-2xl overflow-hidden group shadow-md">
              <img src="https://images.unsplash.com/photo-1427504494785-319ce8372ac0?q=80&w=600&auto=format&fit=crop" alt="Wisuda" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group shadow-md">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop" alt="Kegiatan Siswa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group shadow-md">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" alt="Praktikum Komputer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Overlay "Lihat Lainnya" */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1498644449830-2212f8e4e704?q=80&w=600&auto=format&fit=crop" alt="Perpustakaan" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm flex items-center justify-center transition-colors group-hover:bg-blue-900/90">
                <Link href="/galeri" className="text-white font-bold text-lg flex flex-col items-center gap-2">
                  <span className="p-3 bg-white/20 rounded-full"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></span>
                  Lihat Semua Galeri
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer Advanced */}
      <footer className="bg-gray-950 pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-800 pb-12">
            
            {/* Kolom 1: Profil */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 text-white font-bold text-xl shadow-lg">SN</div>
                <h2 className="text-2xl font-bold text-white leading-tight">SMA Negeri 1<br/>Nusantara</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
                Berkomitmen untuk mencetak generasi muda yang cerdas, berbudi pekerti luhur, dan siap menghadapi tantangan global dengan landasan iman dan takwa.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="h-10 w-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div className="md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="h-1 w-4 bg-amber-400 rounded-full"></span>
                Tautan Cepat
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/profil" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-transform">Profil Sekolah</Link></li>
                <li><Link href="/pendaftaran" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-transform">Pendaftaran PPDB</Link></li>
                <li><Link href="/berita" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-transform">Indeks Berita</Link></li>
                <li><Link href="/galeri" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-transform">Galeri Foto & Video</Link></li>
                <li><Link href="/kontak" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-transform">Hubungi Kami</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak Info */}
            <div className="md:col-span-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="h-1 w-4 bg-amber-400 rounded-full"></span>
                Kontak Info
              </h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
                  <span>Jl. Jend. Sudirman No. 123, <br/>Kebayoran Baru, Jakarta Selatan<br/>DKI Jakarta 12190</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></span>
                  <span>(021) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                  <span>info@sman1nusantara.sch.id</span>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Maps (Real Iframe Example) */}
            <div className="md:col-span-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="h-1 w-4 bg-amber-400 rounded-full"></span>
                Lokasi Kami
              </h3>
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.2403666578!2d106.74108855422731!3d-6.229746499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                  className="absolute inset-0 w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity" 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-600">
            <p>© {new Date().getFullYear()} SMA Negeri 1 Nusantara. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Didesain dengan <span className="text-red-500">♥</span> oleh Tim IT Sekolah
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}