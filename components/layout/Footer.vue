<template>
  <footer class="border-t transition-colors duration-200"
    :class="[
      isDark 
        ? 'bg-dark-950 border-dark-800' 
        : 'bg-gray-50 border-gray-200'
    ]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
              MC Hub
            </span>
          </div>
          <p class="text-sm mb-4" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            面向中国玩家的现代化我的世界社区网站，提供资源下载、社区交流、服务器信息等一站式服务。
          </p>
          <div class="flex gap-4">
            <a href="#" class="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-dark-800"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="#" class="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-dark-800"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="#" class="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-dark-800"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 资源分类 -->
        <div>
          <h3 class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">
            资源分类
          </h3>
          <ul class="space-y-2">
            <li v-for="item in resourceLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="text-sm transition-colors hover:text-primary-500"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- 社区 -->
        <div>
          <h3 class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">
            社区
          </h3>
          <ul class="space-y-2">
            <li v-for="item in communityLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="text-sm transition-colors hover:text-primary-500"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- 关于 -->
        <div>
          <h3 class="text-sm font-semibold mb-4" :class="isDark ? 'text-white' : 'text-gray-900'">
            关于
          </h3>
          <ul class="space-y-2">
            <li v-for="item in aboutLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="text-sm transition-colors hover:text-primary-500"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 底部版权信息 -->
      <div class="mt-12 pt-8 border-t" :class="isDark ? 'border-dark-800' : 'border-gray-200'">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            &copy; {{ currentYear }} MC Hub. All rights reserved.
          </p>
          <div class="flex gap-4">
            <NuxtLink 
              to="/privacy"
              class="text-sm transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              隐私政策
            </NuxtLink>
            <NuxtLink 
              to="/terms"
              class="text-sm transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              服务条款
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="text-sm transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              联系我们
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)
const currentYear = computed(() => new Date().getFullYear())

// 链接数据
const resourceLinks = [
  { name: '模组', path: '/resources?type=mod' },
  { name: '整合包', path: '/resources?type=modpack' },
  { name: '材质包', path: '/resources?type=resourcepack' },
  { name: '光影', path: '/resources?type=shader' },
  { name: '地图', path: '/resources?type=map' },
  { name: '数据包', path: '/resources?type=datapack' },
  { name: '版本库', path: '/versions' },
]

const communityLinks = [
  { name: '服务器列表', path: '/servers' },
  { name: '新闻公告', path: '/news' },
  { name: '论坛', path: '/forum' },
  { name: 'Wiki', path: '/wiki' },
  { name: '创作者入驻', path: '/creator' },
]

const aboutLinks = [
  { name: '关于我们', path: '/about' },
  { name: '使用帮助', path: '/help' },
  { name: '反馈建议', path: '/feedback' },
  { name: '合作伙伴', path: '/partners' },
]
</script>
