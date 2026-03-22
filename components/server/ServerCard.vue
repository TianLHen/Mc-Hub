<template>
  <div 
    class="server-card group"
    :class="[
      isDark 
        ? 'bg-dark-900 shadow-card-dark' 
        : 'bg-white shadow-card'
    ]">
    <!-- 状态指示条 -->
    <div 
      class="status-bar"
      :class="server.status === 'online' ? 'online' : 'offline'"></div>
    
    <div class="p-5">
      <div class="flex items-start gap-4">
        <!-- 服务器图标 -->
        <div 
          class="server-icon"
          :class="isDark ? 'bg-dark-800' : 'bg-gray-100'">
          <span class="text-2xl group-hover:scale-110 transition-transform duration-300">🎮</span>
        </div>
        
        <!-- 服务器信息 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 
              class="text-base font-semibold truncate group-hover:text-primary-500 transition-colors"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              {{ server.name }}
            </h3>
            <span 
              class="status-dot"
              :class="server.status === 'online' ? 'online' : 'offline'">
              <span v-if="server.status === 'online'" class="ping-animation"></span>
            </span>
          </div>
          
          <p 
            class="text-sm mb-3 line-clamp-2"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            {{ server.description }}
          </p>
          
          <!-- 服务器详情 -->
          <div class="flex flex-wrap gap-3 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
            <span class="detail-item">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="font-medium" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                {{ server.playerCount }}
              </span>
              /{{ server.maxPlayers }}
            </span>
            <span class="detail-item">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              {{ server.version }}
            </span>
            <span class="detail-item">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span :class="getPingClass(server.ping)">{{ server.ping }}ms</span>
            </span>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="flex flex-col gap-2">
          <button 
            class="vote-btn"
            @click="$emit('vote', server.id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            投票
          </button>
          <button 
            class="copy-btn"
            @click="$emit('copy-ip', server.ip)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            复制IP
          </button>
        </div>
      </div>
      
      <!-- 投票数 -->
      <div 
        class="mt-4 pt-4 border-t flex items-center justify-between"
        :class="isDark ? 'border-dark-800' : 'border-gray-100'">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span 
            class="text-sm font-medium"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ formatNumber(server.voteCount) }}
          </span>
          <span 
            class="text-xs"
            :class="isDark ? 'text-gray-500' : 'text-gray-500'">
            票
          </span>
        </div>
        
        <span 
          class="status-badge"
          :class="server.status === 'online' 
            ? 'online' 
            : 'offline'">
          {{ server.status === 'online' ? '在线' : '离线' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '~/stores/theme'
import type { Server } from '~/types'
import { formatNumber } from '~/utils'

interface Props {
  server: Server
}

defineProps<Props>()
defineEmits<{
  (e: 'vote', serverId: string): void
  (e: 'copy-ip', ip: string): void
}>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 获取ping值样式
const getPingClass = (ping: number) => {
  if (ping < 50) return 'ping-good'
  if (ping < 100) return 'ping-medium'
  return 'ping-bad'
}
</script>

<style scoped>
.server-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.server-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.dark .server-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

/* 状态指示条 */
.status-bar {
  height: 3px;
  width: 100%;
  transition: background 0.3s ease;
}

.status-bar.online {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.status-bar.offline {
  background: linear-gradient(90deg, #9ca3af, #6b7280);
}

/* 服务器图标 */
.server-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.server-card:hover .server-icon {
  transform: scale(1.05);
}

/* 状态点 */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.status-dot.online {
  background: #22c55e;
}

.status-dot.offline {
  background: #9ca3af;
}

.ping-animation {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.3);
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* 详情项 */
.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.detail-item:hover {
  background: var(--primary-500);
  color: white;
}

/* Ping状态 */
.ping-good {
  color: #22c55e;
}

.ping-medium {
  color: #f59e0b;
}

.ping-bad {
  color: #ef4444;
}

/* 投票按钮 */
.vote-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(93, 156, 89, 0.3);
}

.vote-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 156, 89, 0.4);
}

.vote-btn:active {
  transform: translateY(0);
}

/* 复制按钮 */
.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.copy-btn {
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.copy-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-color: var(--border-color-hover);
}

/* 状态徽章 */
.status-badge {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 600;
  transition: all 0.2s ease;
}

.status-badge.online {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.offline {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
}

.status-badge:hover {
  transform: scale(1.05);
}
</style>
