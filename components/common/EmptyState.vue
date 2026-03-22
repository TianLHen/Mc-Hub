<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon }}</div>
    <h3 class="empty-title">{{ title }}</h3>
    <p v-if="description" class="empty-description">{{ description }}</p>
    <slot name="action">
      <button 
        v-if="actionText"
        class="empty-action btn-hover"
        @click="$emit('action')">
        {{ actionText }}
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  icon: '📭'
})

defineEmits<{
  (e: 'action'): void
}>()
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.empty-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 400px;
}

.empty-action {
  padding: 10px 24px;
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action:hover {
  background: var(--primary-600);
  transform: translateY(-2px);
}
</style>
