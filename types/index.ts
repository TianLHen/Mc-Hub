// 类型定义

// 用户相关
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  level: number
  points: number
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// 资源相关
export type ResourceType = 'mod' | 'modpack' | 'resourcepack' | 'shader' | 'map' | 'datapack'

export interface Resource {
  id: string
  name: string
  slug: string
  description: string
  type: ResourceType
  author: User
  thumbnail?: string
  screenshots: string[]
  downloads: number
  rating: number
  ratingCount: number
  versions: ResourceVersion[]
  tags: string[]
  dependencies: ResourceDependency[]
  createdAt: string
  updatedAt: string
}

export interface ResourceVersion {
  id: string
  version: string
  gameVersion: string
  downloadUrl: string
  fileSize: number
  changelog: string
  createdAt: string
}

export interface ResourceDependency {
  id: string
  name: string
  required: boolean
  downloadUrl?: string
}

// 服务器相关
export interface Server {
  id: string
  name: string
  description: string
  ip: string
  port: number
  version: string
  type: string
  playerCount: number
  maxPlayers: number
  status: 'online' | 'offline' | 'starting'
  ping: number
  icon?: string
  website?: string
  voteCount: number
  createdAt: string
  updatedAt: string
}

// 评论相关
export interface Comment {
  id: string
  content: string
  author: User
  resource?: Resource
  server?: Server
  likes: number
  replies: Comment[]
  createdAt: string
  updatedAt: string
}

// 分类相关
export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  resourceCount: number
  children?: Category[]
}

// 新闻相关
export interface News {
  id: string
  title: string
  slug: string
  content: string
  summary: string
  thumbnail?: string
  author: User
  views: number
  createdAt: string
  updatedAt: string
}

// 分页相关
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

// API响应
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 搜索和筛选
export interface ResourceFilter {
  type?: ResourceType
  category?: string
  version?: string
  sort?: 'downloads' | 'rating' | 'newest' | 'updated'
  search?: string
  page?: number
  pageSize?: number
}

// 通知相关
export interface Notification {
  id: string
  type: 'comment' | 'reply' | 'download' | 'update' | 'system'
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
}

// 版本库相关
export type MinecraftEdition = 'java' | 'bedrock'
export type VersionType = 'release' | 'snapshot' | 'prerelease' | 'release_candidate' | 'beta' | 'alpha'

export interface MinecraftVersion {
  id: string
  version: string
  edition: MinecraftEdition
  type: VersionType
  name: string
  summary: string
  changelog: string[]
  releaseDate: string
  downloadUrl: string
  fileSize: number
  downloads: number
  isLatest: boolean
  isRecommended: boolean
  compatibleVersions?: string[]  // 兼容的模组API版本
  knownIssues?: string[]
  relatedResources?: Resource[]
}

export interface VersionFilter {
  edition?: MinecraftEdition
  type?: VersionType
  search?: string
  sort?: 'newest' | 'oldest' | 'downloads' | 'name'
  page?: number
  pageSize?: number
}

export interface VersionGroup {
  type: VersionType
  typeName: string
  icon: string
  description: string
  versions: MinecraftVersion[]
  latestVersion?: MinecraftVersion
}
