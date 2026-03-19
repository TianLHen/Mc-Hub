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
              to="/versions"
              class="transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              版本库
            </NuxtLink>
          </li>
          <li :class="isDark ? 'text-gray-600' : 'text-gray-400'">/</li>
          <li :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ version?.version || '加载中...' }}
          </li>
        </ol>
      </nav>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="h-8 w-1/2 skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
          <div class="h-4 w-full skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
          <div class="h-4 w-3/4 skeleton rounded" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
        </div>
        <div class="space-y-4">
          <div class="h-40 skeleton rounded-card" :class="isDark ? 'bg-dark-900' : 'bg-gray-200'"></div>
        </div>
      </div>
      
      <!-- 版本详情 -->
      <div v-else-if="version" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 主内容区 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 版本标题 -->
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h1 
                class="text-3xl font-bold"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ version.version }}
              </h1>
              <span 
                v-if="version.isLatest"
                class="px-3 py-1 text-sm font-medium rounded-full bg-green-500/10 text-green-500">
                最新版本
              </span>
              <span 
                v-if="version.isRecommended"
                class="px-3 py-1 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-500">
                推荐版本
              </span>
            </div>
            <p 
              class="text-lg"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              {{ version.name }}
            </p>
          </div>
          
          <!-- 版本摘要 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              版本简介
            </h2>
            <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              {{ version.summary }}
            </p>
          </div>
          
          <!-- 更新日志 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              更新日志
            </h2>
            <ul class="space-y-2">
              <li 
                v-for="(item, index) in version.changelog" 
                :key="index"
                class="flex items-start gap-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                <span class="text-primary-500 mt-1">•</span>
                {{ item }}
              </li>
            </ul>
          </div>
          
          <!-- 已知问题 -->
          <div 
            v-if="version.knownIssues && version.knownIssues.length > 0"
            class="rounded-card p-6 bg-yellow-500/5 border border-yellow-500/20">
            <h2 
              class="text-lg font-semibold mb-4 flex items-center gap-2"
              :class="isDark ? 'text-yellow-500' : 'text-yellow-600'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              已知问题
            </h2>
            <ul class="space-y-2">
              <li 
                v-for="(issue, index) in version.knownIssues" 
                :key="index"
                class="flex items-start gap-2"
                :class="isDark ? 'text-yellow-400' : 'text-yellow-700'">
                <span>⚠️</span>
                {{ issue }}
              </li>
            </ul>
          </div>
          
          <!-- 相关资源 -->
          <div 
            v-if="relatedResources.length > 0"
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h2 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              适用资源推荐
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="resource in relatedResources" 
                :key="resource.id"
                class="p-4 rounded-lg border transition-colors"
                :class="isDark 
                  ? 'border-dark-700 hover:bg-dark-800' 
                  : 'border-gray-200 hover:bg-gray-50'">
                <div class="flex items-center gap-3">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :class="getResourceTypeBackground(resource.type)">
                    {{ getResourceTypeIcon(resource.type) }}
                  </div>
                  <div>
                    <h3 
                      class="font-medium"
                      :class="isDark ? 'text-white' : 'text-gray-900'">
                      {{ resource.name }}
                    </h3>
                    <p 
                      class="text-xs"
                      :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                      {{ formatNumber(resource.downloads) }} 下载
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="space-y-6">
          <!-- 下载区域 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <button 
              class="w-full py-3 bg-primary-500 text-white rounded-lg font-medium text-lg transition-colors hover:bg-primary-600 flex items-center justify-center gap-2"
              @click="handleDownload">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载此版本
            </button>
            
            <div class="mt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">版本号</span>
                <span 
                  class="font-medium"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ version.version }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">版本类型</span>
                <span 
                  class="font-medium"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ getTypeName(version.type) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">文件大小</span>
                <span 
                  class="font-medium"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatFileSize(version.fileSize) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">发布日期</span>
                <span 
                  class="font-medium"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatDate(version.releaseDate) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span :class="isDark ? 'text-gray-400' : 'text-gray-600'">下载次数</span>
                <span 
                  class="font-medium"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatNumber(version.downloads) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 版本标签 -->
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <h3 
              class="text-lg font-semibold mb-4"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              版本标签
            </h3>
            <div class="flex flex-wrap gap-2">
              <span 
                class="px-3 py-1 text-sm rounded-full"
                :class="getTypeBadgeClass(version.type)">
                {{ getTypeIcon(version.type) }} {{ getTypeName(version.type) }}
              </span>
              <span 
                v-if="version.isLatest"
                class="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-500">
                最新
              </span>
              <span 
                v-if="version.isRecommended"
                class="px-3 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-500">
                推荐
              </span>
              <span 
                class="px-3 py-1 text-sm rounded-full"
                :class="isDark ? 'bg-dark-800 text-gray-300' : 'bg-gray-100 text-gray-700'">
                Java版
              </span>
            </div>
          </div>
          
          <!-- 返回列表 -->
          <NuxtLink 
            to="/versions"
            class="block w-full py-3 text-center rounded-lg font-medium transition-colors"
            :class="isDark 
              ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
            ← 返回版本列表
          </NuxtLink>
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
          版本不存在
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          该版本可能已被移除或链接无效
        </p>
        <NuxtLink 
          to="/versions"
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
          返回版本列表
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useVersionStore } from '~/stores/versions'
import { formatNumber, formatDate, formatFileSize, getResourceTypeIcon } from '~/utils'
import type { VersionType, Resource } from '~/types'
import { ElMessage } from 'element-plus'

const route = useRoute()
const themeStore = useThemeStore()
const versionStore = useVersionStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)
const version = computed(() => versionStore.currentVersion)
const isLoading = computed(() => versionStore.isLoading)

// 模拟相关资源
const relatedResources = ref<Resource[]>([])

// 方法
const handleDownload = () => {
  if (version.value) {
    ElMessage.success(`开始下载 ${version.value.version}`)
  }
}

const getTypeName = (type: VersionType) => {
  const names: Record<VersionType, string> = {
    release: '正式版',
    snapshot: '快照版',
    prerelease: '预发布版',
    release_candidate: '候选版',
    beta: 'Beta版',
    alpha: 'Alpha版',
  }
  return names[type] || type
}

const getTypeIcon = (type: VersionType) => {
  const icons: Record<VersionType, string> = {
    release: '✅',
    snapshot: '📸',
    prerelease: '🔬',
    release_candidate: '🎯',
    beta: '🧪',
    alpha: '⚠️',
  }
  return icons[type] || '📦'
}

const getTypeBadgeClass = (type: VersionType) => {
  const classes: Record<VersionType, string> = {
    release: 'bg-green-500/10 text-green-500',
    snapshot: 'bg-blue-500/10 text-blue-500',
    prerelease: 'bg-purple-500/10 text-purple-500',
    release_candidate: 'bg-orange-500/10 text-orange-500',
    beta: 'bg-yellow-500/10 text-yellow-500',
    alpha: 'bg-red-500/10 text-red-500',
  }
  return classes[type] || 'bg-gray-500/10 text-gray-500'
}

const getResourceTypeBackground = (type: string) => {
  const backgrounds: Record<string, string> = {
    mod: 'bg-blue-500/10',
    modpack: 'bg-purple-500/10',
    resourcepack: 'bg-green-500/10',
    shader: 'bg-yellow-500/10',
    map: 'bg-teal-500/10',
    datapack: 'bg-red-500/10',
  }
  return backgrounds[type] || 'bg-gray-500/10'
}

// 生命周期
onMounted(() => {
  const id = route.params.id as string
  if (id) {
    versionStore.fetchVersionById(id)
  }
})
</script>
