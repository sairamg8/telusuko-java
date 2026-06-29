import React, { useState, useEffect } from 'react';
import { Search, Check, FileText, ChevronDown, ChevronRight } from 'lucide-react';

export default function TableOfContents({
  chapters,
  currentConcept,
  onSelectConcept,
  completedConcepts,
  onToggleRead,
  searchQuery,
  onSearchChange,
  currentLanguage,
  onBackToDashboard
}) {
  // Find active chapter ID that holds currentConcept
  const activeChapterId = chapters.find(ch =>
    ch.concepts.some(c => c.id === currentConcept?.id)
  )?.id;

  // Track expanded state of chapters
  const [expandedChapters, setExpandedChapters] = useState({});

  // Auto-expand active chapter when currentConcept changes
  useEffect(() => {
    if (activeChapterId) {
      setExpandedChapters(prev => ({
        ...prev,
        [activeChapterId]: true
      }));
    }
  }, [activeChapterId]);

  // Calculate dynamic stats
  const totalConcepts = chapters.reduce((acc, curr) => acc + curr.concepts.length, 0);
  const completedCount = completedConcepts.filter(id => typeof id === 'string' && id.startsWith(`${currentLanguage}_`)).length;
  const progressPercent = totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0;

  // Filter logic
  const getFilteredChapters = () => {
    if (!searchQuery.trim()) return chapters;

    const query = searchQuery.toLowerCase();
    return chapters.map(ch => {
      const matching = ch.concepts.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.intro.toLowerCase().includes(query) ||
        c.explanation.toLowerCase().includes(query)
      );
      return {
        ...ch,
        concepts: matching
      };
    }).filter(ch => ch.concepts.length > 0);
  };

  const filteredChapters = getFilteredChapters();

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div className="sidebar-logo">
            <FileText size={20} style={{ color: 'var(--accent-color)' }} />
            <span style={{ fontSize: '15px' }}>{currentLanguage === 'react' ? 'React JS Guide' : 'Java for Haters'}</span>
          </div>
          <button
            onClick={onBackToDashboard}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              color: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🏠 Home
          </button>
        </div>
        
        <div className="sidebar-progress">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Reading Progress</span>
            <span>{completedCount} / {totalConcepts} ({progressPercent}%)</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="sidebar-search">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search concepts, keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Index List */}
      <div className="sidebar-list">
        {filteredChapters.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '20px' }}>
            No matching concepts found.
          </p>
        ) : (
          filteredChapters.map((ch) => {
            // Expanded if chapter is explicitly true in expandedChapters,
            // OR if user is searching (always expand during searches to show matches)
            const isExpanded = !!expandedChapters[ch.id] || !!searchQuery.trim();

            return (
              <div key={ch.id} style={{ marginBottom: '12px' }}>
                <div 
                  className="chapter-title"
                  onClick={() => toggleChapter(ch.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-color)',
                    transition: 'background-color 0.2s',
                    marginTop: '8px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--code-bg)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-page)'}
                >
                  <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>
                    Ch {ch.id}: {ch.title}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>({ch.concepts.length})</span>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ paddingLeft: '4px', marginTop: '4px' }}>
                    {ch.concepts.map((c) => {
                      const isActive = currentConcept && currentConcept.id === c.id;
                      const isRead = completedConcepts.includes(`${currentLanguage}_${c.id}`);

                      return (
                        <div
                          key={c.id}
                          className={`concept-item ${isActive ? 'active' : ''}`}
                          onClick={() => onSelectConcept(c)}
                        >
                          <span className="concept-text">
                            {c.id}. {c.title}
                          </span>
                          
                          <div
                            className={`checkbox-read ${isRead ? 'checked' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Avoid selecting the concept
                              onToggleRead(`${currentLanguage}_${c.id}`);
                            }}
                          >
                            {isRead && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
