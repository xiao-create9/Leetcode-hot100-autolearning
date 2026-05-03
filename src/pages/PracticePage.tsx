import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { problems } from '@/data'
import type { Problem, Difficulty, Tag } from '@/types/problem'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { useProgressStore } from '@/stores/useProgressStore'
import { useCheckinStore } from '@/stores/useCheckinStore'
import { getRandomProblem } from '@/utils/randomProblem'
import ProblemCard from '@/components/ProblemCard'
import TagList from '@/components/TagList'
import HintPanel from '@/components/HintPanel'
import SolutionPanel from '@/components/SolutionPanel'

type Phase = 'idle' | 'problem' | 'hint' | 'solution'

const selectClass = 'px-3 py-2 rounded-xl border border-border dark:border-white/[0.08] text-sm bg-surface dark:bg-white/[0.04] text-text-primary dark:text-gray-100 transition-colors focus:ring-2 focus:ring-accent/30 focus:border-accent/50 outline-none'

export default function PracticePage() {
  const [searchParams] = useSearchParams()
  const [phase, setPhase] = useState<Phase>('idle')
  const [problem, setProblem] = useState<Problem | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>()
  const [tag, setTag] = useState<Tag | undefined>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { codeLanguage, practiceMode } = useSettingsStore()
  const setProblemStatus = useProgressStore((s) => s.setProblemStatus)
  const checkin = useCheckinStore((s) => s.checkin)

  // Auto-load problem from URL query param
  useEffect(() => {
    const idParam = searchParams.get('id')
    if (idParam) {
      const found = problems.find((p) => p.id === Number(idParam))
      if (found) {
        setProblem(found)
        setPhase('problem')
      }
    }
  }, [searchParams])

  const loadProblem = useCallback(() => {
    setErrorMsg(null)
    const p = getRandomProblem({ mode: practiceMode, difficulty, tag }, problem?.id)
    if (p) {
      setProblem(p)
      setPhase('problem')
    } else {
      setErrorMsg('没有符合条件的题目，请调整筛选条件')
    }
  }, [practiceMode, difficulty, tag, problem?.id])

  const handleMark = (status: 'mastered' | 'in_progress') => {
    if (!problem) return
    setProblemStatus(problem.id, status)
    checkin(problem.id)
  }

  const handleNext = () => {
    loadProblem()
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-6">刷题</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={difficulty ?? ''}
            onChange={(e) => setDifficulty(e.target.value as Difficulty || undefined)}
            className={selectClass}
          >
            <option value="">全部难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>

          <select
            value={tag ?? ''}
            onChange={(e) => setTag(e.target.value as Tag || undefined)}
            className={selectClass}
          >
            <option value="">全部标签</option>
            {['哈希表', '双指针', '滑动窗口', '数组', '矩阵', '链表', '二叉树', '图论', '回溯', '二分查找', '栈', '堆', '贪心算法', '动态规划', '多维DP', '技巧'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 animate-fade-in">
            {errorMsg}
          </div>
        )}

        {/* Idle state */}
        {phase === 'idle' && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-accent-light dark:bg-accent/15 flex items-center justify-center">
              <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <p className="text-text-tertiary dark:text-gray-400 mb-6 text-lg">点击按钮开始随机刷题</p>
            <button
              onClick={loadProblem}
              className="px-8 py-3.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover active:scale-[0.97] transition-all shadow-lg shadow-accent/25"
            >
              开始刷题
            </button>
          </div>
        )}

        {/* Problem phase */}
        {phase === 'problem' && problem && (
          <div className="space-y-4 animate-fade-in">
            <ProblemCard problem={problem} />
            <div className="blur-sm select-none pointer-events-none">
              <TagList tags={problem.tags} blurred />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPhase('hint')}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 active:scale-[0.97] transition-all shadow-md shadow-amber-500/20"
              >
                显示提示
              </button>
              <button
                onClick={() => setPhase('solution')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 active:scale-[0.97] transition-all shadow-md shadow-emerald-600/20"
              >
                显示答案
              </button>
            </div>
          </div>
        )}

        {/* Hint phase */}
        {phase === 'hint' && problem && (
          <div className="space-y-4 animate-fade-in">
            <ProblemCard problem={problem} />
            <TagList tags={problem.tags} />
            <HintPanel hints={problem.hints} />
            <div className="flex gap-3">
              <button
                onClick={() => setPhase('solution')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 active:scale-[0.97] transition-all shadow-md shadow-emerald-600/20"
              >
                显示答案
              </button>
            </div>
          </div>
        )}

        {/* Solution phase */}
        {phase === 'solution' && problem && (
          <div className="space-y-4 animate-fade-in">
            <ProblemCard problem={problem} />
            <TagList tags={problem.tags} />
            <HintPanel hints={problem.hints} />
            <SolutionPanel problem={problem} codeLanguage={codeLanguage} />
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { handleMark('mastered'); handleNext() }}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 active:scale-[0.97] transition-all shadow-md shadow-emerald-600/20"
              >
                已掌握，下一题
              </button>
              <button
                onClick={() => { handleMark('in_progress'); handleNext() }}
                className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 active:scale-[0.97] transition-all shadow-md shadow-orange-500/20"
              >
                未掌握，下一题
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
