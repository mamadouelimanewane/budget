import React, { useState } from 'react';
import { FileDown, FileCheck2, CheckCircle, ShieldCheck } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const OperationsPaiement: React.FC = () => {
  const { engagements, industryMode } = useBudget();
  const [activeWorkflow, setActiveWorkflow] = useState('ordres');

  const isHospital = industryMode === 'hospitalier';

  // Filtrer les engagements approuvés (visés) prêts à être payés
  const approvedEngagements = engagements.filter(e => e.stat === 'approved' || e.stat === 'commande');

  const handlePayOrder = (id: string) => {
    alert(`Ordre signé par le ${isHospital ? 'Directeur Général' : 'PDG / DAF'} pour l'engagement ${id}`);
    // Ideally update state here to 'ordonnance' 
  };

  const handleReceipt = (id: string) => {
    alert(`Règlement enregistré par ${isHospital ? "l'ACP" : "la Trésorerie"} pour le dossier ${id}. Clôture de l'opération.`);
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Liquidation & Ordonnancement</h1>
          <p>Gestion des {isHospital ? 'Ordres de Paiement (DG) et Reçus de Décaissement (ACP)' : 'Ordres de Virements (Direction) et Règlements (Trésorerie)'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeWorkflow === 'ordres' ? 'btn-primary' : ''}`}
          onClick={() => setActiveWorkflow('ordres')}
          style={{ padding: '0.75rem 1.5rem', background: activeWorkflow !== 'ordres' ? 'var(--surface-color)' : '' }}
        >
          <FileDown size={18} /> {isHospital ? 'Ordres de Paiement (Espace Directeur)' : 'Autorisation Virements (Comité Executif)'}
        </button>
        <button 
          className={`btn ${activeWorkflow === 'recus' ? 'btn-primary' : ''}`}
          onClick={() => setActiveWorkflow('recus')}
          style={{ padding: '0.75rem 1.5rem', background: activeWorkflow !== 'recus' ? 'var(--surface-color)' : 'var(--success)' }}
        >
          <FileCheck2 size={18} /> {isHospital ? 'Reçus de Décaissement (Espace ACP)' : 'Règlements & Quittances (Trésorerie)'}
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {activeWorkflow === 'ordres' && (
          <div className="animate-fade-in">
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
               <ShieldCheck size={24} color="var(--primary)" />
               <div>
                  <h3 style={{ margin: 0 }}>Génération des {isHospital ? 'Ordres de Paiement (OP)' : 'Ordres de Virements Multiples'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Espace réservé {isHospital ? 'au Directeur Général' : 'à la Direction / PDG'}. Seuls les engagements de dépenses validés apparaissent ici.</p>
               </div>
             </div>
             
             <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem' }}># Réf Engagement</th>
                    <th style={{ padding: '0.75rem' }}>Objet de la Dépense / BC</th>
                    <th style={{ padding: '0.75rem' }}>Service Demandeur</th>
                    <th style={{ padding: '0.75rem' }}>Montant</th>
                    <th style={{ padding: '0.75rem' }}>Action {isHospital ? 'DG' : 'Directeur'}</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedEngagements.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Aucun dossier en attente d'ordonnancement.</td></tr>
                  )}
                  {approvedEngagements.map(eng => (
                    <tr key={eng.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: 600 }}>{eng.id}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>{eng.obj}</td>
                      <td style={{ padding: '1rem 0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', padding: '2px 8px', background: 'var(--surface-color-light)', borderRadius: '4px' }}>
                          {eng.service}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{eng.amt.toLocaleString()} FCFA</td>
                      <td style={{ padding: '1rem 0.75rem' }}>
                        <button className="btn btn-primary" onClick={() => handlePayOrder(eng.id)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                          Générer {isHospital ? 'OP' : 'Virement'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeWorkflow === 'recus' && (
          <div className="animate-fade-in">
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
               <CheckCircle size={24} color="var(--success)" />
               <div>
                  <h3 style={{ margin: 0 }}>Génération des {isHospital ? 'Reçus de Décaissement (RD)' : 'Quittances de Règlement'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Espace réservé à {isHospital ? "l'Agent Comptable Particulier (ACP)" : "la Trésorerie"}. Caisse et paiements effectifs selon les autorisations.</p>
               </div>
             </div>
             
             {/* Simulation de fichiers déjà OP'ed (ici on réutilise la liste pour la maquette) */}
             <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem' }}>{isHospital ? '# OP (Ordre Paiement)' : '# Autorisation'}</th>
                    <th style={{ padding: '0.75rem' }}>Bénéficiaire / Montant</th>
                    <th style={{ padding: '0.75rem' }}>Date Signature</th>
                    <th style={{ padding: '0.75rem' }}>Action {isHospital ? 'ACP' : 'Comptable'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600 }}>OP-2026-1022</td>
                    <td style={{ padding: '1rem 0.75rem' }}>SENELEC (4,500,000 FCFA)</td>
                    <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)' }}>13/04/2026</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <button className="btn btn-primary" onClick={() => handleReceipt(isHospital ? 'OP-2026-1022' : 'VIR-2026-1022')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--success)', border: 'none' }}>
                        Payer & Émettre {isHospital ? 'RD' : 'Quittance'}
                      </button>
                    </td>
                  </tr>
                </tbody>
             </table>

              <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '10px', top: '10px', opacity: 0.1, transform: 'rotate(-10deg)' }}>
                  <ShieldCheck size={80} color="var(--success)" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ background: 'white', padding: '5px', borderRadius: '4px' }}>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=SIGB-PAYMENT-VERIFIED" alt="QR" width="60" height="60" />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--success)', marginBottom: '0.25rem' }}>Dernière Opération Scellée</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Certification d'intégrité active. Hash MD5: d41d8cd98f... <br/>
                      Horodatage légal : {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default OperationsPaiement;
