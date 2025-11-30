(function(){
  const body = document.body;
  
  // دالة مساعدة للترجمة داخل JS بدون الحاجة لـ data-i18n
  function trInline(ar, en) {
    const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
    return lang === 'ar' ? ar : (en || ar);
  }

  // 1. إعداد الثيم عند التحميل
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  // شعار الموقع (SVG) لضمان سرعة التحميل والدقة العالية
  const LOGO_SVG = `<svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2ZM12 16.25L8.59 19L12 3.66L15.41 19L12 16.25Z"/></svg>`;

  // 2. حقن القائمة العلوية (Navbar) بالتصميم الزجاجي
  document.querySelectorAll('[data-include="partials/nav"]').forEach(el => {
    el.outerHTML = `
      <header class="nav fade-in">
        <a class="brand" href="index.html">${LOGO_SVG} <span>Ikhtiar</span></a>
        <nav class="nav-links">
          <a href="index.html" data-i18n="nav.home">الرئيسية</a>
          <a href="services.html" data-i18n="nav.services">الخدمات</a>
          <a href="about.html" data-i18n="nav.about">عن المنصة</a>
          <!-- الروابط الخاصة بالمستخدم -->
          <a href="survey.html" data-i18n="nav.survey" class="user-only hidden">الاستبيان</a>
          <a href="recommendations.html" data-i18n="nav.recs" class="user-only hidden">التوصيات</a>
          <button id="logoutBtn" class="btn ghost user-only hidden" data-i18n="nav.logout">خروج</button>
        </nav>
        <div class="nav-actions">
          <button id="langToggle" class="btn ghost">AR</button>
          <button id="themeToggle" class="btn ghost">◑</button>
          <a id="loginBtnNav" class="btn primary glow-btn" href="login.html" data-i18n="nav.login">دخول</a>
        </div>
      </header>`;
  });

  // 3. حقن التذييل (Footer)
  document.querySelectorAll('[data-include="partials/footer"]').forEach(el => {
    el.outerHTML = `
      <footer class="footer fade-in">
        <div class="footer-grid">
          <div>
            <div class="brand mb-2">${LOGO_SVG}<span>Ikhtiar</span></div>
            <p class="muted tiny" data-i18n="footer.tag">نقودك نحو المستقبل التقني.</p>
          </div>
          <div>
            <h4 data-i18n="footer.links">روابط</h4>
            <div class="stack" style="gap:5px">
              <a href="privacy.html" class="tiny muted" data-i18n="footer.privacy">الخصوصية</a>
              <a href="contact.html" class="tiny muted" data-i18n="footer.contact">تواصل معنا</a>
            </div>
          </div>
        </div>
        <div class="text-center mt-4 tiny muted" style="border-top:1px solid var(--border); padding-top:20px">
          <span data-i18n="footer.copy">© 2025 Ikhtiar Platform</span>
        </div>
      </footer>`;
  });

  // 4. نظام الإشعارات (Toast System)
  const Toast = {
    show(msg, type='info') {
      const d = document.createElement('div');
      d.className = 'card glass-effect fade-in';
      d.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        padding: 12px 24px; border-right: 4px solid ${type=='error'?'var(--err)':'var(--ok)'};
        display: flex; align-items: center; gap: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      `;
      d.innerHTML = `<span>${type=='error'?'❌':'✅'}</span> <span>${msg}</span>`;
      body.appendChild(d);
      setTimeout(() => { d.style.opacity='0'; setTimeout(()=>d.remove(), 300) }, 3000);
    }
  };
  window.Toast = Toast;

  // 5. مكون القوائم المتعددة المخصص (Custom Multi-Select)
  const MultiSelectInstances = {};

  function createMultiSelect(containerId, optionsList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
    container.innerHTML = ''; 
    let selectedValues = [];

    const box = document.createElement('div');
    box.className = 'multi-select-box';
    
    const input = document.createElement('input');
    input.className = 'multi-select-input';
    input.placeholder = trInline('ابحث واختر...', 'Search & select...');
    
    const dropdown = document.createElement('div');
    dropdown.className = 'multi-select-dropdown glass-effect';

    box.appendChild(input);
    container.appendChild(box);
    container.appendChild(dropdown);

    function renderOptions(filterText = '') {
      dropdown.innerHTML = '';
      const filtered = optionsList.filter(opt => {
        const label = (lang === 'ar' ? opt.ar : opt.en).toLowerCase();
        return !selectedValues.includes(opt.val) && label.includes(filterText.toLowerCase());
      });

      if (filtered.length === 0) {
        dropdown.innerHTML = `<div class="multi-option muted tiny">${trInline('لا توجد نتائج', 'No results')}</div>`;
      } else {
        filtered.forEach(opt => {
          const div = document.createElement('div');
          div.className = 'multi-option';
          div.textContent = lang === 'ar' ? opt.ar : opt.en;
          div.onclick = () => addTag(opt);
          dropdown.appendChild(div);
        });
      }
    }

    function addTag(opt) {
      if (selectedValues.includes(opt.val)) return;
      selectedValues.push(opt.val);
      
      const tag = document.createElement('div');
      tag.className = 'tag-chip';
      tag.innerHTML = `<span>${lang === 'ar' ? opt.ar : opt.en}</span><span class="tag-close">&times;</span>`;
      
      tag.querySelector('.tag-close').onclick = (e) => {
        e.stopPropagation();
        selectedValues = selectedValues.filter(v => v !== opt.val);
        tag.remove();
      };

      box.insertBefore(tag, input);
      input.value = '';
      input.focus();
      renderOptions();
    }

    input.addEventListener('focus', () => { dropdown.classList.add('show'); renderOptions(); });
    input.addEventListener('input', (e) => { dropdown.classList.add('show'); renderOptions(e.target.value); });
    
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) dropdown.classList.remove('show');
    });

    MultiSelectInstances[containerId] = { getSelected: () => selectedValues };
  }

  // 6. تهيئة نماذج الاستبيان
  function initSurveyForms() {
    const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
    if (window.DataService) {
      createMultiSelect('ms_strengths', DataService.surveyOptions.strengths);
      createMultiSelect('ms_interests', DataService.surveyOptions.interests);
      
      const goalSel = document.getElementById('sel_goals');
      if (goalSel) {
        goalSel.innerHTML = `<option value="" disabled selected>${trInline('اختر هدفك...', 'Select goal...')}</option>`;
        DataService.surveyOptions.goals.forEach(g => {
          const opt = document.createElement('option');
          opt.value = g.val;
          opt.textContent = lang === 'ar' ? g.ar : g.en;
          goalSel.appendChild(opt);
        });
      }
    }
  }

  // 7. التنفيذ الرئيسي (Main Execution)
  setTimeout(async () => {

    // تفعيل الأزرار العامة
    document.getElementById('langToggle')?.addEventListener('click', () => {
      I18N.toggle();
      setTimeout(() => location.reload(), 50);
    });
    
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      Auth.logout();
      location.href = 'index.html';
    });
    
    document.getElementById('backBtn')?.addEventListener('click', () => history.back());

    // تطبيق الترجمة أولاً
    I18N.apply();

    // التحقق من حالة تسجيل الدخول بعد الترجمة
    const user = await Auth.currentUser();
    if(user) {
      document.querySelectorAll('.user-only').forEach(el => el.classList.remove('hidden'));
      const inBtn = document.getElementById('loginBtnNav');
      if(inBtn) { 
        inBtn.href = 'dashboard.html'; 
        inBtn.removeAttribute('data-i18n'); // مهم: عشان ما يرجعه "دخول"
        inBtn.innerHTML = trInline(
          'لوحتي <span class="icon">👤</span>',
          'My dashboard <span class="icon">👤</span>'
        );
        inBtn.classList.add('outline'); 
        inBtn.classList.remove('primary');
      }
    }

    // --- منطق تسجيل الدخول (login.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm && window.Auth) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fd = new FormData(loginForm);
        const email = (fd.get('email') || '').trim();
        const password = (fd.get('password') || '').trim();
        const btn = loginForm.querySelector('button[type="submit"]');
        const errEl = document.getElementById('loginErr');

        if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }

        if (!email || !password) {
          const msg = trInline(
            '⚠️ الرجاء إدخال البريد الإلكتروني وكلمة المرور.',
            '⚠️ Please enter your email and password.'
          );
          if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
          }
          if (window.Toast) Toast.show(trInline('الرجاء إدخال البريد وكلمة المرور', 'Please enter email and password'), 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.innerHTML = trInline('جاري تسجيل الدخول... ⏳', 'Signing in... ⏳');
        }

        const ok = await Auth.login(email, password);

        if (ok) {
          const params = new URLSearchParams(location.search);
          const next = params.get('next') || 'dashboard.html';
          location.href = next;
        } else {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span data-i18n="auth.login">دخول</span><span class="icon-arrow">➜</span>';
          }
        }
      });
    }

    // --- منطق إنشاء الحساب (register.html) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm && window.Auth) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fd = new FormData(registerForm);
        const name = (fd.get('name') || '').trim();
        const email = (fd.get('email') || '').trim();
        const password = (fd.get('password') || '').trim();
        const btn = registerForm.querySelector('button[type="submit"]');
        const errEl = document.getElementById('registerErr');

        if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }

        if (!name || !email || !password) {
          const msg = trInline(
            '⚠️ الرجاء تعبئة جميع الحقول.',
            '⚠️ Please fill in all fields.'
          );
          if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
          }
          if (window.Toast) Toast.show(trInline('الرجاء تعبئة جميع الحقول', 'Please fill in all fields'), 'error');
          return;
        }

        if (password.length < 6) {
          const msg = trInline(
            '🔒 كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
            '🔒 Password must be at least 6 characters.'
          );
          if (errEl) {
            errEl.textContent = msg;
            errEl.style.display = 'block';
          }
          if (window.Toast) Toast.show(trInline('كلمة المرور قصيرة جداً', 'Password is too short.'), 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.innerHTML = trInline('جاري إنشاء الحساب... ⏳', 'Creating account... ⏳');
        }

        const ok = await Auth.register(name, email, password);

        if (ok) {
          const loginOk = await Auth.login(email, password);
          if (loginOk) {
            if (window.Toast) Toast.show(
              trInline('تم إنشاء الحساب وتسجيل الدخول بنجاح ✅', 'Account created and logged in successfully ✅'),
              'success'
            );
            location.href = 'survey.html';
          } else {
            if (window.Toast) Toast.show(
              trInline('تم إنشاء الحساب، فضلاً قم بتسجيل الدخول يدوياً.', 'Account created, please log in manually.'),
              'info'
            );
            location.href = 'login.html';
          }
        } else {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span data-i18n="auth.create">إنشاء الحساب</span><span class="icon-arrow">✨</span>';
          }
        }
      });
    }

    // تهيئة الاستبيان إذا وجد
    if (document.getElementById('surveyForm')) initSurveyForms();

    // --- منطق إرسال الاستبيان ---
    const surveyForm = document.getElementById('surveyForm');
    if(surveyForm) {
      surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = surveyForm.querySelector('button[type="submit"]');
        if(btn) { 
          btn.disabled = true; 
          btn.innerHTML = trInline(
            'جاري التحليل... <span class="icon">⚙️</span>',
            'Analyzing... <span class="icon">⚙️</span>'
          );
        }

        try {
          const u = await Auth.currentUser();
          if(!u) throw new Error(trInline('يرجى تسجيل الدخول لحفظ النتائج.', 'Please log in to save your results.'));

          const strengths = MultiSelectInstances['ms_strengths']?.getSelected() || [];
          const interests = MultiSelectInstances['ms_interests']?.getSelected() || [];
          const style = document.getElementById('sel_style').value;
          const goals = document.getElementById('sel_goals').value;

          if (strengths.length === 0 || interests.length === 0 || !style || !goals) {
            throw new Error(trInline(
              'الرجاء تعبئة جميع الحقول واختيار خيار واحد على الأقل.',
              'Please fill in all fields and select at least one option.'
            ));
          }

          const payload = { gpa: 0, strengths, interests, style, goals };

          await supa.from('survey_answers').insert({ user_id: u.id, ...payload });

          const recs = await DataService.generateRecommendations(payload);

          await supa.from('recommendations').insert({ user_id: u.id, payload: recs });

          Toast.show(
            trInline('تم التحليل بنجاح! جاري عرض النتائج...', 'Analysis completed! Loading your results...'),
            'success'
          );
          setTimeout(() => location.href = 'recommendations.html', 1500);

        } catch (ex) {
          console.error(ex);
          Toast.show(ex.message || trInline('حدث خطأ', 'An error occurred'), 'error');
          if(btn) { 
            btn.disabled = false; 
            btn.innerHTML = trInline('حاول مرة أخرى', 'Try again'); 
          }
        }
      });
    }

    // --- منطق صفحة التوصيات ---
    if(location.pathname.endsWith('recommendations.html')) {
      const wrap = document.getElementById('recsList');
      const marketWrap = document.getElementById('marketInsights');
      
      if(wrap && window.DataService) {
        const u = await Auth.currentUser();
        if(u){
          const {data} = await supa.from('recommendations')
            .select('*').eq('user_id', u.id).order('created_at', {ascending:false}).limit(1);
            
          if(data && data[0]){
            wrap.innerHTML = '';
            data[0].payload.forEach((r, idx) => {
              const delay = idx * 0.1;
              wrap.innerHTML += `
                <div class="card glass-effect mb-4 fade-in" style="animation-delay: ${delay}s; border-left: 4px solid var(--brand);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h2 class="h3" style="margin:0; color:var(--brand)">${r.major}</h2>
                    <span class="badge glow">${r.score}% ${trInline('توافق', 'match')}</span>
                  </div>
                  <p class="muted">${r.reason}</p>
                  <div class="recs-grid-details">
                     <div>
                       <strong style="color:var(--accent)">💡 ${trInline('مهارات مطلوبة:', 'Required skills:')}</strong>
                       <ul class="bullet tiny">${r.skills.map(s=>`<li>${s}</li>`).join('')}</ul>
                     </div>
                     <div>
                       <strong style="color:#3b82f6">📚 ${trInline('كورسات مقترحة:', 'Suggested courses:')}</strong>
                       <ul class="bullet tiny">${r.courses.map(c=>`<li>${c}</li>`).join('')}</ul>
                     </div>
                  </div>
                </div>`;
            });
          } else {
            wrap.innerHTML = `
              <div class="card glass-effect p-4 text-center">
                ${trInline('لا توجد توصيات بعد. ابدأ الاستبيان!', 'No recommendations yet. Start the survey!')}
              </div>`;
          }

          const insights = await DataService.getMarketInsights();
          if(marketWrap){
            marketWrap.innerHTML = insights.map(i => `
              <div class="card glass-effect p-3 hover-scale">
                <div class="d-flex justify-between mb-2">
                  <h4 class="h5 m-0">${i.title}</h4>
                  <span class="badge tiny">${i.trend}</span>
                </div>
                <p class="tiny muted m-0">${i.summary}</p>
              </div>
            `).join('');
          }
        }
      }
    }

// --- منطق لوحة التحكم (Dashboard) ---
if (location.pathname.endsWith('dashboard.html')) {
  const u = await Auth.currentUser();
  if (u) {
    const latestDiv   = document.getElementById('latestRecs');
    const topBadge    = document.getElementById('topRecBadge');
    const profileBox  = document.getElementById('profileBox');

    // 1) جلب آخر توصية (مع التاريخ)
    let lastRecDateText = trInline('لا توجد توصيات بعد.', 'No recommendations yet.');

    const { data: recRows } = await supa
      .from('recommendations')
      .select('payload, created_at')
      .eq('user_id', u.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (recRows && recRows[0]) {
      const row = recRows[0];

      // أفضل توصية في البادج العلوي
      if (row.payload && row.payload[0] && topBadge) {
        topBadge.textContent = row.payload[0].major;
      }

      // عرض آخر نتيجتين في "آخر النتائج"
      if (latestDiv && Array.isArray(row.payload)) {
        latestDiv.innerHTML = row.payload.slice(0, 2).map(r => `
          <div class="card glass-effect p-3 mb-2 border-l-brand">
            <div class="d-flex justify-between">
              <strong>${r.major}</strong>
              <span class="tiny badge">${r.score}%</span>
            </div>
          </div>
        `).join('');
      }

      // تجهيز نص تاريخ آخر توصية
      if (row.created_at) {
        const d = new Date(row.created_at);
        const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
        const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
        lastRecDateText = d.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    } else if (latestDiv) {
      latestDiv.innerHTML = `
        <p class="tiny muted text-center">
          ${trInline('لا توجد نتائج بعد.', 'No results yet.')}
        </p>`;
    }

    // 2) جلب بيانات الملف الشخصي (الاسم) + تعبئة كرت "ملفي الشخصي"
    if (profileBox) {
      let displayName =
        (u.user_metadata && u.user_metadata.display_name) || '';

      try {
        if (!displayName) {
          const { data: prof } = await supa
            .from('users_profile')
            .select('display_name')
            .eq('user_id', u.id)
            .limit(1);

          if (prof && prof[0] && prof[0].display_name) {
            displayName = prof[0].display_name;
          }
        }
      } catch (e) {
        console.warn('[Dashboard] profile fetch warning:', e);
      }

      if (!displayName) {
        // آخر حل: نستخدم الإيميل لو الاسم مش موجود
        displayName = u.email || '-';
      }

      profileBox.innerHTML = `
        <div class="profile-item">
          <span class="profile-label">
            ${trInline('الاسم', 'Name')}
          </span>
          <span class="profile-val">${displayName}</span>
        </div>

        <div class="profile-item">
          <span class="profile-label">
            ${trInline('الدولة', 'Country')}
          </span>
          <span class="profile-val">
            ${trInline('السعودية', 'Saudi Arabia')}
          </span>
        </div>

        <div class="profile-item">
          <span class="profile-label">
            ${trInline('تاريخ آخر توصية', 'Last recommendation')}
          </span>
          <span class="profile-val">${lastRecDateText}</span>
        </div>
      `;
    }
  }
}

  }, 100);
})();
