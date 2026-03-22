<template>
  <NuxtLink 
    :to="`/resources/${resource.slug}`"
    class="resource-card card-hover group">
    <!-- 缩略图 -->
    <div class="card-thumbnail">
      <div 
        class="thumbnail-bg"
        :class="getThumbnailGradient(resource.type)">
        <span class="thumbnail-icon group-hover:scale-110 transition-transform duration-300">{{ getResourceTypeIcon(resource.type) }}</span>
      </div>
      
      <!-- 类型标签 -->
      <div class="card-badge">
        <span 
          class="badge-text"
          :class="getTypeBadgeClass(resource.type)">
          {{ getResourceTypeName(resource.type) }}
        </span>
      </div>
      
      <!-- 下载量 -->
      <div class="card-stats">
        <span class="stat-item">
          <svg class="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {{ formatNumber(resource.downloads) }}
        </span>
      </div>
      
      <!-- 收藏按钮 -->
      <button 
        class="favorite-btn"
        @click.prevent="$emit('favorite', resource.id)"
        :class="isFavorited ? 'favorited' : ''">
        <svg 
          class="w-4 h-4"
          :fill="isFavorited ? 'currentColor' : 'none'"
          stroke="currentColor" 
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <!-- 悬浮遮罩 -->
      <div class="card-overlay">
        <span class="overlay-text">查看详情</span>
      </div>
    </div>
    
    <!-- 内容 -->
    <div class="card-content">
      <h3 class="card-title">
        {{ resource.name }}
      </h3>
      
      <p class="card-description">
        {{ resource.description }}
      </p>
      
      <!-- 底部信息 -->
      <div class="card-footer">
        <!-- 作者 -->
        <div class="card-author">
          <div class="author-avatar">
            {{ resource.author.username.charAt(0) }}
          </div>
          <span class="author-name">
            {{ resource.author.username }}
          </span>
        </div>
        
        <!-- 评分 -->
        <div class="card-rating">
          <div class="stars-wrapper">
            <svg 
              v-for="i in 5" 
              :key="i"
              class="rating-star"
              :class="i <= Math.round(resource.rating) ? 'filled' : 'empty'"
              fill="currentColor" 
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="rating-score">
            {{ resource.rating.toFixed(1) }}
          </span>
          <span class="rating-count">
            ({{ formatNumber(resource.ratingCount) }})
          </span>
        </div>
      </div>
      
      <!-- 标签 -->
      <div class="card-tags">
        <span 
          v-for="tag in resource.tags.slice(0, 3)" 
          :key="tag"
          class="tag-item tag-animate">
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemeStore } from '~/stores/theme'
import type { Resource, ResourceType } from '~/types'
import { formatNumber, getResourceTypeName, getResourceTypeIcon } from '~/utils'

interface Props {
  resource: Resource
  isFavorited?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isFavorited: false
})

defineEmits<{
  (e: 'favorite', resourceId: string): void
}>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 获取缩略图渐变
const getThumbnailGradient = (type: ResourceType) => {
  const gradients: Record<ResourceType, string> = {
    mod: 'gradient-blue',
    modpack: 'gradient-purple',
    resourcepack: 'gradient-green',
    shader: 'gradient-yellow',
    map: 'gradient-teal',
    datapack: 'gradient-red',
  }
  return gradients[type] || 'gradient-gray'
}

// 获取类型标签样式
const getTypeBadgeClass = (type: ResourceType) => {
  const classes: Record<ResourceType, string> = {
    mod: 'badge-blue',
    modpack: 'badge-purple',
    resourcepack: 'badge-green',
    shader: 'badge-yellow',
    map: 'badge-teal',
    datapack: 'badge-red',
  }
  return classes[type] || 'badge-gray'
}
</script>

<style scoped>
.resource-card {
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.dark .resource-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

/* 缩略图区域 */
.card-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.thumbnail-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.resource-card:hover .thumbnail-bg {
  transform: scale(1.1);
}

.thumbnail-icon {
  font-size: 3rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

/* 渐变背景 */
.gradient-blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.gradient-purple { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.gradient-green { background: linear-gradient(135deg, #22c55e, #16a34a); }
.gradient-yellow { background: linear-gradient(135deg, #f59e0b, #d97706); }
.gradient-teal { background: linear-gradient(135deg, #14b8a6, #0d9488); }
.gradient-red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.gradient-gray { background: linear-gradient(135deg, #6b7280, #4b5563); }

/* 徽章 */
.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
}

.badge-text {
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  color: white;
  backdrop-filter: blur(4px);
}

.badge-blue { background: rgba(59, 130, 246, 0.9); }
.badge-purple { background: rgba(139, 92, 246, 0.9); }
.badge-green { background: rgba(34, 197, 94, 0.9); }
.badge-yellow { background: rgba(245, 158, 11, 0.9); }
.badge-teal { background: rgba(20, 184, 166, 0.9); }
.badge-red { background: rgba(239, 68, 68, 0.9); }
.badge-gray { background: rgba(107, 114, 128, 0.9); }

/* 统计 */
.card-stats {
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: var(--radius-full);
  z-index: 10;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: white;
}

.stat-icon {
  width: 14px;
  height: 14px;
}

/* 收藏按钮 */
.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: #6b7280;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.resource-card:hover .favorite-btn {
  opacity: 1;
  transform: scale(1);
}

.favorite-btn:hover {
  background: white;
  color: #ef4444;
  transform: scale(1.1);
}

.favorite-btn.favorited {
  opacity: 1;
  transform: scale(1);
  background: white;
  color: #ef4444;
}

/* 悬浮遮罩 */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
}

.resource-card:hover .card-overlay {
  opacity: 1;
}

.overlay-text {
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  background: var(--primary-500);
  border-radius: var(--radius-md);
  transform: translateY(10px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.resource-card:hover .overlay-text {
  transform: translateY(0);
}

/* 内容区域 */
.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.resource-card:hover .card-title {
  color: var(--primary-500);
}

.card-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 底部 */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.author-name {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.resource-card:hover .author-name {
  color: var(--text-primary);
}

/* 评分 */
.card-rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars-wrapper {
  display: flex;
  gap: 1px;
}

.rating-star {
  width: 12px;
  height: 12px;
  transition: transform 0.2s ease;
}

.rating-star.filled {
  color: #fbbf24;
}

.rating-star.empty {
  color: #e5e7eb;
}

.dark .rating-star.empty {
  color: #4b5563;
}

.rating-star:hover {
  transform: scale(1.2);
}

.rating-score {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
}

.rating-count {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* 标签 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: var(--radius-full);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.tag-item:hover {
  background: var(--primary-500);
  color: white;
  transform: scale(1.05);
}
</style>
