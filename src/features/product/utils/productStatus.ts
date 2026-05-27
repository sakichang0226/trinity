import type { Product } from '@/features/product/types/product'

export function isProductUnavailable(stock: number, status: Product['status']): boolean {
  return stock === 0 || status === 'S' || status === 'D'
}

export function getUnavailableLabel(status: Product['status']): string {
  return status === 'D' ? '販売終了' : '在庫切れ'
}
