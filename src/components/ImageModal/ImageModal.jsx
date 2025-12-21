import React, { useState, useEffect, useCallback } from 'react';
import './ImageModal.css';

const ImageModal = ({ wallpaper, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  const handleDownload = () => {
    window.open(wallpaper.path, '_blank');
  };

  if (!wallpaper) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Wallpaper preview"
    >
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div className="modal-image-container">
          {isLoading && (
            <div className="modal-loading">
              <div className="loading-spinner"></div>
              <p>Loading full image...</p>
            </div>
          )}
          
          {imageError ? (
            <div className="modal-error">
              <span>❌</span>
              <p>Failed to load image</p>
            </div>
          ) : (
            <img
              src={wallpaper.path}
              alt={`Wallpaper ${wallpaper.id}`}
              className={`modal-image ${isLoading ? 'loading' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
        
        <div className="modal-info">
          <div className="modal-details">
            <div className="detail-item">
              <span className="detail-label">Resolution</span>
              <span className="detail-value">{wallpaper.resolution}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">File Size</span>
              <span className="detail-value">{(wallpaper.file_size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Views</span>
              <span className="detail-value">{wallpaper.views?.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Favorites</span>
              <span className="detail-value">{wallpaper.favorites?.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="action-button primary" onClick={handleDownload}>
              <span>⬇️</span> Download
            </button>
            <a 
              href={wallpaper.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button secondary"
            >
              <span>🔗</span> View on Wallhaven
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
