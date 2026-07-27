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
    console.log('Fixed ' + file);
  }
}

const replacements = [
  { from: /getSub-Counties/g, to: 'getSubCounties' },
  { from: /sub-CountiesCount/g, to: 'subCountiesCount' },
  { from: /kenyaSub-Counties/g, to: 'kenyaSubCounties' },
  { from: /sub-CountyWards/g, to: 'subCountyWards' },
  { from: /kenyaSub-County/g, to: 'kenyaSubCounty' },
  { from: /selectedSub-County/g, to: 'selectedSubCounty' },
  { from: /setSub-County/g, to: 'setSubCounty' },
  { from: /Sub-CountyDashboard/g, to: 'SubCountyDashboard' },
  { from: /Sub-CountyInfo/g, to: 'SubCountyInfo' },
  { from: /sub-CountiesFor/g, to: 'subCountiesFor' }
];

walkDir('src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    updateFile(filePath, replacements);
  }
});
