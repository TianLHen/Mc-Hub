<template>
  <div class="min-h-screen" :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 面包屑 -->
      <nav class="mb-6">
        <ol class="flex items-center gap-2 text-sm">
          <li>
            <NuxtLink 
              to="/"
              class="transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              首页
            </NuxtLink>
          </li>
          <li :class="isDark ? 'text-gray-600' : 'text-gray-400'">/</li>
          <li :class="isDark ? 'text-white' : 'text-gray-900'">
            新闻公告
          </li>
        </ol>
      </nav>
      
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          新闻公告
        </h1>
        <p 
          class="text-lg"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          了解MC Hub最新动态和Minecraft相关资讯
        </p>
      </div>
      
      <!-- 新闻列表 -->
      <div class="space-y-6">
        <article 
          v-for="news in newsList" 
          :key="news.id"
          class="rounded-card overflow-hidden transition-all duration-300 card-hover"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="md:flex">
            <div 
              class="md:w-1/3 aspect-video md:aspect-auto bg-gradient-to-br flex items-center justify-center"
              :class="getNewsGradient(news.category)">
              <span class="text-5xl">{{ getNewsIcon(news.category) }}</span>
            </div>
            <div class="md:w-2/3 p-6">
              <div class="flex items-center gap-3 mb-3">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getCategoryClass(news.category)">
                  {{ getCategoryName(news.category) }}
                </span>
                <span 
                  class="text-sm"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  {{ formatDate(news.createdAt) }}
                </span>
              </div>
              <h2 
                class="text-xl font-semibold mb-3"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                <NuxtLink 
                  :to="`/news/${news.slug}`"
                  class="hover:text-primary-500 transition-colors">
                  {{ news.title }}
                </NuxtLink>
              </h2>
              <p 
                class="text-sm mb-4 line-clamp-2"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ news.summary }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ formatNumber(news.views) }}
                  </span>
                </div>
                <NuxtLink 
                  :to="`/news/${news.slug}`"
                  class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
                  阅读更多 →
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <!-- 分页 -->
      <div class="mt-8 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          :total="total"
          layout="prev, pager, next"
          :background="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { formatDate, formatNumber } from '~/utils'

const themeStore = useThemeStore()
const currentPage = ref(1)
const total = ref(25)

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟新闻数据
const newsList = ref([
  {
    id: '1',
    title: 'MC Hub 正式上线！',
    summary: '我们很高兴地宣布MC Hub正式上线，感谢所有内测用户的支持和反馈。MC Hub致力于为中国玩家提供最优质的Minecraft资源下载和社区交流平台。',
    slug: 'mc-hub-launch',
    category: 'announcement',
    views: 15680,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: '1.21版本资源适配完成',
    summary: '所有热门模组和整合包已适配1.21版本，快去下载体验吧！新版本带来了许多令人兴奋的功能和改进。',
    slug: '1-21-resources-ready',
    category: 'update',
    views: 8920,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: '创作者激励计划启动',
    summary: 'MC Hub创作者激励计划正式启动，优质内容创作者可获得丰厚奖励。我们希望通过这个计划鼓励更多创作者分享他们的作品。',
    slug: 'creator-incentive-program',
    category: 'announcement',
    views: 12350,
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    title: 'Minecraft 1.21.1 版本更新预告',
    summary: 'Mojang宣布将在下个月发布1.21.1版本更新，主要修复了一些bug并优化了性能。',
    slug: 'minecraft-1-21-1-preview',
    category: 'minecraft',
    views: 25680,
    createdAt: '2024-01-03',
  },
  {
    id: '5',
    title: '春节活动预告',
    summary: 'MC Hub将在春节期间举办特别活动，届时将有丰厚的奖品和限定资源等待大家！',
    slug: 'spring-festival-event',
    category: 'event',
    views: 9850,
    createdAt: '2024-01-01',
  },
  {
    id: '6',
    title: 'Minecraft 1.22 版本正式发布！',
    summary: 'Mojang正式发布了Minecraft 1.22版本，代号"考古与冒险"。新版本带来了全新的考古系统、新的生物群系和更多的冒险内容。让我们一起来看看有哪些新特性！',
    slug: 'minecraft-1-22-release',
    category: 'minecraft',
    views: 45680,
    createdAt: '2024-12-03',
  },
  {
    id: '7',
    title: '2024年度最受欢迎模组TOP10',
    summary: '根据下载量和用户评分，我们评选出了2024年度最受欢迎的10个模组。Create（机械动力）再次蝉联榜首，让我们来看看完整榜单！',
    slug: 'top-mods-2024',
    category: 'guide',
    views: 32500,
    createdAt: '2024-12-01',
  },
  {
    id: '8',
    title: '新手必看：如何安装Minecraft模组',
    summary: '很多新手玩家不知道如何安装模组，这篇教程将手把手教你如何安装Forge、Fabric等模组加载器，以及如何正确安装模组文件。',
    slug: 'how-to-install-mods',
    category: 'guide',
    views: 28900,
    createdAt: '2024-11-28',
  },
  {
    id: '9',
    title: '服务器搭建指南：从零开始创建你的服务器',
    summary: '想和朋友一起玩Minecraft？这篇教程将教你如何从零开始搭建一个Minecraft服务器，包括选择服务端、配置服务器、安装插件等步骤。',
    slug: 'server-setup-guide',
    category: 'guide',
    views: 22100,
    createdAt: '2024-11-25',
  },
  {
    id: '10',
    title: 'MC Hub 服务器评选活动开始！',
    summary: 'MC Hub服务器评选活动正式启动！为你喜欢的服务器投票，票数最高的服务器将获得专属推荐位和丰厚奖励。活动持续一个月，快来参与吧！',
    slug: 'server-voting-event',
    category: 'event',
    views: 18500,
    createdAt: '2024-11-20',
  },
  {
    id: '11',
    title: '光影包推荐：让你的世界更美丽',
    summary: '光影包可以大幅提升游戏画质，本文将为你推荐5个优秀的光影包，从低配到高配都有，让你的Minecraft世界更加美丽。',
    slug: 'shader-pack-recommendations',
    category: 'guide',
    views: 19800,
    createdAt: '2024-11-15',
  },
  {
    id: '12',
    title: '2024最佳整合包推荐',
    summary: '整合包是将多个模组打包在一起的资源包，本文将为你推荐2024年最佳的整合包，包括科技、魔法、冒险等不同类型。',
    slug: 'best-modpacks-2024',
    category: 'guide',
    views: 24500,
    createdAt: '2024-11-10',
  },
  {
    id: '13',
    title: 'MC Hub 社区规则更新',
    summary: '为了维护良好的社区环境，MC Hub社区规则进行了更新。主要包括禁止发布盗版资源、禁止恶意攻击他人等条款。请大家遵守规则，共建和谐社区。',
    slug: 'community-rules-update',
    category: 'announcement',
    views: 11200,
    createdAt: '2024-11-05',
  },
  {
    id: '14',
    title: 'Minecraft 基岩版 1.21.50 更新',
    summary: 'Minecraft基岩版1.21.50版本已发布，主要修复了跨平台联机问题，并优化了移动端性能。所有平台用户都可以更新到最新版本。',
    slug: 'bedrock-1-21-50-update',
    category: 'minecraft',
    views: 16800,
    createdAt: '2024-11-01',
  },
  {
    id: '15',
    title: 'MC Hub 周年庆典活动预告',
    summary: 'MC Hub即将迎来一周年！为了感谢大家的支持，我们将举办盛大的周年庆典活动，届时将有海量福利和限定资源发放。敬请期待！',
    slug: 'anniversary-event-preview',
    category: 'event',
    views: 14200,
    createdAt: '2024-10-28',
  },
  {
    id: '16',
    title: '材质包入门：如何选择适合你的材质包',
    summary: '材质包可以改变游戏的视觉风格，从原版增强到卡通风格，种类繁多。本文将教你如何选择适合自己的材质包，并提供安装教程。',
    slug: 'resource-pack-guide',
    category: 'guide',
    views: 15600,
    createdAt: '2024-10-25',
  },
  {
    id: '17',
    title: '模组开发入门教程：创建你的第一个模组',
    summary: '想学习模组开发？这篇教程将从零开始教你如何创建你的第一个Minecraft模组，包括环境搭建、代码编写、测试调试等步骤。',
    slug: 'mod-development-tutorial',
    category: 'guide',
    views: 12800,
    createdAt: '2024-10-20',
  },
  {
    id: '18',
    title: 'MC Hub 与多家模组团队达成合作',
    summary: 'MC Hub已与多家知名模组团队达成合作，将为用户提供更优质的模组资源和更快的更新速度。合作团队包括Create、Botania等知名模组的开发团队。',
    slug: 'mod-team-partnerships',
    category: 'announcement',
    views: 9800,
    createdAt: '2024-10-15',
  },
  {
    id: '19',
    title: 'Minecraft 教育版免费开放',
    summary: 'Mojang宣布Minecraft教育版将永久免费开放，所有玩家都可以免费使用教育版的功能。教育版提供了丰富的学习资源和创意工具。',
    slug: 'education-edition-free',
    category: 'minecraft',
    views: 38500,
    createdAt: '2024-10-10',
  },
  {
    id: '20',
    title: 'MC Hub 创作者大赛开始报名',
    summary: 'MC Hub创作者大赛正式开始报名！比赛分为模组、整合包、材质包、地图四个赛道，总奖金超过10000元。欢迎所有创作者参加！',
    slug: 'creator-contest',
    category: 'event',
    views: 21500,
    createdAt: '2024-10-05',
  },
])

// 方法
const getNewsGradient = (category: string) => {
  const gradients: Record<string, string> = {
    announcement: 'from-primary-500 to-primary-700',
    update: 'from-blue-500 to-blue-700',
    minecraft: 'from-green-500 to-green-700',
    event: 'from-purple-500 to-purple-700',
    guide: 'from-orange-500 to-orange-700',
  }
  return gradients[category] || 'from-gray-500 to-gray-700'
}

const getNewsIcon = (category: string) => {
  const icons: Record<string, string> = {
    announcement: '📢',
    update: '🔄',
    minecraft: '🎮',
    event: '🎉',
    guide: '📚',
  }
  return icons[category] || '📰'
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    announcement: 'bg-primary-500/10 text-primary-500',
    update: 'bg-blue-500/10 text-blue-500',
    minecraft: 'bg-green-500/10 text-green-500',
    event: 'bg-purple-500/10 text-purple-500',
    guide: 'bg-orange-500/10 text-orange-500',
  }
  return classes[category] || 'bg-gray-500/10 text-gray-500'
}

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    announcement: '公告',
    update: '更新',
    minecraft: 'MC资讯',
    event: '活动',
    guide: '攻略',
  }
  return names[category] || category
}
</script>
