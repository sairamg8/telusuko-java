import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Dashboard from '../components/Dashboard';

export default function DashboardView({
  theme,
  setTheme,
  fontSize,
  setFontSize
}) {
  const navigate = useNavigate();

  return (
    <div className={`app-container theme-${theme}`} style={{ gridTemplateColumns: '1fr' }}>
      <main className="main-content" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopBar 
          viewMode="book"
          setViewMode={(mode) => mode === 'lpa' ? navigate('/lpa') : navigate('/')}
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Dashboard onSelectLanguage={(lang) => navigate(`/${lang}/1`)} />
        </div>
      </main>
    </div>
  );
}
