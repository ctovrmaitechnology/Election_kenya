import React from 'react';
import RegionCard from './RegionCard';

export default function RegionGrid({ regions, onRegionClick, isNairobi }) {
  return (
    <div className={isNairobi ? "premium-district-grid" : "premium-county-grid"}>
      {regions.map((region, idx) => (
        <RegionCard 
          key={region.id} 
          region={region} 
          index={region._originalIdx !== undefined ? region._originalIdx : idx}
          onClick={() => onRegionClick(region)} 
        />
      ))}
    </div>
  );
}
