import type { Problem } from '@/types/problem'
import type { CodeLanguage } from '@/types/user'
import CodeBlock from './CodeBlock'

interface SolutionPanelProps {
  problem: Problem
  codeLanguage: CodeLanguage
}

export default function SolutionPanel({ problem, codeLanguage }: SolutionPanelProps) {
  const code = problem.solution?.code?.[codeLanguage] ?? problem.solution?.code?.python ?? ''

  return (
    <div className="animate-slide-up bg-emerald-50/80 dark:bg-emerald-500/[0.06] rounded-2xl border border-emerald-200/60 dark:border-emerald-500/20 p-6 space-y-5 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-emerald-200 dark:bg-emerald-500/20 flex items-center justify-center">
          <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold">✓</span>
        </div>
        <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200 tracking-tight">题解</h3>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
          解题思路
        </h4>
        <p className="text-emerald-900 dark:text-emerald-200/90 leading-relaxed whitespace-pre-line text-[15px]">
          {problem.solution.explanation}
        </p>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2.5">
          代码实现
        </h4>
        <CodeBlock code={code} language={codeLanguage} />
      </div>

      <div>
        <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
          复杂度分析
        </h4>
        <p className="text-emerald-900 dark:text-emerald-200/90 text-[15px]">{problem.solution.complexity_analysis}</p>
      </div>
    </div>
  )
}
