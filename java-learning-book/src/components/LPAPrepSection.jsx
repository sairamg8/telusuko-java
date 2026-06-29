import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import javaQuestions from '../data/qna/java/index.js';
import reactQuestions from '../data/qna/react/index.js';
import nextjsQuestions from '../data/qna/nextjs/index.js';
import LPADashboardCard from './LPA/LPADashboardCard';
import LPAFilters from './LPA/LPAFilters';
import LPAQuestionCard from './LPA/LPAQuestionCard';

export default function LPAPrepSection({ language = 'java' }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [revealedAnswers, setRevealedAnswers] = useState({});

  // Get active question pool
  const lpaQuestions = 
    language === 'react' ? reactQuestions :
    language === 'nextjs' ? nextjsQuestions :
    javaQuestions;

  // LocalStorage helpers partitioned by language
  const getInitialChecked = (lang) => {
    try {
      const saved = localStorage.getItem(`lpaCheckedChecklist_${lang}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const getInitialMastered = (lang) => {
    try {
      const saved = localStorage.getItem(`lpaMasteredQuestions_${lang}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const [checkedItems, setCheckedItems] = useState(() => getInitialChecked(language));
  const [masteredQuestions, setMasteredQuestions] = useState(() => getInitialMastered(language));

  // Sync state whenever the language prop changes
  useEffect(() => {
    setCheckedItems(getInitialChecked(language));
    setMasteredQuestions(getInitialMastered(language));
    setSearchQuery('');
    setSelectedLevel('All');
    setSelectedCategory('All');
    setRevealedAnswers({});
  }, [language]);

  useEffect(() => {
    localStorage.setItem(`lpaCheckedChecklist_${language}`, JSON.stringify(checkedItems));
  }, [checkedItems, language]);

  useEffect(() => {
    localStorage.setItem(`lpaMasteredQuestions_${language}`, JSON.stringify(masteredQuestions));
  }, [masteredQuestions, language]);

  const toggleAnswer = (id) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecklist = (qId, index) => {
    const key = `${qId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMastered = (id) => {
    setMasteredQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['All', ...new Set(lpaQuestions.map(q => q.category))];
  const levels = ['All', 'Basic', 'Intermediate', 'Advanced', 'Expert'];

  const filteredQuestions = lpaQuestions.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.companies && q.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All' || q.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Calculate readiness metrics
  const totalQuestions = lpaQuestions.length;
  const totalMastered = Object.values(masteredQuestions).filter(Boolean).length;
  
  let totalChecklistItemsCount = 0;
  let checkedChecklistItemsCount = 0;
  lpaQuestions.forEach(q => {
    if (q.checklist) {
      totalChecklistItemsCount += q.checklist.length;
      q.checklist.forEach((_, idx) => {
        if (checkedItems[`${q.id}-${idx}`]) {
          checkedChecklistItemsCount++;
        }
      });
    }
  });

  const masteredWeight = totalQuestions > 0 ? (totalMastered / totalQuestions) * 60 : 0;
  const checklistWeight = totalChecklistItemsCount > 0 ? (checkedChecklistItemsCount / totalChecklistItemsCount) * 40 : 0;
  const readinessPercentage = Math.round(masteredWeight + checklistWeight);

  return (
    <div className="lpa-prep-container" style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* dynamic Language selector Tab Bar */}
      <div 
        style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          marginBottom: '8px'
        }}
      >
        {[
          { id: 'java', label: '☕ Java Backend', count: javaQuestions.length },
          { id: 'react', label: '⚛️ React Frontend', count: reactQuestions.length },
          { id: 'nextjs', label: '⚡ Next.js App Router', count: nextjsQuestions.length }
        ].map((tab) => {
          const isActive = language === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(`/lpa/${tab.id}`)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                backgroundColor: isActive ? 'var(--accent-color)' : 'var(--card-bg)',
                color: isActive ? '#ffffff' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
              <span 
                style={{ 
                  fontSize: '11px', 
                  padding: '2px 6px', 
                  borderRadius: '12px', 
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--border-color)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Header Dashboard Card */}
      <LPADashboardCard 
        totalMastered={totalMastered}
        totalQuestions={totalQuestions}
        checkedChecklistItemsCount={checkedChecklistItemsCount}
        totalChecklistItemsCount={totalChecklistItemsCount}
        readinessPercentage={readinessPercentage}
      />

      {/* Filters Bar */}
      <LPAFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        levels={levels}
      />

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredQuestions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed var(--border-color)', borderRadius: '10px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontStyle: 'italic' }}>
              No matches found for your filter criteria. Try clearing the search.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <LPAQuestionCard 
              key={q.id}
              q={q}
              isRevealed={!!revealedAnswers[q.id]}
              isMastered={!!masteredQuestions[q.id]}
              onToggleAnswer={() => toggleAnswer(q.id)}
              onToggleMastered={() => toggleMastered(q.id)}
              checkedItems={checkedItems}
              onToggleChecklist={(idx) => toggleChecklist(q.id, idx)}
            />
          ))
        )}
      </div>
    </div>
  );
}
