import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartItemCard } from '@/features/cart/components/CartItemCard'
import type { CartItem } from '@/contexts/CartContext'

const mockItem: CartItem = {
  productId: 'p1',
  name: 'プレミアムコットンTシャツ',
  price: 2480,
  quantity: 2,
  image: '/images/tshirt.png',
  stock: 5,
}

describe('CartItemCard', () => {
  it('商品名が表示される', () => {
    render(<CartItemCard item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('プレミアムコットンTシャツ')).toBeInTheDocument()
  })

  it('単価が表示される', () => {
    render(<CartItemCard item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('¥2,480')).toBeInTheDocument()
  })

  it('小計（単価×数量）が表示される', () => {
    render(<CartItemCard item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('¥4,960')).toBeInTheDocument()
  })

  it('数量が表示される', () => {
    render(<CartItemCard item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })

  it('+ボタンでonUpdateQuantityが呼ばれる', async () => {
    const onUpdateQuantity = vi.fn()
    const user = userEvent.setup()
    render(<CartItemCard item={mockItem} onUpdateQuantity={onUpdateQuantity} onRemove={() => {}} />)
    await user.click(screen.getByText('+'))
    expect(onUpdateQuantity).toHaveBeenCalledWith('p1', 3)
  })

  it('−ボタンでonUpdateQuantityが呼ばれる', async () => {
    const onUpdateQuantity = vi.fn()
    const user = userEvent.setup()
    render(<CartItemCard item={mockItem} onUpdateQuantity={onUpdateQuantity} onRemove={() => {}} />)
    await user.click(screen.getByText('−'))
    expect(onUpdateQuantity).toHaveBeenCalledWith('p1', 1)
  })

  it('最大数量で+ボタンが無効化される', () => {
    const item = { ...mockItem, quantity: 5 }
    render(<CartItemCard item={item} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('+')).toBeDisabled()
  })

  it('数量1で−ボタンが無効化される', () => {
    const item = { ...mockItem, quantity: 1 }
    render(<CartItemCard item={item} onUpdateQuantity={() => {}} onRemove={() => {}} />)
    expect(screen.getByText('−')).toBeDisabled()
  })

  it('削除ボタンでonRemoveが呼ばれる', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<CartItemCard item={mockItem} onUpdateQuantity={() => {}} onRemove={onRemove} />)
    await user.click(screen.getByTitle('削除'))
    expect(onRemove).toHaveBeenCalledWith('p1')
  })
})
