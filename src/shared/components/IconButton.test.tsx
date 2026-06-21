import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from '@/shared/components/IconButton'

describe('IconButton', () => {
  it('aria-labelが設定される', () => {
    render(<IconButton icon={<span>×</span>} label="閉じる" />)
    expect(screen.getByRole('button', { name: '閉じる' })).toBeInTheDocument()
  })

  it('クリックでonClickが呼ばれる', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<IconButton icon={<span>×</span>} label="閉じる" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
