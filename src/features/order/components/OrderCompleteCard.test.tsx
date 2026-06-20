import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OrderCompleteCard } from '@/features/order/components/OrderCompleteCard'

describe('OrderCompleteCard', () => {
  it('「注文が完了しました！」が表示される', () => {
    render(<OrderCompleteCard />, { wrapper: MemoryRouter })
    expect(screen.getByText('注文が完了しました！')).toBeInTheDocument()
  })

  it('確認メール送信メッセージが表示される', () => {
    render(<OrderCompleteCard />, { wrapper: MemoryRouter })
    expect(screen.getByText('確認メールをお送りしました')).toBeInTheDocument()
  })

  it('「TOPへ戻る」リンクが/を指す', () => {
    render(<OrderCompleteCard />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'TOPへ戻る' })).toHaveAttribute('href', '/')
  })

  it('「注文履歴を見る」リンクが/ordersを指す', () => {
    render(<OrderCompleteCard />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: '注文履歴を見る' })).toHaveAttribute('href', '/orders')
  })
})
