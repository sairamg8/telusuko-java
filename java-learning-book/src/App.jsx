import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import StudyView from './views/StudyView';
import LPAView from './views/LPAView';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'sepia');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize'), 10) || 18);
  const [completedConcepts, setCompletedConcepts] = useState(() => {
    try {
      const saved = localStorage.getItem('completedConcepts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('completedConcepts', JSON.stringify(completedConcepts));
  }, [completedConcepts]);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleToggleRead = (id) => {
    setCompletedConcepts(prev => {
      if (prev.includes(id)) {
        return prev.filter(cId => cId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <DashboardView 
              theme={theme} 
              setTheme={setTheme} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
            />
          } 
        />
        <Route 
          path="/lpa" 
          element={<Navigate to="/lpa/java" replace />} 
        />
        <Route 
          path="/lpa/:lang" 
          element={
            <LPAView 
              theme={theme} 
              setTheme={setTheme} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
            />
          } 
        />
        <Route 
          path="/java" 
          element={<Navigate to="/java/1" replace />} 
        />
        <Route 
          path="/java/:conceptId" 
          element={
            <StudyView 
              theme={theme} 
              setTheme={setTheme} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
              completedConcepts={completedConcepts}
              onToggleRead={handleToggleRead}
            />
          } 
        />
        <Route 
          path="/react" 
          element={<Navigate to="/react/1" replace />} 
        />
        <Route 
          path="/react/:conceptId" 
          element={
            <StudyView 
              theme={theme} 
              setTheme={setTheme} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
              completedConcepts={completedConcepts}
              onToggleRead={handleToggleRead}
            />
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}
