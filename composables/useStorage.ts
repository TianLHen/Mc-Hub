// 本地存储组合式函数
import { ref, watch } from 'vue'

export function useStorage<T>(key: string, defaultValue: T) {
  // 从localStorage读取初始值
  const readFromStorage = (): T => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const storedValue = ref<T>(readFromStorage())

  // 写入localStorage
  const writeToStorage = (value: T) => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Failed to write to localStorage:', e)
    }
  }

  // 监听值变化，自动同步到localStorage
  watch(storedValue, (newValue) => {
    writeToStorage(newValue)
  }, { deep: true })

  // 设置值
  const setValue = (value: T) => {
    storedValue.value = value
  }

  // 移除值
  const removeValue = () => {
    storedValue.value = defaultValue
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }

  return {
    value: storedValue,
    setValue,
    removeValue,
  }
}
