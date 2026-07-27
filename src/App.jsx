import React, { useState, useEffect } from 'react';
import {
  countiesData,
  majorProblemsDefault,
  minorProblemsDefault,
  subCountyWardsData,
  mombasaDistrictsData,
} from './data/mockData.js';

import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import KPICards from './components/ui/KPICards';
import KenyaMap from './components/map/KenyaMap';
import CountyMap from './components/map/CountyMap';
import NairobiMap from './components/map/NairobiMap';
import MombasaMap from './components/map/MombasaMap';

import ProblemsTable from './components/ui/ProblemsTable';
import RegionGridPage from './components/dashboards/RegionGridPage';
import MombasaDistrictsPage from './pages/MombasaDistrictsPage';
import UnifiedHierarchyManager from './components/dashboards/HierarchyManager';
import MombasaHierarchyManager from './pages/dashboards/MombasaHierarchyManager';
import GlobalDashboard from './pages/dashboards/GlobalDashboard';
import { districtsData as nairobiDistrictsData } from './data/nairobiMockData.js';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('grievance_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('grievance_nav_history');
    return saved ? JSON.parse(saved) : [{ page: 'global', county: 'All', hier: null }];
  });
  const [historyIndex, setHistoryIndex] = useState(() => {
    const saved = localStorage.getItem('grievance_nav_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [nairobiSelectedDistrict, setNairobiSelectedDistrict] = useState('All');
  const [mombasaSelectedSubCounty, setMombasaSelectedSubCounty] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('grievance_user', JSON.stringify(user));
    else localStorage.removeItem('grievance_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('grievance_nav_history', JSON.stringify(history));
    localStorage.setItem('grievance_nav_index', historyIndex.toString());
  }, [history, historyIndex]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const currentNav = history[historyIndex] || { page: 'global', county: 'All', hier: null };
  const activePage = currentNav.page;
  const selectedCounty = currentNav.county || currentNav.dist || 'All';
  const hierarchyCounty = currentNav.hier;

  useEffect(() => {
    if (selectedCounty !== 'nairobi') setNairobiSelectedDistrict('All');
    if (selectedCounty !== 'mombasa') setMombasaSelectedSubCounty('All');
  }, [selectedCounty]);

  const navigateTo = (page, dist = selectedCounty, hier = hierarchyCounty) => {
    if (page === activePage && dist === selectedCounty && hier === hierarchyCounty) return;
    const newState = { page, county: dist, hier };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleBack = () => {
    if (activePage === 'hierarchy' && window.__hierarchyBack && window.__hierarchyBack()) return;
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };
  const handleNext = () => { if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1); };

  const handleLogout = () => {
    localStorage.removeItem('grievance_user');
    localStorage.removeItem('grievance_nav_history');
    localStorage.removeItem('grievance_nav_index');
    setUser(null);
    setHistory([{ page: 'global', county: 'All', hier: null }]);
    setHistoryIndex(0);
  };

  function getStats() {
    // Mombasa sub-county stats
    if (selectedCounty === 'mombasa' && mombasaSelectedSubCounty !== 'All') {
      const d = mombasaDistrictsData.find(x => x.id === mombasaSelectedSubCounty);
      if (!d) return { major: 0, minor: 0, candidates: 0, visited: 0, notVisited: 0 };
      return { major: d.complaintsMajor, minor: d.complaintsMinor, candidates: d.candidates || 0, visited: d.visitedCount, notVisited: d.notVisitedCount };
    }
    // Nairobi district stats
    if (selectedCounty === 'nairobi' && nairobiSelectedDistrict !== 'All') {
      const d = nairobiDistrictsData.find(x => x.id === nairobiSelectedDistrict);
      if (!d) return { major: 0, minor: 0, candidates: 0, visited: 0, notVisited: 0 };
      return { major: d.complaintsMajor, minor: d.complaintsMinor, candidates: d.candidates || 0, visited: d.visitedCount, notVisited: d.notVisitedCount };
    }
    if (selectedCounty === 'All') {
      return countiesData.reduce(
        (acc, d) => ({ major: acc.major + d.complaintsMajor, minor: acc.minor + d.complaintsMinor, candidates: acc.candidates + d.candidates, visited: acc.visited + d.visitedCount, notVisited: acc.notVisited + d.notVisitedCount }),
        { major: 0, minor: 0, candidates: 0, visited: 0, notVisited: 0 }
      );
    }
    const d = countiesData.find(x => x.id === selectedCounty);
    if (!d) return { major: 0, minor: 0, candidates: 0, visited: 0, notVisited: 0 };
    return { major: d.complaintsMajor, minor: d.complaintsMinor, candidates: d.candidates, visited: d.visitedCount, notVisited: d.notVisitedCount };
  }

  const stats = getStats();
  const lastMainPage = history.slice(0, historyIndex + 1).reverse().find(h => h.page !== 'settings')?.page || 'global';
  const isGlobalContext = lastMainPage === 'global';

  if (!user) return <AuthPage onLoginSuccess={setUser} />;

  const isMombasa = selectedCounty === 'mombasa';
  const isNairobi = selectedCounty === 'nairobi';

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        isGlobalContext={isGlobalContext}
        selectedCounty={selectedCounty}
        onNavClick={page => navigateTo(page)}
        user={user}
        onLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="main-content">
        <TopHeader
          user={user}
          onLogout={handleLogout}
          activePage={activePage}
          onSearchSelect={(distObj) => navigateTo('hierarchy', selectedCounty, distObj)}
          onBack={handleBack}
          onNext={handleNext}
          canGoBack={historyIndex > 0}
          canGoNext={historyIndex < history.length - 1}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* ── Counties Page ── */}
        {activePage === 'counties' && (
          <RegionGridPage
            regions={countiesData}
            onRegionClick={distObj => navigateTo('hierarchy', selectedCounty, distObj)}
          />
        )}

        {/* ── Nairobi Districts Page ── */}
        {(activePage === 'nairobi_districts' || activePage === 'districts') && isNairobi && (
          <RegionGridPage
            regions={nairobiDistrictsData}
            isNairobi={true}
            onRegionClick={d => navigateTo('hierarchy', 'nairobi', d)}
          />
        )}

        {/* ── Mombasa Sub-Counties Page ── */}
        {activePage === 'mombasa_districts' && isMombasa && (
          <MombasaDistrictsPage
            onDistrictClick={d => navigateTo('mombasa_hierarchy', 'mombasa', d)}
          />
        )}

        {/* ── WW Hierarchy View (Nairobi & other counties) ── */}
        {activePage === 'hierarchy' && hierarchyCounty && !isMombasa && (
          <UnifiedHierarchyManager
            rootItem={hierarchyCounty}
            isNairobi={isNairobi}
          />
        )}

        {/* ── Mombasa Hierarchy View ── */}
        {activePage === 'mombasa_hierarchy' && hierarchyCounty && (
          <MombasaHierarchyManager selectedSubCountyObj={hierarchyCounty} />
        )}

        {/* ── Global Dashboard ── */}
        {activePage === 'global' && (
          <GlobalDashboard onCountrySelect={(country) => navigateTo('overview', 'All', null)} />
        )}

        {/* ── Overview Page ── */}
        {activePage === 'overview' && (
          <>
            <KPICards stats={stats} />

            {/* ── Mombasa Overview ── */}
            {isMombasa ? (
              <div className="overview-content-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>
                  <button
                    onClick={() => navigateTo(activePage, 'All', hierarchyCounty)}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: '44px' }}
                  >
                    ← Back to National Map
                  </button>
                  <div style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: '400px', maxHeight: '70vh' }}>
                    <MombasaMap
                      selectedDistrict={mombasaSelectedSubCounty}
                      onDistrictClick={(id) => {
                        setMombasaSelectedSubCounty(id === mombasaSelectedSubCounty ? 'All' : (id || 'All'));
                      }}
                    />
                  </div>
                </div>
                <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <ProblemsTable
                    title={`Major Problems — ${mombasaSelectedSubCounty === 'All' ? 'Mombasa County' : mombasaDistrictsData.find(d => d.id === mombasaSelectedSubCounty)?.name || 'Mombasa'}`}
                    color="#dc2626"
                    problems={majorProblemsDefault}
                    baseDenominator={3426}
                    totalCount={stats.major}
                  />
                  <ProblemsTable
                    title={`Minor Problems — ${mombasaSelectedSubCounty === 'All' ? 'Mombasa County' : mombasaDistrictsData.find(d => d.id === mombasaSelectedSubCounty)?.name || 'Mombasa'}`}
                    color="#eab308"
                    problems={minorProblemsDefault}
                    baseDenominator={1248}
                    totalCount={stats.minor}
                  />
                </section>
              </div>
            ) : isNairobi ? (
              <div className="overview-content-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>
                  <button
                    onClick={() => navigateTo(activePage, 'All', hierarchyCounty)}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: '44px' }}
                  >
                    ← Back to National Map
                  </button>
                  <div style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: '400px', maxHeight: '70vh' }}>
                    <NairobiMap
                      selectedDistrict={nairobiSelectedDistrict}
                      onDistrictClick={(id) => {
                        setNairobiSelectedDistrict(id === nairobiSelectedDistrict ? 'All' : id);
                      }}
                    />
                  </div>
                </div>
                <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <ProblemsTable
                    title={`Major Problems — ${nairobiSelectedDistrict === 'All' ? 'Nairobi' : nairobiDistrictsData.find(d => d.id === nairobiSelectedDistrict)?.name || 'Nairobi'}`}
                    color="#dc2626"
                    problems={majorProblemsDefault}
                    baseDenominator={3426}
                    totalCount={stats.major}
                  />
                  <ProblemsTable
                    title={`Minor Problems — ${nairobiSelectedDistrict === 'All' ? 'Nairobi' : nairobiDistrictsData.find(d => d.id === nairobiSelectedDistrict)?.name || 'Nairobi'}`}
                    color="#eab308"
                    problems={minorProblemsDefault}
                    baseDenominator={1248}
                    totalCount={stats.minor}
                  />
                </section>
              </div>
            ) : (
              <div className="overview-content-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>
                  {selectedCounty !== 'All' ? (
                    <button
                      onClick={() => navigateTo(activePage, 'All', hierarchyCounty)}
                      style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: '44px' }}
                    >
                      ← Back to National Map
                    </button>
                  ) : (
                    <button
                      onClick={() => navigateTo('global', 'All', null)}
                      style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: '44px' }}
                    >
                      ← Back to Global Map
                    </button>
                  )}
                  <div style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: '400px', maxHeight: '70vh' }}>
                    {selectedCounty === 'All' ? (
                      <KenyaMap
                        selectedCounty={selectedCounty}
                        onCountyClick={id => navigateTo(activePage, id, hierarchyCounty)}
                      />
                    ) : (
                      <CountyMap
                        countyId={selectedCounty}
                        onSubCountyClick={() => navigateTo('hierarchy', selectedCounty, countiesData.find(c => c.id === selectedCounty))}
                      />
                    )}
                  </div>
                </div>
                <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <ProblemsTable
                    title={`Major Problems — ${selectedCounty === 'All' ? 'Kenya' : countiesData.find(d => d.id === selectedCounty)?.name || 'Kenya'}`}
                    color="#dc2626"
                    problems={majorProblemsDefault}
                    baseDenominator={3426}
                    totalCount={stats.major}
                  />
                  <ProblemsTable
                    title={`Minor Problems — ${selectedCounty === 'All' ? 'Kenya' : countiesData.find(d => d.id === selectedCounty)?.name || 'Kenya'}`}
                    color="#eab308"
                    problems={minorProblemsDefault}
                    baseDenominator={1248}
                    totalCount={stats.minor}
                  />
                </section>
              </div>
            )}
          </>
        )}

        {/* ── Settings Page ── */}
        {activePage === 'settings' && <SettingsPage user={user} onUpdateUser={setUser} />}
      </main>
    </div>
  );
}
