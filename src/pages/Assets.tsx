import React, { useState } from 'react';
import { Package, Calendar, TrendingDown, Plus, Download, ShieldCheck, History } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Assets: React.FC = () => {
  const { assets, addAsset, amortizationMethod, industryMode } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [cat, setCat] = useState('Matériel');
  const [cost, setCost] = useState('');
  const [life, setLife] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAsset({
      name,
      category: cat,
      acquisitionDate: new Date().toLocaleDateString('fr-FR'),
      cost: parseFloat(cost),
      lifeSpan: parseInt(life, 10)
    });
    setIsModalOpen(false);
    setName(''); setCost('');
  };

  const calculateAmortization = (asset: any) => {
    // Demo calculation: assume 1 year has passed
    const yearsElapsed = 1; 
    if (amortizationMethod === 'linear') {
      const annualDep = asset.cost / asset.lifeSpan;
      return Math.max(0, asset.cost - (annualDep * yearsElapsed));
    } else {
      const rate = (1 / asset.lifeSpan) * 2; // Double declining balance factor
      return Math.max(asset.cost * 0.1, asset.cost * Math.pow(1 - rate, yearsElapsed));
    }
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Gestion du Patrimoine & Actifs</h1>
          <p>Suivi des immobilisations, amortissements et inventaire {industryMode === 'hospitalier' ? 'médical' : 'corporate'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" style={{ background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white' }}>
            <Download size={18} /> Export Excel
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Nouvel Actif
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Package size={32} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Valeur Acquisition Totale</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{assets.reduce((acc, a) => acc + a.cost, 0).toLocaleString()} FCFA</div>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <TrendingDown size={32} color="var(--success)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Valeur Nette Comptable (Projetée)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {assets.reduce((acc, a) => acc + calculateAmortization(a), 0).toLocaleString()} FCFA
              </div>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ShieldCheck size={32} color="var(--secondary)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Taux d'Amortissement {amortizationMethod === 'linear' ? 'Linéaire' : 'Dégressif'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Actif</div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container glass-panel">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Actif Immobilisé</th>
              <th>Catégorie</th>
              <th>Date Acq.</th>
              <th>Coût (HT)</th>
              <th>Durée Vie</th>
              <th>VNC (Valeur Nette)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{asset.id}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{asset.name}</div>
                </td>
                <td><span className="kpi-badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{asset.category}</span></td>
                <td>{asset.acquisitionDate}</td>
                <td style={{ fontWeight: 600 }}>{asset.cost.toLocaleString()} FCFA</td>
                <td>{asset.lifeSpan} ans</td>
                <td style={{ color: 'var(--success)', fontWeight: 700 }}>{calculateAmortization(asset).toLocaleString()} FCFA</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" title="Historique Maintenance"><History size={16} /></button>
                    <button className="btn-icon" style={{ color: 'var(--primary)' }} title="Certificat"><Download size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '500px' }}>
            <h2>Enregistrer une Immobilisation</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div>
                <label>Nom de l'Actif</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label>Catégorie</label>
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option value="Matériel">Matériel</option>
                  <option value="Logiciel">Logiciel / Intangible</option>
                  <option value="Mobilier">Mobilier</option>
                  <option value="Infrastructures">Infrastructures</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Coût (FCFA)</label>
                  <input type="number" value={cost} onChange={e => setCost(e.target.value)} required />
                </div>
                <div>
                  <label>Durée de vie (ans)</label>
                  <input type="number" value={life} onChange={e => setLife(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Annuler</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Ajouter au Patrimoine</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assets;
