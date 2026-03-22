# MC Hub - Minecraft 中文社区平台

一个面向中国玩家的现代化 Minecraft 资源社区网站。

## 功能特性

- 🎮 **资源下载** - 模组、整合包、材质包、光影、地图、数据包
- 📚 **版本库** - Minecraft 各版本下载（正式版、快照版、预发布版等）
- 🖥️ **服务器列表** - 发现热门 Minecraft 服务器
- 👤 **用户系统** - 注册、登录、个人中心、收藏、下载记录
- ⭐ **评分评论** - 资源评分和评论系统
- 🔥 **热门榜单** - 实时热门资源排行
- 🔗 **模组推荐** - 智能推荐相关模组
- 📊 **创作者中心** - 数据看板、收益统计
- 🌙 **暗色模式** - 支持亮色/暗色主题切换
- 📱 **响应式设计** - 完美适配移动端

## 技术栈

- **前端框架**: Nuxt 3 (Vue 3)
- **UI 样式**: Tailwind CSS
- **状态管理**: Pinia
- **UI 组件**: Element Plus
- **类型系统**: TypeScript

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/你的用户名/mc-hub.git
cd mc-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 部署

项目支持多种部署方式：

#### Vercel（推荐）

1. Fork 本项目
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

#### Netlify

1. Fork 本项目
2. 在 [Netlify](https://netlify.com) 导入项目
3. 构建命令: `npm run build`
4. 发布目录: `.output/public`

#### 自托管

```bash
npm run build
node .output/server/index.mjs
```

## 项目结构

```
mc-hub/
├── assets/           # 静态资源
│   └── css/          # 样式文件
├── components/       # 组件
│   ├── common/       # 通用组件
│   ├── layout/       # 布局组件
│   ├── resource/     # 资源相关组件
│   ├── server/       # 服务器相关组件
│   └── user/         # 用户相关组件
├── composables/      # 组合式函数
├── layouts/          # 布局
├── pages/            # 页面
│   ├── resources/    # 资源页面
│   ├── versions/     # 版本库页面
│   ├── servers/      # 服务器页面
│   ├── news/         # 新闻页面
│   └── user/         # 用户页面
├── stores/           # Pinia 状态管理
├── types/            # TypeScript 类型
├── utils/            # 工具函数
└── nuxt.config.ts    # Nuxt 配置
```

## 内部测试

### 测试账号

测试期间可使用以下功能：
- 注册新账号
- 浏览资源和服务器
- 下载资源（模拟）
- 评论和评分

### 测试反馈

请在 [Issues](https://github.com/你的用户名/mc-hub/issues) 提交反馈，包括：
- 发现的 Bug
- 功能建议
- 界面优化意见

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 项目主页: https://github.com/你的用户名/mc-hub
- 问题反馈: https://github.com/你的用户名/mc-hub/issues

## 致谢

感谢所有为 Minecraft 社区做出贡献的开发者们！
