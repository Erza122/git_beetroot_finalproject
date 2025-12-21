import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, FilterPanel, WallpaperGrid, ImageModal, Pagination } from '../components';
import { searchWallpapers } from '../services/wallhavenApi';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({
    sorting: 'relevance',
    order: 'desc',
    purity: '100',
    categories: '111',
    ratios: ''
  });

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  const fetchWallpapers = useCallback(async () => {
    if (!query.trim()) {
      setWallpapers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchWallpapers(query, { ...filters, page });
      setWallpapers(data.data || []);
      setMeta(data.meta || null);
    } catch (err) {
      setError('Failed to fetch wallpapers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, filters, page]);

  useEffect(() => {
    fetchWallpapers();
  }, [fetchWallpapers]);

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams({ q: query, page: '1' });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWallpaperClick = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const closeModal = () => {
    setSelectedWallpaper(null);
  };

  const totalPages = meta?.last_page || 1;

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {query && (
          <div className="search-info">
            <h2 className="search-query">
              Results for "<span>{query}</span>"
            </h2>
            {meta && (
              <p className="search-count">
                {meta.total?.toLocaleString()} wallpapers found
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={fetchWallpapers} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {!query && !loading && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h3>Start your search</h3>
            <p>Enter a keyword above to find amazing wallpapers</p>
          </div>
        )}

        <WallpaperGrid
          wallpapers={wallpapers}
          onWallpaperClick={handleWallpaperClick}
          loading={loading}
        />

        {!loading && wallpapers.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {selectedWallpaper && (
        <ImageModal wallpaper={selectedWallpaper} onClose={closeModal} />
      )}
    </div>
  );
};

export default Search;
