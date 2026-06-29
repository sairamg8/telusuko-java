import React from 'react';
import { Search, Check, FileText } from 'lucide-react';

export default function TableOfContents({
  chapters,
  currentConcept,
  onSelectConcept,
  completedConcepts,
  onToggleRead,
  searchQuery,
  onSearchChange
}) {
  // Calculate stats
  const totalConcepts = 100;
  const completedCount = completedConcepts.length;
  const progressPercent = Math.round((completedCount / totalConcepts) * 100);

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

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <FileText size={22} style={{ color: 'var(--accent-color)' }} />
          <span>Java for Haters</span>
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
          filteredChapters.map((ch) => (
            <div key={ch.id}>
              <div className="chapter-title">
                Chapter {ch.id}: {ch.title} ({ch.range})
              </div>
              <div>
                {ch.concepts.map((c) => {
                  const isActive = currentConcept && currentConcept.id === c.id;
                  const isRead = completedConcepts.includes(c.id);

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
                          onToggleRead(c.id);
                        }}
                      >
                        {isRead && <Check size={10} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
