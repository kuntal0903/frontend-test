import { X, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

export default function ThreatModal({ threat, onClose }) {
  if (!threat) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Threat Details - ${threat.title}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '520px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-critical)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--critical)' }}>
            <AlertTriangle size={18} /> {threat.title}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div>CVE ID: <strong className="mono-cell" style={{ color: 'var(--neon-blue)' }}>{threat.cveId}</strong></div>
          <div>CVSS Rating: <span className="cvss-pill">{threat.cvssScore}</span></div>
          <div>Severity: <span className={`severity-badge ${threat.severity?.toLowerCase()}`}>{threat.severity}</span></div>
          <div>Target Asset: <span className="mono-cell">{threat.affectedAsset}</span></div>
          <div>Description: <p style={{ marginTop: 4, color: 'var(--text-primary)', lineHeight: 1.5 }}>{threat.description}</p></div>
          <div>Recommended Action: <p style={{ marginTop: 4, color: '#4ade80', lineHeight: 1.5, fontWeight: 600 }}>{threat.remediation}</p></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button className="btn btn--primary" onClick={onClose}>Close Advisory</button>
        </div>
      </div>
    </>
  );
}
