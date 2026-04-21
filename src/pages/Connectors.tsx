import React from 'react';
import { Share2, Globe, Database, Key, CheckCircle, XCircle, RefreshCw, Plus } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Connectors: React.FC = () => {
  const { connectors } = useBudget();

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Hub d'Interopérabilité Souverain</h1>
          <p>Gestion des passerelles API avec les systèmes externes (Trésor, Banques, RH, etc.).</p>
        </div>
        <button onClick={() => alert('Assistant de configuration de connecteur ouvert.')} className="btn btn-primary">
          <Plus size={18} /> Nouveau Connecteur
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', marginTop: '1.5rem' }}>
        {/* ACTIVE CONNECTORS */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={20} color="var(--primary)" /> Passerelles Configurées
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {connectors.map(conn => (
              <div key={conn.id} style={{ 
                padding: '1.5rem', 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', height: '50px', borderRadius: '10px', 
                    background: conn.status === 'connected' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    {conn.type === 'treasury' ? <Database size={24} color={conn.status === 'connected' ? 'var(--success)' : 'var(--danger)'} /> : <Share2 size={24} color={conn.status === 'connected' ? 'var(--success)' : 'var(--danger)'} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{conn.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type: {conn.type.toUpperCase()} • Dernière Sync: {conn.lastSync}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: conn.status === 'connected' ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                      {conn.status === 'connected' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      {conn.status === 'connected' ? 'Opérationnel' : 'Erreur Auth'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ping: 42ms</div>
                  </div>
                  <button className="btn-icon" onClick={() => alert("Test de connexion en cours...")} title="Tester connexion">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API CREDENTIALS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
             <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Key size={18} color="var(--warning)" /> Webhooks & API Keys
             </h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div>
                 <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Clé API (Production)</label>
                 <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                   <input type="password" value="sk-séb-5512-xxxx-xxxx" readOnly 
                     style={{ flex: 1, padding: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                   />
                   <button className="btn btn-icon" onClick={() => alert("Connecteur synchronisé avec succès.")} style={{ padding: '0.5rem' }}><RefreshCw size={16} /></button>
                 </div>
               </div>
               <div>
                 <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>URL Webhook (Events)</label>
                 <input type="text" value="https://api.hoggy.sn/v1/finance/events" readOnly 
                   style={{ width: '100%', padding: '0.5rem', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', marginTop: '0.25rem' }}
                 />
               </div>
             </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--primary)33' }}>
             <h4 style={{ marginBottom: '0.75rem' }}>Sécurité d'Interfaçage</h4>
             <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               Toutes les requêtes sortantes vers le **Trésor Public** et les banques partenaires sont cryptées via **mTLS (Mutual TLS)** et signées numériquement.
             </p>
             <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>
                <CheckCircle size={14} /> Chiffrement AES-256 GCM Actif
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connectors;
