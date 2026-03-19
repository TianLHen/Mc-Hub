<template>
  <header class="sticky top-0 z-50 w-full border-b transition-colors duration-200"
    :class="[
      isDark 
        ? 'bg-dark-950/95 border-dark-800 backdrop-blur' 
        : 'bg-white/95 border-gray-200 backdrop-blur'
    ]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo和导航 -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
              MC Hub
            </span>
          </NuxtLink>
          
          <!-- 导航菜单 -->
          <nav class="hidden md:flex items-center gap-6">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="text-sm font-medium transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
        
        <!-- 搜索和操作 -->
        <div class="flex items-center gap-4">
          <!-- 搜索框 -->
          <div class="hidden sm:block relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索资源..."
              class="w-64 h-9 px-4 pr-10 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-900 border-dark-700 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              ]"
              @keyup.enter="handleSearch"
            />
            <button 
              class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-700"
              @click="handleSearch">
              <svg class="w-4 h-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <!-- 主题切换 -->
          <button
            class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
            @click="toggleTheme"
            :title="isDark ? '切换到浅色模式' : '切换到深色模式'">
            <svg v-if="isDark" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          
          <!-- 通知 -->
          <div class="relative">
            <button
              class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
              @click="showNotifications = !showNotifications">
              <svg class="w-5 h-5" :class="isDark ? 'text-gray-300' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span 
                v-if="notificationStore.hasUnread"
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <!-- 通知面板 -->
            <Transition name="slide">
              <div 
                v-if="showNotifications"
                class="absolute right-0 mt-2 z-50">
                <NotificationPanel />
              </div>
            </Transition>
          </div>
          
          <!-- 用户菜单 -->
          <div v-if="authStore.isLoggedIn" class="relative">
            <button
              class="flex items-center gap-2 p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
              @click="showUserMenu = !showUserMenu">
              <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ authStore.username.charAt(0) }}
                </span>
              </div>
              <span class="hidden sm:block text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ authStore.username }}
              </span>
              <svg class="w-4 h-4" :class="isDark ? 'text-gray-400' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- 用户下拉菜单 -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border animate-fade-in"
              :class="isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-gray-200'">
              <div class="py-1">
                <NuxtLink 
                  to="/user/profile"
                  class="block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  @click="showUserMenu = false">
                  个人中心
                </NuxtLink>
                <NuxtLink 
                  to="/user/uploads"
                  class="block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  @click="showUserMenu = false">
                  我的上传
                </NuxtLink>
                <NuxtLink 
                  to="/user/favorites"
                  class="block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  @click="showUserMenu = false">
                  我的收藏
                </NuxtLink>
                <NuxtLink 
                  to="/user/settings"
                  class="block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  @click="showUserMenu = false">
                  账号设置
                </NuxtLink>
                <hr class="my-1" :class="isDark ? 'border-dark-700' : 'border-gray-200'" />
                <button 
                  class="block w-full text-left px-4 py-2 text-sm text-red-500 transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
                  @click="handleLogout">
                  退出登录
                </button>
              </div>
            </div>
          </div>
          
          <!-- 登录/注册按钮 -->
          <div v-else class="flex items-center gap-2">
            <NuxtLink 
              to="/user/login"
              class="hidden sm:block px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'">
              登录
            </NuxtLink>
            <NuxtLink 
              to="/user/register"
              class="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg transition-colors hover:bg-primary-600">
              注册
            </NuxtLink>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-dark-800"
            @click="showMobileMenu = !showMobileMenu">
            <svg class="w-5 h-5" :class="isDark ? 'text-gray-300' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div 
        v-if="showMobileMenu"
        class="md:hidden py-4 border-t animate-slide-down"
        :class="isDark ? 'border-dark-800' : 'border-gray-200'">
        <nav class="flex flex-col gap-2">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'"
            @click="showMobileMenu = false">
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <!-- 移动端搜索 -->
        <div class="mt-4 px-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索资源..."
            class="w-full h-10 px-4 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            :class="[
              isDark 
                ? 'bg-dark-900 border-dark-700 text-white placeholder-gray-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            ]"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notifications'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

// 状态
const searchQuery = ref('')
const showUserMenu = ref(false)
const showNotifications = ref(false)
const showMobileMenu = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 导航项
const navItems = [
  { name: '首页', path: '/' },
  { name: '模组', path: '/resources?type=mod' },
  { name: '整合包', path: '/resources?type=modpack' },
  { name: '材质包', path: '/resources?type=resourcepack' },
  { name: '光影', path: '/resources?type=shader' },
  { name: '版本库', path: '/versions' },
  { name: '服务器', path: '/servers' },
]

// 方法
const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/resources?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    showMobileMenu.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  showUserMenu.value = false
  router.push('/')
}

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
    showNotifications.value = false
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  themeStore.initTheme()
  authStore.initAuth()
  notificationStore.fetchNotifications()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
