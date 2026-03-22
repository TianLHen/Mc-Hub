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
          <li>
            <NuxtLink 
              to="/resources"
              class="transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              资源
            </NuxtLink>
          </li>
          <li :class="isDark ? 'text-gray-600' : 'text-gray-400'">/</li>
          <li :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ resource?.name || '加载中...' }}
          </li>
        </ol>
      </nav>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="aspect-video skeleton rounded-card" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
          <div class="space-y-3">
            <div class="h-8 w-1/2 skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
            <div class="h-4 w-full skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
            <div class="h-4 w-3/4 skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="h-40 skeleton rounded-card" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
          <div class="h-60 skeleton rounded-card" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
        </div>
      </div>
      
      <!-- 资源详情 -->
      <div v-else-if="resource" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 主内容区 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 截图画廊 -->
          <div 
            class="aspect-video rounded-card overflow-hidden"
            :class="isDark ? 'bg-dark-900' : 'bg-gray-200'">
            <div 
              class="w-full h-full bg-gradient-to-br flex items-center justify-center"
              :class="getThumbnailGradient(resource.type)">
              <span class="text-6xl">{{ getResourceTypeIcon(resource.type) }}</span>
            </div>
          </div>
          
          <!-- 标题和信息 -->
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h1 
                class="text-2xl sm:text-3xl font-bold"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ resource.name }}
              </h1>
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getTypeBadgeClass(resource.type)">
                {{ getResourceTypeName(resource.type) }}
              </span>
            </div>
            
            <div class="flex items-center gap-4 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ resource.author.username }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(resource.createdAt) }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ formatNumber(resource.downloads) }} 下载
              </span>
            </div>
          </div>
          
          <!-- 标签 -->
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in resource.tags" 
              :key="tag"
              class="px-3 py-1 text-sm rounded-full"
              :class="isDark ? 'bg-dark-800 text-gray-300' : 'bg-gray-100 text-gray-700'">
              {{ tag }}
            </span>
          </div>
          
          <!-- 详细介绍 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              详细介绍
            </h2>
            <div 
              class="prose max-w-none"
              :class="isDark ? 'prose-invert' : ''">
              <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                {{ resource.description }}
              </p>
            </div>
          </div>
          
          <!-- 模组搭配推荐 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-lg font-semibold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              <span>🔗</span>
              用这个的人也用了
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink 
                v-for="rec in recommendedResources" 
                :key="rec.id"
                :to="`/resources/${rec.slug}`"
                class="flex items-center gap-3 p-3 rounded-lg transition-colors"
                :class="isDark 
                  ? 'bg-dark-800 hover:bg-dark-700' 
                  : 'bg-gray-50 hover:bg-gray-100'">
                <div 
                  class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="getTypeBackground(rec.type)">
                  {{ getResourceTypeIcon(rec.type) }}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 
                    class="font-medium truncate"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ rec.name }}
                  </h4>
                  <div class="flex items-center gap-2 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                    <span>{{ formatNumber(rec.downloads) }} 下载</span>
                    <span>⭐ {{ rec.rating.toFixed(1) }}</span>
                  </div>
                </div>
                <svg 
                  class="w-4 h-4 flex-shrink-0" 
                  :class="isDark ? 'text-gray-600' : 'text-gray-400'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
          
          <!-- 评论区 -->
          <div 
            class="rounded-card"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <CommentSection :resource-id="resource?.id" />
          </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="space-y-6">
          <!-- 下载区域 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <button 
              class="w-full py-3 bg-primary-500 text-white rounded-lg font-medium text-lg transition-colors hover:bg-primary-600 mb-3">
              下载最新版本
            </button>
            
            <!-- 关注按钮 -->
            <button 
              class="w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              :class="[
                isSubscribed 
                  ? 'bg-primary-500/10 text-primary-500 border border-primary-500' 
                  : isDark 
                    ? 'bg-dark-800 text-gray-300 border border-dark-700 hover:bg-dark-700' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              ]"
              @click="toggleSubscribe">
              <svg 
                class="w-5 h-5" 
                :fill="isSubscribed ? 'currentColor' : 'none'" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {{ isSubscribed ? '已关注更新' : '关注更新通知' }}
            </button>
            
            <p 
              v-if="isSubscribed"
              class="mt-2 text-xs text-center"
              :class="isDark ? 'text-gray-500' : 'text-gray-500'">
              当此资源更新时，您将收到通知
            </p>
            
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">版本</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ resource.versions[0]?.version || '1.0.0' }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">游戏版本</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ resource.versions[0]?.gameVersion || '1.20.4' }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">文件大小</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatFileSize(resource.versions[0]?.fileSize || 0) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">更新时间</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatDate(resource.updatedAt) }}
                </span>
              </div>
            </div>
            
            <!-- 评分 -->
            <div 
              class="mt-4 pt-4 border-t"
              :class="isDark ? 'border-dark-800' : 'border-gray-100'">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1">
                    <svg 
                      v-for="i in 5" 
                      :key="i"
                      class="w-5 h-5"
                      :class="i <= Math.round(resource.rating) ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor" 
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span 
                    class="text-lg font-bold"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ resource.rating.toFixed(1) }}
                  </span>
                </div>
                <span 
                  class="text-sm"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  {{ formatNumber(resource.ratingCount) }} 评价
                </span>
              </div>
            </div>
          </div>
          
          <!-- 版本兼容性矩阵 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h3 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              版本兼容性
            </h3>
            <div class="grid grid-cols-4 gap-2">
              <div 
                v-for="version in supportedVersions" 
                :key="version.version"
                class="relative px-2 py-1.5 rounded text-center text-sm cursor-pointer transition-all"
                :class="[
                  version.supported 
                    ? isDark 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isDark 
                      ? 'bg-dark-800 text-gray-500' 
                      : 'bg-gray-100 text-gray-400'
                ]"
                :title="version.supported ? `支持 ${version.version}` : `不支持 ${version.version}`">
                {{ version.version }}
                <span 
                  v-if="version.latest"
                  class="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
              </div>
            </div>
            <p 
              class="mt-3 text-xs"
              :class="isDark ? 'text-gray-500' : 'text-gray-500'">
              💡 绿色表示支持，灰色表示不支持
            </p>
          </div>
          
          <!-- 基本信息 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h3 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              基本信息
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">类型</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ getResourceTypeName(resource.type) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">作者</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ resource.author.username }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">下载次数</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatNumber(resource.downloads) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">发布日期</span>
                <span :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatDate(resource.createdAt) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 依赖列表 -->
          <div 
            v-if="resource.dependencies.length > 0"
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h3 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              依赖
            </h3>
            <div class="space-y-2">
              <div 
                v-for="dep in resource.dependencies" 
                :key="dep.id"
                class="flex items-center justify-between text-sm">
                <span :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  {{ dep.name }}
                </span>
                <span 
                  class="px-2 py-0.5 text-xs rounded-full"
                  :class="dep.required 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-green-500/10 text-green-500'">
                  {{ dep.required ? '必需' : '可选' }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 版本历史 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h3 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              版本历史
            </h3>
            <div class="space-y-3">
              <div 
                v-for="version in resource.versions.slice(0, 5)" 
                :key="version.id"
                class="flex items-center justify-between text-sm">
                <div>
                  <span 
                    class="font-medium"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ version.version }}
                  </span>
                  <span 
                    class="ml-2 text-xs"
                    :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                    {{ version.gameVersion }}
                  </span>
                </div>
                <span 
                  class="text-xs"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  {{ formatDate(version.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 错误状态 -->
      <div 
        v-else 
        class="text-center py-20">
        <div class="text-6xl mb-4">😢</div>
        <h3 
          class="text-xl font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          资源不存在
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          该资源可能已被删除或链接无效
        </p>
        <NuxtLink 
          to="/resources"
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
          返回资源列表
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useResourceStore } from '~/stores/resources'
import type { ResourceType } from '~/types'
import { formatNumber, formatDate, formatFileSize, getResourceTypeName, getResourceTypeIcon } from '~/utils'

const route = useRoute()
const themeStore = useThemeStore()
const resourceStore = useResourceStore()

// 状态
const commentText = ref('')
const isSubscribed = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const resource = computed(() => resourceStore.currentResource)
const isLoading = computed(() => resourceStore.isLoading)

// 模拟评论数据
const comments = [
  { id: '1', author: '小明', content: '这个资源非常好用，强烈推荐！', date: '2024-01-15' },
  { id: '2', author: '小红', content: '安装简单，效果很棒。', date: '2024-01-14' },
  { id: '3', author: '小刚', content: '期待更多更新！', date: '2024-01-13' },
]

// 支持的版本列表
const supportedVersions = [
  { version: '1.21.4', supported: true, latest: true },
  { version: '1.21.3', supported: true, latest: false },
  { version: '1.21.2', supported: true, latest: false },
  { version: '1.21.1', supported: true, latest: false },
  { version: '1.20.4', supported: true, latest: false },
  { version: '1.20.1', supported: true, latest: false },
  { version: '1.19.4', supported: true, latest: false },
  { version: '1.19.2', supported: true, latest: false },
  { version: '1.18.2', supported: true, latest: false },
  { version: '1.16.5', supported: true, latest: false },
  { version: '1.12.2', supported: false, latest: false },
  { version: '1.7.10', supported: false, latest: false },
]

// 推荐资源
const recommendedResources = [
  {
    id: '2',
    name: 'JEI (Just Enough Items)',
    slug: 'jei',
    type: 'mod' as ResourceType,
    downloads: 4500000,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'BSL Shaders',
    slug: 'bsl-shaders',
    type: 'shader' as ResourceType,
    downloads: 3500000,
    rating: 4.8,
  },
  {
    id: '6',
    name: 'Faithful 32x',
    slug: 'faithful-32x',
    type: 'resourcepack' as ResourceType,
    downloads: 2800000,
    rating: 4.7,
  },
  {
    id: '3',
    name: '剑与王国整合包',
    slug: 'sword-and-kingdom',
    type: 'modpack' as ResourceType,
    downloads: 1845000,
    rating: 4.7,
  },
]

// 方法
const getThumbnailGradient = (type: ResourceType) => {
  const gradients: Record<ResourceType, string> = {
    mod: 'from-blue-500 to-blue-700',
    modpack: 'from-purple-500 to-purple-700',
    resourcepack: 'from-green-500 to-green-700',
    shader: 'from-yellow-500 to-orange-500',
    map: 'from-teal-500 to-teal-700',
    datapack: 'from-red-500 to-red-700',
  }
  return gradients[type] || 'from-gray-500 to-gray-700'
}

const getTypeBadgeClass = (type: ResourceType) => {
  const classes: Record<ResourceType, string> = {
    mod: 'bg-blue-500/90 text-white',
    modpack: 'bg-purple-500/90 text-white',
    resourcepack: 'bg-green-500/90 text-white',
    shader: 'bg-yellow-500/90 text-white',
    map: 'bg-teal-500/90 text-white',
    datapack: 'bg-red-500/90 text-white',
  }
  return classes[type] || 'bg-gray-500/90 text-white'
}

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

const toggleSubscribe = () => {
  isSubscribed.value = !isSubscribed.value
}

// 生命周期
onMounted(() => {
  const slug = route.params.slug as string
  if (slug) {
    resourceStore.fetchResourceBySlug(slug)
  }
})
</script>
