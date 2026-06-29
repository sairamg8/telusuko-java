import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';

export default function BookReader({
  concept,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isRead,
  onToggleRead,
  fontSize
}) {
  if (!concept) {
    return (
      <div className="book-reader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Choose a Java concept from the left index index to begin.</p>
      </div>
    );
  }

  return (
    <div className="book-reader">
      <div className="book-page">
        {/* Chapter Subheader */}
        <div className="book-chapter-indicator">
          Concept {concept.id} of 100
        </div>
        
        {/* Main Title */}
        <h1 className="book-title">{concept.title}</h1>

        {/* Eye-comfort Hater Introduction block */}
        {concept.intro && (
          <div className="hater-alert">
            <strong>Therapist Note:</strong> "{concept.intro}"
          </div>
        )}

        {/* Concept Text Body */}
        <div className="book-text" style={{ fontSize: `${fontSize}px` }}>
          <p>{concept.explanation}</p>
        </div>

        {/* Code Snippet Box */}
        {concept.code && (
          <div className="code-block-wrapper">
            <div className="code-header">
              <span>Java Snippet</span>
              <button
                className="btn"
                style={{ fontSize: '11px', padding: '2px 8px' }}
                onClick={() => navigator.clipboard.writeText(concept.code)}
              >
                Copy
              </button>
            </div>
            <pre className="code-block">{concept.code}</pre>
          </div>
        )}

        {/* Check off task */}
        <div
          onClick={() => onToggleRead(concept.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: isRead ? 'rgba(39, 174, 96, 0.08)' : 'var(--code-bg)',
            border: `1.5px solid ${isRead ? 'var(--success-color)' : 'var(--border-color)'}`,
            cursor: 'pointer',
            marginTop: '32px'
          }}
        >
          {isRead ? (
            <CheckCircle size={22} style={{ color: 'var(--success-color)' }} />
          ) : (
            <Circle size={22} style={{ color: 'var(--text-secondary)' }} />
          )}
          <span style={{ fontWeight: '600', color: isRead ? 'var(--success-color)' : 'var(--text-primary)' }}>
            {isRead ? "Concept mastered! Mark as unread" : "Mark as read & count towards my 50 LPA progress"}
          </span>
        </div>

        {/* Pagination Buttons */}
        <div className="book-pagination">
          <button
            className="btn"
            disabled={!hasPrev}
            onClick={onPrev}
            style={{ opacity: hasPrev ? 1 : 0.4 }}
          >
            <ChevronLeft size={16} />
            Previous Concept
          </button>
          
          <button
            className="btn btn-accent"
            disabled={!hasNext}
            onClick={onNext}
            style={{ opacity: hasNext ? 1 : 0.4 }}
          >
            Next Concept
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
