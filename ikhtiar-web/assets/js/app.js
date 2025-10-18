// Theme toggle, partial includes, nav bindings, page bootstrapping
(function(){
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const body = document.body;

  // Theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  themeBtn && themeBtn.addEventListener('click', ()=>{
    const next = body.getAttribute('data-theme')==='dark'?'light':'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Language
  langBtn && langBtn.addEventListener('click', I18N.toggle);
  I18N.apply();

  // Simple partials (replace with real includes if bundling)
  document.querySelectorAll('[data-include="partials/nav"]').forEach(el=>{
    el.outerHTML = `
      <header class="nav">
        <a class="brand" href="index.html"><img src="assets/img/logo.svg" class="logo" alt="Ikhtiar"><span>Ikhtiar</span></a>
        <nav class="nav-links" aria-label="Main">
          <a href="index.html" data-i18n="nav.home">الرئيسية</a>
          <a href="services.html" data-i18n="nav.services">الخدمات</a>
          <a href="about.html" data-i18n="nav.about">عن المنصة</a>
          <a href="survey.html" data-i18n="nav.survey">الاستبيان</a>
          <a href="recommendations.html" data-i18n="nav.recs">التوصيات</a>
          <a href="contact.html" data-i18n="nav.contact">تواصل</a>
        </nav>
        <div class="nav-actions">
          <button id="langToggle" class="btn ghost" aria-label="Toggle Language">AR</button>
          <button id="themeToggle" class="btn ghost" aria-label="Toggle Theme">●</button>
          <a class="btn primary" href="login.html" data-i18n="nav.login">دخول</a>
        </div>
      </header>`;
  });
  document.querySelectorAll('[data-include="partials/footer"]').forEach(el=>{
    el.outerHTML = `
      <footer class="footer">
        <div class="footer-grid">
          <div><div class="brand small"><img class="logo" src="assets/img/logo.svg" alt="Ikhtiar"><span>Ikhtiar</span></div><p class="muted" data-i18n="footer.tag">نقودك نحو الاختيار الأفضل.</p></div>
          <div><h4 data-i18n="footer.links">روابط</h4><ul><li><a href="privacy.html" data-i18n="footer.privacy">الخصوصية</a></li><li><a href="about.html" data-i18n="footer.about">عن المنصة</a></li><li><a href="contact.html" data-i18n="footer.contact">تواصل</a></li></ul></div>
          <div><h4 data-i18n="footer.start">ابدأ</h4><ul><li><a href="register.html" data-i18n="footer.register">إنشاء حساب</a></li><li><a href="login.html" data-i18n="footer.login">تسجيل دخول</a></li><li><a href="survey.html" data-i18n="footer.survey">الاستبيان</a></li></ul></div>
        </div>
        <p class="tiny muted">© 2025 Ikhtiar</p>
      </footer>`;
  });

  // Re-bind toggles after inject
  setTimeout(()=>{
    const tBtn = document.getElementById('themeToggle');
    const lBtn = document.getElementById('langToggle');
    tBtn && tBtn.addEventListener('click', ()=>{
      const next = body.getAttribute('data-theme')==='dark'?'light':'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
    lBtn && lBtn.addEventListener('click', I18N.toggle);
    I18N.apply();
  },0);

  // Forms
  const loginForm = document.getElementById('loginForm');
  loginForm && loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData(loginForm);
    const ok = await Auth.login(form.get('email'), form.get('password'));
    if(ok) window.location.href = 'dashboard.html';
    else alert('Invalid credentials (demo).');
  });

  const registerForm = document.getElementById('registerForm');
  registerForm && registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const f = new FormData(registerForm);
    const ok = await Auth.register(f.get('name'), f.get('email'), f.get('password'));
    if(ok) window.location.href = 'survey.html';
    else alert('Registration failed (demo).');
  });

  const surveyForm = document.getElementById('surveyForm');
  surveyForm && surveyForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const f = new FormData(surveyForm);
    const payload = {
      gpa: Number(f.get('gpa')||0),
      strengths: (f.get('strengths')||'').split(',').map(s=>s.trim()).filter(Boolean),
      interests: (f.get('interests')||'').split(',').map(s=>s.trim()).filter(Boolean),
      style: f.get('style')||'visual',
      goals: (f.get('goals')||'')
    };
    // Save locally and simulate API
    localStorage.setItem('ikhtiar_profile', JSON.stringify(payload));
    await DataService.generateRecommendations(payload);
    window.location.href = 'recommendations.html';
  });

  // Recommendations page
  if(location.pathname.endsWith('recommendations.html')){
    (async ()=>{
      const recs = await DataService.getRecommendations();
      const wrap = document.getElementById('recsList');
      if(recs && wrap){
        wrap.innerHTML = '';
        recs.forEach(r=>{
          const el = document.createElement('article');
          el.className='card';

          el.innerHTML = `
  <div class="badge">⭐ ${r.score}% match</div>
  <h3>${r.major} <span aria-hidden="true">🎓</span></h3>
  <p class="muted">${r.reason}</p>
  <ul class="bullet">
    <li>Suggested skills: ${r.skills.join(', ')}</li>
    <li>Suggested courses: ${r.courses.join(', ')}</li>
  </ul>`;

          wrap.appendChild(el);
        });
      }
      const mi = document.getElementById('marketInsights');
      if(mi){
        const insights = await DataService.getMarketInsights();
        mi.innerHTML = insights.map(x=>`
          <article class="card">
            <h4>${x.title}</h4>
            <p class="muted">${x.summary}</p>
            <div class="badge">${x.trend}</div>
          </article>
        `).join('');
      }
    })();
  }

  // Dashboard
  if(location.pathname.endsWith('dashboard.html')){
    const box = document.getElementById('profileBox');
    const latest = document.getElementById('latestRecs');
    const profile = JSON.parse(localStorage.getItem('ikhtiar_profile')||'null');
    if(box && profile){
      box.innerHTML = `
        <div class="card">
          <p><strong>GPA:</strong> ${profile.gpa}</p>
          <p><strong>Strengths:</strong> ${(profile.strengths||[]).join(', ')}</p>
          <p><strong>Interests:</strong> ${(profile.interests||[]).join(', ')}</p>
          <p><strong>Style:</strong> ${profile.style}</p>
          <p><strong>Goals:</strong> ${profile.goals||'-'}</p>
        </div>
      `;
    }
    DataService.getRecommendations().then(recs=>{
      if(latest && recs){
        latest.innerHTML = recs.slice(0,3).map(r=>`
          <div class="card">
            <div class="badge">${r.score}%</div>
            <h4>${r.major}</h4>
            <p class="muted">${r.reason}</p>
          </div>
        `).join('');
      }
    });
    
    // Toast
function toast(msg){ 
  const t=document.createElement('div'); 
  t.className='card'; 
  t.style.position='fixed'; t.style.right='16px'; t.style.bottom='16px'; t.style.zIndex='99';
  t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2000);
}

// Update survey progress by fields filled
if(document.getElementById('surveyForm')){
  const bar=document.getElementById('surveyProgress');
  const inputs=[...document.querySelectorAll('#surveyForm input, #surveyForm select, #surveyForm textarea')];
  const update=()=>{ const filled=inputs.filter(i=>i.value&&i.value.length>0).length; const pct=Math.min(100, Math.round((filled/inputs.length)*100)); bar.style.width=pct+'%'; };
  inputs.forEach(i=>i.addEventListener('input',update)); update();
}

// Success toasts on auth
if(location.pathname.endsWith('dashboard.html')) toast('Welcome back 👋');
if(location.pathname.endsWith('recommendations.html')) toast('Here are your matches ✨');

  }

})();

