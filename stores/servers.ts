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
    {
      id: '6',
      name: '空岛物语',
      description: '从一块空岛开始，通过交易和任务发展你的岛屿，支持多人合作和竞争。',
      ip: 'mc.skyblock.com',
      port: 25565,
      version: '1.20.1',
      type: '空岛生存',
      playerCount: 189,
      maxPlayers: 250,
      status: 'online',
      ping: 35,
      icon: '/images/server-skyblock.png',
      website: 'https://skyblock.com',
      voteCount: 14200,
      createdAt: '2020-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '7',
      name: '起床战争',
      description: '经典起床战争玩法，保护你的床，摧毁敌人的床，成为最后的赢家！',
      ip: 'mc.bedwars.com',
      port: 25565,
      version: '1.8.9-1.20.1',
      type: '起床战争',
      playerCount: 456,
      maxPlayers: 500,
      status: 'online',
      ping: 28,
      icon: '/images/server-bedwars.png',
      website: 'https://bedwars.com',
      voteCount: 18500,
      createdAt: '2019-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '8',
      name: '小游戏天地',
      description: '包含50多种小游戏，如空岛战争、密室杀手、超级战墙等，欢乐无限。',
      ip: 'mc.minigames.com',
      port: 25565,
      version: '1.8.9-1.20.1',
      type: '小游戏',
      playerCount: 678,
      maxPlayers: 800,
      status: 'online',
      ping: 32,
      icon: '/images/server-minigames.png',
      website: 'https://minigames.com',
      voteCount: 22000,
      createdAt: '2018-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '9',
      name: '创意工坊',
      description: '提供大面积创造地块，支持WorldEdit，是建筑爱好者的天堂。',
      ip: 'mc.creative.com',
      port: 25565,
      version: '1.20.1',
      type: '创造模式',
      playerCount: 123,
      maxPlayers: 200,
      status: 'online',
      ping: 42,
      icon: '/images/server-creative.png',
      website: 'https://creative.com',
      voteCount: 8900,
      createdAt: '2017-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '10',
      name: '科技模组服',
      description: '以工业、应用能源、热力膨胀等科技模组为主，体验自动化和工业化。',
      ip: 'mc.techmod.com',
      port: 25565,
      version: '1.12.2',
      type: '模组服',
      playerCount: 167,
      maxPlayers: 200,
      status: 'online',
      ping: 55,
      icon: '/images/server-techmod.png',
      website: 'https://techmod.com',
      voteCount: 11200,
      createdAt: '2020-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '11',
      name: '魔法模组服',
      description: '以神秘时代、植物魔法、血魔法等魔法模组为主，体验魔法世界。',
      ip: 'mc.magicmod.com',
      port: 25565,
      version: '1.12.2',
      type: '模组服',
      playerCount: 134,
      maxPlayers: 180,
      status: 'online',
      ping: 48,
      icon: '/images/server-magicmod.png',
      website: 'https://magicmod.com',
      voteCount: 9800,
      createdAt: '2021-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '12',
      name: '原版生存1.20',
      description: '纯净原版生存服务器，无插件，无作弊，体验最原汁原味的Minecraft。',
      ip: 'mc.vanilla.com',
      port: 25565,
      version: '1.20.1',
      type: '原版生存',
      playerCount: 89,
      maxPlayers: 100,
      status: 'online',
      ping: 38,
      icon: '/images/server-vanilla.png',
      website: 'https://vanilla.com',
      voteCount: 7200,
      createdAt: '2023-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '13',
      name: '天空工厂4',
      description: '基于SkyFactory 4整合包的服务器，从一棵树开始，发展空岛帝国。',
      ip: 'mc.skyfactory.com',
      port: 25565,
      version: '1.12.2',
      type: '模组服',
      playerCount: 98,
      maxPlayers: 120,
      status: 'online',
      ping: 52,
      icon: '/images/server-skyfactory.png',
      website: 'https://skyfactory.com',
      voteCount: 8500,
      createdAt: '2022-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '14',
      name: '混搭生存',
      description: '混合了生存、RPG、任务等多种元素，提供丰富的游戏体验。',
      ip: 'mc.hardcore.com',
      port: 25565,
      version: '1.20.1',
      type: '混搭生存',
      playerCount: 234,
      maxPlayers: 300,
      status: 'online',
      ping: 36,
      icon: '/images/server-hybrid.png',
      website: 'https://hardcore.com',
      voteCount: 13500,
      createdAt: '2021-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '15',
      name: '像素精灵宝可梦',
      description: '基于Pixelmon模组的宝可梦服务器，捕捉、训练、对战你的宝可梦。',
      ip: 'mc.pixelmon.com',
      port: 25565,
      version: '1.16.5',
      type: '模组服',
      playerCount: 312,
      maxPlayers: 400,
      status: 'online',
      ping: 45,
      icon: '/images/server-pixelmon.png',
      website: 'https://pixelmon.com',
      voteCount: 16800,
      createdAt: '2020-01-01',
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
