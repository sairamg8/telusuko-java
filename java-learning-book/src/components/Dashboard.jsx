import React from 'react';
import { Award, BookOpen, Terminal, Shield, Database, Layout, Sparkles } from 'lucide-react';

export default function Dashboard({ onSelectLanguage }) {
  const learningPaths = [
    {
      id: 'java',
      title: 'Java Core to Advanced Masterclass',
      conceptsCount: 649,
      chaptersCount: 35,
      level: 'Beginner to Expert',
      desc: 'JVM memory layout, multi-threading JMM, Spring Boot, JPA/Hibernate, Microservices, and Data Structures.',
      icon: <Terminal size={28} color="var(--accent-color)" />,
      badge: 'Completed',
      color: 'var(--accent-color)'
    },
    {
      id: 'react',
      title: 'Modern React JS (React 19 & Next.js)',
      conceptsCount: 166,
      chaptersCount: 12,
      level: 'Intermediate to Expert',
      desc: 'React Server Components (RSC), Async Transitions, Server Actions, useActionState, and Next.js App Router architecture.',
      icon: <Layout size={28} color="#3498db" />,
      badge: 'Completed',
      color: '#3498db'
    },
    {
      id: 'js-ts',
      title: 'JavaScript (ESNext) & TypeScript',
      conceptsCount: 80,
      level: 'All Levels',
      desc: 'Closures, prototype scopes, async event loops, custom typings, interface generics, and strict configurations.',
      icon: <Shield size={28} color="#f1c40f" />,
      badge: 'Blueprint Ready',
      color: '#f1c40f'
    },
    {
      id: 'node',
      title: 'Node.js & Backend Architecture',
      conceptsCount: 100,
      level: 'Advanced',
      desc: 'Asynchronous event loops, cluster load-balancing, file streams, NestJS wrappers, and API security setups.',
      icon: <BookOpen size={28} color="#2ecc71" />,
      badge: 'Coming Soon',
      color: '#2ecc71'
    },
    {
      id: 'databases',
      title: 'Databases: SQL, Postgres & MongoDB',
      conceptsCount: 90,
      level: 'Intermediate to Expert',
      desc: 'Index search optimizations, ACID transaction levels, replication sharding, and aggregation pipelines.',
      icon: <Database size={28} color="#9b59b6" />,
      badge: 'Coming Soon',
      color: '#9b59b6'
    }
  ];

  return (
    <div 
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        overflowY: 'auto',
        height: '100%'
      }}
    >
      {/* Header Dashboard Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1e1e2f 0%, #11111d 100%)',
          color: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: 'var(--shadow)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', opacity: 0.1, pointerEvents: 'none' }}>
          <Sparkles size={200} color="#f1c40f" />
        </div>
        
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: '#f1c40f', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Award size={28} />
          Multi-Language Interview Prep Terminal
        </h1>
        <p style={{ fontSize: '15px', maxWIdth: '700px', margin: '0 auto', opacity: 0.85, lineHeight: '1.6' }}>
          Accelerate your trajectory to 50+ LPA. Toggle dynamically between backend JVM architectures, front-end React 19 execution scopes, and advanced database indexing strategies.
        </p>
      </div>

      {/* Grid Layout */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Available Learning Pathways
        </h2>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {learningPaths.map(path => {
            const isCompleted = path.badge === 'Completed';
            const isBlueprint = path.badge === 'Blueprint Ready';
            const isActive = isCompleted || isBlueprint;

            return (
              <div 
                key={path.id}
                style={{
                  border: `1px solid var(--border-color)`,
                  borderRadius: '12px',
                  backgroundColor: 'var(--card-bg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: 'var(--shadow)',
                  position: 'relative',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: isActive ? 'pointer' : 'default'
                }}
                onMouseOver={(e) => {
                  if (isActive) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (isActive) {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                  }
                }}
                onClick={() => isActive && onSelectLanguage(path.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '8px', 
                        backgroundColor: `${path.color}15`, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {path.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
                        {path.title}
                      </h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {path.conceptsCount} Concepts {path.chaptersCount ? `• ${path.chaptersCount} Chapters` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Badge Tag */}
                  <span 
                    style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      backgroundColor: isCompleted ? 'rgba(39, 174, 96, 0.12)' : isBlueprint ? 'rgba(52, 152, 219, 0.12)' : 'rgba(0, 0, 0, 0.05)',
                      color: isCompleted ? 'var(--success-color)' : isBlueprint ? '#3498db' : 'var(--text-secondary)',
                      border: `1px solid ${isCompleted ? 'rgba(39,174,96,0.3)' : isBlueprint ? 'rgba(52,152,219,0.3)' : 'var(--border-color)'}`,
                      flexShrink: 0
                    }}
                  >
                    {path.badge}
                  </span>
                </div>

                <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary)', flex: 1 }}>
                  {path.desc}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  <span>Difficulty: {path.level}</span>
                  {isActive && (
                    <button
                      className="btn btn-accent"
                      style={{ padding: '6px 12px', fontSize: '11px' }}
                    >
                      {isCompleted ? 'Resume Study' : 'Explore Path'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
