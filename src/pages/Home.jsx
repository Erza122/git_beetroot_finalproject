import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, WallpaperGrid, ImageModal } from '../components';
import { getPopularTags } from '../services/wallhavenApi';
import './Home.css';

const Home = () => {
  const [popularWallpapers, setPopularWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularTags();
        setPopularWallpapers(data.data?.slice(0, 12) || []);
      } catch (error) {
        console.error('Failed to fetch popular wallpapers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleWallpaperClick = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const closeModal = () => {
    setSelectedWallpaper(null);
  };

  const popularTags = [
    { name: 'Nature', query: 'nature' },
    { name: 'Abstract', query: 'abstract' },
    { name: 'Space', query: 'space galaxy' },
    { name: 'Anime', query: 'anime' },
    { name: 'Cars', query: 'cars' },
    { name: 'City', query: 'city night' },
    { name: 'Mountains', query: 'mountains' },
    { name: 'Minimalist', query: 'minimalist' }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect <span className="highlight">Wallpaper</span>
          </h1>
          <p className="hero-subtitle">
            Discover millions of stunning wallpapers for your desktop and mobile devices
          </p>
          <SearchBar large onSearch={handleSearch} />
          
          <div className="popular-tags">
            <span className="tags-label">Popular:</span>
            {popularTags.map(tag => (
              <button
                key={tag.query}
                className="tag-button"
                onClick={() => handleSearch(tag.query)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="hero-bg">
          <div className="hero-gradient"></div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 Trending Wallpapers</h2>
            <p className="section-subtitle">The most popular wallpapers this month</p>
          </div>
          
          <WallpaperGrid
            wallpapers={popularWallpapers}
            onWallpaperClick={handleWallpaperClick}
            loading={loading}
          />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎨</span>
              <h3>High Quality</h3>
              <p>Ultra HD wallpapers up to 8K resolution</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Smart Search</h3>
              <p>Find exactly what you need with powerful filters</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>All Devices</h3>
              <p>Desktop, tablet, and mobile wallpapers</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Fast & Free</h3>
              <p>Download instantly without any limitations</p>
            </div>
          </div>
        </div>
      </section>

      {selectedWallpaper && (
        <ImageModal wallpaper={selectedWallpaper} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
