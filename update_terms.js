const fs = require('fs');

function updateFile(file, replacements) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

// 1. Update kenya.js
updateFile('src/data/kenya.js', [
  {from: /subCountiesCount/g, to: 'constituenciesCount'},
  {from: /kenyaSubCountiesData/g, to: 'kenyaConstituenciesData'},
  {from: /getSubCountiesForCounty/g, to: 'getConstituenciesForCounty'},
  {from: /generateKenyaAreas/g, to: 'generateKenyaLocalities'},
  {from: /Sub-Counties/g, to: 'Constituencies'},
  {from: /Sub-County/g, to: 'Constituency'},
  {from: /generateKenyaCitizens\(area\)/g, to: 'generateKenyaCitizens(locality)'},
  {from: /area\.issues/g, to: 'locality.issues'},
  {from: /area\.id/g, to: 'locality.id'},
  {from: /area\.topIssues/g, to: 'locality.topIssues'},
  {from: /ps\.areas/g, to: 'ps.localities'}
]);

// 2. Update mockData.js
updateFile('src/data/mockData.js', [
  {from: /kenyaSubCountiesData as constituencyWardsData/g, to: 'kenyaConstituenciesData as constituencyWardsData'},
  {from: /kenyaSubCountiesData/g, to: 'kenyaConstituenciesData'}
]);

// 3. Update mockDataGenerators.js
updateFile('src/utils/mockDataGenerators.js', [
  {from: /getSubCountiesForCounty as getConstituenciesForDistrict/g, to: 'getConstituenciesForCounty as getConstituenciesForDistrict'},
  {from: /generateKenyaAreas as generateLocalitiesForPollingStation/g, to: 'generateKenyaLocalities as generateLocalitiesForPollingStation'}
]);
