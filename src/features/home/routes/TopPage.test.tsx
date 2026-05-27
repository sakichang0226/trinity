import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TopPage } from '@/features/home/routes/TopPage'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Product } from '@/features/product/types/product'

vi.mock('@/services/userService', () => ({
  fetchMe: vi.fn().mockResolvedValue({ success: true, data: null }),
}))

const mockFetchProducts = vi.fn()
vi.mock('@/services/productService', () => ({
  fetchProducts: (...args: unknown[]) => mockFetchProducts(...args),
}))

const mockProducts: Product[] = [
  {
    product_id: 1,
    product_name: 'プレミアムコットンTシャツ',
    description: 'テスト説明',
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
  },
  {
    product_id: 2,
    product_name: 'ランニングシューズ',
    description: 'テスト説明2',
    image_url: 'https://example.com/2.jpg',
    shop_id: 1,
    category_id: 2,
    price: 6800,
    tax_type: 'I',
    rating: 4.5,
    review_count: 45,
    stock: 30,
    status: 'O',
    created_at: 1496918153734,
  },
]

const renderTopPage = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <TopPage />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('TopPage', () => {
  beforeEach(() => {
    mockFetchProducts.mockReset()
  })

  describe('ヒーローバナー', () => {
    beforeEach(() => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
    })

    it('バナーのタイトルが表示される', () => {
      renderTopPage()
      expect(screen.getByText('夏のセール開催中！')).toBeInTheDocument()
    })

    it('CTAボタンが表示される', () => {
      renderTopPage()
      expect(screen.getByText('詳しく見る →')).toBeInTheDocument()
    })

    it('ページインジケーターが3つ表示される', () => {
      renderTopPage()
      const indicators = screen.getAllByRole('button').filter(
        btn => btn.className.includes('rounded-full') && btn.className.includes('w-3')
      )
      expect(indicators).toHaveLength(3)
    })
  })

  describe('おすすめ商品セクション', () => {
    it('API成功時に商品名が表示される', async () => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
      renderTopPage()

      await waitFor(() => {
        expect(screen.getAllByText('プレミアムコットンTシャツ').length).toBeGreaterThan(0)
        expect(screen.getAllByText('ランニングシューズ').length).toBeGreaterThan(0)
      })
    })

    it('API成功時に価格が表示される', async () => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
      renderTopPage()

      await waitFor(() => {
        expect(screen.getAllByText('¥2,480').length).toBeGreaterThan(0)
        expect(screen.getAllByText('¥6,800').length).toBeGreaterThan(0)
      })
    })

    it('API成功時に商品カードが商品詳細へのリンクになっている', async () => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
      renderTopPage()

      await waitFor(() => {
        const links = screen.getAllByText('プレミアムコットンTシャツ').map(el => el.closest('a'))
        expect(links[0]).toHaveAttribute('href', '/products/1')
      })
    })

    it('API失敗時にセクションが非表示になる（トルツメ）', async () => {
      mockFetchProducts.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })
      renderTopPage()

      await waitFor(() => {
        expect(screen.queryByText('おすすめ商品')).not.toBeInTheDocument()
      })
    })

    it('ローディング中はスケルトンが表示される', () => {
      mockFetchProducts.mockReturnValue(new Promise(() => {}))
      renderTopPage()

      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('新着商品セクション', () => {
    it('API成功時にNEWバッジが表示される', async () => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
      renderTopPage()

      await waitFor(() => {
        const badges = screen.getAllByText('NEW')
        expect(badges.length).toBeGreaterThan(0)
      })
    })

    it('新着商品では評価（★）が表示されない', async () => {
      mockFetchProducts.mockResolvedValue({ success: true, data: mockProducts })
      renderTopPage()

      await waitFor(() => {
        expect(screen.getByText('新着商品')).toBeInTheDocument()
      })

      const newSection = screen.getByText('新着商品').closest('section')
      expect(newSection?.textContent).not.toContain('★')
    })

    it('API失敗時にセクションが非表示になる（トルツメ）', async () => {
      mockFetchProducts.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })
      renderTopPage()

      await waitFor(() => {
        expect(screen.queryByText('新着商品')).not.toBeInTheDocument()
      })
    })
  })
})
