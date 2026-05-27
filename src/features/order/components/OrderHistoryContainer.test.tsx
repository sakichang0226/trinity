import { render, screen } from '@testing-library/react'
import { OrderHistoryContainer } from '@/features/order/components/OrderHistoryContainer'

describe('OrderHistoryContainer', () => {
  it('タイトル「注文履歴」が表示される', () => {
    render(<OrderHistoryContainer><div>子要素</div></OrderHistoryContainer>)
    expect(screen.getByText('注文履歴')).toBeInTheDocument()
  })

  it('子要素が表示される', () => {
    render(<OrderHistoryContainer><div>テスト内容</div></OrderHistoryContainer>)
    expect(screen.getByText('テスト内容')).toBeInTheDocument()
  })
})
