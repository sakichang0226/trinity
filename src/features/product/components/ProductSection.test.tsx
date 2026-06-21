import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductSection } from '@/features/product/components/ProductSection'

const products = [
  { product_id: 1, product_name: '商品A', price: 1000, image_url: '/a.png', rating: 4.0, review_count: 5, description: '', stock: 10, category_id: 1, is_new: false, shop_id: 1, tax_type: 'I' as const, status: 'O' as const, created_at: 1700000000000 },
  { product_id: 2, product_name: '商品B', price: 2000, image_url: '/b.png', rating: 3.5, review_count: 3, description: '', stock: 8, category_id: 1, is_new: false, shop_id: 1, tax_type: 'I' as const, status: 'O' as const, created_at: 1700000000000 },
]

describe('ProductSection', () => {
  it('タイトルが表示される', () => {
    render(<ProductSection title="おすすめ" products={products} isLoading={false} />, { wrapper: MemoryRouter })
    expect(screen.getByText('おすすめ')).toBeInTheDocument()
  })

  it('商品カードが表示される', () => {
    render(<ProductSection title="おすすめ" products={products} isLoading={false} />, { wrapper: MemoryRouter })
    expect(screen.getByText('商品A')).toBeInTheDocument()
    expect(screen.getByText('商品B')).toBeInTheDocument()
  })

  it('ローディング中はスケルトンが表示される', () => {
    const { container } = render(<ProductSection title="おすすめ" products={[]} isLoading={true} />, { wrapper: MemoryRouter })
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(4)
  })

  it('商品が空でローディングでない場合は何も表示しない', () => {
    const { container } = render(<ProductSection title="おすすめ" products={[]} isLoading={false} />, { wrapper: MemoryRouter })
    expect(container).toBeEmptyDOMElement()
  })
})
