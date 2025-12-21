import React from 'react';
import WallpaperCard from '../WallpaperCard/WallpaperCard';
import './WallpaperGrid.css';

const WallpaperGrid = ({ wallpapers, onWallpaperClick, loading }) => {
  if (loading) {
    return (
      <div className="wallpaper-grid">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-shimmer"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="no-results">
        <span className="no-results-icon">🔍</span>
        <h3>No wallpapers found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="wallpaper-grid">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          onClick={onWallpaperClick}
        />
      ))}
    </div>
  );
};

export default WallpaperGrid;
