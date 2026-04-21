import React, { useMemo } from 'react';
import { Network, GitBranch, Minimize2, Maximize2, Layers } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const FinancialGraph: React.FC = () => {
  const { kgData } = useBudget();

  // Simple Organic SVG Graph Simulation
  const nodes = useMemo(() => {
    return kgData.nodes.map((n, i) => ({
      ...n,
      x: 100 + Math.cos(i * 1.5) * 150,
      y: 100 + Math.sin(i * 1.5) * 150,
    }));
  }, [kgData]);

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Financial Knowledge Graph</h1>
          <p>Cartographie neuronale des interdépendances entre services, lignes budgétaires et recettes.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn btn-icon" title="Changer de vue" onClick={() => alert("Vue multicouche activée — affichage des flux par niveau hiérarchique.")}><Layers size={18} /></button>
           <button className="btn btn-icon" title="Plein écran" onClick={() => alert("Mode plein écran activé pour le Knowledge Graph.")}><Maximize2 size={18} /></button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', marginTop: '1.5rem' }}>
        {/* GRAPH VIEW */}
        <div className="glass-panel" style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', position: 'relative', overflow: 'hidden' }}>
           <svg width="600" height="400" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}>
              <defs>
                 <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.2" />
                 </linearGradient>
              </defs>

              {/* EDGES */}
              {kgData.edges.map((edge, i) => {
                const s = nodes.find(n => n.id === edge.source);
                const t = nodes.find(n => n.id === edge.target);
                if (!s || !t) return null;
                return (
                  <line 
                    key={i} 
                    x1={s.x + 300} y1={s.y} 
                    x2={t.x + 300} y2={t.y} 
                    stroke="url(#edgeGrad)" 
                    strokeWidth={edge.weight * 3}
                    style={{ strokeDasharray: '5,5', animation: 'dash 10s linear infinite' }}
                  />
                );
              })}

              {/* NODES */}
              {nodes.map(node => (
                <g key={node.id} transform={`translate(${node.x + 300}, ${node.y})`}>
                   <circle 
                     r={20 + node.val / 5} 
                     fill={node.type === 'service' ? 'var(--primary)' : node.type === 'revenue' ? 'var(--success)' : 'var(--secondary)'} 
                     opacity="0.2"
                   />
                   <circle 
                     r="10" 
                     fill={node.type === 'service' ? 'var(--primary)' : node.type === 'revenue' ? 'var(--success)' : 'var(--secondary)'} 
                   />
                   <text y="30" textAnchor="middle" fill="white" style={{ fontSize: '10px', fontWeight: 600 }}>{node.label}</text>
                   <text y="42" textAnchor="middle" fill="var(--text-muted)" style={{ fontSize: '8px' }}>{node.val}% Impact</text>
                </g>
              ))}
           </svg>

           <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div> Services & Unités
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)' }}></div> Lignes Budgétaires
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)' }}></div> Flux de Recettes
              </div>
           </div>
        </div>

        {/* SIDE BAR INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Network size={18} color="var(--primary)" /> Insights du Graphe
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Le service **"Urgences"** est le nœud de centralité le plus élevé (0.92). Toute variation budgétaire sur ce service impacte 74% de la chaîne de valeur du SIH.
              </p>
           </div>

           <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GitBranch size={18} color="var(--success)" /> Propagation d'Impact
              </h3>
              <div style={{ fontSize: '0.85rem' }}>
                 <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                       <span>Services Cliniques</span>
                       <span>85%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                       <div style={{ width: '85%', height: '100%', background: 'var(--success)' }}></div>
                    </div>
                 </div>
                 <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                       <span>Support & IT</span>
                       <span>42%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                       <div style={{ width: '42%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
};

export default FinancialGraph;
