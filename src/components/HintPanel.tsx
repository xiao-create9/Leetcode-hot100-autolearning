import type { Hint } from '@/types/problem'

interface HintPanelProps {
  hints: Hint
}

export default function HintPanel({ hints }: HintPanelProps) {
  return (
    <div className="animate-slide-up bg-amber-50/80 dark:bg-amber-500/[0.06] rounded-2xl border border-amber-200/60 dark:border-amber-500/20 p-6 space-y-5 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-amber-200 dark:bg-amber-500/20 flex items-center justify-center">
          <span className="text-amber-700 dark:text-amber-400 text-xs font-bold">💡</span>
        </div>
        <h3 className="text-base font-bold text-amber-900 dark:text-amber-200 tracking-tight">提示</h3>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2.5">
          关键方法
        </h4>
        <div className="flex flex-wrap gap-2">
          {hints.keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-500/20"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
          解题思路
        </h4>
        <p className="text-amber-900 dark:text-amber-200/90 leading-relaxed text-[15px]">{hints.approach}</p>
      </div>

      <div className="flex gap-8 pt-1">
        <div>
          <div className="text-xs text-amber-600 dark:text-amber-400/70 mb-0.5">时间复杂度目标</div>
          <span className="font-mono font-bold text-amber-900 dark:text-amber-200 text-sm">{hints.time_complexity}</span>
        </div>
        <div>
          <div className="text-xs text-amber-600 dark:text-amber-400/70 mb-0.5">空间复杂度目标</div>
          <span className="font-mono font-bold text-amber-900 dark:text-amber-200 text-sm">{hints.space_complexity}</span>
        </div>
      </div>
    </div>
  )
}
