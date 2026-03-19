<template>
  <div class="comment-section">
    <h3 class="comment-title">
      评论 ({{ comments.length }})
    </h3>
    
    <!-- 评论输入 -->
    <div class="comment-input-wrapper">
      <div class="input-avatar">
        {{ isLoggedIn ? username.charAt(0) : '?' }}
      </div>
      <div class="input-content">
        <textarea
          v-model="newComment"
          placeholder="写下你的评论..."
          rows="3"
          class="comment-textarea"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"></textarea>
        
        <Transition name="slide">
          <div v-if="isInputFocused || newComment" class="input-actions">
            <div class="input-tools">
              <button class="tool-btn" title="插入表情">😊</button>
              <button class="tool-btn" title="插入图片">🖼️</button>
              <button class="tool-btn" title="插入代码">{ }</button>
            </div>
            <div class="input-buttons">
              <button 
                class="cancel-btn"
                @click="cancelComment">
                取消
              </button>
              <button 
                class="submit-btn btn-hover"
                :disabled="!newComment.trim() || !isLoggedIn"
                @click="submitComment">
                发表评论
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    
    <!-- 评论列表 -->
    <div class="comment-list">
      <TransitionGroup name="list">
        <div 
          v-for="comment in sortedComments" 
          :key="comment.id"
          class="comment-item">
          <div class="comment-avatar">
            {{ comment.author.charAt(0) }}
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button 
                class="action-btn"
                :class="{ 'action-active': comment.isLiked }"
                @click="toggleLike(comment)">
                <span class="action-icon">{{ comment.isLiked ? '❤️' : '🤍' }}</span>
                <span class="action-count">{{ comment.likes }}</span>
              </button>
              <button 
                class="action-btn"
                @click="toggleReply(comment)">
                <span class="action-icon">💬</span>
                <span>回复</span>
              </button>
              <button 
                v-if="comment.replies.length > 0"
                class="action-btn"
                @click="toggleReplies(comment)">
                <span class="action-icon">📖</span>
                <span>{{ comment.showReplies ? '收起' : '展开' }} {{ comment.replies.length }} 条回复</span>
              </button>
            </div>
            
            <!-- 回复输入 -->
            <Transition name="slide">
              <div v-if="comment.showReplyInput" class="reply-input-wrapper">
                <textarea
                  v-model="replyContent"
                  :placeholder="`回复 ${comment.author}...`"
                  rows="2"
                  class="reply-textarea"></textarea>
                <div class="reply-actions">
                  <button 
                    class="cancel-btn"
                    @click="comment.showReplyInput = false">
                    取消
                  </button>
                  <button 
                    class="submit-btn"
                    :disabled="!replyContent.trim()"
                    @click="submitReply(comment)">
                    回复
                  </button>
                </div>
              </div>
            </Transition>
            
            <!-- 回复列表 -->
            <Transition name="slide">
              <div v-if="comment.showReplies && comment.replies.length > 0" class="reply-list">
                <div 
                  v-for="reply in comment.replies" 
                  :key="reply.id"
                  class="reply-item">
                  <div class="reply-avatar">
                    {{ reply.author.charAt(0) }}
                  </div>
                  <div class="reply-content">
                    <div class="reply-header">
                      <span class="reply-author">{{ reply.author }}</span>
                      <span class="reply-time">{{ formatDate(reply.createdAt) }}</span>
                    </div>
                    <p class="reply-text">{{ reply.content }}</p>
                    <div class="reply-actions">
                      <button 
                        class="action-btn"
                        :class="{ 'action-active': reply.isLiked }"
                        @click="toggleReplyLike(reply)">
                        <span class="action-icon">{{ reply.isLiked ? '❤️' : '🤍' }}</span>
                        <span class="action-count">{{ reply.likes }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </TransitionGroup>
      
      <!-- 空状态 -->
      <EmptyState 
        v-if="comments.length === 0"
        icon="💬"
        title="暂无评论"
        description="成为第一个评论的人吧！" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import EmptyState from '~/components/common/EmptyState.vue'

interface Reply {
  id: string
  author: string
  content: string
  likes: number
  isLiked: boolean
  createdAt: string
}

interface Comment {
  id: string
  author: string
  content: string
  likes: number
  isLiked: boolean
  createdAt: string
  replies: Reply[]
  showReplies: boolean
  showReplyInput: boolean
}

interface Props {
  resourceId?: string
}

defineProps<Props>()

const authStore = useAuthStore()

// 状态
const newComment = ref('')
const replyContent = ref('')
const isInputFocused = ref(false)

// 计算属性
const isLoggedIn = computed(() => authStore.isLoggedIn)
const username = computed(() => authStore.username)

// 模拟评论数据
const comments = ref<Comment[]>([
  {
    id: '1',
    author: '小明',
    content: '这个资源非常好用，强烈推荐！用了之后游戏体验提升了很多。',
    likes: 12,
    isLiked: false,
    createdAt: '2024-01-15T10:30:00Z',
    replies: [
      {
        id: '1-1',
        author: '小红',
        content: '同意！我也在用，确实很棒。',
        likes: 3,
        isLiked: false,
        createdAt: '2024-01-15T11:00:00Z'
      }
    ],
    showReplies: false,
    showReplyInput: false
  },
  {
    id: '2',
    author: '小刚',
    content: '安装简单，效果很棒。作者更新也很及时。',
    likes: 8,
    isLiked: false,
    createdAt: '2024-01-14T15:20:00Z',
    replies: [],
    showReplies: false,
    showReplyInput: false
  },
  {
    id: '3',
    author: '小李',
    content: '期待更多更新！希望作者能继续维护这个项目。',
    likes: 5,
    isLiked: false,
    createdAt: '2024-01-13T09:45:00Z',
    replies: [],
    showReplies: false,
    showReplyInput: false
  }
])

// 排序后的评论
const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

// 方法
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

const submitComment = () => {
  if (!newComment.value.trim() || !isLoggedIn.value) return
  
  const comment: Comment = {
    id: Date.now().toString(),
    author: username.value,
    content: newComment.value,
    likes: 0,
    isLiked: false,
    createdAt: new Date().toISOString(),
    replies: [],
    showReplies: false,
    showReplyInput: false
  }
  
  comments.value.unshift(comment)
  newComment.value = ''
  isInputFocused.value = false
}

const cancelComment = () => {
  newComment.value = ''
  isInputFocused.value = false
}

const toggleLike = (comment: Comment) => {
  comment.isLiked = !comment.isLiked
  comment.likes += comment.isLiked ? 1 : -1
}

const toggleReply = (comment: Comment) => {
  comment.showReplyInput = !comment.showReplyInput
  if (comment.showReplyInput) {
    replyContent.value = ''
  }
}

const toggleReplies = (comment: Comment) => {
  comment.showReplies = !comment.showReplies
}

const submitReply = (comment: Comment) => {
  if (!replyContent.value.trim() || !isLoggedIn.value) return
  
  const reply: Reply = {
    id: `${comment.id}-${Date.now()}`,
    author: username.value,
    content: replyContent.value,
    likes: 0,
    isLiked: false,
    createdAt: new Date().toISOString()
  }
  
  comment.replies.push(reply)
  comment.showReplies = true
  comment.showReplyInput = false
  replyContent.value = ''
}

const toggleReplyLike = (reply: Reply) => {
  reply.isLiked = !reply.isLiked
  reply.likes += reply.isLiked ? 1 : -1
}
</script>

<style scoped>
.comment-section {
  padding: 24px;
}

.comment-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

/* 评论输入 */
.comment-input-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.input-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.input-content {
  flex: 1;
}

.comment-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  resize: none;
  outline: none;
  transition: all 0.2s;
}

.comment-textarea:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(93, 156, 89, 0.2);
}

.input-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.input-tools {
  display: flex;
  gap: 8px;
}

.tool-btn {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background 0.2s;
}

.tool-btn:hover {
  background: var(--bg-tertiary);
}

.input-buttons {
  display: flex;
  gap: 8px;
}

.cancel-btn {
  padding: 8px 16px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: var(--bg-secondary);
}

.submit-btn {
  padding: 8px 16px;
  background: var(--primary-500);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-600);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 评论列表 */
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: var(--text-primary);
}

.comment-time {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.comment-text {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  font-size: 0.875rem;
}

.action-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.action-active {
  color: var(--error);
}

.action-icon {
  font-size: 1rem;
}

/* 回复输入 */
.reply-input-wrapper {
  margin-top: 12px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.reply-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: none;
  outline: none;
  font-size: 0.875rem;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

/* 回复列表 */
.reply-list {
  margin-top: 16px;
  padding-left: 20px;
  border-left: 2px solid var(--border-color);
}

.reply-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
}

.reply-item:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.reply-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-300);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.reply-content {
  flex: 1;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.reply-author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.reply-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.reply-text {
  color: var(--text-primary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 8px;
}

/* 动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
