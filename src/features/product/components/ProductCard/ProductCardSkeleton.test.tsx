import { render } from '@testing-library/react'
import { ProductCardSkeleton } from '@/features/product/components/ProductCard/ProductCardSkeleton'

describe('ProductCardSkeleton', () => {
  it('animate-pulseクラスが適用される', () => {
    const { container } = render(<ProductCardSkeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
