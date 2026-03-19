<template>
  <div class="min-h-screen">
    <!-- Hero区域 -->
    <section 
      class="relative py-20 overflow-hidden"
      :class="isDark ? 'bg-dark-950' : 'bg-gradient-to-br from-primary-50 to-accent-50'">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div 
          class="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
          :class="isDark ? 'bg-primary-500' : 'bg-primary-300'"></div>
        <div 
          class="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float delay-500"
          :class="isDark ? 'bg-accent-500' : 'bg-accent-300'"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 
            class="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            发现最好的
            <span class="gradient-animate bg-clip-text text-transparent">Minecraft</span>
            <br class="hidden sm:block" />
            <span class="text-primary-500">中文资源</span>
          </h1>
          <p 
            class="text-lg sm:text-xl mb-10 max-w-2xl mx-auto animate-slide-up delay-100"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            探索数十万个模组、整合包、光影和资源包。<br class="hidden sm:block" />
            下载、分享、与百万玩家共建最活跃的中文 MC 社区
          </p>
          
          <!-- 搜索框 -->
          <div class="max-w-2xl mx-auto mb-8 animate-slide-up delay-200">
            <div class="relative group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索模组、整合包、材质包..."
                class="w-full h-14 px-6 pr-14 text-lg rounded-xl border-2 transition-all duration-300 input-focus"
                :class="[
                  isDark 
                    ? 'bg-dark-900 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                ]"
                @keyup.enter="handleSearch"
                @focus="showSearchSuggestions = true"
                @blur="hideSearchSuggestions"
              />
              <button 
                class="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-primary-500 text-white rounded-lg font-medium transition-all duration-200 btn-hover"
                @click="handleSearch">
                搜索
              </button>
              
              <!-- 搜索建议 -->
              <Transition name="fade">
                <div 
                  v-if="showSearchSuggestions && searchSuggestions.length > 0"
                  class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-900 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 overflow-hidden z-50">
                  <div 
                    v-for="(suggestion, index) in searchSuggestions" 
                    :key="index"
                    class="px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-800 cursor-pointer transition-colors"
                    @mousedown.prevent="selectSuggestion(suggestion)">
                    <span class="text-gray-600 dark:text-gray-400 mr-2">🔍</span>
                    <span :class="isDark ? 'text-white' : 'text-gray-900'">{{ suggestion }}</span>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          
          <!-- 快捷入口 -->
          <div class="flex flex-wrap justify-center gap-3 animate-slide-up delay-300">
            <NuxtLink 
              v-for="(item, index) in quickLinks" 
              :key="item.path"
              :to="item.path"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift"
              :class="[
                isDark 
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm',
                `stagger-${index + 1}`
              ]"
              :style="{ animationDelay: `${(index + 4) * 50}ms` }">
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 统计数据 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-12 border-b"
        :class="isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-100'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label"
              class="text-center"
              :style="{ animationDelay: `${index * 100}ms` }">
              <div 
                class="text-3xl sm:text-4xl font-bold mb-2 count-up"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ stat.value }}
              </div>
              <div 
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 最新资源 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <h2 
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              最新资源
            </h2>
            <NuxtLink 
              to="/resources?sort=newest"
              class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors nav-link">
              查看全部 →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              v-for="(resource, index) in latestResources" 
              :key="resource.id"
              :resource="resource"
              :class="`animate-slide-up stagger-${index + 1}`"
              :style="{ animationDelay: `${index * 100}ms` }" />
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 热门下载 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-900' : 'bg-white'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <h2 
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              热门下载
            </h2>
            <NuxtLink 
              to="/resources?sort=downloads"
              class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors nav-link">
              查看全部 →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard 
              v-for="(resource, index) in hotResources" 
              :key="resource.id"
              :resource="resource"
              :class="`animate-slide-up stagger-${index + 1}`"
              :style="{ animationDelay: `${index * 100}ms` }" />
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 分类入口 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            class="text-2xl font-bold mb-8 text-center"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            资源分类
          </h2>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <NuxtLink 
              v-for="(category, index) in categories" 
              :key="category.type"
              :to="`/resources?type=${category.type}`"
              class="group p-6 rounded-card text-center transition-all duration-300 card-hover"
              :class="[
                isDark 
                  ? 'bg-dark-900 shadow-card-dark hover:bg-dark-800' 
                  : 'bg-white shadow-card hover:bg-gray-50',
                `animate-scale-in stagger-${index + 1}`
              ]"
              :style="{ animationDelay: `${index * 50}ms` }">
              <div class="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">{{ category.icon }}</div>
              <div 
                class="font-medium"
                :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ category.name }}
              </div>
              <div 
                class="text-sm mt-1"
                :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                {{ category.count }} 个资源
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 服务器状态 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-900' : 'bg-white'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <h2 
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              热门服务器
            </h2>
            <NuxtLink 
              to="/servers"
              class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors nav-link">
              查看全部 →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServerCard 
              v-for="(server, index) in hotServers" 
              :key="server.id"
              :server="server"
              :class="`animate-slide-up stagger-${index + 1}`"
              :style="{ animationDelay: `${index * 100}ms` }"
              @vote="handleVote"
              @copy-ip="handleCopyIp" />
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 实时热门榜单 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <h2 
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              🔥 实时热门榜单
            </h2>
            <NuxtLink 
              to="/resources?sort=downloads"
              class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors nav-link">
              查看全部 →
            </NuxtLink>
          </div>
          
          <!-- 榜单时间切换 -->
          <div class="flex gap-2 mb-6">
            <button 
              v-for="period in rankingPeriods" 
              :key="period.value"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="[
                selectedPeriod === period.value
                  ? 'bg-primary-500 text-white'
                  : isDark 
                    ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
              ]"
              @click="selectedPeriod = period.value">
              {{ period.label }}
            </button>
          </div>
          
          <!-- 榜单列表 -->
          <div 
            class="rounded-card overflow-hidden"
            :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
            <div 
              v-for="(resource, index) in rankingResources" 
              :key="resource.id"
              class="flex items-center gap-4 p-4 border-b transition-colors"
              :class="[
                isDark 
                  ? 'border-dark-800 hover:bg-dark-800' 
                  : 'border-gray-100 hover:bg-gray-50',
                index < 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''
              ]">
              <!-- 排名 -->
              <div 
                class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                :class="getRankClass(index)">
                {{ index + 1 }}
              </div>
              
              <!-- 图标 -->
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                :class="getTypeBackground(resource.type)">
                {{ getResourceTypeIcon(resource.type) }}
              </div>
              
              <!-- 信息 -->
              <div class="flex-1 min-w-0">
                <NuxtLink 
                  :to="`/resources/${resource.slug}`"
                  class="font-medium hover:text-primary-500 transition-colors truncate block"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ resource.name }}
                </NuxtLink>
                <div class="flex items-center gap-3 text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  <span>{{ resource.author.username }}</span>
                  <span>⭐ {{ resource.rating.toFixed(1) }}</span>
                </div>
              </div>
              
              <!-- 下载量 -->
              <div class="text-right">
                <div 
                  class="font-semibold"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ formatNumber(resource.downloads) }}
                </div>
                <div 
                  class="text-xs"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  下载
                </div>
              </div>
              
              <!-- 趋势 -->
              <div 
                class="w-16 text-right text-xs font-medium"
                :class="resource.trend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ resource.trend > 0 ? '↑' : '↓' }} {{ Math.abs(resource.trend) }}%
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- 新闻公告 -->
    <AnimateOnScroll animation="slide-up">
      <section 
        class="py-16"
        :class="isDark ? 'bg-dark-950' : 'bg-gray-50'">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-8">
            <h2 
              class="text-2xl font-bold"
              :class="isDark ? 'text-white' : 'text-gray-900'">
              新闻公告
            </h2>
            <NuxtLink 
              to="/news"
              class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors nav-link">
              查看全部 →
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(news, index) in newsList" 
              :key="news.id"
              class="rounded-card overflow-hidden transition-all duration-300 card-hover"
              :class="[
                isDark 
                  ? 'bg-dark-900 shadow-card-dark' 
                  : 'bg-white shadow-card',
                `animate-slide-up stagger-${index + 1}`
              ]"
              :style="{ animationDelay: `${index * 100}ms` }">
              <div 
                class="aspect-video bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span class="text-4xl">📰</span>
              </div>
              <div class="p-4">
                <div 
                  class="text-xs mb-2"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  {{ news.date }}
                </div>
                <h3 
                  class="font-semibold mb-2 line-clamp-2"
                  :class="isDark ? 'text-white' : 'text-gray-900'">
                  {{ news.title }}
                </h3>
                <p 
                  class="text-sm line-clamp-2"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  {{ news.summary }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
    
    <!-- CTA区域 -->
    <section 
      class="py-20 gradient-animate"
      :class="isDark ? 'bg-dark-900' : ''">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4 animate-slide-up">
          开始分享你的创作
        </h2>
        <p class="text-lg mb-8 animate-slide-up delay-100" :class="isDark ? 'text-gray-400' : 'text-primary-100'">
          加入MC Hub，与百万玩家分享你的模组、整合包和创意作品
        </p>
        <div class="flex flex-wrap justify-center gap-4 animate-slide-up delay-200">
          <NuxtLink 
            to="/upload"
            class="px-8 py-3 bg-white text-primary-500 rounded-lg font-medium transition-all duration-200 hover-lift">
            上传资源
          </NuxtLink>
          <NuxtLink 
            to="/user/register"
            class="px-8 py-3 border-2 border-white text-white rounded-lg font-medium transition-all duration-200 hover:bg-white/10 hover-lift">
            注册账号
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Toast通知 -->
    <Toast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { useResourceStore } from '~/stores/resources'
import { useServerStore } from '~/stores/servers'
import AnimateOnScroll from '~/components/common/AnimateOnScroll.vue'
import Toast from '~/components/common/Toast.vue'

const router = useRouter()
const themeStore = useThemeStore()
const resourceStore = useResourceStore()
const serverStore = useServerStore()
const toastRef = ref<InstanceType<typeof Toast> | null>(null)

// 状态
const searchQuery = ref('')
const showSearchSuggestions = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)
const latestResources = computed(() => resourceStore.getLatestResources)
const hotResources = computed(() => resourceStore.getHotResources)
const hotServers = computed(() => serverStore.getHotServers)

// 搜索建议
const searchSuggestions = computed(() => {
  if (!searchQuery.value) return []
  const suggestions = [
    'OptiFine',
    'JEI',
    'Fabric',
    'Forge',
    '光影',
    '整合包',
    '生存',
    'RPG'
  ]
  return suggestions.filter(s => 
    s.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5)
})

// 快捷链接
const quickLinks = [
  { name: '模组', path: '/resources?type=mod', icon: '⚙️' },
  { name: '整合包', path: '/resources?type=modpack', icon: '📦' },
  { name: '材质包', path: '/resources?type=resourcepack', icon: '🎨' },
  { name: '光影', path: '/resources?type=shader', icon: '✨' },
  { name: '版本库', path: '/versions', icon: '📚' },
  { name: '服务器', path: '/servers', icon: '🎮' },
]

// 统计数据
const stats = [
  { value: '10万+', label: '资源总数' },
  { value: '158万+', label: '累计下载' },
  { value: '9万', label: '注册用户' },
  { value: '500+', label: '活跃服务器' },
]

// 分类
const categories = [
  { type: 'mod', name: '模组', icon: '⚙️', count: 50000 },
  { type: 'modpack', name: '整合包', icon: '📦', count: 2000 },
  { type: 'resourcepack', name: '材质包', icon: '🎨', count: 15000 },
  { type: 'shader', name: '光影', icon: '✨', count: 3000 },
  { type: 'map', name: '地图', icon: '🗺️', count: 8000 },
  { type: 'datapack', name: '数据包', icon: '📋', count: 5000 },
]

// 榜单周期
const rankingPeriods = [
  { label: '今日热门', value: 'today' },
  { label: '本周热门', value: 'week' },
  { label: '本月热门', value: 'month' },
]

const selectedPeriod = ref('week')

// 榜单资源
const rankingResources = [
  {
    id: '1',
    name: 'OptiFine',
    slug: 'optifine',
    type: 'mod' as ResourceType,
    author: { username: 'sp614x' },
    downloads: 5000000,
    rating: 4.8,
    trend: 12,
  },
  {
    id: '2',
    name: 'JEI (Just Enough Items)',
    slug: 'jei',
    type: 'mod' as ResourceType,
    author: { username: 'mezz' },
    downloads: 4500000,
    rating: 4.9,
    trend: 8,
  },
  {
    id: '3',
    name: 'BSL Shaders',
    slug: 'bsl-shaders',
    type: 'shader' as ResourceType,
    author: { username: 'Capt Tatsu' },
    downloads: 3500000,
    rating: 4.8,
    trend: 15,
  },
  {
    id: '4',
    name: 'Faithful 32x',
    slug: 'faithful-32x',
    type: 'resourcepack' as ResourceType,
    author: { username: 'Faithful团队' },
    downloads: 2800000,
    rating: 4.7,
    trend: 5,
  },
  {
    id: '5',
    name: '剑与王国',
    slug: 'sword-and-kingdom',
    type: 'modpack' as ResourceType,
    author: { username: '剑与王国团队' },
    downloads: 1845000,
    rating: 4.7,
    trend: -3,
  },
  {
    id: '6',
    name: '龙之冒险：新征程',
    slug: 'dragon-adventure',
    type: 'modpack' as ResourceType,
    author: { username: 'RuoLing' },
    downloads: 479000,
    rating: 4.6,
    trend: 22,
  },
]

// 新闻
const newsList = [
  {
    id: '1',
    title: 'MC Hub 正式上线！',
    summary: '我们很高兴地宣布MC Hub正式上线，感谢所有内测用户的支持和反馈。',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: '1.21版本资源适配完成',
    summary: '所有热门模组和整合包已适配1.21版本，快去下载体验吧！',
    date: '2024-01-10',
  },
  {
    id: '3',
    title: '创作者激励计划启动',
    summary: 'MC Hub创作者激励计划正式启动，优质内容创作者可获得丰厚奖励。',
    date: '2024-01-05',
  },
]

// 方法
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/resources?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    showSearchSuggestions.value = false
  }
}

const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  handleSearch()
}

const hideSearchSuggestions = () => {
  setTimeout(() => {
    showSearchSuggestions.value = false
  }, 200)
}

const handleVote = async (serverId: string) => {
  const success = await serverStore.voteServer(serverId)
  if (success && toastRef.value) {
    toastRef.value.success('投票成功！')
  }
}

const handleCopyIp = (ip: string) => {
  navigator.clipboard.writeText(ip)
  if (toastRef.value) {
    toastRef.value.success('IP已复制到剪贴板！')
  }
}

// 获取排名样式
const getRankClass = (index: number) => {
  if (index === 0) return 'bg-yellow-500 text-white'
  if (index === 1) return 'bg-gray-400 text-white'
  if (index === 2) return 'bg-orange-500 text-white'
  return isDark.value ? 'bg-dark-800 text-gray-400' : 'bg-gray-100 text-gray-600'
}

// 获取类型背景
const getTypeBackground = (type: string) => {
  const backgrounds: Record<string, string> = {
    mod: 'bg-blue-500/10',
    modpack: 'bg-purple-500/10',
    resourcepack: 'bg-green-500/10',
    shader: 'bg-yellow-500/10',
    map: 'bg-teal-500/10',
    datapack: 'bg-red-500/10',
  }
  return backgrounds[type] || 'bg-gray-500/10'
}

// 生命周期
onMounted(() => {
  resourceStore.fetchResources()
  serverStore.fetchServers()
})
</script>

<style scoped>
.gradient-animate {
  background: linear-gradient(-45deg, var(--primary-500), var(--accent-500), var(--primary-600), var(--primary-500));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
