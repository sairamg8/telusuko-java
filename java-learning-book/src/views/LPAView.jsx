import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import LPAPrepSection from '../components/LPAPrepSection';

export default function LPAView({
  theme,
  setTheme,
  fontSize,
  setFontSize
}) {
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLanguage = lang === 'react' || lang === 'nextjs' ? lang : 'java';

  return (
    <div className={`app-container theme-${theme}`} style={{ gridTemplateColumns: '1fr' }}>
      <main className="main-content" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopBar 
          viewMode="lpa"
          setViewMode={(mode) => mode === 'book' ? navigate(`/${currentLanguage}/1`) : navigate(`/lpa/${currentLanguage}`)}
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <LPAPrepSection language={currentLanguage} />
        </div>
      </main>
    </div>
  );
}
