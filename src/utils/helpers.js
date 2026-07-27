
export function getRiskColor(total) {
  if (total > 900) return '#dc2626'; // Red   – Major Risk
  if (total > 500) return '#eab308'; // Yellow – Minor Risk
  return '#2563eb';                  // Blue   – No / Low Risk
}


