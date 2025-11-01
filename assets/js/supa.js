// assets/js/supa.js
// Supabase client singleton + helpers (non-module, attaches to window.*)

// Ensure supabase-js CDN is loaded before this file
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
if (typeof supabase === 'undefined') {
  console.error('[Supabase] supabase-js not loaded. Include CDN before supa.js');
}

// Project credentials (dev): move to env/inject at build for prod
const SUPABASE_URL = 'https://tubiddiplignchgggcql.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1YmlkZGlwbGlnbmNoZ2dnY3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Mjk0ODAsImV4cCI6MjA3NzUwNTQ4MH0._ZCvNsfuadyfKU6lnpcrh44IebxsgC-c4ni_cK3h4VM';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[Supabase] Missing URL or anon key. Check assets/js/supa.js');
}

// Create client (attach to window)
window.supa = (typeof supabase !== 'undefined')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: { 'x-client-info': 'ikhtiar-web' }
      }
    })
  : null;

// ---- Helpers (attach to window) ----
window.getSessionUser = async function getSessionUser(){
  if(!window.supa){ console.error('[Supabase] Client not initialized'); return null; }
  const { data, error } = await supa.auth.getUser();
  if(error){ console.error('[Supabase] getUser error:', error); }
  return data?.user ?? null;
};

window.requireAuth = async function requireAuth(){
  const user = await window.getSessionUser();
  if(!user){
    // route guard: redirect to login preserving return url
    const ret = encodeURIComponent(location.pathname + location.search);
    location.href = `login.html?next=${ret}`;
    return null;
  }
  return user;
};

window.signIn = async function signIn(email, password){
  if(!window.supa) return { data:null, error: new Error('Client not ready') };
  return supa.auth.signInWithPassword({ email, password });
};

window.signUp = async function signUp(email, password, display_name){
  if(!window.supa) return { data:null, error: new Error('Client not ready') };
  const res = await supa.auth.signUp({
    email,
    password,
    options: { data: { display_name } }
  });

  // create/update profile row when user exists
  const user = res.data?.user;
  if(user){
    const { error: upErr } = await supa.from('users_profile').upsert({
      user_id: user.id,
      display_name: display_name || null,
      // optional defaults
      lang: localStorage.getItem('lang') || 'ar',
      theme: document.body.getAttribute('data-theme') || 'dark'
    }, { onConflict: 'user_id' });
    if(upErr){ console.error('[Supabase] profile upsert error:', upErr); }
  }
  return res;
};

window.signOut = async function signOut(){
  if(!window.supa) return;
  await supa.auth.signOut();
};

// Quick ping (optional during dev)
// window.__supaPing = () => supa.from('contact_messages').select('id', { count: 'exact', head: true })
//   .then(r=>console.log('Ping:', r.status, r.error||r.count));
