import { useProgressStore } from '@/stores/useProgressStore'
import { useCheckinStore } from '@/stores/useCheckinStore'
import { useSettingsStore } from '@/stores/useSettingsStore'

interface ExportData {
  version: 1
  exportedAt: string
  progress: ReturnType<typeof useProgressStore.getState>['progress']
  checkinRecords: ReturnType<typeof useCheckinStore.getState>['records']
  settings: {
    codeLanguage: ReturnType<typeof useSettingsStore.getState>['codeLanguage']
    practiceMode: ReturnType<typeof useSettingsStore.getState>['practiceMode']
  }
}

export function exportData(): void {
  const progress = useProgressStore.getState().progress
  const records = useCheckinStore.getState().records
  const { codeLanguage, practiceMode } = useSettingsStore.getState()

  const data: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress,
    checkinRecords: records,
    settings: { codeLanguage, practiceMode },
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leetcode-hot100-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function importData(file: File): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as ExportData

        if (data.version !== 1) {
          resolve({ success: false, message: '不支持的数据版本' })
          return
        }

        if (data.progress) {
          useProgressStore.getState().loadData(data.progress)
        }
        if (data.checkinRecords) {
          useCheckinStore.getState().loadData(data.checkinRecords)
        }
        if (data.settings) {
          const store = useSettingsStore.getState()
          store.setCodeLanguage(data.settings.codeLanguage)
          store.setPracticeMode(data.settings.practiceMode)
        }

        resolve({ success: true, message: '数据导入成功' })
      } catch {
        resolve({ success: false, message: '文件格式错误，请选择有效的备份文件' })
      }
    }
    reader.onerror = () => resolve({ success: false, message: '文件读取失败' })
    reader.readAsText(file)
  })
}

export function resetAllData(): void {
  useProgressStore.getState().reset()
  useCheckinStore.getState().reset()
  useSettingsStore.getState().reset()
}
