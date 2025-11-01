// auth.js - Supabase auth (no email confirmation)
const Auth = {
  async register(name, email, password){
    try{
      if(!window.supa){
        console.error('[Auth] Supabase client is not initialized');
        const el = document.getElementById('registerErr');
        if(el){ el.textContent = 'خدمة Supabase غير مهيأة.'; el.style.display='block'; }
        return false;
      }

      // signUp: إذا كان تأكيد البريد معطلاً سيتم إنشاء جلسة مباشرة
      const { data, error } = await supa.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } }
      });

      if(error){
        console.error('signUp error:', error);
        const el = document.getElementById('registerErr');
        if(el){ el.textContent = error.message || 'تعذّر إنشاء الحساب.'; el.style.display='block'; }
        window.Toast && Toast.show(error.message || 'تعذّر إنشاء الحساب ❌', 'error', 2400);
        return false;
      }

      // تحقّق سريع أن الجلسة وُجدت (قد تكون null إذا كان التأكيد مفعل وSMTP غير مهيأ)
      const { data: { session }, error: sErr } = await supa.auth.getSession();
      if(sErr){ console.error('getSession after signUp:', sErr); }
      if(!session){
        console.warn('No session after signUp (check Email confirmations / SMTP settings)');
      }

      // المستخدم قد لا يعود مباشرة في data.user إن كان التفعيل مطلوباً
      let user = data?.user;
      if(!user){
        const { data: uData, error: uErr } = await supa.auth.getUser();
        if(uErr){ console.error('getUser after signUp:', uErr); }
        user = uData?.user || null;
      }

      // إنشاء/تحديث صف profile
      if(user?.id){
        const profileRow = {
          user_id: user.id,
          display_name: name,
          lang: localStorage.getItem('lang') || 'ar',
          theme: document.body.getAttribute('data-theme') || 'dark'
        };
        const { error: upErr } = await supa
          .from('users_profile')
          .upsert(profileRow, { onConflict: 'user_id' });
        if(upErr){ console.error('profile upsert error:', upErr); }
      }

      return true;
    }catch(e){
      console.error('register catch:', e);
      const el = document.getElementById('registerErr');
      if(el){ el.textContent = 'خطأ غير متوقع أثناء إنشاء الحساب.'; el.style.display='block'; }
      window.Toast && Toast.show('خطأ غير متوقع أثناء إنشاء الحساب ❌', 'error', 2400);
      return false;
    }
  },

  async login(email, password){
    try{
      if(!window.supa){
        console.error('[Auth] Supabase client is not initialized');
        const el = document.getElementById('loginErr');
        if(el){ el.textContent = 'خدمة Supabase غير مهيأة.'; el.style.display='block'; }
        return false;
      }
      const { data, error } = await supa.auth.signInWithPassword({ email, password });
      if(error){
        console.error('signIn error:', error);
        const el = document.getElementById('loginErr');
        if(el){ el.textContent = error.message || 'تعذر تسجيل الدخول، تأكد من البيانات.'; el.style.display='block'; }
        window.Toast && Toast.show(error.message || 'فشل تسجيل الدخول ❌', 'error', 2200);
        return false;
      }
      return !!data.session;
    }catch(e){
      console.error('login catch:', e);
      const el = document.getElementById('loginErr');
      if(el){ el.textContent = 'خطأ غير متوقع أثناء تسجيل الدخول.'; el.style.display='block'; }
      window.Toast && Toast.show('خطأ غير متوقع أثناء تسجيل الدخول ❌', 'error', 2200);
      return false;
    }
  },

  async logout(){
    try{
      if(!window.supa){
        console.error('[Auth] Supabase client is not initialized');
        return;
      }
      const { error } = await supa.auth.signOut();
      if(error){ console.error('signOut error:', error); }
    }catch(e){
      console.error('logout catch:', e);
    }
  },

  async isAuthed(){
    try{
      if(!window.supa){
        console.error('[Auth] Supabase client is not initialized');
        return false;
      }
      const { data: { session }, error } = await supa.auth.getSession();
      if(error){ console.error('getSession error:', error); }
      return !!session;
    }catch(e){
      console.error('isAuthed catch:', e);
      return false;
    }
  },

  async currentUser(){
    try{
      if(typeof getSessionUser === 'function'){
        return await getSessionUser();
      }
      if(!window.supa){
        console.error('[Auth] Supabase client is not initialized');
        return null;
      }
      const { data, error } = await supa.auth.getUser();
      if(error){ console.error('getUser error:', error); return null; }
      return data?.user ?? null;
    }catch(e){
      console.error('currentUser catch:', e);
      return null;
    }
  }
};

// اجعل الكائن متاحًا على window أيضاً
window.Auth = Auth;
