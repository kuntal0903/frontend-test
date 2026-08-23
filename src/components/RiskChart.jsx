import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const MOCK_CHART_DATA = [
  { day: 'Mon', score: 74, vulns: 28 },
  { day: 'Tue', score: 76, vulns: 26 },
  { day: 'Wed', score: 75, vulns: 27 },
  { day: 'Thu', score: 79, vulns: 24 },
  { day: 'Fri', score: 81, vulns: 23 },
  { day: 'Sat', score: 82, vulns: 23 },
  { day: 'Sun', score: 82, vulns: 23 },
];

export default function RiskChart() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="dash-card__header" style={{ marginBottom: 16 }}>
        <h3 className="dash-card__title">Security Score Trend & Exposure Velocity</h3>
        <span className="tab-badge">Past 7 Days</span>
      </div>

      <div style={{ flex: 1, minHeight: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} domain={[60, 100]} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: 8, color: 'var(--text-primary)' }}
            />
            <Area type="monotone" dataKey="score" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#scoreGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
