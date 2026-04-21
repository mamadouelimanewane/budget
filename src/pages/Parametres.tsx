import React, { useState } from 'react';
import { Settings, List, Calendar, Database, Shield, FileText, Building2, Activity } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Parametres: React.FC = () => {
  const { industryMode, setIndustryMode } = useBudget();
  const [activeTab, setActiveTab] = useState('comptes');

  const isHospital = industryMode === 'hospitalier';

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Paramétrage SI {isHospital ? '(Context Hôpital)' : '(Context Entreprise Corp)'}</h1>
          <p>Supervision des configurations budgétaires, types de comptes et périodes</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <button 
            onClick={() => setIndustryMode('entreprise')}
            className={`btn ${!isHospital ? 'btn-primary' : ''}`} style={{ padding: '0.5rem', border: isHospital ? 'none' : '', background: isHospital ? 'transparent' : '' }}>
            <Building2 size={16} /> Entreprise
          </button>
          <button 
            onClick={() => setIndustryMode('hospitalier')}
            className={`btn ${isHospital ? 'btn-primary' : ''}`} style={{ padding: '0.5rem', border: !isHospital ? 'none' : '', background: !isHospital ? 'transparent' : 'var(--success)' }}>
            <Activity size={16} /> Hospitalier
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Navigation Paramètres */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('comptes')}
            className={`btn ${activeTab === 'comptes' ? 'btn-primary' : ''}`} 
            style={{ justifyContent: 'flex-start', border: activeTab !== 'comptes' ? '1px solid var(--glass-border)' : 'none', background: activeTab !== 'comptes' ? 'transparent' : '' }}>
            <List size={18} /> Plan Comptable (Chapitres)
          </button>
          <button 
            onClick={() => setActiveTab('types')}
            className={`btn ${activeTab === 'types' ? 'btn-primary' : ''}`} 
            style={{ justifyContent: 'flex-start', border: activeTab !== 'types' ? '1px solid var(--glass-border)' : 'none', background: activeTab !== 'types' ? 'transparent' : '' }}>
            <Database size={18} /> Types de Budgets & Sections
          </button>
          <button 
            onClick={() => setActiveTab('periodes')}
            className={`btn ${activeTab === 'periodes' ? 'btn-primary' : ''}`} 
            style={{ justifyContent: 'flex-start', border: activeTab !== 'periodes' ? '1px solid var(--glass-border)' : 'none', background: activeTab !== 'periodes' ? 'transparent' : '' }}>
            <Calendar size={18} /> Périodes Budgétaires
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`btn ${activeTab === 'roles' ? 'btn-primary' : ''}`} 
            style={{ justifyContent: 'flex-start', border: activeTab !== 'roles' ? '1px solid var(--glass-border)' : 'none', background: activeTab !== 'roles' ? 'transparent' : '' }}>
            <Shield size={18} /> Rôles et Accès Acteurs
          </button>
          <button 
            onClick={() => setActiveTab('workflow')}
            className={`btn ${activeTab === 'workflow' ? 'btn-primary' : ''}`} 
            style={{ justifyContent: 'flex-start', border: activeTab !== 'workflow' ? '1px solid var(--glass-border)' : 'none', background: activeTab !== 'workflow' ? 'transparent' : '' }}>
            <Activity size={18} /> Circuits de Validation
          </button>
        </div>

        {/* Contenu Paramètres */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '500px' }}>
          
          {activeTab === 'comptes' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <List size={24} color="var(--primary)" /> Gestion du Plan Comptable
              </h2>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button onClick={() => alert('Nouveau chapitre principal ajouté au plan de comptes.')} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Nouveau Chapitre Principal</button>
                <button onClick={() => alert('Nouveau compte divisionnaire ajouté.')} className="btn" style={{ fontSize: '0.85rem', background: 'var(--surface-color-light)' }}>+ Compte Divisionnaire</button>
              </div>
              <table style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Type</th>
                    <th style={{ padding: '0.75rem' }}>Code / Réf</th>
                    <th style={{ padding: '0.75rem' }}>Intitulé {isHospital ? 'Hospitalier' : 'Commercial'}</th>
                    <th style={{ padding: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem' }}><span className="kpi-badge positive">Chapitre Principal</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Titre 2</td>
                    <td style={{ padding: '0.75rem' }}>Dépenses de Fonctionnement</td>
                    <td style={{ padding: '0.75rem' }}><button onClick={() => alert('Édition du chapitre activée.')} className="btn-icon">Éditer</button></td>
                  </tr>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}><span className="kpi-badge" style={{ background: 'var(--surface-color-light)' }}>Divisionnaire</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>6111</td>
                    <td style={{ padding: '0.75rem' }}>{isHospital ? 'Achats de médicaments (Pharmacie Centrale)' : 'Achats de matières premières (Supply Chain)'}</td>
                    <td style={{ padding: '0.75rem' }}><button onClick={() => alert('Édition du compte activée.')} className="btn-icon">Éditer</button></td>
                  </tr>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}><span className="kpi-badge" style={{ background: 'var(--surface-color-light)' }}>Divisionnaire</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>6112</td>
                    <td style={{ padding: '0.75rem' }}>{isHospital ? 'Achats de petit matériel médical' : 'Achats et Licences Logiciels (DSI)'}</td>
                    <td style={{ padding: '0.75rem' }}><button onClick={() => alert('Édition de la période activée.')} className="btn-icon">Éditer</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'types' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Database size={24} color="var(--primary)" /> Types de Budget & Sections
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Configuration des grandes sections d'utilisation du budget {isHospital ? 'hospitalier' : 'entreprise'}.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Section Fonctionnement (Recettes & Dépenses)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Regroupe l'essentiel des charges courantes, dont les salaires (pilotés par les RH) et l'achat de biens et services {isHospital ? '(SAF / Pharmacie)' : '(Direction Achats)'}.</p>
                </div>
                <div style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Section Investissement (Recettes & Dépenses)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Acquisitions d'infrastructures et de gros matériel {isHospital ? 'médical lourd' : 'industriel/IT lourd'}.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'periodes' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Calendar size={24} color="var(--primary)" /> Périodes Budgétaires
              </h2>
              <div className="kpi-card glass-panel" style={{ borderLeft: '4px solid var(--success)' }}>
                 <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Selon la Règle PRC01 : L'initialisation du budget nécessite une période active.</p>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Période Courante : 2026</span>
                   <button onClick={() => alert('Nouvelle période budgétaire créée.')} className="btn btn-primary" style={{ background: 'var(--success)', border: 'none' }}>+ Nouvelle Période</button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Shield size={24} color="var(--primary)" /> Configuration Stratégique & Acteurs
              </h2>
              
              <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--primary)33' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Règle d'Amortissement Globale</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                   <button 
                    onClick={() => useBudget().setAmortizationMethod('linear')}
                    className={`btn ${useBudget().amortizationMethod === 'linear' ? 'btn-primary' : ''}`}
                    style={{ background: useBudget().amortizationMethod !== 'linear' ? 'transparent' : '', border: '1px solid var(--glass-border)' }}>
                     Linéaire (Standard)
                   </button>
                   <button 
                    onClick={() => useBudget().setAmortizationMethod('declining')}
                    className={`btn ${useBudget().amortizationMethod === 'declining' ? 'btn-primary' : ''}`}
                    style={{ background: useBudget().amortizationMethod !== 'declining' ? 'transparent' : '', border: '1px solid var(--glass-border)' }}>
                     Dégressif (Agressif)
                   </button>
                </div>
                <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {useBudget().amortizationMethod === 'linear' 
                    ? 'La valeur de l\'actif diminue de manière constante chaque année.'
                    : 'L\'amortissement est plus important les premières années (DDB Factor 2.0).'}
                </p>
              </div>

              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Acteur Système</th>
                    <th style={{ padding: '0.75rem' }}>Périmètre de droits</th>
                  </tr>
                </thead>
                <tbody>
                  {(isHospital ? [
                    { a: 'Contrôleur de gestion', d: 'Toutes créations paramétriques, engagements, visa d\'allocation' },
                    { a: 'Directeur Général (DG)', d: 'Émission et Signature des Ordres de Paiement, Vue globale stats' },
                    { a: 'Agent Comptable Particulier (ACP)', d: 'Création des Reçus de Décaissement, Paiements effectifs' },
                    { a: 'Chef de Service SAF', d: 'Émission Commandes Non-Pharmaceutiques, Visa dépenses' },
                    { a: 'Responsable Pharmacie', d: 'Émission Commandes Produits Pharmaceutiques' },
                    { a: 'Agent DRH', d: 'Émission États Paiements Salaires' }
                  ] : [
                    { a: 'Directeur Financier (DAF)', d: 'Contrôle budgétaire, visa des engagements globaux' },
                    { a: 'Agent Trésorerie', d: 'Exécution des virements et rapprochement bancaire' },
                    { a: 'PDG / General Manager', d: 'Signature finale des paiements majeurs, KPIs Stratégiques' },
                    { a: 'Direction des Achats', d: 'Gestion fournisseurs, bons de commande, approvisionnement' },
                    { a: 'Responsable RH', d: 'Gestion de la paie et prévisions masse salariale' }
                  ]).map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{row.a}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Activity size={24} color="var(--primary)" /> Moteur de Validation Intelligente
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Définissez les seuils de déclenchement pour chaque étape de validation. Les paliers inférieurs sont ignorés si le montant est en dessous du seuil.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {(useBudget().workflowSteps).map((step) => (
                  <div key={step.id} className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'white' }}>{step.label}</h3>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Rôle requis : {step.role}</span>
                      </div>
                      <div className="status-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>Actif</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Montant minimum (FCFA) :</label>
                      <input 
                        type="number" 
                        value={step.threshold} 
                        onChange={(e) => useBudget().updateWorkflowThreshold(step.id, parseInt(e.target.value, 10))}
                        style={{ background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem', borderRadius: '4px', width: '200px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Parametres;
