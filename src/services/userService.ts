import { apiClient } from '@/services/apiClient'
import type { ApiResult } from '@/types/api'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user_name: string
}

export async function login(data: LoginRequest): Promise<ApiResult<LoginResponse>> {
  return apiClient.post<LoginResponse>('/api/v1/login', data)
}

interface MeResponse {
  user_id: number
  user_name: string
  email: string
}

export interface UserInfo {
  userId: number
  userName: string
  email: string
}

export async function fetchMe(): Promise<ApiResult<UserInfo | null>> {
  const result = await apiClient.getRaw<MeResponse>('/api/v1/me')
  if (!result.success) return result
  if (result.data.status === 204) return { success: true, data: null }
  const d = result.data.data
  return {
    success: true,
    data: { userId: d.user_id, userName: d.user_name, email: d.email },
  }
}
