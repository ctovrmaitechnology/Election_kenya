import React, { useState } from "react";
import { mombasaDistrictsData } from "../data/mockData.js";
import RegionGrid from "../components/ui/RegionGrid.jsx";

export default function MombasaDistrictsPage({ onDistrictClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const regionsWithIndex = mombasaDistrictsData.map((r, idx) => ({ ...r, _originalIdx: idx }));
  const sortedRegions = [...regionsWithIndex].sort((a, b) => a.name.localeCompare(b.name));

  const filtered = sortedRegions.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="premium-dashboard">
      <RegionGrid regions={filtered} onRegionClick={onDistrictClick} isNairobi={true} />
    </div>
  );
}
