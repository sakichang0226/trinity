import { jest, describe, it, expect, beforeEach } from '@jest/globals'

const mockGetRaw = jest.fn<any>()
jest.unstable_mockModule('@/services/apiClient', () => ({
  apiClient: { getRaw: mockGetRaw },
}))

const { fetchMe } = await import('@/services/userService')

describe('fetchMe', () => {
  beforeEach(() => { mockGetRaw.mockReset() })

  it('成功時にUserInfoを返す', async () => {
    mockGetRaw.mockResolvedValue({
      success: true,
      data: { status: 200, data: { user_id: 1, user_name: 'Taro', email: 'taro@example.com' } },
    })
    const result = await fetchMe()
    expect(result).toEqual({
      success: true,
      data: { userId: 1, userName: 'Taro', email: 'taro@example.com' },
    })
  })

  it('204の場合はnullを返す', async () => {
    mockGetRaw.mockResolvedValue({
      success: true,
      data: { status: 204, data: null },
    })
    const result = await fetchMe()
    expect(result).toEqual({ success: true, data: null })
  })

  it('APIエラー時にエラー結果をそのまま返す', async () => {
    const error = { success: false, errorCode: 'API_ERR999', message: 'Server Error' }
    mockGetRaw.mockResolvedValue(error)
    const result = await fetchMe()
    expect(result).toEqual(error)
  })

  it('ネットワークエラー時にnullエラーを返す', async () => {
    mockGetRaw.mockResolvedValue({ success: false, errorCode: null, message: null })
    const result = await fetchMe()
    expect(result).toEqual({ success: false, errorCode: null, message: null })
  })
})
