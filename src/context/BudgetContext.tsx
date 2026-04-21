import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BudgetLine {
  id: string;
  ref: string;
  desc: string;
  n2: number;
  n1: number;
  n: number;
  n1p: number;
}

export interface Engagement {
  id: string;
  obj: string;
  service: string;
  amt: number;
  budg: string;
  stat: 'besoin' | 'visa' | 'approved' | 'rejected' | 'commande' | 'paye';
  date: string;
}

export interface DBM {
  id: string;
  sourceLine: string;
  targetLine: string;
  amt: number;
  motif: string;
  stat: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface Recette {
  id: string;
  titre: string;
  source: string;
  compte: string;
  montant: number;
  stat: 'encaisse' | 'previsionnel' | 'retard';
  date: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  detail: string;
  ip: string;
}

export interface DocumentGED {
  id: string;
  fileName: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'scanning' | 'analyzed' | 'error';
  extractedData?: string;
  relatedModule?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  acquisitionDate: string;
  cost: number;
  lifeSpan: number; // en années
  currentValue: number;
}

export interface Anomaly {
  id: string;
  type: 'duplicate' | 'threshold_bypass' | 'unusual_amount';
  severity: 'low' | 'medium' | 'high';
  desc: string;
  date: string;
  relatedId: string;
}

export interface SimulationScenario {
  id: string;
  name: string;
  date: string;
  adjustments: { [key: string]: number }; // multiplication factors
}

export interface Connector {
  id: string;
  name: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string;
  type: 'bank' | 'treasury' | 'hr';
}

export interface WorkflowStep {
  id: string;
  label: string;
  role: string;
  threshold: number; // Montant min pour déclencher cette étape
}

export interface BudgetProposal {
  id: string;
  title: string;
  desc: string;
  author: string;
  budgetedAmt: number;
  votes: number;
  date: string;
}

export interface CostRecommendation {
  id: string;
  category: string;
  potentialSaving: number;
  desc: string;
  impact: 'low' | 'medium' | 'high';
}

export interface AutonomousStrategy {
  status: 'idle' | 'optimizing' | 'completed';
  lastRun: string;
  recommendations: string[];
  projectedEfficiency: number;
}

export interface KGNode {
  id: string;
  label: string;
  type: 'service' | 'budget_line' | 'revenue';
  val: number;
}

export interface KGEdge {
  source: string;
  target: string;
  weight: number;
}

interface BudgetContextType {
  budgetLines: BudgetLine[];
  engagements: Engagement[];
  dbms: DBM[];
  recettes: Recette[];
  auditLogs: AuditLog[];
  documents: DocumentGED[];
  industryMode: 'hospitalier' | 'entreprise';
  setIndustryMode: (mode: 'hospitalier' | 'entreprise') => void;
  updateBudgetLine: (id: string, newN1p: number) => void;
  addEngagement: (engagement: Omit<Engagement, 'id' | 'date' | 'stat'>) => void;
  updateEngagementStatus: (id: string, status: Engagement['stat']) => void;
  addDBM: (dbm: Omit<DBM, 'id' | 'date' | 'stat'>) => void;
  approveDBM: (id: string) => void;
  addRecette: (recette: Omit<Recette, 'id' | 'date'> & { stat?: Recette['stat'] }) => void;
  updateRecetteStatus: (id: string, stat: Recette['stat']) => void;
  addDocument: (doc: Omit<DocumentGED, 'id' | 'uploadDate' | 'status'>) => void;
  simulateDocAnalysis: (id: string, extractedData: string) => void;
  t: (key: string) => string;
  workflowSteps: WorkflowStep[];
  updateWorkflowThreshold: (id: string, value: number) => void;
  getNextStep: (eng: Engagement) => WorkflowStep | 'approved' | null;
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'currentValue'>) => void;
  amortizationMethod: 'linear' | 'declining';
  setAmortizationMethod: (method: 'linear' | 'declining') => void;
  getForecast: () => { totalProjected: number; status: 'safe' | 'warning' | 'critical' };
  anomalies: Anomaly[];
  scenarios: SimulationScenario[];
  connectors: Connector[];
  addScenario: (name: string, adjustments: { [key: string]: number }) => void;
  deleteScenario: (id: string) => void;
  proposals: BudgetProposal[];
  addProposal: (proposal: Omit<BudgetProposal, 'id' | 'votes' | 'date'>) => void;
  voteProposal: (id: string) => void;
  costRecommendations: CostRecommendation[];
  deepMind: AutonomousStrategy;
  kgData: { nodes: KGNode[], edges: KGEdge[] };
  runDeepMindOptimization: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [industryMode, setIndustryMode] = useState<'hospitalier' | 'entreprise'>('entreprise');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'LOG-88231', timestamp: new Date().toISOString(), user: 'Mamadou Dia (DSI)', action: 'CONNEXION_SSO', module: 'Auth', detail: 'Authentification via SAML 2.0 réussie', ip: '197.214.23.11' }
  ]);

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: 'step-manager', label: 'Validation Manager', role: 'Direction des Achats', threshold: 0 },
    { id: 'step-finance', label: 'Contrôle DAF', role: 'Directeur Financier (DAF)', threshold: 1000000 },
    { id: 'step-dg', label: 'Approbation DG / Board', role: 'PDG / General Manager', threshold: 5000000 },
  ]);

  const [assets, setAssets] = useState<Asset[]>([
    { id: 'AST-001', name: industryMode === 'hospitalier' ? 'Scanner IRM Philips' : 'Serveur GPU A100', category: 'Matériel', acquisitionDate: '01/01/2026', cost: 45000000, lifeSpan: 5, currentValue: 42000000 }
  ]);
  const [amortizationMethod, setAmortizationMethod] = useState<'linear' | 'declining'>('linear');

  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    { id: 'ANM-001', type: 'unusual_amount', severity: 'high', desc: 'Engagement ENG-2026-089 (DSI) dépasse de 150% la moyenne historique du mois d\'avril.', date: '12 Avr 2026', relatedId: 'ENG-2026-089' },
    { id: 'ANM-002', type: 'threshold_bypass', severity: 'medium', desc: 'Possibilité de fractionnement détectée entre ENG-101 et ENG-102 (même fournisseur, montants complémentaires).', date: '10 Avr 2026', relatedId: 'ENG-101' }
  ]);

  const [scenarios, setScenarios] = useState<SimulationScenario[]>([
    { id: 'SCN-1', name: 'Scénario Optimiste (+10% Subventions)', date: '13 Avr 2026', adjustments: { revenues: 1.1 } },
    { id: 'SCN-2', name: 'Crise Économique (Inflation 15%)', date: '13 Avr 2026', adjustments: { expenses: 1.15 } }
  ]);

  const [connectors, setConnectors] = useState<Connector[]>([
    { id: 'CON-1', name: 'Banque Centrale / Trésor', status: 'connected', lastSync: '13/04/2026 09:00', type: 'treasury' },
    { id: 'CON-2', name: 'Système Paie (HR-Pro)', status: 'disconnected', lastSync: '10/04/2026 18:30', type: 'hr' }
  ]);

  const [proposals, setProposals] = useState<BudgetProposal[]>([
    { id: 'PRP-001', title: 'Flotte Véhicules Électriques', desc: 'Transition vers l\'électrique pour les coursiers du siège.', author: 'Service Logistique', budgetedAmt: 35000000, votes: 12, date: '10/04/2026' },
    { id: 'PRP-002', title: 'Installation Solaire Toitures', desc: 'Réduction de 25% de la facture énergétique annuelle.', author: 'Services Techniques', budgetedAmt: 50000000, votes: 24, date: '08/04/2026' }
  ]);

  const [costRecommendations] = useState<CostRecommendation[]>([
    { id: 'OPT-1', category: 'Télécoms', potentialSaving: 4500000, desc: 'Mutualisation des liens fibre entre filiales.', impact: 'medium' },
    { id: 'OPT-2', category: 'Cloud/SaaS', potentialSaving: 12000000, desc: 'Consolidation des licences Oracle inactives.', impact: 'high' }
  ]);

  const [deepMind, setDeepMind] = useState<AutonomousStrategy>({
    status: 'idle',
    lastRun: '13/04/2026',
    recommendations: [
      'Arbitrage suggéré : -5% sur Frais Déplacement vers Investissement Matériel.',
      'Ajustement prédictif : Hausse de 10% des recettes hospitalières attendue via IA.'
    ],
    projectedEfficiency: 8.5
  });

  const [kgData] = useState({
    nodes: [
      { id: 'S1', label: 'Urgences', type: 'service' as const, val: 80 },
      { id: 'S2', label: 'Radiologie', type: 'service' as const, val: 60 },
      { id: 'B1', label: 'Ligne 601', type: 'budget_line' as const, val: 40 },
      { id: 'R1', label: 'Recettes Propres', type: 'revenue' as const, val: 90 }
    ],
    edges: [
      { source: 'S1', target: 'S2', weight: 0.8 },
      { source: 'S2', target: 'B1', weight: 0.5 },
      { source: 'S1', target: 'R1', weight: 0.9 }
    ]
  });

  const dictionary = {
    entreprise: {
      app_title: 'SIGB Intelli - Corporate ERP',
      engagement: 'Demandes d\'Achats',
      exprimer_besoin: 'Nouvelle Demande',
      visa_finance: 'Validation Finance',
      approbation: 'Approbation Direction',
      dotation: 'Budget Annuel Board',
      recettes: 'Flux de Revenus',
      audit: 'Audit & Commissariat aux Comptes',
      stats: 'Business Intelligence',
      service_term: 'Département',
      arbiter: 'Réconciliation IA (Banque)',
      simulator: 'Lab Simulation Stratégique',
      security: 'Anomaly Hunter (Sécurité)',
      connectors: 'Hub Interopérabilité'
    },
    hospitalier: {
      app_title: 'SIGB Intelli - SI Hospitalier (HOGGY)',
      engagement: 'Expressions de Besoins',
      exprimer_besoin: 'Exprimer Besoin',
      visa_finance: 'Visa Contrôle de Gestion',
      approbation: 'Approbation DG (HOGGY)',
      dotation: 'Dotation Initiale Santé',
      recettes: 'Recettes Hospitalières',
      audit: 'Contrôle État (IGE/IGF)',
      stats: 'Statistiques Sanitaires',
      service_term: 'Unité / Service',
      arbiter: 'Réconciliation Trésor / ACP',
      simulator: 'Lab Simulation (Santé)',
      security: 'Anomaly Hunter (IA LCB-FT)',
      connectors: 'Passerelles État / Trésor'
    }
  };

  const t = (key: string): string => {
    return (dictionary[industryMode] as any)[key] || key;
  };

  const addLog = (user: string, action: string, module: string, detail: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Math.floor(Math.random() * 100000)}`,
      timestamp: new Date().toISOString(),
      user, action, module, detail,
      ip: '197.214.23.11'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([
    { id: '1', ref: '611', desc: 'Achat de matières et fournitures', n2: 12000000, n1: 14500000, n: 15000000, n1p: 16500000 },
    { id: '2', ref: '612', desc: 'Frais de télécommunications', n2: 5000000, n1: 5800000, n: 6000000, n1p: 7200000 },
  ]);

  const [engagements, setEngagements] = useState<Engagement[]>([
    { id: 'ENG-2026-089', obj: 'Renouvellement Licences Oracle', service: 'DSI', amt: 25000000, budg: '614 - Entretien et réparations', stat: 'besoin', date: '12 Avr 2026' }
  ]);

  const [dbms, setDbms] = useState<DBM[]>([]);
  const [recettes, setRecettes] = useState<Recette[]>([]);
  
  const [documents, setDocuments] = useState<DocumentGED[]>([
    { id: 'DOC-1234', fileName: 'Facture_Senelec_0426.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '10 Avr 2026', status: 'analyzed', extractedData: 'Montant: 4,500,000 FCFA | Identifié Ligne: 613', relatedModule: 'Factures & Paiements' },
    { id: 'DOC-1235', fileName: 'Convention_Banque_Mondiale.docx', type: 'Word', size: '1.1 MB', uploadDate: '08 Avr 2026', status: 'analyzed', extractedData: 'Intitulé Fonds | Date de Clôture 2029', relatedModule: 'Recettes' }
  ]);

  const updateBudgetLine = (id: string, newN1p: number) => {
    setBudgetLines(prev => prev.map(line => line.id === id ? { ...line, n1p: newN1p } : line));
    addLog('Mamadou Dia (DSI)', 'MODIFICATION_BUDGET', 'Préparation', `Modification de scénario N+1 (Ligne #${id})`);
  };

  const addEngagement = (eng: Omit<Engagement, 'id' | 'date' | 'stat'>) => {
    const newId = `ENG-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setEngagements([{ ...eng, id: newId, date: new Date().toLocaleDateString('fr-FR'), stat: 'besoin' }, ...engagements]);
    addLog('Mamadou Dia (DSI)', 'EXPRESSION_BESOIN', 'Engagements', `Création demande: ${newId} (${eng.amt} FCFA)`);
  };

  const updateEngagementStatus = (id: string, stat: Engagement['stat']) => {
    setEngagements(prev => prev.map(e => e.id === id ? { ...e, stat } : e));
    addLog('Mamadou Dia (DSI)', 'VISAS_ENGAGEMENT', 'Engagements', `Changement statut ${id} -> ${stat.toUpperCase()}`);
  };

  const updateWorkflowThreshold = (id: string, value: number) => {
    setWorkflowSteps(prev => prev.map(s => s.id === id ? { ...s, threshold: value } : s));
    addLog('Mamadou Dia (DSI)', 'CONFIG_WORKFLOW', 'Paramètres', `Mise à jour seuil étape ${id} : ${value} FCFA`);
  };

  const getNextStep = (eng: Engagement): WorkflowStep | 'approved' | null => {
    if (eng.stat === 'approved' || eng.stat === 'rejected') return null;
    
    // Troubleshooting: find steps that are active for this amount
    const activeSteps = workflowSteps.filter(s => eng.amt >= s.threshold);
    
    if (eng.stat === 'besoin') {
      return activeSteps.length > 0 ? activeSteps[0] : 'approved';
    }
    
    // If current status is a step ID, find the next one
    const currentIndex = activeSteps.findIndex(s => s.id === eng.stat);
    if (currentIndex === -1) {
      // Current stat might be an old hardcoded one or not in active steps
      return activeSteps.length > 0 ? activeSteps[0] : 'approved';
    }
    
    if (currentIndex < activeSteps.length - 1) {
      return activeSteps[currentIndex + 1];
    }
    
    return 'approved';
  };

  const addDBM = (dbm: Omit<DBM, 'id' | 'date' | 'stat'>) => {
    const newId = `DBM-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setDbms([{ ...dbm, id: newId, date: new Date().toLocaleDateString('fr-FR'), stat: 'pending' }, ...dbms]);
    addLog('Mamadou Dia (DSI)', 'CREATION_DBM', 'DBM', `Demande DBM: ${newId}`);
  };

  const approveDBM = (id: string) => {
    setDbms(prev => prev.map(d => d.id === id ? { ...d, stat: 'approved' } : d));
    addLog('Mamadou Dia (DSI)', 'APPROBATION_DBM', 'DBM', `DBM ${id} visée et applicable.`);
  };

  const addRecette = (rec: Omit<Recette, 'id' | 'date'>) => {
    const newId = `REC-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setRecettes([{ ...rec, id: newId, date: new Date().toLocaleDateString('fr-FR') }, ...recettes]);
    addLog('Mamadou Dia (DSI)', 'LIGNE_RECETTE', 'Recettes', `Ajout titre de recette ${newId}`);
  };

  const updateRecetteStatus = (id: string, stat: Recette['stat']) => {
    setRecettes(prev => prev.map(r => r.id === id ? { ...r, stat } : r));
    addLog('Mamadou Dia (DSI)', 'ENCAISSEMENT', 'Recettes', `Titre ${id} marqué comme ${stat.toUpperCase()}`);
  };

  const addDocument = (doc: Omit<DocumentGED, 'id' | 'uploadDate' | 'status'>) => {
    const newId = `DOC-${Math.floor(Math.random() * 10000)}`;
    setDocuments([{ ...doc, id: newId, uploadDate: new Date().toLocaleDateString('fr-FR'), status: 'scanning' }, ...documents]);
    addLog('Mamadou Dia (DSI)', 'IMPORT_GED', 'Module IA', `Importation document: ${doc.fileName}`);
  };

  const simulateDocAnalysis = (id: string, extractedData: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: 'analyzed', extractedData } : d));
    addLog('Assistant IA (Scanner)', 'OCR_EXTRACTION', 'Module IA', `Analyse IA terminée pour Doc ${id}`);
  };

  const addAsset = (ast: Omit<Asset, 'id' | 'currentValue'>) => {
    const newId = `AST-${Math.floor(Math.random() * 1000)}`;
    setAssets(prev => [{ ...ast, id: newId, currentValue: ast.cost }, ...prev]);
    addLog('Mamadou Dia (DSI)', 'AJOUT_ACTIF', 'Patrimoine', `Nouvel actif immobilisé : ${ast.name}`);
  };

  const getForecast = () => {
    const totalEng = engagements.reduce((acc, curr) => acc + curr.amt, 0);
    const totalAllocated = budgetLines.reduce((acc, curr) => acc + curr.n1, 0);
    
    // Simulating 4 months elapsed for demo
    const monthsElapsed = 4;
    const monthlyBurn = totalEng / monthsElapsed;
    const projected = monthlyBurn * 12;
    
    let status: 'safe' | 'warning' | 'critical' = 'safe';
    if (projected > totalAllocated) status = 'critical';
    else if (projected > totalAllocated * 0.85) status = 'warning';
    
    return { totalProjected: projected, status };
  };

  const addScenario = (name: string, adjustments: { [key: string]: number }) => {
    const newId = `SCN-${Math.floor(Math.random() * 1000)}`;
    setScenarios([{ id: newId, name, adjustments, date: new Date().toLocaleDateString('fr-FR') }, ...scenarios]);
    addLog('Mamadou Dia (DSI)', 'CREATION_SCENARIO', 'Lab Simulation', `Nouveau scénario de simulation : ${name}`);
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const addProposal = (prop: Omit<BudgetProposal, 'id' | 'votes' | 'date'>) => {
    const newId = `PRP-${Math.floor(Math.random() * 1000)}`;
    setProposals([{ ...prop, id: newId, votes: 0, date: new Date().toLocaleDateString('fr-FR') }, ...proposals]);
    addLog('Mamadou Dia (DSI)', 'PROPOSITION_BUDGET', 'Budget Participatif', `Nouveau projet déposé : ${prop.title}`);
  };

  const voteProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
  };

  const runDeepMindOptimization = () => {
    setDeepMind(prev => ({ ...prev, status: 'optimizing' }));
    setTimeout(() => {
      setDeepMind(prev => ({ 
        ...prev, 
        status: 'completed', 
        lastRun: new Date().toLocaleDateString('fr-FR'),
        projectedEfficiency: prev.projectedEfficiency + 1.2
      }));
      addLog('AlphaBudget Core', 'IA_OPTIMIZATION', 'DeepMind', 'Optimisation par renforcement terminée avec succès.');
    }, 4000);
  };

  return (
    <BudgetContext.Provider value={{
      budgetLines, engagements, dbms, recettes, auditLogs, documents, industryMode,
      setIndustryMode, updateBudgetLine, addEngagement, updateEngagementStatus, addDBM, approveDBM,
      addRecette, updateRecetteStatus, addDocument, simulateDocAnalysis, t,
      workflowSteps, updateWorkflowThreshold, getNextStep,
      assets, addAsset, amortizationMethod, setAmortizationMethod, getForecast,
      anomalies, scenarios, connectors, addScenario, deleteScenario,
      proposals, addProposal, voteProposal, costRecommendations,
      deepMind, kgData, runDeepMindOptimization
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) throw new Error('useBudget must be used within a BudgetProvider');
  return context;
};
