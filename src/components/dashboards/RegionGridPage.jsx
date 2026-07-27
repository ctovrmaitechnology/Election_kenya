import React, { useState } from 'react';
import RegionGrid from '../../components/ui/RegionGrid';

export default function RegionGridPage({ regions, onRegionClick, isNairobi }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const title = isNairobi ? 'Nairobi Districts' : 'Kenya Counties';
  const searchPlaceholder = isNairobi ? 'Search districts...' : 'Search counties...';
  const totalLabel = isNairobi ? 'Total Districts' : 'Total Counties';

  const regionsWithIndex = regions.map((r, idx) => ({ ...r, _originalIdx: idx }));
  const sortedRegions = [...regionsWithIndex].sort((a, b) => a.name.localeCompare(b.name));

  const filtered = sortedRegions.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="premium-dashboard">


      <RegionGrid regions={filtered} onRegionClick={onRegionClick} isNairobi={isNairobi} />
    </div>
  );
}
