/**
 * I18N.js
 * نظام الترجمة الفوري (عربي/إنجليزي).
 * يدعم تغيير اتجاه الصفحة (RTL/LTR) وتحديث النصوص ديناميكياً.
 */

const I18N = {
  // قراءة اللغة المحفوظة أو الافتراضية
  lang: (localStorage.getItem('lang') || 'ar').toLowerCase(),

  dict: {
    ar: {
      // --- عناوين الصفحات (Titles) ---
      'title.index': 'Ikhtiar | مستقبلك يبدأ هنا',
      'title.login': 'تسجيل الدخول | Ikhtiar',
      'title.register': 'إنشاء حساب | Ikhtiar',
      'title.survey': 'الاستبيان | Ikhtiar',
      'title.privacy': 'سياسة الخصوصية | Ikhtiar',
      'title.dashboard': 'لوحة التحكم | Ikhtiar',
      'title.recs': 'نتائج التحليل | Ikhtiar',

      // --- القائمة والتذييل ---
      'nav.home': 'الرئيسية',
      'nav.services': 'الخدمات',
      'nav.about': 'عن المنصة',
      'nav.survey': 'الاستبيان',
      'nav.recs': 'نتائجي',
      'nav.contact': 'تواصل معنا',
      'nav.login': 'دخول',
      'nav.logout': 'خروج',

      'footer.tag': 'رفيقك الذكي نحو مستقبل تقني واعد.',
      'footer.links': 'روابط سريعة',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.about': 'من نحن',
      'footer.contact': 'الدعم الفني',
      'footer.start': 'ابدأ رحلتك',
      'footer.register': 'حساب جديد',
      'footer.login': 'تسجيل الدخول',
      'footer.copy': '© 2025 منصة اختيار',

      // --- الصفحة الرئيسية (Hero & Features) ---
      'hero.title': 'اكتشف شغفك التقني',
      'hero.subtitle': 'نستخدم الذكاء الاصطناعي لتحليل مهاراتك وشخصيتك، لنرسم لك خارطة طريق واضحة نحو التخصص الأنسب لك في سوق العمل.',
      'hero.ctaStart': 'ابدأ التحليل الآن',
      'hero.ctaLearn': 'كيف نعمل؟',
      'hero.badge': '✨ الإصدار الذكي 2025',
      'hero.statMajors': 'تخصص تقني',
      'hero.statAccuracy': 'تحليل دقيق',
      'hero.badgeCard': '🎯 دقة عالية',

      'features.title': 'لماذا تختار Ikhtiar؟',
      'features.helper': 'نقدم لك تجربة مختلفة عن أي اختبار تقليدي.',
      'features.f1t': 'تحليل ذكي (AI)',
      'features.f1d': 'خوارزميات متقدمة لا تعتمد على الدرجات فقط، بل تربط شغفك بمتطلبات السوق الحالية.',
      'features.f2t': 'ثنائي اللغة',
      'features.f2d': 'دعم كامل للواجهة والنتائج باللغتين العربية والإنجليزية لتناسب تفضيلاتك.',
      'features.f3t': 'مسارات واضحة',
      'features.f3d': 'لا نعطيك اسم التخصص فقط، بل نرسم لك خارطة طريق تشمل الدورات والشهادات.',

      // --- خطوات الرحلة (index steps) ---
      'steps.title': 'رحلتك معنا',
      'steps.1t': 'سجّل دخولك',
      'steps.1d': 'أنشئ حساباً لحفظ نتائجك ومتابعة تقدمك.',
      'steps.2t': 'أكمل الاستبيان',
      'steps.2d': 'أسئلة تفاعلية تحدد ميولك ونمط تعلمك.',
      'steps.3t': 'احصل على التوصية',
      'steps.3d': 'استلم خطة شاملة لمستقبلك التقني.',

      // --- صفحة الخدمات والباقات ---
      'services.badge': 'ماذا نقدم؟',
      'services.title': 'خدماتنا المميزة',
      'services.helper': 'نقدم لك مجموعة من الأدوات الذكية لمساعدتك في اتخاذ القرار الصحيح لمستقبلك المهني والأكاديمي.',
      'services.s1t': 'توصيات التخصص',
      'services.s1d': 'نظام ذكي يحلل شخصيتك ويقترح عليك التخصصات الأنسب لقدراتك.',
      'services.s2t': 'رؤى سوق العمل',
      'services.s2d': 'تعرف على المسميات الوظيفية المطلوبة والشركات التي تبحث عن تخصصك.',
      'services.s3t': 'مسارات تعلم',
      'services.s3d': 'خارطة طريق للكورسات والشهادات من منصات عالمية.',

      'plans.title': 'باقات الاستخدام',
      'plans.helper': 'اختر الخطة المناسبة لاحتياجاتك',
      'plans.free': 'الباقة المجانية',
      'plans.std': 'الباقة القياسية',
      'plans.pro': 'الباقة الاحترافية',
      'plans.free_price': '0 ر.س',
      'plans.std_price': '99 ر.س',
      'plans.pro_price': '199 ر.س',
      'plans.f1': 'استبيان أساسي',
      'plans.f2': '3 توصيات أولية',
      'plans.f3': 'دعم فني أساسي',
      'plans.s1': 'توصيات غير محدودة',
      'plans.s2': 'مسارات تعلم تفصيلية',
      'plans.s3': 'أولوية في الرد على الاستفسارات',
      'plans.p1': 'رؤى سوق متقدمة',
      'plans.p2': 'تصدير تقرير PDF',
      'plans.p3': 'جلسة استشارية مع مرشد',
      'plans.start': 'ابدأ مجاناً',
      'plans.choose': 'اختر الباقة',
      'plans.contact': 'تواصل للمؤسسات',
      'plans.popular': 'الأكثر طلباً',
      'plans.period': '/ شهر',

      // --- صفحة الاستبيان ---
      'survey.title': 'استبيان تحديد المسار',
      'survey.helper': 'اختر مهاراتك واهتماماتك بدقة (يمكنك اختيار أكثر من واحدة).',
      'survey.strengths': 'نقاط القوة والمهارات',
      'survey.interests': 'الاهتمامات التقنية',
      'survey.style': 'أسلوب التعلم المفضل',
      'survey.style.visual': 'بصري (فيديوهات وصور)',
      'survey.style.auditory': 'سمعي (محاضرات وشرح)',
      'survey.style.kinesthetic': 'عملي (تطبيق وتجربة)',
      'survey.goals': 'هدفك المهني',
      'survey.submit': 'تحليل وإظهار النتائج',

      // --- صفحة النتائج (التوصيات) ---
      'recs.title': 'خارطة طريقك',
      'recs.subtitle': 'بناءً على خوارزمياتنا، هذه هي المسارات الأكثر توافقاً مع شغفك.',
      'recs.market': 'رؤى سوق العمل 2025',
      'recs.marketNote': 'بيانات محدثة بناءً على اتجاهات التوظيف في المملكة.',
      'recs.print': 'طباعة التقرير',
      'recs.badge': 'تم التحليل بنجاح ✅',
      'recs.fullTitleMain': 'خارطة طريقك',
      'recs.fullTitleAccent': 'المستقبلية',
      'recs.helpTitle': 'هل تحتاج لمساعدة في البدء؟',
      'recs.helpText': 'فريقنا مستعد لمساعدتك في اختيار الكورسات المناسبة.',
      'recs.helpBtn': 'تواصل مع مرشد أكاديمي',

      // --- لوحة التحكم ---
      'dash.title': 'لوحة التحكم',
      'dash.hello': 'مرحباً بك،',
      'dash.subtitle': 'تابع تقدمك واكتشف فرصك الجديدة.',
      'dash.profile': 'ملفي الشخصي',
      'dash.update': 'تحديث الاستبيان',
      'dash.latest': 'آخر النتائج',
      'dash.viewAll': 'عرض التفاصيل الكاملة',
      'dash.fileStatus': 'حالة الملف',
      'dash.complete': 'مكتمل',
      'dash.bestRec': 'أفضل توصية',
      'dash.joinDate': 'تاريخ الانضمام',

      // --- المصادقة (Auth) ---
      'auth.loginTitle': 'تسجيل الدخول',
      'auth.registerTitle': 'حساب جديد',
      'auth.name': 'الاسم الكامل',
      'auth.email': 'البريد الإلكتروني',
      'auth.password': 'كلمة المرور',
      'auth.login': 'دخول',
      'auth.create': 'إنشاء الحساب',
      'auth.noAccount': 'لا تملك حساباً؟',
      'auth.haveAccount': 'لديك حساب بالفعل؟',
      'auth.registerLink': 'سجّل الآن',
      'auth.loginLink': 'سجّل دخولك',
      'auth.loginSub': 'مرحباً بعودتك! أكمل رحلتك نحو المستقبل.',
      'auth.registerSub': 'انضم إلينا وابدأ رحلة اكتشاف شغفك.',
      'auth.namePlaceholder': 'اسمك الكريم...',
      'auth.emailPlaceholder': 'name@example.com',
      'auth.passwordPlaceholder': '••••••••',

      // --- تواصل معنا ---
      'contact.title': 'تواصل معنا',
      'contact.helper': 'فريقنا جاهز للرد على استفساراتك.',
      'contact.name': 'الاسم',
      'contact.email': 'البريد الإلكتروني',
      'contact.msg': 'الرسالة',
      'contact.send': 'إرسال الرسالة',
      'contact.team': 'فريق النجاح',
      'contact.member1': 'عبدالمجيد الحازمي',
      'contact.member2': 'سعود كليبي',
      'contact.member3': 'علي زنقوطي',
      'contact.member4': 'علي آل عقيل',
      'contact.member5': 'مهند عتيني',
      'contact.namePlaceholder': 'الاسم الكريم...',
      'contact.emailPlaceholder': 'example@email.com',
      'contact.msgPlaceholder': 'كيف يمكننا مساعدتك اليوم؟...',

      // --- الخصوصية ---
      'privacy.title': 'سياسة الخصوصية',
      'privacy.1': 'نلتزم بأعلى معايير الأمان لحماية بياناتك.',
      'privacy.p1': 'شفافية كاملة في جمع البيانات',
      'privacy.p2': 'تحكم كامل في بياناتك الشخصية',
      'privacy.p3': 'تشفير عالي المستوى',
      'privacy.badge': 'أمانك أولويتنا 🔒',
      'privacy.title1': 'سياسة',
      'privacy.title2': 'الخصوصية',
      'privacy.card1Title': 'الشفافية',
      'privacy.card2Title': 'التحكم الكامل',
      'privacy.card3Title': 'حماية قصوى',
      'privacy.promiseTitle': 'عهدنا لك',
      'privacy.promiseText': 'نحن لا نبيع بياناتك لأي طرف ثالث. البيانات التي تشاركها تُستخدم حصرياً لتحسين دقة التوصيات المقدمة لك.',

      // --- عن المنصة ---
      'about.title': 'عن المنصة',
      'about.1': 'مشروع يهدف لتمكين الطلاب من رسم مستقبلهم بدقة باستخدام الذكاء الاصطناعي.',
      'about.goals': 'أهدافنا',
      'about.g1': 'توصيات ذكية ودقيقة',
      'about.g2': 'مسارات تعلم مخصصة',
      'about.g3': 'ربط مباشر بسوق العمل',
      'about.scope': 'نطاق العمل',
      'about.scopeText': 'منصة تفاعلية قابلة للتوسع مدعومة بتحليل البيانات.',

      // مفاتيح إضافية لصفحة about بعد التعديلات
      'about.badge': 'رؤيتنا',
      'about.heroPrefix': 'قصة',
      'about.goalsHelper': 'ما نسعى لتحقيقه من خلال هذه المنصة.',
      'about.g1d': 'تحليل دقيق يقترح عليك التخصصات والدورات الأنسب.',
      'about.g2d': 'خطط تعليمية مفصلة تناسب مستواك واحتياجاتك.',
      'about.g3d': 'جسور تربط مهاراتك بالمسميات الوظيفية الحقيقية.',

      // --- واجهة المستخدم (UI) ---
      'ui.back': 'رجوع',
      'ui.select': 'اختر من القائمة...'
    },

    en: {
      // Page titles
      'title.index': 'Ikhtiar | Your Future Starts Here',
      'title.login': 'Login | Ikhtiar',
      'title.register': 'Create Account | Ikhtiar',
      'title.survey': 'Survey | Ikhtiar',
      'title.privacy': 'Privacy Policy | Ikhtiar',
      'title.dashboard': 'Dashboard | Ikhtiar',
      'title.recs': 'Results | Ikhtiar',

      // Nav + Footer
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.survey': 'Survey',
      'nav.recs': 'My Results',
      'nav.contact': 'Contact',
      'nav.login': 'Login',
      'nav.logout': 'Logout',

      'footer.tag': 'Guiding you to a better tech future.',
      'footer.links': 'Quick Links',
      'footer.privacy': 'Privacy Policy',
      'footer.about': 'About Us',
      'footer.contact': 'Support',
      'footer.start': 'Start Now',
      'footer.register': 'Register',
      'footer.login': 'Login',
      'footer.copy': '© 2025 Ikhtiar Platform',

      // Hero & Features
      'hero.title': 'Discover Your Tech Passion',
      'hero.subtitle': 'We use AI to analyze your skills and personality to map out the perfect career path for you.',
      'hero.ctaStart': 'Start Analysis',
      'hero.ctaLearn': 'How it works?',
      'hero.badge': '✨ Smart Release 2025',
      'hero.statMajors': 'Tech majors',
      'hero.statAccuracy': 'AI-powered analysis',
      'hero.badgeCard': '🎯 High accuracy',

      'features.title': 'Why Ikhtiar?',
      'features.helper': 'We offer a different experience from traditional aptitude tests.',
      'features.f1t': 'AI Powered',
      'features.f1d': 'Advanced algorithms linking your passion to market demands.',
      'features.f2t': 'Bilingual',
      'features.f2d': 'Full Arabic & English support for your preference.',
      'features.f3t': 'Clear Roadmaps',
      'features.f3d': 'We provide courses and certifications, not just job titles.',

      // Steps
      'steps.title': 'Your Journey',
      'steps.1t': 'Create your account',
      'steps.1d': 'Save your results and track your progress.',
      'steps.2t': 'Complete the survey',
      'steps.2d': 'Interactive questions to discover your style.',
      'steps.3t': 'Get your roadmap',
      'steps.3d': 'Receive a full plan for your tech future.',

      // Services & Plans
      'services.badge': 'What we offer',
      'services.title': 'Our Services',
      'services.helper': 'We provide smart tools to help you choose the right academic & career path.',
      'services.s1t': 'Major Recommendations',
      'services.s1d': 'Smart matching system for your capabilities.',
      'services.s2t': 'Market Insights',
      'services.s2d': 'Discover in-demand job titles and hiring companies.',
      'services.s3t': 'Learning Paths',
      'services.s3d': 'Roadmaps with courses from top global platforms.',

      'plans.title': 'Pricing Plans',
      'plans.helper': 'Choose the plan that fits your needs',
      'plans.free': 'Free Plan',
      'plans.std': 'Standard Plan',
      'plans.pro': 'Pro Plan',
      'plans.free_price': '$0',
      'plans.std_price': '$29',
      'plans.pro_price': '$59',
      'plans.f1': 'Basic Survey',
      'plans.f2': '3 Initial Recs',
      'plans.f3': 'Basic Support',
      'plans.s1': 'Unlimited Recs',
      'plans.s2': 'Detailed Paths',
      'plans.s3': 'Priority Support',
      'plans.p1': 'Advanced Insights',
      'plans.p2': 'Export PDF',
      'plans.p3': '1:1 Advisory Session',
      'plans.start': 'Start Free',
      'plans.choose': 'Select Plan',
      'plans.contact': 'Contact Sales',
      'plans.popular': 'Most Popular',
      'plans.period': '/ month',

      // Survey
      'survey.title': 'Career Path Survey',
      'survey.helper': 'Select your skills & interests accurately.',
      'survey.strengths': 'Strengths & Skills',
      'survey.interests': 'Tech Interests',
      'survey.style': 'Learning Style',
      'survey.style.visual': 'Visual',
      'survey.style.auditory': 'Auditory',
      'survey.style.kinesthetic': 'Kinesthetic',
      'survey.goals': 'Career Goal',
      'survey.submit': 'Analyze Results',

      // Recs & Dash
      'recs.title': 'Your Roadmap',
      'recs.subtitle': 'Based on our algorithms, these are your best matches.',
      'recs.market': 'Market Insights 2025',
      'recs.marketNote': 'Updated data based on hiring trends.',
      'recs.print': 'Print Report',
      'recs.badge': 'Analysis Completed ✅',
      'recs.fullTitleMain': 'Your Future',
      'recs.fullTitleAccent': 'Roadmap',
      'recs.helpTitle': 'Need help getting started?',
      'recs.helpText': 'Our team can help you choose the right courses.',
      'recs.helpBtn': 'Contact an advisor',

      'dash.title': 'Dashboard',
      'dash.hello': 'Welcome,',
      'dash.subtitle': 'Track your progress and discover new opportunities.',
      'dash.profile': 'My Profile',
      'dash.update': 'Update Survey',
      'dash.latest': 'Latest Results',
      'dash.viewAll': 'View Full Details',
      'dash.fileStatus': 'Profile Status',
      'dash.complete': 'Complete',
      'dash.bestRec': 'Top Match',
      'dash.joinDate': 'Join Date',

      // Auth
      'auth.loginTitle': 'Login',
      'auth.registerTitle': 'New Account',
      'auth.name': 'Full Name',
      'auth.email': 'Email Address',
      'auth.password': 'Password',
      'auth.login': 'Sign In',
      'auth.create': 'Create Account',
      'auth.noAccount': 'No account?',
      'auth.haveAccount': 'Have an account?',
      'auth.registerLink': 'Register Now',
      'auth.loginLink': 'Login Here',
      'auth.loginSub': 'Welcome back! Continue your journey to the future.',
      'auth.registerSub': 'Join us and start discovering your passion.',
      'auth.namePlaceholder': 'Your full name...',
      'auth.emailPlaceholder': 'name@example.com',
      'auth.passwordPlaceholder': '••••••••',

      // Contact & Privacy & About
      'contact.title': 'Contact Us',
      'contact.helper': 'Our team is ready to help.',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.msg': 'Message',
      'contact.send': 'Send Message',
      'contact.team': 'Success Team',
      'contact.member1': 'Abdulmajeed Alhazmi',
      'contact.member2': 'Saud Kulaybi',
      'contact.member3': 'Ali Zanqoti',
      'contact.member4': 'Ali Al Aghail',
      'contact.member5': 'Mohanad Atini',
      'contact.namePlaceholder': 'Your name...',
      'contact.emailPlaceholder': 'example@email.com',
      'contact.msgPlaceholder': 'How can we help you today?...',

      'privacy.title': 'Privacy Policy',
      'privacy.1': 'We commit to highest security standards.',
      'privacy.p1': 'Transparent Data Collection',
      'privacy.p2': 'Full Data Control',
      'privacy.p3': 'High-Level Encryption',
      'privacy.badge': 'Your Security Comes First 🔒',
      'privacy.title1': 'Privacy',
      'privacy.title2': 'Policy',
      'privacy.card1Title': 'Transparency',
      'privacy.card2Title': 'Full Control',
      'privacy.card3Title': 'Maximum Protection',
      'privacy.promiseTitle': 'Our Commitment',
      'privacy.promiseText': 'We never sell your data to third parties. The data you share is used solely to improve the accuracy of your recommendations.',

      'about.title': 'About Us',
      'about.1': 'Empowering students to shape their future using AI.',
      'about.goals': 'Our Goals',
      'about.g1': 'Smart Recommendations',
      'about.g2': 'Custom Learning',
      'about.g3': 'Market Connection',
      'about.scope': 'Scope',
      'about.scopeText': 'Scalable interactive platform powered by data analysis.',

      'about.badge': 'Our Vision',
      'about.heroPrefix': 'The Story of',
      'about.goalsHelper': 'What we aim to achieve with this platform.',
      'about.g1d': 'Accurate analysis recommending the right majors and courses.',
      'about.g2d': 'Detailed learning plans tailored to your level.',
      'about.g3d': 'Bridging your skills with real job titles.',

      // UI
      'ui.back': 'Back',
      'ui.select': 'Select...'
    }
  },

  // تطبيق اللغة على الصفحة
  apply(root = document) {
    const lang = (this.lang || 'ar').toLowerCase();
    const dict = this.dict[lang] || this.dict.ar;
    
    // تحديث النصوص
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val) {
        // إذا كان العنصر input أو textarea نحدث الـ placeholder
        if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // تحديث اتجاه الصفحة
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // تحديث زر اللغة
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';
  },

  // تبديل اللغة
  toggle() {
    this.lang = this.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', this.lang);
    this.apply();
  }
};

// إتاحة الكائن للنطاق العام
window.I18N = I18N;
