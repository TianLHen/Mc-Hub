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
          登录账号
        </h2>
        <p 
          class="mt-2 text-sm"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          欢迎回来！请登录您的账号
        </p>
      </div>
      
      <!-- 登录表单 -->
      <div 
        class="rounded-card p-8"
        :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
        <form @submit.prevent="handleLogin">
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
          </div>
          
          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span 
                class="text-sm"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                记住我
              </span>
            </label>
            <a 
              href="#"
              class="text-sm text-primary-500 hover:text-primary-600 transition-colors">
              忘记密码？
            </a>
          </div>
          
          <!-- 错误提示 -->
          <div 
            v-if="error"
            class="mb-4 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
            {{ error }}
          </div>
          
          <!-- 登录按钮 -->
          <button
            type="submit"
            class="w-full py-3 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading">
            <span v-if="isLoading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </form>
        
        <!-- 分隔线 -->
        <div class="relative my-6">
          <div 
            class="absolute inset-0 flex items-center"
            :class="isDark ? 'border-dark-700' : 'border-gray-200'">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span 
              class="px-2"
              :class="isDark ? 'bg-dark-900 text-gray-400' : 'bg-white text-gray-500'">
              或者使用以下方式登录
            </span>
          </div>
        </div>
        
        <!-- 第三方登录 -->
        <div class="grid grid-cols-3 gap-3">
          <button 
            type="button"
            class="flex items-center justify-center h-10 rounded-lg border transition-colors"
            :class="isDark 
              ? 'border-dark-700 hover:bg-dark-800' 
              : 'border-gray-200 hover:bg-gray-50'">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
              <path d="M23.96 14.725c0-3.39-3.266-6.165-7.313-6.165-4.048 0-7.314 2.775-7.314 6.165 0 3.39 3.266 6.165 7.314 6.165.86 0 1.69-.127 2.47-.362a.675.675 0 01.56.076l1.5.878a.258.258 0 00.132.043.232.232 0 00.23-.233c0-.057-.023-.113-.038-.168l-.307-1.167a.465.465 0 01.168-.525c1.44-1.05 2.602-2.67 2.602-4.677zm-9.854-1.77a.957.957 0 01-.95-.962.957.957 0 01.95-.962.957.957 0 01.95.962.957.957 0 01-.95.962zm4.854 0a.957.957 0 01-.95-.962.957.957 0 01.95-.962.957.957 0 01.95.962.957.957 0 01-.95.962z"/>
            </svg>
          </button>
          <button 
            type="button"
            class="flex items-center justify-center h-10 rounded-lg border transition-colors"
            :class="isDark 
              ? 'border-dark-700 hover:bg-dark-800' 
              : 'border-gray-200 hover:bg-gray-50'">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          <button 
            type="button"
            class="flex items-center justify-center h-10 rounded-lg border transition-colors"
            :class="isDark 
              ? 'border-dark-700 hover:bg-dark-800' 
              : 'border-gray-200 hover:bg-gray-50'">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 注册链接 -->
      <p 
        class="mt-6 text-center text-sm"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        还没有账号？
        <NuxtLink 
          to="/user/register"
          class="text-primary-500 hover:text-primary-600 font-medium transition-colors">
          立即注册
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

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()

// 状态
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const isLoading = computed(() => authStore.isLoading)
const error = computed(() => authStore.error)

// 方法
const handleLogin = async () => {
  authStore.clearError()
  const success = await authStore.login({
    email: email.value,
    password: password.value,
  })
  
  if (success) {
    router.push('/')
  }
}
</script>
