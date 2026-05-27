import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from '@/features/cart/routes/CartPage'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

const mockFetchMe = vi.fn()

vi.mock('@/services/userService', () => ({
  fetchMe: () => mockFetchMe(),
}))

const renderCartPage = async (cartItems: unknown[] = []) => {
  localStorage.setItem('cart', JSON.stringify(cartItems))
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<div>TOPページ</div>} />
              <Route path="/checkout" element={<div>注文確定画面</div>} />
              <Route path="/login" element={<div>ログイン画面</div>} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    )
  })
}

const sampleItems = [
  { productId: 'p1', name: 'Tシャツ', price: 2480, quantity: 2, image: '/img/t.png', stock: 5 },
  { productId: 'p2', name: 'シューズ', price: 6800, quantity: 1, image: '/img/s.png', stock: 3 },
]

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    mockFetchMe.mockResolvedValue({ success: false })
  })

  describe('空カート表示', () => {
    it('カートが空の場合にメッセージが表示される', async () => {
      await renderCartPage()
      expect(screen.getByText('カートに商品がありません')).toBeInTheDocument()
    })

    it('「お買い物を続ける →」リンクが表示される', async () => {
      await renderCartPage()
      expect(screen.getByRole('link', { name: 'お買い物を続ける →' })).toHaveAttribute('href', '/')
    })
  })

  describe('商品リスト表示', () => {
    it('タイトルに件数が表示される', async () => {
      await renderCartPage(sampleItems)
      expect(screen.getByText('(2件)')).toBeInTheDocument()
    })

    it('商品名が表示される', async () => {
      await renderCartPage(sampleItems)
      expect(screen.getByText('Tシャツ')).toBeInTheDocument()
      expect(screen.getByText('シューズ')).toBeInTheDocument()
    })

    it('合計金額が表示される', async () => {
      await renderCartPage(sampleItems)
      expect(screen.getByText('¥11,760')).toBeInTheDocument()
    })
  })

  describe('数量変更', () => {
    it('+ボタンで数量が増加し合計が再計算される', async () => {
      const user = userEvent.setup()
      await renderCartPage([{ productId: 'p1', name: 'Tシャツ', price: 1000, quantity: 1, image: '/img/t.png', stock: 5 }])
      await user.click(screen.getByText('+'))
      expect(screen.getByDisplayValue('2')).toBeInTheDocument()
      expect(screen.getAllByText('¥2,000')).toHaveLength(2)
    })

    it('−ボタンで数量が減少し合計が再計算される', async () => {
      const user = userEvent.setup()
      await renderCartPage([{ productId: 'p1', name: 'Tシャツ', price: 1000, quantity: 3, image: '/img/t.png', stock: 5 }])
      await user.click(screen.getByText('−'))
      expect(screen.getByDisplayValue('2')).toBeInTheDocument()
      expect(screen.getAllByText('¥2,000')).toHaveLength(2)
    })
  })

  describe('商品削除', () => {
    it('削除ボタンで商品が削除される', async () => {
      const user = userEvent.setup()
      await renderCartPage([{ productId: 'p1', name: 'Tシャツ', price: 1000, quantity: 1, image: '/img/t.png', stock: 5 }])
      await user.click(screen.getByTitle('削除'))
      expect(screen.getByText('カートに商品がありません')).toBeInTheDocument()
    })
  })

  describe('注文遷移', () => {
    it('未ログイン時はログイン画面へ遷移する', async () => {
      const user = userEvent.setup()
      mockFetchMe.mockResolvedValue({ success: false })
      await renderCartPage(sampleItems)
      await user.click(screen.getByRole('button', { name: '注文手続きへ進む →' }))
      expect(screen.getByText('ログイン画面')).toBeInTheDocument()
    })

    it('ログイン済みの場合は注文確定画面へ遷移する', async () => {
      const user = userEvent.setup()
      mockFetchMe.mockResolvedValue({ success: true, data: { userId: 1, userName: 'Taro', email: 'taro@example.com' } })
      await renderCartPage(sampleItems)
      await screen.findByRole('button', { name: '注文手続きへ進む →' })
      await user.click(screen.getByRole('button', { name: '注文手続きへ進む →' }))
      expect(screen.getByText('注文確定画面')).toBeInTheDocument()
    })
  })
})
