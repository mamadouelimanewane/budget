import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, AlertCircle, FileText, 
  BarChart2, ChevronDown, CheckCircle, Repeat, Sparkles, CreditCard, Bell
} from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Dashboard: React.FC = () => {
  const { budgetLines, engagements, dbms, t, industryMode } = useBudget();
  const [currency, setCurrency] = useState('XOF');

  const isHospital = industryMode === 'hospitalier';

  // Calculations
  const dotationInitiale = budgetLines.reduce((acc, curr) => acc + curr.n1, 0);
  const dotationModifiee = dotationInitiale + dbms.filter(d => d.stat === 'approved').reduce((acc, curr) => acc + curr.amt, 0) - dbms.filter(d => d.stat === 'approved').reduce((acc, curr) => acc + curr.amt, 0); // Logic: DBM changes the shape globally, here simplified.
  const engagementsTotal = engagements.reduce((acc, curr) => acc + curr.amt, 0);
  const tauxConsommation = ((engagementsTotal / dotationInitiale) * 100).toFixed(1);
  const engagementsEnAttente = engagements.filter(e => e.stat === 'pending' || e.stat === 'besoin').length;

  const abonnementsSaaS = [
    { name: 'Microsoft 365', amount: 1500000, frequency: 'Mensuel', nextDate: '15 Avr' },
    { name: 'Services Cloud AWS', amount: 3200000, frequency: 'Mensuel', nextDate: '18 Avr' },
  ];

  const formatCurrency = (amt: number) => {
    if(currency === 'XOF') return amt.toLocaleString() + ' XOF';
    if(currency === 'EUR') return (amt / 655.957).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' €';
    if(currency === 'USD') return (amt / 600).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' $';
    return amt.toLocaleString();
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>{isHospital ? 'Tableau de Bord SIH' : 'Exécutif Dashboard Board'}</h1>
          <p>Supervision globale multi-{isHospital ? 'services' : 'entités'} et pilotage temps réel</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* MULTI DEVSE BUTTON */}
          <div className="glass-panel" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: '1px solid var(--glass-border)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Devise:</span>
            <select 
              value={currency} 
              onChange={e => setCurrency(e.target.value)}
              style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="XOF" style={{ color: 'black' }}>XOF (FCFA)</option>
              <option value="EUR" style={{ color: 'black' }}>EUR (€)</option>
              <option value="USD" style={{ color: 'black' }}>USD ($)</option>
            </select>
          </div>
          <button className="btn btn-primary">
            Export Rapport PDF <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* INTELLIGENT ALERTS BANNER (BENCHMARK FEATURE) */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <div style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1), transparent)', borderLeft: '4px solid var(--danger)', padding: '1rem', borderRadius: '4px', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Bell size={20} color="var(--danger)" />
          <div>
            <span style={{ fontWeight: 600, color: 'white', display: 'block' }}>Alerte de Dépassement Budgétaire</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ligne 614 (Entretien) atteint 85% de son plafond. Blocage automatique à 95%.</span>
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
          <div className="kpi-header">
            <span className="kpi-title">{t('dotation')}</span>
            <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="kpi-value">{formatCurrency(dotationInitiale)}</div>
          <div className="kpi-badge positive">
            <CheckCircle size={12} /> Applicable
          </div>
        </div>
        
        <div className="kpi-card glass-panel" style={{ borderTop: '4px solid var(--warning)' }}>
          <div className="kpi-header">
            <span className="kpi-title">Total Engagé (Temps Réel)</span>
            <div className="kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="kpi-value">{formatCurrency(engagementsTotal)}</div>
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-color-light)', borderRadius: '3px', marginTop: '0.5rem' }}>
            <div style={{ width: `${Math.min(100, Number(tauxConsommation))}%`, height: '100%', background: 'var(--warning)', borderRadius: '3px' }}></div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{tauxConsommation}% Consommé</span>
        </div>

        <div className="kpi-card glass-panel" style={{ borderTop: '4px solid var(--secondary)' }}>
          <div className="kpi-header">
            <span className="kpi-title">{isHospital ? 'Dossiers en attente de Visa' : 'Demandes d\'achats à valider'}</span>
            <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' }}>
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="kpi-value">{engagementsEnAttente} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{isHospital ? 'dossiers' : 'demandes'}</span></div>
          <button className="btn btn-primary" style={{ marginTop: '0.5rem', fontSize: '0.8rem', padding: '0.4rem' }}>
            Examiner pour Visa
          </button>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3>Suivi des Lignes Budgétaires</h3>
            <button className="btn btn-icon"><BarChart2 size={18} /></button>
          </div>
          <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            {budgetLines.map(line => {
              // Simulated consumption per line for demo
              const lineEngs = engagements.filter(e => e.budg.includes(line.ref)).reduce((acc, curr) => acc + curr.amt, 0);
              const tx = ((lineEngs / line.n1) * 100).toFixed(0);
              return (
                <div key={line.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{line.ref} - {line.desc}</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(lineEngs)} / {formatCurrency(line.n1)}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--surface-color-light)', borderRadius: '4px' }}>
                    <div style={{ width: `${Math.min(100, Number(tx))}%`, height: '100%', background: Number(tx) > 80 ? 'var(--danger)' : 'var(--success)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RECURRENT SUBSCRIPTIONS & VIRTUAL CARDS (BENCHMARK FEATURE) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="ai-assistant-banner" style={{ margin: 0 }}>
            <div className="ai-content">
              <div className="ai-icon-wrapper" style={{ animation: 'none', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                <CreditCard size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{isHospital ? 'Cartes Budgétaires Services' : 'Centralisation des Cartes Virtuelles'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{isHospital ? 'Plafonds de dépenses par unité médicale.' : 'Cartes de paiement plafonnées et éphémères actives pour vos équipes.'}</p>
              </div>
            </div>
            <button className="btn" style={{ background: 'var(--success)', color: 'white', border: 'none' }}>Gérer Cartes</button>
          </div>

          <div className="chart-card glass-panel" style={{ flexGrow: 1 }}>
            <div className="chart-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Repeat size={18} color="var(--primary)" /> Abonnements (SaaS)
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {abonnementsSaaS.map((sub, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--surface-color-light)', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 600, display: 'block' }}>{sub.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proch. le {sub.nextDate}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'block' }}>{formatCurrency(sub.amount)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{sub.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
