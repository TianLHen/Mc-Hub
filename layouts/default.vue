<template>
  <div class="min-h-screen flex flex-col" :class="isDark ? 'bg-dark-950' : 'bg-white'">
    <Header />
    <main class="flex-1">
      <Transition name="page" mode="out-in">
        <slot />
      </Transition>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '~/stores/theme'
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

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
