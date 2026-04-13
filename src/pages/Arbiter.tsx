import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Arbiter: React.FC = () => {
  const { engagements } = useBudget();
  const [matching, setMatching] = useState(false);
  const [reconciled, setReconciled] = useState(false);
  
  // Mock statement data
  const [statement] = useState([
    { id: 'TX-9901', date: '12/04/2026', desc: 'VRT ORACLE FRANCE', amt: 25000000, status: 'pending' },
    { id: 'TX-9902', date: '11/04/2026', desc: 'SENELEC FACT 0426', amt: 4500000, status: 'pending' },
    { id: 'TX-9903', date: '10/04/2026', desc: 'CASH WITHDRAWAL DG', amt: 150000, status: 'pending' }
  ]);

  const handleMatch = () => {
    setMatching(true);
    setTimeout(() => {
      setMatching(false);
      setReconciled(true);
    }, 2500);
  };

  const getMatch = (amt: number) => {
    return engagements.find(e => e.amt === amt);
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>L'Arbiter : Réconciliation IA</h1>
          <p>Comparaison automatisée entre les relevés bancaires/Trésor et les engagements budgétaires.</p>
        </div>
        <button className="btn btn-primary" onClick={handleMatch} disabled={matching}>
          {matching ? <RefreshCw className="animate-spin" size={18} /> : <Layers size={18} />}
          {matching ? 'Analyse IA en cours...' : 'Lancer la Réconciliation'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* BANK SIDE */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={18} color="var(--primary)" /> Relevé Bancaire (ID: STMT-2026-04)
          </h3>
          <div className="table-container">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Libellé</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {statement.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td style={{ fontSize: '0.85rem' }}>{tx.desc}</td>
                    <td style={{ fontWeight: 600 }}>{tx.amt.toLocaleString()} FCFA</td>
                    <td>
                      {reconciled && getMatch(tx.amt) ? (
                        <span className="kpi-badge positive">Match IA</span>
                      ) : reconciled ? (
                        <span className="kpi-badge negative">Orphelin</span>
                      ) : (
                        <span className="kpi-badge warning">Attente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BUDGET SIDE MATCHES */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.02)' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Résultats de l'Appariement</h3>
          {!reconciled && !matching && (
            <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
              <RefreshCw size={48} style={{ marginBottom: '1rem' }} />
              <p>Cliquez sur "Lancer" pour apparier les flux.</p>
            </div>
          )}
          {reconciled && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {statement.map(tx => {
                 const match = getMatch(tx.amt);
                 return (
                   <div key={tx.id} style={{ 
                     padding: '1rem', 
                     borderRadius: '8px', 
                     border: `1px solid ${match ? 'var(--success)' : 'var(--danger)'}`,
                     background: match ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center'
                   }}>
                     <div style={{ flex: 1 }}>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.id} - {tx.desc}</div>
                       <div style={{ fontWeight: 600 }}>{tx.amt.toLocaleString()} FCFA</div>
                     </div>
                     <ArrowRight size={20} color={match ? 'var(--success)' : 'var(--danger)'} />
                     <div style={{ flex: 1, textAlign: 'right' }}>
                       {match ? (
                         <>
                           <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>{match.id} (Match 100%)</div>
                           <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{match.obj}</div>
                         </>
                       ) : (
                         <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>Aucun engagement correspondant</div>
                       )}
                     </div>
                   </div>
                 );
               })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arbiter;
