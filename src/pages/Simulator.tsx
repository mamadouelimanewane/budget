import React, { useState } from 'react';
import { Play, Save, Trash2, TrendingUp, TrendingDown, Info, LineChart } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Simulator: React.FC = () => {
  const { budgetLines, engagements, scenarios, addScenario, deleteScenario } = useBudget();
  const [expenseFactor, setExpenseFactor] = useState(1);
  const [revenueFactor, setRevenueFactor] = useState(1);
  const [scenarioName, setScenarioName] = useState('');

  const totalAllocated = budgetLines.reduce((acc, curr) => acc + curr.n1, 0);
  const simulatedTotal = totalAllocated * expenseFactor;
  const gap = simulatedTotal - totalAllocated;

  const handleSave = () => {
    if (!scenarioName) return;
    addScenario(scenarioName, { expenses: expenseFactor, revenues: revenueFactor });
    setScenarioName('');
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Le Lab : Simulation Stratégique</h1>
          <p>Modélisez des scénarios économiques (inflation, baisse de subventions) sans affecter le budget réel.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* CONTROL PANEL */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LineChart size={20} color="var(--primary)" /> Paramètres de Simulation
          </h3>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Multiplicateur de Dépenses (Inflation/Activité)</label>
              <span style={{ fontWeight: 700, color: expenseFactor > 1 ? 'var(--danger)' : 'var(--success)' }}>
                {Math.round((expenseFactor - 1) * 100)}%
              </span>
            </div>
            <input 
              type="range" min="0.5" max="2" step="0.05" 
              value={expenseFactor} 
              onChange={(e) => setExpenseFactor(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Multiplicateur de Recettes (Bailleurs/Ventes)</label>
              <span style={{ fontWeight: 700, color: revenueFactor < 1 ? 'var(--danger)' : 'var(--success)' }}>
                {Math.round((revenueFactor - 1) * 100)}%
              </span>
            </div>
            <input 
              type="range" min="0.5" max="2" step="0.05" 
              value={revenueFactor} 
              onChange={(e) => setRevenueFactor(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)' }}
            />
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
             <h4 style={{ marginBottom: '1rem' }}>Impact du Scénario</h4>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
               <span>Budget Réel :</span>
               <span style={{ fontWeight: 600 }}>{totalAllocated.toLocaleString()} FCFA</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
               <span>Budget Simulé :</span>
               <span style={{ fontWeight: 600, color: gap > 0 ? 'var(--danger)' : 'var(--success)' }}>{simulatedTotal.toLocaleString()} FCFA</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
               <span>Écart :</span>
               <span style={{ fontWeight: 700 }}>{gap > 0 ? '+' : ''}{gap.toLocaleString()} FCFA</span>
             </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" placeholder="Nommez cette variante..." 
              value={scenarioName} onChange={e => setScenarioName(e.target.value)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white' }}
            />
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={18} /> Sauvegarder
            </button>
          </div>
        </div>

        {/* SAVED SCENARIOS */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Archives de Simulation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {scenarios.map(scn => (
               <div key={scn.id} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{scn.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Créé le {scn.date} • {scn.adjustments.expenses ? `Dépenses: x${scn.adjustments.expenses}` : ''} {scn.adjustments.revenues ? `Recettes: x${scn.adjustments.revenues}` : ''}
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-icon" style={{ background: 'var(--primary-light)' }}><Play size={16} /></button>
                    <button className="btn btn-icon" onClick={() => deleteScenario(scn.id)} style={{ color: 'var(--danger)' }}><Trash2 size={16} /></button>
                 </div>
               </div>
             ))}
             {scenarios.length === 0 && (
               <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.3 }}>
                 <Info size={40} style={{ marginBottom: '1rem' }} />
                 <p>Aucun scénario sauvegardé.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
