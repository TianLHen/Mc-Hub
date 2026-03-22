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
            我的收藏
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
              我的收藏
            </h1>
            
            <!-- 收藏列表 -->
            <div v-if="favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResourceCard 
                v-for="resource in favorites" 
                :key="resource.id"
                :resource="resource" />
            </div>
            
            <!-- 空状态 -->
            <div v-else class="text-center py-12">
              <div class="text-6xl mb-4">⭐</div>
              <h3 
                class="text-xl font-semibold mb-2"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                暂无收藏
              </h3>
              <p 
                class="text-sm mb-6"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                你还没有收藏任何资源
              </p>
              <NuxtLink 
                to="/resources"
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
                浏览资源
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
import type { Resource, ResourceType } from '~/types'
import ResourceCard from '~/components/resource/ResourceCard.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟收藏数据
const favorites = ref<Resource[]>([
  {
    id: '1',
    name: 'OptiFine',
    slug: 'optifine',
    description: 'OptiFine是一个Minecraft优化模组，支持高清纹理和各种配置选项。',
    type: 'mod' as ResourceType,
    author: {
      id: '1',
      username: 'sp614x',
      email: 'sp614x@example.com',
      level: 10,
      points: 5000,
      createdAt: '2020-01-01',
      updatedAt: '2024-01-01',
    },
    thumbnail: '/images/optifine.png',
    screenshots: [],
    downloads: 5000000,
    rating: 4.8,
    ratingCount: 12500,
    versions: [],
    tags: ['优化', '光影', '高清'],
    dependencies: [],
    createdAt: '2020-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '7',
    name: 'Create（机械动力）',
    slug: 'create',
    description: 'Create是一个专注于机械和自动化的模组，提供丰富的机械元件和动力系统。',
    type: 'mod' as ResourceType,
    author: {
      id: '7',
      username: 'simibubi',
      email: 'simibubi@example.com',
      level: 9,
      points: 4500,
      createdAt: '2020-01-01',
      updatedAt: '2024-01-01',
    },
    thumbnail: '/images/create.png',
    screenshots: [],
    downloads: 3200000,
    rating: 4.9,
    ratingCount: 9800,
    versions: [],
    tags: ['机械', '自动化', '科技'],
    dependencies: [],
    createdAt: '2020-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '5',
    name: 'BSL Shaders',
    slug: 'bsl-shaders',
    description: 'BSL光影是一个明亮、清晰的光影包，提供优秀的视觉效果。',
    type: 'shader' as ResourceType,
    author: {
      id: '5',
      username: 'Capt Tatsu',
      email: 'capttatsu@example.com',
      level: 9,
      points: 4000,
      createdAt: '2018-01-01',
      updatedAt: '2024-01-01',
    },
    thumbnail: '/images/bsl-shaders.png',
    screenshots: [],
    downloads: 3500000,
    rating: 4.8,
    ratingCount: 8500,
    versions: [],
    tags: ['光影', '画质', '真实'],
    dependencies: [],
    createdAt: '2018-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '16',
    name: 'All the Mods 9',
    slug: 'all-the-mods-9',
    description: 'All the Mods 9是一个综合型整合包，包含大量科技、魔法和冒险模组。',
    type: 'modpack' as ResourceType,
    author: {
      id: '16',
      username: 'ATM Team',
      email: 'atm@example.com',
      level: 9,
      points: 4000,
      createdAt: '2023-01-01',
      updatedAt: '2024-01-01',
    },
    thumbnail: '/images/atm9.png',
    screenshots: [],
    downloads: 2500000,
    rating: 4.8,
    ratingCount: 6800,
    versions: [],
    tags: ['整合包', '科技', '魔法'],
    dependencies: [],
    createdAt: '2023-01-01',
    updatedAt: '2024-01-01',
  },
])
</script>
