import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuantitySelector } from '@/components/common/QuantitySelector'

describe('QuantitySelector', () => {
  it('数量が表示される', () => {
    render(<QuantitySelector quantity={3} max={10} onChange={() => {}} />)
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
  })

  it('+ボタンでonChangeが呼ばれる', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantitySelector quantity={1} max={10} onChange={onChange} />)
    await user.click(screen.getByText('+'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('−ボタンでonChangeが呼ばれる', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantitySelector quantity={3} max={10} onChange={onChange} />)
    await user.click(screen.getByText('−'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('最小値で−ボタンが無効化される', () => {
    render(<QuantitySelector quantity={1} max={10} onChange={() => {}} />)
    expect(screen.getByText('−')).toBeDisabled()
  })

  it('最大値で+ボタンが無効化される', () => {
    render(<QuantitySelector quantity={10} max={10} onChange={() => {}} />)
    expect(screen.getByText('+')).toBeDisabled()
  })

  it('カスタムmin値で−ボタンが無効化される', () => {
    render(<QuantitySelector quantity={2} min={2} max={10} onChange={() => {}} />)
    expect(screen.getByText('−')).toBeDisabled()
  })
})
