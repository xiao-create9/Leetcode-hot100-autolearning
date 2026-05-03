import { useMemo } from 'react'
import { problems } from '@/data'
import { useProgressStore } from '@/stores/useProgressStore'

export default function TagProgress() {
  const progress = useProgressStore((s) => s.progress)

  const tagData = useMemo(() => {
    const map: Record<string, { total: number; done: number }> = {}
    for (const p of problems) {
      for (const t of p.tags) {
        if (!map[t]) map[t] = { total: 0, done: 0 }
        map[t].total++
        if (progress[p.id]?.status === 'mastered') map[t].done++
      }
    }
    return Object.entries(map)
      .map(([tag, { total, done }]) => ({
        tag,
        total,
        done,
        pct: total ? Math.round((done / total) * 100) : 0,
      }))
      .sort((a, b) => b.pct - a.pct)
  }, [progress])

  return (
    <div className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6">
      <h3 className="text-xs font-semibold text-text-tertiary dark:text-gray-500 uppercase tracking-widest mb-5">
        标签掌握情况
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tagData.map((t) => (
          <div key={t.tag} className="text-center p-3 rounded-xl bg-surface-overlay dark:bg-white/[0.03] border border-border-subtle dark:border-white/[0.04]">
            <div className="text-2xl font-bold font-mono text-text-primary dark:text-white tabular-nums">
              {t.pct}<span className="text-sm text-text-tertiary dark:text-gray-500">%</span>
            </div>
            <div className="text-xs text-text-secondary dark:text-gray-400 mt-1 truncate font-medium">{t.tag}</div>
            <div className="text-[11px] text-text-tertiary dark:text-gray-500 font-mono mt-0.5 tabular-nums">
              {t.done}/{t.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
