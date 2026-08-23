import { X, Server, Globe, Shield, Clock } from 'lucide-react';

export default function AssetModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
      <div role="dialog" aria-label={`Asset Details - ${asset.name}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '540px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Globe size={18} color="var(--neon-blue)" /> {asset.name}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div>Type: <strong style={{ color: 'var(--text-primary)' }}>{asset.type}</strong></div>
          <div>IP Address: <span className="mono-cell" style={{ color: 'var(--neon-blue)' }}>{asset.ipAddress}</span></div>
          <div>Status: <span className={`status-badge ${asset.status === 'Active' ? 'safe' : 'high'}`}>{asset.status}</span></div>
          <div>Risk Level: <span className={`status-badge ${asset.riskLevel.toLowerCase()}`}>{asset.riskLevel}</span></div>
          <div>Open Ports: {asset.openPorts?.map(p => <span key={p} className="port-tag">:{p}</span>)}</div>
          <div>Tech Stack: <strong style={{ color: 'var(--text-primary)' }}>{asset.technologies?.join(', ')}</strong></div>
          <div>Last Scanned: <span className="mono-cell">{asset.lastScanned}</span></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button className="btn btn--ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}
