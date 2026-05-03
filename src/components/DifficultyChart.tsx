import { problems } from '@/data'
import { useProgressStore } from '@/stores/useProgressStore'

export default function DifficultyChart() {
  const progress = useProgressStore((s) => s.progress)

  const data = [
    { label: '简单', color: 'bg-emerald-500', total: 0, done: 0 },
    { label: '中等', color: 'bg-amber-500', total: 0, done: 0 },
    { label: '困难', color: 'bg-red-500', total: 0, done: 0 },
  ]

  for (const p of problems) {
    const idx = p.difficulty === 'easy' ? 0 : p.difficulty === 'medium' ? 1 : 2
    data[idx].total++
    if (progress[p.id]?.status === 'mastered') data[idx].done++
  }

  const max = Math.max(...data.map((d) => d.total), 1)

  return (
    <div className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6">
      <h3 className="text-xs font-semibold text-text-tertiary dark:text-gray-500 uppercase tracking-widest mb-5">
        难度分布
      </h3>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-primary dark:text-gray-200 font-medium">{d.label}</span>
              <span className="font-mono text-xs text-text-tertiary dark:text-gray-500 tabular-nums">
                {d.done} / {d.total}
              </span>
            </div>
            <div className="h-2 bg-surface-overlay dark:bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full ${d.color} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${(d.done / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
