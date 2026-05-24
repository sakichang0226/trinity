import { render, screen } from '@testing-library/react'
import { LowStockLabel } from '@/components/common/LowStockLabel'

describe('LowStockLabel', () => {
  it('stock<=5 かつ stock>0 で「残りわずか」が表示される', () => {
    render(<LowStockLabel stock={3} />)
    expect(screen.getByText('残りわずか')).toBeInTheDocument()
  })

  it('stock=5 で「残りわずか」が表示される', () => {
    render(<LowStockLabel stock={5} />)
    expect(screen.getByText('残りわずか')).toBeInTheDocument()
  })

  it('stock=0 で何も表示されない', () => {
    const { container } = render(<LowStockLabel stock={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('stock>5 で何も表示されない', () => {
    const { container } = render(<LowStockLabel stock={6} />)
    expect(container).toBeEmptyDOMElement()
  })
})
