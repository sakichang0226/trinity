import { apiClient } from './apiClient'
import type { ApiResult } from '@/types/api'

interface OrderRequest {
  products: { product_id: number; quantity: number }[]
}


export interface OrderDetail {
  order_id: number
  created_at: number
  total: number
  delivery_status: string
  details: {
    detail_id: number
    product_id: number
    product_name: string
    price: number
    order_num: number
    total: number
  }[]
}

export interface OrdersResponse {
  last_order_id: number | null
  orders: OrderDetail[]
}

export async function createOrder(products: OrderRequest['products']): Promise<ApiResult<void>> {
  return apiClient.post<void>('/api/v1/orders', { products })
}

export async function getOrders(lastOrderId?: number): Promise<ApiResult<OrdersResponse>> {
  const params = lastOrderId ? { lastOrderId } : undefined
  return apiClient.get<OrdersResponse>('/api/v1/orders', { params })
}
