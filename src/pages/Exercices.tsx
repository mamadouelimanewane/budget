import React, { useState } from 'react';
import { Calendar, Lock, Unlock, ArrowRight, Play, Server, AlertTriangle } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';



const ExercicesPage: React.FC = () => {
  const { industryMode } = useBudget();
  const [selectedYear, setSelectedYear] = useState('2026');

  const isHospital = industryMode === 'hospitalier';

  const years = [
    { year: '2024', status: 'closed', desc: 'Exercice Clôturé définitivement. Données archivées.' },
    { year: '2025', status: 'closed', desc: `Exercice Clôturé. En attente de l'audit final ${isHospital ? "de l'IGE" : "du Commissariat aux Comptes"}.` },
    { year: '2026', status: 'active', desc: 'Exercice en cours. Exécution budgétaire ouverte.' },
    { year: '2027', status: 'prep', desc: 'Exercice en préparation. Arbitrages en cours.' },
  ];

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Gestion des Exercices Budgétaires</h1>
          <p>Ouverture, clôture et basculement des années budgétaires</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Years List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {years.map((y) => (
            <div 
              key={y.year}
              onClick={() => setSelectedYear(y.year)}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                border: selectedYear === y.year ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: selectedYear === y.year ? 'rgba(59, 130, 246, 0.1)' : 'var(--surface-color)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: y.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : y.status === 'closed' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: y.status === 'active' ? 'var(--success)' : y.status === 'closed' ? 'var(--danger)' : 'var(--warning)'
                  }}>
                  {y.status === 'closed' ? <Lock size={20} /> : y.status === 'active' ? <Play size={20} /> : <Unlock size={20} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Exercice {y.year}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {y.status === 'active' ? 'En cours' : y.status === 'closed' ? 'Clôturé' : 'Préparation'}
                  </span>
                </div>
              </div>
              <ArrowRight size={20} color="var(--text-muted)" />
            </div>
          ))}
        </div>

        {/* Selected Year Detail */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {years.filter(y => y.year === selectedYear).map(y => (
            <div key={y.year}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Calendar size={32} color="var(--primary)" />
                <h2 style={{ fontSize: '1.8rem' }}>Détails Exercice {y.year}</h2>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>{y.desc}</p>
              
              {y.status === 'active' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div style={{ padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px dashed var(--warning)', borderRadius: '8px' }}>
                     <h4 style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <AlertTriangle size={18} /> Cycle de Clôture Annuelle
                     </h4>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                       La clôture génère les écritures de report (Report à nouveau), verrouille les engagements de l'année, et prépare le rapport d'exécution final pour les audits.
                     </p>
                     <button onClick={() => alert('Procédure de clôture initiée. Vérification des engagements en cours...')} className="btn" style={{ background: 'var(--warning)', color: 'white', border: 'none' }}>Initier procédure de clôture</button>
                   </div>
                </div>
              )}

              {y.status === 'prep' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed var(--success)', borderRadius: '8px' }}>
                     <h4 style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Play size={18} /> Lancement de l'année Budgétaire
                     </h4>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                       Ouvrir cet exercice affectera les lignes préparées pour exécution. Les dotations N+1 deviendront les dotations de l'année N active.
                     </p>
                     <button onClick={() => alert('Exercice approuvé et ouvert. Budget initial chargé.')} className="btn" style={{ background: 'var(--success)', color: 'white', border: 'none' }}>Approuver et Ouvrir {y.year}</button>
                   </div>
                </div>
              )}

              {y.status === 'closed' && (
                <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Server size={18} /> Données Intègres (Archivage Légal)
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Aucune modification ne peut être apportée sur cet exercice. Les données de clôture sont transmises {isHospital ? 'à la Cour des Comptes' : 'au conseil d\'administration'} et scellées.
                  </p>
                  <button onClick={() => alert('Archive PDF décompressée. Documents disponibles dans GED.')} className="btn btn-primary" style={{ background: 'var(--surface-color-light)', color: 'white', border: '1px solid var(--glass-border)' }}>Décompresser Archive PDF</button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercicesPage;
