import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from '@/features/product/components/ProductCard'

const product = {
  product_id: 1,
  product_name: 'テスト商品',
  price: 2480,
  image_url: '/img/test.png',
  rating: 4.5,
  review_count: 10,
  description: '',
  stock: 5,
  category_id: 1,
  is_new: false,
  shop_id: 1,
  tax_type: 'I' as const,
  status: 'O' as const,
  created_at: 1700000000000,
}

describe('ProductCard', () => {
  it('商品名が表示される', () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter })
    expect(screen.getByText('テスト商品')).toBeInTheDocument()
  })

  it('価格が表示される', () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter })
    expect(screen.getByText('¥2,480')).toBeInTheDocument()
  })

  it('商品詳細ページへのリンクが設定される', () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/1')
  })

  it('isNew=trueの場合NEWバッジが表示される', () => {
    render(<ProductCard product={product} isNew />, { wrapper: MemoryRouter })
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  it('isNew=falseの場合レビュー数が表示される', () => {
    render(<ProductCard product={product} />, { wrapper: MemoryRouter })
    expect(screen.getByText('(10)')).toBeInTheDocument()
  })
})
