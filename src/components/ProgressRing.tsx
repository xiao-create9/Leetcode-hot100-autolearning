interface ProgressRingProps {
  mastered: number
  inProgress: number
  total: number
}

export default function ProgressRing({ mastered, inProgress, total }: ProgressRingProps) {
  const masteredPct = total > 0 ? (mastered / total) * 100 : 0
  const inProgressPct = total > 0 ? (inProgress / total) * 100 : 0
  const radius = 58
  const circumference = 2 * Math.PI * radius

  const masteredLen = (masteredPct / 100) * circumference
  const inProgressLen = (inProgressPct / 100) * circumference

  return (
    <div className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6 flex flex-col items-center">
      <h3 className="text-xs font-semibold text-text-tertiary dark:text-gray-500 uppercase tracking-widest mb-4">
        总体进度
      </h3>
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="#f1f5f9" className="dark:stroke-white/[0.06]" strokeWidth="10" />
        <circle
          cx="75" cy="75" r={radius} fill="none"
          stroke="#10b981" strokeWidth="10"
          strokeDasharray={`${masteredLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
          className="transition-all duration-700"
        />
        <circle
          cx="75" cy="75" r={radius} fill="none"
          stroke="#f59e0b" strokeWidth="10"
          strokeDasharray={`${inProgressLen} ${circumference}`}
          strokeDashoffset={-masteredLen}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
          className="transition-all duration-700"
        />
        <text x="75" y="68" textAnchor="middle" className="fill-text-primary dark:fill-white text-3xl font-bold font-mono" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
          {mastered}
        </text>
        <text x="75" y="90" textAnchor="middle" className="fill-text-tertiary dark:fill-gray-500 text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
          / {total}
        </text>
      </svg>
      <div className="flex gap-5 mt-3 text-xs text-text-secondary dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          已掌握
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          进行中
        </span>
      </div>
    </div>
  )
}
