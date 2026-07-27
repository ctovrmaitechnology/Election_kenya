import React from 'react';

const themes = ['yellow', 'blue', 'purple'];

const regionImages = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
  "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=800&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
  "https://images.unsplash.com/photo-1533907650686-70576141c030?w=800&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80"
];

export default function RegionCard({ region, index, onClick }) {
  const theme = themes[index % themes.length];
  const image = regionImages[index % regionImages.length];

  return (
    <div className={`premium-card theme-${theme}`} onClick={onClick}>
      <div className="premium-card-image" style={{ backgroundImage: `url(${image})` }}>
        
        <svg className="premium-ribbon" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path className="ribbon-color" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
          <path className="ribbon-white" fill="#ffffff" d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,144C672,128,768,128,864,144C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
        </svg>
      </div>
      
      <div className="premium-card-body">
        <h3 className="premium-title">{region.name}</h3>
        <div className="premium-subtitle">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg>
          {region.hq || region.details}
        </div>
        
        <div className="premium-stats">
          <div className="stat-box stat-major">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{region.complaintsMajor}</div>
            <div className="stat-label">MAJOR</div>
          </div>
          
          <div className="stat-box stat-minor">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{region.complaintsMinor}</div>
            <div className="stat-label">MINOR</div>
          </div>
          
          <div className="stat-box stat-visited">
            <div className="stat-icon-wrapper">
              <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div className="stat-number">{region.visitedCount}</div>
            <div className="stat-label">VISITED</div>
          </div>
        </div>
      </div>
    </div>
  );
}
