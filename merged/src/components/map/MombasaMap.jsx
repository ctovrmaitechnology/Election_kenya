import React, { useState } from 'react';
import { mombasaDistrictsData } from '../../data/mockData.js';

export default function MombasaMap({ selectedDistrict, onDistrictClick }) {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const dataMap = {};
  mombasaDistrictsData.forEach(d => { dataMap[d.id] = d; });

  const handleMouseEnter = (e, id, name) => {
    const district = dataMap[id];
    const total = district ? district.complaintsMajor + district.complaintsMinor : 0;
    const risk = total > 200 ? 'High' : total > 100 ? 'Medium' : 'Low';
    setHoverInfo({ id, name, major: district?.complaintsMajor || 0, minor: district?.complaintsMinor || 0, risk });
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => { if (hoverInfo) setMousePos({ x: e.clientX, y: e.clientY }); };
  const handleMouseLeave = () => setHoverInfo(null);
  const handleClick = (id) => onDistrictClick(id === selectedDistrict ? null : id);

  const getRegionStyle = (id) => {
    return {
      fill: 'transparent',
      fillOpacity: 0,
      stroke: 'transparent',
      strokeWidth: 0,
      cursor: 'pointer',
    };
  };

  return (
    <div className="card map-card-container" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="map-inner-wrapper" style={{ position: 'relative', width: '100%', flex: 1, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onMouseMove={handleMouseMove}>
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
          <h3 className="card-title" style={{ fontSize: '10px', marginBottom: '4px', color: '#1e293b', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>
            Mombasa County
          </h3>
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible' }}>
          <svg viewBox="0 0 1206 1305" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxHeight: '100%', overflow: 'visible' }}>
            <image href="/mombasa.png" x="0" y="0" width="1206" height="1305" preserveAspectRatio="xMidYMid meet" />
            {/* Jomvu */}
            <polygon points="138,552 174,348 330,204 450,246 456,252 582,438 642,606 642,612 234,654 162,612"
              style={getRegionStyle('jomvu')}
              onMouseEnter={(e) => handleMouseEnter(e, 'jomvu', 'Jomvu')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('jomvu')} />
            {/* Kisauni */}
            <polygon points="414,378 426,312 576,78 606,66 720,42 852,48 882,54 1200,276 768,678 492,744"
              style={getRegionStyle('kisauni')}
              onMouseEnter={(e) => handleMouseEnter(e, 'kisauni', 'Kisauni')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('kisauni')} />
            {/* Nyali */}
            <polygon points="738,708 858,504 870,486 918,486 960,492 1020,516 1044,570 1044,582 936,726 780,726"
              style={getRegionStyle('nyali')}
              onMouseEnter={(e) => handleMouseEnter(e, 'nyali', 'Nyali')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('nyali')} />
            {/* Changamwe */}
            <polygon points="228,702 234,666 354,540 372,522 456,522 474,528 474,744 468,750 444,756 234,774"
              style={getRegionStyle('changamwe')}
              onMouseEnter={(e) => handleMouseEnter(e, 'changamwe', 'Changamwe')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('changamwe')} />
            {/* Mvita */}
            <polygon points="558,672 648,618 684,612 744,654 768,726 798,840 732,912 720,918 660,888 588,810"
              style={getRegionStyle('mvita')}
              onMouseEnter={(e) => handleMouseEnter(e, 'mvita', 'Mvita')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('mvita')} />
            {/* Likoni */}
            <polygon points="204,1152 210,984 228,786 240,780 528,744 780,732 936,732 612,1260 582,1302 534,1302"
              style={getRegionStyle('likoni')}
              onMouseEnter={(e) => handleMouseEnter(e, 'likoni', 'Likoni')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('likoni')} />
          </svg>
        </div>
      </div>
      {hoverInfo && (
        <div className="map-tooltip premium-shadow"
          style={{ position: 'fixed', left: mousePos.x + 15, top: mousePos.y - 15, background: 'white', padding: '14px 18px', borderRadius: '10px', pointerEvents: 'none', zIndex: 1000, border: '1px solid #e2e8f0', minWidth: '180px', animation: 'fadeIn 0.15s ease' }}>
          <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px' }}>{hoverInfo.name}</div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
            <span>Major Issues:</span><strong style={{ color: '#dc2626' }}>{hoverInfo.major}</strong>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontWeight: 500 }}>
            <span>Minor Issues:</span><strong style={{ color: '#eab308' }}>{hoverInfo.minor}</strong>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '2px solid #f1f5f9', fontWeight: 600 }}>
            <span>Risk Level:</span>
            <strong style={{ color: hoverInfo.risk === 'High' ? '#dc2626' : hoverInfo.risk === 'Medium' ? '#eab308' : '#2563eb' }}>{hoverInfo.risk}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
