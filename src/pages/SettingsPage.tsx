import { useRef, useState } from 'react'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { exportData, importData, resetAllData } from '@/utils/dataManager'
import type { CodeLanguage, PracticeMode } from '@/types/user'

export default function SettingsPage() {
  const { codeLanguage, practiceMode, darkMode, setCodeLanguage, setPracticeMode, toggleDarkMode } = useSettingsStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await importData(file)
    setMsg({ type: result.success ? 'ok' : 'err', text: result.message })
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    resetAllData()
    setConfirmReset(false)
    setMsg({ type: 'ok', text: '数据已重置' })
  }

  const cardClass = 'bg-surface dark:bg-white/[0.03] rounded-2xl border border-border dark:border-white/[0.06] p-6 transition-colors'
  const btnBase = 'px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.97]'
  const btnInactive = 'bg-surface-overlay dark:bg-white/[0.06] text-text-secondary dark:text-gray-300 hover:bg-border dark:hover:bg-white/[0.1]'

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-6">设置</h1>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm animate-fade-in ${msg.type === 'ok' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
            {msg.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Dark mode */}
          <div className={cardClass}>
            <h2 className="font-semibold text-text-primary dark:text-white mb-3">外观</h2>
            <button
              onClick={toggleDarkMode}
              className={`${btnBase} ${darkMode ? 'bg-accent text-white shadow-md shadow-accent/20' : btnInactive}`}
            >
              {darkMode ? '深色模式已开启' : '深色模式'}
            </button>
          </div>

          {/* Code language */}
          <div className={cardClass}>
            <h2 className="font-semibold text-text-primary dark:text-white mb-3">默认代码语言</h2>
            <div className="flex gap-2">
              {(['python', 'java', 'cpp', 'go'] as CodeLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCodeLanguage(lang)}
                  className={`${btnBase} ${
                    codeLanguage === lang
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : btnInactive
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Practice mode */}
          <div className={cardClass}>
            <h2 className="font-semibold text-text-primary dark:text-white mb-3">出题策略</h2>
            <div className="flex gap-2">
              {([
                { value: 'uncompleted', label: '优先未完成' },
                { value: 'random', label: '完全随机' },
              ] as { value: PracticeMode; label: string }[]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPracticeMode(opt.value)}
                  className={`${btnBase} ${
                    practiceMode === opt.value
                      ? 'bg-accent text-white shadow-md shadow-accent/20'
                      : btnInactive
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data management */}
          <div className={cardClass}>
            <h2 className="font-semibold text-text-primary dark:text-white mb-3">数据管理</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportData}
                className={`${btnBase} ${btnInactive}`}
              >
                导出数据
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className={`${btnBase} ${btnInactive}`}
              >
                导入数据
              </button>
              <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <button
                onClick={handleReset}
                className={`${btnBase} ${
                  confirmReset
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
                }`}
              >
                {confirmReset ? '确认重置？' : '重置进度'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
