import React, { useState } from 'react';
import { Receipt, FileCheck, Search, Filter, AlertTriangle, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import Modal from '../components/Modal';

const Engagements: React.FC = () => {
  const { engagements, budgetLines, addEngagement, updateEngagementStatus, t, getNextStep, workflowSteps } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Nouveaux engagements state
  const [obj, setObj] = useState('');
  const [amt, setAmt] = useState('');
  const [budg, setBudg] = useState('');
  const [service, setService] = useState('Marketing'); // General default

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obj || !amt || !budg) return;
    addEngagement({
      obj,
      service,
      amt: parseInt(amt, 10),
      budg
    });
    setIsModalOpen(false);
    setObj(''); setAmt(''); setBudg('');
  };

  const getStatusBadge = (eng: Engagement) => {
    if (eng.stat === 'besoin') return <span className="status-badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>Brouillon / Initial</span>;
    if (eng.stat === 'approved') return <span className="status-badge status-completed">Approuvé (FCFA Payé)</span>;
    if (eng.stat === 'rejected') return <span className="status-badge status-rejected">Rejeté</span>;
    
    // Dynamic step badge
    const currentStep = workflowSteps.find(s => s.id === eng.stat);
    return <span className="status-badge status-pending" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
      {currentStep ? `Validé: ${currentStep.label}` : eng.stat}
    </span>;
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>{t('engagement')}</h1>
          <p>Workflow de validation multi-niveaux et contrôle budgétaire</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>{t('exprimer_besoin')}</span>
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))' }}>
          <div className="kpi-header">
            <span className="kpi-title">Crédits Libres globaux</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <FileCheck size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'white', marginTop: '0.5rem' }}>
            {budgetLines.reduce((acc, curr) => acc + curr.n, 0).toLocaleString()} <span style={{ fontSize: '1rem' }}>FCFA</span>
          </div>
        </div>
        
        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))' }}>
          <div className="kpi-header">
            <span className="kpi-title">Dossiers bloqués ou en attente</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'white', marginTop: '0.5rem' }}>
            {engagements.filter(e => e.stat === 'besoin' || e.stat === 'pending').length} Dossiers
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '60%', marginBottom: '1.5rem' }}>
          <div className="header-search" style={{ width: '100%' }}>
            <Search size={18} />
            <input type="text" placeholder="Rechercher par objet, ID ou service..." />
          </div>
          <button className="btn btn-icon">
            <Filter size={18} />
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Objet de la dépense</th>
                <th>Service</th>
                <th>Ligne Imputation</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {engagements.map((eng) => (
                <tr key={eng.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{eng.id}</td>
                  <td style={{ fontWeight: 500 }}>{eng.obj}</td>
                  <td>{eng.service}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{eng.budg}</td>
                  <td className="td-amount">{(eng.amt).toLocaleString()} FCFA</td>
                  <td>
                    {getStatusBadge(eng)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {getNextStep(eng) && getNextStep(eng) !== 'approved' && (
                        <button 
                          className="btn" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--primary)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => updateEngagementStatus(eng.id, (getNextStep(eng) as any).id)}
                        >
                          {(getNextStep(eng) as any).label}
                        </button>
                      )}
                      {getNextStep(eng) === 'approved' && (
                        <button 
                          className="btn" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--success)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => updateEngagementStatus(eng.id, 'approved')}
                        >
                          Approuver (Seuil OK)
                        </button>
                      )}
                      {getNextStep(eng) && (
                        <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => updateEngagementStatus(eng.id, 'rejected')} title="Rejeter">
                          <XCircle size={16} />
                        </button>
                      )}
                      <button className="btn-icon" title="Voir détails">
                        <Receipt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Expression de besoin">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Objet de la dépense</label>
            <input type="text" value={obj} onChange={e => setObj(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{t('service_term')}</label>
            <select value={service} onChange={e => setService(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
              <option value="DSI">DSI / IT</option>
              <option value="Marketing">Marketing & Com</option>
              <option value="RH">Ressources Humaines</option>
              <option value="Logistique">Logistique & Moyens Gx</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Ligne d'imputation</label>
            <select value={budg} onChange={e => setBudg(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
              <option value="" disabled>Sélectionner la source...</option>
              {budgetLines.map(v => <option key={v.id} value={`${v.ref} - ${v.desc}`}>{`${v.ref} - ${v.desc}`}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Montant (FCFA)</label>
            <input type="number" value={amt} onChange={e => setAmt(e.target.value)} required min={1} style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Soumettre la demande</button>
        </form>
      </Modal>
    </div>
  );
};

export default Engagements;
