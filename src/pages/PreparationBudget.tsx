import React, { useState } from 'react';
import { FileText, Download, Upload, Filter, Search, CopyPlus } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const PreparationBudget: React.FC = () => {
  const { budgetLines, updateBudgetLine } = useBudget();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEditClick = (id: string, currentVal: number) => {
    setEditingId(id);
    setEditValue(currentVal.toString());
  };

  const handleSave = (id: string) => {
    const val = parseInt(editValue.replace(/\D/g, ''), 10) || 0;
    updateBudgetLine(id, val);
    setEditingId(null);
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Préparation du Budget</h1>
          <p>Saisie multi-exercices et simulations (What-If)</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-icon" onClick={() => alert("Import Excel du budget — fichier chargé.")} title="Importer Excel">
          <Upload size={18} />
          </button>
          <button className="btn btn-icon" onClick={() => alert("Budget N+1 exporté : Budget_Previsionnel_2027.xlsx")} title="Exporter Excel">
          <Download size={18} />
          </button>
          <button onClick={() => alert('Nouveau scénario budgétaire What-If créé.')} className="btn btn-primary">
            <CopyPlus size={18} />
            <span>Nouveau Scénario</span>
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', width: '60%' }}>
            <div className="header-search" style={{ width: '100%' }}>
              <Search size={18} />
              <input type="text" placeholder="Rechercher une ligne budgétaire (ex: 611)..." />
            </div>
            <button className="btn btn-icon" onClick={() => alert("Recherche dans les lignes budgétaires.")} title="Rechercher"><Filter size={18} />
            </button>
          </div>
          <div>
            <select style={{ background: 'var(--surface-color-light)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <option>Direction des Systèmes d'Information</option>
              <option>Direction des Ressources Humaines</option>
              <option>Direction Financière et Comptable</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Compte</th>
                <th style={{ width: '30%' }}>Nature de la charge</th>
                <th>Réalisé N-2</th>
                <th>Réalisé N-1</th>
                <th style={{ color: 'var(--primary)' }}>Budget N (En cours)</th>
                <th style={{ color: 'var(--secondary)' }}>Propos. N+1</th>
                <th>Validation</th>
              </tr>
            </thead>
            <tbody>
              {budgetLines.map((line) => (
                <tr key={line.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{line.ref}</td>
                  <td style={{ fontWeight: 500 }}>{line.desc}</td>
                  <td>{(line.n2).toLocaleString()}</td>
                  <td>{(line.n1).toLocaleString()}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{(line.n).toLocaleString()}</td>
                  <td>
                    {editingId === line.id ? (
                      <input 
                        type="number" 
                        autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => handleSave(line.id)}
                        onKeyDown={e => e.key === 'Enter' && handleSave(line.id)}
                        style={{ 
                          background: 'var(--bg-color)', 
                          border: '1px solid var(--primary)', 
                          color: 'white', 
                          padding: '0.4rem 0.6rem', 
                          borderRadius: '4px',
                          width: '120px'
                        }} 
                      />
                    ) : (
                      <span 
                        onClick={() => handleEditClick(line.id, line.n1p)}
                        style={{ cursor: 'pointer', borderBottom: '1px dashed var(--text-muted)', display: 'inline-block', minWidth: '80px' }}>
                        {(line.n1p).toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span className="status-badge status-pending">En révision</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreparationBudget;
