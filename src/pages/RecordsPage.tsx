import { useMemo } from 'react'
import { problems } from '@/data'
import { useProgressStore } from '@/stores/useProgressStore'
import { useCheckinStore } from '@/stores/useCheckinStore'
import CheckinCalendar from '@/components/CheckinCalendar'
import ProgressRing from '@/components/ProgressRing'
import DifficultyChart from '@/components/DifficultyChart'
import TagProgress from '@/components/TagProgress'

export default function RecordsPage() {
  const progress = useProgressStore((s) => s.progress)
  const records = useCheckinStore((s) => s.records)

  const stats = useMemo(() => {
    const entries = Object.values(progress)
    return {
      mastered: entries.filter((p) => p.status === 'mastered').length,
      inProgress: entries.filter((p) => p.status === 'in_progress').length,
      total: problems.length,
    }
  }, [progress])

  const consecutiveDays = useMemo(() => {
    let count = 0
    const d = new Date()
    while (records[d.toISOString().slice(0, 10)]) {
      count++
      d.setDate(d.getDate() - 1)
    }
    return count
  }, [records])

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-2">学习记录</h1>
        <p className="text-text-tertiary dark:text-gray-400 mb-6">连续打卡 <span className="font-bold text-accent dark:text-indigo-400 font-mono">{consecutiveDays}</span> 天</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <CheckinCalendar />
          <ProgressRing mastered={stats.mastered} inProgress={stats.inProgress} total={stats.total} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DifficultyChart />
          <TagProgress />
        </div>
      </div>
    </div>
  )
}
