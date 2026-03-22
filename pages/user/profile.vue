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
            个人资料
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
              个人资料
            </h1>
            
            <!-- 基本信息 -->
            <div class="mb-8">
              <h2 
                class="text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                基本信息
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    class="block text-sm font-medium mb-2"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    用户名
                  </label>
                  <p 
                    class="text-lg"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ authStore.username }}
                  </p>
                </div>
                <div>
                  <label 
                    class="block text-sm font-medium mb-2"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    邮箱
                  </label>
                  <p 
                    class="text-lg"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ authStore.user?.email || '未设置' }}
                  </p>
                </div>
                <div>
                  <label 
                    class="block text-sm font-medium mb-2"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    等级
                  </label>
                  <p 
                    class="text-lg"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    Lv.{{ authStore.user?.level || 1 }}
                  </p>
                </div>
                <div>
                  <label 
                    class="block text-sm font-medium mb-2"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    积分
                  </label>
                  <p 
                    class="text-lg"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ authStore.user?.points || 0 }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- 个人简介 -->
            <div class="mb-8">
              <h2 
                class="text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                个人简介
              </h2>
              <p 
                class="text-base leading-relaxed"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                {{ authStore.user?.bio || '这个人很懒，什么都没写~' }}
              </p>
            </div>
            
            <!-- 账号统计 -->
            <div>
              <h2 
                class="text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                账号统计
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                  class="p-4 rounded-lg text-center"
                  :class="isDark ? 'bg-dark-800' : 'bg-gray-50'">
                  <div 
                    class="text-2xl font-bold"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    0
                  </div>
                  <div 
                    class="text-sm"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    上传资源
                  </div>
                </div>
                <div 
                  class="p-4 rounded-lg text-center"
                  :class="isDark ? 'bg-dark-800' : 'bg-gray-50'">
                  <div 
                    class="text-2xl font-bold"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    0
                  </div>
                  <div 
                    class="text-sm"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    收藏资源
                  </div>
                </div>
                <div 
                  class="p-4 rounded-lg text-center"
                  :class="isDark ? 'bg-dark-800' : 'bg-gray-50'">
                  <div 
                    class="text-2xl font-bold"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    2
                  </div>
                  <div 
                    class="text-sm"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    下载资源
                  </div>
                </div>
                <div 
                  class="p-4 rounded-lg text-center"
                  :class="isDark ? 'bg-dark-800' : 'bg-gray-50'">
                  <div 
                    class="text-2xl font-bold"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    5
                  </div>
                  <div 
                    class="text-sm"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                    发表评论
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 编辑按钮 -->
            <div class="mt-8 pt-6 border-t" :class="isDark ? 'border-dark-800' : 'border-gray-200'">
              <NuxtLink 
                to="/user/settings"
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
                编辑资料
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)
</script>
