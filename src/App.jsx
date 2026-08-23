import { useState, useCallback, useEffect } from 'react';
import { getSavedTheme }  from './hooks/useTheme';

import Sidebar         from './components/Sidebar';
import Topbar          from './components/Topbar';
import Dashboard          from './pages/Dashboard';
import SettingsPage       from './pages/SettingsPage';
import DomainScanPage     from './pages/DomainScanPage';
import AssetsPage         from './pages/AssetsPage';
import VulnerabilitiesPage from './pages/VulnerabilitiesPage';
import ThreatsPage        from './pages/ThreatsPage';
import AlertsPage         from './pages/AlertsPage';
import PlaceholderPage    from './pages/PlaceholderPage';
import NotificationsPanel from './components/NotificationsPanel';

import './styles/layout.css';
import './styles/components.css';
import './styles/dashboard.css';
import './styles/settings.css';
import './styles/notifications.css';
import './styles/domainScan.css';

function PageRouter({ activePage, onExport, onVulnClick }) {
  if (activePage === 'dashboard') {
    return <Dashboard onExport={onExport} onVulnClick={onVulnClick} />;
  }
  if (activePage === 'assets') {
    return <AssetsPage />;
  }
  if (activePage === 'vulnerabilities') {
    return <VulnerabilitiesPage />;
  }
  if (activePage === 'threats') {
    return <ThreatsPage />;
  }
  if (activePage === 'alerts') {
    return <AlertsPage />;
  }
  if (activePage === 'settings') {
    return <SettingsPage />;
  }
  if (activePage === 'domain-scan') {
    return <DomainScanPage />;
  }
  return <PlaceholderPage pageId={activePage} />;
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', getSavedTheme());
  }, []);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [notifOpen,        setNotifOpen]        = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((pageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
  }, []);

  const handleExport = useCallback(() => {
    const reportData = {
      timestamp: new Date().toISOString(),
      app: 'ASM Shield',
      exportType: 'Full Surface Report',
    };
    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob    = new Blob([jsonStr], { type: 'application/json' });
    const url     = URL.createObjectURL(blob);
    const a       = document.createElement('a');
    a.href        = url;
    a.download    = `asm-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="main-wrapper">
        <Topbar
          activePage={activePage}
          onNavigate={handleNavigate}
          onToggleSidebar={handleToggleSidebar}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
          onOpenNotifications={() => setNotifOpen((prev) => !prev)}
        />

        <main className="main-content">
          <PageRouter
            activePage={activePage}
            onExport={handleExport}
            onVulnClick={() => handleNavigate('vulnerabilities')}
          />
        </main>
      </div>

      <NotificationsPanel
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
