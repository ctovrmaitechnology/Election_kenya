import React, { useState, useEffect, useRef } from 'react';

export default function WorldMap({ onCountryClick, highlightedCountry = '' }) {
  const containerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/world_map.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!isMounted || !containerRef.current) return;
        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector('svg');
        if (!svg) return;

        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 1020 620'); // Zoom out horizontally to include New Zealand
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.background = 'transparent'; // No background, let container handle it

        // Add a premium ambient shadow to the whole map
        svg.style.filter = 'drop-shadow(0 15px 30px rgba(0,0,0,0.5)) drop-shadow(0 4px 6px rgba(0,0,0,0.3))';

        setSvgLoaded(Date.now());
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update colors based on search query or default states
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;
    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const mapColors = [
      '#E8E3D9', '#D4E0B6', '#C4D1A7', '#EADFD3', '#D0D9BD', '#E2DECF'
    ];

    const highlightColors = [
      '#f59e0b', // Amber
      '#10b981', // Emerald
      '#3b82f6', // Blue
      '#8b5cf6', // Violet
      '#ec4899', // Pink
      '#14b8a6', // Teal
      '#f97316', // Orange
      '#06b6d4'  // Cyan
    ];

    const formatCountryName = (rawId) => {
      const idLower = rawId.toLowerCase();
      const overrides = {
        'drc': 'Democratic Republic of the Congo',
        'car': 'Central African Republic',
        'usa': 'United States',
        'uk': 'United Kingdom',
        'uae': 'United Arab Emirates'
      };
      if (overrides[idLower]) return overrides[idLower];

      return rawId
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };

    const paths = svg.querySelectorAll('path');
    paths.forEach((path) => {
      const id = path.getAttribute('id');
      if (!id) return;

      const isKenya = id.toLowerCase() === 'kenya';
      const searchStr = highlightedCountry ? highlightedCountry.toLowerCase() : '';
      const isHighlighted = searchStr && (
        id.toLowerCase().startsWith(searchStr) ||
        formatCountryName(id).toLowerCase().startsWith(searchStr)
      );

      if (isKenya) {
        path.style.fill = '#ef4444'; // Bright Red
        path.style.stroke = '#ffffff';
        path.style.strokeWidth = '0.5px';
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        path.style.filter = 'none';
        path.onmousedown = () => onCountryClick('kenya');
        path.onclick = () => onCountryClick('kenya'); // Fallback
      } else if (isHighlighted) {
        const hIndex = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0) % highlightColors.length;
        const dynamicHighlight = highlightColors[hIndex];

        path.style.fill = dynamicHighlight;
        path.style.stroke = '#ffffff';
        path.style.strokeWidth = '0.5px';
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s ease';
        path.style.filter = 'none';

        path.onmousedown = () => onCountryClick(id.toLowerCase());
        path.onclick = () => onCountryClick(id.toLowerCase()); // Fallback
      } else {
        path.style.fill = '#1e293b'; // Premium Dark Slate
        path.style.stroke = 'rgba(56, 189, 248, 0.15)'; // Subtle cyan borders
        path.style.strokeWidth = '0.5px';
        path.style.cursor = 'pointer'; // Allow hover everywhere for effect
        path.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        path.style.filter = 'none';
        path.onmousedown = null;
        path.onclick = null;
      }

      // Premium Hover Effect
      path.onmouseenter = (e) => {
        // Fast transition for hover-in
        path.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        if (!isKenya && !isHighlighted) {
          path.style.fill = '#334155'; // Lighter slate on hover
          path.style.stroke = 'rgba(56, 189, 248, 0.8)';
          path.style.filter = 'none';
        } else if (isKenya || isHighlighted) {
          path.style.filter = 'brightness(1.15)';
        }

        setHoverInfo({
          name: formatCountryName(id),
          active: isKenya || isHighlighted
        });

        if (tooltipRef.current) {
          let leftPos = e.clientX + 20;
          let topPos = e.clientY + 20;
          if (leftPos + 220 > window.innerWidth) leftPos = e.clientX - 240;
          if (topPos + 100 > window.innerHeight) topPos = e.clientY - 120;
          tooltipRef.current.style.left = `${leftPos}px`;
          tooltipRef.current.style.top = `${topPos}px`;
        }
      };

      path.onmouseleave = () => {
        // 2-second fade-out transition for mouse-leave
        path.style.transition = 'all 2s ease-out';

        if (!isKenya && !isHighlighted) {
          path.style.fill = '#1e293b';
          path.style.stroke = 'rgba(56, 189, 248, 0.15)';
          path.style.filter = 'none';
        } else if (isKenya || isHighlighted) {
          path.style.filter = 'none';
        }
        setHoverInfo(null);
      };

      path.onmousemove = (e) => {
        if (tooltipRef.current) {
          let leftPos = e.clientX + 20;
          let topPos = e.clientY + 20;
          if (leftPos + 220 > window.innerWidth) leftPos = e.clientX - 240;
          if (topPos + 100 > window.innerHeight) topPos = e.clientY - 120;
          tooltipRef.current.style.left = `${leftPos}px`;
          tooltipRef.current.style.top = `${topPos}px`;
        }
      };
    });
  }, [svgLoaded, highlightedCountry, onCountryClick]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', // Deep space background
      borderRadius: '24px',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 25px 50px -12px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}>
      {/* Ambient glowing orb in the background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {!svgLoaded && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#38bdf8', fontWeight: '600', letterSpacing: '1px' }}>
          Loading World Map...
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(1.35)' // Zoomed in to completely cover empty padding
        }}
      />

      {hoverInfo && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#fff',
            padding: '16px 20px',
            borderRadius: '16px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            minWidth: '180px',
            transform: 'translateZ(0)' // Hardware acceleration
          }}
        >
          <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '8px', color: '#f8fafc', letterSpacing: '-0.5px' }}>
            {hoverInfo.name}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: '500' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: hoverInfo.active ? '#10b981' : '#64748b', boxShadow: hoverInfo.active ? '0 0 8px #10b981' : 'none' }}></span>
              Status: <strong style={{ color: hoverInfo.active ? '#10b981' : '#94a3b8', letterSpacing: '0.5px' }}>{hoverInfo.active ? 'ACTIVE' : 'NO DATA'}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
