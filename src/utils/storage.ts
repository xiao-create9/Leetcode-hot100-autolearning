export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function storageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Failed to write localStorage key "${key}":`, e)
  }
}

export function storageRemove(key: string): void {
  localStorage.removeItem(key)
}

export function storageClear(): void {
  localStorage.clear()
}
