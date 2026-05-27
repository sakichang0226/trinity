import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EmptyState } from '@/shared/components/EmptyState'

const renderEmptyState = (props = {}) => {
  const defaultProps = {
    icon: <span data-testid="icon">📋</span>,
    message: 'データがありません',
    linkTo: '/',
    linkLabel: 'TOPへ戻る',
  }
  return render(
    <MemoryRouter>
      <EmptyState {...defaultProps} {...props} />
    </MemoryRouter>
  )
}

describe('EmptyState', () => {
  it('アイコンが表示される', () => {
    renderEmptyState()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('メッセージが表示される', () => {
    renderEmptyState({ message: '注文履歴がありません' })
    expect(screen.getByText('注文履歴がありません')).toBeInTheDocument()
  })

  it('リンクラベルが表示される', () => {
    renderEmptyState({ linkLabel: 'お買い物をはじめる →' })
    expect(screen.getByText('お買い物をはじめる →')).toBeInTheDocument()
  })

  it('リンクが正しいhrefを持つ', () => {
    renderEmptyState({ linkTo: '/shop', linkLabel: '買い物する' })
    expect(screen.getByRole('link', { name: '買い物する' })).toHaveAttribute('href', '/shop')
  })
})
