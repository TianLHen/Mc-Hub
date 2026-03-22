// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // 运行时配置（环境变量）
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  
  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  
  // 应用配置
  app: {
    head: {
      title: 'MC Hub - 我的世界中文社区',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MC Hub - 面向中国玩家的现代化我的世界社区网站，提供资源下载、社区交流、服务器信息等一站式服务' },
        { name: 'keywords', content: 'Minecraft,我的世界,模组,整合包,材质包,服务器,社区' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap' },
      ],
    },
  },
  
  // CSS配置
  css: [
    '~/assets/css/main.css',
  ],
  
  // Element Plus配置
  elementPlus: {
    themes: ['dark'],
  },
  
  // Tailwind配置
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: true,
  },
  
  // 自动导入配置
  imports: {
    dirs: ['stores', 'composables', 'utils'],
  },
  
  // 组件自动导入
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
