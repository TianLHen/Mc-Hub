<template>
  <div 
    ref="elementRef"
    :class="[
      'animate-on-scroll',
      { 'visible': isVisible },
      animationClass
    ]"
    :style="{ transitionDelay: `${delay}ms` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
  threshold?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'fade',
  delay: 0,
  threshold: 0.1,
  once: true
})

const elementRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const animationClass = computed(() => {
  const classes: Record<string, string> = {
    'fade': 'scroll-fade',
    'slide-up': 'scroll-slide-up',
    'slide-down': 'scroll-slide-down',
    'slide-left': 'scroll-slide-left',
    'slide-right': 'scroll-slide-right',
    'scale': 'scroll-scale'
  }
  return classes[props.animation] || 'scroll-fade'
})

onMounted(() => {
  if (!elementRef.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer) {
            observer.unobserve(entry.target)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '0px 0px -50px 0px'
    }
  )
  
  observer.observe(elementRef.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-fade {
  opacity: 0;
}

.scroll-fade.visible {
  opacity: 1;
}

.scroll-slide-up {
  transform: translateY(30px);
}

.scroll-slide-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-slide-down {
  transform: translateY(-30px);
}

.scroll-slide-down.visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-slide-left {
  transform: translateX(30px);
}

.scroll-slide-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-slide-right {
  transform: translateX(-30px);
}

.scroll-slide-right.visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-scale {
  transform: scale(0.9);
}

.scroll-scale.visible {
  opacity: 1;
  transform: scale(1);
}
</style>
