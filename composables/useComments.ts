// 评论功能
import { ref } from 'vue'

export interface Comment {
  id: string
  resource_id: string
  user_id: string
  content: string
  created_at: string
  profiles?: {
    username: string
    avatar_url: string
  }
}

export const useComments = () => {
  const comments = ref<Comment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 获取 Supabase 客户端
  const getSupabase = () => {
    const { useSupabase } = require('~/composables/useSupabase')
    return useSupabase()
  }
  
  // 获取评论列表
  const fetchComments = async (resourceId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('*, profiles!user_id(username, avatar_url)')
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      comments.value = data || []
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }
  
  // 添加评论
  const addComment = async (resourceId: string, content: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')
      
      const { error: insertError } = await supabase
        .from('comments')
        .insert({
          resource_id: resourceId,
          user_id: user.id,
          content,
        })
      
      if (insertError) throw insertError
      
      // 重新获取评论
      await fetchComments(resourceId)
      
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  // 删除评论
  const deleteComment = async (commentId: string, resourceId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
      
      if (deleteError) throw deleteError
      
      // 重新获取评论
      await fetchComments(resourceId)
      
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    deleteComment,
  }
}