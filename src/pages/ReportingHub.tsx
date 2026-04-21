import React, { useState } from 'react';
import { 
  FileText, Download, PieChart, ShieldCheck, 
  Package, Lightbulb, Search, Filter, 
  ChevronRight, Printer, Share2, Eye
} from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const ReportingHub: React.FC = () => {
  const { t } = useBudget();
  const [activeCategory, setActiveCategory] = useState('all');

  const reportCategories = [
    { id: 'all', label: 'Toutes les Éditions', icon: <FileText size={18} /> },
    { id: 'legal', label: 'Conformité SYSCOHADA', icon: <PieChart size={18} /> },
    { id: 'strategic', label: 'Performance & IA', icon: <Lightbulb size={18} /> },
    { id: 'security', label: 'Audit & Sécurité', icon: <ShieldCheck size={18} /> },
    { id: 'assets', label: 'Patrimoine & Actifs', icon: <Package size={18} /> },
  ];

  const reports = [
    { id: 1, cat: 'legal', title: 'Bilan de Fin d\'Exercice (UEMOA)', desc: 'Rapport complet consolidé selon les normes SYSCOHADA révisées.', priority: 'High' },
    { id: 2, cat: 'strategic', title: 'Analyse Prédictive du Burn-Rate', desc: 'Rapport IA sur la trajectoire budgétaire et points de rupture.', priority: 'Elite' },
    { id: 3, cat: 'security', title: 'Journal d\'Audit des Anomalies', desc: 'Historique des tentatives de fraude et des erreurs de saisie.', priority: 'High' },
    { id: 4, cat: 'assets', title: 'Tableau d\'Amortissement Linéaire', desc: 'Détail de la dépréciation du patrimoine par catégorie.', priority: 'Standard' },
    { id: 5, cat: 'legal', title: 'Compte de Résultat Prévisionnel', desc: 'Estimation des bénéfices/pertes sur la base des engagements.', priority: 'High' },
    { id: 6, cat: 'strategic', title: 'Rapport du Budget Participatif', desc: 'Synthèse des votes et projets d\'innovation retenus.', priority: 'Standard' },
    { id: 7, cat: 'security', title: 'Certificats de Scellement Numérique', desc: 'Preuve d\'intégrité des documents financiers scannés.', priority: 'Elite' },
  ];

  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(r => r.cat === activeCategory);

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Hub d'Éditions Intelli-360</h1>
          <p>Console centrale de reddition de comptes. Générez des rapports PDF haute-fidélité en un clic.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', marginTop: '1rem' }}>
        
        {/* SIDEBAR CATEGORIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {reportCategories.map(cat => (
             <button 
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
               style={{ border: 'none', width: '100%', justifyContent: 'flex-start', cursor: 'pointer' }}
             >
               {cat.icon}
               <span>{cat.label}</span>
             </button>
           ))}

           <div className="glass-panel" style={{ marginTop: '2rem', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Filtre Avancé</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <select className="btn-icon" style={{ padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}>
                    <option>Exercice 2026</option>
                    <option>Exercice 2025</option>
                 </select>
                 <button onClick={() => alert('Filtres appliqués. Rapport mis à jour.')} className="btn btn-primary" style={{ fontSize: '0.8rem' }}><Search size={14} /> Appliquer</button>
              </div>
           </div>
        </div>

        {/* REPORTS GRID */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h3 style={{ textTransform: 'capitalize' }}>{activeCategory === 'all' ? 'Tous les rapports' : activeCategory}</h3>
             <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{filteredReports.length} éditions disponibles</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredReports.map(report => (
              <div key={report.id} className="glass-panel hover-scale" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--primary)'
                    }}>
                       <FileText size={24} />
                    </div>
                    <div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{report.title}</span>
                         {report.priority === 'Elite' && <span className="kpi-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', fontSize: '0.7rem' }}>Souverain AI</span>}
                       </div>
                       <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{report.desc}</div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-icon" title="Aperçu"><Eye size={18} /></button>
                    <button className="btn btn-icon" title="Exporter PDF"><Download size={18} /></button>
                    <button className="btn btn-icon" title="Imprimer"><Printer size={18} /></button>
                 </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
             <button onClick={() => alert('Export en cours... Liasse_Fiscale_2026.zip téléchargé.')} className="btn btn-primary" style={{ padding: '1rem 2rem', gap: '1rem' }}>
                <Share2 size={20} /> Exporter la Liasse Fiscale Complète (Zip)
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportingHub;
