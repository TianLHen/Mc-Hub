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
import type { Resource } from '~/types'
import ResourceCard from '~/components/resource/ResourceCard.vue'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟收藏数据
const favorites = ref<Resource[]>([])
</script>
