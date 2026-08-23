import { X, Bell, CheckCircle } from 'lucide-react';

export default function AlertModal({ onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
      <div role="dialog" aria-label="Alert Rules Configuration" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '460px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="var(--neon-blue)" /> Alert Trigger Rules
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
          Configure automated email, Slack, and SIEM notification thresholds for critical security events.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <input type="checkbox" defaultChecked /> Notify immediately on Critical CVE detection (CVSS 9.0+)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <input type="checkbox" defaultChecked /> Notify on exposed database ports (5432, 3306, 27017)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <input type="checkbox" defaultChecked /> Send daily summary digest at 08:00 UTC
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button className="btn btn--primary" onClick={onClose}>Save Alert Settings</button>
        </div>
      </div>
    </>
  );
}
