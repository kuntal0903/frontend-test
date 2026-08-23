import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import {
  User, Shield, Key, Plug, Calendar, Bell, Palette,
  Users, AlertTriangle, Check, Copy, RefreshCw, Plus,
  Trash2, Eye, EyeOff, Mail, MessageSquare, Link2, Globe,
  ChevronRight, LogOut, Download, Cpu, X, CheckCircle,
} from 'lucide-react';

import '../styles/settings.css';

const NAV_SECTIONS = [
  { group: 'ACCOUNT',  items: [
    { id: 'profile',      label: 'Profile',       icon: User },
    { id: 'security',     label: 'Security',      icon: Shield },
    { id: 'api-keys',     label: 'API Keys',      icon: Key },
  ]},
  { group: 'PLATFORM', items: [
    { id: 'integrations', label: 'Integrations',  icon: Plug },
    { id: 'scan',         label: 'Scan Schedule', icon: Calendar },
    { id: 'notifications',label: 'Notifications', icon: Bell },
  ]},
  { group: 'SYSTEM',   items: [
    { id: 'appearance',   label: 'Appearance',    icon: Palette },
    { id: 'team',         label: 'Team',          icon: Users },
    { id: 'danger',       label: 'Danger Zone',   icon: AlertTriangle },
  ]},
];

const INITIAL_KEYS = [
  { id: 'k1', name: 'Production API Key',    value: 'asm_sk_prod_a8f2c9d1e4b7x9z',  created: '2024-06-01', lastUsed: '2m ago',  scopes: ['read', 'write', 'export'] },
  { id: 'k2', name: 'CI/CD Integration Key', value: 'asm_sk_ci_3e6f1a8b5c9d2w4', created: '2024-05-12', lastUsed: '1h ago',  scopes: ['read'] },
  { id: 'k3', name: 'SIEM Connector Key',    value: 'asm_sk_siem_7b4e2f9c1d8a6q8', created: '2024-04-30', lastUsed: '4d ago',  scopes: ['read', 'stream'] },
];

const INITIAL_INTEGRATIONS = [
  { id: 'splunk',      name: 'Splunk SIEM',      emoji: '🔍', desc: 'Stream events and findings to Splunk Enterprise or Cloud.',        status: 'connected', url: 'https://splunk.corp.internal:8088' },
  { id: 'jira',        name: 'Jira',             emoji: '🎯', desc: 'Auto-create tickets for new critical vulnerabilities.',            status: 'connected', url: 'https://jira.corp.internal' },
  { id: 'pagerduty',   name: 'PagerDuty',        emoji: '📟', desc: 'Trigger on-call alerts when critical findings are detected.',      status: 'warning',   url: 'https://events.pagerduty.com/v2/enqueue' },
  { id: 'slack',       name: 'Slack',            emoji: '💬', desc: 'Post real-time alerts and digest summaries to channels.',          status: 'connected', url: 'https://hooks.slack.com/services/T00/B00/X00' },
  { id: 'aws',         name: 'AWS Security Hub', emoji: '☁️', desc: 'Sync findings with AWS Security Hub for unified visibility.',     status: 'disconnected', url: '' },
  { id: 'crowdstrike', name: 'CrowdStrike',      emoji: '🦅', desc: 'Pull endpoint telemetry and host vulnerability data.',            status: 'disconnected', url: '' },
  { id: 'servicenow',  name: 'ServiceNow',       emoji: '🔧', desc: 'Create and update ITSM incidents via the Now Platform.',          status: 'disconnected', url: '' },
  { id: 'tenable',     name: 'Tenable.io',       emoji: '🔬', desc: 'Import Nessus scan results and asset data automatically.',       status: 'connected', url: 'https://cloud.tenable.com' },
  { id: 'teams',       name: 'Microsoft Teams',  emoji: '🟦', desc: 'Send alert digests and approval requests to Teams channels.',     status: 'disconnected', url: '' },
];

const INITIAL_TEAM = [
  { id: 'u1', initials: 'AD', name: 'Alex Dawson',   email: 'alex.dawson@corp.internal',    role: 'admin',    status: 'active', joined: '2024-01-15', color: '#8b5cf6' },
  { id: 'u2', initials: 'PK', name: 'Priya Kumar',   email: 'priya.kumar@corp.internal',   role: 'analyst',  status: 'active', joined: '2024-02-10', color: '#3b82f6' },
  { id: 'u3', initials: 'JL', name: 'James Lin',     email: 'james.lin@corp.internal',     role: 'analyst',  status: 'active', joined: '2024-03-22', color: '#06b6d4' },
  { id: 'u4', initials: 'SR', name: 'Sofia Reyes',   email: 'sofia.reyes@corp.internal',   role: 'readonly', status: 'active', joined: '2024-05-01', color: '#f97316' },
  { id: 'u5', initials: 'MB', name: 'Marcus Brown',  email: 'marcus.brown@corp.internal',  role: 'viewer',   status: 'pending', joined: '2024-08-01', color: '#eab308' },
];

function ProfileSection({ showToast }) {
  const initialForm = {
    displayName: 'Alex Dawson',
    email: 'alex.dawson@corp.internal',
    role: 'Security Engineer',
    bio: 'Lead security engineer managing the enterprise attack surface monitoring programme.',
    timezone: 'Asia/Kolkata',
  };
  const [form, setForm] = useState(initialForm);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    showToast('Profile updated successfully');
  };

  const handleReset = () => {
    setForm(initialForm);
    showToast('Profile changes reset');
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        showToast(`Photo "${e.target.files[0].name}" uploaded`);
      }
    };
    input.click();
  };

  return (
    <div className="settings-section" id="settings-profile">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(139,92,246,0.12)', color: 'var(--accent-purple)' }}>
          <User size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Profile</h3>
          <p>Manage your personal account details and display preferences</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">AD</div>
          <div className="profile-avatar-info">
            <h4>{form.displayName}</h4>
            <p>Profile photo is auto-generated from your initials</p>
            <button className="btn btn--ghost" style={{ fontSize: 12, padding: '6px 14px' }} onClick={handlePhotoUpload}>
              Upload Photo
            </button>
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">Display Name<span>Shown across the dashboard</span></div>
          <input id="settings-display-name" className="s-input" value={form.displayName}
            onChange={e => update('displayName', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Email Address<span>Used for login and notifications</span></div>
          <input id="settings-email" className="s-input" type="email" value={form.email}
            onChange={e => update('email', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Job Title<span>Displayed on team roster</span></div>
          <input id="settings-role" className="s-input" value={form.role}
            onChange={e => update('role', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Bio<span>Short description (optional)</span></div>
          <textarea id="settings-bio" className="s-textarea" value={form.bio}
            onChange={e => update('bio', e.target.value)} />
        </div>

        <div className="field-row">
          <div className="field-label">Timezone<span>Used for all timestamps</span></div>
          <select id="settings-timezone" className="s-select" value={form.timezone}
            onChange={e => update('timezone', e.target.value)}>
            {['Asia/Kolkata','UTC','America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Tokyo','Australia/Sydney'].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={handleReset}>Reset</button>
          <button className="btn btn--primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function SecuritySection({ showToast }) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [showOldPwd, setShowOldPwd]  = useState(false);
  const [showNewPwd, setShowNewPwd]  = useState(false);
  const [mfa,        setMfa]         = useState(true);
  const [ssoEnabled, setSsoEnabled]  = useState(false);
  const [ipLock,     setIpLock]      = useState(false);
  const [auditLog,   setAuditLog]    = useState(true);
  const [timeoutVal, setTimeoutVal]  = useState('30 minutes');

  const handleSaveSecurity = () => {
    if (newPwd && newPwd.length < 12) {
      showToast('Error: New password must be at least 12 characters');
      return;
    }
    setOldPwd('');
    setNewPwd('');
    showToast('Security policy and credentials updated');
  };

  const handleRevokeSessions = () => {
    showToast('All active user sessions revoked across 3 devices');
  };

  return (
    <div className="settings-section" id="settings-security">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--accent-blue)' }}>
          <Shield size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Security</h3>
          <p>Password, multi-factor authentication, and session controls</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="field-row">
          <div className="field-label">Current Password</div>
          <div style={{ position: 'relative' }}>
            <input
              id="settings-old-password"
              className="s-input"
              type={showOldPwd ? 'text' : 'password'}
              placeholder="Enter current password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <button onClick={() => setShowOldPwd(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {showOldPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">New Password<span>Min 12 chars, mixed case + symbol</span></div>
          <div style={{ position: 'relative' }}>
            <input
              id="settings-new-password"
              className="s-input"
              type={showNewPwd ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <button onClick={() => setShowNewPwd(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {showNewPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="settings-divider" />

        <label className="toggle-row" htmlFor="toggle-mfa">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Multi-Factor Authentication (TOTP)</div>
            <div className="toggle-row__desc">Require a one-time code in addition to your password</div>
          </div>
          <label className="toggle">
            <input id="toggle-mfa" type="checkbox" checked={mfa} onChange={e => { setMfa(e.target.checked); showToast(`MFA ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-sso">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Single Sign-On (SAML / OIDC)</div>
            <div className="toggle-row__desc">Authenticate via your corporate identity provider</div>
          </div>
          <label className="toggle">
            <input id="toggle-sso" type="checkbox" checked={ssoEnabled} onChange={e => { setSsoEnabled(e.target.checked); showToast(`SSO ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-iplock">
          <div className="toggle-row__info">
            <div className="toggle-row__label">IP Allow-list Enforcement</div>
            <div className="toggle-row__desc">Restrict login to trusted IP ranges only</div>
          </div>
          <label className="toggle">
            <input id="toggle-iplock" type="checkbox" checked={ipLock} onChange={e => { setIpLock(e.target.checked); showToast(`IP Allow-list ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-audit">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Security Audit Logging</div>
            <div className="toggle-row__desc">Log all login events, exports, and config changes</div>
          </div>
          <label className="toggle">
            <input id="toggle-audit" type="checkbox" checked={auditLog} onChange={e => { setAuditLog(e.target.checked); showToast(`Audit logging ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <div className="field-row">
          <div className="field-label">Session Timeout<span>Auto-logout after inactivity</span></div>
          <select id="settings-session-timeout" className="s-select" value={timeoutVal} onChange={(e) => setTimeoutVal(e.target.value)}>
            {['15 minutes','30 minutes','1 hour','4 hours','8 hours','Never'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={handleRevokeSessions}>
            <LogOut size={13} /> Revoke All Sessions
          </button>
          <button className="btn btn--primary" onClick={handleSaveSecurity}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function ApiKeysSection({ keys, setKeys, showToast }) {
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(null);
  const [newKeyModal, setNewKeyModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [keyScope, setKeyScope] = useState('read');

  const handleCopy = (id, value) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(id);
    showToast('API key copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRevoke = (id, name) => {
    setKeys(keys.filter((k) => k.id !== id));
    showToast(`API Key "${name}" revoked`);
  };

  const handleGenerateKey = (e) => {
    e.preventDefault();
    if (!keyName.trim()) return;
    const randomHex = Math.random().toString(36).substring(2, 12);
    const newKeyObj = {
      id: `k-${Date.now()}`,
      name: keyName,
      value: `asm_sk_${keyScope}_${randomHex}9x2`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Just now',
      scopes: keyScope === 'full' ? ['read', 'write', 'export'] : [keyScope],
    };
    setKeys([newKeyObj, ...keys]);
    setNewKeyModal(false);
    setKeyName('');
    showToast(`Generated new key "${newKeyObj.name}"`);
  };

  return (
    <div className="settings-section" id="settings-api-keys">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(6,182,212,0.12)', color: 'var(--accent-cyan)' }}>
          <Key size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>API Keys</h3>
          <p>Generate and manage tokens for programmatic access to the ASM API</p>
        </div>
      </div>

      <div className="settings-section__body">
        {keys.map(key => (
          <div className="api-key-row" key={key.id}>
            <div className="api-key-row__info">
              <div className="api-key-row__name">{key.name}</div>
              <div className="api-key-row__value">
                {masked ? key.value.replace(/[a-z0-9]/gi, '•').slice(0, 28) + '••••' : key.value}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                {key.scopes.map(s => (
                  <span key={s} style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
                    background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(59,130,246,0.2)',
                    letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s}</span>
                ))}
                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4, fontFamily: 'monospace' }}>
                  · Last used {key.lastUsed}
                </span>
              </div>
            </div>

            <div className="api-key-row__meta">
              <button
                className="btn btn--ghost" style={{ padding: '6px 10px', fontSize: 11 }}
                onClick={() => handleCopy(key.id, key.value)}
                aria-label="Copy API key"
              >
                {copied === key.id ? <Check size={13} color="var(--low)" /> : <Copy size={13} />}
              </button>
              <button
                className="btn btn--danger" style={{ padding: '6px 10px', fontSize: 11 }}
                onClick={() => handleRevoke(key.id, key.name)}
                aria-label="Revoke API key"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={() => setMasked(v => !v)}>
            {masked ? <Eye size={13} /> : <EyeOff size={13} />}
            {masked ? 'Reveal Keys' : 'Mask Keys'}
          </button>
          <button className="btn btn--primary" onClick={() => setNewKeyModal(true)}>
            <Plus size={13} /> Generate New Key
          </button>
        </div>
      </div>

      {newKeyModal && (
        <>
          <div className="modal-overlay" onClick={() => setNewKeyModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
          <div role="dialog" aria-label="Generate API Key" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '440px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Generate API Token</h3>
              <button onClick={() => setNewKeyModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            <form onSubmit={handleGenerateKey} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Key Label / Purpose</label>
                <input className="s-input" placeholder="e.g. Deployment Automation Key" value={keyName} onChange={(e) => setKeyName(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Permission Scope</label>
                <select className="s-select" value={keyScope} onChange={(e) => setKeyScope(e.target.value)} style={{ width: '100%' }}>
                  <option value="read">Read Only (Assets & Vulns)</option>
                  <option value="write">Read + Write (Trigger Scans)</option>
                  <option value="full">Full Admin (Read, Write, Export)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setNewKeyModal(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Create Key</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function IntegrationsSection({ integrations, setIntegrations, showToast }) {
  const [configModal, setConfigModal] = useState(null);
  const [configUrl, setConfigUrl] = useState('');

  const handleOpenConfig = (intg) => {
    setConfigModal(intg);
    setConfigUrl(intg.url || `https://${intg.id}.corp.internal/webhook`);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!configModal) return;
    setIntegrations(integrations.map((item) =>
      item.id === configModal.id ? { ...item, status: 'connected', url: configUrl } : item
    ));
    showToast(`Integration "${configModal.name}" connected and verified`);
    setConfigModal(null);
  };

  const handleDisconnect = (id, name) => {
    setIntegrations(integrations.map((item) =>
      item.id === id ? { ...item, status: 'disconnected', url: '' } : item
    ));
    showToast(`Disconnected ${name}`);
  };

  return (
    <div className="settings-section" id="settings-integrations">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--low)' }}>
          <Plug size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Integrations</h3>
          <p>Connect ASM Shield to your security stack, ticketing systems, and cloud platforms</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="integrations-grid">
          {integrations.map(intg => (
            <div
              key={intg.id}
              id={`integration-card-${intg.id}`}
              className={`integration-card integration-card--${intg.status}`}
            >
              <div className="integration-card__header">
                <div className="integration-card__logo"
                  style={{ background: 'var(--bg-elevated)', fontSize: 22 }}>
                  {intg.emoji}
                </div>
                <span className={`integration-status-badge integration-status-badge--${intg.status}`}>
                  {intg.status === 'warning' ? '⚠ Warning' : intg.status}
                </span>
              </div>
              <div>
                <div className="integration-card__name">{intg.name}</div>
                <div className="integration-card__desc">{intg.desc}</div>
              </div>
              <div className="integration-card__action">
                {intg.status === 'connected' ? (
                  <>
                    <button className="integration-btn" onClick={() => handleOpenConfig(intg)}>Configure</button>
                    <button className="integration-btn integration-btn--disconnect" onClick={() => handleDisconnect(intg.id, intg.name)}>Disconnect</button>
                  </>
                ) : intg.status === 'warning' ? (
                  <>
                    <button className="integration-btn integration-btn--connect" onClick={() => handleOpenConfig(intg)}>Repair</button>
                    <button className="integration-btn integration-btn--disconnect" onClick={() => handleDisconnect(intg.id, intg.name)}>Remove</button>
                  </>
                ) : (
                  <button className="integration-btn integration-btn--connect" style={{ flex: 'none', width: '100%' }} onClick={() => handleOpenConfig(intg)}>
                    + Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {configModal && (
        <>
          <div className="modal-overlay" onClick={() => setConfigModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
          <div role="dialog" aria-label={`Configure ${configModal.name}`} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '480px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{configModal.emoji}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Connect {configModal.name}</h3>
              </div>
              <button onClick={() => setConfigModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Endpoint URL / Webhook</label>
                <input className="s-input" value={configUrl} onChange={(e) => setConfigUrl(e.target.value)} required style={{ width: '100%', fontFamily: 'monospace', fontSize: 12 }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Secret Key / Auth Token</label>
                <input className="s-input" type="password" defaultValue="sec_token_99x_example" required style={{ width: '100%', fontFamily: 'monospace', fontSize: 12 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setConfigModal(null)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Test & Connect</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function ScanScheduleSection({ showToast }) {
  const [freq, setFreq]       = useState('daily');
  const [scanTime, setScanTime] = useState('02:00');
  const [scanDepth, setScanDepth] = useState('standard');
  const [agentless, setAgentless] = useState(true);

  const FREQS = [
    { id: 'continuous', label: 'Continuous',  desc: 'Scan every 15 min' },
    { id: 'hourly',     label: 'Hourly',       desc: 'Full scan each hour' },
    { id: 'daily',      label: 'Daily',        desc: 'Once per day (recommended)' },
    { id: 'weekly',     label: 'Weekly',       desc: 'Every Sunday at 02:00' },
    { id: 'monthly',    label: 'Monthly',      desc: 'First day of each month' },
    { id: 'manual',     label: 'Manual Only',  desc: 'Triggered via UI or API' },
  ];

  const handleRunScanNow = () => {
    showToast('Instant surface scan triggered across all 10 CIDR ranges');
  };

  const handleSaveScan = () => {
    showToast(`Scan schedule updated to ${freq.toUpperCase()} at ${scanTime} UTC`);
  };

  return (
    <div className="settings-section" id="settings-scan">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(234,179,8,0.1)', color: 'var(--medium)' }}>
          <Calendar size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Scan Schedule</h3>
          <p>Configure automated asset discovery and vulnerability scan frequency</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>Scan Frequency</div>
          <div className="schedule-grid">
            {FREQS.map(f => (
              <div
                key={f.id}
                id={`freq-${f.id}`}
                className={`schedule-card ${freq === f.id ? 'selected' : ''}`}
                onClick={() => setFreq(f.id)}
                role="radio"
                aria-checked={freq === f.id}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setFreq(f.id)}
              >
                <div className="schedule-card__check">
                  {freq === f.id && <Check size={10} color="white" />}
                </div>
                <div className="schedule-card__freq">{f.label}</div>
                <div className="schedule-card__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">Scan Start Time<span>UTC time for scheduled scans</span></div>
          <input id="settings-scan-time" className="s-input" type="time" value={scanTime}
            onChange={e => setScanTime(e.target.value)} style={{ fontFamily: 'JetBrains Mono, monospace' }} />
        </div>

        <div className="field-row">
          <div className="field-label">Scan Depth<span>Trade-off between speed and coverage</span></div>
          <select id="settings-scan-depth" className="s-select" value={scanDepth}
            onChange={e => setScanDepth(e.target.value)}>
            <option value="light">Light — Port scan + banner grab</option>
            <option value="standard">Standard — Full service enumeration (recommended)</option>
            <option value="deep">Deep — Full vuln check + auth probing</option>
          </select>
        </div>

        <div className="field-row">
          <div className="field-label">Target Scope<span>CIDR ranges or domain patterns</span></div>
          <textarea id="settings-scan-targets" className="s-textarea"
            defaultValue={"10.0.0.0/8\n172.16.0.0/12\n192.168.0.0/16\n*.corp.internal"}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }} />
        </div>

        <label className="toggle-row" htmlFor="toggle-agentless">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Agentless Scanning</div>
            <div className="toggle-row__desc">Scan without deploying agents — uses network-level discovery only</div>
          </div>
          <label className="toggle">
            <input id="toggle-agentless" type="checkbox" checked={agentless} onChange={e => { setAgentless(e.target.checked); showToast(`Agentless mode ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={handleRunScanNow}>
            <Cpu size={13} /> Run Scan Now
          </button>
          <button className="btn btn--primary" onClick={handleSaveScan}>Save Schedule</button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection({ showToast }) {
  const [channels, setChannels] = useState({ email: true, slack: true, webhook: false, pagerduty: false });
  const [digest, setDigest] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [thresholds, setThresholds] = useState({ critical: 80, high: 60, medium: 40 });

  const toggleChannel = (ch) => setChannels(c => ({ ...c, [ch]: !c[ch] }));
  const updateThreshold = (k, v) => setThresholds(t => ({ ...t, [k]: v }));

  const handleTestAlert = () => {
    showToast('Test security alert dispatched to active channels');
  };

  const handleSaveNotifs = () => {
    showToast('Notification rules and channels saved');
  };

  const CHANNELS = [
    { id: 'email',     label: 'Email',     icon: Mail },
    { id: 'slack',     label: 'Slack',     icon: MessageSquare },
    { id: 'webhook',   label: 'Webhook',   icon: Link2 },
    { id: 'pagerduty', label: 'PagerDuty', icon: Globe },
  ];

  return (
    <div className="settings-section" id="settings-notifications">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(249,115,22,0.1)', color: 'var(--high)' }}>
          <Bell size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Notifications</h3>
          <p>Configure alert channels, thresholds, and digest preferences</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div>
          <div className="section-title" style={{ marginBottom: 12 }}>Alert Channels</div>
          <div className="channel-list">
            {CHANNELS.map(ch => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.id}
                  id={`channel-pill-${ch.id}`}
                  className={`channel-pill ${channels[ch.id] ? 'active' : ''}`}
                  onClick={() => toggleChannel(ch.id)}
                  role="checkbox"
                  aria-checked={channels[ch.id]}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && toggleChannel(ch.id)}
                >
                  <span className="channel-pill__dot" />
                  <Icon size={13} />
                  {ch.label}
                </div>
              );
            })}
          </div>
        </div>

        {channels.email && (
          <div className="field-row">
            <div className="field-label">Alert Email<span>Separate multiple with commas</span></div>
            <input id="settings-alert-email" className="s-input"
              defaultValue="sec-team@corp.internal, alex.dawson@corp.internal"
              placeholder="security@example.com" />
          </div>
        )}

        {channels.webhook && (
          <div className="field-row">
            <div className="field-label">Webhook URL<span>POST JSON payload on each alert</span></div>
            <input id="settings-webhook-url" className="s-input"
              placeholder="https://hooks.example.com/asm-alerts"
              style={{ fontFamily: 'monospace', fontSize: 12 }} />
          </div>
        )}

        <div className="settings-divider" />

        <div>
          <div className="section-title" style={{ marginBottom: 14 }}>Alert Severity Thresholds</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { key: 'critical', label: 'Critical', color: 'var(--critical)', cls: 'critical' },
              { key: 'high',     label: 'High',     color: 'var(--high)',     cls: 'high' },
              { key: 'medium',   label: 'Medium',   color: 'var(--medium)',   cls: 'medium' },
            ].map(({ key, label, color, cls }) => (
              <div className="threshold-item" key={key}>
                <div className="threshold-item__label" style={{ color }}>{label}</div>
                <input
                  id={`threshold-${key}`}
                  type="range" min={0} max={100}
                  value={thresholds[key]}
                  onChange={e => updateThreshold(key, Number(e.target.value))}
                  className={`threshold-slider threshold-slider--${cls}`}
                  style={{ '--val': `${thresholds[key]}%` }}
                />
                <div className="threshold-item__value" style={{ color }}>{thresholds[key]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-divider" />

        <label className="toggle-row" htmlFor="toggle-digest">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Daily Security Digest</div>
            <div className="toggle-row__desc">Receive a morning summary email of the past 24h findings</div>
          </div>
          <label className="toggle">
            <input id="toggle-digest" type="checkbox" checked={digest} onChange={e => { setDigest(e.target.checked); showToast(`Daily digest ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-critical-only">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Critical Alerts Only</div>
            <div className="toggle-row__desc">Suppress High / Medium / Low notifications to reduce noise</div>
          </div>
          <label className="toggle">
            <input id="toggle-critical-only" type="checkbox" checked={criticalOnly} onChange={e => { setCriticalOnly(e.target.checked); showToast(`Critical-only mode ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <div className="settings-footer">
          <button className="btn btn--ghost" onClick={handleTestAlert}>Send Test Alert</button>
          <button className="btn btn--primary" onClick={handleSaveNotifs}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSection({ showToast }) {
  const { theme, setTheme } = useTheme();
  const [density,     setDensity]     = useState('comfortable');
  const [dateFormat,  setDateFormat]  = useState('YYYY-MM-DD');
  const [animations,  setAnimations]  = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (animations) {
      document.documentElement.classList.remove('no-animations');
    } else {
      document.documentElement.classList.add('no-animations');
    }
  }, [animations]);

  const THEMES = [
    { id: 'light', label: 'Light', desc: 'Clean & professional', preview: ['#f0f4f8', '#ffffff', '#2563eb'] },
    { id: 'dark',  label: 'Dark',  desc: 'Deep navy (default)',   preview: ['#060b14', '#0d1626', '#3b82f6'] },
    { id: 'blue',  label: 'Blue',  desc: 'Electric deep blue',   preview: ['#03071e', '#08103a', '#4d9fff'] },
  ];

  const handleSaveAppearance = () => {
    showToast(`Appearance updated (${theme.toUpperCase()} theme active)`);
  };

  return (
    <div className="settings-section" id="settings-appearance">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-purple)' }}>
          <Palette size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Appearance</h3>
          <p>Customize your theme, visual density, and display preferences</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div>
          <div className="section-title" style={{ marginBottom: 14 }}>Theme</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {THEMES.map(t => (
              <div
                key={t.id}
                id={`theme-card-${t.id}`}
                onClick={() => { setTheme(t.id); showToast(`Switched to ${t.label} theme`); }}
                role="radio"
                aria-checked={theme === t.id}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setTheme(t.id)}
                style={{
                  background: 'var(--bg-raised)',
                  border: theme === t.id ? '2px solid var(--accent-blue)' : '2px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: theme === t.id ? 'var(--glow-blue)' : 'none',
                  transform: theme === t.id ? 'translateY(-2px)' : 'none',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 10, borderRadius: 6, overflow: 'hidden', height: 36 }}>
                  {t.preview.map((c, i) => (
                    <div key={i} style={{ flex: i === 2 ? 0.5 : 1, background: c, borderRadius: 4 }} />
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.desc}</div>
                  </div>
                  {theme === t.id && (
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color="white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">Data Density<span>Controls table row spacing</span></div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['compact', 'comfortable', 'spacious'].map(d => (
              <button
                key={d}
                className={`panel__action-btn ${density === d ? 'active' : ''}`}
                onClick={() => setDensity(d)}
                style={{ flex: 1, textTransform: 'capitalize' }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">Date Format</div>
          <select id="settings-date-format" className="s-select" value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
            <option value="YYYY-MM-DD">2026-08-08 (ISO 8601)</option>
            <option value="MM/DD/YYYY">08/08/2026 (US)</option>
            <option value="DD/MM/YYYY">08/08/2026 (EU)</option>
            <option value="relative">Relative (2h ago)</option>
          </select>
        </div>

        <label className="toggle-row" htmlFor="toggle-animations">
          <div className="toggle-row__info">
            <div className="toggle-row__label">UI Animations</div>
            <div className="toggle-row__desc">
              Card lift effects, fade-ins and transitions
              {!animations && <span style={{ color: 'var(--medium)', marginLeft: 8, fontSize: 11, fontWeight: 600 }}>(disabled)</span>}
            </div>
          </div>
          <label className="toggle">
            <input id="toggle-animations" type="checkbox" checked={animations} onChange={e => setAnimations(e.target.checked)} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <label className="toggle-row" htmlFor="toggle-sidebar-default">
          <div className="toggle-row__info">
            <div className="toggle-row__label">Expanded Sidebar by Default</div>
            <div className="toggle-row__desc">Start with the full sidebar or the collapsed icon view</div>
          </div>
          <label className="toggle">
            <input id="toggle-sidebar-default" type="checkbox" checked={sidebarOpen} onChange={e => setSidebarOpen(e.target.checked)} />
            <div className="toggle__track" />
            <div className="toggle__thumb" />
          </label>
        </label>

        <div className="settings-footer">
          <button className="btn btn--primary" onClick={handleSaveAppearance}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function TeamSection({ team, setTeam, showToast }) {
  const [inviteModal, setInviteModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('analyst');

  const handleRemoveMember = (id, memberName) => {
    if (id === 'u1') return;
    setTeam(team.filter((u) => u.id !== id));
    showToast(`Removed team member "${memberName}"`);
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'TM';
    const newMember = {
      id: `u-${Date.now()}`,
      initials,
      name,
      email,
      role,
      status: 'pending',
      joined: new Date().toISOString().split('T')[0],
      color: '#3b82f6',
    };
    setTeam([...team, newMember]);
    setInviteModal(false);
    setName('');
    setEmail('');
    showToast(`Invitation sent to ${email}`);
  };

  return (
    <div className="settings-section" id="settings-team">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)' }}>
          <Users size={16} />
        </div>
        <div className="settings-section__titles">
          <h3>Team</h3>
          <p>Manage users, roles, and access permissions</p>
        </div>
      </div>

      <div className="settings-section__body">
        <table className="team-table" role="table" aria-label="Team members">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar" style={{ background: user.color }}>{user.initials}</div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-badge--${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`status-dot status-dot--${user.status === 'active' ? 'live' : 'warning'}`} />
                    <span style={{ fontSize: 12, textTransform: 'capitalize' }}>{user.status}</span>
                  </div>
                </td>
                <td>
                  <span className="mono" style={{ fontSize: 11 }}>{user.joined}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {user.id !== 'u1' && (
                      <button
                        className="btn btn--danger"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                        onClick={() => handleRemoveMember(user.id, user.name)}
                        aria-label="Remove user"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="settings-footer">
          <button className="btn btn--primary" onClick={() => setInviteModal(true)}>
            <Plus size={13} /> Invite Member
          </button>
        </div>
      </div>

      {inviteModal && (
        <>
          <div className="modal-overlay" onClick={() => setInviteModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
          <div role="dialog" aria-label="Invite Team Member" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '440px', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: 'var(--glow-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Invite Team Member</h3>
              <button onClick={() => setInviteModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
            </div>

            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
                <input className="s-input" placeholder="e.g. Jordan Lee" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Corporate Email</label>
                <input className="s-input" type="email" placeholder="jordan.lee@corp.internal" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Role / Access Level</label>
                <select className="s-select" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%' }}>
                  <option value="analyst">Security Analyst (Read & Trigger)</option>
                  <option value="admin">Administrator (Full Access)</option>
                  <option value="readonly">Auditor (Read Only)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setInviteModal(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">Send Invitation</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function DangerZoneSection({ showToast }) {
  const [confirmModal, setConfirmModal] = useState(null);

  const handleActionConfirm = () => {
    if (confirmModal === 'purge') {
      showToast('Purged 14,280 scan logs older than 90 days');
    } else if (confirmModal === 'export') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ exportDate: new Date(), org: 'Enterprise Shield Inc' }, null, 2));
      const anchor = document.createElement('a');
      anchor.setAttribute('href', dataStr);
      anchor.setAttribute('download', 'asm-platform-archive.json');
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      showToast('Platform archive downloaded');
    } else if (confirmModal === 'reset') {
      showToast('All system settings reset to default factory configuration');
    } else if (confirmModal === 'delete') {
      showToast('Organisation account deletion request submitted');
    }
    setConfirmModal(null);
  };

  return (
    <div className="settings-section settings-section--danger" id="settings-danger">
      <div className="settings-section__header">
        <div className="settings-section__icon" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--critical)' }}>
          <AlertTriangle size={16} />
        </div>
        <div className="settings-section__titles">
          <h3 style={{ color: 'var(--critical)' }}>Danger Zone</h3>
          <p>Irreversible and destructive actions — proceed with caution</p>
        </div>
      </div>

      <div className="settings-section__body">
        <div className="danger-row">
          <div className="danger-row__info">
            <h4>Purge Historical Scan Data</h4>
            <p>Permanently delete all scan results older than 90 days. This cannot be undone.</p>
          </div>
          <button className="btn btn--danger" style={{ flexShrink: 0 }} onClick={() => setConfirmModal('purge')}>
            <Trash2 size={13} /> Purge Data
          </button>
        </div>

        <div className="danger-row">
          <div className="danger-row__info">
            <h4>Export All Platform Data</h4>
            <p>Download a full archive of your assets, findings, and configuration as a ZIP.</p>
          </div>
          <button className="btn btn--ghost" style={{ flexShrink: 0 }} onClick={() => setConfirmModal('export')}>
            <Download size={13} /> Export Archive
          </button>
        </div>

        <div className="danger-row">
          <div className="danger-row__info">
            <h4>Reset All Settings to Defaults</h4>
            <p>Restore all configuration, notification rules, and schedule settings to factory defaults.</p>
          </div>
          <button className="btn btn--danger" style={{ flexShrink: 0 }} onClick={() => setConfirmModal('reset')}>
            <RefreshCw size={13} /> Reset Settings
          </button>
        </div>

        <div className="danger-row" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
          <div className="danger-row__info">
            <h4 style={{ color: 'var(--critical)' }}>Delete Organisation Account</h4>
            <p>Permanently delete this organisation and all associated data. This action is irreversible.</p>
          </div>
          <button
            className="btn btn--danger"
            style={{ flexShrink: 0, background: 'rgba(239,68,68,0.2)', borderColor: 'rgba(239,68,68,0.5)' }}
            onClick={() => setConfirmModal('delete')}
          >
            <Trash2 size={13} /> Delete Org
          </button>
        </div>
      </div>

      {confirmModal && (
        <>
          <div className="modal-overlay" onClick={() => setConfirmModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,18,0.75)', zIndex: 300 }} />
          <div role="dialog" aria-label="Confirm Action" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '420px', background: 'var(--bg-surface)', border: '1px solid var(--critical)', borderRadius: 'var(--radius-lg)', zIndex: 301, padding: 24, boxShadow: '0 0 30px rgba(239,68,68,0.3)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--critical)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={18} /> Confirm {confirmModal.toUpperCase()} Action
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
              Are you sure you want to proceed with this destructive action? This operation cannot be reversed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn--ghost" onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className="btn btn--danger" onClick={handleActionConfirm}>Confirm & Proceed</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [toastMessage, setToastMessage]   = useState(null);

  const [keys, setKeys]                 = useState(INITIAL_KEYS);
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
  const [team, setTeam]                 = useState(INITIAL_TEAM);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(`settings-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">
            Platform <span>Settings</span>
          </h1>
          <div className="page-header__subtitle">
            Manage account, security, integrations, and system preferences
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {NAV_SECTIONS.map(group => (
            <div key={group.group}>
              <div className="settings-nav__group-label">{group.group}</div>
              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    id={`settings-nav-${item.id}`}
                    className={`settings-nav__item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollTo(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && scrollTo(item.id)}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                  >
                    <Icon size={15} />
                    {item.label}
                    <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="settings-content">
          <ProfileSection       showToast={showToast} />
          <SecuritySection      showToast={showToast} />
          <ApiKeysSection       keys={keys} setKeys={setKeys} showToast={showToast} />
          <IntegrationsSection  integrations={integrations} setIntegrations={setIntegrations} showToast={showToast} />
          <ScanScheduleSection  showToast={showToast} />
          <NotificationsSection showToast={showToast} />
          <AppearanceSection    showToast={showToast} />
          <TeamSection          team={team} setTeam={setTeam} showToast={showToast} />
          <DangerZoneSection    showToast={showToast} />
        </div>
      </div>

      {toastMessage && (
        <div className="save-toast" role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={15} />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
