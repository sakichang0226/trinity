import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/shared/components/Button'

describe('Button', () => {
  it('子要素が表示される', () => {
    render(<Button>テスト</Button>)
    expect(screen.getByRole('button', { name: 'テスト' })).toBeInTheDocument()
  })

  it('デフォルトでprimaryバリアントが適用される', () => {
    render(<Button>テスト</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-brand-600')
  })

  it('variant=outlineでoutlineスタイルが適用される', () => {
    render(<Button variant="outline">テスト</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-white', 'border')
  })

  it('size=smで小さいサイズが適用される', () => {
    render(<Button size="sm">テスト</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-5', 'py-2.5', 'text-sm')
  })

  it('クリックでonClickが呼ばれる', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>テスト</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('disabled時にクリックできない', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick} disabled>テスト</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
