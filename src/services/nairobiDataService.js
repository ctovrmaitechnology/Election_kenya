import { districtsData, constituencyWardsData } from '../data/nairobiMockData.js';

// Simple PRNG to generate deterministic random numbers based on a seed string
function getSeededRandom(seedStr) {
  let h = 0xdeadbeef;
  for(let i = 0; i < seedStr.length; i++)
    h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
  let seed = ((h ^ h >>> 16) >>> 0);
  
  return function() {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return ((seed < 0 ? ~seed + 1 : seed) % 100000) / 100000;
  }
}

const sample = (arr, randFn = Math.random) => arr[Math.floor(randFn() * arr.length)];

export function getConstituenciesForDistrict(districtId) {
  if (window.__UPLOADED_DATA__ && window.__UPLOADED_DATA__.constituencies && window.__UPLOADED_DATA__.constituencies[districtId]) {
    return window.__UPLOADED_DATA__.constituencies[districtId];
  }

  const rand = getSeededRandom(districtId);

  let list = constituencyWardsData[districtId];
  if (!list) {
    const dist = districtsData.find(d => d.id === districtId);
    if (!dist) return [];
    const count = dist.constituenciesCount || 5;
    list = Array.from({ length: count }).map((_, i) => ({
      name: `${dist.name} Constituency ${i + 1}`,
      mla: "Pending Election", party: "N/A", wards: Math.floor(dist.wardsCount / count),
      major: Math.floor(dist.complaintsMajor / count), minor: Math.floor(dist.complaintsMinor / count),
      visited: i % 2 === 0
    }));
  }
  
  return list.map(c => {
    const pendingIssues = Math.floor(c.major * 0.7 + c.minor * 0.4);
    const resolvedIssues = (c.major + c.minor) - pendingIssues;
    return {
    ...c,
    sentimentScore: Math.floor(rand() * 40) + 40, // 40-80 score
    pendingIssues,
    resolvedIssues,
    candidatePerformance: sample(["Excellent", "Good", "Average", "Needs Improvement"], rand),
    aiInsights: {
      topIssues: [
        { name: "Water Supply", count: Math.floor(c.major * 0.4) },
        { name: "Road Conditions", count: Math.floor(c.major * 0.3) },
        { name: "Garbage Clearance", count: Math.floor(c.minor * 0.5) }
      ],
      criticalArea: `${c.name} Ward ${Math.floor(rand() * c.wards) + 1}`,
      reason: "Water complaints increased by 42% this month due to pipeline burst.",
      action: "Deploy field team within 48 hours to assess water pipeline damage."
    }
  };
});
}

export function generateWards(constituency) {
  if (window.__UPLOADED_DATA__ && window.__UPLOADED_DATA__.wards && window.__UPLOADED_DATA__.wards[constituency.name]) {
    return window.__UPLOADED_DATA__.wards[constituency.name];
  }

  const rand = getSeededRandom(constituency.name);
  const count = constituency.wards || 10;
  
  // Distribute the exact major and minor issues across wards
  let remainingMajor = constituency.major;
  let remainingMinor = constituency.minor;
  
  const wards = Array.from({ length: count }).map((_, i) => {
    const baseMajor = Math.floor(constituency.major / count);
    const baseMinor = Math.floor(constituency.minor / count);
    
    remainingMajor -= baseMajor;
    remainingMinor -= baseMinor;
    
    return {
      id: `${constituency.name.replace(/\s+/g, '-')}-ward-${i+1}`, 
      name: `${constituency.name} Ward ${i + 1}`,
      corporator: `MCA ${String.fromCharCode(65+i)}${i}`,
      booths: Math.floor(rand() * 5) + 5,
      major: baseMajor,
      minor: baseMinor,
      visited: i < Math.floor(count * 0.6)
    };
  });
  
  // Randomly distribute remaining major issues
  while (remainingMajor > 0) {
    const idx = Math.floor(rand() * count);
    wards[idx].major += 1;
    remainingMajor -= 1;
  }
  
  // Randomly distribute remaining minor issues
  while (remainingMinor > 0) {
    const idx = Math.floor(rand() * count);
    wards[idx].minor += 1;
    remainingMinor -= 1;
  }
  
  // Compute totalIssues and topIssues for each ward
  const CATEGORIES = ["Water", "Roads", "Electricity", "Sanitation", "Healthcare", "Education", "Agriculture", "Housing", "Employment", "Public Safety", "Welfare", "Government Services"];

  wards.forEach(w => {
    let total = w.major + w.minor;
    let issues = [];
    let shuffled = [...CATEGORIES].sort(() => 0.5 - rand());
    let remaining = total;
    let numIssues = Math.min(total, Math.floor(rand() * 4) + 3);
    
    for (let i = 0; i < numIssues; i++) {
        let count;
        if (i === numIssues - 1) {
            count = remaining;
        } else {
            count = Math.floor(rand() * (remaining / 1.5)) + 1;
            remaining -= count;
        }
        if (count > 0) {
            issues.push({ type: shuffled[i], count });
        }
    }
    
    w.topIssues = issues.sort((a, b) => b.count - a.count);
    if (w.topIssues.length > 0) {
        let maxCount = w.topIssues[0].count;
        w.topIssues.forEach(i => {
            i.severity = i.count === maxCount ? 'major' : 'minor';
        });
    }
    
    w.major = w.topIssues.filter(i => i.severity === 'major').reduce((acc, i) => acc + i.count, 0);
    w.minor = w.topIssues.filter(i => i.severity === 'minor').reduce((acc, i) => acc + i.count, 0);
    w.totalIssues = w.major + w.minor;
  });
  
  return wards.sort((a, b) => b.totalIssues - a.totalIssues);
}

export function generateBooths(ward) {
  if (window.__UPLOADED_DATA__ && window.__UPLOADED_DATA__.booths && window.__UPLOADED_DATA__.booths[ward.id]) {
    return window.__UPLOADED_DATA__.booths[ward.id];
  }

  const rand = getSeededRandom(ward.id);
  let remaining = ward.totalIssues;
  return Array.from({ length: ward.booths }).map((_, i) => {
    let issues = 0;
    if (i === ward.booths - 1) {
      issues = remaining;
    } else {
      issues = Math.floor(rand() * (remaining / 1.5));
      remaining -= issues;
    }
    return {
      id: `${ward.id}-booth-${i+1}`, 
      name: `Booth ${i + 101}`,
      incharge: `President ${sample(["Mwangi", "Otieno", "Kamau", "Wanjiku", "Njoroge", "Kimani", "Ochieng", "Karanja"], rand)}`,
      voters: Math.floor(rand() * 500) + 800,
      areas: Math.floor(rand() * 3) + 2,
      issues,
      topIssues: ward.topIssues
    };
  }).sort((a, b) => b.issues - a.issues);
}

export function generateAreas(booth) {
  if (window.__UPLOADED_DATA__ && window.__UPLOADED_DATA__.areas && window.__UPLOADED_DATA__.areas[booth.id]) {
    return window.__UPLOADED_DATA__.areas[booth.id];
  }

  const rand = getSeededRandom(booth.id);
  let remaining = booth.issues;
  const areaTypes = ["Estate", "Road", "Drive", "Zone", "Phase", "Village", "Crescent", "Close", "Avenue", "Settle"];
  const leaderTitles = ["Dr.", "Prof.", "Mr.", "Mrs.", "Ms.", "Hon."];
  const leaderSurnames = ["Mwangi", "Maina", "Kamau", "Otieno", "Ochieng", "Karanja", "Njoroge", "Kimani", "Kariuki", "Mutua", "Musyoka", "Muriithi"];
  const youthNames = ["Kevin", "Brian", "Eric", "Collins", "Evans", "Stacy", "Brenda", "Cindy", "Ian", "Alex", "Victor", "Mitchel"];
  const roles = ["Local Leader", "Ward Volunteer Head", "RWA President", "Community Coordinator"];
  const youthRoles = ["Youth President", "Youth Wing Leader", "Junior Coordinator", "Social Media Head"];

  return Array.from({ length: booth.areas }).map((_, i) => {
    let issues = 0;
    if (i === booth.areas - 1) {
      issues = remaining;
    } else {
      issues = Math.floor(rand() * (remaining / 1.5));
      remaining -= issues;
    }
    const leaderName = `${sample(leaderTitles, rand)} ${sample(leaderSurnames, rand)}`;
    const youthName = sample(youthNames, rand);
    return {
      id: `${booth.id}-area-${i+1}`,
      name: `Sector ${i+1} ${sample(areaTypes, rand)}`,
      population: Math.floor(rand() * 2000) + 500,
      activeVolunteers: Math.floor(rand() * 10) + 2,
      influencers: [
        {
          name: leaderName,
          role: sample(roles, rand),
          phone: `+254 7${Math.floor(rand() * 80000000 + 10000000)}`,
          influence: "High",
          support: sample(["Supportive", "Neutral", "Needs Convincing"], rand)
        },
        {
          name: youthName,
          role: sample(youthRoles, rand),
          phone: `+254 7${Math.floor(rand() * 80000000 + 10000000)}`,
          influence: "Medium",
          support: sample(["Supportive", "Neutral", "Enthusiastic"], rand)
        }
      ],
      issues,
      topIssues: booth.topIssues,
      topDiscussed: (booth.topIssues && booth.topIssues.length > 0) ? sample(booth.topIssues, rand).type : "General Issue"
    };
  }).sort((a, b) => b.issues - a.issues);
}

export function generateCitizens(area) {
  if (window.__UPLOADED_DATA__ && window.__UPLOADED_DATA__.citizens && window.__UPLOADED_DATA__.citizens[area.id]) {
    return window.__UPLOADED_DATA__.citizens[area.id];
  }

  const rand = getSeededRandom(area.id);
  const firstNames = ["John", "James", "Joseph", "David", "Peter", "Daniel", "Michael", "Grace", "Mary", "Alice", "Faith", "Mercy", "Joy", "Emmanuel", "George", "Charles", "Paul", "Francis", "Stephen", "Esther"];
  const lastNames = ["Mwangi", "Maina", "Kamau", "Otieno", "Ochieng", "Onyango", "Karanja", "Njoroge", "Wanjiku", "Kimani", "Kariuki", "Mutua", "Musyoka", "Muriithi", "Wambua", "Atieno", "Achieng", "Adhiambo", "Odiwuor", "Mwenje"];
  if (area.issues === 0) return [];
  
  let numCitizens = Math.min(area.issues, 15);
  let remaining = area.issues;
  
  return Array.from({ length: numCitizens }).map((_, i) => {
    let count = 0;
    if (i === numCitizens - 1) {
       count = remaining;
    } else {
       count = Math.max(1, Math.floor(remaining / (numCitizens - i)));
       remaining -= count;
    }
    return {
      id: `${area.id}-cit-${i+1}`, 
      name: `${sample(firstNames, rand)} ${sample(lastNames, rand)}`,
      phone: `+254 7${Math.floor(rand() * 80000000 + 10000000)}`,
      problemsCount: count,
      topIssues: area.topIssues,
      followUpHistory: rand() > 0.5 ? "Called 2 days ago" : "No recent follow-up",
      sentiment: sample(["Angry", "Frustrated", "Neutral", "Hopeful"], rand)
    };
  }).sort((a, b) => b.problemsCount - a.problemsCount);
}

export function generateProblems(citizen) {
  const rand = getSeededRandom(citizen.id);
  const descMap = {
    "Water": ["No drinking water for the past 3 days in the estate.", "Pipe burst near the bypass causing massive water wastage.", "Contaminated/muddy water supply from county pipelines."],
    "Roads": ["Huge pothole causing accidents near main bypass junction.", "Access road not paved/extremely muddy during rains.", "Severe traffic drainage overflow flooding the road."],
    "Electricity": ["Street lights completely out on the main estate road, high mugging risk.", "Frequent power outages/blackouts during evening hours.", "Transformer leaking oil near residential houses."],
    "Sanitation": ["Nairobi City County garbage truck hasn't visited for 2 weeks.", "Illegal garbage dumping site building up near local school.", "Sewer line blockage flooding back into residential yards."],
    "Healthcare": ["Local county dispensary has no doctors or nurses available.", "Essential medicines out of stock at public clinic.", "Lack of emergency response ambulance in the ward."],
    "Education": ["Local primary school classrooms leaking during rain.", "Congested classrooms and shortage of desks.", "School feeding program funds delayed."],
    "Agriculture": ["Urban farming cooperative support delayed.", "Extension services not accessible to local dairy farmers."],
    "Housing": ["Slum upgrading housing allocation delayed.", "Poor maintenance of county rental estates."],
    "Employment": ["County Kazi Mtaani youth wages pending for 2 months.", "Lack of county vocational training sponsorships for youth."],
    "Public Safety": ["Mugging cases rising due to lack of police/county patrol.", "Illegal local brews and drug den operating openly."],
    "Welfare": ["Older persons cash transfer (OPCT) payout delayed.", "County bursary applications pending for months."],
    "Government Services": ["Long queues and server downtime at Huduma Centre.", "Bribery demanded for business permit approvals."]
  };

  return Array.from({ length: citizen.problemsCount }).map((_, i) => {
    let type = "General";
    if (citizen.topIssues && citizen.topIssues.length > 0) {
      type = sample(citizen.topIssues, rand).type;
    } else {
      type = sample(Object.keys(descMap), rand);
    }
    const descriptions = descMap[type] || ["Issue reported by citizen."];
    const desc = sample(descriptions, rand);

    return {
      id: `PRB-${Math.floor(rand()*10000)}`,
      type: type,
      description: desc,
      priority: rand() > 0.6 ? 'High' : (rand() > 0.5 ? 'Medium' : 'Low'),
      status: sample(["Pending", "In Progress", "Resolved"], rand),
      raisedBy: sample(["Candidate A", "Candidate B", "Self", "Volunteer"], rand),
      assignedTo: sample(["Field Team B", "Ward Engineer", "Contractor", "Unassigned"], rand),
      date: `2026-06-${Math.floor(rand() * 18 + 1).toString().padStart(2, '0')}`
    };
  });
}
