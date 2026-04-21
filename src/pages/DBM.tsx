import React, { useState } from 'react';
import { Repeat, Plus, CheckCircle, Search, Filter } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import Modal from '../components/Modal';

const DBMPage: React.FC = () => {
  const { dbms, budgetLines, addDBM, approveDBM } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [motif, setMotif] = useState('');
  const [sourceLine, setSourceLine] = useState('');
  const [targetLine, setTargetLine] = useState('');
  const [amt, setAmt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motif || !sourceLine || !targetLine || !amt) return;
    addDBM({
      motif,
      sourceLine,
      targetLine,
      amt: parseInt(amt, 10),
    });
    setIsModalOpen(false);
    setMotif(''); setAmt(''); setSourceLine(''); setTargetLine('');
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Décisions Budgétaires Modificatives (DBM)</h1>
          <p>Réaffectations partielles ou totales avec contrôle strict</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Nouvelle DBM</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '60%', marginBottom: '1.5rem' }}>
          <div className="header-search" style={{ width: '100%' }}>
            <Search size={18} />
            <input type="text" placeholder="Rechercher une DBM..." />
          </div>
          <button className="btn btn-icon" onClick={() => alert("Filtres DBM appliqués.")} title="Filtrer">
            <Filter size={18} />
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Motif</th>
                <th>Ligne Source (-)</th>
                <th>Ligne Cible (+)</th>
                <th>Montant Transfert</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dbms.map((dbm) => (
                <tr key={dbm.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{dbm.id}</td>
                  <td style={{ fontWeight: 500 }}>{dbm.motif}</td>
                  <td style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{dbm.sourceLine}</td>
                  <td style={{ color: 'var(--success)', fontSize: '0.9rem' }}>{dbm.targetLine}</td>
                  <td className="td-amount">{(dbm.amt).toLocaleString()} FCFA</td>
                  <td>
                    {dbm.stat === 'pending' ? (
                       <span className="status-badge status-pending">En Attente Validation</span>
                    ) : (
                       <span className="status-badge status-completed">Validée & Appliquée</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {dbm.stat === 'pending' && (
                        <button className="btn-icon" style={{ color: 'var(--success)' }} onClick={() => approveDBM(dbm.id)} title="Approuver DBM">
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {dbms.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', opacity: 0.5 }}>Aucune DBM trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Proposer une DBM">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Justification / Motif</label>
            <input type="text" value={motif} onChange={e => setMotif(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Diminution sur (Ligne Source)</label>
            <select value={sourceLine} onChange={e => setSourceLine(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
              <option value="" disabled>Sélectionner la source...</option>
              {budgetLines.map(v => <option key={v.id} value={`${v.ref} - ${v.desc}`}>{`${v.ref} - ${v.desc}`}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Augmentation sur (Ligne Cible)</label>
            <select value={targetLine} onChange={e => setTargetLine(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
              <option value="" disabled>Sélectionner la cible...</option>
              {budgetLines.map(v => <option key={v.id} value={`${v.ref} - ${v.desc}`}>{`${v.ref} - ${v.desc}`}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Montant Transféré (FCFA)</label>
            <input type="number" value={amt} onChange={e => setAmt(e.target.value)} required min={1} style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
          </div>
          <button onClick={() => alert('DBM soumise au circuit d\'approbation.')} type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Créer la DBM</button>
        </form>
      </Modal>
    </div>
  );
};

export default DBMPage;
