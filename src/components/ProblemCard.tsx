import type { Problem } from '@/types/problem'
import DifficultyBadge from './DifficultyBadge'

interface ProblemCardProps {
  problem: Problem
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <div className="bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border-subtle dark:border-white/[0.04] bg-surface-raised dark:bg-white/[0.02]">
        <span className="font-mono text-sm text-text-tertiary dark:text-gray-500 tabular-nums">
          #{problem.leetcode_id}
        </span>
        <h2 className="text-lg font-bold text-text-primary dark:text-white tracking-tight flex-1">
          {problem.title}
        </h2>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        <p className="text-text-secondary dark:text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">
          {problem.description}
        </p>

        {problem.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-text-tertiary dark:text-gray-500 uppercase tracking-widest">
              示例
            </h3>
            {problem.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-surface-overlay dark:bg-white/[0.03] rounded-xl p-4 border border-border-subtle dark:border-white/[0.04]"
              >
                <div className="font-mono text-sm space-y-1.5">
                  <div>
                    <span className="text-text-tertiary dark:text-gray-500 text-xs uppercase tracking-wider">输入</span>
                    <div className="text-text-primary dark:text-gray-200 mt-0.5">{ex.input}</div>
                  </div>
                  <div>
                    <span className="text-text-tertiary dark:text-gray-500 text-xs uppercase tracking-wider">输出</span>
                    <div className="text-text-primary dark:text-gray-200 mt-0.5">{ex.output}</div>
                  </div>
                  {ex.explanation && (
                    <div>
                      <span className="text-text-tertiary dark:text-gray-500 text-xs uppercase tracking-wider">解释</span>
                      <div className="text-text-secondary dark:text-gray-400 mt-0.5">{ex.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
