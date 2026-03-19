// API请求组合式函数
import { ref } from 'vue'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export function useApi() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const request = async <T>(url: string, options: ApiOptions = {}): Promise<T | null> => {
    isLoading.value = true
    error.value = null

    try {
      const { method = 'GET', body, headers = {} } = options

      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 500))

      // 这里应该替换为实际的API请求
      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...headers,
      //   },
      //   body: body ? JSON.stringify(body) : undefined,
      // })
      // 
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }
      // 
      // return await response.json()

      return null
    } catch (e: any) {
      error.value = e.message || '请求失败'
      return null
    } finally {
      isLoading.value = false
    }
  }

  const get = <T>(url: string, headers?: Record<string, string>) => {
    return request<T>(url, { method: 'GET', headers })
  }

  const post = <T>(url: string, body?: any, headers?: Record<string, string>) => {
    return request<T>(url, { method: 'POST', body, headers })
  }

  const put = <T>(url: string, body?: any, headers?: Record<string, string>) => {
    return request<T>(url, { method: 'PUT', body, headers })
  }

  const del = <T>(url: string, headers?: Record<string, string>) => {
    return request<T>(url, { method: 'DELETE', headers })
  }

  return {
    isLoading,
    error,
    request,
    get,
    post,
    put,
    del,
  }
}
