import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { chapters as javaChapters } from '../data/concepts';
import { reactChapters } from '../data/reactChapters';
import TableOfContents from '../components/TableOfContents';
import BookReader from '../components/BookReader';
import GotchaSection from '../components/GotchaSection';
import HatersCorner from '../components/HatersCorner';
import InterviewPrep from '../components/InterviewPrep';
import TopBar from '../components/TopBar';

import JVMVisualizer from '../components/Visualizers/JVMVisualizer';
import MemoryVisualizer from '../components/Visualizers/MemoryVisualizer';
import StringPoolVisualizer from '../components/Visualizers/StringPoolVisualizer';
import DispatchVisualizer from '../components/Visualizers/DispatchVisualizer';
import ExceptionVisualizer from '../components/Visualizers/ExceptionVisualizer';
import { Activity, Eye, HelpCircle } from 'lucide-react';

export default function StudyView({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  completedConcepts,
  onToggleRead
}) {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Resolve pathway (java or react)
  const currentLanguage = pathname.startsWith('/react') ? 'react' : 'java';
  const chapters = currentLanguage === 'react' ? reactChapters : javaChapters;
  const allConcepts = chapters.reduce((acc, curr) => [...acc, ...curr.concepts], []);

  // Locate current concept
  const activeId = conceptId ? parseInt(conceptId, 10) : allConcepts[0]?.id;
  const currentConcept = allConcepts.find(c => c.id === activeId) || allConcepts[0];

  const hasVisualizer = currentConcept && ['jvm', 'memory', 'string-pool', 'dispatch', 'exception'].includes(currentConcept.visualizerType);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(() => currentLanguage === 'react' || !hasVisualizer ? 'gotchas' : 'visualizer');

  // Sync activeTab when switching pathways
  React.useEffect(() => {
    if (currentLanguage === 'react') {
      setActiveTab('gotchas');
    } else {
      setActiveTab('visualizer');
    }
  }, [currentLanguage]);

  // Sync activeTab when switching concepts within Java
  React.useEffect(() => {
    if (currentLanguage !== 'react' && !hasVisualizer && activeTab === 'visualizer') {
      setActiveTab('gotchas');
    }
  }, [currentConcept, hasVisualizer, currentLanguage, activeTab]);

  // Navigations
  const handlePrev = () => {
    const idx = allConcepts.findIndex(c => c.id === currentConcept.id);
    if (idx > 0) {
      navigate(`/${currentLanguage}/${allConcepts[idx - 1].id}`);
    }
  };

  const handleNext = () => {
    // Automatically mark the current concept as read when moving forward
    if (!completedConcepts.includes(`${currentLanguage}_${currentConcept.id}`)) {
      onToggleRead(`${currentLanguage}_${currentConcept.id}`);
    }
    const idx = allConcepts.findIndex(c => c.id === currentConcept.id);
    if (idx < allConcepts.length - 1) {
      navigate(`/${currentLanguage}/${allConcepts[idx + 1].id}`);
    }
  };

  const hasPrev = allConcepts.findIndex(c => c.id === currentConcept?.id) > 0;
  const hasNext = allConcepts.findIndex(c => c.id === currentConcept?.id) < allConcepts.length - 1;

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

  if (!currentConcept) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        No concepts loaded for this pathway. Click <button className="btn" onClick={() => navigate('/')}>Home</button> to choose another.
      </div>
    );
  }

  return (
    <div className={`app-container theme-${theme}`}>
      {/* Left Sidebar: Index & Search */}
      <TableOfContents
        chapters={chapters}
        currentConcept={currentConcept}
        onSelectConcept={(c) => navigate(`/${currentLanguage}/${c.id}`)}
        completedConcepts={completedConcepts}
        onToggleRead={onToggleRead}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentLanguage={currentLanguage}
        onBackToDashboard={() => navigate('/')}
      />

      {/* Main Workspace */}
      <main className="main-content">
        <TopBar 
          viewMode="book"
          setViewMode={(mode) => mode === 'lpa' ? navigate(`/lpa/${currentLanguage}`) : navigate('/')}
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />

        {/* Workspace Body */}
        <div className="workspace-body">
          {/* Left panel: Book reading page */}
          <BookReader
            concept={currentConcept}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
            fontSize={fontSize}
            totalConcepts={allConcepts.length}
          />

          {/* Right panel: Companion Side Panel */}
          <div className="side-panel">
            <div className="panel-tabs">
              {currentLanguage !== 'react' && hasVisualizer && (
                <button
                  className={`panel-tab ${activeTab === 'visualizer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('visualizer')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Activity size={14} />
                    <span>Visualizer</span>
                  </div>
                </button>
              )}
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
              {activeTab === 'visualizer' && currentLanguage !== 'react' && renderVisualizer()}
              {activeTab === 'gotchas' && <GotchaSection concept={currentConcept} />}
              {activeTab === 'quiz' && (
                <InterviewPrep
                  currentConcept={currentConcept}
                  completedConcepts={completedConcepts}
                  chapters={chapters}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
