// Theme toggle, partial includes, nav bindings, page bootstrapping
(function(){
  const body = document.body;

  // Theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  // Inject partials
  document.querySelectorAll('[data-include="partials/nav"]').forEach(el=>{
    el.outerHTML = `
      <header class="nav" aria-label="Primary">
        <a class="brand" href="index.html"><img src="assets/img/logo.svg" class="logo" alt="Ikhtiar"><span>Ikhtiar</span></a>
        <nav class="nav-links" aria-label="Main">
          <a href="index.html" data-i18n="nav.home">الرئيسية</a>
          <a href="services.html" data-i18n="nav.services">الخدمات</a>
          <a href="about.html" data-i18n="nav.about">عن المنصة</a>
          <a href="survey.html" data-i18n="nav.survey">الاستبيان</a>
          <a href="recommendations.html" data-i18n="nav.recs">التوصيات</a>
          <a href="contact.html" data-i18n="nav.contact">تواصل</a>
          <button id="logoutBtn" class="btn ghost" data-i18n="nav.logout">خروج</button>
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

  // Re-bind after inject
  setTimeout(()=>{
    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    themeBtn && themeBtn.addEventListener('click', ()=>{
      const next = body.getAttribute('data-theme')==='dark'?'light':'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Language toggle
    const langBtn = document.getElementById('langToggle');
    langBtn && langBtn.addEventListener('click', I18N.toggle);
    I18N.apply();

    // Back button logic with safe fallback (single handler)
    document.addEventListener('click', (e)=>{
      const t = e.target.closest('#backBtn');
      if(!t) return;
      if(document.referrer && document.referrer !== location.href){
        history.back();
      } else {
        if(location.pathname.endsWith('login.html')||location.pathname.endsWith('register.html')){
          location.href='index.html';
        } else if(location.pathname.endsWith('survey.html')||location.pathname.endsWith('recommendations.html')){
          location.href='dashboard.html';
        } else {
          location.href='index.html';
        }
      }
    });

    // Logout (single handler)
    document.addEventListener('click',(e)=>{
      const t=e.target.closest('#logoutBtn'); if(!t) return;
      Auth.logout(); Toast.show('تم تسجيل الخروج 👋', 'info', 2000); location.href='index.html';
    });
  },0);

  // Toast manager (unified, accessible)
  const Toast = (function(){
    const wrap = document.createElement('div');
    wrap.setAttribute('role','region');
    wrap.setAttribute('aria-live','polite');
    wrap.style.position='fixed'; wrap.style.right='16px'; wrap.style.top='16px';
    wrap.style.display='flex'; wrap.style.flexDirection='column'; wrap.style.gap='8px'; wrap.style.zIndex='9999';
    document.addEventListener('DOMContentLoaded', ()=>document.body.appendChild(wrap));
    function show(msg, type='info', timeout=2200){
      const el = document.createElement('div');
      el.className='card';
      el.setAttribute('role','status');
      el.style.minWidth='220px';
      el.style.boxShadow='var(--shadow)';
      el.style.borderLeft = `4px solid ${type==='success'?'var(--ok)':type==='error'?'var(--err)':'var(--brand)'}`;
      el.textContent = msg;
      wrap.prepend(el);
      const id = setTimeout(()=>el.remove(), timeout);
      el.addEventListener('click', ()=>{ clearTimeout(id); el.remove(); });
    }
    return { show };
  })();

  // Forms
  const loginForm = document.getElementById('loginForm');
  loginForm && loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const f = new FormData(loginForm);
    try{
      const ok = await Auth.login(f.get('email'), f.get('password'));
      if(ok){
        Toast.show('تم تسجيل الدخول بنجاح ✅', 'success', 2400);
        setTimeout(()=>location.href='dashboard.html', 600);
      } else {
        let err = document.getElementById('loginErr');
        if(!err){ err = document.createElement('p'); err.id='loginErr'; err.className='tiny'; err.style.color='var(--err)'; loginForm.appendChild(err); }
        err.textContent = 'تعذر تسجيل الدخول، تأكد من البيانات.';
        Toast.show('فشل تسجيل الدخول ❌', 'error', 2000);
      }
    }catch{
      Toast.show('حدث خطأ غير متوقع ❌', 'error', 2000);
    }
  });

  const registerForm = document.getElementById('registerForm');
  registerForm && registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const f = new FormData(registerForm);
    const ok = await Auth.register(f.get('name'), f.get('email'), f.get('password'));
    if(ok){
      Toast.show('تم إنشاء الحساب ✨', 'success', 2000);
      window.location.href = 'survey.html';
    } else {
      let er = document.getElementById('registerErr');
      if(!er){ er=document.createElement('p'); er.id='registerErr'; er.className='tiny'; er.style.color='var(--err)'; registerForm.appendChild(er); }
      er.textContent='تعذر إنشاء الحساب، قد يكون البريد مستخدماً.';
      Toast.show('تعذر إنشاء الحساب ❌', 'error', 2000);
    }
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
    localStorage.setItem('ikhtiar_profile', JSON.stringify(payload));
    await DataService.generateRecommendations(payload);
    Toast.show('تم حفظ إجاباتك ✅', 'success', 1600);
    window.location.href = 'recommendations.html';
  });

  // Recommendations page
  if(location.pathname.endsWith('recommendations.html')){
    (async ()=>{
      const wrap = document.getElementById('recsList');
      const recs = await DataService.getRecommendations();
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
        </div>`;
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

    // Welcome/info toasts (optional)
    Toast.show('Welcome back 👋', 'info', 1800);
  }

  // Survey progress indicator
  if(document.getElementById('surveyForm')){
    const bar=document.getElementById('surveyProgress');
    const inputs=[...document.querySelectorAll('#surveyForm input, #surveyForm select, #surveyForm textarea')];
    const update=()=>{ const filled=inputs.filter(i=>i.value&&i.value.length>0).length; const pct=Math.min(100, Math.round((filled/inputs.length)*100)); bar && (bar.style.width=pct+'%'); };
    inputs.forEach(i=>i.addEventListener('input',update)); update();
  }

})();



