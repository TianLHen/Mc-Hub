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
            <div class="footer-logo">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
              MC Hub
            </span>
          </div>
          <p class="text-sm mb-6 leading-relaxed" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            面向中国玩家的现代化我的世界社区网站，提供资源下载、社区交流、服务器信息等一站式服务。
          </p>
          <div class="flex gap-3">
            <a v-for="social in socialLinks" :key="social.name" href="#" class="social-icon" :class="isDark ? 'text-gray-400 hover:text-white bg-dark-800 hover:bg-dark-700' : 'text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-100'">
              <span v-html="social.icon"></span>
            </a>
          </div>
        </div>
        
        <!-- 资源分类 -->
        <div>
          <h3 class="footer-title" :class="isDark ? 'text-white' : 'text-gray-900'">
            资源分类
          </h3>
          <ul class="space-y-3">
            <li v-for="item in resourceLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="footer-link"
                :class="isDark ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-500'">
                <span class="mr-2">{{ item.icon }}</span>
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- 社区 -->
        <div>
          <h3 class="footer-title" :class="isDark ? 'text-white' : 'text-gray-900'">
            社区
          </h3>
          <ul class="space-y-3">
            <li v-for="item in communityLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="footer-link"
                :class="isDark ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-500'">
                <span class="mr-2">{{ item.icon }}</span>
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- 关于 -->
        <div>
          <h3 class="footer-title" :class="isDark ? 'text-white' : 'text-gray-900'">
            关于
          </h3>
          <ul class="space-y-3">
            <li v-for="item in aboutLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="footer-link"
                :class="isDark ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-500'">
                <span class="mr-2">{{ item.icon }}</span>
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
          
          <!-- 统计信息 -->
          <div class="mt-6 p-4 rounded-lg" :class="isDark ? 'bg-dark-900' : 'bg-white'">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-lg font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">10万+</div>
                <div class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">资源总数</div>
              </div>
              <div>
                <div class="text-lg font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">9万</div>
                <div class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">注册用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部版权信息 -->
      <div class="mt-12 pt-8 border-t" :class="isDark ? 'border-dark-800' : 'border-gray-200'">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            &copy; {{ currentYear }} MC Hub. All rights reserved.
          </p>
          <div class="flex gap-6">
            <NuxtLink 
              to="/privacy"
              class="footer-bottom-link"
              :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">
              隐私政策
            </NuxtLink>
            <NuxtLink 
              to="/terms"
              class="footer-bottom-link"
              :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">
              服务条款
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="footer-bottom-link"
              :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'">
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

// 社交链接
const socialLinks = [
  { name: 'GitHub', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>' },
  { name: 'Discord', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>' },
  { name: 'QQ', icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm0 3h4v2h-4v-2zm0-6h4v2h-4V8z"/></svg>' },
]

// 链接数据
const resourceLinks = [
  { name: '模组', path: '/resources?type=mod', icon: '⚙️' },
  { name: '整合包', path: '/resources?type=modpack', icon: '📦' },
  { name: '材质包', path: '/resources?type=resourcepack', icon: '🎨' },
  { name: '光影', path: '/resources?type=shader', icon: '✨' },
  { name: '地图', path: '/resources?type=map', icon: '🗺️' },
  { name: '数据包', path: '/resources?type=datapack', icon: '📋' },
  { name: '版本库', path: '/versions', icon: '📚' },
]

const communityLinks = [
  { name: '服务器列表', path: '/servers', icon: '🎮' },
  { name: '新闻公告', path: '/news', icon: '📰' },
  { name: '论坛', path: '/forum', icon: '💬' },
  { name: 'Wiki', path: '/wiki', icon: '📖' },
  { name: '创作者入驻', path: '/creator', icon: '✍️' },
]

const aboutLinks = [
  { name: '关于我们', path: '/about', icon: 'ℹ️' },
  { name: '使用帮助', path: '/help', icon: '❓' },
  { name: '反馈建议', path: '/feedback', icon: '💡' },
  { name: '合作伙伴', path: '/partners', icon: '🤝' },
]
</script>

<style scoped>
/* Footer Logo */
.footer-logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(93, 156, 89, 0.3);
}

/* 社交图标 */
.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Footer标题 */
.footer-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Footer链接 */
.footer-link {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.footer-link:hover {
  transform: translateX(4px);
}

/* 底部链接 */
.footer-bottom-link {
  font-size: 0.875rem;
  transition: all 0.2s ease;
  position: relative;
}

.footer-bottom-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.2s ease;
}

.footer-bottom-link:hover::after {
  width: 100%;
}
</style>
