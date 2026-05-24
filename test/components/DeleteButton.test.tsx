import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DeleteButton } from '@/components/common/DeleteButton'

describe('DeleteButton', () => {
  it('削除ボタンが表示される', () => {
    render(<DeleteButton onClick={() => {}} />)
    expect(screen.getByTitle('削除')).toBeInTheDocument()
  })

  it('クリックでonClickが呼ばれる', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<DeleteButton onClick={onClick} />)
    await user.click(screen.getByTitle('削除'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
