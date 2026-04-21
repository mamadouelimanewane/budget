import React from 'react';
import { Search, Bell, Monitor } from 'lucide-react';

interface HeaderProps {
  isWarRoom?: boolean;
  setIsWarRoom?: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isWarRoom, setIsWarRoom }) => {
  return (
    <header className="top-header">
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Rechercher une DBM, un engagement..." onKeyDown={(e) => { if(e.key === "Enter" && (e.target as HTMLInputElement).value) alert(`Recherche : "${(e.target as HTMLInputElement).value}" — 3 résultats trouvés.`); }} />
      </div>
      
      <div className="header-actions">
        {setIsWarRoom && (
          <button 
            className={`btn-icon ${isWarRoom ? 'active' : ''}`} 
            onClick={() => setIsWarRoom(!isWarRoom)}
            title="Mode War Room"
            style={{ color: isWarRoom ? 'var(--warning)' : 'inherit' }}
          >
            <Monitor size={20} />
          </button>
        )}
        <button className="btn-icon" onClick={() => alert("3 notifications : DBM-2026-004 approuvée | Engagement ENG-2026-090 en attente visa | Rapport Q1 prêt")} title="Notifications" style={{ position: "relative" }}>
          <Bell size={20} />
          <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "var(--danger, #ef4444)", color: "white", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">MD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mamadou Dia</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DSI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
