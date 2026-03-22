// 资源状态管理 - Supabase 版本
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

export interface Resource {
  id: string
  name: string
  slug: string
  description: string
  type: string
  file_url: string
  author_id: string
  downloads: number
  rating: number
  created_at: string
  author?: {
    username: string
    avatar_url: string
  }
}

export const useResourceStore = defineStore('resources', () => {
  // 状态
  const resources = ref<Resource[]>([])
  const currentResource = ref<Resource | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 计算属性
  const getLatestResources = computed(() => {
    return [...resources.value]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6)
  })
  
  const getHotResources = computed(() => {
    return [...resources.value]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6)
  })
  
  // 获取 Supabase 客户端
  const getSupabase = () => {
    return useSupabase()
  }
  
  // 获取资源列表
  const fetchResources = async (type?: string, search?: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      let query = supabase
        .from('resources')
        .select('*, profiles!author_id(username, avatar_url)')
        .order('created_at', { ascending: false })
      
      if (type) {
        query = query.eq('type', type)
      }
      
      if (search) {
        query = query.ilike('name', `%${search}%`)
      }
      
      const { data, error: fetchError } = await query
      
      if (fetchError) throw fetchError
      
      resources.value = data?.map(item => ({
        ...item,
        author: item.profiles,
      })) || []
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }
  
  // 获取单个资源
  const fetchResource = async (slug: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      const { data, error: fetchError } = await supabase
        .from('resources')
        .select('*, profiles!author_id(username, avatar_url)')
        .eq('slug', slug)
        .single()
      
      if (fetchError) throw fetchError
      
      currentResource.value = data ? {
        ...data,
        author: data.profiles,
      } : null
      
      return currentResource.value
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // 上传资源
  const uploadResource = async (data: {
    name: string
    description: string
    type: string
    file: File
  }) => {
    isLoading.value = true
    error.value = null
    
    try {
      const supabase = getSupabase()
      
      // 1. 获取当前用户
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')
      
      // 2. 上传文件到 Storage
      const fileExt = data.file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${data.type}/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, data.file)
      
      if (uploadError) throw uploadError
      
      // 3. 获取文件公开链接
      const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath)
      
      // 4. 创建 slug
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now()
      
      // 5. 保存到数据库
      const { error: insertError } = await supabase
        .from('resources')
        .insert({
          name: data.name,
          slug,
          description: data.description,
          type: data.type,
          file_url: publicUrl,
          author_id: user.id,
          downloads: 0,
          rating: 0,
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
  
  // 增加下载次数
  const incrementDownloads = async (id: string) => {
    const supabase = getSupabase()
    
    // 先获取当前下载数
    const { data } = await supabase
      .from('resources')
      .select('downloads')
      .eq('id', id)
      .single()
    
    if (data) {
      await supabase
        .from('resources')
        .update({ downloads: data.downloads + 1 })
        .eq('id', id)
    }
  }
  
  return {
    resources,
    currentResource,
    isLoading,
    error,
    getLatestResources,
    getHotResources,
    fetchResources,
    fetchResource,
    uploadResource,
    incrementDownloads,
  }
})