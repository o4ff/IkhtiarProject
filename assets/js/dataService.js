// Data layer with future-ready API hooks
const DataService = {
  // Normalize helper
  _normList(v){
    if(!v) return [];
    if(Array.isArray(v)) return v.map(s=>String(s).trim()).filter(Boolean);
    return String(v)
      .split(',')
      .map(s=>s.trim())
      .filter(Boolean);
  },

  async generateRecommendations(profile){
    // Normalize input
    const p = {
      gpa: Number(profile.gpa || 0),
      strengths: this._normList(profile.strengths),
      interests: this._normList(profile.interests),
      style: profile.style || 'visual',
      goals: String(profile.goals || '').trim()
    };

    // Majors catalogue (expanded)
    const majors = [
      { key:'CS', major:'Computer Science',
        skills:['Data Structures','Algorithms','Python','Java','Git','Problem Solving'],
        courses:['CS50 (Harvard)','Algorithms (Coursera)','Java Programming (Duke)'],
        certs:['Oracle Java OCP','PCAP (Python)'],
        roles:['Software Engineer','Backend Developer','Full-Stack Developer'],
        companies:['Google','Microsoft','Amazon'] },

      { key:'AI', major:'Artificial Intelligence',
        skills:['Machine Learning','Python','NLP','Data Processing','Deep Learning','Model Deployment'],
        courses:['Machine Learning (Coursera)','Deep Learning Specialization','NLP Basics'],
        certs:['TensorFlow Developer','AWS ML Specialty'],
        roles:['ML Engineer','Data Scientist','NLP Engineer'],
        companies:['OpenAI','NVIDIA','DeepMind'] },

      { key:'DS', major:'Data Science',
        skills:['Statistics','Python/R','Pandas','SQL','Visualization','Modeling'],
        courses:['Data Science Specialization','SQL for Data Analysis','Data Visualization'],
        certs:['Microsoft DP-100','Google Data Analytics'],
        roles:['Data Scientist','Data Analyst','ML Engineer'],
        companies:['Airbnb','Uber','Meta'] },

      { key:'cyber', major:'Cybersecurity',
        skills:['Network Security','SOC Ops','Threat Hunting','SIEM','Cloud Security','Incident Response'],
        courses:['CompTIA Security+ Prep','Blue Team SOC','Cloud Security Basics'],
        certs:['CompTIA Security+','CEH','ISC2 CC'],
        roles:['SOC Analyst','Security Engineer','Penetration Tester'],
        companies:['CrowdStrike','Palo Alto Networks','Cisco'] },

      { key:'cloud', major:'Cloud Computing',
        skills:['AWS/Azure/GCP','IAM','Containers','Kubernetes','CI/CD','IaC (Terraform)'],
        courses:['AWS Cloud Practitioner','Kubernetes Fundamentals','Terraform Basics'],
        certs:['AWS Solutions Architect','Azure Administrator','CKA'],
        roles:['Cloud Engineer','DevOps Engineer','SRE'],
        companies:['Amazon AWS','Google Cloud','Microsoft Azure'] },

      { key:'IT', major:'Information Technology',
        skills:['Networks','SysAdmin','ITIL Basics','Helpdesk','Security Basics'],
        courses:['CompTIA Network+','Linux Essentials','Windows Server Admin'],
        certs:['CompTIA Network+','CompTIA A+','ITIL Foundation'],
        roles:['IT Support','System Administrator','Network Technician'],
        companies:['HP','Dell','Siemens'] },

      { key:'CE', major:'Computer Engineering',
        skills:['Embedded Systems','C/C++','Digital Logic','Microcontrollers','RTOS'],
        courses:['Embedded Systems (Coursera)','Digital Design','ARM Cortex-M'],
        certs:['ARM Accredited Engineer','TI Microcontroller'],
        roles:['Embedded Engineer','Hardware Engineer','Firmware Engineer'],
        companies:['Intel','Texas Instruments','STMicroelectronics'] },

      { key:'IS', major:'Information Systems',
        skills:['Databases','Business Process','ERP','SQL','Requirements'],
        courses:['SQL for Data','ERP Basics','Business Analysis'],
        certs:['SAP TERP','CBAP'],
        roles:['Business Analyst','Systems Analyst','ERP Consultant'],
        companies:['SAP','Oracle','Accenture'] },

      { key:'SE', major:'Software Engineering',
        skills:['OOP','Design Patterns','Testing','CI/CD','Agile','Architecture'],
        courses:['Software Engineering (edX)','Clean Code Practices','Test Automation'],
        certs:['ISTQB Foundation','PSM I'],
        roles:['Software Engineer','QA Automation','Tech Lead'],
        companies:['Spotify','Netflix','Atlassian'] },

      { key:'WEB', major:'Web Development',
        skills:['HTML/CSS/JS','React/Vue','Node.js','REST/GraphQL','Auth','Performance'],
        courses:['Modern React','Node.js Fundamentals','Web Performance'],
        certs:['Meta Front-End','Google Mobile Web Specialist'],
        roles:['Front-End Dev','Full-Stack Dev','Web Performance Engineer'],
        companies:['Shopify','Vercel','GitHub'] },

      { key:'UX', major:'UX/UI Design',
        skills:['User Research','Wireframing','Prototyping','Design Systems','Accessibility'],
        courses:['UX Research','Figma UI Design','Accessibility Fundamentals'],
        certs:['NN/g UX','Google UX Design'],
        roles:['Product Designer','UX Researcher','UI Designer'],
        companies:['Figma','Adobe','Canva'] },

      { key:'NET', major:'Networking',
        skills:['Routing & Switching','TCP/IP','Firewall','Wireless','SDN'],
        courses:['CCNA Prep','Network Fundamentals','Wireless Networks'],
        certs:['Cisco CCNA','Juniper JNCIA'],
        roles:['Network Engineer','NOC Engineer','Security Network Engineer'],
        companies:['Cisco','Juniper','Huawei'] },

      { key:'DB', major:'Database Engineering',
        skills:['SQL','Normalization','Indexing','NoSQL','ETL','Data Modeling','Replication'],
        courses:['SQL Advanced','PostgreSQL Internals','NoSQL Essentials'],
        certs:['Oracle OCP DBA','MongoDB Associate'],
        roles:['DBA','Data Engineer','ETL Developer'],
        companies:['Snowflake','Databricks','Oracle'] },

      { key:'PM', major:'Product/Project Management',
        skills:['Roadmapping','Backlog','Stakeholders','Metrics','Risk','Agile/Scrum'],
        courses:['Product Management 101','Agile Project Management','OKRs'],
        certs:['PSM I','PMI-ACP','PRINCE2'],
        roles:['Product Manager','Scrum Master','Project Manager'],
        companies:['Atlassian','Amazon','Microsoft'] }
    ];

    // Signals
    const likesAI    = p.interests.some(x=>/(^|\s)(ai|ml|data|machine|learning|deep)(\s|$)/i.test(x));
    const likesHW    = p.strengths.some(x=>/(physics|electronics|embedded|circuits|microcontroller)/i.test(x));
    const likesBiz   = p.interests.some(x=>/(business|management|erp|process|product)/i.test(x));
    const likesCloud = p.interests.some(x=>/(cloud|aws|azure|gcp|devops|kubernetes)/i.test(x));
    const likesSec   = p.interests.some(x=>/(security|soc|pentest|blue team|red team)/i.test(x));
    const likesWeb   = p.interests.some(x=>/(web|frontend|backend|react|node)/i.test(x));
    const highGpa    = (p.gpa || 0) >= 3.5;

    const uniq = arr => Array.from(new Set(arr.filter(Boolean)));

    const candidates = majors.map(m=>{
      let score = 50;

      // Interest alignment
      if(m.key==='AI' && likesAI) score+=25;
      if(m.key==='DS' && likesAI) score+=20;
      if(m.key==='CE' && likesHW) score+=20;
      if(m.key==='IS' && likesBiz) score+=15;
      if(m.key==='PM' && likesBiz) score+=10;
      if(m.key==='cloud' && likesCloud) score+=20;
      if(m.key==='cyber' && likesSec) score+=20;
      if(m.key==='WEB' && likesWeb) score+=20;

      // GPA preference for theory-heavy paths
      if((m.key==='CS'||m.key==='AI'||m.key==='DS') && highGpa) score+=10;

      // Learning style nudges
      if(p.style==='visual' && (m.key==='AI'||m.key==='CS'||m.key==='UX')) score+=5;
      if(p.style==='kinesthetic' && (m.key==='CE'||m.key==='IT'||m.key==='NET'||m.key==='cloud')) score+=5;

      const clamped = Math.max(40, Math.min(95, score));
      const reasonText = `Matched to your ${likesAI?'AI/Data interests':''}${likesHW?' hardware strengths':''}${likesBiz?' business orientation':''}${likesCloud?' cloud/devops focus':''}${likesSec?' security interests':''}${likesWeb?' web focus':''}${highGpa?' and strong GPA':''}.`
        .replace(/\s+/g,' ')
        .replace(/ ,/g,',')
        .replace(/ \./g,'.')
        .trim();

      // Merge certs first then courses, and deduplicate
      const mergedCourses = uniq([...(m.certs || []), ...(m.courses || [])]);
      const dedupSkills = uniq(m.skills || []);

      return {
        major: m.major,
        skills: dedupSkills,
        courses: mergedCourses, // certs first, then courses
        roles: m.roles || [],
        companies: m.companies || [],
        score: clamped,
        reason: reasonText || 'Personalized based on your profile.'
      };
    }).sort((a,b)=>b.score-a.score);

    try{
      localStorage.setItem('ikhtiar_recs', JSON.stringify(candidates));
    }catch(e){
      // تجاهل مشاكل مساحة التخزين
      console.warn('localStorage set error:', e);
    }
    return candidates;
  },

  async getRecommendations(){
    try{
      return JSON.parse(localStorage.getItem('ikhtiar_recs') || '[]');
    }catch{
      return [];
    }
  },

  async getMarketInsights(){
    // Placeholder for future integration with hiring platforms (e.g., LinkedIn insights)
    return [
      { title:'AI Engineer demand', summary:'Rising demand across fintech and health-tech.', trend:'+18% YoY' },
      { title:'Network Security', summary:'Growing need for SOC and cloud security skills.', trend:'+12% YoY' },
      { title:'Data Platforms', summary:'SQL/ETL remain core across industries.', trend:'+9% YoY' }
    ];
  }
};

/*
Future backend integration:
- POST /api/recommend with {profile} -> [{major, score, skills, courses, roles, companies, reason}]
- GET /api/recommendations (auth required)
- GET /api/market-insights -> [{title, summary, trend}]
*/

// expose globally (safer across script tags)
window.DataService = DataService;
