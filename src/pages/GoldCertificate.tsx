import React from 'react';
import { Award, ShieldCheck, QrCode, Download, Share2, Printer, Star } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const GoldCertificate: React.FC = () => {
  const { industryMode } = useBudget();

  return (
    <div className="dashboard-view animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      
      <div className="dashboard-header" style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1>Sceau de l'Excellence Géopolitique</h1>
          <p>Certification institutionnelle de gestion souveraine et d'intégrité budgétaire.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn btn-icon"><Share2 size={18} /></button>
           <button className="btn btn-primary"><Download size={18} /> Télécharger Certificat</button>
        </div>
      </div>

      {/* THE CERTIFICATE */}
      <div className="glass-panel" style={{ 
        width: '100%', 
        maxWidth: '850px', 
        padding: '4rem', 
        border: '10px double var(--warning)', 
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(20, 20, 25, 1) 0%, rgba(30, 30, 40, 1) 100%)',
        textAlign: 'center',
        boxShadow: '0 0 50px rgba(245, 158, 11, 0.2)'
      }}>
         {/* DECORATIVE CORNERS */}
         <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--warning)', opacity: 0.5 }}><Star size={24} /></div>
         <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--warning)', opacity: 0.5 }}><Star size={24} /></div>
         <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'var(--warning)', opacity: 0.5 }}><Star size={24} /></div>
         <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'var(--warning)', opacity: 0.5 }}><Star size={24} /></div>

         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '120px', height: '120px', borderRadius: '60px', 
              background: 'rgba(245, 158, 11, 0.1)', 
              border: '2px solid var(--warning)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--warning)',
              boxShadow: '0 0 30px var(--warning)33'
            }}>
               <Award size={64} />
            </div>
         </div>

         <h2 style={{ 
           fontSize: '2.5rem', 
           color: 'var(--warning)', 
           textTransform: 'uppercase', 
           letterSpacing: '0.1em',
           marginBottom: '1rem',
           fontFamily: 'serif' 
         }}>
           Certification d'Excellence Budgétaire
         </h2>

         <div style={{ width: '200px', height: '1px', background: 'var(--warning)', margin: '1.5rem auto' }}></div>

         <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.8, lineHeight: '1.8' }}>
           Par la présente, le système **SIGB Intelli - DeepMind Core** certifie que <br/>
           <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>L'INSTITUTION {industryMode === 'hospitalier' ? 'HOGGY (HÔPITAL GYGÉNÉTIQUE)' : 'CORPORATE INTELLI'}</span> <br/>
           a satisfait à l'ensemble des critères d'intégrité, de transparence et d'optimisation prédictive <br/>
           pour l'exercice fiscal en cours.
         </p>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
               <ShieldCheck size={20} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Audit de Probité</div>
               <div style={{ fontWeight: 700 }}>Conforme (100%)</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
               <Award size={20} color="var(--warning)" style={{ marginBottom: '0.5rem' }} />
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Opti. Ressources</div>
               <div style={{ fontWeight: 700 }}>Grade S+</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
               <ShieldCheck size={20} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Souveraineté IA</div>
               <div style={{ fontWeight: 700 }}>Certifiée</div>
            </div>
         </div>

         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 2rem' }}>
            <div style={{ textAlign: 'left' }}>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Authenticité Blockchain</div>
               <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <QrCode size={60} color="white" />
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, fontFamily: 'monospace' }}>
                    0x882A...F921<br/>
                    SIGB-CIA-2026<br/>
                    {new Date().toLocaleDateString('fr-FR')}
                  </div>
               </div>
            </div>
            <div style={{ textAlign: 'right' }}>
               <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sceau du Commissariat aux Comptes IA</div>
               <div style={{ width: '150px', height: '60px', border: '1px dashed var(--warning)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 700 }}>SEAL OF INTEGRITY</span>
               </div>
            </div>
         </div>
      </div>

      <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
         <button className="btn btn-icon" style={{ gap: '0.5rem', padding: '0.75rem 1.5rem' }}><Printer size={18} /> Imprimer l'original</button>
      </div>

    </div>
  );
};

export default GoldCertificate;
