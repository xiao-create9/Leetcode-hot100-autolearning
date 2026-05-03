import type { ProblemStatus } from '@/types/user'

const config: Record<ProblemStatus, { label: string; className: string }> = {
  not_started: {
    label: '未开始',
    className: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400',
  },
  in_progress: {
    label: '进行中',
    className: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
  mastered: {
    label: '已掌握',
    className: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  },
}

export default function StatusBadge({ status }: { status: ProblemStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  )
}
