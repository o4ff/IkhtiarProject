// Lightweight i18n with AR/EN and RTL/LTR switch
const I18N = {
  lang: localStorage.getItem('lang') || 'ar',
  dict: {
    ar: {
      // Nav + footer
      'nav.home':'الرئيسية','nav.services':'الخدمات','nav.about':'عن المنصة','nav.survey':'الاستبيان','nav.recs':'التوصيات','nav.contact':'تواصل','nav.login':'دخول','nav.logout':'خروج',
      'footer.tag':'نقودك نحو الاختيار الأفضل.','footer.links':'روابط','footer.privacy':'الخصوصية','footer.about':'عن المنصة','footer.contact':'تواصل','footer.start':'ابدأ','footer.register':'إنشاء حساب','footer.login':'تسجيل دخول','footer.survey':'الاستبيان',

      // Hero + features + CTA
      'hero.title':'اختيارك يبدأ من هنا','hero.subtitle':' منصة اختيار تساعدك على اختيار تخصصك الاكاديمي واقتراح دورات متوافقة مع التخصص لتهيئتك لسوق العمل.','hero.ctaStart':'ابدأ الاستبيان','hero.ctaLearn':'تعرف أكثر','hero.p1':'توصيات مخصصة حسب اهتماماتك ومهاراتك','hero.p2':'اقتراح شهائد مهنية ومسميات وظيفية لتخصصك','hero.p3':'دعم كامل للعربية والإنجليزية وواجهة يسهل استخدامها',
      'features.title':'لماذا Ikhtiar؟','features.f1t':'بوصلتك الذكية','features.f1d':'نظام توصية متقدم يوجّهك نحو مستقبلك الأكاديمي والمهني بثقة.','features.f2t':'لوحة تقدم','features.f2d':'تابع تقدمك، حدّث ملفك، وقدّم ملاحظات لتحسين دقّة التوصيات مع الوقت.','features.f3t':' قابلة للتوسع والتطوير','features.f3d':'بنية تقنية حديثة تتيح التوسع المستقبلي وربط المنصة بمصادر بيانات متعددة.',
      'ctaBand.title':'ابدأ رحلتك بثقة','ctaBand.text':'أجب عن أسئلة قصيرة، واحصل على توصيات مخصصة لميولك وبياناتك.','ctaBand.cta':'ابدأ الآن',

      // About
      'about.title':'عن المنصة','about.1':' منصة اختيار تهدف لدعم الطلاب باتخاذ قرارات مدروسة حول تخصصاتهم باستخدام الذكاء الاصطناعي واستبيان مُهيكل.','about.2':'يوفر المنصة رؤى عن سوق العمل، المؤسسات الباحثة عن تخصصات محددة، والمهارات المطلوبة لكل مسار.','about.goals':'الأهداف','about.g1':'توصيات شخصية للتخصصات والدورات','about.g2':'تعلم مخصص حسب احتياجاتك','about.g3':'ربط مهاراتك بسوق العمل, وادراج المسميات الوظيفية لتخصصك','about.scope':'نطاق المشروع','about.scopeText':'تصميم قابل للتوسّع، جمع وتحليل بيانات المستخدم، دمج خوارزميات ML، ولوحات تفاعلية للمستخدمين.',

      // Services
      'services.title':'الخدمات','services.s1t':'توصيات التخصص','services.s1d':'قائمة مرتبة بالتخصصات الملائمة وفق ملفك واستجاباتك.','services.s2t':'رؤى سوق العمل','services.s2d':' المهارات، المسميات الوظيفية, والمنظمات الباحثة عن تخصصك.','services.s3t':'مسارات تعلم','services.s3d':'دورات وشهادات مقترحة من منصات مثل Coursera وedX وUdemy.',

      // Auth
      'auth.loginTitle':'تسجيل الدخول','auth.email':'البريد الإلكتروني','auth.password':'كلمة المرور','auth.login':'دخول','auth.noAccount':'لا تملك حساباً؟','auth.registerLink':'إنشاء حساب','auth.registerTitle':'إنشاء حساب','auth.name':'الاسم الكامل','auth.create':'إنشاء','auth.haveAccount':'لديك حساب؟','auth.loginLink':'تسجيل الدخول',
      'auth.loginSuccess':'تم تسجيل الدخول بنجاح','auth.loginFail':'فشل تسجيل الدخول',

      // Survey
      'survey.title':'استبيان التخصص','survey.section1':'البيانات الأكاديمية','survey.gpa':'المعدل التقريبي GPA','survey.strengths':'مواد مفضلة/قوة','survey.section2':'الاهتمامات والميول','survey.interests':'مجالات تهمك','survey.style':'أسلوب التعلم','survey.style.visual':'مرئي','survey.style.auditory':'سمعي','survey.style.kin':'عملي','survey.section3':'الأهداف المهنية','survey.goals':'أهدافك','survey.submit':'احصل على التوصيات','survey.helper':'أجب بصدق لتحصل على أفضل مواءمة ✨',

      // Recs + Dashboard
      'recs.title':'توصياتك','recs.market':'رؤى سوق العمل','recs.marketNote':'نقطة تكامل مستقبلية مع LinkedIn / Bayt API.',
      'dash.title':'مرحباً بك','dash.profile':'ملفي','dash.update':'تحديث الاستبيان','dash.latest':'آخر التوصيات','dash.viewAll':'عرض الكل',

      // Contact + Privacy
      'contact.title':'تواصل معنا','contact.name':'الاسم','contact.email':'البريد الإلكتروني','contact.msg':'الرسالة','contact.send':'إرسال','contact.helper':'نرد عادة خلال 24 ساعة.','contact.team':'فريق الدعم','contact.member1':'عبدالمجيد الحازمي','contact.member2':'سعود كليبي','contact.member3':'علي زنقوطي','contact.member4':'علي ال عقيل','contact.member5':'مهند عتيني',
      'privacy.title':'سياسة الخصوصية','privacy.1':'نلتزم بحماية بياناتك وفق أفضل الممارسات وتوافقاً مع المتطلبات التنظيمية.','privacy.p1':'جمع بيانات الاستبيان لغرض التوصية فقط','privacy.p2':'خيار حذف/تصدير بياناتك من لوحة التحكم','privacy.p3':'تخزين آمن وتشفير بالحركة والسكون (عند الربط الخلفي)',

      // How/Testimonials/FAQ/Plans
      'how.title':'كيف نعمل؟','how.s1t':'استبيان تفاعلي','how.s1d':'نحلّل إجاباتك بذكاء لنرسم لك المسار الأنسب.','how.s2t':'تطابق ديناميكي','how.s2d':'نقيّم الملائمة عبر نقاط متعددة ونبني ترتيباً واضحاً.','how.s3t':'خطة تعلم','how.s3d':'نقترح مهارات ودورات وشهادات لرفع فرصك.',
      'testi.title':'قالوا عنا','testi.t1':'ساعدني أفهم الفرق بين علوم الحاسب وتقنية المعلومات وبدأت مساري بثقة.','testi.t2':'الواجهة بسيطة والتوصيات منطقية, الله يعطيكم العافية.','testi.t3':'لوحة التقدم تخلي المتابعة ممتعة.',
      'faq.title':'الأسئلة الشائعة','faq.q1':'هل التوصيات نهائية؟','faq.a1':'هي نقطة بداية قابلة للتخصيص حسب أهدافك وتقدمك.','faq.q2':'هل المنصة تدعم اللغة العربية والانجليزية بالكامل؟','faq.a2':'نعم، يدعم RTL وواجهة ثنائية اللغة مع تبديل فوري.','faq.q3':'هل البيانات آمنة؟','faq.a3':'نلتزم بتخزين آمن وتشفير عند الربط الخلفي.',
      'plans.title':'باقات الاستخدام','plans.free':'مجاني','plans.std':'قياسي','plans.pro':'احترافي','plans.f1':'استبيان أساسي','plans.f2':'3 توصيات','plans.s1':'توصيات غير محدودة','plans.s2':'مسارات تعلم موسعة','plans.p1':'رؤى سوق متقدمة','plans.p2':'تصدير PDF','plans.start':'ابدأ','plans.choose':'اختر','plans.contact':'تواصل',

      // UI
      'ui.back':'رجوع'
    },

    en: {
      // Nav + footer
      'nav.home':'Home','nav.services':'Services','nav.about':'About','nav.survey':'Survey','nav.recs':'Recommendations','nav.contact':'Contact','nav.login':'Login','nav.logout':'Logout',
      'footer.tag':'Guiding you to better choices.','footer.links':'Links','footer.privacy':'Privacy','footer.about':'About','footer.contact':'Contact','footer.start':'Get started','footer.register':'Register','footer.login':'Login','footer.survey':'Survey',

      // Hero + features + CTA
      'hero.title':'Your choice starts here','hero.subtitle':'An Ikhtiar platform that helps you choose your major And suggesting courses that are compatible with your specialization to prepare you for the job market.','hero.ctaStart':'Start survey','hero.ctaLearn':'Learn more','hero.p1':'Personalized recommendations by your skills and interests','hero.p2':'Suggest professional certifications and job titles for your specialization','hero.p3':'Full Arabic/English support with a friendly UI',
      'features.title':'Why Ikhtiar?','features.f1t':'Smart Path','features.f1d':'An advanced recommendation system that confidently guides you towards your academic and professional future.','features.f2t':'Progress hub','features.f2d':'Track progress, update profile and give feedback to improve accuracy.','features.f3t':'Future-Proof Architecture','features.f3d':'Modular design enabling smooth integration with external systems and APIs.',
      'ctaBand.title':'Start your journey','ctaBand.text':'Answer a few short questions to get personalized recommendations based on your data and interests.','ctaBand.cta':'Start now',

      // About
      'about.title':'About','about.1':'Ikhtiar helps students make informed major choices using AI and a structured questionnaire.','about.2':'It offers job-market insights, hiring organizations, and required skills per path.','about.goals':'Goals','about.g1':'Personalized course & major recommendations','about.g2':'Learning tailored to you','about.g3':'Connect your skills to the job market','about.scope':'Scope','about.scopeText':'Scalable Project, user data analysis, ML integration and interactive dashboards.',

      // Services
      'services.title':'Services','services.s1t':'Major recommendations','services.s1d':'Ranked list of suitable majors based on your profile.','services.s2t':'Market insights','services.s2d':'skills, Job titles, and organizations hiring for your major.','services.s3t':'Learning paths','services.s3d':'Suggested courses and certificates from Coursera, edX and Udemy.',

      // Auth
      'auth.loginTitle':'Sign in','auth.email':'Email','auth.password':'Password','auth.login':'Login','auth.noAccount':"Don't have an account?",'auth.registerLink':'Create one','auth.registerTitle':'Create account','auth.name':'Full name','auth.create':'Create','auth.haveAccount':'Already have an account?','auth.loginLink':'Sign in',
      'auth.loginSuccess':'Logged in successfully','auth.loginFail':'Login failed',

      // Survey
      'survey.title':'Major survey','survey.section1':'Academic data','survey.gpa':'Approx. GPA','survey.strengths':'Favorite/strong subjects','survey.section2':'Interests & style','survey.interests':'Fields you like','survey.style':'Learning style','survey.style.visual':'Visual','survey.style.auditory':'Auditory','survey.style.kin':'Hands-on','survey.section3':'Career goals','survey.goals':'Your goals','survey.submit':'Get recommendations','survey.helper':'Answer honestly to get the best match ✨',

      // Recs + Dashboard
      'recs.title':'Your recommendations','recs.market':'Labor-market insights','recs.marketNote':'Future integration point with LinkedIn / Bayt API.',
      'dash.title':'Welcome','dash.profile':'My profile','dash.update':'Update survey','dash.latest':'Latest recommendations','dash.viewAll':'View all',

      // Contact + Privacy
      'contact.title':'Contact us','contact.name':'Name','contact.email':'Email','contact.msg':'Message','contact.send':'Send','contact.helper':'We typically reply within 24 hours.','contact.team':'Support Team','contact.team':'Support Team','contact.member1':'Abdulmajeed Alhazmi','contact.member2':'Saud Kulaiby','contact.member3':'Ali Zanqoti','contact.member4':'Ali AL Agail','contact.member5':'Mohanad Atini',
      'privacy.title':'Privacy policy','privacy.1':'We protect your data following best practices and regulatory requirements.','privacy.p1':'Survey data is used for recommendations only','privacy.p2':'Export/Delete your data from dashboard','privacy.p3':'Secure at-rest/in-transit encryption (when backend is connected)',

      // How/Testimonials/FAQ/Plans
      'how.title':'How it works','how.s1t':'Interactive survey','how.s1d':'We intelligently analyze your answers to chart the most suitable course for you.','how.s2t':'Dynamic matching','how.s2d':'We score multi-factors to build a clear ranking.','how.s3t':'Learning plan','how.s3d':'We suggest skills, courses and certificates to boost outcomes.',
      'testi.title':'Testimonials','testi.t1':'Helped me see CS vs IT clearly and start with confidence.','testi.t2':'Simple UI and sensible recommendations,Thx.','testi.t3':'Progress hub makes tracking enjoyable.',
      'faq.title':'FAQ','faq.q1':'Are recommendations final?','faq.a1':'They are a starting point customizable to your goals.','faq.q2':'Is Arabic and Engliesh language fully supported?','faq.a2':'Yes, full RTL with instant language toggle.','faq.q3':'Is my data safe?','faq.a3':'We commit to secure storage and encryption upon backend integration.',
      'plans.title':'Plans','plans.free':'Free','plans.std':'Standard','plans.pro':'Pro','plans.f1':'Basic survey','plans.f2':'3 recommendations','plans.s1':'Unlimited recommendations','plans.s2':'Extended learning paths','plans.p1':'Advanced market insights','plans.p2':'Export to PDF','plans.start':'Start','plans.choose':'Choose','plans.contact':'Contact',

      // UI
      'ui.back':'Back'
    }
  },

  apply(root=document){
    const {lang}=I18N;
    root.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.getAttribute('data-i18n');
      if(I18N.dict[lang][key]) el.textContent = I18N.dict[lang][key];
    });
    const html = document.documentElement;
    if(lang==='ar'){ html.setAttribute('lang','ar'); html.setAttribute('dir','rtl'); }
    else { html.setAttribute('lang','en'); html.setAttribute('dir','ltr'); }
    const langBtn = document.getElementById('langToggle');
    if(langBtn) langBtn.textContent = lang.toUpperCase();
  },

  toggle(){
    I18N.lang = I18N.lang==='ar'?'en':'ar';
    localStorage.setItem('lang', I18N.lang);
    I18N.apply();
  }
};
