import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartIcon } from '@/features/cart/components/CartIcon'

const mockUseCart = vi.fn()

vi.mock('@/contexts/CartContext', () => ({
  useCart: () => mockUseCart(),
}))

describe('CartIcon', () => {
  it('カートリンクが/cartを指す', () => {
    mockUseCart.mockReturnValue({ items: [] })
    render(<CartIcon />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cart')
  })

  it('カートが空の場合バッジが表示されない', () => {
    mockUseCart.mockReturnValue({ items: [] })
    render(<CartIcon />, { wrapper: MemoryRouter })
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument()
  })

  it('カートにアイテムがある場合バッジに件数が表示される', () => {
    mockUseCart.mockReturnValue({ items: [{ productId: '1' }, { productId: '2' }, { productId: '3' }] })
    render(<CartIcon />, { wrapper: MemoryRouter })
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
