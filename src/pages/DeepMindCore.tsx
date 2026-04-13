import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Zap, Activity, ShieldAlert, CheckCircle, Play, BarChart3, HelpCircle } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const DeepMindCore: React.FC = () => {
  const { deepMind, runDeepMindOptimization, t } = useBudget();
  const [pulse, setPulse] = useState(90);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => Math.min(100, Math.max(80, prev + (Math.random() * 4 - 2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-view animate-fade-in" style={{ padding: '2rem' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '8px', boxShadow: '0 0 15px var(--primary)' }}>
               <Brain size={24} color="white" />
            </div>
            <h1 style={{ margin: 0 }}>DeepMind Core <span style={{ opacity: 0.5, fontWeight: 400 }}>v4.0 Singularity</span></h1>
          </div>
          <p>Moteur d'arbitrage autonome par Apprentissage par Renforcement (AlphaBudget).</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cohérence Neuronale</div>
              <div style={{ fontWeight: 700, color: 'var(--success)' }}>{pulse.toFixed(1)}%</div>
           </div>
           <div style={{ width: '60px', height: '30px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ 
                  width: '6px', 
                  height: `${Math.random() * 100}%`, 
                  background: 'var(--success)', 
                  borderRadius: '2px',
                  transition: '0.5s' 
                }} />
              ))}
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* ALPHA BUDGET AGENT */}
        <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.1 }}>
              <Cpu size={120} />
           </div>

           <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Activity size={20} color="var(--primary)" /> AlphaBudget : Agent de Renforcement
           </h3>

           <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                L'agent explore actuellement {deepMind.status === 'optimizing' ? 'les futurs possibles...' : 'l\'équilibre budgétaire optimal.'}
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                 <div style={{ 
                   height: '100%', 
                   width: deepMind.status === 'optimizing' ? '100%' : '0%', 
                   background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                   transition: deepMind.status === 'optimizing' ? '4s linear' : '0s'
                 }} />
              </div>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px solid var(--primary)33' }}>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gain d'Efficacité</div>
                 <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>+{deepMind.projectedEfficiency}%</div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dernier Cycle</div>
                 <div style={{ fontSize: '1rem', fontWeight: 600 }}>{deepMind.lastRun}</div>
              </div>
           </div>

           <button 
             className="btn btn-primary" 
             style={{ width: '100%', padding: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}
             onClick={runDeepMindOptimization}
             disabled={deepMind.status === 'optimizing'}
           >
             {deepMind.status === 'optimizing' ? <Zap className="animate-pulse" /> : <Play />}
             {deepMind.status === 'optimizing' ? 'OPTIMISATION NEURONALE...' : 'LANCER ALPHA-STRATÉGIE'}
           </button>
        </div>

        {/* AUTONOMOUS RECOMMENDATIONS */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
           <h3 style={{ marginBottom: '1.5rem' }}>Préconisations du Cerveau</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {deepMind.recommendations.map((rec, i) => (
                <div key={i} style={{ 
                  padding: '1.25rem', 
                  background: 'rgba(16, 185, 129, 0.05)', 
                  borderLeft: '4px solid var(--success)', 
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{rec}</div>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Générer DBM</button>
                </div>
              ))}

              <div style={{ 
                  padding: '1.25rem', 
                  background: 'rgba(139, 92, 246, 0.05)', 
                  borderLeft: '4px solid var(--secondary)', 
                  borderRadius: '4px'
              }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={16} /> Audit d'Intention (Neural)
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Alerte : Pattern d'arbitrage atypique détecté sur le projet "Solaire". L'IA suggère une vérification de la conformité avec la convention cadre.
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
         <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>2.4M</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scénarios Explorés</div>
         </div>
         <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8ms</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Temps d'Inférence</div>
         </div>
         <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Grade S</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Résilience Budgétaire</div>
         </div>
         <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Active</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Autonomie Stratégique</div>
         </div>
      </div>
    </div>
  );
};

export default DeepMindCore;
