import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CodeLanguage, PracticeMode } from '@/types/user'

interface SettingsState {
  codeLanguage: CodeLanguage
  practiceMode: PracticeMode
  darkMode: boolean
  reviewReminder: boolean
  setCodeLanguage: (lang: CodeLanguage) => void
  setPracticeMode: (mode: PracticeMode) => void
  toggleDarkMode: () => void
  toggleReviewReminder: () => void
  reset: () => void
}

const defaults = {
  codeLanguage: 'python' as CodeLanguage,
  practiceMode: 'uncompleted' as PracticeMode,
  darkMode: false,
  reviewReminder: true,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,

      setCodeLanguage: (lang) => set({ codeLanguage: lang }),
      setPracticeMode: (mode) => set({ practiceMode: mode }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleReviewReminder: () => set((s) => ({ reviewReminder: !s.reviewReminder })),
      reset: () => set(defaults),
    }),
    { name: 'leetcode-settings' },
  ),
)
