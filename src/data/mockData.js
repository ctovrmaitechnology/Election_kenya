import {
  kenyaCountiesData,
  kenyaSubCountiesData,
  kenyaMajorProblemsDefault,
  kenyaMinorProblemsDefault
} from './kenya.js';

export {
  kenyaCountiesData as countiesData,
  kenyaSubCountiesData as subCountyWardsData
};

export const majorProblemsDefault = kenyaMajorProblemsDefault.map(p => ({
  problem: p.name,
  complaints: p.pct * 120,
  affected: p.pct * 15
}));

export const minorProblemsDefault = kenyaMinorProblemsDefault.map(p => ({
  problem: p.name,
  complaints: p.pct * 90,
  affected: p.pct * 10
}));

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

// ─── Mombasa County Sub-County Data (from Election Campaign) ─────────────────
export const mombasaDistrictsData = [
  { id: 'changamwe', name: 'Changamwe', hq: 'Changamwe', constituenciesCount: 5, wardsCount: 5, population: 153000, x: 0, y: 0, complaintsMajor: 120, complaintsMinor: 45, candidates: 6, visitedCount: 40, notVisitedCount: 15, engaged: 2400 },
  { id: 'jomvu',     name: 'Jomvu',     hq: 'Jomvu',     constituenciesCount: 3, wardsCount: 3, population: 110000, x: 0, y: 0, complaintsMajor: 90,  complaintsMinor: 30, candidates: 4, visitedCount: 25, notVisitedCount: 10, engaged: 1800 },
  { id: 'kisauni',   name: 'Kisauni',   hq: 'Kisauni',   constituenciesCount: 7, wardsCount: 7, population: 290000, x: 0, y: 0, complaintsMajor: 180, complaintsMinor: 80, candidates: 8, visitedCount: 65, notVisitedCount: 25, engaged: 3500 },
  { id: 'nyali',     name: 'Nyali',     hq: 'Nyali',     constituenciesCount: 5, wardsCount: 5, population: 210000, x: 0, y: 0, complaintsMajor: 150, complaintsMinor: 60, candidates: 7, visitedCount: 55, notVisitedCount: 20, engaged: 2900 },
  { id: 'mvita',     name: 'Mvita',     hq: 'Mvita',     constituenciesCount: 5, wardsCount: 5, population: 160000, x: 0, y: 0, complaintsMajor: 140, complaintsMinor: 55, candidates: 5, visitedCount: 45, notVisitedCount: 15, engaged: 2600 },
  { id: 'likoni',    name: 'Likoni',    hq: 'Likoni',    constituenciesCount: 5, wardsCount: 5, population: 200000, x: 0, y: 0, complaintsMajor: 160, complaintsMinor: 70, candidates: 6, visitedCount: 50, notVisitedCount: 20, engaged: 3100 },
];

export const mombasaConstituencyWardsData = {
  changamwe: [
    { name: 'Port Reitz', mla: 'Ward Rep', party: 'ODM', wards: 1, major: 30, minor: 10, visited: true },
    { name: 'Kipevu',     mla: 'Ward Rep', party: 'ODM', wards: 1, major: 25, minor: 12, visited: true },
    { name: 'Airport',    mla: 'Ward Rep', party: 'UDA', wards: 1, major: 20, minor: 8,  visited: false },
    { name: 'Changamwe',  mla: 'Ward Rep', party: 'ODM', wards: 1, major: 35, minor: 10, visited: true },
    { name: 'Chaani',     mla: 'Ward Rep', party: 'UDA', wards: 1, major: 10, minor: 5,  visited: false },
  ],
  jomvu: [
    { name: 'Jomvu Kuu', mla: 'Ward Rep', party: 'ODM', wards: 1, major: 35, minor: 15, visited: true },
    { name: 'Miritini',  mla: 'Ward Rep', party: 'ODM', wards: 1, major: 30, minor: 10, visited: false },
    { name: 'Mikindani', mla: 'Ward Rep', party: 'UDA', wards: 1, major: 25, minor: 5,  visited: true },
  ],
  kisauni: [
    { name: 'Mjambere',   mla: 'Ward Rep', party: 'ODM', wards: 1, major: 25, minor: 10, visited: true },
    { name: 'Junda',      mla: 'Ward Rep', party: 'ODM', wards: 1, major: 30, minor: 15, visited: false },
    { name: 'Bamburi',    mla: 'Ward Rep', party: 'UDA', wards: 1, major: 28, minor: 12, visited: true },
    { name: 'Mwakirunge', mla: 'Ward Rep', party: 'ODM', wards: 1, major: 15, minor: 8,  visited: true },
    { name: 'Mtopanga',   mla: 'Ward Rep', party: 'UDA', wards: 1, major: 22, minor: 10, visited: false },
    { name: 'Magogoni',   mla: 'Ward Rep', party: 'ODM', wards: 1, major: 20, minor: 9,  visited: true },
    { name: 'Shanzu',     mla: 'Ward Rep', party: 'UDA', wards: 1, major: 40, minor: 16, visited: false },
  ],
  nyali: [
    { name: 'Frere Town',       mla: 'Ward Rep', party: 'ODM', wards: 1, major: 35, minor: 12, visited: true },
    { name: "Ziwa La Ng'ombe",  mla: 'Ward Rep', party: 'ODM', wards: 1, major: 28, minor: 10, visited: true },
    { name: 'Mkomani',          mla: 'Ward Rep', party: 'UDA', wards: 1, major: 22, minor: 8,  visited: false },
    { name: 'Kongowea',         mla: 'Ward Rep', party: 'ODM', wards: 1, major: 40, minor: 18, visited: true },
    { name: 'Kadzandani',       mla: 'Ward Rep', party: 'UDA', wards: 1, major: 25, minor: 12, visited: false },
  ],
  mvita: [
    { name: 'Mji Wa Kale / Makadara', mla: 'Ward Rep', party: 'ODM', wards: 1, major: 30, minor: 10, visited: true },
    { name: 'Tudor',                   mla: 'Ward Rep', party: 'ODM', wards: 1, major: 28, minor: 12, visited: false },
    { name: 'Tononoka',                mla: 'Ward Rep', party: 'UDA', wards: 1, major: 25, minor: 11, visited: true },
    { name: 'Majengo',                 mla: 'Ward Rep', party: 'ODM', wards: 1, major: 35, minor: 15, visited: true },
    { name: 'Shimanzi / Ganjoni',      mla: 'Ward Rep', party: 'UDA', wards: 1, major: 22, minor: 7,  visited: false },
  ],
  likoni: [
    { name: 'Mtongwe',     mla: 'Ward Rep', party: 'ODM', wards: 1, major: 30, minor: 15, visited: true },
    { name: 'Shika Adabu', mla: 'Ward Rep', party: 'UDA', wards: 1, major: 25, minor: 10, visited: false },
    { name: 'Bofu',        mla: 'Ward Rep', party: 'ODM', wards: 1, major: 35, minor: 12, visited: true },
    { name: 'Likoni',      mla: 'Ward Rep', party: 'ODM', wards: 1, major: 45, minor: 20, visited: true },
    { name: 'Timbwani',    mla: 'Ward Rep', party: 'UDA', wards: 1, major: 25, minor: 13, visited: false },
  ],
};
