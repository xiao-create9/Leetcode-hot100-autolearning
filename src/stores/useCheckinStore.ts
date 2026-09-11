import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckinRecord } from '@/types/user'
import { mapLegacyProblemId } from '@/utils/legacyProblemIds'

interface CheckinState {
  records: Record<string, CheckinRecord>
  checkin: (problemId: number) => void
  isCheckedin: (date: string) => boolean
  getConsecutiveDays: () => number
  getMonthRecords: (year: number, month: number) => CheckinRecord[]
  reset: () => void
  loadData: (data: Record<string, CheckinRecord>) => void
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const useCheckinStore = create<CheckinState>()(
  persist(
    (set, get) => ({
      records: {},

      checkin: (problemId) => {
        const today = formatDate(new Date())
        set((state) => {
          const existing = state.records[today]
          const problemIds = existing
            ? [...new Set([...existing.problemIds, problemId])]
            : [problemId]
          return {
            records: {
              ...state.records,
              [today]: { date: today, problemIds },
            },
          }
        })
      },

      isCheckedin: (date) => {
        return get().records[date] !== undefined
      },

      getConsecutiveDays: () => {
        const { records } = get()
        let count = 0
        const d = new Date()
        while (records[formatDate(d)]) {
          count++
          d.setDate(d.getDate() - 1)
        }
        return count
      },

      getMonthRecords: (year, month) => {
        const { records } = get()
        return Object.values(records).filter((r) => {
          const [y, m] = r.date.split('-').map(Number)
          return y === year && m === month
        })
      },

      reset: () => set({ records: {} }),

      loadData: (data) => set({ records: data }),
    }),
    {
      name: 'leetcode-checkin',
      version: 2,
      migrate: (persisted, version) => {
        const state = persisted as Partial<CheckinState> | undefined
        if (!state || version >= 2) return state as CheckinState

        const migrated: Record<string, CheckinRecord> = {}
        for (const [date, record] of Object.entries(state.records ?? {})) {
          const problemIds = record.problemIds
            .map((legacyId) => mapLegacyProblemId(legacyId))
            .filter((id): id is number => id !== undefined)
          migrated[date] = { ...record, problemIds: [...new Set(problemIds)] }
        }
        return { ...state, records: migrated } as CheckinState
      },
    },
  ),
)
