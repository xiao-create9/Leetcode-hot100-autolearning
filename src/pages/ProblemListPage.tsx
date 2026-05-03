import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { problems } from '@/data'
import type { Problem, Difficulty, Tag } from '@/types/problem'
import type { ProblemStatus } from '@/types/user'
import { useProgressStore } from '@/stores/useProgressStore'
import DifficultyBadge from '@/components/DifficultyBadge'
import StatusBadge from '@/components/StatusBadge'

type SortKey = 'id' | 'difficulty' | 'status'

const difficultyOrder: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 }
const statusOrder: Record<ProblemStatus, number> = { not_started: 1, in_progress: 2, mastered: 3 }

const selectClass = 'px-3 py-2 rounded-xl border border-border dark:border-white/[0.08] text-sm bg-surface dark:bg-white/[0.04] text-text-primary dark:text-gray-100 transition-colors focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none'

export default function ProblemListPage() {
  const navigate = useNavigate()
  const progress = useProgressStore((s) => s.progress)

  const [diffFilter, setDiffFilter] = useState<Difficulty | ''>('')
  const [tagFilter, setTagFilter] = useState<Tag | ''>('')
  const [statusFilter, setStatusFilter] = useState<ProblemStatus | ''>('')
  const [sortKey, setSortKey] = useState<SortKey>('id')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    problems.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    let list: Problem[] = [...problems]
    if (diffFilter) list = list.filter((p) => p.difficulty === diffFilter)
    if (tagFilter) list = list.filter((p) => p.tags.includes(tagFilter as Tag))
    if (statusFilter) {
      list = list.filter((p) => {
        const s = progress[p.id]?.status ?? 'not_started'
        return s === statusFilter
      })
    }
    list.sort((a, b) => {
      if (sortKey === 'id') return a.id - b.id
      if (sortKey === 'difficulty') return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      const sa = progress[a.id]?.status ?? 'not_started'
      const sb = progress[b.id]?.status ?? 'not_started'
      return statusOrder[sa] - statusOrder[sb]
    })
    return list
  }, [diffFilter, tagFilter, statusFilter, sortKey, progress])

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-6">题目列表</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <select value={diffFilter} onChange={(e) => setDiffFilter(e.target.value as Difficulty | '')} className={selectClass}>
            <option value="">全部难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
          <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value as Tag | '')} className={selectClass}>
            <option value="">全部标签</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ProblemStatus | '')} className={selectClass}>
            <option value="">全部状态</option>
            <option value="not_started">未开始</option>
            <option value="in_progress">进行中</option>
            <option value="mastered">已掌握</option>
          </select>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className={selectClass}>
            <option value="id">按序号</option>
            <option value="difficulty">按难度</option>
            <option value="status">按状态</option>
          </select>
        </div>

        <div className="text-sm text-text-tertiary dark:text-gray-400 mb-3 font-mono">共 {filtered.length} 题</div>

        {/* Desktop table */}
        <div className="hidden sm:block bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] overflow-hidden transition-colors">
          <table className="w-full">
            <thead className="bg-surface-overlay dark:bg-white/[0.03] text-left text-xs text-text-tertiary dark:text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 w-16">#</th>
                <th className="px-4 py-3">题目</th>
                <th className="px-4 py-3 w-20">难度</th>
                <th className="px-4 py-3">标签</th>
                <th className="px-4 py-3 w-20">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle dark:divide-white/[0.04]">
              {filtered.map((p) => {
                const status = progress[p.id]?.status ?? 'not_started'
                return (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/practice?id=${p.id}`)}
                    className="hover:bg-accent-light/50 dark:hover:bg-accent/10 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-text-tertiary dark:text-gray-500 font-mono">{p.leetcode_id}</td>
                    <td className="px-4 py-3 font-medium text-text-primary dark:text-white">{p.title}</td>
                    <td className="px-4 py-3"><DifficultyBadge difficulty={p.difficulty} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-lg text-xs bg-surface-overlay dark:bg-white/[0.06] text-text-secondary dark:text-gray-400">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={status} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {filtered.map((p) => {
            const status = progress[p.id]?.status ?? 'not_started'
            return (
              <div
                key={p.id}
                onClick={() => navigate(`/practice?id=${p.id}`)}
                className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-4 active:bg-accent-light/50 dark:active:bg-accent/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-tertiary dark:text-gray-500 font-mono">#{p.leetcode_id}</span>
                  <div className="flex gap-2">
                    <DifficultyBadge difficulty={p.difficulty} />
                    <StatusBadge status={status} />
                  </div>
                </div>
                <div className="font-medium text-text-primary dark:text-white mb-2">{p.title}</div>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-lg text-xs bg-surface-overlay dark:bg-white/[0.06] text-text-secondary dark:text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
