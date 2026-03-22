// 交叉观察器组合式函数（用于懒加载）
import { ref, onMounted, onUnmounted, Ref } from 'vue'

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) {
  const isIntersecting = ref(false)
  const intersectionRatio = ref(0)
  let observer: IntersectionObserver | null = null

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]
    isIntersecting.value = entry.isIntersecting
    intersectionRatio.value = entry.intersectionRatio
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      isIntersecting.value = true
      return
    }

    observer = new IntersectionObserver(handleIntersection, {
      threshold: options.threshold || 0,
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
    })

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    isIntersecting,
    intersectionRatio,
  }
}
