import React from 'react';
import { ShieldCheck, Download, Search, Filter, Key, Database, Activity, Mail } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const AuditPage: React.FC = () => {
  const { auditLogs, t, industryMode } = useBudget();
  const isHospital = industryMode === 'hospitalier';

  return (
    <div className="dashboard-view animate-fade-in">
      {/* SECURITY BANNER */}
      <div style={{ background: isHospital ? 'linear-gradient(90deg, #b91c1c 0%, #7f1d1d 100%)' : 'linear-gradient(90deg, var(--primary) 0%, #1e3a8a 100%)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ShieldCheck size={20} color="white" />
        <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          SESSION {isHospital ? 'IGF / IGE' : 'AUDIT EXTERNE'} : ESPACE SÉCURISÉ EN LECTURE SEULE - HORODATAGE eIDAS ACTIF
        </span>
      </div>

      <div className="dashboard-header">
        <div>
          <h1>{t('audit')}</h1>
          <p>Journal immutable des opérations et traçabilité pour les corps de contrôle {isHospital ? '(IGF/CENTIF)' : '(CAC / Audit Interne)'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-icon" title="Exporter le journal" onClick={() => alert("Journal d'audit exporté : Journal_Audit_Complet_2026.xlsx")}>
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
          <div className="kpi-header">
            <span className="kpi-title">Requêtes Extractions</span>
            <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
              <Database size={20} />
            </div>
          </div>
          <div className="kpi-value">0</div>
        </div>
        
        <div className="kpi-card glass-panel" style={{ borderTop: '4px solid var(--success)' }}>
          <div className="kpi-header">
            <span className="kpi-title">Rapports LCB-FT Générés</span>
            <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <Activity size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span>A Jour</span>
            <span style={{ fontSize: '1rem', color: 'var(--success)' }}>✔</span>
          </div>
        </div>

        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(76, 29, 149, 0.2))', borderTop: '4px solid var(--secondary)' }}>
          <div className="kpi-header">
            <span className="kpi-title">Circularisation FRS</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <Mail size={20} />
            </div>
          </div>
          <button onClick={() => alert('Campagne d\'audit lancée. Rapport disponible dans 24h.')} className="btn btn-primary" style={{ marginTop: '0.5rem', fontSize: '0.85rem', padding: '0.5rem' }}>
            Lancer Campagne
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} color="var(--primary)" /> Blockchain Interne / Logs Immutables
          </h3>
          <div style={{ display: 'flex', gap: '1rem', width: '40%' }}>
            <div className="header-search" style={{ width: '100%' }}>
              <Search size={18} />
              <input type="text" placeholder="Tracer par ID Acte, User ou IP..." />
            </div>
            <button className="btn btn-icon" title="Filtrer" onClick={() => alert("Filtres appliqués sur le journal d'audit.")}>
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Blockchain</th>
                <th>Horodatage (UTC)</th>
                <th>Utilisateur / Acteur</th>
                <th>Module</th>
                <th>Action Réalisée</th>
                <th>Certificat IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => {
                const dateObj = new Date(log.timestamp);
                const timeString = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
                
                return (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.id}</td>
                    <td style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>{timeString}</td>
                    <td style={{ fontWeight: 500 }}>{log.user}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      <span style={{ padding: '2px 6px', background: 'var(--surface-color-light)', borderRadius: '4px' }}>
                        {log.module}
                      </span>
                    </td>
                    <td>{log.detail}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{log.ip}</td>
                  </tr>
                );
              })}
              {auditLogs.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', opacity: 0.5 }}>Aucun journal enregistré</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;
