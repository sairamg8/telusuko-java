import React from 'react';
import { renderText } from '../utils/renderText';

export default function GotchaSection({ concept }) {
  if (!concept) return <p style={{ color: 'var(--text-secondary)' }}>Select a concept to view interview questions.</p>;

  return (
    <div>
      {/* Interview Questions Section */}
      <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '6px' }}>
        💼 50+ LPA Interview Checklist
      </h3>
      {concept.interviewQuestions && concept.interviewQuestions.length > 0 ? (
        concept.interviewQuestions.map((q, idx) => (
          <div key={idx} className="interview-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="interview-badge high-paying">L1 / Senior Interview</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Q{idx + 1}</span>
            </div>
            <div className="interview-question">
              {renderText(q.question)}
            </div>
            <div className="interview-answer">
              <strong>Key Answer:</strong> {renderText(q.answer)}
            </div>
          </div>
        ))
      ) : (
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          No specific interview questions compiled for this introduction section. Check subsequent concepts!
        </p>
      )}
    </div>
  );
}
