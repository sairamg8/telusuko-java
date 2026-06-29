import React from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LPADashboardCard({
  totalMastered,
  totalQuestions,
  checkedChecklistItemsCount,
  totalChecklistItemsCount,
  readinessPercentage
}) {
  return (
    <div 
      className="lpa-dashboard-card"
      style={{
        background: 'linear-gradient(135deg, #1e1e2f 0%, #11111d 100%)',
        color: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1, pointerEvents: 'none' }}>
        <Award size={160} color="#f1c40f" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Sparkles size={20} color="#f1c40f" />
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-serif)', color: '#f1c40f' }}>
          50+ LPA Expert Job Board
        </h2>
      </div>
      
      <p style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.85, marginBottom: '20px', maxWidth: '90%' }}>
        Deep-dive technical architectural questions asked in system-design & coding reviews by top-tier tech giants.
      </p>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px' }}>
          <span style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} color="#2ecc71" />
            LPA Interview Readiness Meter:
          </span>
          <span style={{ fontWeight: 'bold', color: '#f1c40f', fontSize: '15px' }}>{readinessPercentage}%</span>
        </div>

        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${readinessPercentage}%`, 
              background: 'linear-gradient(90deg, #2ecc71, #f1c40f)', 
              borderRadius: '4px', 
              transition: 'width 0.5s ease-out' 
            }} 
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', opacity: 0.75 }}>
          <span>Mastered: <strong>{totalMastered}/{totalQuestions}</strong> Qs</span>
          <span>Checklist Complete: <strong>{checkedChecklistItemsCount}/{totalChecklistItemsCount}</strong> points</span>
        </div>
      </div>
    </div>
  );
}
