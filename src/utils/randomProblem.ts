import { problems } from '@/data'
import type { Problem, Difficulty, Tag } from '@/types/problem'
import type { PracticeMode } from '@/types/user'
import { useProgressStore } from '@/stores/useProgressStore'

interface FilterOptions {
  mode: PracticeMode
  difficulty?: Difficulty
  tag?: Tag
}

export function getRandomProblem(options: FilterOptions, excludeId?: number): Problem | null {
  const { mode, difficulty, tag } = options
  const progress = useProgressStore.getState().progress

  let pool = [...problems]

  // Filter by difficulty
  if (difficulty) {
    pool = pool.filter((p) => p.difficulty === difficulty)
  }

  // Filter by tag
  if (tag) {
    pool = pool.filter((p) => p.tags.includes(tag))
  }

  // Filter by mode
  if (mode === 'uncompleted') {
    const uncompleted = pool.filter((p) => !progress[p.id] || progress[p.id].status !== 'mastered')
    if (uncompleted.length > 0) {
      pool = uncompleted
    }
  }

  // Exclude current problem
  if (excludeId !== undefined) {
    pool = pool.filter((p) => p.id !== excludeId)
  }

  if (pool.length === 0) return null

  return pool[Math.floor(Math.random() * pool.length)]
}
