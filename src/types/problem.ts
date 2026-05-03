export type Difficulty = 'easy' | 'medium' | 'hard'

export type Tag = string

export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface Hint {
  keywords: string[]
  approach: string
  time_complexity: string
  space_complexity: string
}

export interface SolutionCode {
  python: string
  java?: string
  cpp?: string
  go?: string
}

export interface Solution {
  explanation: string
  code: SolutionCode
  complexity_analysis: string
}

export interface Problem {
  id: number
  leetcode_id: number
  title: string
  title_en: string
  difficulty: Difficulty
  tags: Tag[]
  description: string
  examples: Example[]
  hints: Hint
  solution: Solution
  related_problems: number[]
  frequency: 'high' | 'medium' | 'low'
}
