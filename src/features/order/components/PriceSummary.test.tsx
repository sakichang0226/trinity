import { render, screen } from '@testing-library/react'
import { PriceSummary } from '@/features/order/components/PriceSummary'

describe('PriceSummary', () => {
  it('小計が表示される', () => {
    render(<PriceSummary subtotal={5000} shipping={500} />)
    expect(screen.getByText('小計')).toBeInTheDocument()
    expect(screen.getByText('¥5,000')).toBeInTheDocument()
  })

  it('送料が表示される', () => {
    render(<PriceSummary subtotal={5000} shipping={500} />)
    expect(screen.getByText('送料')).toBeInTheDocument()
    expect(screen.getByText('¥500')).toBeInTheDocument()
  })

  it('合計（税込）が表示される', () => {
    render(<PriceSummary subtotal={5000} shipping={500} />)
    expect(screen.getByText('合計（税込）')).toBeInTheDocument()
    expect(screen.getByText('¥5,500')).toBeInTheDocument()
  })

  it('送料デフォルトは0', () => {
    render(<PriceSummary subtotal={3000} />)
    expect(screen.getByText('¥0')).toBeInTheDocument()
    expect(screen.getAllByText('¥3,000')).toHaveLength(2)
  })
})
