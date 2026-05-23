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

export async function fetchMe(): Promise<UserInfo | null> {
  const res = await apiClient.getRaw<MeResponse>('/api/v1/me')
  if (res.status === 204) return null
  const data = res.data
  return {
    userId: data.user_id,
    userName: data.user_name,
    email: data.email,
  }
}
