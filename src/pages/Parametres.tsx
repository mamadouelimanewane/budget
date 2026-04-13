import React, { useState } from 'react';
import { Settings, List, Calendar, Database, Shield, FileText } from 'lucide-react';

const Parametres: React.FC = () => {
  const [activeTab, setActiveTab] = useState('comptes');

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Paramétrage SIH (Hôpital Général de Grand Yoff)</h1>
          <p>Supervision des configurations budgétaires, types de comptes et périodes (Réf: SFD V0.1)</p>
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
        </div>

        {/* Contenu Paramètres */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '500px' }}>
          
          {activeTab === 'comptes' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <List size={24} color="var(--primary)" /> Gestion du Plan Comptable
              </h2>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Nouveau Chapitre Principal</button>
                <button className="btn" style={{ fontSize: '0.85rem', background: 'var(--surface-color-light)' }}>+ Compte Divisionnaire</button>
              </div>
              <table style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Type</th>
                    <th style={{ padding: '0.75rem' }}>Code / Réf</th>
                    <th style={{ padding: '0.75rem' }}>Intitulé Hospitalier</th>
                    <th style={{ padding: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem' }}><span className="kpi-badge positive">Chapitre Principal</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Titre 2</td>
                    <td style={{ padding: '0.75rem' }}>Dépenses de Fonctionnement</td>
                    <td style={{ padding: '0.75rem' }}><button className="btn-icon">Éditer</button></td>
                  </tr>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}><span className="kpi-badge" style={{ background: 'var(--surface-color-light)' }}>Divisionnaire</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>6111</td>
                    <td style={{ padding: '0.75rem' }}>Achats de médicaments (Pharmacie Centrale)</td>
                    <td style={{ padding: '0.75rem' }}><button className="btn-icon">Éditer</button></td>
                  </tr>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}><span className="kpi-badge" style={{ background: 'var(--surface-color-light)' }}>Divisionnaire</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>6112</td>
                    <td style={{ padding: '0.75rem' }}>Achats de petit matériel médical</td>
                    <td style={{ padding: '0.75rem' }}><button className="btn-icon">Éditer</button></td>
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
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Configuration des grandes sections d'utilisation du budget hospitalier.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Section Fonctionnement (Recettes & Dépenses)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Regroupe l'essentiel des charges courantes, dont les salaires (pilotés par les RH) et l'achat de biens et services (SAF / Pharmacie).</p>
                </div>
                <div style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                  <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Section Investissement (Recettes & Dépenses)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Acquisitions d'infrastructures et de gros matériel médical lourd.</p>
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
                   <button className="btn btn-primary" style={{ background: 'var(--success)', border: 'none' }}>+ Nouvelle Période</button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Shield size={24} color="var(--primary)" /> Gestion des Acteurs et Privilèges
              </h2>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem' }}>Acteur Système</th>
                    <th style={{ padding: '0.75rem' }}>Périmètre de droits</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { a: 'Contrôleur de gestion', d: 'Toutes créations paramétriques, engagements, visa d\'allocation' },
                    { a: 'Directeur Général (DG)', d: 'Émission et Signature des Ordres de Paiement, Vue globale stats' },
                    { a: 'Agent Comptable Particulier (ACP)', d: 'Création des Reçus de Décaissement, Paiements effectifs' },
                    { a: 'Chef de Service SAF', d: 'Émission Commandes Non-Pharmaceutiques, Visa dépenses' },
                    { a: 'Responsable Pharmacie', d: 'Émission Commandes Produits Pharmaceutiques' },
                    { a: 'Agent DRH', d: 'Émission États Paiements Salaires' }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{row.a}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Parametres;
