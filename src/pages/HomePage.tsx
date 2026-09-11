import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { problems } from '@/data'
import { useProgressStore } from '@/stores/useProgressStore'
import { useCheckinStore } from '@/stores/useCheckinStore'
import StatCard from '@/components/StatCard'

export default function HomePage() {
  const progress = useProgressStore((s) => s.progress)
  const records = useCheckinStore((s) => s.records)

  const stats = useMemo(() => {
    const entries = Object.values(progress)
    const mastered = entries.filter((p) => p.status === 'mastered').length
    const inProgress = entries.filter((p) => p.status === 'in_progress').length
    return {
      mastered,
      inProgress,
      notStarted: problems.length - mastered - inProgress,
    }
  }, [progress])

  const consecutiveDays = useMemo(() => {
    let count = 0
    const d = new Date()
    const fmt = (dt: Date) => {
      const y = dt.getFullYear()
      const m = String(dt.getMonth() + 1).padStart(2, '0')
      const day = String(dt.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    }
    while (records[fmt(d)]) {
      count++
      d.setDate(d.getDate() - 1)
    }
    return count
  }, [records])

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary dark:text-white mb-2">LeetCode Hot 100</h1>
          <p className="text-text-tertiary dark:text-gray-400">刷题打卡助手，每日一练，稳步提升</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="已掌握" value={stats.mastered} color="text-emerald-600 dark:text-emerald-400" />
          <StatCard label="进行中" value={stats.inProgress} color="text-amber-600 dark:text-amber-400" />
          <StatCard label="未开始" value={stats.notStarted} color="text-text-tertiary dark:text-gray-500" />
          <StatCard label="连续打卡" value={consecutiveDays} sub="天" color="text-accent dark:text-indigo-400" />
        </div>

        <div className="text-center mb-10">
          <Link
            to="/practice"
            className="inline-block px-10 py-4 bg-accent text-white text-lg font-semibold rounded-xl hover:bg-accent-hover active:scale-[0.97] transition-all shadow-lg shadow-accent/25"
          >
            开始刷题
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/problems"
            className="flex items-center gap-3 bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-5 hover:border-accent/30 hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-light dark:bg-accent/15 flex items-center justify-center text-accent text-lg font-bold">
              &#9776;
            </div>
            <div>
              <div className="font-semibold text-text-primary dark:text-white">题目列表</div>
              <div className="text-sm text-text-tertiary dark:text-gray-400">浏览全部 Hot 100</div>
            </div>
          </Link>

          <Link
            to="/records"
            className="flex items-center gap-3 bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-5 hover:border-accent/30 hover:shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-light dark:bg-accent/15 flex items-center justify-center text-accent text-lg font-bold">
              &#128202;
            </div>
            <div>
              <div className="font-semibold text-text-primary dark:text-white">学习记录</div>
              <div className="text-sm text-text-tertiary dark:text-gray-400">查看打卡与进度</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
