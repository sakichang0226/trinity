import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Product } from '@/types/product'

vi.mock('@/services/userService', () => ({
  fetchMe: vi.fn().mockResolvedValue({ success: true, data: null }),
}))

const mockFetchProduct = vi.fn()
vi.mock('@/services/productService', () => ({
  fetchProducts: vi.fn().mockResolvedValue({ success: true, data: [] }),
  fetchProduct: (...args: unknown[]) => mockFetchProduct(...args),
}))

const mockProduct: Product = {
  product_id: 1,
  product_name: 'プレミアムコットンTシャツ',
  description: '上質なオーガニックコットン100%使用。肌触りが良く、日常使いに最適です。',
  image_url: 'https://example.com/1.jpg',
  shop_id: 1,
  category_id: 1,
  price: 2480,
  tax_type: 'I',
  rating: 4.0,
  review_count: 12,
  stock: 50,
  status: 'O',
  created_at: 1496918153734,
}

const renderPage = (productId = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    mockFetchProduct.mockReset()
    localStorage.clear()
  })

  describe('パンくずリスト', () => {
    it('「TOP > 商品名」の階層で表示される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('TOP')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('プレミアムコットンTシャツ')
      })
    })

    it('TOPリンクでトップページ（/）へ遷移する', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('TOP').closest('a')).toHaveAttribute('href', '/')
      })
    })
  })

  describe('商品情報エリア', () => {
    beforeEach(() => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
    })

    it('商品名が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('プレミアムコットンTシャツ')
      })
    })

    it('価格（税込）が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText(/¥2,480/)).toBeInTheDocument()
        expect(screen.getByText('（税込）')).toBeInTheDocument()
      })
    })

    it('評価スコア（★表示）が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('★★★★☆')).toBeInTheDocument()
        expect(screen.getByText('(4)')).toBeInTheDocument()
      })
    })

    it('レビュー件数が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('12件のレビュー')).toBeInTheDocument()
      })
    })

    it('商品説明が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('商品説明')).toBeInTheDocument()
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
      })
    })

    it('商品画像が表示される', async () => {
      renderPage()
      await waitFor(() => {
        const img = screen.getByAltText('プレミアムコットンTシャツ')
        expect(img).toHaveAttribute('src', 'https://example.com/1.jpg')
      })
    })
  })

  describe('数量選択', () => {
    beforeEach(() => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
    })

    it('初期値が1で表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      })
    })

    it('+ボタンで数量が増える', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+'))
      expect(screen.getByDisplayValue('2')).toBeInTheDocument()
    })

    it('−ボタンで数量が減る', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+'))
      await user.click(screen.getByText('−'))
      expect(screen.getByDisplayValue('1')).toBeInTheDocument()
    })

    it('最小値1未満にならない', async () => {
      renderPage()
      await waitFor(() => {
        const minusBtn = screen.getByText('−')
        expect(minusBtn).toBeDisabled()
      })
    })

    it('最大数量（在庫数）到達時は+ボタンが無効化される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, stock: 2 } })
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+'))
      expect(screen.getByText('+')).toBeDisabled()
    })
  })

  describe('在庫・ステータス制御', () => {
    it('stock<=5 かつ stock>0 の場合「残りわずか」ラベルが表示される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, stock: 3 } })
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('残りわずか')).toBeInTheDocument()
      })
    })

    it('stock>5 の場合「残りわずか」ラベルが表示されない', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
      renderPage()

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('プレミアムコットンTシャツ')
      })
      expect(screen.queryByText('残りわずか')).not.toBeInTheDocument()
    })

    it('stock=0 の場合ボタンが「在庫切れ」で無効化される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, stock: 0 } })
      renderPage()

      await waitFor(() => {
        const btn = screen.getByText('在庫切れ').closest('button')!
        expect(btn).toBeDisabled()
      })
    })

    it('status=S の場合ボタンが「在庫切れ」で無効化される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, status: 'S' } })
      renderPage()

      await waitFor(() => {
        const btn = screen.getByText('在庫切れ').closest('button')!
        expect(btn).toBeDisabled()
      })
    })

    it('status=D の場合ボタンが「販売終了」で無効化される', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, status: 'D' } })
      renderPage()

      await waitFor(() => {
        const btn = screen.getByText('販売終了').closest('button')!
        expect(btn).toBeDisabled()
      })
    })

    it('在庫切れ時は数量選択が表示されない', async () => {
      mockFetchProduct.mockResolvedValue({ success: true, data: { ...mockProduct, stock: 0 } })
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('在庫切れ')).toBeInTheDocument()
      })
      expect(screen.queryByText('数量:')).not.toBeInTheDocument()
    })
  })

  describe('カート追加・トースト通知', () => {
    beforeEach(() => {
      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
    })

    it('カート追加ボタン押下で成功トーストが表示される', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('カートに追加する')).toBeInTheDocument()
      })

      await user.click(screen.getByText('カートに追加する'))

      await waitFor(() => {
        expect(screen.getByText('カートに追加しました')).toBeInTheDocument()
        expect(screen.getByText('プレミアムコットンTシャツ × 1')).toBeInTheDocument()
      })
    })

    it('数量を変更してカート追加するとトーストに数量が反映される', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByDisplayValue('1')).toBeInTheDocument()
      })

      await user.click(screen.getByText('+'))
      await user.click(screen.getByText('+'))
      await user.click(screen.getByText('カートに追加する'))

      await waitFor(() => {
        expect(screen.getByText('プレミアムコットンTシャツ × 3')).toBeInTheDocument()
      })
    })

    it('カート上限（20種類）到達時にエラートーストが表示される', async () => {
      const cartItems = Array.from({ length: 20 }, (_, i) => ({
        productId: String(i + 100),
        name: `商品${i}`,
        price: 1000,
        quantity: 1,
        image: '',
        stock: 10,
      }))
      localStorage.setItem('cart', JSON.stringify(cartItems))

      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('カートに追加する')).toBeInTheDocument()
      })

      await user.click(screen.getByText('カートに追加する'))

      await waitFor(() => {
        expect(screen.getByText('カートに入れられる商品は20種類までです')).toBeInTheDocument()
      })
    })

    it('トーストの✕ボタンで閉じられる', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('カートに追加する')).toBeInTheDocument()
      })

      await user.click(screen.getByText('カートに追加する'))

      await waitFor(() => {
        expect(screen.getByText('カートに追加しました')).toBeInTheDocument()
      })

      const closeBtn = screen.getByText('カートに追加しました').closest('.toast-anim')!.querySelector('button')!
      await user.click(closeBtn)

      expect(screen.queryByText('カートに追加しました')).not.toBeInTheDocument()
    })

    it('カートはlocalStorageに永続化される', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('カートに追加する')).toBeInTheDocument()
      })

      await user.click(screen.getByText('カートに追加する'))

      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('cart')!)
        expect(stored).toHaveLength(1)
        expect(stored[0].productId).toBe('1')
        expect(stored[0].quantity).toBe(1)
      })
    })
  })

  describe('ローディング状態', () => {
    it('スケルトンが表示される', () => {
      mockFetchProduct.mockReturnValue(new Promise(() => {}))
      renderPage()

      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('エラー表示（404）', () => {
    beforeEach(() => {
      mockFetchProduct.mockResolvedValue({ success: false, errorCode: 'API_ERR004', message: 'data not found.' })
    })

    it('「お探しの商品は見つかりませんでした。」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('お探しの商品は見つかりませんでした。')).toBeInTheDocument()
      })
    })

    it('「削除されたか、URLが間違っている可能性があります。」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('削除されたか、URLが間違っている可能性があります。')).toBeInTheDocument()
      })
    })

    it('「TOPへ戻る」リンクが/へ遷移する', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('TOPへ戻る').closest('a')).toHaveAttribute('href', '/')
      })
    })
  })

  describe('エラー表示（500）', () => {
    beforeEach(() => {
      mockFetchProduct.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })
    })

    it('「エラーが発生しました」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })
    })

    it('「しばらく時間をおいて再度お試しください。」が表示される', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('しばらく時間をおいて再度お試しください。')).toBeInTheDocument()
      })
    })

    it('「再読み込み」ボタンでAPI再リクエストされる', async () => {
      const user = userEvent.setup()
      renderPage()

      await waitFor(() => {
        expect(screen.getByText('再読み込み')).toBeInTheDocument()
      })

      mockFetchProduct.mockResolvedValue({ success: true, data: mockProduct })
      await user.click(screen.getByText('再読み込み'))

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('プレミアムコットンTシャツ')
      })
    })

    it('「TOPへ戻る」リンクが/へ遷移する', async () => {
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('TOPへ戻る').closest('a')).toHaveAttribute('href', '/')
      })
    })
  })
})
