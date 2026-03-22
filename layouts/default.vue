<template>
  <div class="min-h-screen flex flex-col" :class="isDark ? 'bg-dark-950' : 'bg-white'">
    <LayoutHeader />
    <main class="flex-1">
      <Transition name="page" mode="out-in">
        <slot />
      </Transition>
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
</script>

<style>
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
