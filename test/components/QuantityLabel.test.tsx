import { render, screen } from '@testing-library/react'
import { QuantityLabel } from '@/components/common/QuantityLabel'

describe('QuantityLabel', () => {
  it('商品名×数量を表示する', () => {
    render(<QuantityLabel name="Tシャツ" quantity={2} />)
    expect(screen.getByText('Tシャツ × 2')).toBeInTheDocument()
  })

  it('数量1でも正しく表示される', () => {
    render(<QuantityLabel name="シューズ" quantity={1} />)
    expect(screen.getByText('シューズ × 1')).toBeInTheDocument()
  })

  it('大きい数量でも正しく表示される', () => {
    render(<QuantityLabel name="ペン" quantity={100} />)
    expect(screen.getByText('ペン × 100')).toBeInTheDocument()
  })
})
