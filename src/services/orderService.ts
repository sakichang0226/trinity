import { apiClient } from './apiClient'
import type { ApiResult } from '@/types/api'

interface OrderRequest {
  products: { product_id: number; quantity: number }[]
}

interface OrderResponse {
  order_id: number
}

export async function createOrder(products: OrderRequest['products']): Promise<ApiResult<OrderResponse>> {
  return apiClient.post<OrderResponse>('/api/v1/orders', { products })
}
