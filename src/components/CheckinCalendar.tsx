import { useState, useMemo } from 'react'
import { useCheckinStore } from '@/stores/useCheckinStore'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function CheckinCalendar() {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [month, setMonth] = useState(() => new Date().getMonth() + 1)
  const records = useCheckinStore((s) => s.records)

  const today = (() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })()

  const days = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const totalDays = new Date(year, month, 0).getDate()
    const cells: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= totalDays; d++) cells.push(d)
    return cells
  }, [year, month])

  const prev = () => {
    if (month === 1) { setYear(year - 1); setMonth(12) }
    else setMonth(month - 1)
  }
  const next = () => {
    if (month === 12) { setYear(year + 1); setMonth(1) }
    else setMonth(month + 1)
  }

  return (
    <div className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary dark:hover:text-white hover:bg-surface-overlay dark:hover:bg-white/[0.06] transition-all"
        >
          ‹
        </button>
        <span className="font-bold text-text-primary dark:text-white tracking-tight font-mono text-sm">
          {year}.{String(month).padStart(2, '0')}
        </span>
        <button
          onClick={next}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary dark:hover:text-white hover:bg-surface-overlay dark:hover:bg-white/[0.06] transition-all"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-text-tertiary dark:text-gray-500 font-medium py-1 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (d === null) return <div key={i} />
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
          const checked = !!records[dateStr]
          const isToday = dateStr === today
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                checked
                  ? 'bg-accent text-white shadow-md shadow-accent/20 font-bold'
                  : isToday
                  ? 'bg-accent-light dark:bg-accent/15 text-accent dark:text-indigo-300 font-bold ring-1 ring-accent/30'
                  : 'text-text-secondary dark:text-gray-400 hover:bg-surface-overlay dark:hover:bg-white/[0.04]'
              }`}
            >
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}
