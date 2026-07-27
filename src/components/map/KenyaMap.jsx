import React, { useState, useEffect, useRef } from 'react';
import { countiesData } from '../../data/mockData.js';
import { getRiskColor } from '../../utils/helpers';

// SVG path IDs → county data IDs
// Your kenya_map.svg uses plain county names as IDs
const PATH_TO_DISTRICT = {
  "mombasa":        "mombasa",
  "kwale":          "kwale",
  "taita_taveta":   "taita_taveta",
  "kilifi":         "kilifi",
  "lamu":           "lamu",
  "makueni":        "makueni",
  "nairobi":        "nairobi",
  "kajiado":        "kajiado",
  "machakos":       "machakos",
  "kiambu":         "kiambu",
  "migori":         "migori",
  "murang_a":       "muranga",
  "kisii":          "kisii",
  "narok":          "narok",
  "nyamira":        "nyamira",
  "bomet":          "bomet",
  "homa_bay":       "homa_bay",
  "embu":           "embu",
  "kirinyaga":      "kirinyaga",
  "kitui":          "kitui",
  "tana_river":     "tana_river",
  "nyeri":          "nyeri",
  "kisumu":         "kisumu",
  "kericho":        "kericho",
  "tharaka_nithi":  "tharaka_nithi",
  "tharaka":        "tharaka_nithi",
  "nyandarua":      "nyandarua",
  "vihiga":         "vihiga",
  "nakuru":         "nakuru",
  "siaya":          "siaya",
  "nandi":          "nandi",
  "meru":           "meru",
  "busia":          "busia",
  "laikipia":       "laikipia",
  "kakamega":       "kakamega",
  "uasin_gishu":    "uasin_gishu",
  "garissa":        "garissa",
  "bungoma":        "bungoma",
  "trans_nzoia":    "trans_nzoia",
  "elgeyo_marakwet":"elgeyo_marakwet",
  "keiyo_marakwet": "elgeyo_marakwet",
  "baringo":        "baringo",
  "isiolo":         "isiolo",
  "samburu":        "samburu",
  "west_pokot":     "west_pokot",
  "wajir":          "wajir",
  "mandera":        "mandera",
  "marsabit":       "marsabit",
  "turkana":        "turkana"
};

export default function KenyaMap({ selectedCounty, onCountyClick }) {
  const containerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const tooltipRef = useRef(null);

  const counts = { major: 0, minor: 0, low: 0 };
  countiesData.forEach(d => {
    const total = d.complaintsMajor + d.complaintsMinor;
    if (total > 900) counts.major++;
    else if (total > 500) counts.minor++;
    else counts.low++;
  });

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
    fetch('/kenya_map.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector('svg');
        if (!svg) return;

        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        // SVG intrinsic size is ~458x581
        svg.setAttribute('viewBox', '0 0 458 581');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.background = 'transparent';
        svg.style.backgroundColor = 'transparent';
        svg.style.filter = 'drop-shadow(0 20px 30px rgba(0,0,0,0.15)) drop-shadow(0 4px 12px rgba(0,0,0,0.1))';
        svg.style.overflow = 'visible';

        // Hide pre-built label_ text elements — we add our own below
        svg.querySelectorAll('[id^="label_"]').forEach(el => {
          el.style.display = 'none';
        });

        // Clear background rects
        svg.querySelectorAll('rect').forEach(rect => {
          rect.style.fill = 'transparent';
          rect.style.stroke = 'none';
          rect.setAttribute('fill', 'transparent');
        });

        svg.addEventListener('mousemove', (e) => {
          if (tooltipRef.current) {
            tooltipRef.current.style.left = `${Math.max(10, Math.min(e.clientX + 15, window.innerWidth - 210))}px`;
            tooltipRef.current.style.top = `${e.clientY < 160 ? e.clientY + 20 : e.clientY - 15}px`;
            tooltipRef.current.style.transform = e.clientY < 160 ? 'none' : 'translateY(-100%)';
          }
        });

        let currentHoverPath = null;
        svg.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            if (tooltipRef.current) {
              tooltipRef.current.style.left = `${Math.max(10, Math.min(touch.clientX + 15, window.innerWidth - 210))}px`;
              tooltipRef.current.style.top = `${touch.clientY < 160 ? touch.clientY + 20 : touch.clientY - 15}px`;
              tooltipRef.current.style.transform = touch.clientY < 160 ? 'none' : 'translateY(-100%)';
            }
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            let pathKey = el ? el.getAttribute('title') : null;
            pathKey = pathKey ? pathKey.toLowerCase().replace(/[- ]/g, '_').replace(/'/g, '_') : (el ? el.getAttribute('id') : null);
            if (el && el.tagName === 'path' && PATH_TO_DISTRICT[pathKey]) {
              if (currentHoverPath !== el) {
                if (currentHoverPath) currentHoverPath.dispatchEvent(new Event('mouseleave'));
                currentHoverPath = el;
                currentHoverPath.dispatchEvent(new MouseEvent('mouseenter', { clientX: touch.clientX, clientY: touch.clientY, bubbles: true }));
              }
            } else if (currentHoverPath) {
              currentHoverPath.dispatchEvent(new Event('mouseleave'));
              currentHoverPath = null;
            }
          }
        }, { passive: true });

        svg.addEventListener('touchend', () => {
          if (currentHoverPath) {
            currentHoverPath.dispatchEvent(new Event('mouseleave'));
            currentHoverPath = null;
          }
        });

        // Style all paths
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
          const pathTitle = path.getAttribute('title');
          const pathKey = pathTitle ? pathTitle.toLowerCase().replace(/[- ]/g, '_').replace(/'/g, '_') : path.getAttribute('id');
          const countyId = PATH_TO_DISTRICT[pathKey];

          if (countyId) {
            const county = countiesData.find(d => d.id === countyId);
            const totalComplaints = county ? county.complaintsMajor + county.complaintsMinor : 0;

            path.style.fill = getRiskColor(totalComplaints);
            path.style.stroke = '#ffffff';
            path.style.strokeWidth = '0.4px';
            path.style.cursor = 'pointer';
            path.style.transition = 'fill 0.2s, stroke-width 0.2s, filter 0.2s';

            path.addEventListener('mouseenter', (e) => {
              path.style.filter = 'brightness(1.15) saturate(1.2) drop-shadow(0 6px 16px rgba(0,0,0,0.3))';
              path.style.transform = 'translateY(-2px)';
              path.style.transformOrigin = 'center center';
              const risk = totalComplaints > 900 ? 'High' : (totalComplaints > 500 ? 'Medium' : 'Low');
              setHoverInfo({
                name: county ? county.name : 'Unknown',
                major: county ? county.complaintsMajor : 0,
                minor: county ? county.complaintsMinor : 0,
                risk
              });
              if (tooltipRef.current) {
                tooltipRef.current.style.left = `${Math.max(10, Math.min(e.clientX + 15, window.innerWidth - 210))}px`;
                tooltipRef.current.style.top = `${e.clientY < 160 ? e.clientY + 20 : e.clientY - 15}px`;
                tooltipRef.current.style.transform = e.clientY < 160 ? 'none' : 'translateY(-100%)';
              }
            });

            path.addEventListener('mouseleave', () => {
              path.style.filter = 'none';
              path.style.transform = 'none';
              setHoverInfo(null);
            });

            path.addEventListener('click', () => {
              onCountyClick(countyId);
            });

            // Add text label directly on the SVG
            try {
              const bbox = path.getBBox();
              const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

              let x = bbox.x + bbox.width / 2;
              let y = bbox.y + bbox.height / 2;

              const countyName = county ? county.name : '';
              const nameParts = countyName.replace(/-/g, ' ').split(' ');
              const maxWordLen = Math.max(1, ...nameParts.map(p => p.length));

              const widthBasedSize = (bbox.width * 0.45) / (maxWordLen * 0.6);
              const heightBasedSize = (bbox.height * 0.45) / (nameParts.length * 1.1);
              let optimalFontSize = Math.min(11, widthBasedSize, heightBasedSize);

              // Cap Machakos size to avoid overlapping the tiny Nairobi enclave
              if (countyId === 'machakos') {
                optimalFontSize = Math.min(5, optimalFontSize);
                x += 2; // Shift slightly right away from Nairobi
              }
              
              // Force Mombasa to be somewhat readable despite being a tiny island
              if (countyId === 'mombasa') {
                optimalFontSize = Math.max(3.5, optimalFontSize);
                x += 4; // Shift slightly into the ocean for readability
                y += 2;
              }

              // Remove the artificial minimum so text scales down to fit within the border
              if (optimalFontSize < 1.2) {
                optimalFontSize = 1.2; // absolute minimum to still barely render
              }

              if (true) {
                text.setAttribute('x', x);
                text.setAttribute('y', y);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('alignment-baseline', 'middle');
                text.setAttribute('font-size', optimalFontSize + 'px');
                text.setAttribute('font-weight', '700');
                text.setAttribute('fill', '#0f172a');
                text.setAttribute('pointer-events', 'none');
                text.setAttribute('stroke', 'rgba(255,255,255,0.95)');
                text.setAttribute('stroke-width', Math.min(1, optimalFontSize * 0.15) + 'px');
                text.setAttribute('stroke-linejoin', 'round');
                text.setAttribute('paint-order', 'stroke fill');
                text.style.paintOrder = 'stroke fill';

                if (nameParts.length > 1) {
                  nameParts.forEach((part, index) => {
                    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    tspan.textContent = part;
                    tspan.setAttribute('x', x);
                    tspan.setAttribute('dy', index === 0 ? '-0.2em' : '1.1em');
                    text.appendChild(tspan);
                  });
                } else {
                  text.textContent = countyName;
                }

                svg.appendChild(text);
              }
            } catch (e) {
              console.warn('Could not calculate bounding box for text label', e);
            }
          } else {
            // Decorative / non-county paths
            path.style.pointerEvents = 'none';
            path.style.fill = 'transparent';
            path.style.stroke = '#e2e8f0';
            path.style.strokeWidth = '2px';
          }
        });

        setSvgLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load map:', err);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p style="text-align:center;padding:20px;color:#64748b;">Map failed to load.</p>';
        }
      });
  }, []);

  // Re-highlight selected county when it changes
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    svg.querySelectorAll('path').forEach(path => {
      const pathTitle = path.getAttribute('title');
      const pathKey = pathTitle ? pathTitle.toLowerCase().replace(/[- ]/g, '_').replace(/'/g, '_') : path.getAttribute('id');
      const countyId = PATH_TO_DISTRICT[pathKey];
      if (!countyId) return;

      const county = countiesData.find(d => d.id === countyId);
      const totalComplaints = county ? county.complaintsMajor + county.complaintsMinor : 0;

      if (selectedCounty === countyId) {
        path.style.strokeWidth = '2px';
        path.style.stroke = '#ffffff';
        path.style.filter = 'brightness(1.15) drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
      } else {
        path.style.fill = getRiskColor(totalComplaints);
        path.style.strokeWidth = '1px';
        path.style.stroke = '#ffffff';
        path.style.filter = 'none';
      }
    });
  }, [selectedCounty, svgLoaded]);

  return (
    <div className="card map-card-container" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="map-inner-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>

        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
          <h3 className="card-title" style={{ fontSize: '10px', marginBottom: '4px', color: '#1e293b', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>Kenya Map</h3>
          <div className="map-legend" style={{ fontSize: '5px', background: 'rgba(255,255,255,0.85)', padding: '3px 6px', borderRadius: '5px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <span className="legend-dot" style={{ background: '#dc2626', width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.major}</span>
            <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px' }}> Major</span>
            <span className="legend-dot" style={{ background: '#eab308', marginLeft: 4, width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.minor}</span>
            <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px' }}> Minor</span>
            <span className="legend-dot" style={{ background: '#2563eb', marginLeft: 4, width: '5px', height: '5px' }}></span>
            <span className="legend-label" style={{ fontWeight: 800, fontSize: '8px' }}>{counts.low}</span>
            <span className="legend-label" style={{ fontWeight: 500, fontSize: '8px', whiteSpace: 'nowrap' }}> Low Risk</span>
          </div>
        </div>

        <div ref={containerRef} className="map-svg-viewport" style={{ width: '100%', height: '100%' }} />
      </div>

      {hoverInfo && (
        <div
          ref={tooltipRef}
          className="map-tooltip premium-shadow"
          style={{ position: 'fixed', background: 'white', padding: '14px 18px', borderRadius: '10px', pointerEvents: 'none', zIndex: 1000, border: '1px solid #e2e8f0', minWidth: '180px', animation: 'fadeIn 0.15s ease' }}
        >
          <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px' }}>{hoverInfo.name}</div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
            <span>Major Issues:</span><strong style={{ color: '#dc2626' }}>{hoverInfo.major}</strong>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontWeight: 500 }}>
            <span>Minor Issues:</span><strong style={{ color: '#eab308' }}>{hoverInfo.minor}</strong>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '6px', borderTop: '2px solid #f1f5f9', fontWeight: 600 }}>
            <span>Risk Level:</span>
            <strong style={{ color: hoverInfo.risk === 'High' ? '#dc2626' : (hoverInfo.risk === 'Medium' ? '#eab308' : '#2563eb') }}>{hoverInfo.risk}</strong>
          </div>
        </div>
      )}
    </div>
  );
}