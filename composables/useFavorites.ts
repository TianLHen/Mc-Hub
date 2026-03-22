// 收藏功能
import { ref } from 'vue'

export interface Favorite {
  id: string
  user_id: string
  resource_id: string
  created_at: string
  resources?: {
    name: string
    slug: string
    type: string
    description: string
  }
}

export const useFavorites = () => {
  const favorites = ref<Favorite[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 获取 Supabase 客户端
  const getSupabase = () => {
    const { useSupabase } = require('~/composables/useSupabase')
    return useSupabase()
  }
  
  // 获取收藏列表
  const fetchFavorites = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')
      
      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*, resources(name, slug, type, description)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      favorites.value = data || []
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }
  
  // 添加收藏
  const addFavorite = async (resourceId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')
      
      // 检查是否已收藏
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
        .single()
      
      if (existing) {
        error.value = '已收藏'
        return false
      }
      
      const { error: insertError } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          resource_id: resourceId,
        })
      
      if (insertError) throw insertError
      
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 取消收藏
  const removeFavorite = async (resourceId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')
      
      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
      
      if (deleteError) throw deleteError
      
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 检查是否已收藏
  const checkIsFavorited = async (resourceId: string) => {
    try {
      const supabase = getSupabase()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false
      
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('resource_id', resourceId)
        .single()
      
      return !!data
    } catch {
      return false
    }
  }
  
  return {
    favorites,
    isLoading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    checkIsFavorited,
  }
}