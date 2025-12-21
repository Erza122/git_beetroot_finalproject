import React, { useState } from 'react';
import './WallpaperCard.css';

const WallpaperCard = ({ wallpaper, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const formatResolution = (resolution) => {
    if (!resolution) return '';
    return resolution;
  };

  const getPurityBadge = (purity) => {
    const badges = {
      sfw: { label: 'SFW', class: 'badge-sfw' },
      sketchy: { label: 'Sketchy', class: 'badge-sketchy' },
      nsfw: { label: 'NSFW', class: 'badge-nsfw' }
    };
    return badges[purity] || badges.sfw;
  };

  const badge = getPurityBadge(wallpaper.purity);

  return (
    <div 
      className={`wallpaper-card ${isLoaded ? 'loaded' : ''}`}
      onClick={() => onClick(wallpaper)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick(wallpaper)}
      aria-label={`Wallpaper ${wallpaper.id}, resolution ${wallpaper.resolution}`}
    >
      <div className="card-image-wrapper">
        {!isLoaded && (
          <div className="card-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        {!hasError ? (
          <img
            src={wallpaper.thumbs?.small || wallpaper.thumbs?.large}
            alt={`Wallpaper ${wallpaper.id}`}
            className={`card-image ${isLoaded ? 'visible' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="card-error">
            <span>❌</span>
            <p>Failed to load</p>
          </div>
        )}
        <div className="card-overlay">
          <span className={`purity-badge ${badge.class}`}>{badge.label}</span>
          <span className="resolution-badge">{formatResolution(wallpaper.resolution)}</span>
        </div>
        <div className="card-hover-overlay">
          <span className="view-icon">🔍</span>
          <span>View Full</span>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
