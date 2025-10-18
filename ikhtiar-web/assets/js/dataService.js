// Data layer with future-ready API hooks
const DataService = {
  async generateRecommendations(profile){
    // Placeholder for backend API: POST /api/recommend
    // For now, generate simple demo based on interests/strengths/GPA
    const majors = [
      { key:'CS', major:'Computer Science', skills:['Data Structures','Algorithms','Python','Git'], courses:['CS50','Algorithms (Coursera)'] },
      { key:'AI', major:'Artificial Intelligence', skills:['ML','Python','NLP','Data Prep'], courses:['Machine Learning (Coursera)','NLP Basics'] },
      { key:'IT', major:'Information Technology', skills:['Networks','SysAdmin','Security Basics'], courses:['CompTIA Network+','Linux Essentials'] },
      { key:'CE', major:'Computer Engineering', skills:['Embedded','C/C++','Digital Logic'], courses:['Embedded Systems','Digital Design'] },
      { key:'IS', major:'Information Systems', skills:['Databases','Business Process','SQL'], courses:['SQL for Data','ERP Basics'] }
    ];

    // Simple scoring heuristic
    const likesAI = (profile.interests||[]).some(x=>/ai|ml|data/i.test(x));
    const likesHW = (profile.strengths||[]).some(x=>/physics|electronics|embedded/i.test(x));
    const likesBiz = (profile.interests||[]).some(x=>/business|management/i.test(x));
    const highGpa = (profile.gpa||0) >= 3.5;

    const candidates = [];
    majors.forEach(m=>{
      let score = 50;
      if(m.key==='AI' && likesAI) score+=25;
      if(m.key==='CE' && likesHW) score+=20;
      if(m.key==='IS' && likesBiz) score+=15;
      if(m.key==='CS' && highGpa) score+=10;
      if(profile.style==='visual' && (m.key==='AI'||m.key==='CS')) score+=5;
      if(profile.style==='kinesthetic' && (m.key==='CE'||m.key==='IT')) score+=5;

      candidates.push({
        major: m.major,
        skills: m.skills,
        courses: m.courses,
        score: Math.min(95, score),
        reason: `Matched to your ${likesAI?'AI interests':''}${likesHW?' hardware strengths':''}${likesBiz?' business orientation':''}${highGpa?' and strong GPA':''}.`.replace(/\s+/g,' ').trim()

      });
    });

    candidates.sort((a,b)=>b.score-a.score);
    localStorage.setItem('ikhtiar_recs', JSON.stringify(candidates));
    return candidates;
  },

  async getRecommendations(){
    // Placeholder for GET /api/recommendations?user=me
    return JSON.parse(localStorage.getItem('ikhtiar_recs')||'[]');
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



