import { render, screen } from '@testing-library/react'
import { OrderNumberLabel } from '@/features/order/components/OrderNumberLabel'

describe('OrderNumberLabel', () => {
  it('注文番号が表示される', () => {
    render(<OrderNumberLabel orderId={1001} />)
    expect(screen.getByText('注文番号: 1001')).toBeInTheDocument()
  })
})
