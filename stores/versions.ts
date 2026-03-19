// 版本库状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MinecraftVersion, VersionFilter, VersionType, MinecraftEdition, VersionGroup } from '~/types'

export const useVersionStore = defineStore('versions', () => {
  // 状态
  const versions = ref<MinecraftVersion[]>([])
  const currentVersion = ref<MinecraftVersion | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filter = ref<VersionFilter>({
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

  // 模拟数据
  const mockVersions: MinecraftVersion[] = [
    // 正式版
    {
      id: '1',
      version: '1.21.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.21.4',
      summary: '最新稳定版本，包含多项性能优化和bug修复',
      changelog: [
        '新增多个成就',
        '优化区块加载性能',
        '修复红石元件同步问题',
        '改进多人游戏稳定性',
        '新增部分方块和物品',
      ],
      releaseDate: '2024-12-03',
      downloadUrl: '#',
      fileSize: 52428800,
      downloads: 2580000,
      isLatest: true,
      isRecommended: true,
    },
    {
      id: '2',
      version: '1.21.3',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.21.3',
      summary: '稳定版本，修复了1.21.2的主要问题',
      changelog: [
        '修复游戏崩溃问题',
        '优化内存使用',
        '修复部分方块渲染问题',
      ],
      releaseDate: '2024-11-15',
      downloadUrl: '#',
      fileSize: 51200000,
      downloads: 1850000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '3',
      version: '1.21.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.21.2',
      summary: '添加了新的生物群系和结构',
      changelog: [
        '新增沙漠神殿变种',
        '新增热带草原生物群系',
        '添加新的村民交易选项',
        '优化世界生成算法',
      ],
      releaseDate: '2024-10-22',
      downloadUrl: '#',
      fileSize: 50176000,
      downloads: 3200000,
      isLatest: false,
      isRecommended: true,
    },
    {
      id: '4',
      version: '1.21.1',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.21.1',
      summary: '1.21系列的首个稳定版本',
      changelog: [
        '正式发布1.21版本',
        '新增试炼密室',
        '新增多个敌对生物',
        '新增风弹武器',
      ],
      releaseDate: '2024-08-13',
      downloadUrl: '#',
      fileSize: 49152000,
      downloads: 5600000,
      isLatest: false,
      isRecommended: true,
    },
    {
      id: '5',
      version: '1.20.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.20.4',
      summary: '足迹与故事更新的最终稳定版本',
      changelog: [
        '修复多个安全漏洞',
        '优化客户端性能',
        '改进服务器稳定性',
      ],
      releaseDate: '2023-12-07',
      downloadUrl: '#',
      fileSize: 47104000,
      downloads: 8900000,
      isLatest: false,
      isRecommended: true,
    },
    {
      id: '6',
      version: '1.20.1',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.20.1',
      summary: '广受欢迎的稳定版本，模组兼容性极佳',
      changelog: [
        '修复关键bug',
        '优化渲染性能',
        '改进模组加载器兼容性',
      ],
      releaseDate: '2023-06-12',
      downloadUrl: '#',
      fileSize: 46080000,
      downloads: 12500000,
      isLatest: false,
      isRecommended: true,
    },
    {
      id: '7',
      version: '1.19.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.19.4',
      summary: '荒野更新的最后稳定版本',
      changelog: [
        '性能优化和bug修复',
        '改进考古系统',
        '新增嗅探兽',
      ],
      releaseDate: '2023-03-14',
      downloadUrl: '#',
      fileSize: 45056000,
      downloads: 7800000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '8',
      version: '1.18.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.18.2',
      summary: '洞穴与悬崖更新的经典版本',
      changelog: [
        '修复世界生成问题',
        '优化洞穴系统',
        '改进矿石分布',
      ],
      releaseDate: '2022-02-28',
      downloadUrl: '#',
      fileSize: 44032000,
      downloads: 9200000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '9',
      version: '1.16.5',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.16.5',
      summary: '下界更新，经典版本之一',
      changelog: [
        '修复安全漏洞',
        '优化下界性能',
        '改进多人游戏稳定性',
      ],
      releaseDate: '2021-01-15',
      downloadUrl: '#',
      fileSize: 41984000,
      downloads: 15600000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '10',
      version: '1.12.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.12.2',
      summary: '多彩世界更新，模组生态最丰富的版本',
      changelog: [
        '新增染色玻璃',
        '新增鹦鹉',
        '改进配方书系统',
      ],
      releaseDate: '2017-09-18',
      downloadUrl: '#',
      fileSize: 35840000,
      downloads: 22000000,
      isLatest: false,
      isRecommended: true,
    },
    
    // 快照版
    {
      id: '11',
      version: '24w51a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w51a',
      summary: '最新开发快照，包含即将发布的新功能测试',
      changelog: [
        '新增实验性功能',
        '测试新的世界生成算法',
        '优化渲染管线',
        '新增命令参数',
      ],
      releaseDate: '2024-12-17',
      downloadUrl: '#',
      fileSize: 53248000,
      downloads: 180000,
      isLatest: true,
      isRecommended: false,
    },
    {
      id: '12',
      version: '24w50a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w50a',
      summary: '添加新生物和方块的测试版本',
      changelog: [
        '新增测试生物',
        '添加新的装饰方块',
        '改进AI行为',
      ],
      releaseDate: '2024-12-10',
      downloadUrl: '#',
      fileSize: 52224000,
      downloads: 165000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '13',
      version: '24w49a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w49a',
      summary: '优化和修复的开发版本',
      changelog: [
        '性能优化',
        '修复已知bug',
        '改进UI界面',
      ],
      releaseDate: '2024-12-03',
      downloadUrl: '#',
      fileSize: 52019200,
      downloads: 142000,
      isLatest: false,
      isRecommended: false,
    },
    
    // 预发布版
    {
      id: '14',
      version: '1.21.4-pre2',
      edition: 'java',
      type: 'prerelease',
      name: 'Minecraft 1.21.4 Pre-Release 2',
      summary: '1.21.4正式版发布前的最后测试',
      changelog: [
        '修复预发布版1的问题',
        '优化内存使用',
        '改进稳定性',
      ],
      releaseDate: '2024-11-28',
      downloadUrl: '#',
      fileSize: 51712000,
      downloads: 95000,
      isLatest: true,
      isRecommended: false,
    },
    {
      id: '15',
      version: '1.21.4-pre1',
      edition: 'java',
      type: 'prerelease',
      name: 'Minecraft 1.21.4 Pre-Release 1',
      summary: '1.21.4版本的首个预发布版本',
      changelog: [
        '功能冻结',
        '修复社区反馈的问题',
        '最终优化',
      ],
      releaseDate: '2024-11-21',
      downloadUrl: '#',
      fileSize: 51712000,
      downloads: 78000,
      isLatest: false,
      isRecommended: false,
    },
    
    // 候选版
    {
      id: '16',
      version: '1.21.4-rc1',
      edition: 'java',
      type: 'release_candidate',
      name: 'Minecraft 1.21.4 Release Candidate 1',
      summary: '1.21.4的发布候选版本，接近最终版本',
      changelog: [
        '修复最后的关键问题',
        '性能微调',
        '准备正式发布',
      ],
      releaseDate: '2024-11-29',
      downloadUrl: '#',
      fileSize: 51712000,
      downloads: 62000,
      isLatest: true,
      isRecommended: false,
    },
    
    // Beta版本（基岩版）
    {
      id: '17',
      version: '1.21.50.28',
      edition: 'bedrock',
      type: 'beta',
      name: 'Minecraft Bedrock Beta 1.21.50.28',
      summary: '基岩版最新测试版',
      changelog: [
        '新增触控优化',
        '修复平台特定问题',
        '性能改进',
      ],
      releaseDate: '2024-12-12',
      downloadUrl: '#',
      fileSize: 157286400,
      downloads: 320000,
      isLatest: true,
      isRecommended: false,
    },
    
    // Alpha版本
    {
      id: '18',
      version: '1.22-alpha1',
      edition: 'java',
      type: 'alpha',
      name: 'Minecraft 1.22 Alpha 1',
      summary: '下一主要版本的早期测试',
      changelog: [
        '全新世界生成引擎',
        '实验性新特性',
        '大量已知问题待修复',
      ],
      releaseDate: '2024-12-20',
      downloadUrl: '#',
      fileSize: 58368000,
      downloads: 45000,
      isLatest: true,
      isRecommended: false,
      knownIssues: ['可能有崩溃问题', '存档不兼容', '部分功能未完成'],
    },
  ]

  // 计算属性
  const hasMore = computed(() => pagination.value.page < pagination.value.totalPages)

  // 版本类型信息
  const versionTypeInfos: Record<VersionType, { name: string; icon: string; description: string }> = {
    release: {
      name: '正式版',
      icon: '✅',
      description: '经过完整测试的稳定版本，推荐大多数玩家使用',
    },
    snapshot: {
      name: '快照版',
      icon: '📸',
      description: '包含最新开发内容的测试版本，每周发布',
    },
    prerelease: {
      name: '预发布版',
      icon: '🔬',
      description: '即将发布的版本的最后测试阶段',
    },
    release_candidate: {
      name: '候选版',
      icon: '🎯',
      description: '非常接近正式发布的版本，只做关键修复',
    },
    beta: {
      name: 'Beta版',
      icon: '🧪',
      description: '基岩版的测试版本，包含新功能预览',
    },
    alpha: {
      name: 'Alpha版',
      icon: '⚠️',
      description: '极度早期的测试版本，可能存在严重问题',
    },
  }

  // 获取版本列表
  const fetchVersions = async (newFilter?: VersionFilter) => {
    isLoading.value = true
    error.value = null

    try {
      // 更新筛选条件
      if (newFilter) {
        filter.value = { ...filter.value, ...newFilter }
      }

      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 500))

      // 过滤版本
      let filteredVersions = [...mockVersions]

      // 按版本筛选
      if (filter.value.edition) {
        filteredVersions = filteredVersions.filter(v => v.edition === filter.value.edition)
      }

      // 按类型筛选
      if (filter.value.type) {
        filteredVersions = filteredVersions.filter(v => v.type === filter.value.type)
      }

      // 搜索
      if (filter.value.search) {
        const searchLower = filter.value.search.toLowerCase()
        filteredVersions = filteredVersions.filter(v =>
          v.version.toLowerCase().includes(searchLower) ||
          v.name.toLowerCase().includes(searchLower) ||
          v.summary.toLowerCase().includes(searchLower)
        )
      }

      // 排序
      if (filter.value.sort) {
        switch (filter.value.sort) {
          case 'newest':
            filteredVersions.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
            break
          case 'oldest':
            filteredVersions.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
            break
          case 'downloads':
            filteredVersions.sort((a, b) => b.downloads - a.downloads)
            break
          case 'name':
            filteredVersions.sort((a, b) => a.version.localeCompare(b.version))
            break
        }
      }

      // 分页
      const page = filter.value.page || 1
      const pageSize = filter.value.pageSize || 20
      const start = (page - 1) * pageSize
      const end = start + pageSize

      versions.value = filteredVersions.slice(start, end)

      pagination.value = {
        page,
        pageSize,
        total: filteredVersions.length,
        totalPages: Math.ceil(filteredVersions.length / pageSize),
      }

      return versions.value
    } catch (e: any) {
      error.value = e.message || '获取版本列表失败'
      return []
    } finally {
      isLoading.value = false
    }
  }

  // 获取版本详情
  const fetchVersionById = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 300))

      const version = mockVersions.find(v => v.id === id)

      if (!version) {
        throw new Error('版本不存在')
      }

      currentVersion.value = version
      return version
    } catch (e: any) {
      error.value = e.message || '获取版本详情失败'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // 获取版本分组
  const getVersionGroups = (edition: MinecraftEdition = 'java'): VersionGroup[] => {
    const editionVersions = mockVersions.filter(v => v.edition === edition)
    const groups: VersionGroup[] = []

    const types: VersionType[] = ['release', 'snapshot', 'prerelease', 'release_candidate', 'beta', 'alpha']

    for (const type of types) {
      const typeVersions = editionVersions.filter(v => v.type === type)
      if (typeVersions.length > 0) {
        const info = versionTypeInfos[type]
        groups.push({
          type,
          typeName: info.name,
          icon: info.icon,
          description: info.description,
          versions: typeVersions.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()),
          latestVersion: typeVersions.find(v => v.isLatest),
        })
      }
    }

    return groups
  }

  // 获取特定类型的版本
  const getVersionsByType = (type: VersionType, edition: MinecraftEdition = 'java') => {
    return mockVersions
      .filter(v => v.type === type && v.edition === edition)
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  }

  // 获取最新版本
  const getLatestVersion = computed(() => {
    return mockVersions.find(v => v.isLatest && v.type === 'release')
  })

  // 获取推荐版本
  const getRecommendedVersions = computed(() => {
    return mockVersions.filter(v => v.isRecommended).slice(0, 5)
  })

  // 清除当前版本
  const clearCurrentVersion = () => {
    currentVersion.value = null
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  return {
    versions,
    currentVersion,
    isLoading,
    error,
    filter,
    pagination,
    hasMore,
    versionTypeInfos,
    getLatestVersion,
    getRecommendedVersions,
    fetchVersions,
    fetchVersionById,
    getVersionGroups,
    getVersionsByType,
    clearCurrentVersion,
    clearError,
  }
})
