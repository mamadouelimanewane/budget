import React, { useState } from 'react';
import { CreditCard, Download, Search, Filter, Plus, CheckCircle, Clock } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import Modal from '../components/Modal';

const RecettesPage: React.FC = () => {
  const { recettes, addRecette, updateRecetteStatus } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [titre, setTitre] = useState('');
  const [source, setSource] = useState('Trésor Public');
  const [compte, setCompte] = useState('711 - Subventions');
  const [montant, setMontant] = useState('');
  const [stat, setStat] = useState<'encaisse' | 'previsionnel'>('previsionnel');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre || !source || !compte || !montant) return;
    addRecette({
      titre,
      source,
      compte,
      montant: parseInt(montant, 10),
      stat
    });
    setIsModalOpen(false);
    setTitre(''); setMontant(''); 
  };

  // KPIs calculations
  const totalEncaisse = recettes.filter(r => r.stat === 'encaisse').reduce((acc, curr) => acc + curr.montant, 0);
  const totalPrev = recettes.filter(r => r.stat !== 'encaisse').reduce((acc, curr) => acc + curr.montant, 0);
  const previsionGlobaleN = 500000000; // Fake global expectation
  const tauxRecouvrement = ((totalEncaisse / previsionGlobaleN) * 100).toFixed(1);

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Gestion des Recettes</h1>
          <p>Saisie, classification et suivi de recouvrement</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-icon">
            <Download size={18} />
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Nouveau Titre de Recette</span>
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))' }}>
          <div className="kpi-header">
            <span className="kpi-title">Total Recouvré (Encaissé)</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <CreditCard size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'white', marginTop: '0.5rem' }}>
            {totalEncaisse.toLocaleString()} <span style={{ fontSize: '1rem' }}>XOF</span>
          </div>
        </div>
        
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Taux de Recouvrement (Objectif N)</span>
            <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="kpi-value">{tauxRecouvrement}%</div>
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-color-light)', borderRadius: '3px', marginTop: '0.5rem' }}>
            <div style={{ width: `${Math.min(100, Number(tauxRecouvrement))}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
          </div>
        </div>

        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))' }}>
          <div className="kpi-header">
            <span className="kpi-title">Restes à Recouvrer (Prévision)</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'white', marginTop: '0.5rem' }}>
            {totalPrev.toLocaleString()} <span style={{ fontSize: '1rem' }}>XOF</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '60%', marginBottom: '1.5rem' }}>
          <div className="header-search" style={{ width: '100%' }}>
            <Search size={18} />
            <input type="text" placeholder="Rechercher une recette par titre, source ou compte..." />
          </div>
          <button className="btn btn-icon">
            <Filter size={18} />
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Réf.</th>
                <th>Intitulé Complet</th>
                <th>Source / Bailleur</th>
                <th>Compte</th>
                <th>Date Em.</th>
                <th>Montant (XOF)</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recettes.map((rec) => (
                <tr key={rec.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{rec.id}</td>
                  <td style={{ fontWeight: 500 }}>{rec.titre}</td>
                  <td>{rec.source}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{rec.compte}</td>
                  <td>{rec.date}</td>
                  <td className="td-amount">{(rec.montant).toLocaleString()}</td>
                  <td>
                    {rec.stat === 'encaisse' && <span className="status-badge status-completed">Encaissé Banco</span>}
                    {rec.stat === 'previsionnel' && <span className="status-badge status-pending">Prévisionnel</span>}
                    {rec.stat === 'retard' && <span className="status-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)' }}>Retard Constaté</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {rec.stat !== 'encaisse' && (
                        <button className="btn-icon" style={{ color: 'var(--success)' }} onClick={() => updateRecetteStatus(rec.id, 'encaisse')} title="Marquer Exécuté/Encaissé">
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {recettes.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: 'center', opacity: 0.5 }}>Aucune recette dans le portefeuille</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouveau Titre de Recette">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Intitulé du financement / recette</label>
            <input type="text" value={titre} onChange={e => setTitre(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Source de Fonds</label>
              <select value={source} onChange={e => setSource(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
                <option value="Trésor Public">Trésor Public</option>
                <option value="Banque Mondiale">Banque Mondiale</option>
                <option value="Collectivités">Collectivités Territoriales</option>
                <option value="Bailleurs Fonds">Autres Bailleurs</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Compte (Nomenclature)</label>
              <select value={compte} onChange={e => setCompte(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
                <option value="711 - Subventions">711 - Subventions</option>
                <option value="741 - Dons courants">741 - Dons courants</option>
                <option value="702 - Produits du domaine">702 - Produits du domaine</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Statut Actuel</label>
              <select value={stat} onChange={e => setStat(e.target.value as any)} required style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}>
                <option value="previsionnel">Prévisionnel (Attendu)</option>
                <option value="encaisse">Encaissé</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Montant (XOF)</label>
              <input type="number" value={montant} onChange={e => setMontant(e.target.value)} required min={1} style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Créer la recette</button>
        </form>
      </Modal>
    </div>
  );
};

export default RecettesPage;
