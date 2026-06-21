import { render, screen } from '@testing-library/react'
import { OrderSummary } from '@/features/order/components/OrderSummary'

describe('OrderSummary', () => {
  it('合計（税込）ラベルが表示される', () => {
    render(<OrderSummary totalPrice={13740} />)
    expect(screen.getByText('合計（税込）')).toBeInTheDocument()
  })

  it('合計金額がカンマ区切りで表示される', () => {
    render(<OrderSummary totalPrice={13740} />)
    expect(screen.getByText('¥13,740')).toBeInTheDocument()
  })

  it('0円が表示される', () => {
    render(<OrderSummary totalPrice={0} />)
    expect(screen.getByText('¥0')).toBeInTheDocument()
  })
})
