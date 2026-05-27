import { getOrders } from '@/services/orderService'
import { apiClient } from '@/services/apiClient'

vi.mock('@/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

const mockGet = vi.mocked(apiClient.get)

describe('getOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lastOrderIdなしで/api/v1/ordersを呼ぶ', async () => {
    mockGet.mockResolvedValue({ success: true, data: { orders: [], last_order_id: null } })
    await getOrders()
    expect(mockGet).toHaveBeenCalledWith('/api/v1/orders', { params: undefined })
  })

  it('lastOrderIdありでクエリパラメータを渡す', async () => {
    mockGet.mockResolvedValue({ success: true, data: { orders: [], last_order_id: null } })
    await getOrders(1005)
    expect(mockGet).toHaveBeenCalledWith('/api/v1/orders', { params: { lastOrderId: 1005 } })
  })

  it('成功時にレスポンスデータを返す', async () => {
    const data = { orders: [{ order_id: 1 }], last_order_id: null }
    mockGet.mockResolvedValue({ success: true, data })
    const result = await getOrders()
    expect(result).toEqual({ success: true, data })
  })

  it('失敗時にエラー情報を返す', async () => {
    mockGet.mockResolvedValue({ success: false, errorCode: null, message: null })
    const result = await getOrders()
    expect(result).toEqual({ success: false, errorCode: null, message: null })
  })
})
