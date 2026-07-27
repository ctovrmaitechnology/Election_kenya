import React from 'react';

const themes = ['yellow', 'blue', 'purple'];

// Kenya county gradient backgrounds (reliable, no external dependency)
const countyGradients = {
  nairobi:          'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
  mombasa:          'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0284c7 100%)',
  kisumu:           'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
  nakuru:           'linear-gradient(135deg, #4c1d95 0%, #6d28d9 60%, #7c3aed 100%)',
  kakamega:         'linear-gradient(135deg, #14532d 0%, #166534 60%, #15803d 100%)',
  kilifi:           'linear-gradient(135deg, #164e63 0%, #0e7490 60%, #0891b2 100%)',
  kwale:            'linear-gradient(135deg, #134e4a 0%, #0f766e 60%, #14b8a6 100%)',
  lamu:             'linear-gradient(135deg, #78350f 0%, #92400e 60%, #b45309 100%)',
  turkana:          'linear-gradient(135deg, #7c2d12 0%, #9a3412 60%, #c2410c 100%)',
  marsabit:         'linear-gradient(135deg, #422006 0%, #713f12 60%, #92400e 100%)',
  mandera:          'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
  wajir:            'linear-gradient(135deg, #0c1a4a 0%, #1e3a5f 60%, #1d4ed8 100%)',
  garissa:          'linear-gradient(135deg, #450a0a 0%, #7f1d1d 60%, #b91c1c 100%)',
  samburu:          'linear-gradient(135deg, #1c1917 0%, #292524 60%, #44403c 100%)',
  isiolo:           'linear-gradient(135deg, #0a0a0a 0%, #1c1917 60%, #3d3d3d 100%)',
  meru:             'linear-gradient(135deg, #0d3320 0%, #14532d 60%, #166534 100%)',
  tharaka_nithi:    'linear-gradient(135deg, #1a3320 0%, #1f4d30 60%, #276742 100%)',
  embu:             'linear-gradient(135deg, #153020 0%, #1a4230 60%, #225540 100%)',
  kirinyaga:        'linear-gradient(135deg, #0d2b1f 0%, #134027 60%, #1a5530 100%)',
  murang_a:         'linear-gradient(135deg, #1a2e1a 0%, #1e401e 60%, #265526 100%)',
  nyeri:            'linear-gradient(135deg, #0d1f0d 0%, #15301a 60%, #1e4528 100%)',
  nyandarua:        'linear-gradient(135deg, #0d1a15 0%, #132a20 60%, #1c3f2f 100%)',
  laikipia:         'linear-gradient(135deg, #2d1515 0%, #4a1c1c 60%, #6b2424 100%)',
  baringo:          'linear-gradient(135deg, #1e1040 0%, #2d1b69 60%, #3d2589 100%)',
  elgeyo_marakwet:  'linear-gradient(135deg, #0a1520 0%, #0f2035 60%, #1a334d 100%)',
  west_pokot:       'linear-gradient(135deg, #1a1000 0%, #2d1f00 60%, #453000 100%)',
  trans_nzoia:      'linear-gradient(135deg, #001a0a 0%, #002d12 60%, #00401a 100%)',
  uasin_gishu:      'linear-gradient(135deg, #0a0020 0%, #120033 60%, #1e0052 100%)',
  nandi:            'linear-gradient(135deg, #1a0a30 0%, #2d1050 60%, #401570 100%)',
  nakuru_alt:       'linear-gradient(135deg, #200040 0%, #350060 60%, #4d0080 100%)',
  kericho:          'linear-gradient(135deg, #002000 0%, #003300 60%, #004d00 100%)',
  bungoma:          'linear-gradient(135deg, #001a2e 0%, #002d4a 60%, #004066 100%)',
  busia:            'linear-gradient(135deg, #1a1000 0%, #2d1f00 60%, #453000 100%)',
  vihiga:           'linear-gradient(135deg, #0d1f0d 0%, #152d15 60%, #1f3d1f 100%)',
  siaya:            'linear-gradient(135deg, #0d1520 0%, #142030 60%, #1c2d42 100%)',
  homa_bay:         'linear-gradient(135deg, #001520 0%, #002035 60%, #00304d 100%)',
  migori:           'linear-gradient(135deg, #1a0a0a 0%, #2d1010 60%, #401515 100%)',
  kisii:            'linear-gradient(135deg, #0a200d 0%, #103018 60%, #164024 100%)',
  nyamira:          'linear-gradient(135deg, #0a1a0a 0%, #102810 60%, #163a16 100%)',
  bomet:            'linear-gradient(135deg, #150a20 0%, #201030 60%, #2d1545 100%)',
  narok:            'linear-gradient(135deg, #0a1500 0%, #102200 60%, #163200 100%)',
  kiambu:           'linear-gradient(135deg, #0a0a20 0%, #101030 60%, #181840 100%)',
  kajiado:          'linear-gradient(135deg, #200a00 0%, #331000 60%, #4d1800 100%)',
  machakos:         'linear-gradient(135deg, #1a0a20 0%, #2a1030 60%, #3d1545 100%)',
  kitui:            'linear-gradient(135deg, #200a0a 0%, #331010 60%, #4d1818 100%)',
  makueni:          'linear-gradient(135deg, #0a200a 0%, #103010 60%, #184518 100%)',
  taita_taveta:     'linear-gradient(135deg, #1a1000 0%, #2d1f00 60%, #453000 100%)',
  tana_river:       'linear-gradient(135deg, #001a2e 0%, #002d4a 60%, #004066 100%)',
  lamu_alt:         'linear-gradient(135deg, #200a00 0%, #331000 60%, #4d1800 100%)',
};

const defaultGradient = 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)';

// Kenya landmark icons per county
const countyIcons = {
  nairobi: '🏙️', mombasa: '🌊', kisumu: '🐟', nakuru: '🦩', kakamega: '🌳',
  kilifi: '🏖️', kwale: '🌴', lamu: '⛵', turkana: '🦁', marsabit: '🦒',
  meru: '🏔️', narok: '🦓', kajiado: '🐘', garissa: '🌵', mandera: '🌄',
  wajir: '🌅', bungoma: '🌾', kakamega2: '🌿',
};
const defaultIcon = '🇰🇪';

export default function DistrictCard({ district, index, onClick }) {
  const theme = themes[index % themes.length];
  const gradient = countyGradients[district.id] || defaultGradient;
  const icon = countyIcons[district.id] || defaultIcon;

  return (
    <div className={`premium-card theme-${theme}`} onClick={onClick}>
      {/* Image area - uses gradient background like Karnataka uses photo */}
      <div
        className="premium-card-image"
        style={{ backgroundImage: gradient, position: 'relative' }}
      >
        {/* County icon overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          <span style={{ fontSize: '38px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>{icon}</span>
          <span style={{
            color: 'rgba(255,255,255,0.9)', fontSize: '11px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            {district.hq}
          </span>
        </div>

        {/* Same SVG ribbon wave as Karnataka */}
        <svg className="premium-ribbon" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="ribbon-color" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
          <path className="ribbon-white" fill="#ffffff" d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
        </svg>
      </div>

      <div className="premium-card-body">
        <h3 className="premium-title">{district.name}</h3>
        <div className="premium-subtitle">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg>
          {district.hq}
        </div>

        <div className="premium-stats">
          <div className="stat-box stat-major">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{district.complaintsMajor}</div>
            <div className="stat-label">MAJOR</div>
          </div>

          <div className="stat-box stat-minor">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{district.complaintsMinor}</div>
            <div className="stat-label">MINOR</div>
          </div>

          <div className="stat-box stat-visited">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{district.visitedCount}</div>
            <div className="stat-label">VISITED</div>
          </div>
        </div>
      </div>
    </div>
  );
}
