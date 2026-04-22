/**
 * Script untuk membuat admin user di Supabase
 * Jalankan: node scripts/create-admin.mjs
 * 
 * Ganti ADMIN_EMAIL dan ADMIN_PASSWORD sesuai kebutuhan
 */

const SUPABASE_URL = "https://gmsuqwphdhtngkpkjtbc.supabase.co";
// ANON KEY - hanya bisa signup biasa (butuh email confirmation kalau diaktifkan)
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtc3Vxd3BoZGh0bmdrcGtqdGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NzU3NzQsImV4cCI6MjA5MjM1MTc3NH0.rKlvJSO0ji6HnVmpi6i6MGjSL2824BZplLw66xMIKjk";

const ADMIN_EMAIL = "adminman1oki@gmail.com";
const ADMIN_PASSWORD = "Admin123!";

async function createAdmin() {
  console.log("🚀 Mencoba membuat akun admin...");
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   URL:   ${SUPABASE_URL}\n`);

  // Step 1: Sign up
  const signupRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": ANON_KEY,
    },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  const signupData = await signupRes.json();

  if (!signupRes.ok) {
    if (signupData.msg?.includes("already registered") || signupData.code === "user_already_exists") {
      console.log("ℹ️  User sudah ada di Supabase Auth.");
    } else {
      console.error("❌ Signup gagal:", signupData);
      return;
    }
  } else {
    console.log("✅ Signup berhasil! User ID:", signupData.user?.id ?? "belum dikonfirmasi");
    if (signupData.user?.email_confirmed_at === null || signupData.user?.email_confirmed_at === undefined) {
      console.log("⚠️  Email belum dikonfirmasi. Jika email confirmation DIAKTIFKAN di Supabase,");
      console.log("   kamu harus disable 'Email confirmation' di:");
      console.log("   Supabase Dashboard > Authentication > Providers > Email > uncheck 'Confirm email'");
    }
  }

  // Step 2: Try to login to verify
  console.log("\n🔑 Mencoba login untuk verifikasi...");
  const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": ANON_KEY,
    },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  const loginData = await loginRes.json();

  if (!loginRes.ok) {
    console.error("❌ Login gagal:", loginData.error_description || loginData.msg);
    console.log("\n📝 Kemungkinan penyebab:");
    console.log("   1. Email belum dikonfirmasi → Disable email confirmation di Supabase Dashboard");
    console.log("   2. Password salah");
    console.log("   3. User belum ada → Coba signup manual dulu");
    return;
  }

  console.log("✅ LOGIN BERHASIL!");
  console.log(`   User ID:  ${loginData.user?.id}`);
  console.log(`   Email:    ${loginData.user?.email}`);
  console.log(`   Token:    ${loginData.access_token?.slice(0, 30)}...`);
  console.log("\n🎉 Akun admin siap digunakan!");
  console.log(`   Gunakan email: ${ADMIN_EMAIL}`);
  console.log(`   Password:      ${ADMIN_PASSWORD}`);
}

createAdmin().catch(console.error);
