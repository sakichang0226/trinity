import { apiClient } from '@/services/apiClient'

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

export async function fetchMe(): Promise<UserInfo> {
  const data = await apiClient.get<MeResponse>('/api/v1/me')
  return {
    userId: data.user_id,
    userName: data.user_name,
    email: data.email,
  }
}
