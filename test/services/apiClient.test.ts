import { jest, describe, it, expect, beforeEach } from '@jest/globals'

const mockAxiosGet = jest.fn<any>()
const mockAxiosPost = jest.fn<any>()
const mockAxiosPut = jest.fn<any>()
const mockAxiosDelete = jest.fn<any>()
const mockIsAxiosError = jest.fn<any>()

jest.unstable_mockModule('axios', () => ({
  default: {
    create: () => ({
      get: mockAxiosGet,
      post: mockAxiosPost,
      put: mockAxiosPut,
      delete: mockAxiosDelete,
      interceptors: { response: { use: jest.fn() } },
    }),
    isAxiosError: (...args: unknown[]) => mockIsAxiosError(...args),
  },
}))

const { apiClient } = await import('@/services/apiClient')

describe('apiClient', () => {
  beforeEach(() => {
    mockAxiosGet.mockReset()
    mockAxiosPost.mockReset()
    mockAxiosPut.mockReset()
    mockAxiosDelete.mockReset()
    mockIsAxiosError.mockReset()
  })

  describe('get', () => {
    it('成功時にdata付きのApiResultを返す', async () => {
      mockAxiosGet.mockResolvedValue({ data: { id: 1 } })
      const result = await apiClient.get('/test')
      expect(result).toEqual({ success: true, data: { id: 1 } })
    })

    it('4xx/5xxエラー時にerrorCode・messageを返す', async () => {
      const error = { response: { data: { error_code: 'API_ERR001', message: 'Not Found' } } }
      mockAxiosGet.mockRejectedValue(error)
      mockIsAxiosError.mockReturnValue(true)
      const result = await apiClient.get('/test')
      expect(result).toEqual({ success: false, errorCode: 'API_ERR001', message: 'Not Found' })
    })

    it('ネットワークエラー時にnullを返す', async () => {
      mockAxiosGet.mockRejectedValue(new Error('Network Error'))
      mockIsAxiosError.mockReturnValue(false)
      const result = await apiClient.get('/test')
      expect(result).toEqual({ success: false, errorCode: null, message: null })
    })
  })

  describe('getRaw', () => {
    it('成功時にstatus・data付きのApiResultを返す', async () => {
      mockAxiosGet.mockResolvedValue({ status: 200, data: { name: 'test' } })
      const result = await apiClient.getRaw('/test')
      expect(result).toEqual({ success: true, data: { status: 200, data: { name: 'test' } } })
    })
  })

  describe('post', () => {
    it('成功時にdata付きのApiResultを返す', async () => {
      mockAxiosPost.mockResolvedValue({ data: { created: true } })
      const result = await apiClient.post('/test', { name: 'x' })
      expect(result).toEqual({ success: true, data: { created: true } })
    })

    it('エラー時にerrorCode・messageを返す', async () => {
      const error = { response: { data: { error_code: 'API_ERR400', message: 'Bad Request' } } }
      mockAxiosPost.mockRejectedValue(error)
      mockIsAxiosError.mockReturnValue(true)
      const result = await apiClient.post('/test', {})
      expect(result).toEqual({ success: false, errorCode: 'API_ERR400', message: 'Bad Request' })
    })
  })

  describe('put', () => {
    it('成功時にdata付きのApiResultを返す', async () => {
      mockAxiosPut.mockResolvedValue({ data: { updated: true } })
      const result = await apiClient.put('/test', { name: 'y' })
      expect(result).toEqual({ success: true, data: { updated: true } })
    })
  })

  describe('delete', () => {
    it('成功時にdata付きのApiResultを返す', async () => {
      mockAxiosDelete.mockResolvedValue({ data: { deleted: true } })
      const result = await apiClient.delete('/test')
      expect(result).toEqual({ success: true, data: { deleted: true } })
    })
  })
})
