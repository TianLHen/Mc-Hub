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
          <li>
            <NuxtLink 
              to="/news"
              class="transition-colors hover:text-primary-500"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              新闻公告
            </NuxtLink>
          </li>
          <li :class="isDark ? 'text-gray-600' : 'text-gray-400'">/</li>
          <li :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ news?.title || '加载中...' }}
          </li>
        </ol>
      </nav>
      
      <!-- 文章内容 -->
      <article 
        v-if="news"
        class="max-w-3xl mx-auto">
        <!-- 文章头部 -->
        <header class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <span 
              class="px-3 py-1 text-sm font-medium rounded-full"
              :class="getCategoryClass(news.category)">
              {{ getCategoryName(news.category) }}
            </span>
            <span 
              class="text-sm"
              :class="isDark ? 'text-gray-500' : 'text-gray-500'">
              {{ formatDate(news.createdAt) }}
            </span>
          </div>
          <h1 
            class="text-3xl sm:text-4xl font-bold mb-4"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            {{ news.title }}
          </h1>
          <div class="flex items-center gap-4 text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ formatNumber(news.views) }} 阅读
            </span>
          </div>
        </header>
        
        <!-- 文章封面 -->
        <div 
          class="aspect-video rounded-card mb-8 bg-gradient-to-br flex items-center justify-center"
          :class="getNewsGradient(news.category)">
          <span class="text-8xl">{{ getNewsIcon(news.category) }}</span>
        </div>
        
        <!-- 文章正文 -->
        <div 
          class="rounded-card p-8 prose max-w-none"
          :class="isDark ? 'bg-dark-900 prose-invert' : 'bg-white shadow-card'">
          <p class="text-lg leading-relaxed" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
            {{ news.content }}
          </p>
        </div>
        
        <!-- 分享按钮 -->
        <div class="mt-8 pt-6 border-t" :class="isDark ? 'border-dark-800' : 'border-gray-200'">
          <div class="flex items-center justify-between">
            <span 
              class="text-sm"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'">
              分享到：
            </span>
            <div class="flex gap-3">
              <button 
                class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                :class="isDark 
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
                </svg>
              </button>
              <button 
                class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                :class="isDark 
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
      
      <!-- 加载状态 -->
      <div v-else class="max-w-3xl mx-auto text-center py-20">
        <div class="text-6xl mb-4">📰</div>
        <h3 
          class="text-xl font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-gray-900'">
          文章不存在
        </h3>
        <p 
          class="text-sm mb-6"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'">
          该文章可能已被删除或链接无效
        </p>
        <NuxtLink 
          to="/news"
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600">
          返回新闻列表
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import { formatDate, formatNumber } from '~/utils'

const route = useRoute()
const themeStore = useThemeStore()

// 计算属性
const isDark = computed(() => themeStore.isDark)

// 模拟新闻数据
const newsData: Record<string, any> = {
  'mc-hub-launch': {
    id: '1',
    title: 'MC Hub 正式上线！',
    content: `我们很高兴地宣布MC Hub正式上线！

经过数月的开发和测试，MC Hub终于与大家见面了。MC Hub致力于为中国玩家提供最优质的Minecraft资源下载和社区交流平台。

在这里，你可以：
- 下载各种模组、整合包、材质包、光影等资源
- 发现并加入热门的Minecraft服务器
- 与其他玩家交流游戏心得
- 分享自己的创作作品

我们特别感谢所有内测用户的支持和反馈，正是你们的建议让MC Hub变得更好。

未来，我们将继续完善平台功能，增加更多实用的特性，为中国的Minecraft社区贡献力量。

欢迎大家注册使用MC Hub，让我们一起创造一个更好的Minecraft社区！`,
    slug: 'mc-hub-launch',
    category: 'announcement',
    views: 15680,
    createdAt: '2024-01-15',
  },
  '1-21-resources-ready': {
    id: '2',
    title: '1.21版本资源适配完成',
    content: `好消息！所有热门模组和整合包已适配1.21版本。

Minecraft 1.21版本带来了许多令人兴奋的新功能，包括新的生物群系、方块和游戏机制。为了让玩家能够尽快体验到这些新内容，我们的团队与各大模组开发者合作，确保热门资源能够完美兼容1.21版本。

目前已适配的资源包括：
- OptiFine
- JEI (Just Enough Items)
- BSL Shaders
- Faithful 32x
- 以及更多...

如果你在使用过程中遇到任何兼容性问题，请及时反馈给我们，我们会尽快处理。

快去下载体验吧！`,
    slug: '1-21-resources-ready',
    category: 'update',
    views: 8920,
    createdAt: '2024-01-10',
  },
  'creator-incentive-program': {
    id: '3',
    title: '创作者激励计划启动',
    content: `MC Hub创作者激励计划正式启动！

为了鼓励更多创作者在MC Hub分享他们的优质作品，我们特别推出了创作者激励计划。

计划内容：
1. 优质资源奖励：每月评选优质资源，创作者可获得积分奖励
2. 下载量奖励：资源下载量达到一定数量，可获得额外奖励
3. 社区贡献奖励：积极参与社区建设的用户可获得特别奖励

如何参与：
- 在MC Hub注册账号
- 上传你的原创资源
- 通过审核后即可参与激励计划

我们希望通过这个计划，能够激励更多创作者分享他们的作品，让MC Hub成为一个充满活力的创作社区。

期待你的参与！`,
    slug: 'creator-incentive-program',
    category: 'announcement',
    views: 12350,
    createdAt: '2024-01-05',
  },
  'minecraft-1-21-1-preview': {
    id: '4',
    title: 'Minecraft 1.21.1 版本更新预告',
    content: `Mojang宣布将在下个月发布1.21.1版本更新。

这次更新主要包含以下内容：
- 修复了多个已知bug
- 优化了游戏性能
- 改进了部分游戏机制
- 增加了新的成就

详细更新内容：
1. 修复了在某些情况下游戏崩溃的问题
2. 优化了区块加载速度
3. 改进了红石元件的工作方式
4. 修复了多人游戏中的一些同步问题

我们会在1.21.1正式发布后，第一时间更新平台上的资源兼容性信息。

敬请期待！`,
    slug: 'minecraft-1-21-1-preview',
    category: 'minecraft',
    views: 25680,
    createdAt: '2024-01-03',
  },
  'spring-festival-event': {
    id: '5',
    title: '春节活动预告',
    content: `MC Hub将在春节期间举办特别活动！

活动时间：2024年2月9日 - 2月24日

活动内容：
1. 签到送礼：活动期间每天签到可获得积分奖励
2. 资源大赛：上传优质资源参与评选，有机会获得丰厚奖品
3. 社区互动：参与社区讨论，分享你的春节游戏故事

奖品包括：
- 专属春节头像框
- 限量版称号
- 积分大礼包
- 实物奖品（神秘大奖）

活动规则：
- 每个账号每天只能签到一次
- 资源大赛需上传原创作品
- 参与社区互动需遵守社区规范

让我们一起在MC Hub过一个快乐的春节！`,
    slug: 'spring-festival-event',
    category: 'event',
    views: 9850,
    createdAt: '2024-01-01',
  },
}

// 当前新闻
const news = computed(() => {
  const slug = route.params.slug as string
  return newsData[slug] || null
})

// 方法
const getNewsGradient = (category: string) => {
  const gradients: Record<string, string> = {
    announcement: 'from-primary-500 to-primary-700',
    update: 'from-blue-500 to-blue-700',
    minecraft: 'from-green-500 to-green-700',
    event: 'from-purple-500 to-purple-700',
  }
  return gradients[category] || 'from-gray-500 to-gray-700'
}

const getNewsIcon = (category: string) => {
  const icons: Record<string, string> = {
    announcement: '📢',
    update: '🔄',
    minecraft: '🎮',
    event: '🎉',
  }
  return icons[category] || '📰'
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    announcement: 'bg-primary-500/10 text-primary-500',
    update: 'bg-blue-500/10 text-blue-500',
    minecraft: 'bg-green-500/10 text-green-500',
    event: 'bg-purple-500/10 text-purple-500',
  }
  return classes[category] || 'bg-gray-500/10 text-gray-500'
}

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    announcement: '公告',
    update: '更新',
    minecraft: 'MC资讯',
    event: '活动',
  }
  return names[category] || category
}
</script>
