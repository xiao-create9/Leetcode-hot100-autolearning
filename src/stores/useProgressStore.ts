import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { problems } from '@/data'
import type { ProblemProgress, ProblemStatus } from '@/types/user'

interface ProgressState {
  progress: Record<number, ProblemProgress>
  setProblemStatus: (problemId: number, status: ProblemStatus) => void
  getProblemStatus: (problemId: number) => ProblemStatus
  getStats: () => { total: number; notStarted: number; inProgress: number; mastered: number }
  reset: () => void
  loadData: (data: Record<number, ProblemProgress>) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      setProblemStatus: (problemId, status) => {
        set((state) => {
          const existing = state.progress[problemId]
          const now = new Date().toISOString()
          return {
            progress: {
              ...state.progress,
              [problemId]: {
                problemId,
                status,
                firstAttemptAt: existing?.firstAttemptAt ?? now,
                lastAttemptAt: now,
                reviewCount: (existing?.reviewCount ?? 0) + 1,
              },
            },
          }
        })
      },

      getProblemStatus: (problemId) => {
        return get().progress[problemId]?.status ?? 'not_started'
      },

      getStats: () => {
        const entries = Object.values(get().progress)
        const inProgress = entries.filter((p) => p.status === 'in_progress').length
        const mastered = entries.filter((p) => p.status === 'mastered').length
        return {
          total: problems.length,
          notStarted: problems.length - inProgress - mastered,
          inProgress,
          mastered,
        }
      },

      reset: () => set({ progress: {} }),

      loadData: (data) => set({ progress: data }),
    }),
    { name: 'leetcode-progress' },
  ),
)
