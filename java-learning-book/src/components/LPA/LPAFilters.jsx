import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function LPAFilters({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
  categories,
  levels
}) {
  return (
    <div 
      className="filters-panel"
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '16px',
        backgroundColor: 'var(--card-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ position: 'relative' }}>
        <input 
          type="text"
          className="search-input"
          style={{ width: '100%', paddingLeft: '36px' }}
          placeholder="Search by company, topic, keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search 
          size={16} 
          className="search-icon" 
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} 
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', fontSize: '13px' }}>
        {/* Difficulty filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={12} color="var(--text-secondary)" />
          <span style={{ fontWeight: '600' }}>Difficulty:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                style={{
                  padding: '3px 8px',
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: selectedLevel === l ? 'var(--accent-color)' : 'var(--bg-page)',
                  color: selectedLevel === l ? '#ffffff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: selectedLevel === l ? 'bold' : 'normal'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: '600' }}>Category:</span>
          <select
            style={{
              padding: '3px 6px',
              fontSize: '12px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-page)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              outline: 'none'
            }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
