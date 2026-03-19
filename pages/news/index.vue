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
])

// 方法
const getNewsGradient = (category: string) => {
  const gradients: Record<string, string> = {
    announcement: 'from-primary-500 to-primary-700',
    update: 'from-blue-500 to-blue-700',
    minecraft: 'from-green-500 to-green-700',
    event: 'from-purple-500 to-purple-700',
  }
  return gradients[category] || 'from-gray-500 to-gray-700'
}

const getNewsIcon = (category: string) => {
  const icons: Record<string, string> = {
    announcement: '📢',
    update: '🔄',
    minecraft: '🎮',
    event: '🎉',
  }
  return icons[category] || '📰'
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    announcement: 'bg-primary-500/10 text-primary-500',
    update: 'bg-blue-500/10 text-blue-500',
    minecraft: 'bg-green-500/10 text-green-500',
    event: 'bg-purple-500/10 text-purple-500',
  }
  return classes[category] || 'bg-gray-500/10 text-gray-500'
}

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    announcement: '公告',
    update: '更新',
    minecraft: 'MC资讯',
    event: '活动',
  }
  return names[category] || category
}
</script>
