import type { Problem } from '@/types/problem'

interface ValidationError {
  problemId: number
  title: string
  field: string
  message: string
}

export function validateProblem(p: Problem): ValidationError[] {
  const errors: ValidationError[] = []
  const add = (field: string, msg: string) =>
    errors.push({ problemId: p.id, title: p.title, field, message: msg })

  if (!p.id || typeof p.id !== 'number') add('id', '缺少或无效的 id')
  if (!p.leetcode_id || typeof p.leetcode_id !== 'number') add('leetcode_id', '缺少或无效的 leetcode_id')
  if (!p.title) add('title', '缺少题目标题')
  if (!p.title_en) add('title_en', '缺少英文标题')
  if (!['easy', 'medium', 'hard'].includes(p.difficulty)) add('difficulty', '难度值无效')
  if (!p.tags || p.tags.length === 0) add('tags', '缺少标签')
  if (!p.description) add('description', '缺少题目描述')
  if (!p.examples || p.examples.length === 0) add('examples', '缺少示例')

  for (const ex of p.examples ?? []) {
    if (!ex.input) add('examples.input', '示例缺少 input')
    if (!ex.output) add('examples.output', '示例缺少 output')
  }

  if (!p.hints) add('hints', '缺少提示')
  else {
    if (!p.hints.keywords?.length) add('hints.keywords', '缺少关键词')
    if (!p.hints.approach) add('hints.approach', '缺少解题思路')
    if (!p.hints.time_complexity) add('hints.time_complexity', '缺少时间复杂度')
    if (!p.hints.space_complexity) add('hints.space_complexity', '缺少空间复杂度')
  }

  if (!p.solution) add('solution', '缺少解法')
  else {
    if (!p.solution.explanation) add('solution.explanation', '缺少解法说明')
    if (!p.solution.code?.python) add('solution.code.python', '缺少 Python 解法')
    if (!p.solution.complexity_analysis) add('solution.complexity_analysis', '缺少复杂度分析')
  }

  return errors
}

export function validateAll(problems: Problem[]): void {
  const allErrors: ValidationError[] = []
  for (const p of problems) {
    allErrors.push(...validateProblem(p))
  }

  if (allErrors.length === 0) {
    console.log(`✅ 全部 ${problems.length} 道题目校验通过`)
    return
  }

  console.error(`❌ 发现 ${allErrors.length} 个校验错误：`)
  for (const e of allErrors) {
    console.error(`  [题${e.problemId}] ${e.title} - ${e.field}: ${e.message}`)
  }
}
