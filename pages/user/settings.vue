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
            账号设置
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
              账号设置
            </h1>
            
            <form @submit.prevent="handleSave">
              <!-- 头像 -->
              <div class="mb-6">
                <label 
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  头像
                </label>
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center">
                    <span class="text-2xl text-white font-bold">
                      {{ authStore.username.charAt(0) }}
                    </span>
                  </div>
                  <button 
                    type="button"
                    class="px-4 py-2 text-sm rounded-lg border transition-colors"
                    :class="isDark 
                      ? 'border-dark-700 text-gray-300 hover:bg-dark-800' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'">
                    更换头像
                  </button>
                </div>
              </div>
              
              <!-- 用户名 -->
              <div class="mb-4">
                <label 
                  for="edit-username"
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  用户名
                </label>
                <input
                  id="edit-username"
                  v-model="editUsername"
                  type="text"
                  class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="[
                    isDark 
                      ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  ]"
                />
              </div>
              
              <!-- 邮箱 -->
              <div class="mb-4">
                <label 
                  for="edit-email"
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  邮箱
                </label>
                <input
                  id="edit-email"
                  v-model="editEmail"
                  type="email"
                  class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="[
                    isDark 
                      ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  ]"
                />
              </div>
              
              <!-- 个人简介 -->
              <div class="mb-6">
                <label 
                  for="edit-bio"
                  class="block text-sm font-medium mb-2"
                  :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                  个人简介
                </label>
                <textarea
                  id="edit-bio"
                  v-model="editBio"
                  rows="3"
                  placeholder="介绍一下自己..."
                  class="w-full p-3 rounded-lg border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="[
                    isDark 
                      ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  ]"></textarea>
              </div>
              
              <!-- 保存按钮 -->
              <button
                type="submit"
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
                保存更改
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'
import { ElMessage } from 'element-plus'
import UserSidebar from '~/components/user/UserSidebar.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

// 状态
const editUsername = ref(authStore.username)
const editEmail = ref(authStore.user?.email || '')
const editBio = ref(authStore.user?.bio || '')

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 方法
const handleSave = () => {
  authStore.updateUser({
    username: editUsername.value,
    email: editEmail.value,
    bio: editBio.value,
  })
  ElMessage.success('保存成功！')
}

// 监听用户信息变化
watch(() => authStore.user, (user) => {
  if (user) {
    editUsername.value = user.username
    editEmail.value = user.email
    editBio.value = user.bio || ''
  }
}, { immediate: true })
</script>
