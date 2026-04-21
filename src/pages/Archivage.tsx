import React from 'react';
import { Archive, Search, Filter, HardDrive, DownloadCloud, FileLock2, Info } from 'lucide-react';

const archives = [
  { id: 'ARC-2025-C', vol: 'Comptes de Gestion 2025 — Exercice Clos',    size: '1.4 GB', docs: 5120, hash: 'f9a3d...7c1b', status: 'Scellé (eIDAS)' },
  { id: 'ARC-2024-C', vol: 'Comptes de Gestion 2024',                     size: '1.2 GB', docs: 4520, hash: 'a8f4c...9d2e', status: 'Scellé (eIDAS)' },
  { id: 'ARC-2024-Q', vol: 'Rapports Trimestriels 2024 (Q1-Q4)',           size: '340 MB', docs: 980,  hash: 'c4e1a...0b8f', status: 'Scellé (eIDAS)' },
  { id: 'ARC-2023-C', vol: 'Comptes de Gestion 2023',                     size: '1.0 GB', docs: 3980, hash: 'b11dc...4f2a', status: 'Scellé (eIDAS)' },
  { id: 'ARC-2022-C', vol: 'Comptes de Gestion 2022',                     size: '980 MB', docs: 3100, hash: '88cda...1v3w', status: 'Long Terme (>3 ans)' },
  { id: 'ARC-2021-C', vol: 'Comptes de Gestion 2021',                     size: '870 MB', docs: 2840, hash: '22fab...9c3d', status: 'Long Terme (>3 ans)' },
];

const ArchivagePage: React.FC = () => {
  return (
    <div className="dashboard-view animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Archive Légale à Valeur Probante</h1>
          <p>Conservation des liasses, signatures et historiques selon les normes (CNP/UEMOA)</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
          <div className="kpi-header">
            <span className="kpi-title">Stockage Froid (S3 Glacier)</span>
            <div className="kpi-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              <HardDrive size={20} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'white', marginTop: '0.5rem' }}>4.8 TB</div>
        </div>
        
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Pièces Scellées</span>
            <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
              <FileLock2 size={20} />
            </div>
          </div>
          <div className="kpi-value">124,592</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Certificats d'horodatage intègres</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '60%', marginBottom: '1.5rem' }}>
          <div className="header-search" style={{ width: '100%' }}>
            <Search size={18} />
            <input type="text" placeholder="Recherche e-Discovery (full-text) dans les archives..." />
          </div>
          <button className="btn btn-icon" onClick={() => alert("Archive téléchargée.")} title="Télécharger">
            <Filter size={18} />
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Volume ID</th>
                <th>Titre d'Archive</th>
                <th>Empreinte SHA-256</th>
                <th>Taille</th>
                <th>Nb. Documents</th>
                <th>Niveau Sécurité</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {archives.map((arc, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{arc.id}</td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{arc.vol}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.85rem' }}>{arc.hash}</td>
                  <td>{arc.size}</td>
                  <td style={{ textAlign: 'right' }}>{arc.docs.toLocaleString()}</td>
                  <td>
                    <span className="status-badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                      {arc.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Audit du sceau" onClick={() => alert("Audit du sceau eIDAS : Intégrité vérifiée — Hash SHA-256 conforme.")} style={{ color: 'var(--text-main)' }}>
                        <Info size={16} />
                      </button>
                      <button className="btn-icon" title="Requêter Archive" onClick={() => alert("Interface de requête SQL sur archive ouverte.")} style={{ color: 'var(--primary)' }}>
                        <DownloadCloud size={16} />
                      </button>
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

export default ArchivagePage;
