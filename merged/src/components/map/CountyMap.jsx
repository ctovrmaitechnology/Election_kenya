import React, { useState, useEffect, useRef } from 'react';
import { getSubCountiesForCounty, generateWards } from '../../services/nationalDataService';
import { getRiskColor } from '../../utils/helpers';

export default function CountyMap({ countyId, onSubCountyClick }) {
  const containerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [error, setError] = useState(false);

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

  useEffect(() => {
    setSvgLoaded(false);
    setError(false);
    
    fetch(`/${countyId}_map.svg`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(svgText => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector('svg');
        if (!svg) {
          setError(true);
          return;
        }

        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.background = 'transparent';

        const subCounties = getSubCountiesForCounty(countyId);

        svg.addEventListener('mousemove', (e) => setMousePos({ x: e.clientX, y: e.clientY }));

        const paths = svg.querySelectorAll('.subcounty, path');
        paths.forEach(path => {
          const pathId = path.getAttribute('id');
          if (!pathId) return;

          // Try to match path ID with a ward or subcounty
          const searchStr = pathId.replace(/-/g, ' ').toLowerCase();
          
          let allWards = [];
          subCounties.forEach(sc => {
            const scWards = generateWards(sc).map(w => ({ ...w, parentSubCounty: sc }));
            allWards = [...allWards, ...scWards];
          });

          // First try to match as a ward
          let matchedArea = allWards.find(w => w.name.toLowerCase().includes(searchStr));
          
          // Fallback to subcounty match
          if (!matchedArea) {
            matchedArea = subCounties.find(sc => sc.name.toLowerCase().includes(searchStr)) || subCounties[0];
          }

          if (matchedArea) {
            const totalComplaints = matchedArea.major + matchedArea.minor;
            path.style.fill = getRiskColor(totalComplaints);
            path.style.stroke = '#ffffff';
            path.style.strokeWidth = '3px';
            path.style.cursor = 'pointer';
            path.style.transition = 'fill 0.2s, filter 0.2s';

            path.addEventListener('mouseenter', (e) => {
              path.style.filter = 'brightness(1.2) drop-shadow(0 3px 8px rgba(0,0,0,0.25))';
              const risk = totalComplaints > 400 ? 'Major' : (totalComplaints > 200 ? 'Minor' : 'Low Risk');
              setHoverInfo({
                name: matchedArea.name,
                major: matchedArea.major,
                minor: matchedArea.minor,
                risk
              });
              setMousePos({ x: e.clientX, y: e.clientY });
            });
            path.addEventListener('mouseleave', () => {
              path.style.filter = 'none';
              setHoverInfo(null);
            });
            path.addEventListener('click', () => {
              if (onSubCountyClick) {
                // If it's a ward, pass its parent subcounty for navigation, or pass the ward directly if the UI supports it.
                // Currently App.jsx navigates to hierarchy based on subcounty. Let's pass parentSubCounty if it exists.
                onSubCountyClick(matchedArea.parentSubCounty || matchedArea);
              }
            });
          }
        });

        setSvgLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load county map:', err);
        setError(true);
      });
  }, [countyId, onSubCountyClick]);

  if (error) {
    return (
      <div className="card map-card-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', background: '#f8fafc', color: '#64748b', fontSize: '14px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', marginBottom: '16px', color: '#cbd5e1' }}>
             <circle cx="12" cy="12" r="10"></circle>
             <line x1="12" y1="8" x2="12" y2="12"></line>
             <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>Detailed SVG map not yet available for this county.</p>
          <p style={{ fontSize: '12px', marginTop: '8px' }}>Please add {countyId}_map.svg to the public folder.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card map-card-container" style={{ padding: 0, overflow: 'hidden', position: 'relative', minHeight: '400px' }}>
      <div className="map-inner-wrapper" style={{ width: '100%', height: '100%' }}>
        <div ref={containerRef} className="map-svg-viewport" style={{ width: '100%', height: '100%' }} />
      </div>
      
      {hoverInfo && (
        <div 
          className="map-tooltip premium-shadow"
          style={{
            position: 'fixed',
            left: typeof window !== 'undefined' ? Math.max(10, Math.min(mousePos.x + 15, window.innerWidth - 210)) : mousePos.x + 15,
            top: typeof window !== 'undefined' ? (mousePos.y < 160 ? mousePos.y + 20 : mousePos.y - 15) : mousePos.y - 15,
            transform: typeof window !== 'undefined' && mousePos.y < 160 ? 'none' : 'translateY(-100%)',
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
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}><span>Major Issues:</span> <strong style={{color:'#dc2626'}}>{hoverInfo.major}</strong></div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontWeight: 500 }}><span>Minor Issues:</span> <strong style={{color:'#eab308'}}>{hoverInfo.minor}</strong></div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '2px solid #f1f5f9', fontWeight: 600 }}><span>Risk Level:</span> <strong style={{color: hoverInfo.risk === 'Major' ? '#dc2626' : (hoverInfo.risk === 'Minor' ? '#eab308' : '#2563eb')}}>{hoverInfo.risk}</strong></div>
        </div>
      )}
    </div>
  );
}
