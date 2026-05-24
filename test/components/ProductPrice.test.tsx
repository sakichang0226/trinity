import { render, screen } from '@testing-library/react'
import { ProductPrice } from '@/components/common/ProductPrice'

describe('ProductPrice', () => {
  it('価格をカンマ区切りで表示する', () => {
    render(<ProductPrice price={2480} />)
    expect(screen.getByText(/¥2,480/)).toBeInTheDocument()
  })

  it('（税込）が表示される', () => {
    render(<ProductPrice price={1000} />)
    expect(screen.getByText('（税込）')).toBeInTheDocument()
  })
})
