import type { Difficulty } from '@/types/problem'

const config: Record<Difficulty, { label: string; dot: string; bg: string; text: string }> = {
  easy: {
    label: '简单',
    dot: 'bg-easy',
    bg: 'bg-easy-bg dark:bg-easy/10',
    text: 'text-easy dark:text-emerald-400',
  },
  medium: {
    label: '中等',
    dot: 'bg-medium',
    bg: 'bg-medium-bg dark:bg-medium/10',
    text: 'text-amber-700 dark:text-amber-400',
  },
  hard: {
    label: '困难',
    dot: 'bg-hard',
    bg: 'bg-hard-bg dark:bg-hard/10',
    text: 'text-hard dark:text-red-400',
  },
}

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const c = config[difficulty]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}
