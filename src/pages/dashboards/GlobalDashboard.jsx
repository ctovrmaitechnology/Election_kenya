import React, { useState } from 'react';
import WorldMap from '../../components/map/WorldMap';

export default function GlobalDashboard({ onCountrySelect }) {
  const [searchQuery, setSearchQuery] = useState('');

  const activeCountries = [
    { id: 'kenya', name: 'Kenya', complaints: '23,499', status: 'Active', flag: '🇰🇪', color: '#dc2626' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.toLowerCase().includes('kenya')) {
      onCountrySelect('kenya');
    } else {
      alert('Currently, only Kenya is available in the system.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minHeight: 'calc(100vh - 100px)' }}>
      
      {/* Top Section: Heading and Flow Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Global Overview</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px', fontWeight: '500' }}>Select a country on the map or use the quick access buttons below to monitor regional deployments.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <form onSubmit={(e) => { e.preventDefault(); if(searchQuery) onCountrySelect(searchQuery.toLowerCase()); }} style={{ display: 'flex', gap: '8px', background: '#ffffff', padding: '6px', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search country..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '220px', padding: '10px 10px 10px 38px', border: 'none', outline: 'none', fontSize: '14px', color: '#0f172a', background: 'transparent' }}
              />
            </div>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(37,99,235,0.39)' }} onMouseOver={(e) => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)'; }} onMouseOut={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 14px 0 rgba(37,99,235,0.39)'; }}>
              Go
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
        
        {/* Map Section */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1 }}>
          <WorldMap onCountryClick={onCountrySelect} highlightedCountry={searchQuery} />
        </div>
      </div>
    </div>
  );
}
