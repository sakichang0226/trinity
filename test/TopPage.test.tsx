import '@testing-library/jest-dom'
import { jest } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TopPage } from '@/pages/TopPage'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Product } from '@/types/product'

jest.mock('@/services/apiClient', () => ({
  apiClient: { get: jest.fn<any>(), post: jest.fn<any>() },
}))

jest.mock('@/services/userService', () => ({
  fetchMe: jest.fn<any>().mockRejectedValue(new Error('mock')),
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
  describe('ヒーローバナー', () => {
    beforeEach(() => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })
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
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })

      renderTopPage()

      await waitFor(() => {
        expect(screen.getByText('プレミアムコットンTシャツ')).toBeInTheDocument()
        expect(screen.getByText('ランニングシューズ')).toBeInTheDocument()
      })
    })

    it('API成功時に価格が表示される', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })

      renderTopPage()

      await waitFor(() => {
        expect(screen.getByText('¥2,480')).toBeInTheDocument()
        expect(screen.getByText('¥6,800')).toBeInTheDocument()
      })
    })

    it('API成功時に商品カードが商品詳細へのリンクになっている', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })

      renderTopPage()

      await waitFor(() => {
        const link = screen.getByText('プレミアムコットンTシャツ').closest('a')
        expect(link).toHaveAttribute('href', '/products/1')
      })
    })

    it('API失敗時にセクションが非表示になる（トルツメ）', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })

      renderTopPage()

      await waitFor(() => {
        expect(screen.queryByText('おすすめ商品')).not.toBeInTheDocument()
      })
    })

    it('ローディング中はスケルトンが4件表示される', () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockReturnValue(new Promise(() => {}))

      renderTopPage()

      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('新着商品セクション', () => {
    it('API成功時にNEWバッジが表示される', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })

      renderTopPage()

      await waitFor(() => {
        const badges = screen.getAllByText('NEW')
        expect(badges.length).toBeGreaterThan(0)
      })
    })

    it('新着商品では評価（★）が表示されない', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: true, data: mockProducts })

      renderTopPage()

      await waitFor(() => {
        expect(screen.getByText('新着商品')).toBeInTheDocument()
      })

      const newSection = screen.getByText('新着商品').closest('section')
      expect(newSection?.textContent).not.toContain('★')
    })

    it('API失敗時にセクションが非表示になる（トルツメ）', async () => {
      const { fetchProducts } = require('@/services/productService')
      ;(fetchProducts as jest.Mock).mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })

      renderTopPage()

      await waitFor(() => {
        expect(screen.queryByText('新着商品')).not.toBeInTheDocument()
      })
    })
  })
})
