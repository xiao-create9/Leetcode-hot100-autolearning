import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { problems } from '@/data'
import type { ProblemProgress, ProblemStatus } from '@/types/user'
import { mapLegacyProblemId } from '@/utils/legacyProblemIds'

interface ProgressState {
  progress: Record<number, ProblemProgress>
  setProblemStatus: (problemId: number, status: ProblemStatus) => void
  getProblemStatus: (problemId: number) => ProblemStatus
  getStats: () => { total: number; notStarted: number; inProgress: number; mastered: number }
  reset: () => void
  loadData: (data: Record<number, ProblemProgress>) => void
}

const STATUS_RANK: Record<ProblemStatus, number> = {
  not_started: 0,
  in_progress: 1,
  mastered: 2,
}

function mergeProgress(a: ProblemProgress, b: ProblemProgress): ProblemProgress {
  const keep = STATUS_RANK[a.status] >= STATUS_RANK[b.status] ? a : b
  const firsts = [a.firstAttemptAt, b.firstAttemptAt].filter((x): x is string => !!x).sort()
  const lasts = [a.lastAttemptAt, b.lastAttemptAt].filter((x): x is string => !!x).sort()
  return {
    ...keep,
    reviewCount: a.reviewCount + b.reviewCount,
    firstAttemptAt: firsts[0],
    lastAttemptAt: lasts[lasts.length - 1],
  }
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
    {
      name: 'leetcode-progress',
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as Partial<ProgressState> | undefined
        if (!state || version >= 2) return state as ProgressState

        const migrated: Record<number, ProblemProgress> = {}
        for (const [legacyId, record] of Object.entries(state.progress ?? {})) {
          const newId = mapLegacyProblemId(Number(legacyId))
          if (newId === undefined) continue
          const next = { ...record, problemId: newId }
          const prev = migrated[newId]
          migrated[newId] = prev ? mergeProgress(prev, next) : next
        }
        return { ...state, progress: migrated } as ProgressState
      },
    },
  ),
)
