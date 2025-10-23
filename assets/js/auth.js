// Demo auth with localStorage; swap with real backend later
const Auth = {
  async register(name, email, password){
    try{
      // Basic validation
      if(!name || !email || !password) return false;
      if(password.length < 6) return false;

      const users = JSON.parse(localStorage.getItem('ikhtiar_users')||'[]');
      if(users.find(u=>u.email===email)) return false;

      users.push({name, email, password});
      localStorage.setItem('ikhtiar_users', JSON.stringify(users));

      // Issue demo token and user
      localStorage.setItem('ikhtiar_token', 'demo-token');
      localStorage.setItem('ikhtiar_user', JSON.stringify({name, email}));
      return true;
    }catch(e){
      console.error('Register error', e);
      return false;
    }
  },

  async login(email, password){
    try{
      if(!email || !password) return false;
      const users = JSON.parse(localStorage.getItem('ikhtiar_users')||'[]');
      const u = users.find(u=>u.email===email && u.password===password);
      if(!u) return false;

      localStorage.setItem('ikhtiar_token', 'demo-token');
      localStorage.setItem('ikhtiar_user', JSON.stringify({name:u.name, email:u.email}));
      return true;
    }catch(e){
      console.error('Login error', e);
      return false;
    }
  },

  logout(){
    try{
      localStorage.removeItem('ikhtiar_token');
      localStorage.removeItem('ikhtiar_user');
      // Optionally keep users list for demo persistence
    }catch(e){
      console.error('Logout error', e);
    }
  },

  isAuthed(){
    return !!localStorage.getItem('ikhtiar_token');
  },

  currentUser(){
    try{
      return JSON.parse(localStorage.getItem('ikhtiar_user')||'null');
    }catch{
      return null;
    }
  }
};

/*
Future backend notes:
- Replace with fetch('/api/auth/login') and fetch('/api/auth/register') using credentials: 'include' and httpOnly cookies for JWT/refresh.
- Never store tokens in localStorage in production; prefer cookies with SameSite=strict, Secure, and short-lived access tokens.
- On logout, revoke refresh token server-side and clear cookies.
*/
