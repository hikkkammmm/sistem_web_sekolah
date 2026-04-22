# Sistem Informasi Sekolah (Modern School Information System)

## 1. PROJECT OVERVIEW

- **Nama Project:** Sistem Informasi Sekolah (Modern School Information System)
- **Deskripsi Singkat:**
  Sistem aplikasi web modern untuk manajemen dan publikasi informasi sekolah, meliputi berita, pengumuman, galeri kegiatan, profil sekolah, dan manajemen konten oleh admin.
- **Tujuan Utama Project:**
  - Memudahkan penyebaran informasi sekolah secara digital
  - Meningkatkan transparansi dan komunikasi antara sekolah, siswa, guru, dan masyarakat
  - Menyediakan platform manajemen konten yang efisien untuk admin
- **Target User:**
  - Siswa
  - Guru & Staff
  - Masyarakat umum (orang tua, calon siswa, publik)
- **Masalah yang Ingin Diselesaikan:**
  - Informasi sekolah yang tersebar dan tidak terpusat
  - Sulitnya update konten tanpa sistem terintegrasi
  - Kurangnya transparansi dan akses informasi bagi publik

---

## 2. TECH STACK

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel

### Alasan Pemilihan Tech Stack
- **Next.js:** Framework React modern, mendukung SSR/SSG, SEO friendly, dan scalable.
- **Tailwind CSS:** Utility-first, mempercepat styling, konsisten, dan mudah di-maintain.
- **Supabase:** Backend as a Service, real-time, mudah integrasi dengan Next.js, fitur Auth & Storage siap pakai.
- **Vercel:** Deployment mudah, integrasi seamless dengan Next.js, performa tinggi.

### Arsitektur Sederhana
```
[User] → [Next.js Frontend] → [Supabase Backend] → [PostgreSQL Database]
```

---

## 3. USER ROLES

### 1. Guest (Pengunjung)
- **Hak Akses:**
  - Melihat berita, pengumuman, galeri, profil sekolah, data guru & staff, visi misi, kontak
  - Search & filter konten
- **Batasan:**
  - Tidak bisa mengubah/mengelola data
  - Tidak bisa mengakses dashboard admin

### 2. Admin
- **Hak Akses:**
  - Login ke dashboard
  - CRUD semua konten (berita, pengumuman, galeri, kategori)
  - Manajemen user admin
  - Melihat statistik & activity log
- **Batasan:**
  - Hanya admin terdaftar yang bisa login
  - Akses dibatasi sesuai role (RBAC)

---

## 4. FITUR UTAMA

### A. Guest Features
- Lihat Berita
- Detail Berita
- Lihat Pengumuman
- Lihat Galeri Kegiatan (foto + deskripsi)
- Profil Sekolah
- Visi & Misi
- Data Guru & Staff
- Kontak Sekolah
- Search (berita, galeri)
- Filter kategori berita
- Pagination

### B. Admin Features
- Login / Logout
- Dashboard (statistik)
- CRUD Berita (rich text editor seperti MS Word)
- CRUD Pengumuman
- CRUD Galeri (upload multi image + deskripsi)
- Manajemen Kategori
- Upload gambar (drag & drop)
- Preview sebelum publish
- Draft & Publish system
- Edit & Delete konten
- Manajemen user admin

### C. Advanced Features
- Role-based access control (RBAC)
- Activity log (riwayat aktivitas admin)
- SEO optimization (meta title, description)
- Image optimization
- Bookmark berita
- Like / view counter
- Notifikasi (opsional)
- Dark mode
- Responsive mobile-first design
- Loading skeleton
- Error handling system
- API validation
- Rate limiting (opsional)

---

## 5. DATABASE DESIGN (HIGH LEVEL)

### Tabel Utama
- **users**: id, email, password, role, nama, foto, created_at
- **berita**: id, judul, isi, gambar, kategori_id, author_id, status (draft/publish), view_count, like_count, created_at, updated_at
- **pengumuman**: id, judul, isi, tanggal, author_id, status, created_at
- **galeri**: id, judul, deskripsi, images (array), author_id, created_at
- **kategori**: id, nama, deskripsi
- **activity_log**: id, user_id, aktivitas, waktu

### Relasi Antar Tabel
- **users** (1) — (N) **berita** (author_id)
- **users** (1) — (N) **pengumuman** (author_id)
- **users** (1) — (N) **galeri** (author_id)
- **kategori** (1) — (N) **berita** (kategori_id)
- **users** (1) — (N) **activity_log** (user_id)

### Field Penting Tiap Tabel
- **users:** id, email, password, role, nama, foto
- **berita:** id, judul, isi, gambar, kategori_id, author_id, status, view_count, like_count
- **pengumuman:** id, judul, isi, tanggal, author_id, status
- **galeri:** id, judul, deskripsi, images, author_id
- **kategori:** id, nama
- **activity_log:** id, user_id, aktivitas, waktu

---

## 6. FOLDER STRUCTURE (Next.js App Router)

```
app/
  ├─ (public pages)
  ├─ admin/
  ├─ berita/
  ├─ pengumuman/
  ├─ galeri/
  ├─ profil/
  ├─ guru-staff/
  ├─ kontak/
components/
  ├─ ui/
  ├─ layout/
  ├─ berita/
  ├─ galeri/
  ├─ pengumuman/
lib/
hooks/
services/
types/
styles/
```

---

## 7. UI/UX CONCEPT

- **Design Style:** Modern, clean, profesional, dengan nuansa edukasi/sekolah
- **Mobile-first Approach:** Desain responsif, optimal di mobile & desktop
- **Inspirasi:**
  - Dashboard modern (Notion, Linear, Vercel)
  - Social media style untuk berita (card, feed, interaksi)

---

## 8. DEVELOPMENT ROADMAP

### Phase 1: Setup Project
- Init Next.js
- Install Tailwind
- Setup Supabase
- Setup environment variables

### Phase 2: Authentication
- Setup Supabase Auth
- Login system
- Protected route

### Phase 3: Database & Schema
- Design database
- Create tables
- Relasi data

### Phase 4: Core Features (per modul)
- Berita
- Pengumuman
- Galeri

### Phase 5: Admin Dashboard
- UI dashboard
- Statistik

### Phase 6: Advanced Features
- Search
- Filter
- SEO

### Phase 7: UI Enhancement
- Responsive design
- Loading state
- Animasi

### Phase 8: Testing
- Manual testing
- Bug fixing

### Phase 9: Deployment
- Deploy ke Vercel
- Setup domain

---

## 9. BEST PRACTICES

- Clean code (readable, maintainable)
- Reusable component
- Separation of concern (UI, logic, data)
- Security (auth, validation, sanitasi input)
- Responsive & accessible
- Version control (Git)
- Dokumentasi kode

---

## 10. OUTPUT FORMAT

- Dokumentasi ini menggunakan format Markdown
- Heading terstruktur (#, ##, ###)
- Bullet points untuk list
- Disusun profesional dan mudah dipahami
