import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Search, Bell, Sun, Moon, Zap, Menu, Shield } from 'lucide-react';

export default function Topbar({
  activePage,
  onNavigate,
  onToggleSidebar,
  onToggleMobile,
  onOpenNotifications,
}) {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('blue');
    else setTheme('dark');
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menu-btn"
          onClick={onToggleMobile}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" />
          <input
            type="text"
            className="topbar__search-input"
            placeholder="Search assets, CVEs, IPs, domain targets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="topbar__right">
        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
        >
          {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="topbar__icon-btn"
          onClick={onOpenNotifications}
          title="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span className="notif-badge-dot" />
        </button>

        <div className="topbar__profile" onClick={() => onNavigate('settings')}>
          <div className="topbar__avatar">AD</div>
          <div className="topbar__user-info">
            <span className="topbar__user-name">Alex Dawson</span>
            <span className="topbar__user-role">SecOps Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
