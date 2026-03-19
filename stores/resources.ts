// 资源状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Resource, ResourceFilter, ResourceType, PaginatedResponse } from '~/types'

export const useResourceStore = defineStore('resources', () => {
  // 状态
  const resources = ref<Resource[]>([])
  const currentResource = ref<Resource | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filter = ref<ResourceFilter>({
    page: 1,
    pageSize: 20,
    sort: 'newest',
  })
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })
  
  // 计算属性
  const hasMore = computed(() => pagination.value.page < pagination.value.totalPages)
  
  // 模拟数据
  const mockResources: Resource[] = [
    {
      id: '1',
      name: 'OptiFine',
      slug: 'optifine',
      description: 'OptiFine是一个Minecraft优化模组，支持高清纹理和各种配置选项。',
      type: 'mod',
      author: {
        id: '1',
        username: 'sp614x',
        email: 'sp614x@example.com',
        level: 10,
        points: 5000,
        createdAt: '2020-01-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/optifine.png',
      screenshots: [],
      downloads: 5000000,
      rating: 4.8,
      ratingCount: 12500,
      versions: [
        {
          id: '1',
          version: 'HD U I6',
          gameVersion: '1.20.4',
          downloadUrl: '#',
          fileSize: 5242880,
          changelog: '修复了一些bug',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['优化', '光影', '高清'],
      dependencies: [],
      createdAt: '2020-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'JEI (Just Enough Items)',
      slug: 'jei',
      description: 'JEI是一个物品管理模组，可以在游戏中查看所有物品的合成配方。',
      type: 'mod',
      author: {
        id: '2',
        username: 'mezz',
        email: 'mezz@example.com',
        level: 8,
        points: 3000,
        createdAt: '2019-01-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/jei.png',
      screenshots: [],
      downloads: 4500000,
      rating: 4.9,
      ratingCount: 11000,
      versions: [
        {
          id: '2',
          version: '15.2.0.27',
          gameVersion: '1.20.4',
          downloadUrl: '#',
          fileSize: 2097152,
          changelog: '新增搜索功能',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['工具', '合成', '实用'],
      dependencies: [],
      createdAt: '2019-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      name: '剑与王国',
      slug: 'sword-and-kingdom',
      description: '围绕模拟殖民地与村民招募玩法的深度魔改整合包。',
      type: 'modpack',
      author: {
        id: '3',
        username: '剑与王国团队',
        email: 'team@example.com',
        level: 6,
        points: 2000,
        createdAt: '2023-01-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/sword-kingdom.png',
      screenshots: [],
      downloads: 1845000,
      rating: 4.7,
      ratingCount: 969,
      versions: [
        {
          id: '3',
          version: '1.0.0',
          gameVersion: '1.20.1',
          downloadUrl: '#',
          fileSize: 524288000,
          changelog: '初始版本',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['整合包', 'RPG', '殖民地'],
      dependencies: [],
      createdAt: '2023-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '4',
      name: '龙之冒险：新征程',
      slug: 'dragon-adventure',
      description: '面对众多怪物的冒险之旅，你做好准备了吗？',
      type: 'modpack',
      author: {
        id: '4',
        username: 'RuoLing',
        email: 'ruoling@example.com',
        level: 5,
        points: 1500,
        createdAt: '2023-06-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/dragon-adventure.png',
      screenshots: [],
      downloads: 479000,
      rating: 4.6,
      ratingCount: 546,
      versions: [
        {
          id: '4',
          version: '1.0.0',
          gameVersion: '1.20.1',
          downloadUrl: '#',
          fileSize: 419430400,
          changelog: '初始版本',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['整合包', '冒险', '战斗'],
      dependencies: [],
      createdAt: '2023-06-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '5',
      name: 'BSL Shaders',
      slug: 'bsl-shaders',
      description: 'BSL光影是一个明亮、清晰的光影包，提供优秀的视觉效果。',
      type: 'shader',
      author: {
        id: '5',
        username: 'Capt Tatsu',
        email: 'capttatsu@example.com',
        level: 9,
        points: 4000,
        createdAt: '2018-01-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/bsl-shaders.png',
      screenshots: [],
      downloads: 3500000,
      rating: 4.8,
      ratingCount: 8500,
      versions: [
        {
          id: '5',
          version: '8.2.09',
          gameVersion: '1.20.4',
          downloadUrl: '#',
          fileSize: 10485760,
          changelog: '优化性能',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['光影', '画质', '真实'],
      dependencies: [],
      createdAt: '2018-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '6',
      name: 'Faithful 32x',
      slug: 'faithful-32x',
      description: 'Faithful是一个高清材质包，保持原版风格的同时提升分辨率。',
      type: 'resourcepack',
      author: {
        id: '6',
        username: 'Faithful团队',
        email: 'faithful@example.com',
        level: 7,
        points: 2500,
        createdAt: '2017-01-01',
        updatedAt: '2024-01-01',
      },
      thumbnail: '/images/faithful.png',
      screenshots: [],
      downloads: 2800000,
      rating: 4.7,
      ratingCount: 7200,
      versions: [
        {
          id: '6',
          version: '32x',
          gameVersion: '1.20.4',
          downloadUrl: '#',
          fileSize: 31457280,
          changelog: '更新材质',
          createdAt: '2024-01-01',
        },
      ],
      tags: ['材质', '高清', '原版'],
      dependencies: [],
      createdAt: '2017-01-01',
      updatedAt: '2024-01-01',
    },
  ]
  
  // 获取资源列表
  const fetchResources = async (newFilter?: ResourceFilter) => {
    isLoading.value = true
    error.value = null
    
    try {
      // 更新筛选条件
      if (newFilter) {
        filter.value = { ...filter.value, ...newFilter }
      }
      
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 过滤资源
      let filteredResources = [...mockResources]
      
      if (filter.value.type) {
        filteredResources = filteredResources.filter(r => r.type === filter.value.type)
      }
      
      if (filter.value.search) {
        const searchLower = filter.value.search.toLowerCase()
        filteredResources = filteredResources.filter(r => 
          r.name.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower)
        )
      }
      
      // 排序
      if (filter.value.sort) {
        switch (filter.value.sort) {
          case 'downloads':
            filteredResources.sort((a, b) => b.downloads - a.downloads)
            break
          case 'rating':
            filteredResources.sort((a, b) => b.rating - a.rating)
            break
          case 'newest':
            filteredResources.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
          case 'updated':
            filteredResources.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            break
        }
      }
      
      // 分页
      const page = filter.value.page || 1
      const pageSize = filter.value.pageSize || 20
      const start = (page - 1) * pageSize
      const end = start + pageSize
      
      resources.value = filteredResources.slice(start, end)
      
      pagination.value = {
        page,
        pageSize,
        total: filteredResources.length,
        totalPages: Math.ceil(filteredResources.length / pageSize),
      }
      
      return resources.value
    } catch (e: any) {
      error.value = e.message || '获取资源列表失败'
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  // 获取资源详情
  const fetchResourceById = async (id: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const resource = mockResources.find(r => r.id === id)
      
      if (!resource) {
        throw new Error('资源不存在')
      }
      
      currentResource.value = resource
      return resource
    } catch (e: any) {
      error.value = e.message || '获取资源详情失败'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // 根据slug获取资源
  const fetchResourceBySlug = async (slug: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: 替换为实际API调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const resource = mockResources.find(r => r.slug === slug)
      
      if (!resource) {
        throw new Error('资源不存在')
      }
      
      currentResource.value = resource
      return resource
    } catch (e: any) {
      error.value = e.message || '获取资源详情失败'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // 获取热门资源
  const getHotResources = computed(() => {
    return [...mockResources]
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6)
  })
  
  // 获取最新资源
  const getLatestResources = computed(() => {
    return [...mockResources]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)
  })
  
  // 按类型获取资源
  const getResourcesByType = (type: ResourceType) => {
    return mockResources.filter(r => r.type === type)
  }
  
  // 清除当前资源
  const clearCurrentResource = () => {
    currentResource.value = null
  }
  
  // 清除错误
  const clearError = () => {
    error.value = null
  }
  
  return {
    resources,
    currentResource,
    isLoading,
    error,
    filter,
    pagination,
    hasMore,
    getHotResources,
    getLatestResources,
    fetchResources,
    fetchResourceById,
    fetchResourceBySlug,
    getResourcesByType,
    clearCurrentResource,
    clearError,
  }
})
