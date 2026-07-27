const fs = require('fs');
const path = require('path');

function updateFile(file, replacements) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

// Rename file
const oldPath = 'src/pages/dashboards/AreaDashboard.jsx';
const newPath = 'src/pages/dashboards/LocalityDashboard.jsx';
if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log('Renamed AreaDashboard to LocalityDashboard');
}

updateFile(newPath, [
  {from: /AreaDashboard/g, to: 'LocalityDashboard'},
  {from: /Area Overview/g, to: 'Locality Overview'},
  {from: /area\./g, to: 'locality.'},
  {from: /\{ area,/g, to: '{ locality,'},
  {from: /area\} /g, to: 'locality} '}
]);

updateFile('src/pages/dashboards/HierarchyManager.jsx', [
  {from: /AreaDashboard/g, to: 'LocalityDashboard'},
  {from: /boothAreas/g, to: 'boothLocalities'},
  {from: /setBoothAreas/g, to: 'setBoothLocalities'},
  {from: /areaCitizens/g, to: 'localityCitizens'},
  {from: /setAreaCitizens/g, to: 'setLocalityCitizens'},
  {from: /generateAreas/g, to: 'generateLocalities'},
  {from: /Area \/ Locality/g, to: 'Locality'},
  {from: /Areas \/ Localities/g, to: 'Localities'},
  {from: /aId/g, to: 'lId'}
]);

updateFile('src/components/ui/ExcelUploadModal.jsx', [
  {from: /'Area'/g, to: "'Locality'"},
  {from: /Booth, Area/g, to: 'Polling Station, Locality'}
]);

updateFile('src/components/layout/TopHeader.jsx', [
  {from: /Booth, Area/g, to: 'Polling Station, Locality'}
]);

updateFile('src/App.jsx', [
  {from: /AreaDashboard/g, to: 'LocalityDashboard'}
]);
