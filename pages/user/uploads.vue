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
            我的上传
          </li>
        </ol>
      </nav>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
          <UserSidebar />
        </div>
        
        <!-- 主内容区 -->
        <div class="lg:col-span-3">
          <div 
            class="rounded-card p-6"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <div class="flex items-center justify-between mb-6">
              <h1 
                class="text-2xl font-bold"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                我的上传
              </h1>
              <NuxtLink 
                to="/upload"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
                上传资源
              </NuxtLink>
            </div>
            
            <!-- 上传列表 -->
            <div v-if="uploads.length > 0" class="space-y-4">
              <div 
                v-for="upload in uploads" 
                :key="upload.id"
                class="p-4 rounded-lg border transition-colors"
                :class="isDark 
                  ? 'border-dark-700 hover:bg-dark-800' 
                  : 'border-gray-200 hover:bg-gray-50'">
                <div class="flex items-start gap-4">
                  <div 
                    class="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                    :class="getTypeBackground(upload.type)">
                    {{ getResourceTypeIcon(upload.type) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 
                        class="font-semibold"
                        :class="isDark ? 'text-white' : 'text-gray-900'">
                        {{ upload.name }}
                      </h3>
                      <span 
                        class="px-2 py-0.5 text-xs rounded-full"
                        :class="getStatusClass(upload.status)">
                        {{ getStatusName(upload.status) }}
                      </span>
                    </div>
                    <p 
                      class="text-sm mb-2"
                      :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                      {{ upload.description }}
                    </p>
                    <div class="flex items-center gap-4 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                      <span>{{ formatNumber(upload.downloads) }} 下载</span>
                      <span>{{ formatDate(upload.createdAt) }}</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      class="px-3 py-1 text-sm rounded-lg border transition-colors"
                      :class="isDark 
                        ? 'border-dark-700 text-gray-300 hover:bg-dark-800' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'">
                      编辑
                    </button>
                    <button 
                      class="px-3 py-1 text-sm rounded-lg border text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors">
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">📦</div>
              <h3 
                class="text-xl font-semibold mb-2"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                暂无上传
              </h3>
              <p 
                class="text-sm mb-6"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                你还没有上传过任何资源
              </p>
              <NuxtLink 
                to="/upload"
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
                上传资源
              </NuxtLink>
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
import { formatNumber, formatDate, getResourceTypeIcon } from '~/utils'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟上传数据
const uploads = ref([
  {
    id: '1',
    name: '我的第一个模组',
    description: '这是一个示例模组，添加了一些有趣的功能。',
    type: 'mod',
    status: 'approved',
    downloads: 1250,
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: '精美材质包',
    description: '高清材质包，提升游戏画质。',
    type: 'resourcepack',
    status: 'pending',
    downloads: 0,
    createdAt: '2024-01-12',
  },
])

// 方法
const getTypeBackground = (type: string) => {
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

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    approved: 'bg-green-500/10 text-green-500',
    pending: 'bg-yellow-500/10 text-yellow-500',
    rejected: 'bg-red-500/10 text-red-500',
  }
  return classes[status] || 'bg-gray-500/10 text-gray-500'
}

const getStatusName = (status: string) => {
  const names: Record<string, string> = {
    approved: '已通过',
    pending: '审核中',
    rejected: '已拒绝',
  }
  return names[status] || status
}
</script>
