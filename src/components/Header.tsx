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
        <input type="text" placeholder="Rechercher une DBM, un engagement..." />
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
        <button className="btn-icon">
          <Bell size={20} />
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
