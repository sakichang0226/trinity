const mockGetRaw = vi.fn()
const mockPost = vi.fn()
vi.mock('@/services/apiClient', () => ({
  apiClient: { get: vi.fn(), getRaw: mockGetRaw, post: mockPost },
}))

const { fetchMe, login } = await import('@/services/userService')

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
})

describe('login', () => {
  beforeEach(() => { mockPost.mockReset() })

  it('成功時にuser_nameを含むレスポンスを返す', async () => {
    mockPost.mockResolvedValue({ success: true, data: { user_name: 'Taro' } })
    const result = await login({ email: 'taro@example.com', password: 'pass' })
    expect(result).toEqual({ success: true, data: { user_name: 'Taro' } })
    expect(mockPost).toHaveBeenCalledWith('/api/v1/login', { email: 'taro@example.com', password: 'pass' })
  })

  it('認証失敗時にエラーを返す', async () => {
    const error = { success: false, errorCode: 'API_LOGIN_ERR001', message: 'invalid password or email' }
    mockPost.mockResolvedValue(error)
    const result = await login({ email: 'taro@example.com', password: 'wrong' })
    expect(result).toEqual(error)
  })

  it('サーバーエラー時にエラーを返す', async () => {
    const error = { success: false, errorCode: 'API_ERR999', message: 'server error.' }
    mockPost.mockResolvedValue(error)
    const result = await login({ email: 'taro@example.com', password: 'pass' })
    expect(result).toEqual(error)
  })
})
