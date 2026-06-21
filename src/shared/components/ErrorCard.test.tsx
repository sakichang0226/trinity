import { render, screen } from '@testing-library/react'
import { ErrorCard } from '@/shared/components/ErrorCard'

describe('ErrorCard', () => {
  it('タイトルが表示される', () => {
    render(<ErrorCard title="エラー" message="問題が発生しました" action={<button>再試行</button>} />)
    expect(screen.getByText('エラー')).toBeInTheDocument()
  })

  it('メッセージが表示される', () => {
    render(<ErrorCard title="エラー" message="問題が発生しました" action={<button>再試行</button>} />)
    expect(screen.getByText('問題が発生しました')).toBeInTheDocument()
  })

  it('アクションが表示される', () => {
    render(<ErrorCard title="エラー" message="問題が発生しました" action={<button>再試行</button>} />)
    expect(screen.getByRole('button', { name: '再試行' })).toBeInTheDocument()
  })
})
