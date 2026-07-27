const fs = require('fs');

const counties = [
  { name: 'Mombasa', constCount: 6 }, { name: 'Kwale', constCount: 4 }, { name: 'Kilifi', constCount: 7 },
  { name: 'Tana River', constCount: 3 }, { name: 'Lamu', constCount: 2 }, { name: 'Taita-Taveta', constCount: 4 },
  { name: 'Garissa', constCount: 5 }, { name: 'Wajir', constCount: 6 }, { name: 'Mandera', constCount: 6 },
  { name: 'Marsabit', constCount: 4 }, { name: 'Isiolo', constCount: 2 }, { name: 'Meru', constCount: 9 },
  { name: 'Tharaka-Nithi', constCount: 3 }, { name: 'Embu', constCount: 4 }, { name: 'Kitui', constCount: 7 },
  { name: 'Machakos', constCount: 8 }, { name: 'Makueni', constCount: 6 }, { name: 'Nyandarua', constCount: 5 },
  { name: 'Nyeri', constCount: 6 }, { name: 'Kirinyaga', constCount: 4 }, { name: 'Muranga', constCount: 7 },
  { name: 'Kiambu', constCount: 12 }, { name: 'Turkana', constCount: 6 }, { name: 'West Pokot', constCount: 4 },
  { name: 'Samburu', constCount: 3 }, { name: 'Trans-Nzoia', constCount: 5 }, { name: 'Uasin Gishu', constCount: 6 },
  { name: 'Elgeyo-Marakwet', constCount: 4 }, { name: 'Nandi', constCount: 6 }, { name: 'Baringo', constCount: 6 },
  { name: 'Laikipia', constCount: 3 }, { name: 'Nakuru', constCount: 11 }, { name: 'Narok', constCount: 6 },
  { name: 'Kajiado', constCount: 5 }, { name: 'Kericho', constCount: 6 }, { name: 'Bomet', constCount: 5 },
  { name: 'Kakamega', constCount: 12 }, { name: 'Vihiga', constCount: 5 }, { name: 'Bungoma', constCount: 9 },
  { name: 'Busia', constCount: 7 }, { name: 'Siaya', constCount: 6 }, { name: 'Kisumu', constCount: 7 },
  { name: 'Homa Bay', constCount: 8 }, { name: 'Migori', constCount: 8 }, { name: 'Kisii', constCount: 9 },
  { name: 'Nyamira', constCount: 4 }, { name: 'Nairobi', constCount: 17 }
];

// Helper functions for random data
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const toId = name => name.toLowerCase().replace(/[^a-z0-9]/g, '_');

let districtsData = [];
let constituencyWardsData = {};

counties.forEach(county => {
  const id = toId(county.name);
  const population = rand(500000, 4500000);
  const wardsCount = county.constCount * rand(4, 7);
  const complaintsMajor = rand(100, 1500);
  const complaintsMinor = rand(50, 800);
  
  districtsData.push({
    id,
    name: county.name,
    hq: county.name + ' City',
    constituenciesCount: county.constCount,
    wardsCount,
    population,
    x: rand(50, 400),
    y: rand(50, 500),
    complaintsMajor,
    complaintsMinor,
    candidates: county.constCount * rand(2, 4),
    visitedCount: rand(10, 100),
    notVisitedCount: rand(10, 50),
    engaged: rand(1000, 25000)
  });

  constituencyWardsData[id] = [];
  for (let i = 1; i <= county.constCount; i++) {
    constituencyWardsData[id].push({
      name: `${county.name} Const ${i}`,
      mla: `Rep ${county.name} ${i}`,
      party: ['UDA', 'ODM', 'Jubilee', 'Wiper'][rand(0, 3)],
      wards: rand(4, 7),
      major: Math.floor(complaintsMajor / county.constCount),
      minor: Math.floor(complaintsMinor / county.constCount),
      visited: Math.random() > 0.5
    });
  }
});

const out = `// Kenya Administrative and Grievance Data Model (2026 projections)

export const districtsData = ${JSON.stringify(districtsData, null, 2)};

export const constituencyWardsData = ${JSON.stringify(constituencyWardsData, null, 2)};

export const majorProblemsDefault = [
  { problem: "Water Supply Issue", complaints: 1388, affected: 156 },
  { problem: "Road Damage", complaints: 1181, affected: 142 },
  { problem: "Drainage Problem", complaints: 961, affected: 113 },
  { problem: "Street Light Not Working", complaints: 805, affected: 98 },
  { problem: "Garbage Collection", complaints: 743, affected: 88 }
];

export const minorProblemsDefault = [
  { problem: "Street Light Dim", complaints: 1162, affected: 128 },
  { problem: "Potholes on Road", complaints: 841, affected: 96 },
  { problem: "Water Leakage", complaints: 607, affected: 74 },
  { problem: "Park Maintenance", complaints: 528, affected: 63 },
  { problem: "Dust on Roads", complaints: 384, affected: 52 }
];

export const whatsappFeedData = [
  { id: 1, sender: "+254 712 345678", text: "Water supply not available in Westlands since yesterday. Please fix it urgently.", time: "10:30 AM", priority: "Major" },
  { id: 2, sender: "+254 722 987654", text: "Street light not working in Kilimani. Streets are very dark.", time: "10:15 AM", priority: "Minor" },
  { id: 3, sender: "+254 733 112233", text: "Road damaged and giant potholes near Nairobi Railway Station crossing.", time: "10:02 AM", priority: "Major" },
  { id: 4, sender: "+254 744 556677", text: "Garbage not collected in Lang'ata since three days. Smells terrible.", time: "09:58 AM", priority: "Minor" },
  { id: 5, sender: "+254 755 998877", text: "Water leakage from pipelines in Karen near the mall.", time: "09:30 AM", priority: "Minor" }
];

export const incomingGrievancesPool = [
  { sender: "+254 711 223344", text: "Severe drainage backup in Eastleigh. Water entering local houses.", priority: "Major", area: "Nairobi" },
  { sender: "+254 722 334455", text: "Street lights completely out on Mombasa Road. Vehicles cannot see.", priority: "Major", area: "Mombasa" },
  { sender: "+254 733 445566", text: "Pothole filled with water in Kisumu Central. Scooter slipped today.", priority: "Major", area: "Kisumu" }
];
`;

fs.writeFileSync('src/data/mockData.js', out);
console.log('Successfully wrote to src/data/mockData.js');
