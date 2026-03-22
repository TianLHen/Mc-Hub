<template>
  <div 
    ref="containerRef"
    class="lazy-image-container"
    :class="{ 'loaded': isLoaded }">
    <!-- 骨架屏 -->
    <div 
      v-if="!isLoaded" 
      class="lazy-image-placeholder skeleton"
      :style="{ aspectRatio: aspectRatio }">
      <div class="lazy-image-icon">🖼️</div>
    </div>
    
    <!-- 实际图片 -->
    <img
      v-show="isLoaded"
      ref="imageRef"
      :src="src"
      :alt="alt"
      :class="['lazy-image', imageClass]"
      @load="onLoad"
      @error="onError"
    />
    
    <!-- 错误状态 -->
    <div 
      v-if="hasError" 
      class="lazy-image-error">
      <div class="error-icon">❌</div>
      <div class="error-text">加载失败</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt?: string
  aspectRatio?: string
  imageClass?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  aspectRatio: '16/9',
  imageClass: '',
  threshold: 0.1
})

const containerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const isLoaded = ref(false)
const hasError = ref(false)
const shouldLoad = ref(false)

let observer: IntersectionObserver | null = null

const onLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const onError = () => {
  hasError.value = true
  isLoaded.value = false
}

onMounted(() => {
  if (!containerRef.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          if (observer) {
            observer.unobserve(entry.target)
          }
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '50px'
    }
  )
  
  observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background: var(--bg-tertiary);
  border-radius: inherit;
}

.lazy-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
}

.lazy-image-icon {
  font-size: 2rem;
  opacity: 0.5;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.lazy-image-container.loaded .lazy-image {
  opacity: 1;
}

.lazy-image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.error-text {
  font-size: 0.875rem;
}
</style>
