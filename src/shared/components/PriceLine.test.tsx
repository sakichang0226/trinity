import { render, screen } from '@testing-library/react'
import { PriceLine } from '@/shared/components/PriceLine'

describe('PriceLine', () => {
  it('ラベルが表示される', () => {
    render(<PriceLine label="送料" price={500} />)
    expect(screen.getByText('送料')).toBeInTheDocument()
  })

  it('価格が表示される', () => {
    render(<PriceLine label="送料" price={500} />)
    expect(screen.getByText('¥500')).toBeInTheDocument()
  })
})
