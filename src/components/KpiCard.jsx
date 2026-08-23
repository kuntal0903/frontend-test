export default function KpiCard({ title, value, trend, trendUp, color = 'blue', icon: Icon }) {
  return (
    <div className={`kpi-card kpi-card--${color}`}>
      <div className="kpi-card__header">
        <div className="kpi-card__icon-wrap">
          {Icon && <Icon size={20} />}
        </div>
        {trend && (
          <div className={`kpi-card__trend ${trendUp ? 'kpi-card__trend--up' : 'kpi-card__trend--down'}`}>
            {trend}
          </div>
        )}
      </div>

      <div className="kpi-card__value">{value}</div>
      <div className="kpi-card__label">{title}</div>
    </div>
  );
}
