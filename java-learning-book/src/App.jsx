import React, { useState, useEffect } from 'react';
import TableOfContents from './components/TableOfContents';
import BookReader from './components/BookReader';
import GotchaSection from './components/GotchaSection';
import HatersCorner from './components/HatersCorner';
import InterviewPrep from './components/InterviewPrep';

import JVMVisualizer from './components/Visualizers/JVMVisualizer';
import MemoryVisualizer from './components/Visualizers/MemoryVisualizer';
import StringPoolVisualizer from './components/Visualizers/StringPoolVisualizer';
import DispatchVisualizer from './components/Visualizers/DispatchVisualizer';
import ExceptionVisualizer from './components/Visualizers/ExceptionVisualizer';

import { chapters } from './data/concepts';
import { Eye, HelpCircle, Activity, HeartCrack } from 'lucide-react';

// Flatten concepts list for easier index lookups
const allConcepts = chapters.reduce((acc, curr) => [...acc, ...curr.concepts], []);

export default function App() {
  // Global reading settings
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'sepia');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize')) || 18);
  const [currentConcept, setCurrentConcept] = useState(allConcepts[0]);
  const [completedConcepts, setCompletedConcepts] = useState(() => {
    try {
      const saved = localStorage.getItem('completedConcepts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('visualizer');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist states
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('completedConcepts', JSON.stringify(completedConcepts));
  }, [completedConcepts]);

  // Adjust theme on body for desktop backdrop synchronization
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Handle read toggles
  const handleToggleRead = (id) => {
    setCompletedConcepts(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Navigations
  const handlePrev = () => {
    const idx = allConcepts.findIndex(c => c.id === currentConcept.id);
    if (idx > 0) {
      setCurrentConcept(allConcepts[idx - 1]);
    }
  };

  const handleNext = () => {
    // Automatically mark the current concept as read when moving to the next page
    if (!completedConcepts.includes(currentConcept.id)) {
      setCompletedConcepts(prev => [...prev, currentConcept.id]);
    }
    const idx = allConcepts.findIndex(c => c.id === currentConcept.id);
    if (idx < allConcepts.length - 1) {
      setCurrentConcept(allConcepts[idx + 1]);
    }
  };

  const hasPrev = allConcepts.findIndex(c => c.id === currentConcept.id) > 0;
  const hasNext = allConcepts.findIndex(c => c.id === currentConcept.id) < allConcepts.length - 1;

  // Render Visualizer depending on metadata
  const renderVisualizer = () => {
    if (!currentConcept) return null;
    switch (currentConcept.visualizerType) {
      case 'jvm':
        return <JVMVisualizer code={currentConcept.code} />;
      case 'memory':
        return <MemoryVisualizer />;
      case 'string-pool':
        return <StringPoolVisualizer />;
      case 'dispatch':
        return <DispatchVisualizer />;
      case 'exception':
        return <ExceptionVisualizer />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            No interactive visualization for this concept. Explore the Code block or view other tabs!
          </div>
        );
    }
  };

  return (
    <div className={`app-container theme-${theme}`}>
      {/* Left Sidebar: Index & Search */}
      <TableOfContents
        chapters={chapters}
        currentConcept={currentConcept}
        onSelectConcept={setCurrentConcept}
        completedConcepts={completedConcepts}
        onToggleRead={handleToggleRead}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Workspace split */}
      <main className="main-content">
        {/* Top Control Bar */}
        <div className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Theme:</span>
            <div className="theme-selector">
              <div
                className={`theme-option ${theme === 'sepia' ? 'active' : ''}`}
                onClick={() => setTheme('sepia')}
              >
                Comfort Sepia
              </div>
              <div
                className={`theme-option ${theme === 'charcoal' ? 'active' : ''}`}
                onClick={() => setTheme('charcoal')}
              >
                Charcoal
              </div>
              <div
                className={`theme-option ${theme === 'paper' ? 'active' : ''}`}
                onClick={() => setTheme('paper')}
              >
                Paper Light
              </div>
            </div>
          </div>

          <div className="top-bar-controls">
            {/* Font adjust */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Text Size:</span>
              <div className="font-controls">
                <button
                  className="font-btn"
                  onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <span style={{ fontSize: '12px', fontWeight: 'bold', padding: '0 4px' }}>{fontSize}px</span>
                <button
                  className="font-btn"
                  onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Body (Two Columns: Book Reader + Interactive Tabs) */}
        <div className="workspace-body">
          {/* Left panel: Book reading page */}
          <BookReader
            concept={currentConcept}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
            isRead={completedConcepts.includes(currentConcept?.id)}
            onToggleRead={handleToggleRead}
            fontSize={fontSize}
          />

          {/* Right panel: Companion Side Panel */}
          <div className="side-panel">
            <div className="panel-tabs">
              <button
                className={`panel-tab ${activeTab === 'visualizer' ? 'active' : ''}`}
                onClick={() => setActiveTab('visualizer')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Activity size={14} />
                  <span>Visualizer</span>
                </div>
              </button>
              <button
                className={`panel-tab ${activeTab === 'gotchas' ? 'active' : ''}`}
                onClick={() => setActiveTab('gotchas')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Eye size={14} />
                  <span>Interview Qs</span>
                </div>
              </button>
              <button
                className={`panel-tab ${activeTab === 'therapy' ? 'active' : ''}`}
                onClick={() => setActiveTab('therapy')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <HeartCrack size={14} />
                  <span>Hater's Corner</span>
                </div>
              </button>
              <button
                className={`panel-tab ${activeTab === 'quiz' ? 'active' : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <HelpCircle size={14} />
                  <span>50 LPA Exam</span>
                </div>
              </button>
            </div>

            <div className="panel-content">
              {activeTab === 'visualizer' && renderVisualizer()}
              {activeTab === 'gotchas' && <GotchaSection concept={currentConcept} />}
              {activeTab === 'therapy' && <HatersCorner />}
              {activeTab === 'quiz' && (
                <InterviewPrep
                  currentConcept={currentConcept}
                  completedConcepts={completedConcepts}
                  chapters={chapters}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
