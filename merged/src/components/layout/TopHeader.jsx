import React, { useState, useEffect, useRef } from 'react';
import { countiesData, subCountyWardsData } from '../../data/mockData.js';
import ExcelUploadModal from '../ui/ExcelUploadModal';

export default function TopHeader({ user, onLogout, activePage, onSearchSelect, onBack, onNext, canGoBack, canGoNext, onToggleMenu }) {
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState('2025-05-31');

  const isOverview = activePage === 'overview';

  let headerTitle = "Overview Dashboard";
  let headerSubtitle = "Grievance Management Summary";

  if (activePage === 'counties') {
    headerTitle = "All Counties";
    headerSubtitle = `Kenya — ${countiesData.length} Counties · Click a county to explore`;
  } else if (activePage === 'nairobi_districts' || activePage === 'districts') {
    headerTitle = "All Nairobi Districts";
    headerSubtitle = `Nairobi — Sub-Counties · Click a district to explore`;
  } else if (activePage === 'hierarchy') {
    headerTitle = "Sub-County Hierarchy";
    headerSubtitle = "Interactive Sub-County & Ward Map";
  } else if (activePage === 'settings') {
    headerTitle = "System Settings";
    headerSubtitle = "Manage your profile, credentials, and preferences";
  } else if (activePage === 'global') {
    headerTitle = "";
    headerSubtitle = "";
  }

  // --- Search Logic ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    
    // Find matching county
    const matchedCounties = countiesData.filter(d => d.name.toLowerCase().includes(lowerQuery));
    
    let results = matchedCounties.map(d => ({
      id: d.id,
      distObj: d,
      type: 'County',
      label: d.name
    }));

    if (results.length === 0) {
      Object.entries(subCountyWardsData).forEach(([distId, subCounties]) => {
         const matchingConst = subCounties.find(c => c.name.toLowerCase().includes(lowerQuery));
         if (matchingConst && results.length < 5) {
            const d = countiesData.find(x => x.id === distId);
            results.push({
               id: distId + matchingConst.name,
               distObj: d,
               type: 'Sub-County',
               label: `${matchingConst.name} (in ${d.name})`
            });
         }
      });
    }

    setSearchResults(results);
    setIsSearchOpen(true);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="top-header">
      <div className="header-titles" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
        {/* Hamburger Menu Toggle */}
        <button className="mobile-menu-btn" onClick={onToggleMenu} aria-label="Toggle Menu" style={{ marginTop: '4px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* Back and Next Arrows */}
        {activePage !== 'global' && (
          <div className="nav-arrows" style={{ display: 'flex', gap: '8px', marginRight: '8px', marginTop: '2px' }}>
            <button 
              onClick={onBack} 
              disabled={!canGoBack}
              title="Go Back"
              style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', background: canGoBack ? '#fff' : '#f8fafc', color: canGoBack ? '#1e293b' : '#cbd5e1', cursor: canGoBack ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: canGoBack ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={onNext} 
              disabled={!canGoNext}
              title="Go Forward"
              style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', background: canGoNext ? '#fff' : '#f8fafc', color: canGoNext ? '#1e293b' : '#cbd5e1', cursor: canGoNext ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: canGoNext ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        )}

        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          {headerTitle && (
            <>
              <h2 className="overview-title" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                {headerTitle}
                {activePage === 'counties' && (
                  <span className="counties-count-badge" style={{ fontSize: '11px', padding: '4px 10px', height: 'fit-content', whiteSpace: 'nowrap' }}>
                    {countiesData.length} Counties
                  </span>
                )}
              </h2>
              <p className="overview-subtitle">{headerSubtitle}</p>
            </>
          )}
        </div>
      </div>
      
      <div className="top-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Excel Upload Icon (ONLY on Sub-County Hierarchy page) */}
        {(activePage === 'hierarchy' || activePage === 'mombasa_hierarchy') && (
          <div className="excel-upload-container" style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsExcelModalOpen(true)}
              title="Bulk Upload Excel Template (Sub-County, Ward, Polling Station, Locality, Citizen, ID)"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0 16px', height: '38px', background: '#10b981', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)', fontWeight: '600', fontSize: '13px' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#059669'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="13" x2="15" y2="19"></line>
                <line x1="15" y1="13" x2="9" y2="19"></line>
              </svg>
              Excel Upload
            </button>
          </div>
        )}

        {/* Global Search Bar (Right Side) */}
        {activePage !== 'global' && activePage !== 'overview' && (
          <div className="global-search-container" ref={searchRef} style={{ position: 'relative', width: '300px', minWidth: '250px' }}>
            <div className="global-search-input-wrapper" style={{ display: 'flex', alignItems: 'center', background: '#ffffff', borderRadius: '12px', padding: '10px 14px', border: '1px solid #cbd5e1', width: '100%', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <svg viewBox="0 0 24 24" className="search-icon" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', marginRight: '10px' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search counties or districts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) setIsSearchOpen(true); }}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '100%', color: '#0f172a', fontWeight: '500' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
              )}
            </div>

            {isSearchOpen && searchResults.length > 0 && (
              <div className="search-results-dropdown" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '300px', background: '#fff', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 1000, overflow: 'hidden' }}>
                {searchResults.map((result) => (
                  <div 
                    key={result.id} 
                    className="search-result-item" 
                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      if (onSearchSelect) onSearchSelect(result.distObj);
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{result.label}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{result.type} Match &middot; Click to view</span>
                  </div>
                ))}
              </div>
            )}
            {isSearchOpen && searchResults.length === 0 && searchQuery.length >= 2 && (
              <div className="search-results-dropdown" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '300px', background: '#fff', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 1000, padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                No counties or subCounties found.
              </div>
            )}
          </div>
        )}

        {isOverview && (
          <div className="date-selector" style={{ display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" className="calendar-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="date-input-field" 
            />
            <span className="date-separator">—</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="date-input-field" 
            />
          </div>
        )}
      </div>

      {/* Excel Upload Modal */}
      <ExcelUploadModal 
        isOpen={isExcelModalOpen} 
        onClose={() => setIsExcelModalOpen(false)} 
        onUploadSuccess={(distId) => {
          const dist = countiesData.find(d => d.id === distId);
          if (dist && onSearchSelect) {
             onSearchSelect(dist);
          }
        }}
      />
    </header>
  );
}
