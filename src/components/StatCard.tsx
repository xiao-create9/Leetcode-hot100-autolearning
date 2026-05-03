interface StatCardProps {
  label: string
  value: number | string
  sub?: string
  color?: string
  accent?: string
}

export default function StatCard({ label, value, sub, color = 'text-text-primary dark:text-white', accent }: StatCardProps) {
  return (
    <div className="group relative bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6 transition-all duration-300 hover:shadow-lg hover:border-accent/20 dark:hover:border-accent/20 hover:-translate-y-0.5">
      {accent && (
        <div
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: accent }}
        />
      )}
      <div className={`text-4xl font-bold font-mono tracking-tight ${color}`}>
        {value}
      </div>
      <div className="text-sm text-text-secondary dark:text-gray-400 mt-1.5 font-medium">{label}</div>
      {sub && <div className="text-xs text-text-tertiary dark:text-gray-500 mt-0.5">{sub}</div>}
    </div>
  )
}
