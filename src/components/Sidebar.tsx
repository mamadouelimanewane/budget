import React from 'react';
import { 
  LayoutDashboard, Wallet, FileText, Receipt, 
  CreditCard, PieChart, Settings, Repeat, Briefcase, 
  ShoppingCart, Package, ShieldCheck, CheckSquare, CloudUpload,
  Calendar, Archive, MessageSquareDiff
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      <div className="brand">
        <div className="brand-icon">
          <Wallet size={20} color="white" />
        </div>
        <span className="brand-text">SIGB Intelli</span>
      </div>
      
      <nav className="nav-menu">
        <div className="nav-group">
          <div className="nav-group-title">Pilotage</div>
          <a onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Tableau de Bord</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Intelligence Artificielle</div>
          <a onClick={() => setActiveTab('ia_reports')} className={`nav-item ${activeTab === 'ia_reports' ? 'active' : ''}`}>
             <MessageSquareDiff size={18} />
             <span>Rédaction de Rapports IA</span>
          </a>
          <a onClick={() => setActiveTab('ged')} className={`nav-item ${activeTab === 'ged' ? 'active' : ''}`}>
             <CloudUpload size={18} />
             <span>Scanner IA & GED</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Préparation & Arbitrage</div>
          <a onClick={() => setActiveTab('preparation')} className={`nav-item ${activeTab === 'preparation' ? 'active' : ''}`}>
            <FileText size={18} />
            <span>Préparation Budgétaire</span>
          </a>
          <a onClick={() => setActiveTab('allocation')} className={`nav-item ${activeTab === 'allocation' ? 'active' : ''}`}>
            <Briefcase size={18} />
            <span>Allocation aux Services</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Modifications</div>
          <a onClick={() => setActiveTab('dbm')} className={`nav-item ${activeTab === 'dbm' ? 'active' : ''}`}>
            <Repeat size={18} />
            <span>Saisie & Suivi DBM</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Dépenses & Achats</div>
          <a onClick={() => setActiveTab('engagements')} className={`nav-item ${activeTab === 'engagements' ? 'active' : ''}`}>
            <ShoppingCart size={18} />
            <span>Expression & Engagements</span>
          </a>
          <a onClick={() => setActiveTab('commandes')} className={`nav-item ${activeTab === 'commandes' ? 'active' : ''}`}>
            <Package size={18} />
            <span>Commandes & Réceptions</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Ressources</div>
          <a onClick={() => setActiveTab('recettes')} className={`nav-item ${activeTab === 'recettes' ? 'active' : ''}`}>
            <CreditCard size={18} />
            <span>Registre des Recettes</span>
          </a>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">Conformité & Contrôle</div>
          <a onClick={() => setActiveTab('rapports')} className={`nav-item ${activeTab === 'rapports' ? 'active' : ''}`}>
            <PieChart size={18} />
            <span>États SYSCOHADA</span>
          </a>
          <a onClick={() => setActiveTab('audit')} className={`nav-item ${activeTab === 'audit' ? 'active' : ''}`}>
            <ShieldCheck size={18} />
            <span>Espace Audit (IGF)</span>
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
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
