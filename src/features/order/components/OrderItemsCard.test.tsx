import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OrderItemsCard } from '@/features/order/components/OrderItemsCard'

const sampleItems = [
  { productId: '1', name: 'Tシャツ', price: 2480, quantity: 2, image: '/img/t.png' },
  { productId: '2', name: 'シューズ', price: 6800, quantity: 1, image: '/img/s.png' },
]

describe('OrderItemsCard', () => {
  it('商品名が表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('Tシャツ')).toBeInTheDocument()
    expect(screen.getByText('シューズ')).toBeInTheDocument()
  })

  it('数量が表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('× 2')).toBeInTheDocument()
    expect(screen.getByText('× 1')).toBeInTheDocument()
  })

  it('各商品の小計が表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('¥4,960')).toBeInTheDocument()
    expect(screen.getByText('¥6,800')).toBeInTheDocument()
  })

  it('合計金額が表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getAllByText('¥11,760')).toHaveLength(2)
  })

  it('送料¥0が表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('送料')).toBeInTheDocument()
    expect(screen.getByText('¥0')).toBeInTheDocument()
  })

  it('小計ラベルが表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('小計')).toBeInTheDocument()
  })

  it('合計（税込）ラベルが表示される', () => {
    render(<OrderItemsCard items={sampleItems} totalPrice={11760} />, { wrapper: MemoryRouter })
    expect(screen.getByText('合計（税込）')).toBeInTheDocument()
  })
})
