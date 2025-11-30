/**
 * DataService.js
 * المسؤول عن البيانات، خيارات الاستبيان، وخوارزمية التوصية الذكية.
 */

// دالة ترجمة بسيطة مخصصة لهذا الملف
function dsTr(ar, en) {
  const lang = (localStorage.getItem('lang') || 'ar').toLowerCase();
  return lang === 'ar' ? ar : (en || ar);
}

const DataService = {
  // دالة مساعدة لضمان أن المدخلات دائماً في شكل مصفوفة
  _normList(v){
    if(!v) return [];
    if(Array.isArray(v)) return v;
    return [String(v)];
  },

  // ----------------------------------------------------
  // 1. خيارات الاستبيان (موسعة وثنائية اللغة)
  // ----------------------------------------------------
  surveyOptions: {
    strengths: [
      { val: "Math & Logic", ar: "الرياضيات والمنطق", en: "Math & Logic" },
      { val: "Physics", ar: "الفيزياء", en: "Physics" },
      { val: "Coding", ar: "البرمجة (Coding)", en: "Coding" },
      { val: "Algorithms", ar: "الخوارزميات وهياكل البيانات", en: "Algorithms & Data Structures" },
      { val: "Statistics", ar: "الإحصاء والتحليل", en: "Statistics" },
      { val: "Graphic Design", ar: "التصميم الجرافيكي والإبداع", en: "Graphic Design" },
      { val: "Communication", ar: "التواصل والإدارة", en: "Communication" },
      { val: "Project Management", ar: "إدارة المشاريع", en: "Project Management" },
      { val: "Hardware", ar: "العتاد والصيانة (Hardware)", en: "Hardware" },
      { val: "Networks", ar: "أساسيات الشبكات", en: "Networking Basics" },
      { val: "Research", ar: "البحث العلمي والكتابة", en: "Research" },
      { val: "English", ar: "اللغة الإنجليزية", en: "English Language" }
    ],
    interests: [
      { val: "AI", ar: "الذكاء الاصطناعي (AI)", en: "Artificial Intelligence" },
      { val: "Machine Learning", ar: "تعلم الآلة (ML)", en: "Machine Learning" },
      { val: "Cybersecurity", ar: "الأمن السيبراني", en: "Cybersecurity" },
      { val: "Ethical Hacking", ar: "الاختراق الأخلاقي", en: "Ethical Hacking" },
      { val: "Web Frontend", ar: "تطوير الواجهات (Frontend)", en: "Web Frontend" },
      { val: "Web Backend", ar: "تطوير الخلفيات (Backend)", en: "Web Backend" },
      { val: "Full Stack", ar: "تطوير الويب الشامل", en: "Full Stack Web" },
      { val: "Mobile Apps", ar: "تطبيقات الجوال", en: "Mobile App Dev" },
      { val: "Data Science", ar: "علم البيانات", en: "Data Science" },
      { val: "Cloud Computing", ar: "الحوسبة السحابية", en: "Cloud Computing" },
      { val: "DevOps", ar: "عمليات التطوير (DevOps)", en: "DevOps" },
      { val: "UI/UX", ar: "تجربة المستخدم (UI/UX)", en: "UI/UX Design" },
      { val: "Game Dev", ar: "تطوير الألعاب", en: "Game Development" },
      { val: "IoT", ar: "إنترنت الأشياء", en: "Internet of Things" },
      { val: "Blockchain", ar: "البلوك تشين", en: "Blockchain" }
    ],
    goals: [
      { val: "Corporate Job", ar: "وظيفة مرموقة في شركة كبرى", en: "Corporate Job" },
      { val: "Startup", ar: "ريادة أعمال / ستارت أب", en: "Startup Founder" },
      { val: "Freelance", ar: "عمل حر (Freelance)", en: "Freelancing" },
      { val: "Research", ar: "مسار أكاديمي / بحثي", en: "Academic & Research" },
      { val: "Remote Work", ar: "عمل عن بعد", en: "Remote Work" }
    ]
  },

  // ----------------------------------------------------
  // 2. خوارزمية التوصية (Recommendation Engine)
  // ----------------------------------------------------
  async generateRecommendations(profile){
    console.log("Analyzing Profile:", profile);

    // دمج كل النصوص (المهارات والاهتمامات) في نص واحد طويل لتسهيل عملية البحث
    const sStr = (profile.strengths || []).join(' ').toLowerCase();
    const iStr = (profile.interests || []).join(' ').toLowerCase();
    const allText = sStr + ' ' + iStr;

    // قاعدة بيانات التخصصات (يمكن توسيعها مستقبلاً)
    const majors = [
      { 
        key:'CS', major:'Computer Science', 
        skills:['Algorithms','Problem Solving','C++','Java','Architecture'],
        courses:['CS50 (Harvard)','Algorithms Specialization','Operating Systems'],
        // شروط المطابقة: وجود كلمات مفتاحية معينة
        match: () => allText.includes('coding') || allText.includes('math') || allText.includes('algorithms')
      },
      { 
        key:'AI', major:'Artificial Intelligence & Data', 
        skills:['Python','TensorFlow','Statistics','Model Deployment'], 
        courses:['Andrew Ng ML','Deep Learning.ai','Python for Data Science'],
        match: () => allText.includes('ai') || allText.includes('machine') || allText.includes('statistics') || allText.includes('data')
      },
      { 
        key:'Cyber', major:'Cybersecurity', 
        skills:['Network Security','Linux','Ethical Hacking','Risk Mgmt'], 
        courses:['CompTIA Security+','eJPT','Google Cybersecurity'],
        match: () => allText.includes('cyber') || allText.includes('hacking') || allText.includes('networks')
      },
      { 
        key:'SE', major:'Software Engineering', 
        skills:['System Design','Agile','Testing','Clean Code'], 
        courses:['Software Architecture','Agile with Atlassian','Design Patterns'],
        match: () => allText.includes('backend') || allText.includes('project') || allText.includes('full stack')
      },
      { 
        key:'Web', major:'Web Development', 
        skills:['HTML/CSS','JavaScript','React','Node.js'], 
        courses:['The Odin Project','Full Stack Open','Meta Front-End'],
        match: () => allText.includes('web') || allText.includes('frontend') || allText.includes('ui')
      },
      { 
        key:'Cloud', major:'Cloud & DevOps', 
        skills:['AWS/Azure','Docker','Kubernetes','CI/CD'], 
        courses:['AWS Cloud Practitioner','Docker Mastery','DevOps Bootcamp'],
        match: () => allText.includes('cloud') || allText.includes('devops') || allText.includes('networks')
      },
      {
        key:'Game', major:'Game Development',
        skills:['Unity/Unreal','C#','3D Math','Graphics'],
        courses:['CS50 Games','Unity Junior Programmer','Unreal Engine 5'],
        match: () => allText.includes('game') || allText.includes('graphics')
      },
      {
        key:'UIUX', major:'UI/UX Design',
        skills:['Figma','User Research','Prototyping','Wireframing'],
        courses:['Google UX Design','Figma Masterclass'],
        match: () => allText.includes('ui') || allText.includes('design') || allText.includes('graphic')
      }
    ];

    // حساب النقاط (Scoring)
    const results = majors.map(m => {
      let score = 50; // درجة الأساس
      
      // إذا تحقق الشرط الرئيسي، زد النتيجة بشكل كبير
      if(m.match()) score += 35; 
      
      // زيادة ثانوية لبعض الكلمات الدقيقة
      if(m.key === 'AI' && allText.includes('python')) score += 10;
      if(m.key === 'Web' && allText.includes('design')) score += 10;
      if(m.key === 'Cyber' && allText.includes('linux')) score += 10;
      if(m.key === 'CS' && allText.includes('logic')) score += 10;

      // سقف النتيجة 99%
      const finalScore = Math.min(99, score);

      // صياغة السبب (ثنائي اللغة)
      // صياغة السبب (بناءً على اللغة الحالية)
     const lang = (window.I18N?.lang || localStorage.getItem('lang') || 'ar').toLowerCase();

     let reason = lang === 'ar'
     ? 'خيار جيد بناءً على اهتماماتك العامة.'
     : 'A good option based on your general interests.';

     if (m.match()) {
      reason = lang === 'ar'
      ? 'توافق قوي جداً مع مهاراتك واهتماماتك المختارة.'
      : 'Very strong match with your selected skills and interests.';
     }


      return {
        major: m.major,   // اسم التخصص (حالياً إنجليزي، يعرض كما هو في اللغتين)
        skills: m.skills, // تبقى إنجليزية (تقنية)
        courses: m.courses,
        reason: reason,
        score: finalScore
      };
    })
    // ترتيب النتائج تنازلياً حسب النتيجة
    .sort((a,b) => b.score - a.score);

    // إرجاع النتائج (يمكنك تصفيتها لإرجاع أفضل 3 فقط مثلاً)
    return results;
  },
  
  // ----------------------------------------------------
  // 3. رؤى سوق العمل (Market Insights)
  // ----------------------------------------------------
  async getMarketInsights(){
    return [
      { 
        title: dsTr('ثورة الذكاء الاصطناعي', 'AI Revolution'), 
        summary: dsTr(
          'السوق السعودي يستثمر المليارات في الذكاء الاصطناعي ضمن رؤية 2030.',
          'The Saudi market is investing billions in AI as part of Vision 2030.'
        ), 
        trend: dsTr('🔥 اتجاه رائج', '🔥 Top Trend') 
      },
      { 
        title: dsTr('الأمن السيبراني', 'Cybersecurity'), 
        summary: dsTr(
          'الطلب على الأمن السيبراني في أعلى مستوياته تاريخياً لحماية البنية التحتية.',
          'Demand for cybersecurity is at an all-time high to protect critical infrastructure.'
        ), 
        trend: dsTr('🛡️ أولوية قصوى', '🛡️ Critical') 
      },
      { 
        title: dsTr('الحوسبة السحابية', 'Cloud Native'), 
        summary: dsTr(
          'الشركات تنتقل بالكامل للسحابة (Cloud First)، مما يزيد الطلب على DevOps.',
          'Companies are moving to a Cloud-First model, increasing demand for DevOps roles.'
        ), 
        trend: dsTr('☁️ معيار السوق', '☁️ Standard') 
      }
    ];
  }
};

// إتاحة الكائن للنطاق العام
window.DataService = DataService;
