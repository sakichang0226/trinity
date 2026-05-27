import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoadMoreButton } from '@/shared/components/LoadMoreButton'

describe('LoadMoreButton', () => {
  it('通常時「もっと見る」が表示される', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={false} />)
    expect(screen.getByText('もっと見る')).toBeInTheDocument()
  })

  it('ローディング中は「読み込み中...」が表示される', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={true} />)
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    expect(screen.queryByText('もっと見る')).not.toBeInTheDocument()
  })

  it('ローディング中はボタンがdisabledになる', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('通常時はボタンがdisabledでない', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={false} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('クリックでonClickが呼ばれる', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LoadMoreButton onClick={onClick} isLoading={false} />)
    await user.click(screen.getByText('もっと見る'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('ローディング中はクリックしてもonClickが呼ばれない', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LoadMoreButton onClick={onClick} isLoading={true} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('「10件ずつ表示されます」が表示される', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={false} />)
    expect(screen.getByText('10件ずつ表示されます')).toBeInTheDocument()
  })
})
