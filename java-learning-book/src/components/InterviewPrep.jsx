import React, { useState, useEffect } from 'react';
import { Award, Check, HelpCircle, Eye, EyeOff } from 'lucide-react';

export default function InterviewPrep({ currentConcept, completedConcepts, chapters }) {
  const [revealed, setRevealed] = useState({});
  const [mastered, setMastered] = useState(() => {
    try {
      const saved = localStorage.getItem('masteredQuestions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Reset revealed states when active concept changes
  useEffect(() => {
    setRevealed({});
  }, [currentConcept]);

  // Persist mastered questions state
  useEffect(() => {
    localStorage.setItem('masteredQuestions', JSON.stringify(mastered));
  }, [mastered]);

  if (!currentConcept) {
    return <p style={{ color: 'var(--text-secondary)' }}>Select a concept to start prep.</p>;
  }

  // Find current chapter
  const currentChapter = chapters.find(ch =>
    ch.concepts.some(c => c.id === currentConcept.id)
  );

  if (!currentChapter) return null;

  // Gather questions:
  // 1. Questions from the current active concept
  // 2. Questions from previously completed concepts in the same chapter
  const prepItems = [];

  // Current concept questions
  if (currentConcept.interviewQuestions) {
    currentConcept.interviewQuestions.forEach((q, idx) => {
      prepItems.push({
        id: `c${currentConcept.id}-q${idx}`,
        conceptId: currentConcept.id,
        conceptTitle: currentConcept.title,
        question: q.question,
        answer: q.answer,
        isCurrent: true
      });
    });
  }

  // Other completed concepts in the same chapter
  currentChapter.concepts.forEach(c => {
    if (c.id !== currentConcept.id && completedConcepts.includes(c.id) && c.interviewQuestions) {
      c.interviewQuestions.forEach((q, idx) => {
        prepItems.push({
          id: `c${c.id}-q${idx}`,
          conceptId: c.id,
          conceptTitle: c.title,
          question: q.question,
          answer: q.answer,
          isCurrent: false
        });
      });
    }
  });

  const toggleReveal = (qId) => {
    setRevealed(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleMastered = (qId) => {
    setMastered(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div>
      <div className="motivation-card" style={{ marginBottom: '16px', background: 'linear-gradient(135deg, var(--success-color), #27ae60)' }}>
        <div className="motivation-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
          <Award size={18} />
          <span>Chapter {currentChapter.id} Interview Pool</span>
        </div>
        <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.9 }}>
          Showing questions for the active concept and your completed topics.
        </p>
      </div>

      {prepItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
          <HelpCircle size={24} style={{ color: 'var(--text-secondary)', marginBottom: '8px' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            No interview questions compiled for this section yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {prepItems.map((item) => {
            const isQRevealed = !!revealed[item.id];
            const isQMastered = !!mastered[item.id];

            return (
              <div
                key={item.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-page)',
                  padding: '12px',
                  position: 'relative',
                  borderLeft: item.isCurrent ? '4px solid var(--accent-color)' : '4px solid var(--text-secondary)'
                }}
              >
                {/* Meta details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '10px' }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: item.isCurrent ? 'var(--accent-color)' : 'var(--text-secondary)',
                    textTransform: 'uppercase'
                  }}>
                    {item.isCurrent ? 'Current Concept' : `Review: ${item.conceptTitle}`}
                  </span>
                  
                  {isQMastered && (
                    <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 'bold' }}>
                      <Check size={10} strokeWidth={3} />
                      Mastered
                    </span>
                  )}
                </div>

                {/* Question */}
                <p style={{ fontWeight: '600', fontSize: '13px', lineHeight: '1.4', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {item.question}
                </p>

                {/* Answer reveal */}
                {isQRevealed && (
                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    padding: '10px',
                    backgroundColor: 'var(--code-bg)',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    borderLeft: '2px solid var(--success-color)',
                    marginBottom: '10px'
                  }}>
                    <strong>LPA Answer Checklist:</strong>
                    <p style={{ marginTop: '4px' }}>{item.answer}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn"
                    style={{ fontSize: '11px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => toggleReveal(item.id)}
                  >
                    {isQRevealed ? <EyeOff size={11} /> : <Eye size={11} />}
                    {isQRevealed ? 'Hide Answer' : 'Reveal Answer'}
                  </button>

                  <button
                    className="btn"
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      marginLeft: 'auto',
                      backgroundColor: isQMastered ? 'rgba(39, 174, 96, 0.1)' : 'transparent',
                      borderColor: isQMastered ? 'var(--success-color)' : 'var(--border-color)',
                      color: isQMastered ? 'var(--success-color)' : 'var(--text-secondary)',
                      fontWeight: isQMastered ? 'bold' : 'normal'
                    }}
                    onClick={() => toggleMastered(item.id)}
                  >
                    {isQMastered ? 'Mastered ✓' : 'Mark Mastered'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
