import React from 'react';

export default function TopBar({
  viewMode,
  setViewMode,
  theme,
  setTheme,
  fontSize,
  setFontSize
}) {
  return (
    <div className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* View Switcher Toggle */}
        <div 
          style={{ 
            display: 'flex', 
            border: '1px solid var(--border-color)', 
            borderRadius: '6px', 
            overflow: 'hidden',
            backgroundColor: 'var(--bg-page)'
          }}
        >
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              backgroundColor: viewMode === 'book' ? 'var(--accent-color)' : 'transparent',
              color: viewMode === 'book' ? '#ffffff' : 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setViewMode('book')}
          >
            📚 Study Book
          </button>
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              backgroundColor: viewMode === 'lpa' ? 'var(--accent-color)' : 'transparent',
              color: viewMode === 'lpa' ? '#ffffff' : 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setViewMode('lpa')}
          >
            🔥 50+ LPA Hub (150 Qs)
          </button>
        </div>

        <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-color)' }}></div>

        {/* Theme Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Theme:</span>
          <div className="theme-selector">
            <div
              className={`theme-option ${theme === 'sepia' ? 'active' : ''}`}
              onClick={() => setTheme('sepia')}
            >
              Comfort Sepia
            </div>
            <div
              className={`theme-option ${theme === 'charcoal' ? 'active' : ''}`}
              onClick={() => setTheme('charcoal')}
            >
              Charcoal
            </div>
            <div
              className={`theme-option ${theme === 'paper' ? 'active' : ''}`}
              onClick={() => setTheme('paper')}
            >
              Paper Light
            </div>
          </div>
        </div>
      </div>

      <div className="top-bar-controls">
        {/* Font adjust */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Text Size:</span>
          <div className="font-controls">
            <button
              className="font-btn"
              onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
              title="Decrease Font Size"
            >
              A-
            </button>
            <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '0 4px' }}>{fontSize}px</span>
            <button
              className="font-btn"
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
