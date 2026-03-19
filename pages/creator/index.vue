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
            创作者中心
          </li>
        </ol>
      </nav>
      
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          创作者中心
        </h1>
        <p 
          class="text-lg"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          管理你的资源，查看数据统计，与社区互动
        </p>
      </div>
      
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="stat in stats" 
          :key="stat.label"
          class="rounded-card p-6"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="flex items-center justify-between mb-4">
            <span class="text-3xl">{{ stat.icon }}</span>
            <span 
              class="text-sm font-medium px-2 py-1 rounded-full"
              :class="stat.trend > 0 
                ? 'bg-green-500/10 text-green-500' 
                : 'bg-red-500/10 text-red-500'">
              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
            </span>
          </div>
          <div 
            class="text-2xl font-bold mb-1"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ formatNumber(stat.value) }}
          </div>
          <div 
            class="text-sm"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            {{ stat.label }}
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧：我的资源 -->
        <div class="lg:col-span-2 space-y-6">
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <div class="flex items-center justify-between mb-6">
              <h2 
                class="text-xl font-semibold"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                我的资源
              </h2>
              <NuxtLink 
                to="/upload"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors hover:bg-primary-600">
                上传新资源
              </NuxtLink>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="resource in myResources" 
                :key="resource.id"
                class="flex items-center gap-4 p-4 rounded-lg transition-colors"
                :class="isDark 
                  ? 'bg-dark-800 hover:bg-dark-700' 
                  : 'bg-gray-50 hover:bg-gray-100'">
                <div 
                  class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="getTypeBackground(resource.type)">
                  {{ getResourceTypeIcon(resource.type) }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 
                    class="font-medium truncate"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ resource.name }}
                  </h3>
                  <div class="flex items-center gap-4 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                    <span>{{ formatNumber(resource.downloads) }} 下载</span>
                    <span>⭐ {{ resource.rating.toFixed(1) }}</span>
                    <span>{{ resource.versions.length }} 个版本</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button 
                    class="p-2 rounded-lg transition-colors"
                    :class="isDark 
                      ? 'hover:bg-dark-600 text-gray-400' 
                      : 'hover:bg-gray-200 text-gray-600'"
                    title="编辑">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    class="p-2 rounded-lg transition-colors"
                    :class="isDark 
                      ? 'hover:bg-dark-600 text-gray-400' 
                      : 'hover:bg-gray-200 text-gray-600'"
                    title="查看统计">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 下载趋势图表 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-xl font-semibold mb-6"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              下载趋势（近7天）
            </h2>
            <div class="h-48 flex items-end justify-between gap-2">
              <div 
                v-for="(day, index) in downloadTrend" 
                :key="index"
                class="flex-1 flex flex-col items-center gap-2">
                <div 
                  class="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                  :class="isDark ? 'bg-primary-500' : 'bg-primary-500'"
                  :style="{ height: `${(day.value / maxDownload) * 100}%` }"></div>
                <span 
                  class="text-xs"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  {{ day.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧：收益和活动 -->
        <div class="space-y-6">
          <!-- 收益概览 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-xl font-semibold mb-6"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              收益概览
            </h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">本月收益</span>
                <span 
                  class="text-xl font-bold text-primary-500">
                  ¥{{ formatNumber(earnings.thisMonth) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">总收益</span>
                <span 
                  class="font-semibold"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  ¥{{ formatNumber(earnings.total) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">积分余额</span>
                <span 
                  class="font-semibold"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatNumber(earnings.points) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 创作者等级 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-xl font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              创作者等级
            </h2>
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span class="text-3xl text-white font-bold">L{{ creatorLevel.level }}</span>
              </div>
              <h3 
                class="text-lg font-semibold mb-2"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ creatorLevel.title }}
              </h3>
              <div 
                class="text-sm mb-4"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                距离下一等级还需 {{ creatorLevel.nextLevelPoints }} 积分
              </div>
              <div class="w-full h-2 rounded-full" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'">
                <div 
                  class="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  :style="{ width: `${creatorLevel.progress}%` }"></div>
              </div>
            </div>
          </div>
          
          <!-- 最近活动 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-xl font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              最近活动
            </h2>
            <div class="space-y-4">
              <div 
                v-for="activity in recentActivities" 
                :key="activity.id"
                class="flex items-start gap-3">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="getActivityIconClass(activity.type)">
                  {{ getActivityIcon(activity.type) }}
                </div>
                <div>
                  <p 
                    class="text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                    {{ activity.message }}
                  </p>
                  <span 
                    class="text-xs"
                    :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                    {{ activity.time }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '~/stores/theme'
import type { ResourceType } from '~/types'
import { formatNumber, getResourceTypeIcon } from '~/utils'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 统计数据
const stats = [
  { icon: '📦', label: '资源总数', value: 12, trend: 8 },
  { icon: '📥', label: '总下载量', value: 156800, trend: 15 },
  { icon: '⭐', label: '平均评分', value: 4.7, trend: 2 },
  { icon: '👥', label: '关注者', value: 2580, trend: 12 },
]

// 我的资源
const myResources = [
  {
    id: '1',
    name: 'OptiFine 中文版',
    slug: 'optifine',
    type: 'mod' as ResourceType,
    downloads: 125000,
    rating: 4.8,
    versions: [{ id: '1' }, { id: '2' }, { id: '3' }],
  },
  {
    id: '2',
    name: '高清材质包合集',
    slug: 'hd-pack',
    type: 'resourcepack' as ResourceType,
    downloads: 45000,
    rating: 4.6,
    versions: [{ id: '1' }, { id: '2' }],
  },
  {
    id: '3',
    name: '光影配置预设',
    slug: 'shader-presets',
    type: 'shader' as ResourceType,
    downloads: 28000,
    rating: 4.9,
    versions: [{ id: '1' }],
  },
]

// 下载趋势
const downloadTrend = [
  { label: '周一', value: 1200 },
  { label: '周二', value: 1800 },
  { label: '周三', value: 1500 },
  { label: '周四', value: 2200 },
  { label: '周五', value: 2800 },
  { label: '周六', value: 3500 },
  { label: '周日', value: 3000 },
]

const maxDownload = computed(() => Math.max(...downloadTrend.map(d => d.value)))

// 收益
const earnings = {
  thisMonth: 2580,
  total: 15600,
  points: 28500,
}

// 创作者等级
const creatorLevel = {
  level: 5,
  title: '高级创作者',
  nextLevelPoints: 5000,
  progress: 65,
}

// 最近活动
const recentActivities = [
  { id: '1', type: 'download', message: '你的资源被下载了 150 次', time: '2小时前' },
  { id: '2', type: 'comment', message: '小明评论了你的资源', time: '5小时前' },
  { id: '3', type: 'follow', message: '新增 3 个关注者', time: '1天前' },
  { id: '4', type: 'rating', message: '收到新的 5 星评价', time: '2天前' },
]

// 方法
const getTypeBackground = (type: ResourceType) => {
  const backgrounds: Record<ResourceType, string> = {
    mod: 'bg-blue-500/10',
    modpack: 'bg-purple-500/10',
    resourcepack: 'bg-green-500/10',
    shader: 'bg-yellow-500/10',
    map: 'bg-teal-500/10',
    datapack: 'bg-red-500/10',
  }
  return backgrounds[type] || 'bg-gray-500/10'
}

const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    download: '📥',
    comment: '💬',
    follow: '👤',
    rating: '⭐',
  }
  return icons[type] || '📌'
}

const getActivityIconClass = (type: string) => {
  const classes: Record<string, string> = {
    download: 'bg-blue-500/10',
    comment: 'bg-green-500/10',
    follow: 'bg-purple-500/10',
    rating: 'bg-yellow-500/10',
  }
  return classes[type] || 'bg-gray-500/10'
}
</script>
