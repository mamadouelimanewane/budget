import React, { useState } from 'react';
import { Smartphone, Check, X, Shield, Clock, Send, CreditCard, PieChart } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const ExecutiveMobile: React.FC = () => {
  const { engagements, updateEngagementStatus, t } = useBudget();
  const pendingEng = engagements.filter(e => e.stat === 'besoin' || e.stat === 'visa');
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = pendingEng[currentIndex];

  const handleAction = (status: 'approved' | 'rejected') => {
    if (current) {
      updateEngagementStatus(current.id, status);
      if (currentIndex < pendingEng.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <div className="dashboard-view animate-fade-in" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        
        {/* EXPLANATION */}
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Executive Pulse</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
            L'aperçu de votre plateforme en version mobile. Conçu pour les décideurs, cet espace permet une validation tactile ultra-rapide des flux financiers, même en déplacement.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                <Shield size={20} color="var(--success)" />
                <div style={{ fontSize: '0.9rem' }}>Signature électronique eIDAS intégrée</div>
             </div>
             <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                <Clock size={20} color="var(--primary)" />
                <div style={{ fontSize: '0.9rem' }}>Réduction de 80% des délais de visa</div>
             </div>
          </div>
        </div>

        {/* MOBILE FRAME MOCKUP */}
        <div style={{ 
          width: '320px', 
          height: '640px', 
          background: '#0a0a0a', 
          borderRadius: '40px', 
          border: '12px solid #1a1a1a', 
          position: 'relative', 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          justifySelf: 'center'
        }}>
          {/* NOTCH */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', background: '#1a1a1a', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 10 }}></div>
          
          {/* MOBILE CONTENT */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
             {/* APP TOP BAR */}
             <div style={{ padding: '40px 20px 20px', background: 'var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700 }}>SIGB Mobile</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <CreditCard size={18} />
                   <PieChart size={18} />
                </div>
             </div>

             <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                <h4 style={{ marginBottom: '1rem' }}>Visas en Attente ({pendingEng.length})</h4>
                
                {current ? (
                  <div className="glass-panel animate-slide-up" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{current.id} • {current.date}</div>
                    <div style={{ fontWeight: 700, margin: '0.5rem 0', fontSize: '1.1rem' }}>{current.obj}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Service: {current.service}</div>
                    
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>
                      {current.amt.toLocaleString()} FCFA
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                       <button onClick={() => handleAction('rejected')} style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '10px', color: '#ff4d4d', display: 'flex', justifyContent: 'center' }}>
                          <X size={20} />
                       </button>
                       <button onClick={() => handleAction('approved')} style={{ flex: 1, background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '12px', borderRadius: '10px', color: 'var(--primary)', display: 'flex', justifyContent: 'center' }}>
                          <Check size={20} />
                       </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                     <Check size={48} style={{ marginBottom: '1rem' }} />
                     <p>Tout est visé !</p>
                  </div>
                )}

                <div style={{ marginTop: '2rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dernières Transactions</div>
                   {[1,2,3].map(i => (
                     <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '0.75rem' }}>Fournisseur {i}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>-150,000 F</div>
                     </div>
                   ))}
                </div>
             </div>

             {/* APP BOTTOM NAV */}
             <div style={{ padding: '15px 20px 30px', background: '#111', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Smartphone size={18} color="var(--primary)" />
                <Send size={18} opacity={0.3} />
                <CreditCard size={18} opacity={0.3} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExecutiveMobile;
