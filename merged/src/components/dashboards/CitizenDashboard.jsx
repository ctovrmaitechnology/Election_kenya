import React from 'react';
import DrilldownList from '../../components/ui/DrilldownList';

export default function CitizenDashboard({ citizen, problems, onProblemClick }) {
  return (
    <div className="hierarchy-dashboard">
      <div className="dashboard-kpis">
        <div className="kpi-card" style={{ padding: '24px', flex: '1' }}>
          <div className="kpi-title" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px', color: '#0f172a' }}>Citizen Profile</div>
          <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
            <p style={{ margin: '4px 0' }}><strong>Name:</strong> {citizen.name}</p>
            <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {citizen.phone}</p>
            <p style={{ margin: '4px 0' }}><strong>Total Problems:</strong> {citizen.problemsCount || citizen.totalProblems}</p>
          </div>
        </div>
      </div>

      <DrilldownList 
        title="Problems Logged by Citizen"
        items={problems}
        columns={[
          { header: 'ID', field: 'id', width: '15%' },
          { header: 'Problem Type', field: 'type', width: '35%' },
          { header: 'Priority', field: 'priority', width: '25%' },
          { header: 'Status', field: 'status', width: '25%' }
        ]}
        onRowClick={onProblemClick}
      />
    </div>
  );
}

