<template>
  <div class="search-container" :class="{ 'search-focused': isFocused }">
    <div class="search-input-wrapper">
      <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keyup.enter="handleSearch"
      />
      
      <Transition name="fade">
        <button 
          v-if="searchQuery"
          class="search-clear"
          @click="clearSearch">
          ✕
        </button>
      </Transition>
      
      <button 
        class="search-button btn-hover"
        @click="handleSearch">
        搜索
      </button>
    </div>
    
    <!-- 搜索建议 -->
    <Transition name="slide">
      <div 
        v-if="showSuggestions && filteredSuggestions.length > 0"
        class="search-suggestions">
        <div 
          v-for="(suggestion, index) in filteredSuggestions" 
          :key="index"
          class="suggestion-item"
          :class="{ 'suggestion-active': activeIndex === index }"
          @mousedown.prevent="selectSuggestion(suggestion)"
          @mouseenter="activeIndex = index">
          <span class="suggestion-icon">🔍</span>
          <span class="suggestion-text">{{ suggestion }}</span>
        </div>
      </div>
    </Transition>
    
    <!-- 搜索历史 -->
    <Transition name="slide">
      <div 
        v-if="showHistory && searchHistory.length > 0 && !searchQuery"
        class="search-history">
        <div class="history-header">
          <span>搜索历史</span>
          <button class="history-clear" @click="clearHistory">清空</button>
        </div>
        <div class="history-list">
          <div 
            v-for="(item, index) in searchHistory" 
            :key="index"
            class="history-item"
            @click="selectHistory(item)">
            <span class="history-icon">🕒</span>
            <span class="history-text">{{ item }}</span>
            <button 
              class="history-remove"
              @click.stop="removeHistory(index)">
              ✕
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  placeholder?: string
  suggestions?: string[]
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索...',
  suggestions: () => [],
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const searchQuery = ref(props.modelValue)
const isFocused = ref(false)
const showSuggestions = ref(false)
const showHistory = ref(false)
const activeIndex = ref(-1)
const searchHistory = ref<string[]>([])

// 从本地存储加载搜索历史
onMounted(() => {
  const saved = localStorage.getItem('mc-hub-search-history')
  if (saved) {
    searchHistory.value = JSON.parse(saved)
  }
})

// 监听外部值变化
watch(() => props.modelValue, (value) => {
  searchQuery.value = value
})

// 监听内部值变化
watch(searchQuery, (value) => {
  emit('update:modelValue', value)
})

// 过滤建议
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  return props.suggestions.filter(s => 
    s.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5)
})

// 处理焦点
const handleFocus = () => {
  isFocused.value = true
  showSuggestions.value = true
  showHistory.value = true
  emit('focus')
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    showSuggestions.value = false
    showHistory.value = false
    activeIndex.value = -1
    emit('blur')
  }, 200)
}

// 处理输入
const handleInput = () => {
  activeIndex.value = -1
}

// 搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 添加到搜索历史
    addToHistory(searchQuery.value.trim())
    emit('search', searchQuery.value.trim())
    showSuggestions.value = false
    showHistory.value = false
  }
}

// 选择建议
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  handleSearch()
}

// 选择历史
const selectHistory = (item: string) => {
  searchQuery.value = item
  handleSearch()
}

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
  inputRef.value?.focus()
}

// 添加到历史
const addToHistory = (query: string) => {
  const index = searchHistory.value.indexOf(query)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  searchHistory.value.unshift(query)
  if (searchHistory.value.length > 10) {
    searchHistory.value.pop()
  }
  localStorage.setItem('mc-hub-search-history', JSON.stringify(searchHistory.value))
}

// 移除历史项
const removeHistory = (index: number) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem('mc-hub-search-history', JSON.stringify(searchHistory.value))
}

// 清空历史
const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('mc-hub-search-history')
}

// 键盘导航
const handleKeydown = (e: KeyboardEvent) => {
  if (!showSuggestions.value) return
  
  const suggestions = filteredSuggestions.value
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = Math.min(activeIndex.value + 1, suggestions.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = Math.max(activeIndex.value - 1, -1)
      break
    case 'Enter':
      if (activeIndex.value >= 0 && suggestions[activeIndex.value]) {
        selectSuggestion(suggestions[activeIndex.value])
      }
      break
    case 'Escape':
      showSuggestions.value = false
      showHistory.value = false
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.search-focused .search-input-wrapper {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(93, 156, 89, 0.2);
}

.search-icon {
  width: 20px;
  height: 20px;
  margin-left: 12px;
  color: var(--text-muted);
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  padding: 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.search-clear:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.search-button {
  padding: 10px 20px;
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.search-button:hover {
  background: var(--primary-600);
}

/* 建议列表 */
.search-suggestions,
.search-history {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  z-index: 50;
}

.suggestion-item,
.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover,
.suggestion-active,
.history-item:hover {
  background: var(--bg-secondary);
}

.suggestion-icon,
.history-icon {
  font-size: 1rem;
}

.suggestion-text,
.history-text {
  flex: 1;
  color: var(--text-primary);
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.history-clear {
  background: none;
  border: none;
  color: var(--primary-500);
  cursor: pointer;
  font-size: 0.875rem;
}

.history-remove {
  padding: 4px 8px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: all 0.2s;
}

.history-item:hover .history-remove {
  opacity: 1;
}

.history-remove:hover {
  background: var(--bg-tertiary);
  color: var(--error);
}

/* 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
