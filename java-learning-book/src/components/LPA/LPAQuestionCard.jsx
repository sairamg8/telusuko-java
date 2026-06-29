import React from 'react';
import { Bookmark, BookmarkCheck, Code, Eye, EyeOff } from 'lucide-react';

export default function LPAQuestionCard({
  q,
  isRevealed,
  isMastered,
  onToggleAnswer,
  onToggleMastered,
  checkedItems,
  onToggleChecklist
}) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Intermediate': return '#3498db';
      case 'Advanced': return '#e67e22';
      case 'Expert': return '#e74c3c';
      default: return 'var(--text-secondary)';
    }
  };

  const getCompanyStyle = (company) => {
    switch (company) {
      case 'Google': return { bg: 'rgba(219, 68, 85, 0.12)', text: '#ea4335', border: 'rgba(219, 68, 85, 0.3)' };
      case 'Goldman Sachs': return { bg: 'rgba(241, 196, 15, 0.12)', text: '#d4ac0d', border: 'rgba(241, 196, 15, 0.3)' };
      case 'Uber': return { bg: 'rgba(44, 62, 80, 0.12)', text: 'var(--text-primary)', border: 'var(--border-color)' };
      case 'Netflix': return { bg: 'rgba(229, 9, 20, 0.12)', text: '#e50914', border: 'rgba(229, 9, 20, 0.3)' };
      case 'Amazon': return { bg: 'rgba(255, 153, 0, 0.12)', text: '#ff9900', border: 'rgba(255, 153, 0, 0.3)' };
      default: return { bg: 'var(--accent-bg)', text: 'var(--accent-color)', border: 'var(--border-color)' };
    }
  };

  const levelCol = getLevelColor(q.level);

  return (
    <div 
      style={{
        border: isMastered ? '2px solid var(--success-color)' : '1px solid var(--border-color)',
        borderRadius: '10px',
        backgroundColor: 'var(--card-bg)',
        padding: '16px',
        boxShadow: 'var(--shadow)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top tags line */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          padding: '2px 6px',
          borderRadius: '4px',
          backgroundColor: 'var(--accent-bg)',
          color: 'var(--accent-color)'
        }}>
          {q.category}
        </span>

        <span style={{
          fontSize: '10px',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '4px',
          backgroundColor: `${levelCol}22`,
          color: levelCol
        }}>
          {q.level}
        </span>

        {/* Company Badges */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
          {q.companies.map(c => {
            const style = getCompanyStyle(c);
            return (
              <span 
                key={c}
                style={{
                  fontSize: '9px',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: style.bg,
                  color: style.text,
                  border: `1px solid ${style.border}`
                }}
              >
                {c}
              </span>
            );
          })}
        </div>
      </div>

      {/* Question Title */}
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '8px', color: 'var(--text-primary)' }}>
        {q.title}
      </h3>

      {/* The Question prompt */}
      <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '16px', borderLeft: '2px solid var(--border-color)', paddingLeft: '8px' }}>
        "{q.question}"
      </p>

      {/* Action Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
        <button
          className="btn"
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          onClick={onToggleAnswer}
        >
          {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
          {isRevealed ? 'Hide LPA Breakdown' : 'Reveal LPA Solution'}
        </button>

        <button
          onClick={onToggleMastered}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: isMastered ? 'var(--success-color)' : 'var(--text-secondary)'
          }}
        >
          {isMastered ? <BookmarkCheck size={18} color="var(--success-color)" /> : <Bookmark size={18} />}
          <span style={{ fontWeight: isMastered ? 'bold' : 'normal' }}>
            {isMastered ? 'Mastered ✓' : 'Mark Mastered'}
          </span>
        </button>
      </div>

      {/* Revealed Answer Box */}
      {isRevealed && (
        <div 
          style={{
            marginTop: '16px',
            borderTop: '1px dashed var(--border-color)',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* The detailed answer */}
          <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
            <strong>50+ LPA Architect Answer Strategy:</strong>
            <p style={{ marginTop: '6px', whiteSpace: 'pre-line' }}>{q.answer}</p>
          </div>

          {/* Interview Checklist */}
          {q.checklist && (
            <div 
              style={{
                backgroundColor: 'var(--bg-page)',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid var(--border-color)'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                LPA Key-Concept Checklist
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.checklist.map((item, idx) => {
                  const isItemChecked = !!checkedItems[`${q.id}-${idx}`];
                  return (
                    <label 
                      key={idx}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '8px', 
                        fontSize: '12px', 
                        cursor: 'pointer',
                        color: isItemChecked ? 'var(--text-secondary)' : 'var(--text-primary)',
                        textDecoration: isItemChecked ? 'line-through' : 'none'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        style={{ marginTop: '2px', cursor: 'pointer' }}
                        checked={isItemChecked}
                        onChange={() => onToggleChecklist(idx)}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Code snippet block */}
          {q.code && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <Code size={12} />
                <span>Implementation Sandbox</span>
              </div>
              <pre 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  padding: '12px',
                  backgroundColor: 'var(--code-bg)',
                  borderRadius: '6px',
                  overflowX: 'auto',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  lineHeight: '1.4'
                }}
              >
                <code>{q.code}</code>
              </pre>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
