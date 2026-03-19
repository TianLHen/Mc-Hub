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
            {{ currentTypeName }}
          </li>
        </ol>
      </nav>
      
      <!-- 筛选栏 -->
      <div 
        class="rounded-card p-4 mb-6"
        :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <!-- 分类筛选 -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in resourceTypes"
              :key="type.value"
              class="px-3 py-1.5 text-sm rounded-lg transition-colors"
              :class="[
                filter.type === type.value
                  ? 'bg-primary-500 text-white'
                  : isDark 
                    ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              @click="handleTypeChange(type.value)">
              {{ type.icon }} {{ type.label }}
            </button>
          </div>
          
          <!-- 搜索框 -->
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索资源..."
              class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              ]"
              @keyup.enter="handleSearch"
            />
          </div>
          
          <!-- 排序 -->
          <div class="flex items-center gap-2">
            <span 
              class="text-sm"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              排序：
            </span>
            <select
              v-model="sortBy"
              class="h-10 px-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              ]"
              @change="handleSortChange">
              <option value="newest">最新</option>
              <option value="downloads">下载最多</option>
              <option value="rating">评分最高</option>
              <option value="updated">最近更新</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 结果统计 -->
      <div class="mb-6">
        <p 
          class="text-sm"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          找到 <span class="font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">{{ pagination.total }}</span> 个资源
        </p>
      </div>
      
      <!-- 资源列表 -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="i in 8" 
          :key="i"
          class="rounded-card overflow-hidden"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="aspect-video skeleton" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 w-3/4 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            <div class="h-3 w-full skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            <div class="h-3 w-2/3 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="resources.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ResourceCard 
          v-for="resource in resources" 
          :key="resource.id"
          :resource="resource" />
      </div>
      
      <!-- 空状态 -->
      <div 
        v-else 
        class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 
          class="text-xl font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          未找到资源
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          尝试使用不同的搜索词或筛选条件
        </p>
        <button 
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600"
          @click="resetFilters">
          重置筛选
        </button>
      </div>
      
      <!-- 分页 -->
      <div 
        v-if="resources.length > 0"
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useResourceStore } from '~/stores/resources'
import type { ResourceType } from '~/types'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const resourceStore = useResourceStore()

// 状态
const searchQuery = ref('')
const sortBy = ref<'downloads' | 'rating' | 'newest' | 'updated'>('newest')
const currentPage = ref(1)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const resources = computed(() => resourceStore.resources)
const pagination = computed(() => resourceStore.pagination)
const isLoading = computed(() => resourceStore.isLoading)
const filter = computed(() => resourceStore.filter)

// 资源类型
const resourceTypes = [
  { value: '', label: '全部', icon: '📁' },
  { value: 'mod', label: '模组', icon: '⚙️' },
  { value: 'modpack', label: '整合包', icon: '📦' },
  { value: 'resourcepack', label: '材质包', icon: '🎨' },
  { value: 'shader', label: '光影', icon: '✨' },
  { value: 'map', label: '地图', icon: '🗺️' },
  { value: 'datapack', label: '数据包', icon: '📋' },
]

// 当前类型名称
const currentTypeName = computed(() => {
  const type = resourceTypes.find(t => t.value === filter.value.type)
  return type ? type.label : '全部资源'
})

// 方法
const handleTypeChange = (type: string) => {
  const newType = type as ResourceType | undefined
  resourceStore.fetchResources({ type: newType, page: 1 })
  updateQueryParams()
}

const handleSearch = () => {
  resourceStore.fetchResources({ search: searchQuery.value, page: 1 })
  currentPage.value = 1
  updateQueryParams()
}

const handleSortChange = () => {
  resourceStore.fetchResources({ sort: sortBy.value, page: 1 })
  currentPage.value = 1
  updateQueryParams()
}

const handlePageChange = (page: number) => {
  resourceStore.fetchResources({ page })
  updateQueryParams()
}

const resetFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'newest'
  resourceStore.fetchResources({ type: undefined, search: '', sort: 'newest', page: 1 })
  currentPage.value = 1
  router.push('/resources')
}

const updateQueryParams = () => {
  const query: Record<string, string> = {}
  if (filter.value.type) query.type = filter.value.type
  if (filter.value.search) query.search = filter.value.search
  if (filter.value.sort) query.sort = filter.value.sort
  if (filter.value.page && filter.value.page > 1) query.page = filter.value.page.toString()
  router.push({ query })
}

// 监听路由变化
watch(() => route.query, (query) => {
  const type = query.type as ResourceType | undefined
  const search = query.search as string | undefined
  const sort = query.sort as 'downloads' | 'rating' | 'newest' | 'updated' | undefined
  const page = query.page ? parseInt(query.page as string) : 1
  
  if (type !== undefined || search !== undefined || sort !== undefined || page !== 1) {
    resourceStore.fetchResources({ type, search, sort, page })
    if (search) searchQuery.value = search
    if (sort) sortBy.value = sort
    currentPage.value = page
  }
}, { immediate: true })

// 生命周期
onMounted(() => {
  const type = route.query.type as ResourceType | undefined
  const search = route.query.search as string | undefined
  const sort = route.query.sort as 'downloads' | 'rating' | 'newest' | 'updated' | undefined
  const page = route.query.page ? parseInt(route.query.page as string) : 1
  
  resourceStore.fetchResources({ type, search, sort, page })
  if (search) searchQuery.value = search
  if (sort) sortBy.value = sort
  currentPage.value = page
})
</script>
