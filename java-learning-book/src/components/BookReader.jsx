import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookReader({
  concept,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  fontSize
}) {
  if (!concept) {
    return (
      <div className="book-reader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Choose a Java concept from the left index to begin.</p>
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

        {/* Gotchas rendered directly in the chapter itself */}
        {concept.gotchas && concept.gotchas.map((g, idx) => (
          <div key={idx} style={{
            backgroundColor: 'var(--accent-bg)',
            borderLeft: '4px solid var(--danger-color)',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            marginBottom: '16px'
          }}>
            <div style={{ fontWeight: '700', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', marginBottom: '8px' }}>
              <span>⚠️ GOTCHA #{idx + 1}</span>
            </div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.6' }}>{g}</div>
          </div>
        ))}

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
