import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { OrderHistoryPage } from '@/pages/OrderHistoryPage'

const mockGetOrders = vi.fn()

vi.mock('@/services/orderService', () => ({
  getOrders: (...args: unknown[]) => mockGetOrders(...args),
}))

const sampleOrders = [
  {
    order_id: 1001,
    created_at: new Date('2025-01-01').getTime(),
    total: 13740,
    delivery_status: 'ED',
    details: [
      { detail_id: 1, product_id: 1, product_name: 'プレミアムコットンTシャツ', price: 2480, order_num: 2, total: 4960 },
      { detail_id: 2, product_id: 2, product_name: 'ランニングシューズ', price: 6800, order_num: 1, total: 6800 },
    ],
  },
  {
    order_id: 1002,
    created_at: new Date('2024-12-25').getTime(),
    total: 1980,
    delivery_status: 'PR',
    details: [
      { detail_id: 3, product_id: 3, product_name: 'UVカットキャップ', price: 1980, order_num: 1, total: 1980 },
    ],
  },
]

const renderPage = () => {
  return render(
    <MemoryRouter>
      <OrderHistoryPage />
    </MemoryRouter>
  )
}

describe('OrderHistoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ローディング状態', () => {
    it('API応答前にスケルトンが表示される', () => {
      mockGetOrders.mockReturnValue(new Promise(() => {}))
      renderPage()
      expect(screen.getByText('注文履歴')).toBeInTheDocument()
      expect(screen.queryByText('もっと見る')).not.toBeInTheDocument()
    })
  })

  describe('注文一覧表示', () => {
    beforeEach(() => {
      mockGetOrders.mockResolvedValue({
        success: true,
        data: { orders: sampleOrders, last_order_id: null },
      })
    })

    it('タイトル「注文履歴」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文履歴')).toBeInTheDocument()
      })
    })

    it('注文番号が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
        expect(screen.getByText('注文番号: 1002')).toBeInTheDocument()
      })
    })

    it('注文日が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('2025/01/01')).toBeInTheDocument()
        expect(screen.getByText('2024/12/25')).toBeInTheDocument()
      })
    })

    it('合計金額が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('¥13,740')).toBeInTheDocument()
        expect(screen.getByText('¥1,980')).toBeInTheDocument()
      })
    })

    it('配送済みステータスが緑バッジで表示される', async () => {
      renderPage()
      await waitFor(() => {
        const badge = screen.getByText('配送済み')
        expect(badge).toHaveClass('bg-green-100', 'text-green-700')
      })
    })

    it('処理中ステータスが青バッジで表示される', async () => {
      renderPage()
      await waitFor(() => {
        const badge = screen.getByText('処理中')
        expect(badge).toHaveClass('bg-blue-100', 'text-blue-700')
      })
    })

    it('lastOrderIdがnullの場合「もっと見る」ボタンが表示されない', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      expect(screen.queryByText('もっと見る')).not.toBeInTheDocument()
    })
  })

  describe('アコーディオン展開', () => {
    beforeEach(() => {
      mockGetOrders.mockResolvedValue({
        success: true,
        data: { orders: sampleOrders, last_order_id: null },
      })
    })

    it('初期状態で明細が非表示である', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      expect(screen.queryByText('プレミアムコットンTシャツ × 2')).not.toBeInTheDocument()
    })

    it('トグルクリックで明細が展開される', async () => {
      const user = userEvent.setup()
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      await user.click(screen.getByText('注文番号: 1001'))
      await waitFor(() => {
        expect(screen.getByText('プレミアムコットンTシャツ × 2')).toBeInTheDocument()
        expect(screen.getByText('ランニングシューズ × 1')).toBeInTheDocument()
      })
    })

    it('明細に小計が表示される', async () => {
      const user = userEvent.setup()
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      await user.click(screen.getByText('注文番号: 1001'))
      await waitFor(() => {
        expect(screen.getByText('¥4,960')).toBeInTheDocument()
        expect(screen.getByText('¥6,800')).toBeInTheDocument()
      })
    })

    it('複数の注文を同時に展開できる', async () => {
      const user = userEvent.setup()
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      await user.click(screen.getByText('注文番号: 1001'))
      await user.click(screen.getByText('注文番号: 1002'))
      await waitFor(() => {
        expect(screen.getByText('プレミアムコットンTシャツ × 2')).toBeInTheDocument()
        expect(screen.getByText('UVカットキャップ × 1')).toBeInTheDocument()
      })
    })
  })

  describe('ページネーション', () => {
    it('lastOrderIdがある場合「もっと見る」ボタンが表示される', async () => {
      mockGetOrders.mockResolvedValue({
        success: true,
        data: { orders: sampleOrders, last_order_id: 1002 },
      })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
    })

    it('「もっと見る」クリックでlastOrderIdを渡してAPIが呼ばれる', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockResolvedValueOnce({
          success: true,
          data: { orders: [{ ...sampleOrders[0], order_id: 1003 }], last_order_id: null },
        })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      expect(mockGetOrders).toHaveBeenCalledWith(1002)
    })

    it('追加読み込み後に新しい注文がリストに追加される', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockResolvedValueOnce({
          success: true,
          data: {
            orders: [{ ...sampleOrders[0], order_id: 1003, total: 5000 }],
            last_order_id: null,
          },
        })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1003')).toBeInTheDocument()
      })
    })

    it('追加読み込み後にlastOrderIdがnullなら「もっと見る」が消える', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockResolvedValueOnce({
          success: true,
          data: { orders: [], last_order_id: null },
        })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      await waitFor(() => {
        expect(screen.queryByText('もっと見る')).not.toBeInTheDocument()
      })
    })

    it('読み込み中はローディング状態が表示される', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockReturnValueOnce(new Promise(() => {}))
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    })
  })

  describe('追加読み込みエラー', () => {
    it('失敗時に既存リストが保持される', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockResolvedValueOnce({ success: false, errorCode: null, message: null })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
        expect(screen.getByText('注文番号: 1002')).toBeInTheDocument()
      })
    })

    it('失敗時にエラートーストが表示される', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: 1002 },
        })
        .mockResolvedValueOnce({ success: false, errorCode: null, message: null })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('もっと見る')).toBeInTheDocument()
      })
      await user.click(screen.getByText('もっと見る'))
      await waitFor(() => {
        expect(screen.getByText('読み込みに失敗しました')).toBeInTheDocument()
        expect(screen.getByText('時間をおいて再度お試しください')).toBeInTheDocument()
      })
    })
  })

  describe('空表示', () => {
    beforeEach(() => {
      mockGetOrders.mockResolvedValue({
        success: true,
        data: { orders: [], last_order_id: null },
      })
    })

    it('「注文履歴がありません」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('注文履歴がありません')).toBeInTheDocument()
      })
    })

    it('「お買い物をはじめる →」リンクが/へ遷移する', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByRole('link', { name: 'お買い物をはじめる →' })).toHaveAttribute('href', '/')
      })
    })
  })

  describe('エラー表示（500）', () => {
    beforeEach(() => {
      mockGetOrders.mockResolvedValue({ success: false, errorCode: null, message: null })
    })

    it('「エラーが発生しました」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })
    })

    it('「再読み込み」ボタンでAPIが再リクエストされる', async () => {
      const user = userEvent.setup()
      mockGetOrders
        .mockResolvedValueOnce({ success: false, errorCode: null, message: null })
        .mockResolvedValueOnce({
          success: true,
          data: { orders: sampleOrders, last_order_id: null },
        })
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })
      await user.click(screen.getByText('再読み込み'))
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
      expect(mockGetOrders).toHaveBeenCalledTimes(2)
    })

    it('「TOPへ戻る」リンクが/へ遷移する', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toHaveAttribute('href', '/')
      })
    })
  })
})
