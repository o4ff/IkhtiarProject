// Demo auth with localStorage; wire to real backend later
const Auth = {
  async register(name,email,password){
    const users = JSON.parse(localStorage.getItem('ikhtiar_users')||'[]');
    if(users.find(u=>u.email===email)) return false;
    users.push({name,email,password});
    localStorage.setItem('ikhtiar_users', JSON.stringify(users));
    localStorage.setItem('ikhtiar_token', 'demo-token');
    localStorage.setItem('ikhtiar_user', JSON.stringify({name,email}));
    return true;
  },
  async login(email,password){
    const users = JSON.parse(localStorage.getItem('ikhtiar_users')||'[]');
    const u = users.find(u=>u.email===email && u.password===password);
    if(!u) return false;
    localStorage.setItem('ikhtiar_token', 'demo-token');
    localStorage.setItem('ikhtiar_user', JSON.stringify({name:u.name,email:u.email}));
    return true;
  },
  logout(){
    localStorage.removeItem('ikhtiar_token');
    localStorage.removeItem('ikhtiar_user');
  },
  isAuthed(){
    return !!localStorage.getItem('ikhtiar_token');
  }
};
