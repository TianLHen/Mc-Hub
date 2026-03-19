<template>
  <div class="min-h-screen flex items-center justify-center" :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
    <div class="text-center">
      <div class="text-9xl font-bold mb-4" :class="isDark ? 'text-dark-800' : 'text-gray-200'">
        404
      </div>
      <h1 
        class="text-3xl font-bold mb-4"
        :class="isDark ? 'text-white' : 'text-gray-900'">
        页面未找到
      </h1>
      <p 
        class="text-lg mb-8 max-w-md mx-auto"
        :class="isDark ? 'text-gray-400' : 'text-gray-600'">
        抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页继续浏览。
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink 
          to="/"
          class="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
          返回首页
        </NuxtLink>
        <button 
          class="px-6 py-3 rounded-lg font-medium transition-colors"
          :class="isDark 
            ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          @click="goBack">
          返回上一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

const isDark = computed(() => themeStore.isDark)

const goBack = () => {
  router.back()
}
</script>
