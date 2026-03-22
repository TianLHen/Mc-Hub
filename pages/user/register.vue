<template>
  <div 
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">M</span>
          </div>
          <span class="text-2xl font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">
            MC Hub
          </span>
        </NuxtLink>
        <h2 
          class="mt-6 text-3xl font-bold"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          创建账号
        </h2>
        <p 
          class="mt-2 text-sm"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          加入MC Hub，开始探索精彩的Minecraft世界
        </p>
      </div>
      
      <!-- 注册表单 -->
      <div 
        class="rounded-card p-8"
        :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
        <form @submit.prevent="handleRegister">
          <!-- 用户名 -->
          <div class="mb-4">
            <label 
              for="username"
              class="block text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              用户名
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              placeholder="请输入用户名"
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
              for="email"
              class="block text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              邮箱
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="请输入邮箱"
              class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              ]"
            />
          </div>
          
          <!-- 密码 -->
          <div class="mb-4">
            <label 
              for="password"
              class="block text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="请输入密码"
                class="w-full h-10 px-4 pr-10 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="[
                  isDark 
                    ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                ]"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                @click="showPassword = !showPassword">
                <svg 
                  v-if="showPassword"
                  class="w-5 h-5" 
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg 
                  v-else
                  class="w-5 h-5" 
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <!-- 密码强度 -->
            <div v-if="password" class="mt-2">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1 rounded-full bg-gray-200 dark:bg-dark-700">
                  <div 
                    class="h-full rounded-full transition-all duration-300"
                    :class="passwordStrength.color === 'red' ? 'bg-red-500' : passwordStrength.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'"
                    :style="{ width: `${(passwordStrength.score / 6) * 100}%` }"></div>
                </div>
                <span 
                  class="text-xs"
                  :class="passwordStrength.color === 'red' ? 'text-red-500' : passwordStrength.color === 'yellow' ? 'text-yellow-500' : 'text-green-500'">
                  {{ passwordStrength.label }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- 确认密码 -->
          <div class="mb-4">
            <label 
              for="confirmPassword"
              class="block text-sm font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              确认密码
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              placeholder="请再次输入密码"
              class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              ]"
            />
            <p 
              v-if="confirmPassword && password !== confirmPassword"
              class="mt-1 text-xs text-red-500">
              两次输入的密码不一致
            </p>
          </div>
          
          <!-- 服务条款 -->
          <div class="mb-6">
            <label class="flex items-start gap-2 cursor-pointer">
              <input
                v-model="agreeTerms"
                type="checkbox"
                class="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span 
                class="text-sm"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                我已阅读并同意
                <a href="/terms" class="text-primary-500 hover:text-primary-600">服务条款</a>
                和
                <a href="/privacy" class="text-primary-500 hover:text-primary-600">隐私政策</a>
              </span>
            </label>
          </div>
          
          <!-- 错误提示 -->
          <div 
            v-if="error"
            class="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {{ error }}
          </div>
          
          <!-- 注册按钮 -->
          <button
            type="submit"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !agreeTerms || password !== confirmPassword">
            <span v-if="isLoading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </form>
      </div>
      
      <!-- 登录链接 -->
      <p 
        class="mt-6 text-center text-sm"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        已有账号？
        <NuxtLink 
          to="/user/login"
          class="text-primary-500 hover:text-primary-600 font-medium transition-colors">
          立即登录
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'
import { getPasswordStrength } from '~/utils'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()

// 状态
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const agreeTerms = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const isLoading = computed(() => authStore.isLoading)
const error = computed(() => authStore.error)
const passwordStrength = computed(() => getPasswordStrength(password.value))

// 方法
const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    return
  }
  
  if (!agreeTerms.value) {
    return
  }
  
  authStore.clearError()
  const success = await authStore.register(email.value, password.value, username.value)
  
  if (success) {
    router.push('/')
  }
}
</script>
