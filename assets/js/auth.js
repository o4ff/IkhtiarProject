/**
 * Auth.js - مدير المصادقة والأمان
 * يتعامل مع تسجيل الدخول، إنشاء الحسابات، وإدارة جلسة المستخدم.
 * مرتبط بـ Supabase ونظام الإشعارات (Toast).
 */

// دالة مساعدة للترجمة داخل هذا الملف
function authTr(ar, en) {
  const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
  return lang === 'ar' ? ar : (en || ar);
}

const Auth = {
  
  // ----------------------------------------------------
  // 1. إنشاء حساب جديد (Register)
  // ----------------------------------------------------
  async register(name, email, password) {
    try {
      // التحقق من تحميل مكتبة Supabase
      if (!window.supa) {
        console.error('[Auth] Supabase client missing.');
        Toast.show(
          authTr('⚠️ حدث خطأ في الاتصال بالنظام.', '⚠️ A system connection error occurred.'),
          'error'
        );
        return false;
      }

      // أ) محاولة إنشاء المستخدم في Supabase Auth
      const { data, error } = await supa.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } } // حفظ الاسم في الميتا داتا
      });

      // ب) التعامل مع أخطاء التسجيل
      if (error) {
        console.error('[Auth] SignUp Error:', error);
        // عرض رسالة الخطأ القادمة من السيرفر أو رسالة عامة
        let msg = authTr('تعذّر إنشاء الحساب.', 'Failed to create account.');
        if (error.message.includes('registered')) {
          msg = authTr('هذا البريد مسجل مسبقاً!', 'This email is already registered!');
        }
        if (error.message.includes('password')) {
          msg = authTr('كلمة المرور ضعيفة.', 'Password is too weak.');
        }
        
        Toast.show(msg, 'error');
        
        // إظهار الخطأ في النص الصغير تحت الزر إذا وجد العنصر
        const el = document.getElementById('registerErr');
        if (el) { el.textContent = msg; el.style.display = 'block'; }
        
        return false;
      }

      // ج) التحقق من نجاح العملية (قد تتطلب تفعيل بريد إلكتروني حسب إعدادات Supabase)
      const user = data?.user;
      
      if (user) {
        // د) إنشاء ملف شخصي (Profile) في قاعدة البيانات فوراً
        // هذا يضمن وجود صف للمستخدم في جدول users_profile
        const { error: profileErr } = await supa.from('users_profile').upsert({
          user_id: user.id,
          display_name: name,
          lang: localStorage.getItem('lang') || 'ar',
          theme: document.body.getAttribute('data-theme') || 'dark'
        }, { onConflict: 'user_id' });

        if (profileErr) {
          console.warn('[Auth] Profile creation warning:', profileErr);
          // لا نوقف العملية هنا لأن الحساب أنشئ بالفعل
        }

        return true; // نجاح كامل
      }

      // إذا لم يعد هناك مستخدم (نادرة الحدوث إلا إذا كان تأكيد البريد إجباري وصارم جداً)
      Toast.show(
        authTr('يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.', 'Please verify your email to activate your account.'),
        'info'
      );
      return true;

    } catch (e) {
      console.error('[Auth] Unexpected error:', e);
      Toast.show(
        authTr('حدث خطأ غير متوقع، حاول لاحقاً.', 'An unexpected error occurred, please try again later.'),
        'error'
      );
      return false;
    }
  },

  // ----------------------------------------------------
  // 2. تسجيل الدخول (Login)
  // ----------------------------------------------------
  async login(email, password) {
    try {
      if (!window.supa) {
        Toast.show(
          authTr('⚠️ خدمة قاعدة البيانات غير متصلة.', '⚠️ Database service is not connected.'),
          'error'
        );
        return false;
      }

      const { data, error } = await supa.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('[Auth] Login Error:', error);
        
        const el = document.getElementById('loginErr');
        let msg = authTr(
          'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
          'Email or password is incorrect.'
        );
        
        Toast.show(msg, 'error');
        if (el) { el.textContent = msg; el.style.display = 'block'; }
        
        return false;
      }

      // التحقق من وجود جلسة
      if (data?.session) {
        return true;
      }
      return false;

    } catch (e) {
      console.error('[Auth] Login exception:', e);
      Toast.show(
        authTr('خطأ في الاتصال.', 'Connection error.'),
        'error'
      );
      return false;
    }
  },

  // ----------------------------------------------------
  // 3. تسجيل الخروج (Logout)
  // ----------------------------------------------------
  async logout() {
    try {
      if (window.supa) {
        await supa.auth.signOut();
        // مسح بيانات التوصيات المحلية إذا أردت (اختياري)
        // localStorage.removeItem('ikhtiar_recs'); 
      }
    } catch (e) {
      console.error('[Auth] Logout error:', e);
    }
  },

  // ----------------------------------------------------
  // 4. التحقق من المستخدم الحالي (Helper)
  // ----------------------------------------------------
  async currentUser() {
    try {
      // إذا كانت الدالة معرفة في supa.js نستخدمها، وإلا نطلب مباشرة
      if (typeof window.getSessionUser === 'function') {
        return await window.getSessionUser();
      }
      if (!window.supa) return null;
      
      const { data } = await supa.auth.getUser();
      return data?.user || null;
    } catch (e) {
      return null;
    }
  },

  // التحقق هل المستخدم مسجل دخول (بوليان)
  async isAuthed() {
    const u = await this.currentUser();
    return !!u;
  }
};

// إتاحة الكائن للنظام بأكمله
window.Auth = Auth;
