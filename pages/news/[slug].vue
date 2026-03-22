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
        
        <!-- 评论区 -->
        <div 
          class="mt-8 rounded-card"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <CommentSection :resource-id="news.id" />
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
import CommentSection from '~/components/common/CommentSection.vue'

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
  'minecraft-1-22-release': {
    id: '6',
    title: 'Minecraft 1.22 版本正式发布！',
    content: `Mojang正式发布了Minecraft 1.22版本，代号"考古与冒险"！

这个版本带来了许多令人兴奋的新内容：

**新特性：**
1. 全新考古系统：使用刷子在可疑的方块中挖掘古物
2. 新的生物群系：樱花林、沙漠神殿变种等
3. 新的敌对生物：旋风人、沼骸等
4. 新的武器：风弹，可以发射风弹攻击敌人

**改进：**
- 优化了世界生成算法
- 改进了战斗系统
- 新增了多个成就和进度
- 优化了游戏性能

**资源兼容性：**
我们将尽快更新平台上的资源兼容性信息，确保热门模组和整合包能够适配1.22版本。

快去更新游戏，体验全新的考古与冒险吧！`,
    slug: 'minecraft-1-22-release',
    category: 'minecraft',
    views: 45680,
    createdAt: '2024-12-03',
  },
  'top-mods-2024': {
    id: '7',
    title: '2024年度最受欢迎模组TOP10',
    content: `根据下载量和用户评分，我们评选出了2024年度最受欢迎的10个模组！

**TOP 10 模组榜单：**

1. **Create（机械动力）** - 专注于机械和自动化的模组，提供丰富的机械元件
2. **Sodium（钠）** - 高性能渲染优化模组，大幅提升帧率
3. **JEI (Just Enough Items)** - 物品管理模组，查看合成配方
4. **Tinkers' Construct（匠魂）** - 工具和武器制作模组
5. **Botania（植物魔法）** - 魔法类模组，以自然和花朵为主题
6. **Applied Energistics 2** - 存储和自动化模组
7. **Twilight Forest** - 大型冒险模组，添加神秘维度
8. **OptiFine** - 经典优化模组，支持高清纹理
9. **Iris Shaders** - 光影加载器，支持多种光影包
10. **Waystones** - 传送点系统，快速传送

这些模组都是经过玩家验证的优质作品，强烈推荐大家尝试！

你最喜欢哪个模组呢？欢迎在评论区分享你的看法！`,
    slug: 'top-mods-2024',
    category: 'guide',
    views: 32500,
    createdAt: '2024-12-01',
  },
  'how-to-install-mods': {
    id: '8',
    title: '新手必看：如何安装Minecraft模组',
    content: `很多新手玩家不知道如何安装模组，这篇教程将手把手教你！

**方法一：使用Forge**

1. 下载对应版本的Forge安装器
2. 运行安装器，选择"Install client"
3. 启动Minecraft Launcher，选择Forge版本
4. 下载模组文件（.jar格式）
5. 将模组文件放入.minecraft/mods文件夹
6. 启动游戏，模组就安装好了！

**方法二：使用Fabric**

1. 下载对应版本的Fabric安装器
2. 运行安装器，选择游戏版本
3. 启动Minecraft Launcher，选择Fabric版本
4. 下载Fabric API和模组文件
5. 将文件放入.minecraft/mods文件夹
6. 启动游戏

**注意事项：**
- 确保模组版本与游戏版本兼容
- 不要同时安装Forge和Fabric
- 某些模组需要前置模组（如Fabric API）
- 安装前建议备份存档

如果遇到问题，欢迎在评论区提问！`,
    slug: 'how-to-install-mods',
    category: 'guide',
    views: 28900,
    createdAt: '2024-11-28',
  },
  'server-setup-guide': {
    id: '9',
    title: '服务器搭建指南：从零开始创建你的服务器',
    content: `想和朋友一起玩Minecraft？这篇教程将教你如何搭建服务器！

**准备工作：**
- 一台电脑或云服务器
- 稳定的网络连接
- Java环境（推荐Java 17或更高版本）

**搭建步骤：**

1. **下载服务端**
   - 从官网下载原版服务端
   - 或下载Spigot/Paper等优化服务端

2. **创建启动脚本**
   创建一个start.bat文件，内容如下：
   \`java -Xmx2G -Xms1G -jar server.jar nogui\`

3. **首次运行**
   - 运行启动脚本
   - 等待生成文件
   - 编辑eula.txt，将eula=false改为eula=true

4. **配置服务器**
   编辑server.properties文件：
   - server-port: 端口号
   - max-players: 最大玩家数
   - gamemode: 游戏模式

5. **开放端口**
   - 在路由器中开放端口
   - 或使用内网穿透工具

6. **安装插件（可选）**
   下载插件文件，放入plugins文件夹

**推荐插件：**
- EssentialsX - 基础插件
- WorldEdit - 世界编辑
- LuckPerms - 权限管理

搭建完成后，把IP地址分享给朋友就可以一起玩了！`,
    slug: 'server-setup-guide',
    category: 'guide',
    views: 22100,
    createdAt: '2024-11-25',
  },
  'server-voting-event': {
    id: '10',
    title: 'MC Hub 服务器评选活动开始！',
    content: `MC Hub服务器评选活动正式启动！

为你喜欢的服务器投票，票数最高的服务器将获得专属推荐位和丰厚奖励。

**活动时间：**
2024年11月20日 - 12月20日

**参与方式：**
1. 在服务器列表页面找到你喜欢的服务器
2. 点击"投票"按钮
3. 每个账号每天可以投票一次

**评选规则：**
- 按总票数排名
- 票数相同的按玩家评价排名
- 最终结果在活动结束后公布

**奖励设置：**
- 第1名：专属推荐位 + 10000积分
- 第2-3名：推荐位 + 5000积分
- 第4-10名：3000积分

**注意事项：**
- 禁止刷票行为
- 投票需登录账号
- 活动解释权归MC Hub所有

快来为你喜欢的服务器投票吧！`,
    slug: 'server-voting-event',
    category: 'event',
    views: 18500,
    createdAt: '2024-11-20',
  },
  'shader-pack-recommendations': {
    id: '11',
    title: '光影包推荐：让你的世界更美丽',
    content: `光影包可以大幅提升游戏画质，本文为你推荐5个优秀的光影包！

**1. BSL Shaders**
- 特点：明亮、清晰，视觉效果优秀
- 配置要求：中等
- 推荐指数：⭐⭐⭐⭐⭐

**2. Complementary Shaders**
- 特点：平衡性能和画质
- 配置要求：中等
- 推荐指数：⭐⭐⭐⭐⭐

**3. Sildur's Vibrant Shaders**
- 特点：色彩鲜艳，画面明亮
- 配置要求：低-高可选
- 推荐指数：⭐⭐⭐⭐

**4. SEUS (Sonic Ether's Unbelievable Shaders)**
- 特点：写实风格，效果震撼
- 配置要求：高
- 推荐指数：⭐⭐⭐⭐

**5. Continuum Shaders**
- 特点：电影级画质
- 配置要求：很高
- 推荐指数：⭐⭐⭐⭐

**安装方法：**
1. 安装OptiFine或Iris Shaders
2. 下载光影包文件（.zip格式）
3. 打开游戏，进入视频设置
4. 点击"光影包"，选择下载的文件

**注意事项：**
- 光影包需要较好的显卡
- 可以根据电脑配置选择不同版本
- 建议先备份存档

选择适合你的光影包，让你的Minecraft世界更加美丽吧！`,
    slug: 'shader-pack-recommendations',
    category: 'guide',
    views: 19800,
    createdAt: '2024-11-15',
  },
  'best-modpacks-2024': {
    id: '12',
    title: '2024最佳整合包推荐',
    content: `整合包是将多个模组打包在一起的资源包，本文为你推荐2024年最佳整合包！

**科技类整合包：**

1. **All the Mods 9**
   - 包含大量科技、魔法和冒险模组
   - 适合喜欢全面体验的玩家
   - 游戏版本：1.20.1

2. **Create: Above and Beyond**
   - 以Create模组为核心的整合包
   - 专注于自动化和机械
   - 游戏版本：1.18.2

**魔法类整合包：**

3. **Enigmatica 6**
   - 包含多种魔法和科技模组
   - 任务系统完善
   - 游戏版本：1.16.5

**冒险类整合包：**

4. **RLCraft**
   - 硬核生存整合包
   - 难度极高，充满挑战
   - 游戏版本：1.12.2

5. **Sevtech: Ages**
   - 时代发展整合包
   - 从原始时代开始发展
   - 游戏版本：1.12.2

**空岛类整合包：**

6. **SkyFactory 4**
   - 从一棵树开始发展空岛
   - 自动化和科技为主
   - 游戏版本：1.12.2

**选择建议：**
- 新手推荐：All the Mods 9
- 喜欢挑战：RLCraft
- 喜欢机械：Create: Above and Beyond
- 喜欢魔法：Enigmatica 6

选择适合你的整合包，开始你的冒险吧！`,
    slug: 'best-modpacks-2024',
    category: 'guide',
    views: 24500,
    createdAt: '2024-11-10',
  },
  'community-rules-update': {
    id: '13',
    title: 'MC Hub 社区规则更新',
    content: `为了维护良好的社区环境，MC Hub社区规则进行了更新。

**主要更新内容：**

1. **禁止发布盗版资源**
   - 所有资源必须为原创或获得授权
   - 严禁发布破解版游戏或付费模组
   - 违规者将被永久封禁

2. **禁止恶意攻击他人**
   - 禁止人身攻击、辱骂他人
   - 禁止发布恶意评论
   - 违规者将被禁言处理

3. **禁止发布违规内容**
   - 禁止发布政治敏感内容
   - 禁止发布色情、暴力内容
   - 禁止发布广告、推广内容

4. **保护用户隐私**
   - 禁止泄露他人个人信息
   - 禁止恶意举报他人
   - 尊重他人隐私

**违规处理：**
- 轻微违规：警告处理
- 一般违规：禁言7天
- 严重违规：永久封禁

**申诉渠道：**
如果对处理结果有异议，可以通过以下渠道申诉：
- 发送邮件至support@mchub.com
- 在反馈页面提交申诉

请大家遵守规则，共建和谐社区！`,
    slug: 'community-rules-update',
    category: 'announcement',
    views: 11200,
    createdAt: '2024-11-05',
  },
  'bedrock-1-21-50-update': {
    id: '14',
    title: 'Minecraft 基岩版 1.21.50 更新',
    content: `Minecraft基岩版1.21.50版本已发布！

**更新内容：**

1. **跨平台联机优化**
   - 改进了跨平台联机稳定性
   - 减少了延迟和卡顿
   - 优化了同步机制

2. **移动端性能优化**
   - 提升了移动设备的帧率
   - 减少了内存占用
   - 优化了电池续航

3. **新增功能**
   - 新增了触控手势
   - 改进了UI界面
   - 优化了存档管理

4. **Bug修复**
   - 修复了多个已知bug
   - 改进了游戏稳定性

**更新方法：**
- Android/iOS：在应用商店更新
- Windows：在Microsoft Store更新
- Xbox：在主机设置中更新
- PlayStation：在系统设置中更新

**注意事项：**
- 更新前建议备份存档
- 部分模组可能需要更新才能兼容
- 如果遇到问题，可以尝试重新安装

所有平台用户都可以更新到最新版本，享受更好的游戏体验！`,
    slug: 'bedrock-1-21-50-update',
    category: 'minecraft',
    views: 16800,
    createdAt: '2024-11-01',
  },
  'anniversary-event-preview': {
    id: '15',
    title: 'MC Hub 周年庆典活动预告',
    content: `MC Hub即将迎来一周年！为了感谢大家的支持，我们将举办盛大的周年庆典活动！

**活动时间：**
2024年12月15日 - 12月31日

**活动内容：**

1. **登录送礼**
   - 活动期间每天登录可获得积分
   - 连续登录7天可获得限定头像框
   - 连续登录15天可获得限量版称号

2. **资源上传大赛**
   - 上传优质资源参与评选
   - 评选标准：创意性、实用性、下载量
   - 优胜者可获得丰厚奖励

3. **社区互动活动**
   - 参与社区讨论
   - 分享你的Minecraft故事
   - 有机会获得神秘大奖

4. **限时折扣**
   - 部分付费资源限时折扣
   - 积分兑换活动

**奖品设置：**
- 一等奖：10000积分 + 实物奖品
- 二等奖：5000积分 + 限定称号
- 三等奖：3000积分
- 参与奖：500积分

**参与方式：**
- 登录MC Hub账号
- 参与各项活动
- 完成任务获得积分

让我们一起庆祝MC Hub的一周年！期待你的参与！`,
    slug: 'anniversary-event-preview',
    category: 'event',
    views: 14200,
    createdAt: '2024-10-28',
  },
  'resource-pack-guide': {
    id: '16',
    title: '材质包入门：如何选择适合你的材质包',
    content: `材质包可以改变游戏的视觉风格，本文教你如何选择适合自己的材质包！

**材质包类型：**

1. **原版增强类**
   - 保持原版风格，提升分辨率
   - 代表：Faithful 32x
   - 适合：喜欢原版但想要更清晰的玩家

2. **卡通风格类**
   - 卡通化的视觉效果
   - 代表：Sphax PureBDCraft
   - 适合：喜欢可爱风格的玩家

3. **写实风格类**
   - 逼真的纹理效果
   - 代表：Patrix
   - 适合：追求真实感的玩家

4. **中世纪风格类**
   - 中世纪主题的材质
   - 代表：John Smith Legacy
   - 适合：喜欢建筑的玩家

**选择建议：**
- 低配电脑：选择16x或32x分辨率
- 中配电脑：选择64x分辨率
- 高配电脑：选择128x或更高分辨率

**安装方法：**
1. 下载材质包文件（.zip格式）
2. 打开游戏，进入选项 -> 资源包
3. 点击"打开资源包文件夹"
4. 将材质包文件放入文件夹
5. 返回游戏，选择材质包

**注意事项：**
- 材质包分辨率越高，对电脑要求越高
- 某些材质包需要OptiFine支持
- 可以同时使用多个材质包

选择适合你的材质包，让你的游戏世界焕然一新！`,
    slug: 'resource-pack-guide',
    category: 'guide',
    views: 15600,
    createdAt: '2024-10-25',
  },
  'mod-development-tutorial': {
    id: '17',
    title: '模组开发入门教程：创建你的第一个模组',
    content: `想学习模组开发？这篇教程将从零开始教你创建你的第一个M模组！

**准备工作：**
- 安装Java开发环境（JDK 17或更高）
- 安装IntelliJ IDEA或Eclipse
- 了解Java基础知识

**开发步骤：**

1. **搭建开发环境**
   - 下载Minecraft Forge MDK
   - 解压到工作目录
   - 运行gradlew setupDecompWorkspace

2. **创建模组主类**
   创建一个Java类，添加@Mod注解：
   \`@Mod("mymod")\`
   \`public class MyMod { }\`

3. **注册物品/方块**
   使用注册事件添加物品：
   \`@SubscribeEvent\`
   \`public void registerItems(RegistryEvent.Register<Item> event) { }\`

4. **添加功能**
   编写模组的具体功能代码

5. **测试模组**
   运行gradlew runClient测试

6. **打包发布**
   运行gradlew build打包

**学习资源：**
- Minecraft Forge官方文档
- YouTube教程视频
- 模组开发社区

**常见问题：**
- 编译错误：检查Java版本和依赖
- 游戏崩溃：查看崩溃日志
- 功能不生效：检查注册代码

模组开发需要耐心和实践，加油！`,
    slug: 'mod-development-tutorial',
    category: 'guide',
    views: 12800,
    createdAt: '2024-10-20',
  },
  'mod-team-partnerships': {
    id: '18',
    title: 'MC Hub 与多家模组团队达成合作',
    content: `MC Hub已与多家知名模组团队达成合作！

**合作团队：**
- Create（机械动力）团队
- Botania（植物魔法）团队
- JEI团队
- Twilight Forest团队

**合作内容：**

1. **资源首发**
   - 新版本资源将在MC Hub首发
   - 玩家可以第一时间获取最新版本

2. **官方认证**
   - 合作团队的资源将获得官方认证标识
   - 确保资源的安全性和质量

3. **技术支持**
   - 合作团队将提供技术支持
   - 解决玩家遇到的问题

4. **社区活动**
   - 联合举办社区活动
   - 提供独家福利

**对玩家的好处：**
- 获取资源更快捷
- 资源质量有保障
- 获得官方技术支持
- 参与独家活动

**未来计划：**
我们将继续与更多优质模组团队合作，为玩家提供更好的服务。

感谢所有合作团队的支持！也感谢玩家的信任！`,
    slug: 'mod-team-partnerships',
    category: 'announcement',
    views: 9800,
    createdAt: '2024-10-15',
  },
  'education-edition-free': {
    id: '19',
    title: 'Minecraft 教育版免费开放',
    content: `Mojang宣布Minecraft教育版将永久免费开放！

**什么是教育版？**
Minecraft教育版是专为教育目的设计的Minecraft版本，提供了丰富的学习资源和创意工具。

**主要功能：**

1. **课堂模式**
   - 教师可以控制游戏环境
   - 设置学习目标和任务
   - 监控学生进度

2. **代码构建器**
   - 可视化编程学习
   - 支持多种编程语言
   - 培养计算思维

3. **化学资源包**
   - 学习化学知识
   - 实验模拟
   - 元素周期表

4. **历史世界**
   - 探索历史场景
   - 学习历史文化
   - 沉浸式体验

**如何获取：**
- 访问education.minecraft.net
- 使用学校邮箱注册
- 下载教育版客户端

**适用人群：**
- 学校和教育机构
- 教师和学生
- 对教育感兴趣的玩家

**注意事项：**
- 教育版与普通版不完全相同
- 部分功能需要学校账号
- 支持Windows、macOS、iPad

这是一个很好的学习工具，推荐给所有教育工作者和学生！`,
    slug: 'education-edition-free',
    category: 'minecraft',
    views: 38500,
    createdAt: '2024-10-10',
  },
  'creator-contest': {
    id: '20',
    title: 'MC Hub 创作者大赛开始报名',
    content: `MC Hub创作者大赛正式开始报名！

**比赛时间：**
- 报名时间：2024年10月5日 - 10月31日
- 作品提交：2024年11月1日 - 11月30日
- 评选时间：2024年12月1日 - 12月15日
- 结果公布：2024年12月20日

**比赛赛道：**
1. 模组赛道
2. 整合包赛道
3. 材质包赛道
4. 地图赛道

**参赛要求：**
- 作品必须为原创
- 作品需在MC Hub上传
- 每个赛道最多提交3个作品
- 作品需符合社区规范

**评选标准：**
- 创意性（30%）
- 实用性（30%）
- 下载量（20%）
- 用户评价（20%）

**奖项设置：**
每个赛道：
- 一等奖：5000元现金 + 专属称号
- 二等奖：2000元现金 + 专属称号
- 三等奖：1000元现金
- 优秀奖：500积分

**报名方式：**
1. 登录MC Hub账号
2. 进入活动页面
3. 填写报名信息
4. 上传参赛作品

**注意事项：**
- 作品需在比赛期间上传
- 禁止抄袭他人作品
- 作品需通过审核

期待你的精彩作品！让我们一起创造更好的Minecraft社区！`,
    slug: 'creator-contest',
    category: 'event',
    views: 21500,
    createdAt: '2024-10-05',
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
