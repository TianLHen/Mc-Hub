// 主题状态管理
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 状态
  const isDark = ref(false)
  const isSystemPreference = ref(true)
  
  // 初始化主题
  const initTheme = () => {
    // 检查本地存储
    const savedTheme = localStorage.getItem('mc-hub-theme')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
      isSystemPreference.value = false
    } else {
      // 检查系统偏好
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      isSystemPreference.value = true
    }
    
    applyTheme()
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (isSystemPreference.value) {
        isDark.value = e.matches
        applyTheme()
      }
    })
  }
  
  // 应用主题
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }
  
  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
    isSystemPreference.value = false
    localStorage.setItem('mc-hub-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }
  
  // 设置主题
  const setTheme = (dark: boolean) => {
    isDark.value = dark
    isSystemPreference.value = false
    localStorage.setItem('mc-hub-theme', dark ? 'dark' : 'light')
    applyTheme()
  }
  
  // 使用系统主题
  const useSystemTheme = () => {
    isSystemPreference.value = true
    localStorage.removeItem('mc-hub-theme')
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme()
  }
  
  // 监听主题变化
  watch(isDark, () => {
    applyTheme()
  })
  
  return {
    isDark,
    isSystemPreference,
    initTheme,
    toggleTheme,
    setTheme,
    useSystemTheme,
  }
})
