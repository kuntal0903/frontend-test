import { X, Bell, AlertTriangle, ShieldCheck } from 'lucide-react';

const MOCK_NOTIFS = [
  { id: 'n1', title: 'Critical Vulnerability Detected', desc: 'CVE-2024-3094 matched on api-prod-01', time: '10m ago', unread: true },
  { id: 'n2', title: 'SSL Certificate Expiring', desc: 'Wildcard cert expires in 22 days', time: '1h ago', unread: true },
  { id: 'n3', title: 'Domain Scan Completed', desc: 'acme-corp.com scan finished with 0 critical errors', time: '3h ago', unread: false },
];

export default function NotificationsPanel({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.5)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: 70, right: 24, width: 340, background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', padding: 18, zIndex: 401, boxShadow: 'var(--glow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={16} color="var(--neon-blue)" /> Security Notifications
          </h4>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={14} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_NOTIFS.map(n => (
            <div key={n.id} style={{ padding: 10, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{n.desc}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
            </div>
          ))}
        </div>

        <button
          className="btn btn--primary"
          style={{ width: '100%', marginTop: 14, justifyContent: 'center', fontSize: 12 }}
          onClick={() => { onClose(); onNavigate('alerts'); }}
        >
          View Alert Center
        </button>
      </div>
    </>
  );
}
