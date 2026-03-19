<template>
  <div 
    class="rounded-card p-4 transition-all duration-200 hover:shadow-card-hover"
    :class="[
      isDark 
        ? 'bg-dark-900 shadow-card-dark' 
        : 'bg-white shadow-card'
    ]">
    <div class="flex items-start gap-4">
      <!-- 服务器图标 -->
      <div 
        class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        :class="isDark ? 'bg-dark-800' : 'bg-gray-100'">
        <span class="text-2xl">🎮</span>
      </div>
      
      <!-- 服务器信息 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 
            class="text-base font-semibold truncate"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ server.name }}
          </h3>
          <span 
            class="w-2 h-2 rounded-full flex-shrink-0"
            :class="server.status === 'online' ? 'bg-green-500' : 'bg-gray-400'"></span>
        </div>
        
        <p 
          class="text-sm mb-2 line-clamp-1"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          {{ server.description }}
        </p>
        
        <!-- 服务器详情 -->
        <div class="flex flex-wrap gap-3 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {{ server.playerCount }}/{{ server.maxPlayers }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            {{ server.version }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {{ server.ping }}ms
          </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex flex-col gap-2">
        <button 
          class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
          :class="[
            isDark 
              ? 'bg-primary-500 hover:bg-primary-600 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          ]"
          @click="$emit('vote', server.id)">
          投票
        </button>
        <button 
          class="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors"
          :class="[
            isDark 
              ? 'border-dark-700 text-gray-300 hover:bg-dark-800' 
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          ]"
          @click="$emit('copy-ip', server.ip)">
          复制IP
        </button>
      </div>
    </div>
    
    <!-- 投票数 -->
    <div 
      class="mt-3 pt-3 border-t flex items-center justify-between"
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
        class="text-xs px-2 py-1 rounded-full"
        :class="server.status === 'online' 
          ? 'bg-green-500/10 text-green-500' 
          : 'bg-gray-500/10 text-gray-500'">
        {{ server.status === 'online' ? '在线' : '离线' }}
      </span>
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
</script>
