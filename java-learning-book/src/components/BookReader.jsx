import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { renderText } from '../utils/renderText';

export default function BookReader({
  concept,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  fontSize,
  totalConcepts
}) {
  if (!concept) {
    return (
      <div className="book-reader" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Choose a concept from the left index to begin.</p>
      </div>
    );
  }

  return (
    <div className="book-reader">
      <div className="book-page">
        {/* Chapter Subheader */}
        <div className="book-chapter-indicator">
          Concept {concept.id} of {totalConcepts}
        </div>
        
        {/* Main Title */}
        <h1 className="book-title">{concept.title}</h1>

        {/* Concept intro callout */}
        {concept.intro && (
          <div className="hater-alert">
            <strong>Quick Take:</strong> {renderText(concept.intro)}
          </div>
        )}

        {/* Concept Text Body */}
        <div className="book-text" style={{ fontSize: `${fontSize}px` }}>
          {concept.explanation.split('\n').map((line, i) => {
            const numbered = line.match(/^(\d+)\.\s(.+)$/s);
            if (numbered) {
              return (
                <div key={i} className="book-point">
                  <span className="book-point-num">{numbered[1]}</span>
                  <span className="book-point-text">{renderText(numbered[2])}</span>
                </div>
              );
            }
            return <p key={i} className="book-paragraph">{renderText(line)}</p>;
          })}
        </div>

        {/* Code Snippet Box */}
        {concept.code && (
          <div className="code-block-wrapper">
            <div className="code-header">
              <span>Code Snippet</span>
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
          <div key={idx} className="gotcha-inline">
            <div className="gotcha-inline-header">⚠️ GOTCHA #{idx + 1}</div>
            <div className="gotcha-inline-body">{renderText(g)}</div>
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
