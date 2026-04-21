import React from 'react';
import {
  LayoutDashboard, FileText, Briefcase, Repeat, ShoppingCart, Package,
  CreditCard, Activity, PieChart, ShieldCheck, Calendar, Settings,
  Archive, Share2, Fingerprint, FlaskConical, MessageSquareDiff,
  CloudUpload, Wallet,
  Smartphone, Presentation, Zap, Lightbulb,
  Brain, Network, Award
} from 'lucide-react';

import { useBudget } from '../context/BudgetContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, industryMode } = useBudget();
  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      <div className="brand">
        <div className="brand-icon" style={{ background: industryMode === 'hospitalier' ? 'var(--success)' : 'var(--primary)' }}>
          <Wallet size={20} color="white" />
        </div>
        <span className="brand-text" style={{ fontSize: '1rem' }}>{industryMode === 'hospitalier' ? 'SIH HOGGY' : 'Corporate ERP'}</span>
      </div>

      <nav className="nav-menu">

        {/* 1. BUDGET & ARBITRAGE */}
        <div className="nav-group">
          <div className="nav-group-title">Budget & Arbitrage</div>
          <a onClick={() => setActiveTab('preparation')} className={`nav-item ${activeTab === 'preparation' ? 'active' : ''}`}>
            <FileText size={18} />
            <span>Préparation Budgétaire</span>
          </a>
          <a onClick={() => setActiveTab('allocation')} className={`nav-item ${activeTab === 'allocation' ? 'active' : ''}`}>
            <Briefcase size={18} />
            <span>Allocation aux {t('service_term')}s</span>
          </a>
          <a onClick={() => setActiveTab('dbm')} className={`nav-item ${activeTab === 'dbm' ? 'active' : ''}`}>
            <Repeat size={18} />
            <span>Saisie & Suivi DBM</span>
          </a>
        </div>

        {/* 2. DÉPENSES & PATRIMOINE */}
        <div className="nav-group">
          <div className="nav-group-title">Dépenses & Patrimoine</div>
          <a onClick={() => setActiveTab('engagements')} className={`nav-item ${activeTab === 'engagements' ? 'active' : ''}`}>
            <ShoppingCart size={18} />
            <span>{t('engagement')}</span>
          </a>
          <a onClick={() => setActiveTab('commandes')} className={`nav-item ${activeTab === 'commandes' ? 'active' : ''}`}>
            <Package size={18} />
            <span>Commandes & Réceptions</span>
          </a>
          <a onClick={() => setActiveTab('assets')} className={`nav-item ${activeTab === 'assets' ? 'active' : ''}`}>
            <Package size={18} />
            <span>Patrimoine & Actifs</span>
          </a>
        </div>

        {/* 3. RESSOURCES & FLUX */}
        <div className="nav-group">
          <div className="nav-group-title">Ressources & Flux</div>
          <a onClick={() => setActiveTab('recettes')} className={`nav-item ${activeTab === 'recettes' ? 'active' : ''}`}>
            <CreditCard size={18} />
            <span>{t('recettes')}</span>
          </a>
          <a onClick={() => setActiveTab('arbiter')} className={`nav-item ${activeTab === 'arbiter' ? 'active' : ''}`}>
            <Activity size={18} />
            <span>{t('arbiter')}</span>
          </a>
        </div>

        {/* 4. CONTRÔLE & SÉCURITÉ */}
        <div className="nav-group">
          <div className="nav-group-title">Contrôle & Sécurité</div>
          <a onClick={() => setActiveTab('reporting_hub')} className={`nav-item ${activeTab === 'reporting_hub' ? 'active' : ''}`}>
            <PieChart size={18} />
            <span>Hub Editions 360°</span>
          </a>
          <a onClick={() => setActiveTab('security_hunter')} className={`nav-item ${activeTab === 'security_hunter' ? 'active' : ''}`}>
            <Fingerprint size={18} />
            <span>{t('security')}</span>
          </a>
          <a onClick={() => setActiveTab('audit')} className={`nav-item ${activeTab === 'audit' ? 'active' : ''}`}>
            <ShieldCheck size={18} />
            <span>{t('audit')}</span>
          </a>
          <a onClick={() => setActiveTab('gold_certificate')} className={`nav-item ${activeTab === 'gold_certificate' ? 'active' : ''}`}>
            <Award size={18} color="var(--warning)" />
            <span style={{ color: 'var(--warning)', fontWeight: 600 }}>Certification Gold</span>
          </a>
          <a onClick={() => setActiveTab('archivage')} className={`nav-item ${activeTab === 'archivage' ? 'active' : ''}`}>
            <Archive size={18} />
            <span>Archivage Légal</span>
          </a>
        </div>

        {/* 5. VISION & INNOVATION */}
        <div className="nav-group">
          <div className="nav-group-title">Vision & Innovation</div>
          <a onClick={() => setActiveTab('cost_killer')} className={`nav-item ${activeTab === 'cost_killer' ? 'active' : ''}`}>
            <Zap size={18} />
            <span>Cost-Killer IA</span>
          </a>
          <a onClick={() => setActiveTab('participatory')} className={`nav-item ${activeTab === 'participatory' ? 'active' : ''}`}>
            <Lightbulb size={18} />
            <span>Budget Participatif</span>
          </a>
          <a onClick={() => setActiveTab('presentation')} className={`nav-item ${activeTab === 'presentation' ? 'active' : ''}`}>
            <Presentation size={18} />
            <span>Board Presentation</span>
          </a>
          <a onClick={() => setActiveTab('mobile_hub')} className={`nav-item ${activeTab === 'mobile_hub' ? 'active' : ''}`}>
            <Smartphone size={18} />
            <span>Executive Mobile</span>
          </a>
        </div>

        {/* 6. STATISTIQUES & INTELLIGENCE */}
        <div className="nav-group">
          <div className="nav-group-title">Statistiques & Intelligence</div>
          <a onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Tableau de Bord</span>
          </a>
          <a onClick={() => setActiveTab('simulator')} className={`nav-item ${activeTab === 'simulator' ? 'active' : ''}`}>
            <FlaskConical size={18} />
            <span>{t('simulator')}</span>
          </a>
          <a onClick={() => setActiveTab('ia_reports')} className={`nav-item ${activeTab === 'ia_reports' ? 'active' : ''}`}>
            <MessageSquareDiff size={18} />
            <span>Rédaction IA</span>
          </a>
          <a onClick={() => setActiveTab('ged')} className={`nav-item ${activeTab === 'ged' ? 'active' : ''}`}>
            <CloudUpload size={18} />
            <span>Scanner IA & GED</span>
          </a>
        </div>

        {/* 7. INTEL SINGULARITY */}
        <div className="nav-group" style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', borderLeft: '3px solid var(--primary)' }}>
          <div className="nav-group-title" style={{ color: 'var(--primary)', fontWeight: 800 }}>INTEL SINGULARITY</div>
          <a onClick={() => setActiveTab('deepmind_core')} className={`nav-item ${activeTab === 'deepmind_core' ? 'active' : ''}`}>
            <Brain size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700 }}>DEEPMIND CORE</span>
          </a>
          <a onClick={() => setActiveTab('financial_graph')} className={`nav-item ${activeTab === 'financial_graph' ? 'active' : ''}`}>
            <Network size={18} color="var(--primary)" />
            <span>Knowledge Graph</span>
          </a>
        </div>

        {/* 8. ADMINISTRATION */}
        <div className="nav-group">
          <div className="nav-group-title">Administration</div>
          <a onClick={() => setActiveTab('exercices')} className={`nav-item ${activeTab === 'exercices' ? 'active' : ''}`}>
            <Calendar size={18} />
            <span>Gestion des Exercices</span>
          </a>
          <a onClick={() => setActiveTab('connectors')} className={`nav-item ${activeTab === 'connectors' ? 'active' : ''}`}>
            <Share2 size={18} />
            <span>{t('connectors')}</span>
          </a>
          <a onClick={() => setActiveTab('parametres')} className={`nav-item ${activeTab === 'parametres' ? 'active' : ''}`}>
            <Settings size={18} />
            <span>Paramètres</span>
          </a>
        </div>

      </nav>

      <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid var(--warning)33',
          padding: '0.75rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--warning)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Souveraineté Elite</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>v2.5 Release</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
