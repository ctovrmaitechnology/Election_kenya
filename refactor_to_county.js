const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function updateFile(file, replacements) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}

const renames = [
  { old: 'src/pages/DistrictsPage.jsx', new: 'src/pages/CountiesPage.jsx' },
  { old: 'src/components/ui/DistrictGrid.jsx', new: 'src/components/ui/CountyGrid.jsx' },
  { old: 'src/components/ui/DistrictCard.jsx', new: 'src/components/ui/CountyCard.jsx' },
  { old: 'src/components/map/DistrictSelector.jsx', new: 'src/components/map/CountySelector.jsx' },
  { old: 'src/components/map/DistrictInfoPanel.jsx', new: 'src/components/map/CountyInfoPanel.jsx' },
  { old: 'src/pages/dashboards/ConstituencyDashboard.jsx', new: 'src/pages/dashboards/SubCountyDashboard.jsx' }
];

renames.forEach(r => {
  if (fs.existsSync(r.old)) {
    fs.renameSync(r.old, r.new);
    console.log(`Renamed ${r.old} to ${r.new}`);
  }
});

const replacements = [
  { from: /ConstituencyDashboard/g, to: 'SubCountyDashboard' },
  { from: /Constituency/g, to: 'Sub-County' },
  { from: /Constituencies/g, to: 'Sub-Counties' },
  { from: /constituency/g, to: 'subCounty' },
  { from: /constituencies/g, to: 'subCounties' },
  { from: /DistrictInfoPanel/g, to: 'CountyInfoPanel' },
  { from: /DistrictSelector/g, to: 'CountySelector' },
  { from: /DistrictGrid/g, to: 'CountyGrid' },
  { from: /DistrictCard/g, to: 'CountyCard' },
  { from: /DistrictsPage/g, to: 'CountiesPage' },
  { from: /Districts/g, to: 'Counties' },
  { from: /District/g, to: 'County' },
  { from: /districtsData/g, to: 'countiesData' },
  { from: /districts/g, to: 'counties' },
  { from: /district/g, to: 'county' },
  { from: /subCountyWardsData/g, to: 'subCountyWardsData' } // keeping camelcase correct
];

walkDir('src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
    updateFile(filePath, replacements);
  }
});
