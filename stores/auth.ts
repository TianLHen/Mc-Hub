// 用户状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 计算属性
  const isLoggedIn = computed(() => !!user.value && !!token.value)
  const username = computed(() => user.value?.username || '')
  const avatar = computed(() => user.value?.avatar || '/images/default-avatar.png')
  
  // 初始化
  const initAuth = () => {
    const savedToken = localStorage.getItem('mc-hub-token')
    const savedUser = localStorage.getItem('mc-hub-user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Failed to parse saved user:', e)
        logout()
      }
    }
  }
  
  // 登录
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      // 模拟登录成功
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        username: '测试用户',
        email: credentials.email,
        avatar: undefined,
        bio: '这是一个测试用户',
        level: 5,
        points: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      user.value = mockUser
      token.value = 'mock-token-' + Date.now()
      
      // 保存到本地存储
      localStorage.setItem('mc-hub-token', token.value)
      localStorage.setItem('mc-hub-user', JSON.stringify(user.value))
      
      return true
    } catch (e: any) {
      error.value = e.message || '登录失败'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 注册
  const register = async (data: RegisterData): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      // 验证密码
      if (data.password !== data.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }
      
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: '1',
        username: data.username,
        email: data.email,
        avatar: undefined,
        bio: '',
        level: 1,
        points: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      user.value = mockUser
      token.value = 'mock-token-' + Date.now()
      
      // 保存到本地存储
      localStorage.setItem('mc-hub-token', token.value)
      localStorage.setItem('mc-hub-user', JSON.stringify(user.value))
      
      return true
    } catch (e: any) {
      error.value = e.message || '注册失败'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 退出登录
  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    
    localStorage.removeItem('mc-hub-token')
    localStorage.removeItem('mc-hub-user')
  }
  
  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('mc-hub-user', JSON.stringify(user.value))
    }
  }
  
  // 清除错误
  const clearError = () => {
    error.value = null
  }
  
  return {
    user,
    token,
    isLoading,
    error,
    isLoggedIn,
    username,
    avatar,
    initAuth,
    login,
    register,
    logout,
    updateUser,
    clearError,
  }
})
