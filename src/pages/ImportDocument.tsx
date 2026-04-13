import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, CheckCircle, FileText, Image as ImageIcon, Sparkles, Box, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const ImportDocument: React.FC = () => {
  const { documents, addDocument, simulateDocAnalysis, addEngagement, addRecette, t, industryMode } = useBudget();
  const [isDragging, setIsDragging] = useState(false);
  const isHospital = industryMode === 'hospitalier';
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if(type.includes('PDF')) return <FileText size={24} color="#ef4444" />;
    if(type.includes('Excel') || type.includes('Spreadsheet')) return <FileSpreadsheet size={24} color="#10b981" />;
    if(type.includes('Image') || type.includes('JPG') || type.includes('PNG')) return <ImageIcon size={24} color="#3b82f6" />;
    return <FileType size={24} color="#8b5cf6" />;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Generate type
    let docType = 'Inconnu';
    if(file.type.includes('pdf')) docType = 'PDF';
    else if(file.type.includes('word') || file.name.endsWith('.docx')) docType = 'Word';
    else if(file.type.includes('excel') || file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) docType = 'Excel';
    else if(file.type.startsWith('image/')) docType = 'Image';
    else docType = file.name.split('.').pop()?.toUpperCase() || 'Document';

    addDocument({
      fileName: file.name,
      type: docType,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      relatedModule: 'Factures / Achats' // Par défaut
    });

    // Simulate AI processing returning after 3 seconds
    setTimeout(() => {
      // Very basic random ID to pick the latest doc, ideally we should pass it or track it.
      // Assuming it's added at the front [0].
      const fakeResult = file.type.includes('image') || file.name.toLowerCase().includes('facture') 
          ? 'Extraction OCR réussie: Reconnaissance Montant TTC et N° fournisseur avec 98% de certitude.'
          : 'Extraction de métadonnées sémantiques: Document indexé en base de connaissances.';
      
      // Mettre à jour (using a simple trick, we'll just force the whole list to update in a real app,
      // here we just fetch context documents logic via a setTimeout hack since we don't know the generated ID in frontend immediately unless returned).
      // We'll trust the latest doc logic. But better to pass fake ID logic if needed.
    }, 3000);
  };

  // Mock complete function for the generic UI
  const triggerFakeAnalysisCompleter = (id: string, name: string) => {
    const isFacture = name.toLowerCase().includes('facture') || name.toLowerCase().includes('inv');
    const data = isFacture
        ? 'OCR [Facture]: MNT=4,500,500 XOF | Compte: 614 | Fournisseur: Senelec'
        : 'NLP [Contrat/Titre]: Période=24 mois | Budget affecté: DSI | Valeur=12,000,000';
    simulateDocAnalysis(id, data);
  };

  const createFromDoc = (doc: any) => {
    if (doc.fileName.toLowerCase().includes('facture')) {
      addEngagement({
        obj: `Extrait IA: ${doc.fileName}`,
        service: isHospital ? 'Pharmacie' : 'Marketing',
        amt: 4500500,
        budg: '611 - Achat de matières et fournitures'
      });
      alert(`${t('engagement')} créé automatiquement à partir du document.`);
    } else {
      addRecette({
        titre: `Titre extrait: ${doc.fileName}`,
        source: 'AI-Extraction',
        compte: '701',
        montant: 12000000
      });
      alert(`${t('recettes')} créé automatiquement à partir du document.`);
    }
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Module IA & Scanner GED</h1>
          <p>Import universel et extraction sémantique des données {isHospital ? 'hospitalières' : 'corporate'}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* DRAG AND DROP ZONE */}
        <div 
          className={`glass-panel ${isDragging ? 'dragging' : ''}`}
          style={{ 
            padding: '3rem 2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--glass-border)',
            background: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'var(--surface-color)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="ai-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', width: '64px', height: '64px', marginBottom: '1.5rem', animation: 'none' }}>
            <UploadCloud size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Déposer les documents ici</h3>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Formats supportés : PDF, Excel, Word, Images (JPG, PNG).<br/>
            OCR et extraction automatique assurés par le moteur IA.
          </p>
          <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
            Parcourir les fichiers
          </button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg" />
        </div>

        {/* GUIDANCE INFO BANNER */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Sparkles size={28} color="var(--secondary)" />
            <h2 style={{ fontSize: '1.3rem' }}>Workflow Documentaire IA</h2>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', background: 'var(--surface-color-light)', borderRadius: '8px', color: 'var(--success)' }}><FileText size={18} /></div>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>Lecture Automatisée (OCR)</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Le système lit et extrait les montants de vos factures scannées (PDF/Images) et déduit le fournisseur.</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', background: 'var(--surface-color-light)', borderRadius: '8px', color: 'var(--warning)' }}><Box size={18} /></div>
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>Catégorisation (NLP)</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Les gros documents techniques et contrats Excel/Word sont catégorisés et directement indexés.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* DOCUMENT LIST */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Classeur Numérique (GED) & Traitements en cours</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '50px' }}></th>
                <th>Nom du Fichier</th>
                <th>Type</th>
                <th>Taille</th>
                <th>Extrait IA / Résultat</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ textAlign: 'center' }}>
                    {getFileIcon(doc.type)}
                  </td>
                  <td style={{ fontWeight: 500 }}>{doc.fileName}</td>
                  <td>{doc.type}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{doc.size}</td>
                  <td>
                    {doc.status === 'analyzed' ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {doc.extractedData}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Scan heuristique en cours...
                      </span>
                    )}
                  </td>
                  <td>
                    {doc.status === 'scanning' && (
                       <span className="status-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                         Analyse IA en cours
                       </span>
                    )}
                    {doc.status === 'analyzed' && (
                       <span className="status-badge status-completed">
                         Extrait Validé
                       </span>
                    )}
                    {doc.status === 'error' && (
                       <span className="status-badge status-rejected">
                         Erreur de Scan
                       </span>
                    )}
                  </td>
                  <td>
                    {doc.status === 'scanning' ? (
                       <button className="btn-icon" style={{ color: 'var(--primary)' }} onClick={() => triggerFakeAnalysisCompleter(doc.id, doc.fileName)} title="Simuler Fin Analyse">
                         <Sparkles size={16} />
                       </button>
                    ) : (
                       <div style={{ display: 'flex', gap: '0.5rem' }}>
                         <button className="btn" 
                                 onClick={() => createFromDoc(doc)}
                                 style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: 'var(--primary)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Intégrer
                         </button>
                         <button className="btn-icon" style={{ color: 'var(--success)' }}>
                           <CheckCircle size={16} />
                         </button>
                       </div>
                    )}
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', opacity: 0.5 }}>Aucun document déposé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImportDocument;
