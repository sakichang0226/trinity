import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { ApiResult } from '@/types/api'

interface ErrorResponse {
  error_code: string
  message: string
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      withCredentials: true,
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const requestUrl = error.config?.url || ''
          const currentPath = window.location.pathname
          if (currentPath !== '/login' && !requestUrl.includes('/me')) {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private toError(error: unknown): ApiResult<never> {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as ErrorResponse
      return { success: false, errorCode: data.error_code, message: data.message }
    }
    return { success: false, errorCode: null, message: null }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    try {
      const res = await this.client.get<T>(url, config)
      return { success: true, data: res.data }
    } catch (error) {
      return this.toError(error)
    }
  }

  async getRaw<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<{ status: number; data: T }>> {
    try {
      const res = await this.client.get<T>(url, config)
      return { success: true, data: { status: res.status, data: res.data } }
    } catch (error) {
      return this.toError(error)
    }
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    try {
      const res = await this.client.post<T>(url, data, config)
      return { success: true, data: res.data }
    } catch (error) {
      return this.toError(error)
    }
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    try {
      const res = await this.client.put<T>(url, data, config)
      return { success: true, data: res.data }
    } catch (error) {
      return this.toError(error)
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> {
    try {
      const res = await this.client.delete<T>(url, config)
      return { success: true, data: res.data }
    } catch (error) {
      return this.toError(error)
    }
  }
}

export const apiClient = new ApiClient()
