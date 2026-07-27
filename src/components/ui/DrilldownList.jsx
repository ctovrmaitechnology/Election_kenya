import React from 'react';

export default function DrilldownList({ title, items, columns, onRowClick }) {
  const handleExportCSV = () => {
    if (!items || items.length === 0) return;
    const header = columns.map(c => c.header).join(',');
    const rows = items.map(item => {
      return columns.map(c => {
        let val = c.render ? c.render(item) : item[c.field];
        if (typeof val === 'object' && val !== null) val = item[c.field];
        val = String(val ?? '').replace(/"/g, '""');
        return `"${val}"`;
      }).join(',');
    });
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="interactive-table-card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title">{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); handleExportCSV(); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(16,185,129,0.2)' }}
            title="Export to Excel"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Export CSV
          </button>
          <span style={{ fontSize: '12px', color: '#1d4ed8', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
            {items.length} {items.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>
      </div>
      <div className="drilldown-table-wrapper">
        <table className="drilldown-table">
          <colgroup>
            <col style={{ width: '5%' }} />
            {columns.map((col, i) => (
              <col key={i} style={{ width: col.width || 'auto' }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>#</th>
              {columns.map((col, i) => (
                <th key={i} style={{ textAlign: 'center' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} onClick={() => onRowClick(item)} className="clickable-row">
                <td style={{ textAlign: 'center', fontWeight: '700', color: '#0f172a' }}>{i + 1}</td>
                {columns.map((col, j) => (
                  <td key={j} style={{ textAlign: 'center', fontWeight: j === 0 ? '600' : '500', color: j === 0 ? '#111827' : '#374151' }}>
                    {col.render ? col.render(item) : item[col.field]}
                  </td>
                ))}
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '48px 24px', color: '#94a3b8', fontSize: '14px' }}>
                  📋 No records found at this level.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

