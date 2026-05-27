import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { CheckoutPage } from '@/features/order/routes/CheckoutPage'

const mockCreateOrder = vi.fn()
const mockFetchMe = vi.fn()

vi.mock('@/services/orderService', () => ({
  createOrder: (...args: unknown[]) => mockCreateOrder(...args),
}))

vi.mock('@/services/userService', () => ({
  fetchMe: () => mockFetchMe(),
}))

const sampleItems = [
  { productId: '1', name: 'Tシャツ', price: 2480, quantity: 2, image: '/img/t.png', stock: 5 },
  { productId: '2', name: 'シューズ', price: 6800, quantity: 1, image: '/img/s.png', stock: 3 },
]

const renderCheckoutPage = (cartItems = sampleItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems))
  return render(
    <MemoryRouter initialEntries={['/checkout']}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<div>カート画面</div>} />
            <Route path="/" element={<div>TOPページ</div>} />
            <Route path="/orders" element={<div>注文履歴画面</div>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    mockFetchMe.mockResolvedValue({ success: true, data: { userId: 1, userName: 'Taro', email: 'taro@example.com' } })
  })

  describe('注文明細表示', () => {
    it('タイトル「注文内容の確認」が表示される', () => {
      renderCheckoutPage()
      expect(screen.getByText('注文内容の確認')).toBeInTheDocument()
    })

    it('商品名が表示される', () => {
      renderCheckoutPage()
      expect(screen.getByText('Tシャツ')).toBeInTheDocument()
      expect(screen.getByText('シューズ')).toBeInTheDocument()
    })

    it('数量が表示される', () => {
      renderCheckoutPage()
      expect(screen.getByText('× 2')).toBeInTheDocument()
      expect(screen.getByText('× 1')).toBeInTheDocument()
    })

    it('各商品の小計が表示される', () => {
      renderCheckoutPage()
      expect(screen.getByText('¥4,960')).toBeInTheDocument()
      expect(screen.getByText('¥6,800')).toBeInTheDocument()
    })

    it('合計金額が表示される', () => {
      renderCheckoutPage()
      expect(screen.getAllByText('¥11,760')).toHaveLength(2)
    })

    it('送料¥0が表示される', () => {
      renderCheckoutPage()
      expect(screen.getByText('送料')).toBeInTheDocument()
      expect(screen.getByText('¥0')).toBeInTheDocument()
    })
  })

  describe('カートが空の場合', () => {
    it('カート画面へリダイレクトされる', () => {
      renderCheckoutPage([])
      expect(screen.queryByText('注文内容の確認')).not.toBeInTheDocument()
    })
  })

  describe('注文確定', () => {
    it('「注文を確定する」ボタンが表示される', () => {
      renderCheckoutPage()
      expect(screen.getByRole('button', { name: '注文を確定する' })).toBeInTheDocument()
    })

    it('ボタン押下でローディング状態になる', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockReturnValue(new Promise(() => {}))
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      expect(screen.getByText('処理中...')).toBeInTheDocument()
    })

    it('注文APIにproduct_id(数値)とquantityが送信される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      expect(mockCreateOrder).toHaveBeenCalledWith([
        { product_id: 1, quantity: 2 },
        { product_id: 2, quantity: 1 },
      ])
    })

    it('注文成功時に完了画面が表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('注文が完了しました！')).toBeInTheDocument()
      })
    })

    it('注文成功時に注文番号が表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
      })
    })

    it('注文成功時にカートがクリアされる', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(JSON.parse(localStorage.getItem('cart') || '[]')).toEqual([])
      })
    })
  })

  describe('注文完了表示', () => {
    it('「TOPへ戻る」リンクが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByRole('link', { name: 'TOPへ戻る' })).toHaveAttribute('href', '/')
      })
    })

    it('「注文履歴を見る」リンクが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 1001 } })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByRole('link', { name: '注文履歴を見る' })).toHaveAttribute('href', '/orders')
      })
    })
  })

  describe('注文エラー（商品起因）', () => {
    it('API_ORDER_ERR001のメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ORDER_ERR001', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('カート内の商品が見つかりませんでした。商品が削除された可能性があります。')).toBeInTheDocument()
      })
    })

    it('API_ORDER_ERR002のメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ORDER_ERR002', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('カート内に現在購入できない商品が含まれています。')).toBeInTheDocument()
      })
    })

    it('API_ORDER_ERR003のメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ORDER_ERR003', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('在庫が不足している商品があります。数量をご確認ください。')).toBeInTheDocument()
      })
    })

    it('商品起因エラー時に「カートへ戻る」リンクが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ORDER_ERR001', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /カートへ戻る/ })).toHaveAttribute('href', '/cart')
      })
    })

    it('エラー表示中も注文明細が表示されたままである', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ORDER_ERR001', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('注文内容の確認')).toBeInTheDocument()
        expect(screen.getByText('Tシャツ')).toBeInTheDocument()
      })
    })
  })

  describe('注文エラー（システムエラー）', () => {
    it('システムエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('システムエラーが発生しました。しばらく時間をおいて再度お試しください。')).toBeInTheDocument()
      })
    })

    it('不明なエラーコードでもシステムエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: null, message: null })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByText('システムエラーが発生しました。しばらく時間をおいて再度お試しください。')).toBeInTheDocument()
      })
    })

    it('「もう一度試す」ボタンが表示される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /もう一度試す/ })).toBeInTheDocument()
      })
    })

    it('「もう一度試す」ボタンで注文APIが再実行される', async () => {
      const user = userEvent.setup()
      mockCreateOrder.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: '' })
      renderCheckoutPage()
      await user.click(screen.getByRole('button', { name: '注文を確定する' }))
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /もう一度試す/ })).toBeInTheDocument()
      })
      mockCreateOrder.mockResolvedValue({ success: true, data: { order_id: 2002 } })
      await user.click(screen.getByRole('button', { name: /もう一度試す/ }))
      await waitFor(() => {
        expect(screen.getByText('注文が完了しました！')).toBeInTheDocument()
      })
    })
  })
})
