// Data layer with future-ready API hooks
const DataService = {
  // Normalize helper
  _normList(v){
    if(!v) return [];
    if(Array.isArray(v)) return v.map(s=>String(s).trim()).filter(Boolean);
    return String(v).split(',').map(s=>s.trim()).filter(Boolean);
  },

  async generateRecommendations(profile){
    // Placeholder for backend API: POST /api/recommend
    // Normalize input
    const p = {
      gpa: Number(profile.gpa||0),
      strengths: this._normList(profile.strengths),
      interests: this._normList(profile.interests),
      style: profile.style||'visual',
      goals: String(profile.goals||'').trim()
    };

    const majors = [
      { key:'CS', major:'Computer Science', skills:['Data Structures','Algorithms','Python','Git'], courses:['CS50','Algorithms (Coursera)'] },
      { key:'AI', major:'Artificial Intelligence', skills:['ML','Python','NLP','Data Prep'], courses:['Machine Learning (Coursera)','NLP Basics'] },
      { key:'IT', major:'Information Technology', skills:['Networks','SysAdmin','Security Basics'], courses:['CompTIA Network+','Linux Essentials'] },
      { key:'CE', major:'Computer Engineering', skills:['Embedded','C/C++','Digital Logic'], courses:['Embedded Systems','Digital Design'] },
      { key:'IS', major:'Information Systems', skills:['Databases','Business Process','SQL'], courses:['SQL for Data','ERP Basics'] }
    ];

    // Signals
    const likesAI = (p.interests).some(x=>/(^|\s)(ai|ml|data|machine|learning)(\s|$)/i.test(x));
    const likesHW = (p.strengths).some(x=>/(physics|electronics|embedded|circuits)/i.test(x));
    const likesBiz = (p.interests).some(x=>/(business|management|erp|process)/i.test(x));
    const highGpa = (p.gpa||0) >= 3.5;

    const candidates = majors.map(m=>{
      let score = 50;
      if(m.key==='AI' && likesAI) score+=25;
      if(m.key==='CE' && likesHW) score+=20;
      if(m.key==='IS' && likesBiz) score+=15;
      if(m.key==='CS' && highGpa) score+=10;
      if(p.style==='visual' && (m.key==='AI'||m.key==='CS')) score+=5;
      if(p.style==='kinesthetic' && (m.key==='CE'||m.key==='IT')) score+=5;

      // Clamp & reason
      const clamped = Math.max(40, Math.min(95, score));
      const reason = `Matched to your ${likesAI?'AI interests':''}${likesHW?' hardware strengths':''}${likesBiz?' business orientation':''}${highGpa?' and strong GPA':''}.`
        .replace(/\s+/g,' ')
        .replace(/ ,/g,',')
        .replace(/ \./g,'.')
        .trim();

      return {
        major: m.major,
        skills: m.skills,
        courses: m.courses,
        score: clamped,
        reason: reason || 'Personalized based on your profile.'
      };
    }).sort((a,b)=>b.score-a.score);

    // Persist demo data
    localStorage.setItem('ikhtiar_recs', JSON.stringify(candidates));
    return candidates;
  },

  async getRecommendations(){
    // Placeholder for GET /api/recommendations?user=me
    try{
      return JSON.parse(localStorage.getItem('ikhtiar_recs')||'[]');
    }catch{
      return [];
    }
  },

  async getMarketInsights(){
    // Placeholder for future integration (LinkedIn/Bayt)
    return [
      { title:'AI Engineer demand', summary:'Rising demand across fintech and health-tech.', trend:'+18% YoY' },
      { title:'Network Security', summary:'Growing need for SOC and cloud security skills.', trend:'+12% YoY' },
      { title:'Data Platforms', summary:'SQL/ETL remain core across industries.', trend:'+9% YoY' }
    ];
  }
};

/*
Future backend integration:
- POST /api/recommend with {profile} -> [{major, score, skills, courses, reason}]
- GET /api/recommendations (auth required)
- GET /api/market-insights -> [{title, summary, trend}]
*/
