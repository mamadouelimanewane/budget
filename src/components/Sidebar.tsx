  Calendar, Archive, MessageSquareDiff, FlaskConical, 
  Fingerprint, Share2, Globe, Activity
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

        <div className="nav-group">
          <div className="nav-group-title">Contrôle & Sécurité</div>
          <a onClick={() => setActiveTab('rapports')} className={`nav-item ${activeTab === 'rapports' ? 'active' : ''}`}>
            <PieChart size={18} />
            <span>États SYSCOHADA</span>
          </a>
          <a onClick={() => setActiveTab('security_hunter')} className={`nav-item ${activeTab === 'security_hunter' ? 'active' : ''}`}>
             <Fingerprint size={18} />
             <span>{t('security')}</span>
          </a>
          <a onClick={() => setActiveTab('audit')} className={`nav-item ${activeTab === 'audit' ? 'active' : ''}`}>
            <ShieldCheck size={18} />
            <span>{t('audit')}</span>
          </a>
          <a onClick={() => setActiveTab('archivage')} className={`nav-item ${activeTab === 'archivage' ? 'active' : ''}`}>
             <Archive size={18} />
             <span>Archivage Légal</span>
          </a>
        </div>

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
    </aside>
  );
};

export default Sidebar;
