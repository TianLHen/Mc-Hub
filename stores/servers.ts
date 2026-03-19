// 服务器状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Server } from '~/types'

export const useServerStore = defineStore('servers', () => {
  // 状态
  const servers = ref<Server[]>([])
  const currentServer = ref<Server | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // 模拟数据
  const mockServers: Server[] = [
    {
      id: '1',
      name: '月华小筑生存服务器',
      description: '月华小筑是一个温馨的生存服务器，适合喜欢休闲玩法的玩家。',
      ip: 'mc.yuehua.com',
      port: 25565,
      version: '1.21.11',
      type: '生存',
      playerCount: 128,
      maxPlayers: 200,
      status: 'online',
      ping: 45,
      icon: '/images/server-yuehua.png',
      website: 'https://yuehua.com',
      voteCount: 15680,
      createdAt: '2023-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: '4U4N 无规则生存服务器',
      description: '自由度极高的无规则服务器，适合喜欢挑战的玩家。',
      ip: 'play.4u4n.com',
      port: 25565,
      version: '1.16.5-1.21.11',
      type: '无规则生存',
      playerCount: 89,
      maxPlayers: 150,
      status: 'online',
      ping: 32,
      icon: '/images/server-4u4n.png',
      website: 'https://4u4n.com',
      voteCount: 12350,
      createdAt: '2022-06-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      name: '风吟小筑生存服务器',
      description: '风吟小筑是一个注重社交的生存服务器，有丰富的社区活动。',
      ip: 'mc.fengying.com',
      port: 25565,
      version: '1.21.11',
      type: '生存',
      playerCount: 156,
      maxPlayers: 200,
      status: 'online',
      ping: 38,
      icon: '/images/server-fengying.png',
      website: 'https://fengying.com',
      voteCount: 10890,
      createdAt: '2023-03-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '4',
      name: '星朅流光RPG服务器',
      description: '星朅流光是一个大型RPG服务器，有完整的职业系统和副本。',
      ip: 'mc.xingjie.com',
      port: 25565,
      version: '1.21.11-1.12.2',
      type: 'RPG',
      playerCount: 234,
      maxPlayers: 300,
      status: 'online',
      ping: 52,
      icon: '/images/server-xingjie.png',
      website: 'https://xingjie.com',
      voteCount: 8960,
      createdAt: '2022-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '5',
      name: '那年2015怀旧原味纯净生存服务器',
      description: '还原2015年的经典Minecraft体验，纯净无插件。',
      ip: 'mc.2015mc.com',
      port: 25565,
      version: '1.12.2',
      type: '纯净生存',
      playerCount: 67,
      maxPlayers: 100,
      status: 'online',
      ping: 28,
      icon: '/images/server-2015.png',
      website: 'https://2015mc.com',
      voteCount: 7540,
      createdAt: '2021-01-01',
      updatedAt: '2024-01-01',
    },
  ]
  
  // 计算属性
  const onlineServers = computed(() => servers.value.filter(s => s.status === 'online'))
  const totalPlayers = computed(() => servers.value.reduce((sum, s) => sum + s.playerCount, 0))
  
  // 获取服务器列表
  const fetchServers = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      servers.value = mockServers
      return servers.value
    } catch (e: any) {
      error.value = e.message || '获取服务器列表失败'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  // 获取服务器详情
  const fetchServerById = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const server = mockServers.find(s => s.id === id)
      
      if (!server) {
        throw new Error('服务器不存在')
      }
      
      currentServer.value = server
      return server
    } catch (e: any) {
      error.value = e.message || '获取服务器详情失败'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // 投票
  const voteServer = async (serverId: string) => {
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const server = servers.value.find(s => s.id === serverId)
      if (server) {
        server.voteCount++
      }
      
      return true
    } catch (e: any) {
      error.value = e.message || '投票失败'
      return false
    }
  }
  
  // 获取热门服务器
  const getHotServers = computed(() => {
    return [...mockServers]
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, 5)
  })
  
  // 清除当前服务器
  const clearCurrentServer = () => {
    currentServer.value = null
  }
  
  // 清除错误
  const clearError = () => {
    error.value = null
  }
  
  return {
    servers,
    currentServer,
    isLoading,
    error,
    onlineServers,
    totalPlayers,
    getHotServers,
    fetchServers,
    fetchServerById,
    voteServer,
    clearCurrentServer,
    clearError,
  }
})
