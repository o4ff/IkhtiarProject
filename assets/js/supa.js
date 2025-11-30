/**
 * Supa.js
 * تهيئة مكتبة Supabase وجعلها متاحة عالمياً (Singleton).
 * هذا الملف هو "الجسر" بين موقعك وقاعدة البيانات.
 */

// 1. إعدادات المشروع (API Keys)
// ملاحظة: هذه المفاتيح عامة (Anon Key) وآمنة للاستخدام في المتصفح مع Row Level Security.
const SUPABASE_URL = 'https://tubiddiplignchgggcql.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1YmlkZGlwbGlnbmNoZ2dnY3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Mjk0ODAsImV4cCI6MjA3NzUwNTQ4MH0._ZCvNsfuadyfKU6lnpcrh44IebxsgC-c4ni_cK3h4VM';

// 2. التحقق من تحميل مكتبة Supabase من الـ CDN
if (typeof supabase === 'undefined') {
  console.error('[Supabase] Library not loaded! Please check the <script> tag in HTML.');
} else {
  // 3. إنشاء العميل (Client)
  window.supa = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,       // حفظ الجلسة حتى بعد إغلاق المتصفح
      autoRefreshToken: true,     // تجديد التوكن تلقائياً
      detectSessionInUrl: true    // اكتشاف روابط التفعيل (مثل تأكيد البريد)
    },
    global: {
      headers: { 'x-client-info': 'ikhtiar-web-v2' } // لتتبع الطلبات (اختياري)
    }
  });
  
  console.log('[Supabase] Connection initialized.');
}

// 4. دوال مساعدة عامة (Helpers)

/**
 * جلب المستخدم الحالي بسرعة (بدون انتظار وعود طويلة)
 * يستخدم في التحقق السريع في الواجهة
 */
window.getSessionUser = async function() {
  if (!window.supa) {
    console.warn('[Supabase] Client not ready.');
    return null;
  }
  try {
    const { data, error } = await window.supa.auth.getUser();
    if (error) throw error;
    return data?.user || null;
  } catch (e) {
    // في حال عدم وجود جلسة أو خطأ، نرجع null
    return null;
  }
};

/**
 * حارس التوجيه (Route Guard)
 * يمنع الوصول للصفحات المحمية إذا لم يكن المستخدم مسجلاً
 */
window.requireAuth = async function() {
  const user = await window.getSessionUser();
  if (!user) {
    console.info('[Auth] User not logged in, redirecting...');
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    window.location.href = `login.html?next=${returnUrl}`;
    return null;
  }
  return user;
};
