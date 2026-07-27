const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'upload.wikimedia.org',
  path: '/wikipedia/commons/4/47/Kenya_Counties.svg',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('public/kenya_map.svg', data);
    console.log('Downloaded SVG');
  });
});
req.on('error', e => console.error(e));
req.end();
