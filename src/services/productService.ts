import { apiClient } from './apiClient'
import type { Product } from '@/types/product'
import type { ApiResult } from '@/types/api'

interface ProductsResponse {
  products: Product[]
}

export async function fetchProducts(productIds: number[]): Promise<ApiResult<Product[]>> {
  const ids = productIds.join(',')
  const result = await apiClient.get<ProductsResponse>(`/api/v1/products?product_ids=${ids}`)
  if (!result.success) return result
  return { success: true, data: result.data.products }
}

export async function fetchProduct(productId: string): Promise<ApiResult<Product>> {
  return apiClient.get<Product>(`/api/v1/products/${productId}`)
}
