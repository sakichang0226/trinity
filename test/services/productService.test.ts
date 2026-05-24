import { jest, describe, it, expect, beforeEach } from '@jest/globals'

const mockGet = jest.fn<any>()
jest.unstable_mockModule('@/services/apiClient', () => ({
  apiClient: { get: mockGet },
}))

const { fetchProducts } = await import('@/services/productService')

describe('fetchProducts', () => {
  beforeEach(() => { mockGet.mockReset() })

  it('成功時に商品リストを返す', async () => {
    mockGet.mockResolvedValue({
      success: true,
      data: { products: [{ id: 1, name: 'Product A' }] },
    })
    const result = await fetchProducts([1])
    expect(result).toEqual({ success: true, data: [{ id: 1, name: 'Product A' }] })
    expect(mockGet).toHaveBeenCalledWith('/api/v1/products?product_ids=1')
  })

  it('複数IDをカンマ区切りで送信する', async () => {
    mockGet.mockResolvedValue({ success: true, data: { products: [] } })
    await fetchProducts([1, 2, 3])
    expect(mockGet).toHaveBeenCalledWith('/api/v1/products?product_ids=1,2,3')
  })

  it('APIエラー時にエラー結果をそのまま返す', async () => {
    const error = { success: false, errorCode: 'API_ERR999', message: 'Server Error' }
    mockGet.mockResolvedValue(error)
    const result = await fetchProducts([1])
    expect(result).toEqual(error)
  })
})
