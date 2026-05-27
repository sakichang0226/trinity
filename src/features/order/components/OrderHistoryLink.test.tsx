import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OrderHistoryLink } from '@/features/order/components/OrderHistoryLink'

describe('OrderHistoryLink', () => {
  it('注文履歴リンクが表示される', () => {
    render(<MemoryRouter><OrderHistoryLink /></MemoryRouter>)
    expect(screen.getByText('注文履歴')).toBeInTheDocument()
  })

  it('/ordersへのリンクである', () => {
    render(<MemoryRouter><OrderHistoryLink /></MemoryRouter>)
    expect(screen.getByText('注文履歴').closest('a')).toHaveAttribute('href', '/orders')
  })
})
