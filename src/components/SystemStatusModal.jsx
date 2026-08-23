import { X, Activity, CheckCircle2, ShieldCheck, Server } from 'lucide-react';

export default function SystemStatusModal({ onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
      <div role="dialog" aria-label="System Health Status" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '440px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={18} color="#4ade80" /> System Health Diagnostics
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Scanner Engine</span>
            <span style={{ color: '#4ade80', fontWeight: 600 }}>100% Operational</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CVE Intelligence Pipeline</span>
            <span style={{ color: '#4ade80', fontWeight: 600 }}>Connected</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>API Gateway Latency</span>
            <span className="mono-cell" style={{ color: 'var(--neon-blue)' }}>12ms</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <button className="btn btn--primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}
