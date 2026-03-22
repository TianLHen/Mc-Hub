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
            版本库
          </li>
        </ol>
      </nav>
      
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          Minecraft 版本库
        </h1>
        <p 
          class="text-lg"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          浏览和下载所有 Minecraft Java 版本，从正式版到快照版
        </p>
      </div>
      
      <!-- 版本类型切换 -->
      <div 
        class="rounded-card p-4 mb-6"
        :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(info, type) in versionTypeInfos"
            :key="type"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="[
              selectedType === type
                ? 'bg-primary-500 text-white'
                : isDark 
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="handleTypeChange(type as VersionType)">
            <span class="mr-1">{{ info.icon }}</span>
            {{ info.name }}
          </button>
        </div>
      </div>
      
      <!-- 当前类型描述 -->
      <div 
        v-if="currentTypeInfo"
        class="mb-6 p-4 rounded-lg"
        :class="isDark ? 'bg-dark-900/50' : 'bg-primary-50'">
        <div class="flex items-center gap-2">
          <span class="text-2xl">{{ currentTypeInfo.icon }}</span>
          <div>
            <h3 
              class="font-semibold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              {{ currentTypeInfo.name }}
            </h3>
            <p 
              class="text-sm"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              {{ currentTypeInfo.description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- 版本列表 -->
      <div v-if="isLoading" class="space-y-4">
        <div 
          v-for="i in 5" 
          :key="i"
          class="rounded-card p-4"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="flex gap-4">
            <div class="w-16 h-16 skeleton rounded-lg" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            <div class="flex-1 space-y-2">
              <div class="h-5 w-1/3 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
              <div class="h-4 w-2/3 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="versions.length > 0" class="space-y-4">
        <div 
          v-for="version in versions" 
          :key="version.id"
          class="rounded-card p-6 transition-all duration-300 card-hover"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <!-- 版本图标 -->
            <div 
              class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              :class="getTypeBackground(version.type)">
              {{ getTypeIcon(version.type) }}
            </div>
            
            <!-- 版本信息 -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 
                  class="text-xl font-bold"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ version.version }}
                </h3>
                <span 
                  v-if="version.isLatest"
                  class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                  最新
                </span>
                <span 
                  v-if="version.isRecommended"
                  class="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-500">
                  推荐
                </span>
              </div>
              <p 
                class="text-sm mb-2"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ version.summary }}
              </p>
              <div class="flex flex-wrap items-center gap-4 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(version.releaseDate) }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {{ formatNumber(version.downloads) }} 下载
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                  {{ formatFileSize(version.fileSize) }}
                </span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex flex-col gap-2">
              <button 
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600 flex items-center gap-2"
                @click="handleDownload(version)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载
              </button>
              <NuxtLink 
                :to="`/versions/${version.id}`"
                class="px-6 py-2 text-center rounded-lg font-medium transition-colors"
                :class="isDark 
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                详情
              </NuxtLink>
            </div>
          </div>
          
          <!-- 更新日志预览 -->
          <div 
            v-if="version.changelog.length > 0"
            class="mt-4 pt-4 border-t"
            :class="isDark ? 'border-dark-800' : 'border-gray-100'">
            <details class="group">
              <summary 
                class="flex items-center gap-2 cursor-pointer text-sm font-medium"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                <svg 
                  class="w-4 h-4 transition-transform group-open:rotate-90" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                查看更新日志
              </summary>
              <ul 
                class="mt-2 ml-6 space-y-1 text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                <li v-for="(item, index) in version.changelog.slice(0, 5)" :key="index" class="list-disc">
                  {{ item }}
                </li>
              </ul>
            </details>
          </div>
          
          <!-- 已知问题警告 -->
          <div 
            v-if="version.knownIssues && version.knownIssues.length > 0"
            class="mt-4 p-3 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-500">
            <div class="flex items-center gap-2 text-sm font-medium mb-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              已知问题
            </div>
            <ul class="text-sm ml-6 list-disc">
              <li v-for="(issue, index) in version.knownIssues" :key="index">
                {{ issue }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div 
        v-else 
        class="text-center py-20">
        <div class="text-6xl mb-4">📦</div>
        <h3 
          class="text-xl font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          暂无版本
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          该类型暂无可用版本
        </p>
        <button 
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600"
          @click="resetFilter">
          查看所有版本
        </button>
      </div>
      
      <!-- 分页 -->
      <div 
        v-if="versions.length > 0"
        class="mt-8 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next"
          :background="true"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useVersionStore } from '~/stores/versions'
import { formatNumber, formatDate, formatFileSize } from '~/utils'
import type { VersionType, MinecraftVersion } from '~/types'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const versionStore = useVersionStore()

// 状态
const selectedType = ref<VersionType>('release')
const currentPage = ref(1)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const versions = computed(() => versionStore.versions)
const pagination = computed(() => versionStore.pagination)
const isLoading = computed(() => versionStore.isLoading)
const versionTypeInfos = computed(() => versionStore.versionTypeInfos)

const currentTypeInfo = computed(() => {
  return versionTypeInfos.value[selectedType.value]
})

// 方法
const handleTypeChange = (type: VersionType) => {
  selectedType.value = type
  currentPage.value = 1
  versionStore.fetchVersions({ type, page: 1 })
  router.push({ query: { type } })
}

const handlePageChange = (page: number) => {
  versionStore.fetchVersions({ page })
}

const handleDownload = (version: MinecraftVersion) => {
  ElMessage.success(`开始下载 ${version.version}`)
  // 实际项目中这里会触发下载
}

const resetFilter = () => {
  selectedType.value = 'release'
  currentPage.value = 1
  versionStore.fetchVersions({ type: 'release', page: 1 })
  router.push({ query: {} })
}

const getTypeBackground = (type: VersionType) => {
  const backgrounds: Record<VersionType, string> = {
    release: 'bg-green-500/10',
    snapshot: 'bg-blue-500/10',
    prerelease: 'bg-purple-500/10',
    release_candidate: 'bg-orange-500/10',
    beta: 'bg-yellow-500/10',
    alpha: 'bg-red-500/10',
  }
  return backgrounds[type] || 'bg-gray-500/10'
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

// 监听路由变化
watch(() => route.query.type, (type) => {
  if (type && typeof type === 'string') {
    selectedType.value = type as VersionType
    versionStore.fetchVersions({ type: type as VersionType, page: 1 })
  }
}, { immediate: true })

// 生命周期
onMounted(() => {
  const type = route.query.type as VersionType | undefined
  if (type) {
    selectedType.value = type
  }
  versionStore.fetchVersions({ type: selectedType.value, page: 1 })
})
</script>
