import React, { useState, useEffect, useRef } from 'react';
import { districtsData } from '../../data/nairobiMockData.js';
import { getRiskColor } from '../../utils/helpers';
import { SUBCOUNTY_PATHS } from '../../data/nairobiMapPaths.js';

export default function NairobiMap({ selectedDistrict, onDistrictClick }) {
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const tooltipRef = useRef(null);

  // Calculate counts
  const counts = { major: 0, minor: 0, low: 0 };
  districtsData.forEach(d => {
    const total = d.complaintsMajor + d.complaintsMinor;
    if (total > 400) counts.major++;
    else if (total > 150) counts.minor++;
    else counts.low++;
  });

  // Build per-district lookup
  const districtMap = {};
  districtsData.forEach(d => { districtMap[d.id] = d; });

  // Clear tooltip on scroll or tap outside
  useEffect(() => {
    const handleScrollOrTap = (e) => {
      if (e.type === 'scroll' || (containerRef.current && !containerRef.current.contains(e.target))) {
        setHoverInfo(null);
      }
    };
    window.addEventListener('scroll', handleScrollOrTap, { passive: true });
    document.addEventListener('touchstart', handleScrollOrTap, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrTap);
      document.removeEventListener('touchstart', handleScrollOrTap);
    };
  }, []);

  // Helper to get district style based on hover/selection state
  const getPathStyle = (distId, isHovered) => {
    const isSelected = selectedDistrict === distId;
    return {
      fill: isHovered || isSelected ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
      fillOpacity: isHovered || isSelected ? 1 : 0,
      stroke: isHovered || isSelected ? '#ffffff' : 'transparent',
      strokeWidth: isHovered || isSelected ? 3 : 0,
      strokeLinejoin: 'round',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    };
  };

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="card map-card-container" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="map-inner-wrapper">

        {/* Absolute positioned header overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
          <h3 className="card-title" style={{ fontSize: '10px', marginBottom: '4px', color: '#1e293b', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>Nairobi Map</h3>
          <div className="map-legend" style={{
            fontSize: '5px',
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '3px 6px',
            borderRadius: '5px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            <span className="legend-dot" style={{ background: '#dc2626', width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.major}</span> <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px' }}>Major</span>
            <span className="legend-dot" style={{ background: '#eab308', marginLeft: 4, width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.minor}</span> <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px' }}>Minor</span>
            <span className="legend-dot" style={{ background: '#2563eb', marginLeft: 4, width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.low}</span> <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px', whiteSpace: 'nowrap' }}>Low Risk</span>
          </div>
        </div>

        {/* SVG with embedded PNG — guarantees pixel-perfect alignment */}
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg
            viewBox="0 0 1622 970"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: '100%', display: 'block' }}
            onMouseMove={e => {
              if (tooltipRef.current) {
                tooltipRef.current.style.left = `${Math.max(10, Math.min(e.clientX + 15, window.innerWidth - 210))}px`;
                tooltipRef.current.style.top = `${e.clientY < 160 ? e.clientY + 20 : e.clientY - 15}px`;
                tooltipRef.current.style.transform = e.clientY < 160 ? 'none' : 'translateY(-100%)';
              }
            }}
          >
            {/* Base map image */}
            <image href="/nairobi_image.png" x="0" y="0" width="1622" height="970" preserveAspectRatio="xMidYMid meet" />

            {/* Interactive sub-county overlays */}
            {SUBCOUNTY_PATHS.map(({ id, d }) => {
              const dist = districtMap[id];
              const total = dist ? dist.complaintsMajor + dist.complaintsMinor : 0;
              const risk = total > 400 ? 'High' : (total > 150 ? 'Medium' : 'Low');
              return (
                <path
                  key={id}
                  id={id}
                  d={d}
                  style={getPathStyle(id, hoveredId === id)}
                  onMouseEnter={e => {
                    setHoveredId(id);
                    setHoverInfo({
                      name: dist ? dist.name : id,
                      major: dist ? dist.complaintsMajor : 0,
                      minor: dist ? dist.complaintsMinor : 0,
                      risk,
                    });
                  }}
                  onMouseMove={e => {
                    if (tooltipRef.current) {
                      tooltipRef.current.style.left = `${Math.max(10, Math.min(e.clientX + 15, window.innerWidth - 210))}px`;
                      tooltipRef.current.style.top = `${e.clientY < 160 ? e.clientY + 20 : e.clientY - 15}px`;
                      tooltipRef.current.style.transform = e.clientY < 160 ? 'none' : 'translateY(-100%)';
                    }
                  }}
                  onMouseLeave={() => { setHoveredId(null); setHoverInfo(null); }}
                  onClick={() => onDistrictClick && onDistrictClick(id)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {hoverInfo && (
        <div
          ref={tooltipRef}
          className="map-tooltip premium-shadow"
          style={{
            position: 'fixed',
            background: 'white',
            padding: '14px 18px',
            borderRadius: '10px',
            pointerEvents: 'none',
            zIndex: 1000,
            border: '1px solid #e2e8f0',
            minWidth: '180px',
            animation: 'fadeIn 0.15s ease'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px' }}>{hoverInfo.name}</div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}><span>Major Issues:</span> <strong style={{ color: '#dc2626' }}>{hoverInfo.major}</strong></div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontWeight: 500 }}><span>Minor Issues:</span> <strong style={{ color: '#eab308' }}>{hoverInfo.minor}</strong></div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '2px solid #f1f5f9', fontWeight: 600 }}><span>Risk Level:</span> <strong style={{ color: hoverInfo.risk === 'High' ? '#dc2626' : (hoverInfo.risk === 'Medium' ? '#eab308' : '#2563eb') }}>{hoverInfo.risk}</strong></div>
        </div>
      )}
    </div>
  );
}
