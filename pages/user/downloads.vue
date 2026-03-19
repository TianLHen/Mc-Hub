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
            下载记录
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
            <h1 
              class="text-2xl font-bold mb-6"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              下载记录
            </h1>
            
            <!-- 下载列表 -->
            <div v-if="downloads.length > 0" class="space-y-4">
              <div 
                v-for="download in downloads" 
                :key="download.id"
                class="p-4 rounded-lg border transition-colors"
                :class="isDark 
                  ? 'border-dark-700 hover:bg-dark-800' 
                  : 'border-gray-200 hover:bg-gray-50'">
                <div class="flex items-center gap-4">
                  <div 
                    class="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    :class="getTypeBackground(download.type)">
                    {{ getResourceTypeIcon(download.type) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h3 
                        class="font-semibold"
                        :class="isDark ? 'text-white' : 'text-gray-900'">
                        {{ download.name }}
                      </h3>
                      <span 
                        class="text-xs"
                        :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                        v{{ download.version }}
                      </span>
                    </div>
                    <div class="flex items-center gap-4 text-xs mt-1" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                      <span>{{ formatDate(download.downloadedAt) }}</span>
                      <span>{{ formatFileSize(download.fileSize) }}</span>
                    </div>
                  </div>
                  <button 
                    class="px-3 py-1 text-sm rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600">
                    重新下载
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">📥</div>
              <h3 
                class="text-xl font-semibold mb-2"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                暂无下载记录
              </h3>
              <p 
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                你下载的资源会显示在这里
              </p>
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
import { formatDate, formatFileSize, getResourceTypeIcon } from '~/utils'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟下载数据
const downloads = ref([
  {
    id: '1',
    name: 'OptiFine',
    type: 'mod',
    version: 'HD U I6',
    fileSize: 5242880,
    downloadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'BSL Shaders',
    type: 'shader',
    version: '8.2.09',
    fileSize: 10485760,
    downloadedAt: '2024-01-14T15:20:00Z',
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
</script>
