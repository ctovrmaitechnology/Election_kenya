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
const oldPath = 'src/pages/dashboards/BoothDashboard.jsx';
const newPath = 'src/pages/dashboards/PollingStationDashboard.jsx';
if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log('Renamed BoothDashboard to PollingStationDashboard');
}

updateFile(newPath, [
  {from: /BoothDashboard/g, to: 'PollingStationDashboard'},
  {from: /Booth Overview/g, to: 'Polling Station Overview'},
  {from: /booth\./g, to: 'station.'},
  {from: /booth,/g, to: 'station,'},
  {from: /\{ booth/g, to: '{ station'}
]);

updateFile('src/pages/dashboards/HierarchyManager.jsx', [
  {from: /BoothDashboard/g, to: 'PollingStationDashboard'},
  {from: /boothLocalities/g, to: 'stationLocalities'},
  {from: /setBoothLocalities/g, to: 'setStationLocalities'},
  {from: /generateBooths/g, to: 'generatePollingStations'},
  {from: /Booth/g, to: 'Polling Station'},
  {from: /booth/g, to: 'station'},
  {from: /bId/g, to: 'sId'}
]);

updateFile('src/components/ui/ExcelUploadModal.jsx', [
  {from: /'Booth'/g, to: "'Polling Station'"},
  {from: /Booth, /g, to: 'Polling Station, '}
]);

updateFile('src/components/layout/TopHeader.jsx', [
  {from: /Booth, /g, to: 'Polling Station, '}
]);

updateFile('src/utils/mockDataGenerators.js', [
  {from: /generateKenyaPollingStations as generateBooths/g, to: 'generatePollingStations'}
]);

updateFile('src/App.jsx', [
  {from: /BoothDashboard/g, to: 'PollingStationDashboard'}
]);

updateFile('src/components/ui/Breadcrumb.jsx', [
  {from: /case 'booth':/g, to: "case 'station':"}
]);
