import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PreparationBudget from './pages/PreparationBudget';
import Engagements from './pages/Engagements';
import DBMPage from './pages/DBM';
import RecettesPage from './pages/Recettes';
import AuditPage from './pages/Audit';
import ImportDocument from './pages/ImportDocument';
import ExercicesPage from './pages/Exercices';
import ArchivagePage from './pages/Archivage';
import IAReportsPage from './pages/IAReports';
import Parametres from './pages/Parametres';
import OperationsPaiement from './pages/OperationsPaiement';
import AssetsPage from './pages/Assets';
import Arbiter from './pages/Arbiter';
import Simulator from './pages/Simulator';
import SecurityHunter from './pages/SecurityHunter';
import Connectors from './pages/Connectors';
import CostOptimizer from './pages/CostOptimizer';
import Participatory from './pages/Participatory';
import Presentation from './pages/Presentation';
import ExecutiveMobile from './pages/ExecutiveMobile';
import DeepMindCore from './pages/DeepMindCore';
import FinancialGraph from './pages/FinancialGraph';
import ReportingHub from './pages/ReportingHub';
import GoldCertificate from './pages/GoldCertificate';
import ExtendedModulePlaceholder from './components/ExtendedModulePlaceholder';
import { BudgetProvider } from './context/BudgetContext';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWarRoom, setIsWarRoom] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'preparation': return <PreparationBudget />;
      case 'allocation':
        return <ExtendedModulePlaceholder 
                  title="Allocation aux Services" 
                  desc="Répartition du budget global par direction et par période." 
                  icon="💼" />;
      case 'dbm': return <DBMPage />;
      case 'engagements': return <Engagements />;
      case 'commandes':
        return <ExtendedModulePlaceholder 
                  title="Bons de Commande & Réceptions" 
                  desc="Génération automatique des bons de commande fournisseur de l'hôpital public." 
                  icon="📦" />;
      case 'liquidations': return <OperationsPaiement />;
      case 'assets': return <AssetsPage />;
      case 'ged': return <ImportDocument />;
      case 'ia_reports': return <IAReportsPage />;
      case 'recettes': return <RecettesPage />;
      case 'reporting_hub': return <ReportingHub />;
      case 'audit': return <AuditPage />;
      case 'archivage': return <ArchivagePage />;
      case 'exercices': return <ExercicesPage />;
      case 'parametres': return <Parametres />;
      case 'simulator': return <Simulator />;
      case 'arbiter': return <Arbiter />;
      case 'security_hunter': return <SecurityHunter />;
      case 'connectors': return <Connectors />;
      case 'cost_killer': return <CostOptimizer />;
      case 'participatory': return <Participatory />;
      case 'presentation': return <Presentation />;
      case 'mobile_hub': return <ExecutiveMobile />;
      case 'deepmind_core': return <DeepMindCore />;
      case 'financial_graph': return <FinancialGraph />;
      case 'gold_certificate': return <GoldCertificate />;
      case 'delegations':
        return <ExtendedModulePlaceholder 
                  title="Délégations de Pouvoirs" 
                  desc="Gestion stricte des droits de signature." 
                  icon="✍️" />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`app-container ${isWarRoom ? 'war-room-mode' : ''}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <Header isWarRoom={isWarRoom} setIsWarRoom={setIsWarRoom} />
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <BudgetProvider>
      <AppContent />
    </BudgetProvider>
  );
}

export default App;
