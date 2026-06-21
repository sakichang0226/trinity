import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from '@/shared/components/Toast'

describe('Toast', () => {
  it('成功トーストのメッセージが表示される', () => {
    render(<Toast toast={{ type: 'success', message: 'カートに追加しました', sub: 'Tシャツ × 1' }} onClose={() => {}} />)
    expect(screen.getByText('カートに追加しました')).toBeInTheDocument()
    expect(screen.getByText('Tシャツ × 1')).toBeInTheDocument()
  })

  it('エラートーストのメッセージが表示される', () => {
    render(<Toast toast={{ type: 'error', message: 'エラーです' }} onClose={() => {}} />)
    expect(screen.getByText('エラーです')).toBeInTheDocument()
  })

  it('subが未指定の場合サブテキストが表示されない', () => {
    render(<Toast toast={{ type: 'success', message: 'テスト' }} onClose={() => {}} />)
    const container = screen.getByText('テスト').parentElement
    expect(container?.children).toHaveLength(1)
  })

  it('✕ボタンでonCloseが呼ばれる', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Toast toast={{ type: 'success', message: 'テスト' }} onClose={onClose} />)
    const closeBtn = screen.getByText('テスト').closest('.toast-anim')!.querySelector('button')!
    await user.click(closeBtn)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
