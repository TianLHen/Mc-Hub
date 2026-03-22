// 用户状态管理 - Supabase 版本
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<any>(null)
  const profile = ref<any>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 计算属性
  const isLoggedIn = computed(() => !!user.value)
  const username = computed(() => profile.value?.username || user.value?.email?.split('@')[0] || '')
  const avatar = computed(() => profile.value?.avatar_url || '/images/default-avatar.png')
  
  // 获取 Supabase 客户端
  const getSupabase = () => {
    return useSupabase()
  }
  
  // 初始化：检查登录状态
  const initAuth = async () => {
    const supabase = getSupabase()
    
    // 获取当前用户
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (currentUser) {
      user.value = currentUser
      await fetchProfile()
    }
    
    // 监听登录状态变化
    supabase.auth.onAuthStateChange(async (event, session) => {
      user.value = session?.user || null
      if (user.value) {
        await fetchProfile()
      } else {
        profile.value = null
      }
    })
  }
  
  // 获取用户资料
  const fetchProfile = async () => {
    if (!user.value) return
    
    const supabase = getSupabase()
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()
    
    profile.value = data
  }
  
  // 注册
  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 1. 创建用户
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (signUpError) throw signUpError
      
      // 2. 创建用户资料
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username,
            avatar_url: null,
            bio: '',
          })
        
        if (profileError) throw profileError
      }
      
      return true
    } catch (e: any) {
      error.value = e.message || '注册失败'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 登录
  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) throw signInError
      
      return true
    } catch (e: any) {
      error.value = e.message || '登录失败'
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 退出登录
  const logout = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }
  
  // 更新用户资料
  const updateProfile = async (data: { username?: string; bio?: string; avatar_url?: string }) => {
    if (!user.value) return false
    
    const supabase = getSupabase()
    const { error: updateError } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.value.id)
    
    if (updateError) {
      error.value = updateError.message
      return false
    }
    
    await fetchProfile()
    return true
  }
  
  // 清除错误
  const clearError = () => {
    error.value = null
  }
  
  return {
    user,
    profile,
    isLoading,
    error,
    isLoggedIn,
    username,
    avatar,
    initAuth,
    register,
    login,
    logout,
    updateProfile,
    clearError,
  }
})