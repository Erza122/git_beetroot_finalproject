import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const sortingOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'random', label: 'Random' },
    { value: 'date_added', label: 'Date Added' },
    { value: 'views', label: 'Views' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'toplist', label: 'Top List' }
  ];

  const orderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  const purityOptions = [
    { value: '100', label: 'SFW Only' },
    { value: '110', label: 'SFW + Sketchy' },
    { value: '111', label: 'All (NSFW)' }
  ];

  const categoryOptions = [
    { value: '111', label: 'All' },
    { value: '100', label: 'General' },
    { value: '010', label: 'Anime' },
    { value: '001', label: 'People' },
    { value: '110', label: 'General + Anime' },
    { value: '101', label: 'General + People' },
    { value: '011', label: 'Anime + People' }
  ];

  const ratioOptions = [
    { value: '', label: 'Any' },
    { value: '16x9', label: '16:9' },
    { value: '16x10', label: '16:10' },
    { value: '21x9', label: '21:9' },
    { value: '32x9', label: '32:9' },
    { value: '9x16', label: '9:16 (Mobile)' },
    { value: '4x3', label: '4:3' }
  ];

  return (
    <div className="filter-panel">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="filter-icon">⚙️</span>
        <span>Filters</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="filter-content">
          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label">Sorting</label>
              <select
                className="filter-select"
                value={filters.sorting || 'relevance'}
                onChange={(e) => handleChange('sorting', e.target.value)}
              >
                {sortingOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Order</label>
              <select
                className="filter-select"
                value={filters.order || 'desc'}
                onChange={(e) => handleChange('order', e.target.value)}
              >
                {orderOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Purity</label>
              <select
                className="filter-select"
                value={filters.purity || '100'}
                onChange={(e) => handleChange('purity', e.target.value)}
              >
                {purityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Categories</label>
              <select
                className="filter-select"
                value={filters.categories || '111'}
                onChange={(e) => handleChange('categories', e.target.value)}
              >
                {categoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Aspect Ratio</label>
              <select
                className="filter-select"
                value={filters.ratios || ''}
                onChange={(e) => handleChange('ratios', e.target.value)}
              >
                {ratioOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
