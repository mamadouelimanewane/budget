import React, { useState } from 'react';
import { Lightbulb, ThumbsUp, Plus, User, Calendar, MessageCircle, Star } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Participatory: React.FC = () => {
  const { proposals, addProposal, voteProposal, t } = useBudget();
  const [showForm, setShowForm] = useState(false);
  const [newProp, setNewProp] = useState({ title: '', desc: '', author: '', budgetedAmt: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProposal(newProp);
    setNewProp({ title: '', desc: '', author: '', budgetedAmt: 0 });
    setShowForm(false);
  };

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Budget Participatif : Innovation Collective</h1>
          <p>Démocratie financière : les {t('service_term')}s proposent des projets, l'organisation vote pour les priorités.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? 'Fermer' : 'Déposer un Projet'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel animate-slide-up" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Dépôt de Projet Innovant</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Titre du Projet</label>
              <input 
                className="btn-icon" style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white' }}
                value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Budget Estimé (FCFA)</label>
              <input 
                type="number"
                className="btn-icon" style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white' }}
                value={newProp.budgetedAmt} onChange={e => setNewProp({...newProp, budgetedAmt: parseInt(e.target.value)})} required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
              <label>Description & Impact Attendu</label>
              <textarea 
                rows={3}
                style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white', resize: 'none' }}
                value={newProp.desc} onChange={e => setNewProp({...newProp, desc: e.target.value})} required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>{t('service_term')} Porteur</label>
              <input 
                className="btn-icon" style={{ padding: '0.75rem', borderRadius: '8px', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', color: 'white' }}
                value={newProp.author} onChange={e => setNewProp({...newProp, author: e.target.value})} required
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={() => alert('Budget participatif lancé au vote. Notifications envoyées aux parties prenantes.')} type="submit" className="btn btn-primary" style={{ width: '100%' }}>Lancer au Vote</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {proposals.map(prop => (
          <div key={prop.id} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.05 }}>
              <Star size={100} fill="var(--warning)" />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '0.5rem', borderRadius: '8px' }}>
                 <Lightbulb size={24} />
               </div>
               <div style={{ textAlign: 'right' }}>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Votes Actuels</div>
                 <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>{prop.votes}</div>
               </div>
            </div>

            <h3 style={{ marginBottom: '0.5rem' }}>{prop.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', height: '3rem', overflow: 'hidden' }}>
              {prop.desc}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                 <User size={14} /> {prop.author}
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                 <Calendar size={14} /> {prop.date}
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--primary)' }}>
                 Est. {prop.budgetedAmt.toLocaleString()} FCFA
               </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary" onClick={() => voteProposal(prop.id)} style={{ flex: 1, gap: '0.5rem' }}>
                <ThumbsUp size={16} /> Voter (+1)
              </button>
              <button className="btn btn-icon" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participatory;
