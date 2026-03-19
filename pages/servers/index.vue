<template>
  <div class="min-h-screen" :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 面包屑 -->
      <nav class="mb-6">
        <ol class="flex items-center gap-2 text-sm">
          <li>
            <NuxtLink 
              to="/"
              class="transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              首页
            </NuxtLink>
          </li>
          <li :class="isDark ? 'text-gray-600' : 'text-gray-400'">/</li>
          <li :class="isDark ? 'text-white' : 'text-gray-900'">
            服务器列表
          </li>
        </ol>
      </nav>
      
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 
          class="text-3xl font-bold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          服务器列表
        </h1>
        <p 
          class="text-lg"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          发现并加入最热门的Minecraft服务器
        </p>
      </div>
      
      <!-- 统计信息 -->
      <div 
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div 
          class="rounded-card p-4 text-center"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div 
            class="text-2xl font-bold"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ servers.length }}
          </div>
          <div 
            class="text-sm"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            服务器总数
          </div>
        </div>
        <div 
          class="rounded-card p-4 text-center"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div 
            class="text-2xl font-bold text-green-500">
            {{ onlineServers.length }}
          </div>
          <div 
            class="text-sm"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            在线服务器
          </div>
        </div>
        <div 
          class="rounded-card p-4 text-center"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div 
            class="text-2xl font-bold"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ formatNumber(totalPlayers) }}
          </div>
          <div 
            class="text-sm"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            在线玩家
          </div>
        </div>
        <div 
          class="rounded-card p-4 text-center"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div 
            class="text-2xl font-bold"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ formatNumber(totalVotes) }}
          </div>
          <div 
            class="text-sm"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            总投票数
          </div>
        </div>
      </div>
      
      <!-- 筛选栏 -->
      <div 
        class="rounded-card p-4 mb-6"
        :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <!-- 搜索框 -->
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索服务器..."
              class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              ]"
              @keyup.enter="handleSearch"
            />
          </div>
          
          <!-- 类型筛选 -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in serverTypes" 
              :key="type.value"
              class="px-3 py-1.5 text-sm rounded-lg transition-colors"
              :class="[
                selectedType === type.value
                  ? 'bg-primary-500 text-white'
                  : isDark 
                    ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              @click="handleTypeChange(type.value)">
              {{ type.label }}
            </button>
          </div>
          
          <!-- 排序 -->
          <div class="flex items-center gap-2">
            <span 
              class="text-sm"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              排序：
            </span>
            <select
              v-model="sortBy"
              class="h-10 px-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              :class="[
                isDark 
                  ? 'bg-dark-800 border-dark-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              ]">
              <option value="votes">投票最多</option>
              <option value="players">玩家最多</option>
              <option value="newest">最新</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 服务器列表 -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          v-for="i in 4" 
          :key="i"
          class="rounded-card p-4"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <div class="flex gap-4">
            <div class="w-12 h-12 skeleton rounded-lg" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            <div class="flex-1 space-y-2">
              <div class="h-5 w-1/2 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
              <div class="h-4 w-3/4 skeleton rounded" :class="isDark ? 'bg-dark-800' : 'bg-gray-200'"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="filteredServers.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServerCard 
          v-for="server in filteredServers" 
          :key="server.id"
          :server="server"
          @vote="handleVote"
          @copy-ip="handleCopyIp" />
      </div>
      
      <!-- 空状态 -->
      <div 
        v-else 
        class="text-center py-20">
        <div class="text-6xl mb-4">🎮</div>
        <h3 
          class="text-xl font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          未找到服务器
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          尝试使用不同的搜索词或筛选条件
        </p>
        <button 
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600"
          @click="resetFilters">
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { useServerStore } from '~/stores/servers'
import { ElMessage } from 'element-plus'
import { formatNumber } from '~/utils'

const themeStore = useThemeStore()
const serverStore = useServerStore()

// 状态
const searchQuery = ref('')
const selectedType = ref('')
const sortBy = ref<'votes' | 'players' | 'newest'>('votes')

// 计算属性
const isDark = computed(() => themeStore.isDark)
const servers = computed(() => serverStore.servers)
const onlineServers = computed(() => serverStore.onlineServers)
const totalPlayers = computed(() => serverStore.totalPlayers)
const isLoading = computed(() => serverStore.isLoading)

const totalVotes = computed(() => {
  return servers.value.reduce((sum, server) => sum + server.voteCount, 0)
})

const filteredServers = computed(() => {
  let result = [...servers.value]
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(server => 
      server.name.toLowerCase().includes(query) ||
      server.description.toLowerCase().includes(query) ||
      server.ip.toLowerCase().includes(query)
    )
  }
  
  // 类型过滤
  if (selectedType.value) {
    result = result.filter(server => server.type === selectedType.value)
  }
  
  // 排序
  switch (sortBy.value) {
    case 'votes':
      result.sort((a, b) => b.voteCount - a.voteCount)
      break
    case 'players':
      result.sort((a, b) => b.playerCount - a.playerCount)
      break
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
  }
  
  return result
})

// 服务器类型
const serverTypes = [
  { value: '', label: '全部' },
  { value: '生存', label: '生存' },
  { value: '无规则生存', label: '无规则' },
  { value: 'RPG', label: 'RPG' },
  { value: '纯净生存', label: '纯净' },
]

// 方法
const handleSearch = () => {
  // 搜索逻辑已在computed中处理
}

const handleTypeChange = (type: string) => {
  selectedType.value = type
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  sortBy.value = 'votes'
}

const handleVote = async (serverId: string) => {
  const success = await serverStore.voteServer(serverId)
  if (success) {
    ElMessage.success('投票成功！')
  }
}

const handleCopyIp = (ip: string) => {
  navigator.clipboard.writeText(ip)
  ElMessage.success('IP已复制到剪贴板！')
}

// 生命周期
onMounted(() => {
  serverStore.fetchServers()
})
</script>
