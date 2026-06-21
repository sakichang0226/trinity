import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ServerErrorPage } from '@/features/error/routes/ServerErrorPage'

describe('ServerErrorPage', () => {
  const onRetry = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('見出しが表示される', () => {
    render(<ServerErrorPage onRetry={onRetry} />, { wrapper: MemoryRouter })
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
  })

  it('説明文が表示される', () => {
    render(<ServerErrorPage onRetry={onRetry} />, { wrapper: MemoryRouter })
    expect(screen.getByText('しばらく時間をおいて再度お試しください。')).toBeInTheDocument()
  })

  it('再読み込みボタンが表示される', () => {
    render(<ServerErrorPage onRetry={onRetry} />, { wrapper: MemoryRouter })
    expect(screen.getByRole('button', { name: /再読み込み/ })).toBeInTheDocument()
  })

  it('再読み込みボタンクリックでonRetryが呼ばれる', async () => {
    const user = userEvent.setup()
    render(<ServerErrorPage onRetry={onRetry} />, { wrapper: MemoryRouter })
    await user.click(screen.getByRole('button', { name: /再読み込み/ }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('TOPへ戻るリンクが/を指す', () => {
    render(<ServerErrorPage onRetry={onRetry} />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toHaveAttribute('href', '/')
  })
})
