import React from 'react';

export default function Sidebar({ activePage, isGlobalContext, selectedCounty, onNavClick, user, onLogout, isOpen, onClose }) {
  const isMombasa = selectedCounty === 'mombasa';
  const isNairobi = selectedCounty === 'nairobi';

  // Determine the correct nav items based on context
  let subRegionLabel = 'Counties';
  let subRegionId = 'counties';
  if (isNairobi) { subRegionLabel = 'Sub-Counties'; subRegionId = 'nairobi_districts'; }
  if (isMombasa) { subRegionLabel = 'Sub-Counties'; subRegionId = 'mombasa_districts'; }

  const navItems = [
    { id: isGlobalContext ? 'global' : 'overview', label: 'Overview', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></> },
    { id: subRegionId, label: subRegionLabel, icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
    { id: 'settings', label: 'Settings', icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></> },
  ];

  const renderLogo = () => {
    if (isGlobalContext) {
      return (
        <>
          <div className="app-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', flexShrink: 0, color: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div><h1 className="logo-text">GLOBAL</h1><p className="logo-subtitle">OVERVIEW</p></div>
        </>
      );
    }
    if (isMombasa) {
      return (
        <>
          <div className="app-logo" style={{ border: 'none', background: 'transparent', width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://placehold.co/100x100/10b981/ffffff?text=LOGO" alt="Sample Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div><h1 className="logo-text">MOMBASA</h1><p className="logo-subtitle">GRIEVANCE SYSTEM</p></div>
        </>
      );
    }
    if (isNairobi) {
      return (
        <>
          <div className="app-logo" style={{ border: 'none', background: 'transparent', width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://placehold.co/100x100/10b981/ffffff?text=LOGO" alt="Sample Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
          </div>
          <div><h1 className="logo-text">NAIROBI</h1><p className="logo-subtitle">GRIEVANCE SYSTEM</p></div>
        </>
      );
    }
    return (
      <>
        <div className="app-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#fff', flexShrink: 0 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="100" height="30" fill="#000000"/><rect x="0" y="30" width="100" height="6" fill="#ffffff"/>
            <rect x="0" y="36" width="100" height="28" fill="#bb0000"/><rect x="0" y="64" width="100" height="6" fill="#ffffff"/>
            <rect x="0" y="70" width="100" height="30" fill="#006600"/>
            <path d="M40,20 C40,20 25,50 50,80 C75,50 60,20 60,20 Z" fill="#bb0000" stroke="#ffffff" strokeWidth="3"/>
            <ellipse cx="50" cy="50" rx="4" ry="14" fill="#ffffff"/>
            <ellipse cx="43" cy="50" rx="1.5" ry="5" fill="#ffffff"/>
            <ellipse cx="57" cy="50" rx="1.5" ry="5" fill="#ffffff"/>
          </svg>
        </div>
        <div><h1 className="logo-text">KENYA</h1><p className="logo-subtitle">GRIEVANCE SYSTEM</p></div>
      </>
    );
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="sidebar-header">{renderLogo()}</div>

        <nav className="sidebar-nav">
          {navItems
            .filter(item => !(isGlobalContext && (item.id === 'counties' || item.id === 'nairobi_districts' || item.id === 'mombasa_districts')))
            .map(item => (
              <a key={item.id} href="#"
                className={`nav-item${activePage === item.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); onNavClick(item.id); if (onClose) onClose(); }}
              >
                <svg viewBox="0 0 24 24">{item.icon}</svg>
                {item.label}
              </a>
            ))}
        </nav>

        <div className="sidebar-admin-card">
          <div className="sidebar-admin-top">
            <img className="sidebar-admin-avatar"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
              alt="Admin"/>
            <div className="sidebar-admin-meta">
              <span className="sidebar-admin-name">{user ? user.name : 'Admin'}</span>
              <span className="sidebar-admin-role">{user ? user.role : 'Super Admin'}</span>
            </div>
          </div>
          {user?.email && <div className="sidebar-admin-email">{user.email}</div>}
          <button className="sidebar-signout-btn" onClick={onLogout}>
            <svg viewBox="0 0 24 24" className="sidebar-signout-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
