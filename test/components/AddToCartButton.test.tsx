import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddToCartButton } from '@/components/common/AddToCartButton'

describe('AddToCartButton', () => {
  it('有効時に「カートに追加する」が表示される', () => {
    render(<AddToCartButton onClick={() => {}} disabled={false} />)
    expect(screen.getByText('カートに追加する')).toBeInTheDocument()
    expect(screen.getByText('カートに追加する')).not.toBeDisabled()
  })

  it('有効時にクリックでonClickが呼ばれる', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<AddToCartButton onClick={onClick} disabled={false} />)
    await user.click(screen.getByText('カートに追加する'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('無効時にボタンがdisabledになる', () => {
    render(<AddToCartButton onClick={() => {}} disabled={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('無効時にデフォルトで「在庫切れ」が表示される', () => {
    render(<AddToCartButton onClick={() => {}} disabled={true} />)
    expect(screen.getByText('在庫切れ')).toBeInTheDocument()
  })

  it('無効時にlabelを指定すると表示が変わる', () => {
    render(<AddToCartButton onClick={() => {}} disabled={true} label="販売終了" />)
    expect(screen.getByText('販売終了')).toBeInTheDocument()
  })
})
