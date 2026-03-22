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
      summary: '1.21.4是2024年末的稳定版本，包含多项性能优化和bug修复，为即将到来的1.22版本做准备。此版本主要关注稳定性和性能改进，修复了多个社区反馈的关键问题。',
      changelog: [
        '新增多个成就，包括与试炼密室相关的新成就',
        '优化区块加载性能，减少卡顿现象',
        '修复红石元件同步问题，改善红石机械稳定性',
        '改进多人游戏稳定性，减少同步延迟',
        '新增部分装饰性方块和物品',
        '修复了多个已知的崩溃问题',
        '优化了内存使用，减少内存泄漏',
        '改进了UI界面，提升用户体验',
      ],
      releaseDate: '2024-12-03',
      downloadUrl: '#',
      fileSize: 52428800,
      downloads: 2580000,
      isLatest: true,
      isRecommended: true,
      compatibleVersions: ['Forge 50+', 'Fabric 0.15+', 'NeoForge 1+'],
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
      compatibleVersions: ['Forge 49+', 'Fabric 0.15+'],
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
      compatibleVersions: ['Forge 48+', 'Fabric 0.15+'],
    },
    {
      id: '4',
      version: '1.21.1',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.21.1',
      summary: '1.21.1是"勇于冒险"更新的首个稳定版本，带来了试炼密室、新生物、新武器等重大内容更新。这是2024年最重要的版本之一，为玩家提供了全新的冒险体验。',
      changelog: [
        '正式发布1.21版本，包含所有快照和预发布版的内容',
        '新增试炼密室，一种全新的地下结构，包含陷阱和宝藏',
        '新增多个敌对生物，包括旋风人和沼骸等',
        '新增风弹武器，可以发射风弹攻击敌人',
        '新增旋风人掉落物，可用于制作风弹',
        '新增试炼密室钥匙，用于解锁宝藏',
        '新增多个成就和进度',
        '优化了世界生成，改进了洞穴系统',
        '改进了战斗系统，调整了部分武器平衡',
        '新增了多个装饰性方块和物品',
      ],
      releaseDate: '2024-08-13',
      downloadUrl: '#',
      fileSize: 49152000,
      downloads: 5600000,
      isLatest: false,
      isRecommended: true,
      compatibleVersions: ['Forge 47+', 'Fabric 0.15+', 'NeoForge 1+'],
    },
    {
      id: '5',
      version: '1.20.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.20.4',
      summary: '1.20.4是"足迹与故事"更新的最终稳定版本，包含该更新的所有内容，如考古系统、樱花木、骆驼等。这个版本模组兼容性极佳，是许多模组玩家的首选版本。',
      changelog: [
        '修复多个安全漏洞，提升游戏安全性',
        '优化客户端性能，减少卡顿和延迟',
        '改进服务器稳定性，减少崩溃问题',
        '包含"足迹与故事"更新的所有内容：',
        '  - 考古系统：刷子、陶片、饰纹陶罐等',
        '  - 樱花木系列：樱花木、樱花树叶等',
        '  - 骆驼生物：可骑乘，支持两人同骑',
        '  - 嗅探兽：可挖掘古代种子',
        '  - 图书与羽毛：可编辑的书籍',
        '  - 悬挂告示牌：新的告示牌变种',
        '改进了模组加载器兼容性',
        '优化了世界生成性能',
      ],
      releaseDate: '2023-12-07',
      downloadUrl: '#',
      fileSize: 47104000,
      downloads: 8900000,
      isLatest: false,
      isRecommended: true,
      compatibleVersions: ['Forge 49+', 'Fabric 0.15+', 'NeoForge 1+'],
    },
    {
      id: '6',
      version: '1.20.1',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.20.1',
      summary: '1.20.1是广受欢迎的稳定版本，模组兼容性极佳，是许多模组整合包的基础版本。这个版本性能稳定，模组生态丰富，至今仍有大量玩家使用。',
      changelog: [
        '修复关键bug，提升游戏稳定性',
        '优化渲染性能，减少卡顿现象',
        '改进模组加载器兼容性',
        '包含"足迹与故事"更新的部分内容',
        '新增了考古系统相关的方块和物品',
        '改进了世界生成算法',
        '优化了内存使用',
        '修复了多个已知的安全漏洞',
      ],
      releaseDate: '2023-06-12',
      downloadUrl: '#',
      fileSize: 46080000,
      downloads: 12500000,
      isLatest: false,
      isRecommended: true,
      compatibleVersions: ['Forge 47+', 'Fabric 0.14+', 'NeoForge 1+'],
    },
    {
      id: '7',
      version: '1.19.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.19.4',
      summary: '1.19.4是"荒野更新"的最后稳定版本，包含深暗之域、监守者等内容。这个版本是荒野更新的最终完善版本，修复了多个问题，性能稳定。',
      changelog: [
        '性能优化和bug修复，提升游戏稳定性',
        '改进考古系统，新增考古相关方块',
        '新增嗅探兽生物，可挖掘古代种子',
        '包含"荒野更新"的所有内容',
        '优化了世界生成算法',
        '改进了多人游戏稳定性',
        '修复了多个已知的安全问题',
      ],
      releaseDate: '2023-03-14',
      downloadUrl: '#',
      fileSize: 45056000,
      downloads: 7800000,
      isLatest: false,
      isRecommended: false,
      compatibleVersions: ['Forge 45+', 'Fabric 0.14+'],
    },
    {
      id: '8',
      version: '1.18.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.18.2',
      summary: '1.18.2是"洞穴与悬崖更新"的经典版本，彻底改造了世界生成系统，将世界高度扩展至-64至320。这个版本是洞穴与悬崖更新的最终完善版本，拥有丰富的模组生态。',
      changelog: [
        '修复世界生成问题，提升稳定性',
        '优化洞穴系统，改进洞穴生成',
        '改进矿石分布，调整矿石生成高度',
        '包含"洞穴与悬崖更新"的所有内容：',
        '  - 世界高度扩展至-64至320',
        '  - 新增繁茂洞穴和滴水石洞穴',
        '  - 新增山脉生物群系',
        '  - 新增铜矿石和紫水晶',
        '  - 新增山羊、发光鱿鱼等生物',
        '优化了世界生成性能',
        '改进了模组加载器兼容性',
      ],
      releaseDate: '2022-02-28',
      downloadUrl: '#',
      fileSize: 44032000,
      downloads: 9200000,
      isLatest: false,
      isRecommended: false,
      compatibleVersions: ['Forge 40+', 'Fabric 0.14+'],
    },
    {
      id: '9',
      version: '1.16.5',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.16.5',
      summary: '1.16.5是"下界更新"的最终稳定版本，彻底改造了下界维度，新增了多个生物群系、生物和资源。这个版本是模组生态的重要版本，拥有大量优质模组。',
      changelog: [
        '修复安全漏洞，提升游戏安全性',
        '优化下界性能，减少卡顿现象',
        '改进多人游戏稳定性，减少同步问题',
        '包含"下界更新"的所有内容：',
        '  - 下界生物群系：绯红森林、诡异森林、灵魂沙峡谷等',
        '  - 新增生物：猪灵、疣猪兽、炽足兽等',
        '  - 下界合金：最强装备材料',
        '  - 重生锚：可在下界设置重生点',
        '  - 磁石：指南针可绑定位置',
        '  - 新增方块：哭泣的黑曜石、玄武岩等',
        '改进了下界传送门机制',
        '新增了多个成就和进度',
        '优化了世界生成算法',
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
      summary: '1.12.2是"多彩世界更新"的最终版本，是模组生态最丰富的经典版本之一。这个版本拥有大量优质模组，是许多模组整合包的基础版本，至今仍有许多玩家使用。',
      changelog: [
        '新增染色玻璃：16种颜色的染色玻璃',
        '新增混凝土和混凝土粉末：16种颜色',
        '新增鹦鹉生物：可驯服，模仿附近生物的声音',
        '改进了配方书系统：新增配方解锁机制',
        '新增知识之书：记录游戏知识',
        '新增了多个成就和进度',
        '改进了UI界面，提升用户体验',
        '优化了游戏性能',
        '修复了多个已知bug',
        '改进了模组加载器兼容性',
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

    // 更多正式版
    {
      id: '19',
      version: '1.19.3',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.19.3',
      summary: '荒野更新的维护版本，修复了多个关键问题',
      changelog: [
        '修复了世界生成相关的崩溃问题',
        '优化了生物AI性能',
        '改进了多人游戏同步',
        '修复了部分方块渲染问题',
        '新增了部分音效',
      ],
      releaseDate: '2022-12-07',
      downloadUrl: '#',
      fileSize: 45056000,
      downloads: 6500000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '20',
      version: '1.19.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.19.2',
      summary: '荒野更新的稳定版本，包含深暗之域和监守者',
      changelog: [
        '新增深暗之域生物群系',
        '新增监守者生物',
        '新增远古城市结构',
        '新增幽匿系列方块',
        '改进了聊天举报系统',
      ],
      releaseDate: '2022-08-05',
      downloadUrl: '#',
      fileSize: 45056000,
      downloads: 8200000,
      isLatest: false,
      isRecommended: true,
      compatibleVersions: ['Forge 43+', 'Fabric 0.14+'],
    },
    {
      id: '21',
      version: '1.18.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.18.2',
      summary: '洞穴与悬崖更新第二部分，世界高度扩展',
      changelog: [
        '世界高度扩展至-64至320',
        '新增繁茂洞穴和滴水石洞穴',
        '新增山脉生物群系',
        '改进了世界生成算法',
        '优化了性能表现',
      ],
      releaseDate: '2022-02-28',
      downloadUrl: '#',
      fileSize: 44032000,
      downloads: 9200000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '22',
      version: '1.17.1',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.17.1',
      summary: '洞穴与悬崖更新第一部分，新增铜和紫水晶',
      changelog: [
        '新增铜矿石和铜锭',
        '新增紫水晶洞穴',
        '新增山羊、发光鱿鱼等生物',
        '新增望远镜和避雷针',
        '新增蜡烛和细雪方块',
      ],
      releaseDate: '2021-07-06',
      downloadUrl: '#',
      fileSize: 43008000,
      downloads: 11500000,
      isLatest: false,
      isRecommended: false,
      compatibleVersions: ['Forge 37+', 'Fabric 0.14+'],
    },
    {
      id: '23',
      version: '1.16.5',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.16.5',
      summary: '下界更新最终版本，新增下界生物群系',
      changelog: [
        '新增下界生物群系：绯红森林、诡异森林等',
        '新增猪灵、疣猪兽等生物',
        '新增下界合金装备',
        '新增重生锚和磁石',
        '改进了下界传送门机制',
      ],
      releaseDate: '2021-01-15',
      downloadUrl: '#',
      fileSize: 41984000,
      downloads: 15600000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '24',
      version: '1.15.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.15.2',
      summary: '嗡嗡蜂群更新，新增蜜蜂和蜂巢',
      changelog: [
        '新增蜜蜂生物',
        '新增蜂巢和蜂箱方块',
        '新增蜂蜜瓶和蜜脾块',
        '改进了渲染引擎',
        '优化了游戏性能',
      ],
      releaseDate: '2020-01-21',
      downloadUrl: '#',
      fileSize: 39936000,
      downloads: 7800000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '25',
      version: '1.14.4',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.14.4',
      summary: '村庄与掠夺更新最终版本',
      changelog: [
        '重新设计了村庄结构',
        '新增掠夺者袭击事件',
        '新增流浪商人和劫掠兽',
        '新增营火、高炉等方块',
        '改进了村民交易系统',
      ],
      releaseDate: '2019-07-19',
      downloadUrl: '#',
      fileSize: 37888000,
      downloads: 9400000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '26',
      version: '1.12.2',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.12.2',
      summary: '多彩世界更新，模组生态最丰富的经典版本',
      changelog: [
        '新增染色玻璃和混凝土',
        '新增鹦鹉生物',
        '改进了配方书系统',
        '新增知识之书',
        '改进了成就系统',
      ],
      releaseDate: '2017-09-18',
      downloadUrl: '#',
      fileSize: 35840000,
      downloads: 22000000,
      isLatest: false,
      isRecommended: true,
      compatibleVersions: ['Forge 14+', '各种模组加载器'],
    },
    {
      id: '27',
      version: '1.7.10',
      edition: 'java',
      type: 'release',
      name: 'Minecraft Java Edition 1.7.10',
      summary: '1.7.10是"马匹更新"的最终版本，是最经典的模组版本之一，拥有海量优质模组。这个版本是许多经典模组整合包的基础，至今仍有大量玩家和服务器使用。',
      changelog: [
        '新增马、驴、骡等可骑乘生物',
        '新增染色玻璃：16种颜色',
        '新增新的世界类型：巨型生物群系等',
        '改进了网络代码，减少延迟',
        '优化了多人游戏性能',
        '新增了多个成就',
        '改进了世界生成算法',
        '新增了新的方块和物品',
        '修复了多个已知bug',
        '改进了模组加载器兼容性',
      ],
      releaseDate: '2014-06-26',
      downloadUrl: '#',
      fileSize: 31744000,
      downloads: 18500000,
      isLatest: false,
      isRecommended: false,
      compatibleVersions: ['Forge 10+', '各种经典模组'],
    },

    // 更多快照版
    {
      id: '28',
      version: '24w48a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w48a',
      summary: '测试新的红石元件和机制',
      changelog: [
        '新增实验性红石元件',
        '测试新的信号强度系统',
        '改进了红石性能',
        '修复了部分渲染问题',
      ],
      releaseDate: '2024-11-26',
      downloadUrl: '#',
      fileSize: 52019200,
      downloads: 135000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '29',
      version: '24w47a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w47a',
      summary: '优化世界生成和生物行为',
      changelog: [
        '改进了洞穴生成算法',
        '优化了生物AI',
        '新增了装饰性方块',
        '修复了内存泄漏问题',
      ],
      releaseDate: '2024-11-19',
      downloadUrl: '#',
      fileSize: 51814400,
      downloads: 128000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '30',
      version: '24w46a',
      edition: 'java',
      type: 'snapshot',
      name: 'Minecraft Snapshot 24w46a',
      summary: '测试新的UI系统和界面改进',
      changelog: [
        '重新设计了物品栏界面',
        '新增了快捷栏自定义功能',
        '改进了触控支持',
        '优化了渲染管线',
      ],
      releaseDate: '2024-11-12',
      downloadUrl: '#',
      fileSize: 51609600,
      downloads: 120000,
      isLatest: false,
      isRecommended: false,
    },

    // 更多预发布版
    {
      id: '31',
      version: '1.21.3-pre1',
      edition: 'java',
      type: 'prerelease',
      name: 'Minecraft 1.21.3 Pre-Release 1',
      summary: '1.21.3版本的首个预发布版本',
      changelog: [
        '功能冻结',
        '修复了社区反馈的问题',
        '优化了性能',
        '改进了稳定性',
      ],
      releaseDate: '2024-11-08',
      downloadUrl: '#',
      fileSize: 51200000,
      downloads: 85000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '32',
      version: '1.21.2-pre1',
      edition: 'java',
      type: 'prerelease',
      name: 'Minecraft 1.21.2 Pre-Release 1',
      summary: '1.21.2版本的预发布测试',
      changelog: [
        '修复了关键bug',
        '优化了内存使用',
        '改进了多人游戏稳定性',
      ],
      releaseDate: '2024-10-18',
      downloadUrl: '#',
      fileSize: 50176000,
      downloads: 72000,
      isLatest: false,
      isRecommended: false,
    },

    // 更多候选版
    {
      id: '33',
      version: '1.21.3-rc1',
      edition: 'java',
      type: 'release_candidate',
      name: 'Minecraft 1.21.3 Release Candidate 1',
      summary: '1.21.3的发布候选版本',
      changelog: [
        '修复了最后的关键问题',
        '性能微调',
        '准备正式发布',
      ],
      releaseDate: '2024-11-12',
      downloadUrl: '#',
      fileSize: 51200000,
      downloads: 58000,
      isLatest: false,
      isRecommended: false,
    },

    // 更多Beta版本
    {
      id: '34',
      version: '1.21.50.27',
      edition: 'bedrock',
      type: 'beta',
      name: 'Minecraft Bedrock Beta 1.21.50.27',
      summary: '基岩版测试版，改进了跨平台体验',
      changelog: [
        '改进了跨平台联机',
        '优化了移动端性能',
        '新增了部分触控手势',
        '修复了平台特定问题',
      ],
      releaseDate: '2024-12-05',
      downloadUrl: '#',
      fileSize: 157286400,
      downloads: 290000,
      isLatest: false,
      isRecommended: false,
    },
    {
      id: '35',
      version: '1.21.50.26',
      edition: 'bedrock',
      type: 'beta',
      name: 'Minecraft Bedrock Beta 1.21.50.26',
      summary: '基岩版测试版，新增实验性功能',
      changelog: [
        '新增实验性游戏规则',
        '改进了世界生成',
        '优化了存储性能',
        '修复了崩溃问题',
      ],
      releaseDate: '2024-11-28',
      downloadUrl: '#',
      fileSize: 157286400,
      downloads: 275000,
      isLatest: false,
      isRecommended: false,
    },

    // 更多Alpha版本
    {
      id: '36',
      version: '1.22-alpha2',
      edition: 'java',
      type: 'alpha',
      name: 'Minecraft 1.22 Alpha 2',
      summary: '1.22版本的第二个Alpha测试',
      changelog: [
        '改进了世界生成引擎',
        '新增了实验性生物群系',
        '修复了部分Alpha1的问题',
        '性能优化',
      ],
      releaseDate: '2024-12-27',
      downloadUrl: '#',
      fileSize: 59392000,
      downloads: 38000,
      isLatest: false,
      isRecommended: false,
      knownIssues: ['存档可能损坏', '部分功能未完成', '性能问题'],
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
