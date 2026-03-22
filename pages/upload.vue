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
            上传资源
          </li>
        </ol>
      </nav>
      
      <div class="max-w-3xl mx-auto">
        <div 
          class="rounded-card p-8"
          :class="isDark ? 'bg-dark-900' : 'bg-white shadow-card'">
          <h1 
            class="text-2xl font-bold mb-6"
            :class="isDark ? 'text-white' : 'text-gray-900'">
            上传资源
          </h1>
          
          <form @submit.prevent="handleSubmit">
            <!-- 资源类型 -->
            <div class="mb-6">
              <label 
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                资源类型 *
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  v-for="type in resourceTypes" 
                  :key="type.value"
                  type="button"
                  class="p-4 rounded-lg border-2 text-center transition-colors"
                  :class="[
                    formData.type === type.value
                      ? 'border-primary-500 bg-primary-500/10'
                      : isDark 
                        ? 'border-dark-700 hover:border-dark-600' 
                        : 'border-gray-200 hover:border-gray-300'
                  ]"
                  @click="formData.type = type.value as ResourceType">
                  <div class="text-2xl mb-2">{{ type.icon }}</div>
                  <div 
                    class="font-medium"
                    :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ type.label }}
                  </div>
                </button>
              </div>
            </div>
            
            <!-- 资源名称 -->
            <div class="mb-4">
              <label 
                for="name"
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                资源名称 *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                placeholder="请输入资源名称"
                class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="[
                  isDark 
                    ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                ]"
              />
            </div>
            
            <!-- 简短描述 -->
            <div class="mb-4">
              <label 
                for="summary"
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                简短描述 *
              </label>
              <input
                id="summary"
                v-model="formData.summary"
                type="text"
                required
                placeholder="一句话描述你的资源"
                class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="[
                  isDark 
                    ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                ]"
              />
            </div>
            
            <!-- 详细介绍 -->
            <div class="mb-4">
              <label 
                for="description"
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                详细介绍 *
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="6"
                required
                placeholder="详细描述你的资源的功能、特点和使用方法..."
                class="w-full p-3 rounded-lg border resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="[
                  isDark 
                    ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                ]"></textarea>
            </div>
            
            <!-- 游戏版本 -->
            <div class="mb-4">
              <label 
                for="gameVersion"
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                游戏版本 *
              </label>
              <select
                id="gameVersion"
                v-model="formData.gameVersion"
                required
                class="w-full h-10 px-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                :class="[
                  isDark 
                    ? 'bg-dark-800 border-dark-700 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                ]">
                <option value="">请选择游戏版本</option>
                <option v-for="version in gameVersions" :key="version" :value="version">
                  {{ version }}
                </option>
              </select>
            </div>
            
            <!-- 标签 -->
            <div class="mb-4">
              <label 
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                标签
              </label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in formData.tags" 
                  :key="tag"
                  class="px-3 py-1 text-sm rounded-full flex items-center gap-1"
                  :class="isDark ? 'bg-dark-800 text-gray-300' : 'bg-gray-100 text-gray-700'">
                  {{ tag }}
                  <button 
                    type="button"
                    class="ml-1 hover:text-red-500"
                    @click="removeTag(tag)">
                    &times;
                  </button>
                </span>
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="添加标签..."
                  class="px-3 py-1 text-sm rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  :class="[
                    isDark 
                      ? 'bg-dark-800 border-dark-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  ]"
                  @keyup.enter.prevent="addTag"
                />
              </div>
            </div>
            
            <!-- 文件上传 -->
            <div class="mb-6">
              <label 
                class="block text-sm font-medium mb-2"
                :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                上传文件 *
              </label>
              <div 
                class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
                :class="[
                  isDark 
                    ? 'border-dark-700 hover:border-dark-600' 
                    : 'border-gray-300 hover:border-gray-400'
                ]"
                @dragover.prevent
                @drop.prevent="handleFileDrop">
                <input
                  ref="fileInput"
                  type="file"
                  accept=".jar,.zip"
                  class="hidden"
                  @change="handleFileSelect"
                />
                <div class="text-4xl mb-4">📁</div>
                <p 
                  class="text-sm mb-2"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  拖拽文件到此处，或
                  <button 
                    type="button"
                    class="text-primary-500 hover:text-primary-600 font-medium"
                    @click="($refs.fileInput as HTMLInputElement).click()">
                    点击上传
                  </button>
                </p>
                <p 
                  class="text-xs"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                  支持 .jar, .zip 格式，最大 100MB
                </p>
                
                <!-- 已上传文件 -->
                <div 
                  v-if="uploadedFile"
                  class="mt-4 p-3 rounded-lg text-left"
                  :class="isDark ? 'bg-dark-800' : 'bg-gray-50'">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">📄</span>
                      <div>
                        <div 
                          class="font-medium"
                          :class="isDark ? 'text-white' : 'text-gray-900'">
                          {{ uploadedFile.name }}
                        </div>
                        <div 
                          class="text-xs"
                          :class="isDark ? 'text-gray-500' : 'text-gray-500'">
                          {{ formatFileSize(uploadedFile.size) }}
                        </div>
                      </div>
                    </div>
                    <button 
                      type="button"
                      class="text-red-500 hover:text-red-600"
                      @click="uploadedFile = null">
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 提交按钮 -->
            <div class="flex justify-end gap-4">
              <NuxtLink 
                to="/"
                class="px-6 py-2 rounded-lg font-medium transition-colors"
                :class="isDark 
                  ? 'text-gray-300 hover:bg-dark-800' 
                  : 'text-gray-700 hover:bg-gray-100'">
                取消
              </NuxtLink>
              <button
                type="submit"
                class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium transition-colors hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting || !isFormValid">
                <span v-if="isSubmitting">提交中...</span>
                <span v-else>提交审核</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '~/stores/theme'
import type { ResourceType } from '~/types'
import { formatFileSize } from '~/utils'
import { ElMessage } from 'element-plus'

const router = useRouter()
const themeStore = useThemeStore()

// 状态
const formData = ref({
  type: '' as ResourceType | '',
  name: '',
  summary: '',
  description: '',
  gameVersion: '',
  tags: [] as string[],
})
const newTag = ref('')
const uploadedFile = ref<File | null>(null)
const isSubmitting = ref(false)

// 计算属性
const isDark = computed(() => themeStore.isDark)

const isFormValid = computed(() => {
  return (
    formData.value.type &&
    formData.value.name &&
    formData.value.summary &&
    formData.value.description &&
    formData.value.gameVersion &&
    uploadedFile.value
  )
})

// 资源类型
const resourceTypes = [
  { value: 'mod', label: '模组', icon: '⚙️' },
  { value: 'modpack', label: '整合包', icon: '📦' },
  { value: 'resourcepack', label: '材质包', icon: '🎨' },
  { value: 'shader', label: '光影', icon: '✨' },
  { value: 'map', label: '地图', icon: '🗺️' },
  { value: 'datapack', label: '数据包', icon: '📋' },
]

// 游戏版本
const gameVersions = [
  '1.21.4',
  '1.21.3',
  '1.21.2',
  '1.21.1',
  '1.21',
  '1.20.4',
  '1.20.3',
  '1.20.2',
  '1.20.1',
  '1.20',
  '1.19.4',
  '1.19.3',
  '1.19.2',
  '1.19.1',
  '1.19',
  '1.18.2',
  '1.18.1',
  '1.18',
  '1.17.1',
  '1.17',
  '1.16.5',
  '1.16.4',
  '1.16.3',
  '1.16.2',
  '1.16.1',
  '1.16',
  '1.12.2',
]

// 方法
const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = formData.value.tags.indexOf(tag)
  if (index !== -1) {
    formData.value.tags.splice(index, 1)
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0]
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    uploadedFile.value = event.dataTransfer.files[0]
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    ElMessage.error('请填写所有必填项')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // TODO: 替换为实际API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('资源提交成功！等待审核通过后将会上线。')
    router.push('/user/uploads')
  } catch (error) {
    ElMessage.error('提交失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}
</script>
