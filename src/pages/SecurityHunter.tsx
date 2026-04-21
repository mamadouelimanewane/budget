import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Fingerprint, Eye, Mail, Bell, ShieldCheck } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const SecurityHunter: React.FC = () => {
  const { anomalies, t } = useBudget();
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'high': return 'var(--danger)';
      case 'medium': return 'var(--warning)';
      default: return 'var(--primary)';
    }
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Anomaly Hunter (Audit IA)</h1>
          <p>Détection proactive de fraude, erreurs de saisie et fractionnements de commandes.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Alertes Mail Actives</span>
            <div 
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              style={{ 
                width: '40px', height: '22px', borderRadius: '11px', 
                background: alertsEnabled ? 'var(--success)' : 'var(--surface-color-light)', 
                cursor: 'pointer', position: 'relative', transition: '0.3s' 
              }}>
              <div style={{ 
                width: '18px', height: '18px', borderRadius: '50%', background: 'white', 
                position: 'absolute', top: '2px', left: alertsEnabled ? '20px' : '2px', transition: '0.3s' 
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderBottom: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ShieldAlert size={32} color="var(--danger)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Alertes Critiques</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{anomalies.filter(a => a.severity === 'high').length}</div>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderBottom: '4px solid var(--warning)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <AlertTriangle size={32} color="var(--warning)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risques Modérés</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{anomalies.filter(a => a.severity === 'medium').length}</div>
            </div>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderBottom: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ShieldCheck size={32} color="var(--success)" />
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sûreté du Système</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>98.4%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Fingerprint size={20} color="var(--primary)" /> Journal des Risques Détectés (IA Pattern Matching)
        </h3>

        <div className="table-container">
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem' }}>Sévérité</th>
                <th style={{ padding: '1rem' }}>Type d'Anomalie</th>
                <th style={{ padding: '1rem' }}>Description du Risque</th>
                <th style={{ padding: '1rem' }}>Réf. Liée</th>
                <th style={{ padding: '1rem' }}>Action Audit</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map(anomaly => (
                <tr key={anomaly.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span className="kpi-badge" style={{ 
                      background: `${getSeverityColor(anomaly.severity)}11`, 
                      color: getSeverityColor(anomaly.severity),
                      border: `1px solid ${getSeverityColor(anomaly.severity)}33`
                    }}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>
                    {anomaly.type === 'unusual_amount' ? 'Montant Atypique' : 
                     anomaly.type === 'threshold_bypass' ? 'Contournement Seuil' : 'Doublon Suspect'}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {anomaly.desc}
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ fontFamily: 'monospace', background: 'var(--surface-color-light)', padding: '2px 6px', borderRadius: '4px' }}>
                      {anomaly.relatedId}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Ouvrir le dossier" onClick={() => alert("Dossier d'anomalie ouvert — détail complet disponible.")}><Eye size={16} /></button>
                      <button className="btn-icon" title="Notifier Responsable" onClick={() => alert("Notification envoyée au responsable concerné via messagerie sécurisée.")}><Mail size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(76, 29, 149, 0.1))', border: '1px solid var(--secondary)33' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Fingerprint size={24} color="var(--secondary)" /> Neural Audit Engine (Analyse Sémantique)
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Le DeepMind scanne les libellés de factures et les justifications de DBM pour identifier des incohérences sémantiques ou des signaux d'intention suspecte.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Détection d'Abus de Terminology</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Usage excessif du terme "Urgence Vitale" pour des fournitures de bureau.</div>
              </div>
              <span className="kpi-badge warning">IA Match 82%</span>
           </div>
           <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>Analyse de Cohérence Prestataire</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Facture de "Services IT" émise par une entreprise enregistrée en "BTP/Gros Œuvre".</div>
              </div>
              <span className="kpi-badge negative">Risque Critique</span>
           </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
         <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--primary)33' }}>
            <h4 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} color="var(--primary)" /> Alertes Automatiques
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Le système envoie une notification immédiate à l'audit interne et au DAF pour toute anomalie de sévérité **Élevée**. {alertsEnabled ? "Les alertes email sont configurées sur : admin-finances@hoggy.sn" : "L'envoi automatique est désactivé."}
            </p>
         </div>
         <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid var(--warning)33' }}>
            <h4 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} color="var(--warning)" /> LCB-FT / Anti-Blanchiment
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Les flux sont croisés avec les bases de données du Trésor et de la CENTIF (simulation) pour prévenir tout risque lié au financement illégal.
            </p>
         </div>
      </div>
    </div>
  );
};

export default SecurityHunter;
