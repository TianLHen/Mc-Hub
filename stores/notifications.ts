// 通知状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Notification } from '~/types'

export const useNotificationStore = defineStore('notifications', () => {
  // 状态
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 模拟数据
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'comment',
      title: '新评论',
      message: '用户"小明"评论了你的资源"OptiFine优化模组"',
      read: false,
      link: '/resources/optifine',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      type: 'reply',
      title: '回复通知',
      message: '用户"小红"回复了你的评论',
      read: false,
      link: '/resources/jei',
      createdAt: '2024-01-15T09:15:00Z',
    },
    {
      id: '3',
      type: 'download',
      title: '下载完成',
      message: '你下载的"剑与王国整合包"已完成',
      read: true,
      link: '/resources/sword-and-kingdom',
      createdAt: '2024-01-14T20:00:00Z',
    },
    {
      id: '4',
      type: 'update',
      title: '资源更新',
      message: '你关注的"JEI模组"发布了新版本15.2.0.27',
      read: true,
      link: '/resources/jei',
      createdAt: '2024-01-14T15:30:00Z',
    },
    {
      id: '5',
      type: 'system',
      title: '系统通知',
      message: '欢迎来到MC Hub！开始探索精彩的Minecraft世界吧！',
      read: true,
      createdAt: '2024-01-10T00:00:00Z',
    },
  ]
  
  // 计算属性
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
  const hasUnread = computed(() => unreadCount.value > 0)
  
  // 获取通知列表
  const fetchNotifications = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      notifications.value = mockNotifications
      return notifications.value
    } catch (e: any) {
      error.value = e.message || '获取通知失败'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  // 标记为已读
  const markAsRead = async (notificationId: string) => {
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
      }
      
      return true
    } catch (e: any) {
      error.value = e.message || '标记已读失败'
      return false
    }
  }
  
  // 标记所有为已读
  const markAllAsRead = async () => {
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      notifications.value.forEach(n => {
        n.read = true
      })
      
      return true
    } catch (e: any) {
      error.value = e.message || '标记全部已读失败'
      return false
    }
  }
  
  // 删除通知
  const deleteNotification = async (notificationId: string) => {
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        notifications.value.splice(index, 1)
      }
      
      return true
    } catch (e: any) {
      error.value = e.message || '删除通知失败'
      return false
    }
  }
  
  // 添加新通知
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    
    notifications.value.unshift(newNotification)
  }
  
  // 清除错误
  const clearError = () => {
    error.value = null
  }
  
  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    hasUnread,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    clearError,
  }
})
