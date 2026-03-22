<template>
  <div class="loading-wrapper" :class="[sizeClass, { 'full-screen': fullScreen }]">
    <div class="loading-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  fullScreen: false
})

const sizeClass = computed(() => `loading-${props.size}`)
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.loading-wrapper.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 9999;
}

.loading-spinner {
  position: relative;
}

.loading-small .loading-spinner {
  width: 24px;
  height: 24px;
}

.loading-medium .loading-spinner {
  width: 40px;
  height: 40px;
}

.loading-large .loading-spinner {
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--primary-500);
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(1) {
  animation-delay: -0.45s;
}

.spinner-ring:nth-child(2) {
  animation-delay: -0.3s;
  border-top-color: var(--accent-500);
}

.spinner-ring:nth-child(3) {
  animation-delay: -0.15s;
  border-top-color: var(--primary-300);
}

.loading-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  animation: pulse 2s infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
