export type ProblemStatus = 'not_started' | 'in_progress' | 'mastered'

export interface ProblemProgress {
  problemId: number
  status: ProblemStatus
  firstAttemptAt?: string
  lastAttemptAt?: string
  reviewCount: number
  nextReviewAt?: string
}

export interface CheckinRecord {
  date: string // YYYY-MM-DD
  problemIds: number[]
}

export type CodeLanguage = 'python' | 'java' | 'cpp' | 'go'

export type PracticeMode = 'uncompleted' | 'random'

export interface UserSettings {
  codeLanguage: CodeLanguage
  practiceMode: PracticeMode
  darkMode: boolean
  reviewReminder: boolean
}
