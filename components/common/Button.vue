<template>
  <button
    :class="[
      'base-button',
      `btn-${variant}`,
      `btn-${size}`,
      { 
        'btn-loading': loading,
        'btn-disabled': disabled,
        'btn-block': block,
        'btn-icon-only': iconOnly
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick">
    <span v-if="loading" class="btn-spinner"></span>
    <span v-if="icon && !loading" class="btn-icon">{{ icon }}</span>
    <span v-if="!iconOnly" class="btn-text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  iconOnly?: boolean
  loading?: boolean
  disabled?: boolean
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false,
  block: false,
  iconOnly: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.base-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.base-button:active::after {
  animation: ripple 0.5s ease-out;
}

/* 尺寸 */
.btn-small {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 10px 20px;
  font-size: 0.9375rem;
}

.btn-large {
  padding: 14px 28px;
  font-size: 1rem;
}

/* 变体 */
.btn-primary {
  background: var(--primary-500);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-600);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 89, 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--border-color-hover);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-500);
  color: var(--primary-500);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary-500);
  color: white;
}

.btn-ghost {
  background: transparent;
  color: var(--text-primary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--bg-secondary);
}

.btn-danger {
  background: var(--error);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* 状态 */
.btn-loading {
  pointer-events: none;
  opacity: 0.8;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-block {
  width: 100%;
}

.btn-icon-only {
  padding: 10px;
}

.btn-icon-only.btn-small {
  padding: 6px;
}

.btn-icon-only.btn-large {
  padding: 14px;
}

/* 加载动画 */
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
