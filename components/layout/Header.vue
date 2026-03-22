<template>
  <header class="sticky top-0 z-50 w-full border-b transition-all duration-300"
    :class="[
      isDark 
        ? 'bg-dark-950/95 border-dark-800 backdrop-blur-md' 
        : 'bg-white/95 border-gray-200 backdrop-blur-md'
    ]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo和导航 -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="logo-icon">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold group-hover:text-primary-500 transition-colors" :class="isDark ? 'text-white' : 'text-gray-900'">
              MC Hub
            </span>
          </NuxtLink>
          
          <!-- 导航菜单 -->
          <nav class="hidden md:flex items-center gap-1">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="nav-item"
              :class="[
                isActive(item.path) 
                  ? 'active' 
                  : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              ]">
              <span v-if="item.icon" class="mr-1.5">{{ item.icon }}</span>
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
        
        <!-- 搜索和操作 -->
        <div class="flex items-center gap-3">
          <!-- 搜索框 -->
          <div class="hidden sm:block relative">
            <div class="search-wrapper">
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索资源..."
                class="search-input"
                :class="[
                  isDark 
                    ? 'bg-dark-900 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                ]"
                @keyup.enter="handleSearch"
                @focus="showSearchPanel = true"
                @blur="hideSearchPanel"
              />
              <kbd class="search-shortcut">/</kbd>
            </div>
            
            <!-- 搜索面板 -->
            <Transition name="fade">
              <div 
                v-if="showSearchPanel && searchQuery"
                class="search-panel"
                :class="isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-gray-200'">
                <div class="p-3 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  按 Enter 搜索 "{{ searchQuery }}"
                </div>
              </div>
            </Transition>
          </div>
          
          <!-- 主题切换 -->
          <button
            class="icon-btn"
            @click="toggleTheme"
            :title="isDark ? '切换到浅色模式' : '切换到深色模式'">
            <Transition name="scale" mode="out-in">
              <svg v-if="isDark" key="sun" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else key="moon" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </Transition>
          </button>
          
          <!-- 通知 -->
          <div class="relative">
            <button
              class="icon-btn relative"
              @click="showNotifications = !showNotifications">
              <svg class="w-5 h-5" :class="isDark ? 'text-gray-300' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span 
                v-if="notificationStore.hasUnread"
                class="notification-badge"></span>
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
              class="user-btn"
              @click="showUserMenu = !showUserMenu">
              <div class="user-avatar">
                <span class="text-white text-sm font-medium">
                  {{ authStore.username.charAt(0) }}
                </span>
              </div>
              <span class="hidden sm:block text-sm font-medium" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ authStore.username }}
              </span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="[showUserMenu ? 'rotate-180' : '', isDark ? 'text-gray-400' : 'text-gray-500']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- 用户下拉菜单 -->
            <Transition name="fade">
              <div 
                v-if="showUserMenu"
                class="user-dropdown"
                :class="isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-gray-200'">
                <div class="py-1">
                  <NuxtLink 
                    to="/user/profile"
                    class="dropdown-item"
                    :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'"
                    @click="showUserMenu = false">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    个人中心
                  </NuxtLink>
                  <NuxtLink 
                    to="/user/uploads"
                    class="dropdown-item"
                    :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'"
                    @click="showUserMenu = false">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    我的上传
                  </NuxtLink>
                  <NuxtLink 
                    to="/user/favorites"
                    class="dropdown-item"
                    :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'"
                    @click="showUserMenu = false">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    我的收藏
                  </NuxtLink>
                  <NuxtLink 
                    to="/user/settings"
                    class="dropdown-item"
                    :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'"
                    @click="showUserMenu = false">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    账号设置
                  </NuxtLink>
                  <hr class="my-1" :class="isDark ? 'border-dark-700' : 'border-gray-200'" />
                  <button 
                    class="dropdown-item text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    @click="handleLogout">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    退出登录
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          
          <!-- 登录/注册按钮 -->
          <div v-else class="flex items-center gap-2">
            <NuxtLink 
              to="/user/login"
              class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              登录
            </NuxtLink>
            <NuxtLink 
              to="/user/register"
              class="register-btn">
              注册
            </NuxtLink>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button
            class="md:hidden icon-btn"
            @click="showMobileMenu = !showMobileMenu">
            <Transition name="fade" mode="out-in">
              <svg v-if="!showMobileMenu" key="menu" class="w-5 h-5" :class="isDark ? 'text-gray-300' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else key="close" class="w-5 h-5" :class="isDark ? 'text-gray-300' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Transition>
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <Transition name="slide-down">
        <div 
          v-if="showMobileMenu"
          class="md:hidden py-4 border-t"
          :class="isDark ? 'border-dark-800' : 'border-gray-200'">
          <nav class="flex flex-col gap-1">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="mobile-nav-item"
              :class="[
                isActive(item.path) 
                  ? 'active' 
                  : isDark ? 'text-gray-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'
              ]"
              @click="showMobileMenu = false">
              <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
              {{ item.name }}
            </NuxtLink>
          </nav>
          
          <!-- 移动端搜索 -->
          <div class="mt-4 px-4">
            <div class="search-wrapper">
              <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索资源..."
                class="search-input"
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
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notifications'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

// 状态
const searchQuery = ref('')
const showUserMenu = ref(false)
const showNotifications = ref(false)
const showMobileMenu = ref(false)
const showSearchPanel = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 导航项
const navItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '模组', path: '/resources?type=mod', icon: '⚙️' },
  { name: '整合包', path: '/resources?type=modpack', icon: '📦' },
  { name: '材质包', path: '/resources?type=resourcepack', icon: '🎨' },
  { name: '光影', path: '/resources?type=shader', icon: '✨' },
  { name: '版本库', path: '/versions', icon: '📚' },
  { name: '服务器', path: '/servers', icon: '🎮' },
]

// 判断当前激活的导航
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  const pathBase = path.split('?')[0]
  const query = new URLSearchParams(path.split('?')[1])
  const typeParam = query.get('type')
  
  if (route.path === pathBase && typeParam && route.query.type === typeParam) {
    return true
  }
  if (!typeParam && route.path === pathBase && !route.query.type) {
    return true
  }
  return false
}

// 方法
const toggleTheme = () => {
  themeStore.toggleTheme()
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/resources?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    showMobileMenu.value = false
    showSearchPanel.value = false
  }
}

const hideSearchPanel = () => {
  setTimeout(() => {
    showSearchPanel.value = false
  }, 200)
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

<style scoped>
/* Logo */
.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(93, 156, 89, 0.3);
}

.logo-icon:hover {
  transform: scale(1.05);
}

/* 导航项 */
.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  position: relative;
}

.nav-item.active {
  color: var(--primary-500);
  background: rgba(93, 156, 89, 0.1);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--primary-500);
  border-radius: var(--radius-full);
}

/* 搜索框 */
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 260px;
  height: 36px;
  padding: 0 40px 0 36px;
  font-size: 0.875rem;
  border-radius: var(--radius-lg);
  border: 1px solid;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(93, 156, 89, 0.15);
  width: 300px;
}

.search-shortcut {
  position: absolute;
  right: 10px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: monospace;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

/* 搜索面板 */
.search-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  border-radius: var(--radius-lg);
  border: 1px solid;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 图标按钮 */
.icon-btn {
  padding: 8px;
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: var(--bg-secondary);
}

/* 通知徽章 */
.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 用户按钮 */
.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.user-btn:hover {
  background: var(--bg-secondary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 用户下拉菜单 */
.user-dropdown {
  position: absolute;
  right: 0;
  margin-top: 8px;
  width: 200px;
  border-radius: var(--radius-lg);
  border: 1px solid;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 0.875rem;
  transition: all 0.15s ease;
}

/* 注册按钮 */
.register-btn {
  padding: 8px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(93, 156, 89, 0.3);
}

.register-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(93, 156, 89, 0.4);
}

/* 移动端导航 */
.mobile-nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  margin: 0 8px;
  transition: all 0.2s ease;
}

.mobile-nav-item.active {
  color: var(--primary-500);
  background: rgba(93, 156, 89, 0.1);
}

/* 过渡动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
