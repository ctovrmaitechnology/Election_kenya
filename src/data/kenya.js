// ============================================================
// kenya.js — ALL Kenya data + generators in one file
// Place at: src/data/kenya.js
// ============================================================

// ─── County Data ─────────────────────────────────────────────
export const kenyaCountiesData = [
  { id: 'nairobi',         name: 'Nairobi',          hq: 'Nairobi City',       governor: 'Johnson Sakaja',       party: 'UDA',        region: 'Nairobi',       subCountiesCount: 17, wardsCount: 85,  population: 4397073, cx: 174, cy: 380, complaintsMajor: 4520, complaintsMinor: 2340, candidates: 120, visitedCount: 45, notVisitedCount: 40, engaged: 28400 },
  { id: 'mombasa',         name: 'Mombasa',           hq: 'Mombasa City',       governor: 'Abdulswamad Nassir',   party: 'ODM',        region: 'Coast',         subCountiesCount: 6,  wardsCount: 30,  population: 1208333, cx: 354, cy: 546, complaintsMajor: 1180, complaintsMinor: 640,  candidates: 38,  visitedCount: 16, notVisitedCount: 14, engaged: 8200  },
  { id: 'kwale',           name: 'Kwale',             hq: 'Kwale Town',         governor: 'Fatuma Achani',        party: 'ODM',        region: 'Coast',         subCountiesCount: 4,  wardsCount: 20,  population: 866820,  cx: 330, cy: 558, complaintsMajor: 480,  complaintsMinor: 220,  candidates: 14,  visitedCount: 10, notVisitedCount: 10, engaged: 3400  },
  { id: 'kilifi',          name: 'Kilifi',            hq: 'Kilifi Town',        governor: 'Gideon Mungaro',       party: 'ODM',        region: 'Coast',         subCountiesCount: 7,  wardsCount: 35,  population: 1453787, cx: 361, cy: 518, complaintsMajor: 720,  complaintsMinor: 310,  candidates: 22,  visitedCount: 18, notVisitedCount: 17, engaged: 5100  },
  { id: 'tana_river',      name: 'Tana River',        hq: 'Hola',               governor: 'Dhadho Godhana',       party: 'UDA',        region: 'Coast',         subCountiesCount: 3,  wardsCount: 15,  population: 315943,  cx: 341, cy: 394, complaintsMajor: 320,  complaintsMinor: 140,  candidates: 8,   visitedCount: 6,  notVisitedCount: 9,  engaged: 1900  },
  { id: 'lamu',            name: 'Lamu',              hq: 'Lamu Town',          governor: 'Issa Timamy',          party: 'Independent',region: 'Coast',         subCountiesCount: 2,  wardsCount: 10,  population: 143920,  cx: 429, cy: 440, complaintsMajor: 215,  complaintsMinor: 90,   candidates: 5,   visitedCount: 4,  notVisitedCount: 6,  engaged: 1200  },
  { id: 'taita_taveta',    name: 'Taita-Taveta',      hq: 'Voi',                governor: 'Andrew Mwadime',       party: 'ODM',        region: 'Coast',         subCountiesCount: 4,  wardsCount: 20,  population: 340671,  cx: 236, cy: 500, complaintsMajor: 290,  complaintsMinor: 120,  candidates: 9,   visitedCount: 8,  notVisitedCount: 12, engaged: 2100  },
  { id: 'garissa',         name: 'Garissa',           hq: 'Garissa Town',       governor: 'Nathif Adam',          party: 'UDA',        region: 'North Eastern', subCountiesCount: 6,  wardsCount: 30,  population: 841353,  cx: 348, cy: 334, complaintsMajor: 560,  complaintsMinor: 240,  candidates: 14,  visitedCount: 10, notVisitedCount: 20, engaged: 3800  },
  { id: 'wajir',           name: 'Wajir',             hq: 'Wajir Town',         governor: 'Ahmed Abdullahi',      party: 'UDA',        region: 'North Eastern', subCountiesCount: 6,  wardsCount: 30,  population: 781263,  cx: 379, cy: 212, complaintsMajor: 480,  complaintsMinor: 200,  candidates: 11,  visitedCount: 7,  notVisitedCount: 23, engaged: 3200  },
  { id: 'mandera',         name: 'Mandera',           hq: 'Mandera Town',       governor: 'Mohamed Khalif',       party: 'UDA',        region: 'North Eastern', subCountiesCount: 6,  wardsCount: 30,  population: 1025756, cx: 447, cy: 68,  complaintsMajor: 620,  complaintsMinor: 270,  candidates: 13,  visitedCount: 6,  notVisitedCount: 24, engaged: 4100  },
  { id: 'marsabit',        name: 'Marsabit',          hq: 'Marsabit Town',      governor: 'Mohamud Ali',          party: 'UDA',        region: 'Eastern',       subCountiesCount: 4,  wardsCount: 20,  population: 459785,  cx: 217, cy: 150, complaintsMajor: 380,  complaintsMinor: 160,  candidates: 9,   visitedCount: 5,  notVisitedCount: 15, engaged: 2400  },
  { id: 'isiolo',          name: 'Isiolo',            hq: 'Isiolo Town',        governor: 'Abdi Ibrahim',         party: 'UDA',        region: 'Eastern',       subCountiesCount: 2,  wardsCount: 9,   population: 268002,  cx: 229, cy: 280, complaintsMajor: 1210,  complaintsMinor: 488,   candidates: 6,   visitedCount: 4,  notVisitedCount: 5,  engaged: 1600  },
  { id: 'meru',            name: 'Meru',              hq: 'Meru Town',          governor: 'Kawira Mwangaza',      party: 'Independent',region: 'Eastern',       subCountiesCount: 9,  wardsCount: 45,  population: 1545714, cx: 223, cy: 298, complaintsMajor: 820,  complaintsMinor: 340,  candidates: 24,  visitedCount: 22, notVisitedCount: 23, engaged: 6800  },
  { id: 'tharaka_nithi',   name: 'Tharaka-Nithi',    hq: 'Chuka Town',         governor: 'Muthomi Njuki',        party: 'UDA',        region: 'Eastern',       subCountiesCount: 3,  wardsCount: 15,  population: 393177,  cx: 236, cy: 315, complaintsMajor: 280,  complaintsMinor: 110,  candidates: 8,   visitedCount: 8,  notVisitedCount: 7,  engaged: 2600  },
  { id: 'embu',            name: 'Embu',              hq: 'Embu Town',          governor: 'Cecily Mbarire',       party: 'UDA',        region: 'Eastern',       subCountiesCount: 4,  wardsCount: 20,  population: 608599,  cx: 223, cy: 334, complaintsMajor: 340,  complaintsMinor: 140,  candidates: 10,  visitedCount: 10, notVisitedCount: 10, engaged: 3100  },
  { id: 'kitui',           name: 'Kitui',             hq: 'Kitui Town',         governor: 'Julius Malombe',       party: 'Wiper',      region: 'Eastern',       subCountiesCount: 8,  wardsCount: 40,  population: 1136187, cx: 248, cy: 388, complaintsMajor: 580,  complaintsMinor: 240,  candidates: 16,  visitedCount: 14, notVisitedCount: 26, engaged: 4500  },
  { id: 'machakos',        name: 'Machakos',          hq: 'Machakos Town',      governor: 'Wavinya Ndeti',        party: 'Wiper',      region: 'Eastern',       subCountiesCount: 8,  wardsCount: 40,  population: 1421932, cx: 205, cy: 395, complaintsMajor: 680,  complaintsMinor: 290,  candidates: 20,  visitedCount: 18, notVisitedCount: 22, engaged: 5800  },
  { id: 'makueni',         name: 'Makueni',           hq: 'Wote',               governor: 'Mutula Kilonzo Jr',    party: 'Wiper',      region: 'Eastern',       subCountiesCount: 6,  wardsCount: 30,  population: 987653,  cx: 223, cy: 425, complaintsMajor: 420,  complaintsMinor: 180,  candidates: 12,  visitedCount: 12, notVisitedCount: 18, engaged: 3800  },
  { id: 'nyandarua',       name: 'Nyandarua',         hq: 'Ol Kalou',           governor: 'Kiarie Badilisha',     party: 'UDA',        region: 'Central',       subCountiesCount: 5,  wardsCount: 25,  population: 638289,  cx: 155, cy: 328, complaintsMajor: 310,  complaintsMinor: 130,  candidates: 10,  visitedCount: 12, notVisitedCount: 13, engaged: 3200  },
  { id: 'nyeri',           name: 'Nyeri',             hq: 'Nyeri Town',         governor: 'Mutahi Kahiga',        party: 'UDA',        region: 'Central',       subCountiesCount: 6,  wardsCount: 30,  population: 759164,  cx: 186, cy: 328, complaintsMajor: 380,  complaintsMinor: 160,  candidates: 12,  visitedCount: 14, notVisitedCount: 16, engaged: 3800  },
  { id: 'kirinyaga',       name: 'Kirinyaga',         hq: 'Kerugoya',           governor: 'Anne Waiguru',         party: 'UDA',        region: 'Central',       subCountiesCount: 5,  wardsCount: 25,  population: 610411,  cx: 205, cy: 334, complaintsMajor: 290,  complaintsMinor: 120,  candidates: 9,   visitedCount: 12, notVisitedCount: 13, engaged: 2900  },
  { id: 'muranga',         name: "Murang'a",          hq: "Murang'a Town",      governor: "Irungu Kang'ata",      party: 'UDA',        region: 'Central',       subCountiesCount: 7,  wardsCount: 35,  population: 1056640, cx: 186, cy: 346, complaintsMajor: 480,  complaintsMinor: 200,  candidates: 14,  visitedCount: 16, notVisitedCount: 19, engaged: 4400  },
  { id: 'kiambu',          name: 'Kiambu',            hq: 'Kiambu Town',        governor: 'Kimani Wamatangi',     party: 'UDA',        region: 'Central',       subCountiesCount: 12, wardsCount: 60,  population: 2417735, cx: 174, cy: 364, complaintsMajor: 1140, complaintsMinor: 490,  candidates: 35,  visitedCount: 28, notVisitedCount: 32, engaged: 9800  },
  { id: 'turkana',         name: 'Turkana',           hq: 'Lodwar',             governor: 'Jeremiah Lomorukai',   party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 926976,  cx: 124, cy: 120, complaintsMajor: 720,  complaintsMinor: 310,  candidates: 16,  visitedCount: 8,  notVisitedCount: 22, engaged: 4200  },
  { id: 'west_pokot',      name: 'West Pokot',        hq: 'Kapenguria',         governor: 'Simon Kachapin',       party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 4,  wardsCount: 20,  population: 621241,  cx: 74,  cy: 206, complaintsMajor: 420,  complaintsMinor: 180,  candidates: 10,  visitedCount: 7,  notVisitedCount: 13, engaged: 2800  },
  { id: 'samburu',         name: 'Samburu',           hq: 'Maralal',            governor: 'Jonathan Lelelit',     party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 3,  wardsCount: 15,  population: 310327,  cx: 181, cy: 230, complaintsMajor: 260,  complaintsMinor: 110,  candidates: 7,   visitedCount: 5,  notVisitedCount: 10, engaged: 1900  },
  { id: 'trans_nzoia',     name: 'Trans-Nzoia',       hq: 'Kitale',             governor: 'George Natembeya',     party: 'DAP-K',      region: 'Rift Valley',   subCountiesCount: 5,  wardsCount: 25,  population: 990341,  cx: 62,  cy: 237, complaintsMajor: 560,  complaintsMinor: 240,  candidates: 16,  visitedCount: 14, notVisitedCount: 11, engaged: 5100  },
  { id: 'uasin_gishu',     name: 'Uasin Gishu',       hq: 'Eldoret',            governor: 'Jonathan Bii',         party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 1163186, cx: 81,  cy: 272, complaintsMajor: 680,  complaintsMinor: 290,  candidates: 20,  visitedCount: 16, notVisitedCount: 14, engaged: 6200  },
  { id: 'elgeyo_marakwet', name: 'Elgeyo-Marakwet',  hq: 'Iten',               governor: 'Wisley Rotich',        party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 4,  wardsCount: 20,  population: 454480,  cx: 93,  cy: 255, complaintsMajor: 280,  complaintsMinor: 118,  candidates: 9,   visitedCount: 9,  notVisitedCount: 11, engaged: 2600  },
  { id: 'nandi',           name: 'Nandi',             hq: 'Kapsabet',           governor: 'Stephen Sang',         party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 885711,  cx: 74,  cy: 292, complaintsMajor: 480,  complaintsMinor: 200,  candidates: 14,  visitedCount: 14, notVisitedCount: 16, engaged: 4400  },
  { id: 'baringo',         name: 'Baringo',           hq: 'Kabarnet',           governor: 'Benjamin Cheboi',      party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 666763,  cx: 133, cy: 260, complaintsMajor: 380,  complaintsMinor: 160,  candidates: 11,  visitedCount: 10, notVisitedCount: 20, engaged: 3200  },
  { id: 'laikipia',        name: 'Laikipia',          hq: 'Nanyuki',            governor: 'Joshua Irungu',        party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 3,  wardsCount: 15,  population: 518560,  cx: 182, cy: 284, complaintsMajor: 260,  complaintsMinor: 110,  candidates: 8,   visitedCount: 7,  notVisitedCount: 8,  engaged: 2700  },
  { id: 'nakuru',          name: 'Nakuru',            hq: 'Nakuru City',        governor: 'Susan Kihika',         party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 11, wardsCount: 55,  population: 2162202, cx: 124, cy: 320, complaintsMajor: 1080, complaintsMinor: 460,  candidates: 32,  visitedCount: 26, notVisitedCount: 29, engaged: 9100  },
  { id: 'narok',           name: 'Narok',             hq: 'Narok Town',         governor: 'Patrick Ntutu',        party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 1157873, cx: 106, cy: 364, complaintsMajor: 580,  complaintsMinor: 245,  candidates: 16,  visitedCount: 12, notVisitedCount: 18, engaged: 4900  },
  { id: 'kajiado',         name: 'Kajiado',           hq: 'Kajiado Town',       governor: 'Joseph ole Lenku',     party: 'ODM',        region: 'Rift Valley',   subCountiesCount: 5,  wardsCount: 25,  population: 1117840, cx: 168, cy: 424, complaintsMajor: 520,  complaintsMinor: 220,  candidates: 15,  visitedCount: 12, notVisitedCount: 13, engaged: 4600  },
  { id: 'kericho',         name: 'Kericho',           hq: 'Kericho Town',       governor: 'Erick Mutai',          party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 6,  wardsCount: 30,  population: 901777,  cx: 81,  cy: 320, complaintsMajor: 460,  complaintsMinor: 195,  candidates: 13,  visitedCount: 14, notVisitedCount: 16, engaged: 4200  },
  { id: 'bomet',           name: 'Bomet',             hq: 'Bomet Town',         governor: 'Hillary Barchok',      party: 'UDA',        region: 'Rift Valley',   subCountiesCount: 5,  wardsCount: 25,  population: 875689,  cx: 74,  cy: 352, complaintsMajor: 420,  complaintsMinor: 178,  candidates: 12,  visitedCount: 11, notVisitedCount: 14, engaged: 3800  },
  { id: 'kakamega',        name: 'Kakamega',          hq: 'Kakamega Town',      governor: 'Fernandes Barasa',     party: 'ODM',        region: 'Western',       subCountiesCount: 12, wardsCount: 60,  population: 1867579, cx: 43,  cy: 285, complaintsMajor: 920,  complaintsMinor: 390,  candidates: 28,  visitedCount: 28, notVisitedCount: 32, engaged: 8400  },
  { id: 'vihiga',          name: 'Vihiga',            hq: 'Mbale',              governor: 'Wilber Ottichilo',     party: 'ODM',        region: 'Western',       subCountiesCount: 5,  wardsCount: 25,  population: 590013,  cx: 43,  cy: 303, complaintsMajor: 320,  complaintsMinor: 135,  candidates: 10,  visitedCount: 12, notVisitedCount: 13, engaged: 3100  },
  { id: 'bungoma',         name: 'Bungoma',           hq: 'Bungoma Town',       governor: 'Ken Lusaka',           party: 'UDA',        region: 'Western',       subCountiesCount: 9,  wardsCount: 45,  population: 1670570, cx: 37,  cy: 260, complaintsMajor: 780,  complaintsMinor: 330,  candidates: 22,  visitedCount: 20, notVisitedCount: 25, engaged: 7200  },
  { id: 'busia',           name: 'Busia',             hq: 'Busia Town',         governor: 'Paul Otuoma',          party: 'UDA',        region: 'Western',       subCountiesCount: 7,  wardsCount: 35,  population: 893681,  cx: 12,  cy: 274, complaintsMajor: 460,  complaintsMinor: 195,  candidates: 13,  visitedCount: 14, notVisitedCount: 21, engaged: 4100  },
  { id: 'siaya',           name: 'Siaya',             hq: 'Siaya Town',         governor: 'James Orengo',         party: 'ODM',        region: 'Nyanza',        subCountiesCount: 6,  wardsCount: 30,  population: 993183,  cx: 19,  cy: 298, complaintsMajor: 480,  complaintsMinor: 205,  candidates: 14,  visitedCount: 14, notVisitedCount: 16, engaged: 4400  },
  { id: 'kisumu',          name: 'Kisumu',            hq: 'Kisumu City',        governor: "Anyang' Nyong'o",      party: 'ODM',        region: 'Nyanza',        subCountiesCount: 7,  wardsCount: 35,  population: 1155574, cx: 50,  cy: 310, complaintsMajor: 620,  complaintsMinor: 265,  candidates: 18,  visitedCount: 18, notVisitedCount: 17, engaged: 5800  },
  { id: 'homa_bay',        name: 'Homa Bay',          hq: 'Homa Bay Town',      governor: 'Gladys Wanga',         party: 'ODM',        region: 'Nyanza',        subCountiesCount: 8,  wardsCount: 40,  population: 1131950, cx: 31,  cy: 340, complaintsMajor: 560,  complaintsMinor: 235,  candidates: 16,  visitedCount: 16, notVisitedCount: 24, engaged: 5000  },
  { id: 'migori',          name: 'Migori',            hq: 'Migori Town',        governor: 'Ochillo Ayacko',       party: 'ODM',        region: 'Nyanza',        subCountiesCount: 8,  wardsCount: 40,  population: 1116436, cx: 31,  cy: 370, complaintsMajor: 520,  complaintsMinor: 220,  candidates: 15,  visitedCount: 14, notVisitedCount: 26, engaged: 4600  },
  { id: 'kisii',           name: 'Kisii',             hq: 'Kisii Town',         governor: 'Simba Arati',          party: 'ODM',        region: 'Nyanza',        subCountiesCount: 9,  wardsCount: 45,  population: 1266860, cx: 50,  cy: 346, complaintsMajor: 680,  complaintsMinor: 290,  candidates: 20,  visitedCount: 20, notVisitedCount: 25, engaged: 6100  },
  { id: 'nyamira',         name: 'Nyamira',           hq: 'Nyamira Town',       governor: 'Amos Nyaribo',         party: 'UDA',        region: 'Nyanza',        subCountiesCount: 4,  wardsCount: 20,  population: 598260,  cx: 62,  cy: 340, complaintsMajor: 320,  complaintsMinor: 135,  candidates: 9,   visitedCount: 9,  notVisitedCount: 11, engaged: 2900  },
];

// ─── Sub-Counties per County ──────────────────────────────────
export const kenyaSubCountiesData = {
  nairobi: [
    { name: 'Westlands',        mp: 'Tim Wanyonyi',        party: 'ODM', wards: 5, major: 280, minor: 140, visited: true  },
    { name: 'Starehe',          mp: 'John Njoroge',        party: 'UDA', wards: 5, major: 310, minor: 155, visited: true  },
    { name: 'Roysambu',         mp: 'Josephine Mburu',     party: 'UDA', wards: 5, major: 260, minor: 130, visited: true  },
    { name: 'Dagoretti North',  mp: 'Beatrice Elachi',     party: 'ODM', wards: 5, major: 245, minor: 122, visited: false },
    { name: 'Dagoretti South',  mp: 'John Kiarie',         party: 'UDA', wards: 5, major: 255, minor: 128, visited: true  },
    { name: "Lang'ata",         mp: 'Felix Odiwuor',       party: 'ODM', wards: 5, major: 270, minor: 135, visited: false },
    { name: 'Kibra',            mp: 'Imran Okoth',         party: 'ODM', wards: 5, major: 320, minor: 160, visited: true  },
    { name: 'Ruaraka',          mp: 'TJ Kajwang',          party: 'ODM', wards: 5, major: 285, minor: 142, visited: false },
    { name: 'Embakasi North',   mp: 'James Gakuya',        party: 'UDA', wards: 5, major: 265, minor: 133, visited: true  },
    { name: 'Embakasi West',    mp: 'George Theuri',       party: 'ODM', wards: 5, major: 240, minor: 120, visited: false },
    { name: 'Embakasi Central', mp: 'Benjamin Gathiru',    party: 'UDA', wards: 5, major: 275, minor: 138, visited: true  },
    { name: 'Embakasi East',    mp: 'Nimrod Mbai',         party: 'UDA', wards: 5, major: 260, minor: 130, visited: false },
    { name: 'Embakasi South',   mp: 'Julius Mvita',        party: 'UDA', wards: 5, major: 250, minor: 125, visited: true  },
    { name: 'Mathare',          mp: 'Anthony Oluoch',      party: 'ODM', wards: 5, major: 305, minor: 153, visited: false },
    { name: 'Kasarani',         mp: 'Ronald Karauri',      party: 'UDA', wards: 5, major: 295, minor: 148, visited: true  },
    { name: 'Makadara',         mp: 'George Aladwa',       party: 'ODM', wards: 5, major: 270, minor: 135, visited: true  },
    { name: 'Kamkunji',         mp: 'Simon Mbugua',        party: 'UDA', wards: 5, major: 235, minor: 118, visited: false },
  ],
  mombasa: [
    { name: 'Changamwe', mp: 'Omar Mwinyi',       party: 'ODM', wards: 5, major: 220, minor: 110, visited: true  },
    { name: 'Jomvu',     mp: 'Badi Twaher',       party: 'ODM', wards: 5, major: 180, minor: 90,  visited: true  },
    { name: 'Kisauni',   mp: 'Ali Mbogo',          party: 'ODM', wards: 5, major: 210, minor: 105, visited: false },
    { name: 'Nyali',     mp: 'Mohammed Ali',       party: 'UDA', wards: 5, major: 195, minor: 98,  visited: true  },
    { name: 'Likoni',    mp: 'Mishi Mboko',        party: 'ODM', wards: 5, major: 205, minor: 102, visited: false },
    { name: 'Mvita',     mp: 'Abdulswamad Said',   party: 'ODM', wards: 5, major: 170, minor: 85,  visited: true  },
  ],
  kisumu: [
    { name: 'Kisumu East',    mp: 'Shakeel Shabbir',  party: 'ODM', wards: 5, major: 110, minor: 48, visited: true  },
    { name: 'Kisumu West',    mp: 'Rosa Buyu',        party: 'ODM', wards: 5, major: 95,  minor: 40, visited: true  },
    { name: 'Kisumu Central', mp: 'Elisha Odhiambo',  party: 'ODM', wards: 5, major: 120, minor: 52, visited: true  },
    { name: 'Seme',           mp: 'James Nyikal',     party: 'ODM', wards: 5, major: 80,  minor: 34, visited: false },
    { name: 'Nyando',         mp: 'Jared Okello',     party: 'ODM', wards: 5, major: 85,  minor: 36, visited: true  },
    { name: 'Muhoroni',       mp: 'Wellington Oduya', party: 'ODM', wards: 5, major: 75,  minor: 32, visited: false },
    { name: 'Nyakach',        mp: 'Aduma Owuor',      party: 'ODM', wards: 5, major: 55,  minor: 23, visited: true  },
  ],
  nakuru: [
    { name: 'Nakuru East',   mp: 'David Gikaria',      party: 'UDA', wards: 5, major: 120, minor: 52, visited: true  },
    { name: 'Nakuru West',   mp: 'Samuel Arama',       party: 'UDA', wards: 5, major: 110, minor: 48, visited: true  },
    { name: 'Molo',          mp: 'Kuria Kimani',       party: 'UDA', wards: 5, major: 90,  minor: 38, visited: false },
    { name: 'Njoro',         mp: 'Charity Kathambi',   party: 'UDA', wards: 5, major: 85,  minor: 36, visited: true  },
    { name: 'Naivasha',      mp: 'Jane Kihara',        party: 'UDA', wards: 5, major: 105, minor: 45, visited: true  },
    { name: 'Gilgil',        mp: 'Martha Wangari',     party: 'UDA', wards: 5, major: 80,  minor: 34, visited: false },
    { name: 'Subukia',       mp: 'Samuel Gachobe',     party: 'UDA', wards: 5, major: 70,  minor: 30, visited: true  },
    { name: 'Rongai',        mp: 'Raymond Moi',        party: 'UDA', wards: 5, major: 75,  minor: 32, visited: false },
    { name: 'Kuresoi South', mp: 'Maoka Maore',        party: 'UDA', wards: 5, major: 78,  minor: 33, visited: true  },
    { name: 'Kuresoi North', mp: 'Hamida Kibore',      party: 'UDA', wards: 5, major: 72,  minor: 31, visited: false },
    { name: 'Nakuru North',  mp: 'Dorcas Kemunto',     party: 'UDA', wards: 5, major: 95,  minor: 41, visited: true  },
  ],
  kiambu: [
    { name: 'Gatundu South', mp: 'Moses Kuria',          party: 'UDA', wards: 5, major: 100, minor: 43, visited: true  },
    { name: 'Gatundu North', mp: 'George Gachagua',      party: 'UDA', wards: 5, major: 88,  minor: 38, visited: false },
    { name: 'Juja',          mp: 'George Koimburi',      party: 'UDA', wards: 5, major: 95,  minor: 41, visited: true  },
    { name: 'Thika Town',    mp: "Alice Ng'ang'a",       party: 'UDA', wards: 5, major: 110, minor: 48, visited: true  },
    { name: 'Ruiru',         mp: "Simon King'ang'i",     party: 'UDA', wards: 5, major: 120, minor: 52, visited: false },
    { name: 'Githunguri',    mp: 'Gathoni Wamuchomba',   party: 'UDA', wards: 5, major: 82,  minor: 35, visited: true  },
    { name: 'Kiambu',        mp: 'Jude Njomo',           party: 'UDA', wards: 5, major: 90,  minor: 39, visited: false },
    { name: 'Kabete',        mp: 'Mugwe Ngugi',          party: 'UDA', wards: 5, major: 78,  minor: 34, visited: true  },
    { name: 'Kikuyu',        mp: "Kimani Ichung'wa",     party: 'UDA', wards: 5, major: 105, minor: 45, visited: true  },
    { name: 'Limuru',        mp: 'Peter Mwathi',         party: 'UDA', wards: 5, major: 85,  minor: 37, visited: false },
    { name: 'Lari',          mp: 'Njoroge Baiya',        party: 'UDA', wards: 5, major: 92,  minor: 40, visited: true  },
    { name: 'Kabete North',  mp: 'Wanjiku Muhia',        party: 'UDA', wards: 5, major: 95,  minor: 41, visited: false },
  ],
  meru: [
    { name: 'Igembe North',   mp: 'Maoka Maore',    party: 'UDA', wards: 5, major: 98,  minor: 41, visited: true  },
    { name: 'Igembe Central', mp: 'Kubai Iringo',   party: 'UDA', wards: 5, major: 88,  minor: 37, visited: false },
    { name: 'Igembe South',   mp: 'Mpuri Aburi',    party: 'UDA', wards: 5, major: 82,  minor: 35, visited: true  },
    { name: 'Tigania West',   mp: 'John Mutunga',   party: 'UDA', wards: 5, major: 92,  minor: 39, visited: false },
    { name: 'Tigania East',   mp: 'Mbae Karithi',   party: 'UDA', wards: 5, major: 86,  minor: 36, visited: true  },
    { name: 'Central Ugu',    mp: 'Titus Ntuchiu',  party: 'UDA', wards: 5, major: 80,  minor: 34, visited: true  },
    { name: 'North Imenti',   mp: 'Rahim Dawood',   party: 'UDA', wards: 5, major: 94,  minor: 40, visited: false },
    { name: 'Buuri',          mp: 'Amos Mithoru',   party: 'UDA', wards: 5, major: 78,  minor: 33, visited: true  },
    { name: 'South Imenti',   mp: 'Kathuri Murungi',party: 'UDA', wards: 5, major: 122, minor: 44, visited: true  },
  ],
  kakamega: [
    { name: 'Lugari',    mp: 'Ayub Savula',      party: 'ANC', wards: 5, major: 88, minor: 37, visited: true  },
    { name: 'Likuyani',  mp: 'Innocent Mugabe',  party: 'ANC', wards: 5, major: 72, minor: 30, visited: false },
    { name: 'Malava',    mp: 'Malulu Injendi',   party: 'ODM', wards: 5, major: 80, minor: 34, visited: true  },
    { name: 'Lurambi',   mp: 'Titus Khamala',    party: 'ODM', wards: 5, major: 78, minor: 33, visited: true  },
    { name: 'Navakholo', mp: 'Emmanuel Wangwe',  party: 'ODM', wards: 5, major: 70, minor: 29, visited: false },
    { name: 'Mumias West',mp: 'Salim Tunis',     party: 'ODM', wards: 5, major: 75, minor: 31, visited: true  },
    { name: 'Mumias East',mp: 'Benjamin Washiali',party: 'UDA', wards: 5, major: 82, minor: 34, visited: false },
    { name: 'Matungu',   mp: 'Murugi Murithi',   party: 'ODM', wards: 5, major: 68, minor: 28, visited: true  },
    { name: 'Butere',    mp: 'Tindi Mwale',      party: 'ODM', wards: 5, major: 76, minor: 32, visited: false },
    { name: 'Khwisero',  mp: 'Christopher Aseka',party: 'ODM', wards: 5, major: 65, minor: 27, visited: true  },
    { name: 'Shinyalu',  mp: 'Justus Kizito',    party: 'ODM', wards: 5, major: 72, minor: 30, visited: false },
    { name: 'Ikolomani', mp: 'Bernard Shinali',  party: 'UDA', wards: 5, major: 74, minor: 31, visited: true  },
  ],
  isiolo: [
    { name: 'Isiolo Sub-County', mp: 'Hassan Odha', party: 'Jubilee', wards: 5, major: 80, minor: 40, visited: true, wardNames: ['Wabera Ward', 'Bulla Pesa Ward', 'Burat Ward', 'Ngaremara Ward', 'Oldonyiro Ward'] },
    { name: 'Garbatulla Sub-County', mp: 'Abdi Koropu', party: 'Jubilee', wards: 3, major: 60, minor: 25, visited: false, wardNames: ['Garbatulla Ward', 'Kinna Ward', 'Chari Ward'] },
    { name: 'Merti Sub-County', mp: 'Jaldes Tute', party: 'UDA', wards: 3, major: 55, minor: 20, visited: true, wardNames: ['Merti Ward', 'Cherab Ward', 'Sericho Ward'] },
  ],
  machakos: [
    { name: 'Masinga',       mp: 'Gerald Mwangi',   party: 'Wiper', wards: 5, major: 95, minor: 40, visited: true  },
    { name: 'Yatta',         mp: 'Charles Mwatu',   party: 'Wiper', wards: 5, major: 88, minor: 37, visited: false },
    { name: 'Kangundo',      mp: 'Robert Mbui',     party: 'Wiper', wards: 5, major: 80, minor: 34, visited: true  },
    { name: 'Matungulu',     mp: 'Stephen Mule',    party: 'Wiper', wards: 5, major: 78, minor: 33, visited: false },
    { name: 'Kathiani',      mp: 'Robert Mbui',     party: 'Wiper', wards: 5, major: 85, minor: 36, visited: true  },
    { name: 'Mavoko',        mp: 'Patrick Makau',   party: 'UDA',   wards: 5, major: 90, minor: 38, visited: true  },
    { name: 'Machakos Town', mp: 'Victor Munyaka',  party: 'UDA',   wards: 5, major: 96, minor: 41, visited: false },
    { name: 'Mwala',         mp: 'Vincent Musyoka', party: 'Wiper', wards: 5, major: 68, minor: 29, visited: true  },
  ],
};

// ─── Problem Categories ───────────────────────────────────────
export const kenyaMajorProblemsDefault = [
  { name: 'Roads & Infrastructure', pct: 28 },
  { name: 'Water & Sanitation',     pct: 22 },
  { name: 'Security & Safety',      pct: 18 },
  { name: 'Land Disputes',          pct: 14 },
  { name: 'Drought & Food Security',pct: 10 },
  { name: 'Healthcare Facilities',  pct: 8  },
];

export const kenyaMinorProblemsDefault = [
  { name: 'Unemployment & Youth',   pct: 25 },
  { name: 'Education Quality',      pct: 20 },
  { name: 'Corruption & Governance',pct: 18 },
  { name: 'Electricity Access',     pct: 16 },
  { name: 'Market & Business',      pct: 12 },
  { name: 'Environment & Forests',  pct: 9  },
];

// ============================================================
// MOCK DATA GENERATORS
// ============================================================
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// ─── Sub-Counties ─────────────────────────────────────────────
export function getSubCountiesForCounty(countyId) {
  let list = kenyaSubCountiesData[countyId];
  if (!list) {
    const county = kenyaCountiesData.find(c => c.id === countyId);
    if (!county) return [];
    const count = county.subCountiesCount || 5;
    list = Array.from({ length: count }).map((_, i) => ({
      name: `${county.name} Sub-County ${i + 1}`,
      mp: 'Pending', party: 'N/A',
      wards: Math.floor(county.wardsCount / count),
      major: Math.floor(county.complaintsMajor / count),
      minor: Math.floor(county.complaintsMinor / count),
      visited: i % 2 === 0,
    }));
  }
  return list.map(sc => {
    const pendingIssues = Math.floor(sc.major * 0.7 + sc.minor * 0.4);
    return {
      ...sc,
      sentimentScore: Math.floor(Math.random() * 40) + 40,
      pendingIssues,
      resolvedIssues: (sc.major + sc.minor) - pendingIssues,
      candidatePerformance: sample(['Excellent', 'Good', 'Average', 'Needs Improvement']),
      aiInsights: {
        topIssues: [
          { name: 'Roads & Infrastructure', count: Math.floor(sc.major * 0.4) },
          { name: 'Water Supply',           count: Math.floor(sc.major * 0.3) },
          { name: 'Youth Unemployment',     count: Math.floor(sc.minor * 0.5) },
        ],
        criticalArea: `${sc.name} Ward ${Math.floor(Math.random() * sc.wards) + 1}`,
        reason: 'Road complaints surged 38% this month due to heavy rains causing flooding.',
        action: 'Deploy county road maintenance team within 72 hours.',
      },
    };
  });
}

// ─── Wards ────────────────────────────────────────────────────
export function generateKenyaWards(subCounty) {
  const ISSUES = ['Roads','Water','Security','Healthcare','Education','Land','Employment','Electricity','Sanitation','Corruption','Agriculture','Food Security'];
  const count = subCounty.wards || 8;
  let remMajor = subCounty.major, remMinor = subCounty.minor;

  const wards = Array.from({ length: count }).map((_, i) => {
    const bm = Math.floor(subCounty.major / count);
    const bn = Math.floor(subCounty.minor / count);
    remMajor -= bm; remMinor -= bn;
    const wardName = subCounty.wardNames && subCounty.wardNames[i] ? subCounty.wardNames[i] : `${subCounty.name} Ward ${i+1}`;
    return { id:`${subCounty.name.replace(/[\s']/g,'-')}-ward-${i+1}`, name: wardName, mca:`MCA ${String.fromCharCode(65+i)}${i}`, pollingStations: Math.floor(Math.random()*16)+31, major:bm, minor:bn, visited: i < Math.floor(count*0.6) };
  });

  while (remMajor > 0) { wards[Math.floor(Math.random()*count)].major++; remMajor--; }
  while (remMinor > 0) { wards[Math.floor(Math.random()*count)].minor++; remMinor--; }

  wards.forEach(w => {
    const total = w.major + w.minor;
    const shuffled = [...ISSUES].sort(() => 0.5 - Math.random());
    const num = Math.min(total, Math.floor(Math.random()*4)+3);
    let rem = total; const issues = [];
    for (let i = 0; i < num; i++) {
      const cnt = i === num-1 ? rem : Math.max(1, Math.floor(Math.random()*(rem/1.5)));
      rem -= cnt;
      if (cnt > 0) issues.push({ type: shuffled[i], count: cnt });
    }
    w.topIssues = issues.sort((a,b) => b.count - a.count);
    const mx = w.topIssues[0]?.count || 1;
    w.topIssues.forEach(i => { i.severity = i.count === mx ? 'major' : 'minor'; });
    w.major = w.topIssues.filter(i=>i.severity==='major').reduce((s,i)=>s+i.count,0);
    w.minor = w.topIssues.filter(i=>i.severity==='minor').reduce((s,i)=>s+i.count,0);
    w.totalIssues = w.major + w.minor;
  });
  return wards.sort((a,b) => b.totalIssues - a.totalIssues);
}

// ─── Polling Stations ─────────────────────────────────────────
export function generatePollingStations(ward) {
  const NAMES = ['Supervisor Wanjiku','Supervisor Ochieng','Supervisor Mwangi','Supervisor Achieng','Supervisor Kamau','Supervisor Otieno'];
  let rem = ward.totalIssues;
  return Array.from({ length: ward.pollingStations }).map((_, i) => {
    const issues = i === ward.pollingStations-1 ? rem : Math.floor(Math.random()*(rem/1.5));
    rem -= issues;
    return { id:`${ward.id}-ps-${i+1}`, name:`Polling Station ${i+1}`, incharge: sample(NAMES), voters: Math.floor(Math.random()*400)+200, areas: Math.floor(Math.random()*3)+2, issues, topIssues: ward.topIssues };
  }).sort((a,b) => b.issues - a.issues);
}

// ─── Areas ────────────────────────────────────────────────────
export function generateKenyaLocalities(ps) {
  const TYPES = ['Village','Estate','Hamlet','Settlement','Township'];
  const ROLES = ['Village Elder','Community Chairman','CBO Chair','Youth Leader','Women Rep'];
  let rem = ps.issues;
  return Array.from({ length: ps.localities }).map((_, i) => {
    const issues = i === ps.localities-1 ? rem : Math.floor(Math.random()*(rem/1.5));
    rem -= issues;
    return {
      id:`${ps.id}-area-${i+1}`,
      name:`${sample(['Kwa ','Mtaa wa ','New ','Old ',''])}${sample(['Mwangi','Otieno','Kamau','Auma','Wanjiku'])} ${sample(TYPES)}`,
      population: Math.floor(Math.random()*1800)+400,
      activeVolunteers: Math.floor(Math.random()*12)+2,
      influencers: [
        { name:`${sample(['Mzee','Chief','Elder'])} ${sample(['Kariuki','Odhiambo','Mwangi','Otieno'])}`, role: sample(ROLES), phone:`+254 7${Math.floor(Math.random()*80000000+10000000)}`, influence:'High', support: sample(['Supportive','Neutral','Needs Convincing']) },
        { name: sample(['Grace','Faith','Mercy','Joyce','John','Peter']), role: sample(['Youth Chairperson','Women Rep','Social Media Coordinator']), phone:`+254 7${Math.floor(Math.random()*80000000+10000000)}`, influence:'Medium', support: sample(['Supportive','Enthusiastic','Neutral']) },
      ],
      issues, topIssues: ps.topIssues, topDiscussed: ps.topIssues?.[0]?.type || 'Roads',
    };
  }).sort((a,b) => b.issues - a.issues);
}

// ─── Citizens ─────────────────────────────────────────────────
export function generateKenyaCitizens(locality) {
  if (locality.issues === 0) return [];
  const FN = ['Grace','Faith','John','Peter','Mary','James','Mercy','Samuel','Ruth','David','Sarah','Daniel'];
  const LN = ['Mwangi','Ochieng','Kamau','Otieno','Wanjiku','Auma','Mutua','Nyambura','Omondi','Gitau'];
  const num = Math.min(locality.issues, 15); let rem = locality.issues;
  return Array.from({ length: num }).map((_, i) => {
    const cnt = i === num-1 ? rem : Math.max(1, Math.floor(rem/(num-i))); rem -= cnt;
    return { id:`${locality.id}-cit-${i+1}`, name:`${sample(FN)} ${sample(LN)}`, phone:`+254 7${Math.floor(Math.random()*80000000+10000000)}`, problemsCount:cnt, topIssues:locality.topIssues, sentiment: sample(['Angry','Frustrated','Neutral','Hopeful']) };
  }).sort((a,b) => b.problemsCount - a.problemsCount);
}

// ─── Problems ─────────────────────────────────────────────────
export function generateKenyaProblems(citizen) {
  const DESC = {
    Roads:           ['Murram road impassable during rains.','Bridge washed away, no alternative route.','Tarmac full of potholes.'],
    Water:           ['Borehole broken for 2 months.','Community tank dried up.','Water supply contaminated.'],
    Security:        ['Banditry attacks on livestock.','Night robbery incidents increasing.','No police post in area.'],
    Healthcare:      ['Dispensary out of drugs.','Nearest hospital 40 km away.','No maternity services locally.'],
    Education:       ['School has no desks for students.','Teacher shortage, 80 kids per class.','Bursary not received.'],
    Land:            ['Land dispute ongoing for 3 years.','Title deed not processed.','Illegal encroachment on community land.'],
    Employment:      ['Youth unemployment, no skills centre.','KAZI MTAANI funds not disbursed.','Women group loan stuck.'],
    Electricity:     ['Transformer burnt, no power for 6 weeks.','REA connection application stalled.','Street lights non-functional.'],
    Sanitation:      ['Open defecation due to no toilets.','Sewage overflow near school.','Garbage collection stopped.'],
    Corruption:      ['Bribe demanded at land registry.','Ward fund misappropriated.','Tenders awarded unfairly.'],
    Agriculture:     ['Fertilizer subsidy not received.','Crop insurance payout delayed.','Irrigation canal silted up.'],
    'Food Security': ['NDMA food relief not reaching village.','Drought killed livestock.','No grain storage nearby.'],
  };
  return Array.from({ length: citizen.problemsCount }).map((_, i) => {
    const type = citizen.topIssues?.[i%(citizen.topIssues?.length||1)]?.type || 'Roads';
    return {
      id:`KE-PRB-${Math.floor(Math.random()*90000+10000)}`, type,
      description: sample(DESC[type] || ['Issue reported by citizen.']),
      priority: Math.random()>0.6?'High':Math.random()>0.5?'Medium':'Low',
      status: sample(['Pending','In Progress','Resolved','Escalated']),
      raisedBy: sample(['Civic Volunteer','MCA Office','Ward Rep','Self','Community Elder']),
      assignedTo: sample(['County Engineer','Sub-County Director','Field Team','Unassigned','NGO Partner']),
      date:`2026-0${Math.floor(Math.random()*6)+1}-${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}`,
    };
  });
}
