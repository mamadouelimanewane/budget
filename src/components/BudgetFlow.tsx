import React from 'react';

interface FlowNode {
  label: string;
  value: string;
  color: string;
}

interface BudgetFlowProps {
  sources: FlowNode[];
  destinations: FlowNode[];
}

const BudgetFlow: React.FC<BudgetFlowProps> = ({ sources, destinations }) => {
  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulseGlow 2s infinite' }}></div>
        Flux Dynamique des Fonds (Bi-directionnel)
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr 100px 1fr', alignItems: 'center', gap: '1rem' }}>
        
        {/* SOURCES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sources.map((src, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${src.color}44` }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Source</div>
              <div style={{ fontWeight: 600 }}>{src.label}</div>
              <div style={{ color: src.color, fontSize: '0.9rem' }}>{src.value} FCFA</div>
            </div>
          ))}
        </div>

        {/* CONNECTORS 1 */}
        <svg style={{ height: '300px', width: '100px' }}>
          {sources.map((_, i) => (
            <path 
              key={i}
              d={`M 0,${80 + i * 100} C 50,${80 + i * 100} 50,150 100,150`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="5,5"
              style={{ opacity: 0.3 }}>
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
            </path>
          ))}
        </svg>

        {/* CENTER HUB */}
        <div style={{ 
          height: '120px', 
          width: '120px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
          margin: '0 auto',
          zIndex: 2
        }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>BUDGET GLOBAL</span>
          <span style={{ fontSize: '1.1rem', color: 'white', fontWeight: 700 }}>EXÉCUTÉ</span>
        </div>

        {/* CONNECTORS 2 */}
        <svg style={{ height: '300px', width: '100px' }}>
          {destinations.map((_, i) => (
            <path 
              key={i}
              d={`M 0,150 C 50,150 50,${60 + i * 60} 100,${60 + i * 60}`}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeDasharray="5,5"
              style={{ opacity: 0.3 }}>
              <animate attributeName="stroke-dashoffset" from="0" to="100" dur="5s" repeatCount="indefinite" />
            </path>
          ))}
        </svg>

        {/* DESTINATIONS (Modules/Types) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {destinations.map((dst, i) => (
            <div key={i} className="glass-panel" style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${dst.color}44` }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ligne / Poste</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{dst.label}</div>
              <div style={{ color: dst.color, fontSize: '0.85rem' }}>{dst.value} FCFA</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}</style>
    </div>
  );
};

export default BudgetFlow;
