import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:8080',
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

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.get<T>(url, config)
    return res.data
  }

  async getRaw<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.post<T>(url, data, config)
    return res.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.put<T>(url, data, config)
    return res.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.delete<T>(url, config)
    return res.data
  }
}

export const apiClient = new ApiClient()
