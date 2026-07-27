import React, { useState, useEffect } from 'react';
import Breadcrumb from '../ui/Breadcrumb';
import DrilldownList from '../ui/DrilldownList';
import WardDashboard from './WardDashboard';
import CitizenDashboard from './CitizenDashboard';
import ProblemDetails from './ProblemDetails';

import * as nationalService from '../../services/nationalDataService';
import * as nairobiService from '../../services/nairobiDataService';

// Fallback wrappers for region dashboards that are too specific to unify fully yet
import SubCountyDashboard from '../../pages/dashboards/SubCountyDashboard';
import ConstituencyDashboard from '../../pages/dashboards/ConstituencyDashboard';
import LocalityDashboard from '../../pages/dashboards/LocalityDashboard';
import AreaDashboard from '../../pages/dashboards/AreaDashboard';

export default function UnifiedHierarchyManager({ rootItem, isNairobi }) {
  const L1_TYPE = isNairobi ? 'district' : 'county';
  const L2_TYPE = isNairobi ? 'constituency' : 'subCounty';
  const L3_TYPE = 'ward';
  const L4_TYPE = isNairobi ? 'booth' : 'station';
  const L5_TYPE = 'area';
  const L6_TYPE = 'citizen';
  const L7_TYPE = 'problem';

  const [drillPath, setDrillPath] = useState([
    { level: L1_TYPE, label: rootItem.name, data: rootItem }
  ]);

  const [l2Cache, setL2Cache] = useState({});
  const [l3Cache, setL3Cache] = useState({});
  const [l4Cache, setL4Cache] = useState({});
  const [l5Cache, setL5Cache] = useState({});
  const [l6Cache, setL6Cache] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleUpload = () => {
      setL2Cache({});
      setL3Cache({});
      setL4Cache({});
      setL5Cache({});
      setL6Cache({});
      setDrillPath([{ level: L1_TYPE, label: rootItem.name, data: rootItem }]);
    };
    window.addEventListener('upload_data_ready', handleUpload);
    return () => window.removeEventListener('upload_data_ready', handleUpload);
  }, [rootItem, L1_TYPE]);

  useEffect(() => {
    window.__hierarchyBack = () => {
      if (drillPath.length > 1) {
        setDrillPath(prev => prev.slice(0, -1));
        return true;
      }
      return false;
    };
    return () => { window.__hierarchyBack = null; };
  }, [drillPath]);

  const triggerNotification = (message) => {
    setNotification({ message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleToggleVisited = (wardId) => {
    const l2Step = drillPath.find(p => p.level === L2_TYPE);
    if (!l2Step) return;
    const l2Name = l2Step.data.name;

    setL2Cache(prev => {
      const list = prev[l2Name] || [];
      const updatedList = list.map(w => {
        if (w.id === wardId) {
          const newVisited = !w.visited;
          if (newVisited) {
            triggerNotification(`Initiating automated feedback calls to citizens in ${w.name}!`);
          }
          return { ...w, visited: newVisited };
        }
        return w;
      });
      return { ...prev, [l2Name]: updatedList };
    });

    setDrillPath(prev => prev.map(step => {
      if (step.level === L3_TYPE && step.data.id === wardId) {
        return {
          ...step,
          data: { ...step.data, visited: !step.data.visited }
        };
      }
      return step;
    }));
  };

  const currentStep = drillPath[drillPath.length - 1];

  const handleNavigate = (index) => {
    setDrillPath(prev => prev.slice(0, index + 1));
  };

  const pushLevel = (level, label, data) => {
    if (level === L2_TYPE) {
      const key = data.name;
      if (!l2Cache[key]) {
        const generator = isNairobi ? nairobiService.generateWards : nationalService.generateWards;
        setL2Cache(prev => ({ ...prev, [key]: generator(data) }));
      }
    }
    if (level === L3_TYPE) {
      const key = data.id;
      if (!l3Cache[key]) {
        const generator = isNairobi ? nairobiService.generateBooths : nationalService.generatePollingStations;
        setL3Cache(prev => ({ ...prev, [key]: generator(data) }));
      }
    }
    if (level === L4_TYPE) {
      const key = data.id;
      if (!l4Cache[key]) {
        const generator = isNairobi ? nairobiService.generateAreas : nationalService.generateLocalities;
        setL4Cache(prev => ({ ...prev, [key]: generator(data) }));
      }
    }
    if (level === L5_TYPE) {
      const key = data.id;
      if (!l5Cache[key]) {
        const generator = isNairobi ? nairobiService.generateCitizens : nationalService.generateCitizens;
        setL5Cache(prev => ({ ...prev, [key]: generator(data) }));
      }
    }
    if (level === L6_TYPE) {
      const key = data.id;
      if (!l6Cache[key]) {
        const generator = isNairobi ? nairobiService.generateProblems : nationalService.generateProblems;
        setL6Cache(prev => ({ ...prev, [key]: generator(data) }));
      }
    }
    setDrillPath(prev => [...prev, { level, label, data }]);
  };

  const getPathData = () => {
    return {
      district: isNairobi ? (drillPath.find(p => p.level === L1_TYPE)?.label || '') : undefined,
      county: !isNairobi ? (drillPath.find(p => p.level === L1_TYPE)?.label || '') : undefined,
      constituency: isNairobi ? (drillPath.find(p => p.level === L2_TYPE)?.label || '') : undefined,
      subCounty: !isNairobi ? (drillPath.find(p => p.level === L2_TYPE)?.label || '') : undefined,
      ward: drillPath.find(p => p.level === L3_TYPE)?.label || '',
      booth: isNairobi ? (drillPath.find(p => p.level === L4_TYPE)?.label || '') : undefined,
      station: !isNairobi ? (drillPath.find(p => p.level === L4_TYPE)?.label || '') : undefined,
      area: drillPath.find(p => p.level === L5_TYPE)?.label || '',
      citizen: drillPath.find(p => p.level === L6_TYPE)?.data?.name || '',
      phone: drillPath.find(p => p.level === L6_TYPE)?.data?.phone || ''
    };
  };

  const renderCurrentLevel = () => {
    switch (currentStep.level) {
      case L1_TYPE: {
        const items = isNairobi 
          ? nairobiService.getConstituenciesForDistrict(currentStep.data.id) 
          : nationalService.getSubCountiesForCounty(currentStep.data.id);
          
        const label = isNairobi ? 'Constituencies' : 'Sub-Counties';
        const repLabel = isNairobi ? 'MP Representative' : 'Representative';
        const repField = isNairobi ? 'mla' : 'mp';
        
        return (
          <DrilldownList 
            title={`${currentStep.data.name} ${label} (${items.length})`}
            items={items}
            columns={[
              { header: isNairobi ? 'Constituency' : 'Sub-County',  field: 'name',    align: 'center', width: '34%' },
              { header: repLabel, field: repField, align: 'center', width: '26%' },
              { header: 'Wards',        field: 'wards',   align: 'center',  width: '8%' },
              { header: 'Major',        field: 'major',   align: 'center',  width: '9%' },
              { header: 'Minor',        field: 'minor',   align: 'center',  width: '9%' },
              { header: 'Total',        align: 'center',   width: '8%',
                render: (c) => <strong style={{ color: '#dc2626' }}>{c.major + c.minor}</strong>
              },
              { header: 'Visited',      align: 'center',  width: '6%',
                render: (c) => c.visited
                  ? <span style={{ color: '#10b981', display: 'flex', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                  : <span style={{ color: '#dc2626', display: 'flex', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
              }
            ]}
            onRowClick={(c) => pushLevel(L2_TYPE, c.name, c)}
          />
        );
      }
      case L2_TYPE: {
        const cName = currentStep.data.name;
        let wards = l2Cache[cName];
        if (!wards) {
          const generator = isNairobi ? nairobiService.generateWards : nationalService.generateWards;
          wards = generator(currentStep.data);
          setTimeout(() => {
            setL2Cache(prev => {
              if (prev[cName]) return prev;
              return { ...prev, [cName]: wards };
            });
          }, 0);
        }
        if (isNairobi) {
          return (
            <ConstituencyDashboard 
              constituency={currentStep.data} 
              wards={wards} 
              onWardClick={(w) => pushLevel(L3_TYPE, w.name, w)} 
            />
          );
        } else {
          return (
            <SubCountyDashboard 
              subCounty={currentStep.data} 
              wards={wards} 
              onWardClick={(w) => pushLevel(L3_TYPE, w.name, w)} 
            />
          );
        }
      }
      case L3_TYPE: {
        const wId = currentStep.data.id;
        let l4Items = l3Cache[wId];
        if (!l4Items) {
          const generator = isNairobi ? nairobiService.generateBooths : nationalService.generatePollingStations;
          l4Items = generator(currentStep.data);
          setTimeout(() => setL3Cache(prev => prev[wId] ? prev : { ...prev, [wId]: l4Items }), 0);
        }
        return (
          <WardDashboard 
            ward={currentStep.data} 
            childrenItems={l4Items} 
            childTypeLabel={isNairobi ? 'Booth' : 'Polling Station'}
            childField={isNairobi ? 'booths' : 'stations'}
            onChildClick={(b) => pushLevel(L4_TYPE, b.name, b)} 
            onToggleVisited={handleToggleVisited}
          />
        );
      }
      case L4_TYPE: {
        const sId = currentStep.data.id;
        let l5Items = l4Cache[sId];
        if (!l5Items) {
          const generator = isNairobi ? nairobiService.generateAreas : nationalService.generateLocalities;
          l5Items = generator(currentStep.data);
          setTimeout(() => setL4Cache(prev => prev[sId] ? prev : { ...prev, [sId]: l5Items }), 0);
        }
        return (
          <DrilldownList 
            title={`${isNairobi ? 'Areas' : 'Localities'} under ${currentStep.data.name}`}
            items={l5Items}
            columns={[
              { header: isNairobi ? 'Area' : 'Locality', field: 'name', align: 'center', width: '32%' },
              { header: 'Population',      field: 'population',      align: 'center', width: '16%' },
              { header: 'Volunteers',      field: 'activeVolunteers', align: 'center', width: '14%' },
              { header: 'Top Issue',       field: 'topDiscussed',    width: '24%' },
              { header: 'Complaints',      field: 'issues',          align: 'center', width: '14%' }
            ]}
            onRowClick={(a) => pushLevel(L5_TYPE, a.name, a)}
          />
        );
      }
      case L5_TYPE: {
        const lId = currentStep.data.id;
        let citizens = l5Cache[lId];
        if (!citizens) {
          const generator = isNairobi ? nairobiService.generateCitizens : nationalService.generateCitizens;
          citizens = generator(currentStep.data);
          setTimeout(() => setL5Cache(prev => prev[lId] ? prev : { ...prev, [lId]: citizens }), 0);
        }
        if (isNairobi) {
           return (
             <AreaDashboard 
               area={currentStep.data} 
               citizens={citizens} 
               onCitizenClick={(c) => pushLevel(L6_TYPE, c.name, c)} 
             />
           );
        } else {
           return (
             <LocalityDashboard 
               area={currentStep.data} 
               citizens={citizens} 
               onCitizenClick={(c) => pushLevel(L6_TYPE, c.name, c)} 
             />
           );
        }
      }
      case L6_TYPE: {
        const cId = currentStep.data.id;
        let problems = l6Cache[cId];
        if (!problems) {
          const generator = isNairobi ? nairobiService.generateProblems : nationalService.generateProblems;
          problems = generator(currentStep.data);
          setTimeout(() => setL6Cache(prev => prev[cId] ? prev : { ...prev, [cId]: problems }), 0);
        }
        return (
          <CitizenDashboard 
            citizen={currentStep.data} 
            problems={problems} 
            onProblemClick={(p) => pushLevel(L7_TYPE, p.id, p)} 
          />
        );
      }
      case L7_TYPE:
        return <ProblemDetails problem={currentStep.data} pathData={getPathData()} isNairobi={isNairobi} />;
      default:
        return null;
    }
  };

  return (
    <div className="hierarchy-manager">
      {notification && (
        <div className="top-notification-toast">
          <div className="toast-icon"></div>
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
