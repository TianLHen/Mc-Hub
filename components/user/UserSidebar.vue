<template>
  <div>
    <!-- 用户信息卡片 -->
    <div 
      class="rounded-card p-6 mb-6"
      :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center">
          <span class="text-3xl text-white font-bold">
            {{ authStore.username.charAt(0) }}
          </span>
        </div>
        <h2 
          class="text-xl font-bold mb-1"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          {{ authStore.username }}
        </h2>
        <p 
          class="text-sm mb-4"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ authStore.user?.bio || '这个人很懒，什么都没写~' }}
        </p>
        <div class="flex justify-center gap-4 text-sm">
          <div class="text-center">
            <div 
              class="font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              {{ authStore.user?.level || 1 }}
            </div>
            <div :class="isDark ? 'text-gray-500' : 'text-gray-500'">
              等级
            </div>
          </div>
          <div class="text-center">
            <div 
              class="font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              {{ authStore.user?.points || 0 }}
            </div>
            <div :class="isDark ? 'text-gray-500' : 'text-gray-500'">
              积分
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 导航菜单 -->
    <div 
      class="rounded-card overflow-hidden"
      :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
      <nav class="divide-y" :class="isDark ? 'divide-dark-800' : 'divide-gray-100'">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 transition-colors"
          :class="[
            isActive(item.path)
              ? 'bg-primary-500/10 text-primary-500'
              : isDark 
                ? 'text-gray-300 hover:bg-dark-800' 
                : 'text-gray-700 hover:bg-gray-50'
          ]">
          <span class="text-lg">{{ item.icon }}</span>
          <span class="font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const themeStore = useThemeStore()
const authStore = useAuthStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 菜单项
const menuItems = [
  { name: '个人资料', path: '/user/profile', icon: '👤' },
  { name: '账号设置', path: '/user/settings', icon: '⚙️' },
  { name: '我的上传', path: '/user/uploads', icon: '📦' },
  { name: '我的收藏', path: '/user/favorites', icon: '⭐' },
  { name: '下载记录', path: '/user/downloads', icon: '📥' },
]

// 方法
const isActive = (path: string) => {
  return route.path === path
}
</script>
