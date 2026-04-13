import React, { useState } from 'react';
import { Sparkles, FileText, Wand2, ArrowRight, Download, Send, RefreshCw } from 'lucide-react';

const IAReportsPage: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Trimestriel');

  const handleGenerate = () => {
    setGenerating(true);
    setReportReady(false);
    setTimeout(() => {
      setGenerating(false);
      setReportReady(true);
    }, 2800);
  };

  const templates = [
    { title: 'Exécution Trimestrielle', id: 'Trimestriel', desc: 'Rapport DFC standard pour le Ministère central. Synthèse narrative + KPIs.' },
    { title: 'Note aux Bailleurs de Fonds', id: 'Bailleurs', desc: 'Focus sur les décaissements BM/AFD et conformité ESG.' },
    { title: 'Synthèse de Clôture Annuelle', id: 'Cloture', desc: 'Squelette du rapport de présentation du compte administratif.' },
  ];

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Générateur IA de Rapports et Modèles</h1>
          <p>Moteur NLP pour la rédaction narrative des rapports basés sur l'exécution financière</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Templates Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Modèles d'entraînement
          </h3>
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                border: selectedTemplate === tpl.id ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                background: selectedTemplate === tpl.id ? 'rgba(139, 92, 246, 0.1)' : 'var(--surface-color)',
                transition: 'all 0.2s ease',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <FileText size={18} color={selectedTemplate === tpl.id ? 'var(--secondary)' : 'var(--text-muted)'} />
                <h4 style={{ color: selectedTemplate === tpl.id ? 'white' : 'var(--text-muted)', fontSize: '1.05rem' }}>
                  {tpl.title}
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{tpl.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Generator Panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="ai-icon-wrapper" style={{ width: '48px', height: '48px', animation: generating ? 'pulseGlow 1s infinite' : 'none' }}>
              <Sparkles size={24} color="var(--secondary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem' }}>Assistant de Rédaction ({selectedTemplate})</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Connecté au modèle de langage spécialisé Finance Publique UEMOA</p>
            </div>
          </div>

          {!reportReady && !generating && (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <Wand2 size={48} color="var(--text-muted)" style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                Le modèle va analyser les données de consommation budgétaire actuelles (les engagements, les dépenses effectives et les recettes) et générer une synthèse rédigée.
              </p>
              <button className="btn btn-primary" onClick={handleGenerate} style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                <Sparkles size={20} />
                Compiler et Rédiger le document
              </button>
            </div>
          )}

          {generating && (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={40} color="var(--secondary)" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>Synthèse IA en cours...</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Analyse des écarts et construction narrative...</p>
            </div>
          )}

          {reportReady && !generating && (
            <div className="animate-fade-in" style={{ flexGrow: 1 }}>
              <div style={{ background: 'var(--surface-color-light)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'serif', overflowY: 'auto', maxHeight: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'white' }}>Rapport d'Exécution Trimestriel</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '1rem' }}>
                  <strong>Résumé Exécutif :</strong> Au terme du présent trimestre, l'exécution budgétaire présente une dynamique modérée. Le taux de consommation global s'établit à 34,2%, témoignant d'une maîtrise des dépenses courantes. 
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '1rem' }}>
                  <strong>Analyse détaillée :</strong> Les dotations initiales allouées aux directions opérationnelles ont été consommées de façon asymétrique. La Direction des Systèmes d'Information (DSI) présente le niveau d'engagement le plus fort, justifié par les renouvellements structurels de Licences (+12.5% vs N-1). 
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#e2e8f0' }}>
                  <strong>Recommandations (Générées par l'IA) :</strong>
                  <br/>- Opérer une DBM de régularisation sur la ligne 611 due à une sur-sollicitation ponctuelle.
                  <br/>- Accélérer le recouvrement externe (Banque Mondiale) pour équilibrer la trésorerie.
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="btn" style={{ background: 'var(--surface-color-light)', color: 'white' }}>
                  <span style={{ fontSize: '1.1rem' }}>Éditer le texte</span>
                </button>
                <button className="btn btn-primary">
                  <Download size={18} />
                  Exporter au format Word
                </button>
                <button className="btn btn-primary" style={{ background: 'var(--success)' }}>
                  <Send size={18} />
                  Diffuser (Signature)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default IAReportsPage;
