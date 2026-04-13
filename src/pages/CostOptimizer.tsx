import React from 'react';
import { Target, Zap, TrendingDown, CheckCircle, BarChart, Info, DollarSign } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const CostOptimizer: React.FC = () => {
  const { costRecommendations, t } = useBudget();

  const totalPotentialSavings = costRecommendations.reduce((acc, curr) => acc + curr.potentialSaving, 0);

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Cost-Killer IA : Optimisation de la Performance</h1>
          <p>L'intelligence artificielle analyse vos dépenses récurrentes et suggère des axes d'économie immédiats.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="kpi-card glass-panel" style={{ borderBottom: '4px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
           <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}>
             <DollarSign size={32} />
           </div>
           <div>
             <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Potentiel d'Économie Annuel</div>
             <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{totalPotentialSavings.toLocaleString()} FCFA</div>
           </div>
        </div>
        <div className="kpi-card glass-panel" style={{ borderBottom: '4px solid var(--success)', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
           <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--success)' }}>
             <CheckCircle size={32} />
           </div>
           <div>
             <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Actions Recommandées</div>
             <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{costRecommendations.length}</div>
           </div>
        </div>
        <div className="kpi-card glass-panel" style={{ borderBottom: '4px solid var(--secondary)', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
           <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--secondary)' }}>
             <TrendingDown size={32} />
           </div>
           <div>
             <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Réduction de Charges Projetée</div>
             <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>-12.4%</div>
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} color="var(--primary)" /> Opportunités d'Optimisation (Algorithme de Benchmark)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {costRecommendations.map(rec => (
            <div key={rec.id} style={{ 
              padding: '1.5rem', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: '0.3s'
            }} className="hover-scale">
               <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                 <div style={{ 
                   width: '48px', height: '48px', borderRadius: '8px', 
                   background: rec.impact === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   color: rec.impact === 'high' ? 'var(--danger)' : 'var(--primary)'
                 }}>
                   <Zap size={24} />
                 </div>
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{rec.category}</span>
                     <span className="kpi-badge" style={{ 
                       fontSize: '0.7rem', 
                       background: rec.impact === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                       color: rec.impact === 'high' ? 'var(--danger)' : 'var(--success)'
                     }}>
                       Impact {rec.impact === 'high' ? 'Élevé' : 'Modéré'}
                     </span>
                   </div>
                   <div style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>{rec.desc}</div>
                 </div>
               </div>

               <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                 <div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Économie Estimée</div>
                   <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--success)' }}>-{rec.potentialSaving.toLocaleString()} FCFA</div>
                 </div>
                 <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Appliquer le Plan
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)33', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <Info size={24} color="var(--success)" style={{ marginTop: '0.25rem' }} />
        <div>
          <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Note de la DSI / DAF</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Les calculs d'optimisation sont basés sur les données d'historique de consommation des 3 dernières années et comparés aux grilles tarifaires en vigueur chez les fournisseurs référencés. Tout changement de contrat via le Cost-Killer générera automatiquement une DBM (Décision Budgétaire Modificative) pour réallouer les surplus vers l'investissement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostOptimizer;
