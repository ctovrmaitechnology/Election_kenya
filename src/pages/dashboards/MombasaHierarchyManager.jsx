import React, { useState, useEffect } from 'react';
import { mombasaConstituencyWardsData } from '../../data/mockData.js';
import Breadcrumb from '../../components/ui/Breadcrumb.jsx';
import DrilldownList from '../../components/ui/DrilldownList.jsx';
import ConstituencyDashboard from './ConstituencyDashboard.jsx';
import WardDashboard from '../../components/dashboards/WardDashboard.jsx';
import AreaDashboard from './AreaDashboard.jsx';
import CitizenDashboard from '../../components/dashboards/CitizenDashboard.jsx';
import ProblemDetails from '../../components/dashboards/ProblemDetails.jsx';


// Simple PRNG for deterministic mock data
function getSeededRandom(seedStr) {
  let h = 0xdeadbeef;
  for(let i = 0; i < seedStr.length; i++) h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
  let seed = ((h ^ h >>> 16) >>> 0);
  return function() {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return ((seed < 0 ? ~seed + 1 : seed) % 100000) / 100000;
  };
}

const sample = (arr, randFn = Math.random) => arr[Math.floor(randFn() * arr.length)];

function getMombasaConstituenciesForSubCounty(subCountyId) {
  if (window.__UPLOADED_DATA__?.constituencies?.[subCountyId]) {
    return window.__UPLOADED_DATA__.constituencies[subCountyId];
  }
  const rand = getSeededRandom(subCountyId);
  let list = mombasaConstituencyWardsData[subCountyId];
  if (!list) return [];
  return list.map(c => {
    const pendingIssues = Math.floor((c.major || 0) * 0.7 + (c.minor || 0) * 0.4);
    const totalIssues = (c.major || 0) + (c.minor || 0);
    return {
      ...c,
      id: c.id || c.name.toLowerCase().replace(/\s+/g,'_'),
      totalIssues: totalIssues,
      corporator: c.mla || 'MCA Representative',
      booths: c.booths || Math.floor(rand() * 5) + 3,
      sentimentScore: Math.floor(rand() * 40) + 40,
      pendingIssues,
      resolvedIssues: totalIssues - pendingIssues,
      candidatePerformance: sample(["Excellent","Good","Average","Needs Improvement"], rand),
      aiInsights: {
        topIssues: [
          { name: "Water Supply", count: Math.floor((c.major || 0) * 0.4) },
          { name: "Road Conditions", count: Math.floor((c.major || 0) * 0.3) },
          { name: "Garbage Clearance", count: Math.floor((c.minor || 0) * 0.5) }
        ],
        criticalArea: `${c.name} Ward ${Math.floor(rand() * (c.wards||1)) + 1}`,
        reason: "Water complaints increased by 42% this month due to pipeline burst.",
        action: "Deploy field team within 48 hours to assess water pipeline damage."
      }
    };
  });
}

function generateWards(constituency) {
  if (window.__UPLOADED_DATA__?.wards?.[constituency.name]) return window.__UPLOADED_DATA__.wards[constituency.name];
  const rand = getSeededRandom(constituency.name);
  const count = constituency.wards || 5;
  let remMajor = constituency.major, remMinor = constituency.minor;
  return Array.from({ length: count }).map((_, i) => {
    const isLast = i === count - 1;
    const major = isLast ? remMajor : Math.floor(constituency.major / count + (rand() * 8 - 4));
    const minor = isLast ? remMinor : Math.floor(constituency.minor / count + (rand() * 4 - 2));
    remMajor -= major; remMinor -= minor;
    const visited = rand() > 0.4;
    const id = `${constituency.name}_ward_${i+1}`.toLowerCase().replace(/\s+/g,'_');
    return {
      id, name: `${constituency.name} Ward ${i+1}`, major: Math.max(0,major), minor: Math.max(0,minor), visited,
      booths: Math.floor(rand() * 5) + 3,
      totalVoters: Math.floor(rand() * 3000) + 1000,
      engagementRate: Math.floor(rand() * 40) + 50,
      topIssue: sample(["Water Supply","Road Damage","Drainage","Street Lights","Garbage"], rand),
    };
  });
}

function generatePollingStations(ward) {
  const rand = getSeededRandom(ward.id || ward.name);
  const count = 2; // e.g. Port Reitz Primary and Port Reitz Secondary
  const firstNames = ["Ali","Fatuma","Hassan","Amina","Mohammed","Zainab","Omar","Halima","Ibrahim","Maryam"];
  const lastNames = ["Mwenda","Hassan","Ali","Omar","Mwangi","Kamau","Odhiambo","Waweru"];
  const suffixes = ["Primary School", "Secondary School", "Social Hall", "Centre", "Market"];
  const startIdx = Math.floor(rand() * 5);
  
  return Array.from({ length: count }).map((_, i) => {
    const id = `${ward.name}_polling_station_${i+1}`.toLowerCase().replace(/\s+/g,'_');
    const suffix = suffixes[(startIdx + i) % 5];
    const booths = Math.floor(rand() * 3) + 2;
    const major = Math.floor((ward.major || 30) / count);
    const minor = Math.floor((ward.minor || 10) / count);
    
    return {
      id, 
      name: `${ward.name.replace(' Ward', '')} ${suffix}`,
      booths,
      major,
      minor,
      incharge: `${sample(firstNames, rand)} ${sample(lastNames, rand)}`,
      voters: booths * (Math.floor(rand() * 300) + 300),
      issues: major + minor,
    };
  });
}

function generateBooths(station) {
  const rand = getSeededRandom(station.id || station.name);
  const count = station.booths || 4;
  return Array.from({ length: count }).map((_, i) => {
    const id = `${station.name}_booth_${i+1}`.toLowerCase().replace(/\s+/g,'_');
    return {
      id, name: `Booth ${String(i+1).padStart(3, '0')}`,
      voters: Math.floor(rand() * 500) + 200,
      areas: Math.floor(rand() * 4) + 2,
      major: Math.max(0, Math.floor(station.major / count + rand() * 5 - 2)),
      minor: Math.max(0, Math.floor(station.minor / count + rand() * 3 - 1)),
    };
  });
}

function generateAreas(booth) {
  const rand = getSeededRandom(booth.id || booth.name);
  const count = booth.areas || 3;
  const firstNames = ["Ali","Fatuma","Hassan","Amina","Mohammed","Zainab","Omar","Halima","Ibrahim","Maryam"];
  const lastNames = ["Mwenda","Hassan","Ali","Omar","Mwangi","Kamau","Odhiambo","Waweru"];
  
  return Array.from({ length: count }).map((_, i) => {
    const id = `${booth.name}_area_${i+1}`.toLowerCase().replace(/\s+/g,'_');
    return {
      id, name: `Area ${i+1} (${sample(["North","South","East","West","Central"], rand)})`,
      population: Math.floor(rand() * 200) + 100,
      activeVolunteers: Math.floor(rand() * 10) + 2,
      topDiscussed: sample(["Water","Roads","Health","Education","Jobs"], rand),
      issues: Math.floor(rand() * 20) + 5,
      influencers: [
        {
          name: `${sample(firstNames, rand)} ${sample(lastNames, rand)}`,
          role: sample(["Community Elder", "Youth Leader", "Women Group Head", "Imam", "Pastor"], rand),
          type: sample(["positive", "neutral", "critical"], rand),
          influence: sample(["High", "Medium"], rand),
          phone: `+254 7${Math.floor(rand()*90+10)} ${Math.floor(rand()*900000+100000)}`
        },
        {
          name: `${sample(firstNames, rand)} ${sample(lastNames, rand)}`,
          role: sample(["Market Chairman", "Youth Leader", "Teacher"], rand),
          type: sample(["positive", "neutral", "critical"], rand),
          influence: sample(["Medium", "Low"], rand),
          phone: `+254 7${Math.floor(rand()*90+10)} ${Math.floor(rand()*900000+100000)}`
        }
      ]
    };
  });
}

function generateCitizens(area) {
  const rand = getSeededRandom(area.id || area.name);
  const count = Math.floor(area.population / 20) || 5;
  const firstNames = ["Ali","Fatuma","Hassan","Amina","Mohammed","Zainab","Omar","Halima","Ibrahim","Maryam"];
  const lastNames = ["Mwenda","Hassan","Ali","Omar","Mwangi","Kamau","Odhiambo","Waweru"];
  return Array.from({ length: Math.min(count, 10) }).map((_, i) => {
    const id = `${area.name}_citizen_${i+1}`.toLowerCase().replace(/\s+/g,'_');
    return {
      id, name: `${sample(firstNames, rand)} ${sample(lastNames, rand)}`,
      phone: `+254 7${Math.floor(rand()*90+10)} ${Math.floor(rand()*900000+100000)}`,
      problemsCount: Math.floor(rand() * 4) + 1,
      status: sample(["Active","Visited","Pending"], rand),
    };
  });
}

function generateProblems(citizen) {
  const rand = getSeededRandom(citizen.id || citizen.name);
  const problemTypes = ["Water Supply","Road Damage","Street Light","Garbage Collection","Drainage","Healthcare","Public Toilet"];
  const numProblems = citizen.problemsCount || Math.floor(rand()*3)+1;
  return Array.from({ length: numProblems }).map((_, i) => {
    const ticketNum = Math.floor(rand() * 90000) + 10000;
    return {
      id: `TKT-${ticketNum}-${i+1}`,
      type: sample(problemTypes, rand),
      priority: sample(["Major","Minor", "Critical"], rand),
      status: sample(["Open","In Progress","Resolved"], rand),
      date: `2025-05-${String(Math.floor(rand()*28)+1).padStart(2,'0')}`,
      description: `Citizen reported repeated issues regarding ${sample(problemTypes, rand).toLowerCase()} in their locality. Affecting daily activities.`,
      raisedBy: citizen.name,
      assignedTo: sample(["Field Team A", "Water Board Representative", "Local MCA Office", "Unassigned"], rand)
    };
  });
}

export default function MombasaHierarchyManager({ selectedSubCountyObj }) {
  const [drillPath, setDrillPath] = useState([
    { level: 'constituency', label: selectedSubCountyObj.name, data: selectedSubCountyObj }
  ]);
  const [wardCache, setWardCache] = useState({});
  const [stationCache, setStationCache] = useState({});
  const [boothCache, setBoothCache] = useState({});
  const [areaCache, setAreaCache] = useState({});
  const [citizenCache, setCitizenCache] = useState({});
  const [problemCache, setProblemCache] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    window.__hierarchyBack = () => {
      if (drillPath.length > 1) { setDrillPath(prev => prev.slice(0,-1)); return true; }
      return false;
    };
    return () => { window.__hierarchyBack = null; };
  }, [drillPath]);

  const triggerNotification = (message) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), 4500);
  };

  const handleToggleVisited = (wardId) => {
    const constStep = drillPath.find(p => p.level === 'constituency');
    if (!constStep) return;
    const cName = constStep.data.id || constStep.data.name.toLowerCase();
    setWardCache(prev => {
      const list = prev[cName] || getMombasaConstituenciesForSubCounty(constStep.data.id);
      return { ...prev, [cName]: list.map(w => {
        if (w.id === wardId || w.name === wardId) {
          if (!w.visited) triggerNotification(`Initiating automated feedback calls to citizens in ${w.name}!`);
          return { ...w, visited: !w.visited };
        }
        return w;
      })};
    });
  };

  const currentStep = drillPath[drillPath.length - 1];

  const pushLevel = (level, label, data) => {
    if (level === 'constituency') {
      const cName = data.id || data.name.toLowerCase();
      if (!wardCache[cName]) {
        setWardCache(prev => ({ ...prev, [cName]: generateWards(data) }));
      }
    }
    if (level === 'ward' && !stationCache[data.id]) {
      setStationCache(prev => ({ ...prev, [data.id]: generatePollingStations(data) }));
    }
    if (level === 'polling_station' && !boothCache[data.id]) {
      setBoothCache(prev => ({ ...prev, [data.id]: generateBooths(data) }));
    }
    if (level === 'booth' && !areaCache[data.id]) {
      setAreaCache(prev => ({ ...prev, [data.id]: generateAreas(data) }));
    }
    if (level === 'area' && !citizenCache[data.id]) {
      setCitizenCache(prev => ({ ...prev, [data.id]: generateCitizens(data) }));
    }
    if (level === 'citizen' && !problemCache[data.id]) {
      setProblemCache(prev => ({ ...prev, [data.id]: generateProblems(data) }));
    }
    setDrillPath(prev => [...prev, { level, label, data }]);
  };

  const handleNavigate = (index) => setDrillPath(prev => prev.slice(0, index + 1));

  const getPathData = () => ({
    county: 'Mombasa',
    subCounty: drillPath.find(p => p.level === 'constituency')?.label || '',
    ward: drillPath.find(p => p.level === 'ward')?.label || '',
    station: drillPath.find(p => p.level === 'polling_station')?.label || '',
    booth: drillPath.find(p => p.level === 'booth')?.label || '',
    area: drillPath.find(p => p.level === 'area')?.label || '',
    citizen: drillPath.find(p => p.level === 'citizen')?.data?.name || '',
    phone: drillPath.find(p => p.level === 'citizen')?.data?.phone || '',
  });

  const renderCurrentLevel = () => {
    switch (currentStep.level) {
      case 'constituency': {
        const cName = currentStep.data.id || currentStep.data.name.toLowerCase();
        const wards = wardCache[cName] || getMombasaConstituenciesForSubCounty(currentStep.data.id);
        const safeConstituency = { ...currentStep.data };
        if (!safeConstituency.aiInsights) {
          safeConstituency.aiInsights = {
            topIssues: [
              { name: "Water Supply", count: Math.floor((safeConstituency.complaintsMajor || 100) * 0.4) },
              { name: "Road Conditions", count: Math.floor((safeConstituency.complaintsMajor || 100) * 0.3) },
              { name: "Garbage Clearance", count: Math.floor((safeConstituency.complaintsMinor || 50) * 0.5) }
            ],
            criticalArea: `${safeConstituency.name} Central Ward`,
            reason: "Water complaints increased by 42% this month due to pipeline burst.",
            action: "Deploy field team within 48 hours to assess water pipeline damage."
          };
        }
        return (
          <ConstituencyDashboard
            constituency={safeConstituency}
            wards={wards}
            onWardClick={(w) => pushLevel('ward', w.name, w)}
          />
        );
      }
      case 'ward': {
        const stations = stationCache[currentStep.data.id] || generatePollingStations(currentStep.data);
        const constStep = drillPath.find(p => p.level === 'constituency');
        const cName = constStep ? (constStep.data.id || constStep.data.name.toLowerCase()) : '';
        const currentWardList = wardCache[cName] || [];
        const freshWard = currentWardList.find(w => w.id === currentStep.data.id || w.name === currentStep.data.name) || currentStep.data;
        const safeWard = { ...freshWard };
        if (!safeWard.topIssues) {
          safeWard.topIssues = [
            { type: "Water Supply", severity: "major", count: Math.floor((safeWard.major || 30) * 0.4) },
            { type: "Road Conditions", severity: "major", count: Math.floor((safeWard.major || 30) * 0.3) },
            { type: "Garbage", severity: "minor", count: Math.floor((safeWard.minor || 10) * 0.5) }
          ];
        }
        return (
          <WardDashboard
            ward={safeWard}
            childrenItems={stations}
            childTypeLabel="Polling Station"
            childField="stations"
            onChildClick={(s) => pushLevel('polling_station', s.name, s)}
            onToggleVisited={handleToggleVisited}
          />
        );
      }
      case 'polling_station': {
        const booths = boothCache[currentStep.data.id] || generateBooths(currentStep.data);
        return (
          <DrilldownList
            title={`Booths under ${currentStep.data.name}`}
            items={booths}
            columns={[
              { header: 'Booth Name',  field: 'name',   align: 'center', width: '40%' },
              { header: 'Voters',      field: 'voters', align: 'center', width: '20%' },
              { header: 'Areas',       field: 'areas',  align: 'center', width: '20%' },
              { header: 'Major Issues',field: 'major',  align: 'center', width: '10%' },
              { header: 'Minor Issues',field: 'minor',  align: 'center', width: '10%' }
            ]}
            onRowClick={(b) => pushLevel('booth', b.name, b)}
          />
        );
      }
      case 'booth': {
        const areas = areaCache[currentStep.data.id] || generateAreas(currentStep.data);
        return (
          <DrilldownList
            title={`Areas / Localities under ${currentStep.data.name}`}
            items={areas}
            columns={[
              { header: 'Area / Locality', field: 'name',            align: 'center', width: '32%' },
              { header: 'Population',      field: 'population',      align: 'center', width: '16%' },
              { header: 'Volunteers',      field: 'activeVolunteers', align: 'center', width: '14%' },
              { header: 'Top Issue',       field: 'topDiscussed',    width: '24%' },
              { header: 'Complaints',      field: 'issues',          align: 'center', width: '14%' }
            ]}
            onRowClick={(a) => pushLevel('area', a.name, a)}
          />
        );
      }
      case 'area': {
        const citizens = citizenCache[currentStep.data.id] || generateCitizens(currentStep.data);
        return (
          <AreaDashboard
            area={currentStep.data}
            citizens={citizens}
            onCitizenClick={(c) => pushLevel('citizen', c.name, c)}
          />
        );
      }
      case 'citizen': {
        const problems = problemCache[currentStep.data.id] || generateProblems(currentStep.data);
        return (
          <CitizenDashboard
            citizen={currentStep.data}
            problems={problems}
            onProblemClick={(p) => pushLevel('problem', p.id, p)}
          />
        );
      }
      case 'problem':
        return <ProblemDetails problem={currentStep.data} pathData={getPathData()} />;
      default:
        return null;
    }
  };

  return (
    <div className="hierarchy-manager">
      {notification && (
        <div className="top-notification-toast">
          <div className="toast-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div className="toast-content">
            <div className="toast-title">Automated Call Triggered</div>
            <div className="toast-message">{notification.message}</div>
          </div>
        </div>
      )}
      <Breadcrumb path={drillPath} onNavigate={handleNavigate} />
      {renderCurrentLevel()}
    </div>
  );
}
