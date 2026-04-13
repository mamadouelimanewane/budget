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
  addRecette: (recette: Omit<Recette, 'id' | 'date'>) => void;
  updateRecetteStatus: (id: string, stat: Recette['stat']) => void;
  addDocument: (doc: Omit<DocumentGED, 'id' | 'uploadDate' | 'status'>) => void;
  simulateDocAnalysis: (id: string, extractedData: string) => void;
  t: (key: string) => string;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [industryMode, setIndustryMode] = useState<'hospitalier' | 'entreprise'>('entreprise');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'LOG-88231', timestamp: new Date().toISOString(), user: 'Mamadou Dia (DSI)', action: 'CONNEXION_SSO', module: 'Auth', detail: 'Authentification via SAML 2.0 réussie', ip: '197.214.23.11' }
  ]);

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
      service_term: 'Département'
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
      service_term: 'Unité / Service'
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
    { id: 'ENG-2026-089', obj: 'Renouvellement Licences Oracle', service: 'DSI', amt: 25000000, budg: '614 - Entretien et réparations', stat: 'pending', date: '12 Avr 2026' }
  ]);

  const [dbms, setDbms] = useState<DBM[]>([]);
  const [recettes, setRecettes] = useState<Recette[]>([]);
  
  const [documents, setDocuments] = useState<DocumentGED[]>([
    { id: 'DOC-1234', fileName: 'Facture_Senelec_0426.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '10 Avr 2026', status: 'analyzed', extractedData: 'Montant: 4,500,000 XOF | Identifié Ligne: 613', relatedModule: 'Factures & Paiements' },
    { id: 'DOC-1235', fileName: 'Convention_Banque_Mondiale.docx', type: 'Word', size: '1.1 MB', uploadDate: '08 Avr 2026', status: 'analyzed', extractedData: 'Intitulé Fonds | Date de Clôture 2029', relatedModule: 'Recettes' }
  ]);

  const updateBudgetLine = (id: string, newN1p: number) => {
    setBudgetLines(prev => prev.map(line => line.id === id ? { ...line, n1p: newN1p } : line));
    addLog('Mamadou Dia (DSI)', 'MODIFICATION_BUDGET', 'Préparation', `Modification de scénario N+1 (Ligne #${id})`);
  };

  const addEngagement = (eng: Omit<Engagement, 'id' | 'date' | 'stat'>) => {
    const newId = `ENG-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setEngagements([{ ...eng, id: newId, date: new Date().toLocaleDateString('fr-FR'), stat: 'besoin' }, ...engagements]);
    addLog('Mamadou Dia (DSI)', 'EXPRESSION_BESOIN', 'Engagements', `Création demande: ${newId} (${eng.amt} XOF)`);
  };

  const updateEngagementStatus = (id: string, stat: Engagement['stat']) => {
    setEngagements(prev => prev.map(e => e.id === id ? { ...e, stat } : e));
    addLog('Mamadou Dia (DSI)', 'VISAS_ENGAGEMENT', 'Engagements', `Changement statut ${id} -> ${stat.toUpperCase()}`);
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

  return (
    <BudgetContext.Provider value={{
      budgetLines, engagements, dbms, recettes, auditLogs, documents, industryMode,
      setIndustryMode, updateBudgetLine, addEngagement, updateEngagementStatus, addDBM, approveDBM,
      addRecette, updateRecetteStatus, addDocument, simulateDocAnalysis, t
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
