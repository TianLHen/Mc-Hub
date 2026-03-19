<template>
  <div class="notification-panel">
    <div class="panel-header">
      <h3 class="panel-title">通知</h3>
      <button 
        v-if="notifications.length > 0"
        class="mark-read-btn"
        @click="markAllAsRead">
        全部已读
      </button>
    </div>
    
    <div class="panel-content">
      <TransitionGroup name="list" tag="div" class="notification-list">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
          @click="handleClick(notification)">
          <div class="notification-icon" :class="`icon-${notification.type}`">
            <span v-if="notification.type === 'comment'">💬</span>
            <span v-else-if="notification.type === 'reply'">↩️</span>
            <span v-else-if="notification.type === 'download'">📥</span>
            <span v-else-if="notification.type === 'update'">🔄</span>
            <span v-else>📢</span>
          </div>
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatDate(notification.createdAt) }}</div>
          </div>
          <button 
            class="notification-delete"
            @click.stop="deleteNotification(notification.id)">
            ✕
          </button>
        </div>
      </TransitionGroup>
      
      <!-- 空状态 -->
      <EmptyState 
        v-if="notifications.length === 0"
        icon="🔔"
        title="暂无通知"
        description="当有新消息时会显示在这里" />
    </div>
    
    <div v-if="notifications.length > 0" class="panel-footer">
      <NuxtLink to="/notifications" class="view-all-link">
        查看全部通知 →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '~/stores/notifications'
import EmptyState from '~/components/common/EmptyState.vue'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString('zh-CN')
}

const handleClick = (notification: any) => {
  notificationStore.markAsRead(notification.id)
  if (notification.link) {
    navigateTo(notification.link)
  }
}

const markAllAsRead = () => {
  notificationStore.markAllAsRead()
}

const deleteNotification = (id: string) => {
  notificationStore.deleteNotification(id)
}
</script>

<style scoped>
.notification-panel {
  width: 380px;
  max-height: 500px;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--primary-500);
  cursor: pointer;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.mark-read-btn:hover {
  color: var(--primary-600);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
}

.notification-list {
  display: flex;
  flex-direction: column;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.notification-item:hover {
  background: var(--bg-secondary);
}

.notification-item.unread {
  background: var(--primary-50);
}

.dark .notification-item.unread {
  background: rgba(93, 156, 89, 0.1);
}

.notification-item.unread::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: var(--primary-500);
  border-radius: 50%;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.icon-comment { background: rgba(59, 130, 246, 0.1); }
.icon-reply { background: rgba(139, 92, 246, 0.1); }
.icon-download { background: rgba(34, 197, 94, 0.1); }
.icon-update { background: rgba(245, 158, 11, 0.1); }
.icon-system { background: rgba(107, 114, 128, 0.1); }

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.notification-message {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.notification-delete {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: all 0.2s;
}

.notification-item:hover .notification-delete {
  opacity: 1;
}

.notification-delete:hover {
  background: var(--bg-tertiary);
  color: var(--error);
}

.panel-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.view-all-link {
  color: var(--primary-500);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.view-all-link:hover {
  color: var(--primary-600);
}

/* 动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
