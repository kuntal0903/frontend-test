import { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, ShieldAlert, Radio, Trash2 } from 'lucide-react';
import AlertModal from '../components/AlertModal';

const MOCK_ALERTS = [
  { id: 'alt1', title: 'New Critical CVE-2024-3094 Detected on api-prod-01', type: 'Critical', time: '10m ago', unread: true },
  { id: 'alt2', title: 'Exposed Database Port 5432 on dev-db.internal', type: 'Critical', time: '40m ago', unread: true },
  { id: 'alt3', title: 'SSL Certificate Expiration Warning (22 Days Left)', type: 'High', time: '2h ago', unread: false },
  { id: 'alt4', title: 'Unauthorized Port Scan Detected from IP 198.51.100.99', type: 'Medium', time: '5h ago', unread: false },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleClearAll = () => {
    setAlerts([]);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">
            Alert <span>Center</span>
          </h1>
          <p className="page-header__subtitle">
            Real-time security notifications, threshold triggers, and automated incident routing.
          </p>
        </div>
        <div className="flex-gap-md" style={{ display: 'flex', gap: 12 }}>
          <button className="export-btn" onClick={() => setShowAlertModal(true)}>
            <Bell size={14} /> Configure Rules
          </button>
          <button className="export-btn" onClick={handleClearAll}>
            <Trash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {alerts.map(a => (
          <div
            key={a.id}
            className="dash-card"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderLeft: a.type === 'Critical' ? '4px solid var(--critical)' : '4px solid var(--high)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={18} color={a.type === 'Critical' ? 'var(--critical)' : 'var(--high)'} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
            <span className={`status-badge ${a.type.toLowerCase()}`}>{a.type}</span>
          </div>
        ))}
        {alerts.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No active alerts at this time.
          </div>
        )}
      </div>

      {showAlertModal && (
        <AlertModal onClose={() => setShowAlertModal(false)} />
      )}
    </div>
  );
}
