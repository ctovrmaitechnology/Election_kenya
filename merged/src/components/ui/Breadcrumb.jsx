import React from 'react';

export default function Breadcrumb({ path, onNavigate }) {
  const getIcon = (level) => {
    switch (level) {
      case 'county': return '📍';
      case 'subCounty': return '🏛️';
      case 'ward': return '🏨️';
      case 'station': return '🗳️';
      case 'area': return '🛣️';
      case 'citizen': return '👤';
      case 'problem': return '⚠️';
      default: return '📍';
    }
  };

  return (
    <div className="breadcrumb-container premium-shadow">
      {path.map((step, index) => (
        <React.Fragment key={index}>
          <button
            className={`breadcrumb-pill ${index === path.length - 1 ? 'active' : ''}`}
            onClick={() => onNavigate(index)}
          >
            <span className="breadcrumb-icon">{getIcon(step.level)}</span>
            <span className="breadcrumb-text">{step.label}</span>
          </button>
          {index < path.length - 1 && <span className="breadcrumb-separator">›</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

