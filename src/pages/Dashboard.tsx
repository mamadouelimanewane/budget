import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, AlertCircle, FileText, 
  BarChart2, ChevronDown, CheckCircle, Repeat, Sparkles, CreditCard, Bell
} from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import BudgetFlow from '../components/BudgetFlow';

const Dashboard: React.FC = () => {
  const { budgetLines, engagements, dbms, recettes, t, industryMode, getForecast } = useBudget();
  const [currency, setCurrency] = useState('FCFA');

  const { totalProjected, status } = getForecast();

  const isHospital = industryMode === 'hospitalier';

  // Calculations
  const dotationInitiale = budgetLines.reduce((acc, curr) => acc + curr.n1, 0);
  const dotationModifiee = dotationInitiale + dbms.filter(d => d.stat === 'approved').reduce((acc, curr) => acc + curr.amt, 0) - dbms.filter(d => d.stat === 'approved').reduce((acc, curr) => acc + curr.amt, 0); // Logic: DBM changes the shape globally, here simplified.
  const engagementsTotal = engagements.reduce((acc, curr) => acc + curr.amt, 0);
  const tauxConsommation = ((engagementsTotal / dotationInitiale) * 100).toFixed(1);
  const engagementsEnAttente = engagements.filter(e => e.stat === 'besoin' || e.stat === 'visa').length;

  const abonnementsSaaS = [
    { name: 'Microsoft 365', amount: 1500000, frequency: 'Mensuel', nextDate: '15 Avr' },
    { name: 'Services Cloud AWS', amount: 3200000, frequency: 'Mensuel', nextDate: '18 Avr' },
  ];

  const formatCurrency = (amt: number) => {
    if(currency === 'FCFA') return amt.toLocaleString() + ' FCFA';
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
              <option value="FCFA" style={{ color: 'black' }}>FCFA (FCFA)</option>
              <option value="EUR" style={{ color: 'black' }}>EUR (€)</option>
              <option value="USD" style={{ color: 'black' }}>USD ($)</option>
            </select>
          </div>
          <button onClick={() => alert('Rapport PDF en cours de génération...')} className="btn btn-primary">
            Export Rapport PDF <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* SMART FORECAST BAR */}
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1.25rem', 
        borderRadius: '12px', 
        background: status === 'critical' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
        border: `1px solid ${status === 'critical' ? 'var(--danger)' : status === 'warning' ? 'var(--warning)' : 'var(--success)'}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Sparkles size={24} color={status === 'critical' ? 'var(--danger)' : status === 'warning' ? 'var(--warning)' : 'var(--success)'} />
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Moteur Prédictif IA : Projection de fin d'année</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Basé sur le rythme de consommation actuel (4 mois écoulés)</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: status === 'critical' ? 'var(--danger)' : 'white' }}>
            {formatCurrency(totalProjected)}
          </div>
          <span className={`kpi-badge ${status === 'safe' ? 'positive' : status === 'warning' ? 'warning' : 'negative'}`} style={{ fontSize: '0.75rem' }}>
             {status === 'safe' ? 'Dans les limites' : status === 'warning' ? 'Risque de dépassement' : 'Dépassement Critique Projeté'}
          </span>
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
          <button onClick={() => alert('Dossier ouvert pour examen et visa hiérarchique.')} className="btn btn-primary" style={{ marginTop: '0.5rem', fontSize: '0.8rem', padding: '0.4rem' }}>
            Examiner pour Visa
          </button>
        </div>
      </div>

      <BudgetFlow 
        sources={[
          { label: 'Bailleurs de Fonds', value: (dotationInitiale * 0.4).toLocaleString(), color: '#10b981' },
          { label: 'Recettes Propres', value: (dotationInitiale * 0.35).toLocaleString(), color: '#3b82f6' },
          { label: 'Subventions État', value: (dotationInitiale * 0.25).toLocaleString(), color: '#f59e0b' }
        ]}
        destinations={[
          { label: 'Fonctionnement', value: (engagementsTotal * 0.6).toLocaleString(), color: '#ef4444' },
          { label: 'Investissements', value: (engagementsTotal * 0.25).toLocaleString(), color: '#8b5cf6' },
          { label: 'Masse Salariale', value: (engagementsTotal * 0.15).toLocaleString(), color: '#06b6d4' }
        ]}
      />

      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3>Suivi des Lignes Budgétaires</h3>
            <button className="btn btn-icon" onClick={() => alert("Graphique étendu — vue détaillée des lignes budgétaires.")} title="Voir plus"><BarChart2 size={18} /></button>
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
            <button onClick={() => alert('Module de gestion des cartes virtuelles ouvert.')} className="btn" style={{ background: 'var(--success)', color: 'white', border: 'none' }}>Gérer Cartes</button>
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
