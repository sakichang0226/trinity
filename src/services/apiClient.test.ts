import { apiClient } from '@/services/apiClient'

// apiClientはaxiosのインスタンスを内部で持っているため、
// axiosモックではなく実際のHTTPリクエストをインターセプトするのが確実。
// ただしmswを入れていないので、apiClientの公開メソッドを直接テストする代わりに
// シンプルなユニットテストとして、productService/userServiceのテストでカバーする。

// apiClient単体テストはserviceレイヤーのテストで間接的にカバーされているため、
// ここでは削除してもよいが、将来msw導入時のプレースホルダーとして残す。

describe('apiClient', () => {
  it('apiClientがexportされている', () => {
    expect(apiClient).toBeDefined()
    expect(apiClient.get).toBeInstanceOf(Function)
    expect(apiClient.post).toBeInstanceOf(Function)
    expect(apiClient.put).toBeInstanceOf(Function)
    expect(apiClient.delete).toBeInstanceOf(Function)
  })
})
