import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Download, Play, PieChart, TrendingUp, ShieldCheck, Share2 } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import BudgetFlow from '../components/BudgetFlow';

const Presentation: React.FC = () => {
  const { budgetLines, t, industryMode, getForecast } = useBudget();
  const [currentSlide, setCurrentSlide] = useState(0);
  const forecast = getForecast();
  
  const totalEng = 125000000; // Simulated for slides
  const totalAlloc = budgetLines.reduce((acc, curr) => acc + curr.n1, 0);

  const slides = [
    {
      title: "Rapport de Performance Stratégique",
      subtitle: industryMode === 'hospitalier' ? "Hôpital Gygénétique (HOGGY) - Session 2026" : "Groupe Intelli - Revue de Gouvernance N+1",
      icon: <Play size={64} />,
      content: (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
            Garantir la Souveraineté par la Donnée
          </div>
          <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Direction Générale & Direction Financière</p>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
             <div className="glass-panel" style={{ padding: '1.5rem', borderBottom: '4px solid var(--success)' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Disponibilité Budgétaire</div>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>96.2%</div>
             </div>
             <div className="glass-panel" style={{ padding: '1.5rem', borderBottom: '4px solid var(--warning)' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Indice de Confiance Audit</div>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>Grade A+</div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "Navigation des Flux Financiers",
      subtitle: "Traçabilité bi-directionnelle : Origine vs Destination",
      content: (
        <div style={{ height: '450px', marginTop: '2rem' }}>
          <BudgetFlow />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '2rem' }}>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ressources Assurées</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{totalAlloc.toLocaleString()} FCFA</div>
             </div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Consommation Active</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{totalEng.toLocaleString()} FCFA</div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "Intelligence Prédictive & Risques",
      subtitle: "Analyse du Burn-Rate et Projection de Fin d'Exercice",
      content: (
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
             <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <TrendingUp color="var(--primary)" /> Projection de Clôture
             </h4>
             <div style={{ fontSize: '3rem', fontWeight: 800, color: forecast.status === 'critical' ? 'var(--danger)' : 'var(--success)' }}>
               {forecast.totalProjected.toLocaleString()} FCFA
             </div>
             <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
               Sur la base des dépenses actuelles, le système anticipe un atterrissage budgétaire conforme aux objectifs de {industryMode === 'hospitalier' ? 'l\'État' : 'la Direction'}.
             </p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
             <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <ShieldCheck color="var(--success)" /> Statut Gouvernance
             </h4>
             <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                   <span>Circuit de Validation eIDAS</span>
                   <span style={{ color: 'var(--success)', fontWeight: 600 }}>ACTIF</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                   <span>Audit Blockchain Interne</span>
                   <span style={{ color: 'var(--success)', fontWeight: 600 }}>CONFORME</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                   <span>Réconciliation IA</span>
                   <span style={{ color: 'var(--success)', fontWeight: 600 }}>SYNC (100%)</span>
                </li>
             </ul>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="dashboard-view animate-fade-in" style={{ padding: 0, height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
      <div className="dashboard-header" style={{ padding: '1rem 2rem', background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '4px' }}>
              <Maximize2 size={16} color="white" />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Board Presentation Mode <span style={{ opacity: 0.4, fontWeight: 400 }}>v2.5</span></h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="btn btn-icon" title="Exporter en PPTX" onClick={() => alert("Présentation exportée : Board_Presentation_SIGB_2026.pptx")}><Download size={18} /></button>
             <button className="btn btn-icon" title="Partager Lien Sécurisé" onClick={() => alert("Lien sécurisé généré et copié dans le presse-papier.")}><Share2 size={18} /></button>
          </div>
        </div>
      </div>

      <div style={{ height: 'calc(100% - 70px)', display: 'flex', position: 'relative' }}>
         {/* SLIDE CONTENT */}
         <div style={{ flex: 1, padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1000px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '40px', height: '4px', background: 'var(--primary)' }} />
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>Slide {currentSlide + 1} / {slides.length}</span>
               </div>
               <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{slides[currentSlide].title}</h1>
               <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>{slides[currentSlide].subtitle}</p>

               {slides[currentSlide].content}
            </div>
         </div>

         {/* CONTROLS */}
         <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button className="btn btn-icon" onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem' }}>
               <ChevronLeft size={24} />
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
               {slides.map((_, idx) => (
                 <div key={idx} style={{ 
                   width: idx === currentSlide ? '24px' : '10px', 
                   height: '10px', 
                   borderRadius: '5px', 
                   background: idx === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                   transition: '0.3s'
                 }} />
               ))}
            </div>
            <button className="btn btn-icon" onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem' }}>
               <ChevronRight size={24} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Presentation;
