import React from 'react';

interface ExtendedModulePlaceholderProps {
  title: string;
  desc: string;
  icon: string;
}

const ExtendedModulePlaceholder: React.FC<ExtendedModulePlaceholderProps> = ({ title, desc, icon }) => {
  return (
    <div className="dashboard-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
      <div className="ai-icon-wrapper" style={{ width: '80px', height: '80px', marginBottom: '1.5rem', animation: 'none', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
      </div>
      <h2>{title}</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center', maxWidth: '500px' }}>
        {desc}
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', width: '200px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Statut API</div>
          <div style={{ color: 'var(--success)', fontWeight: 600, marginTop: '0.5rem' }}>✓ Connecté</div>
        </div>
        <div className="glass-panel" style={{ padding: '1rem', width: '200px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avancement</div>
          <div style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem' }}>UI Encadrée</div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedModulePlaceholder;
