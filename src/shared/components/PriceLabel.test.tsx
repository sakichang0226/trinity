import { render, screen } from '@testing-library/react'
import { PriceLabel } from '@/shared/components/PriceLabel'

describe('PriceLabel', () => {
  it('価格をカンマ区切りで表示する', () => {
    render(<PriceLabel price={2480} />)
    expect(screen.getByText('¥2,480')).toBeInTheDocument()
  })

  it('デフォルトでbaseサイズ・default色が適用される', () => {
    render(<PriceLabel price={1000} />)
    const el = screen.getByText('¥1,000')
    expect(el).toHaveClass('text-base', 'font-bold', 'text-gray-800')
  })

  it('size="sm"でtext-smが適用される', () => {
    render(<PriceLabel price={1000} size="sm" />)
    expect(screen.getByText('¥1,000')).toHaveClass('text-sm')
  })

  it('size="2xl"でtext-2xlが適用される', () => {
    render(<PriceLabel price={1000} size="2xl" />)
    expect(screen.getByText('¥1,000')).toHaveClass('text-2xl')
  })

  it('size="3xl"でtext-3xlが適用される', () => {
    render(<PriceLabel price={1000} size="3xl" />)
    expect(screen.getByText('¥1,000')).toHaveClass('text-3xl')
  })

  it('color="primary"でtext-brand-700が適用される', () => {
    render(<PriceLabel price={1000} color="primary" />)
    expect(screen.getByText('¥1,000')).toHaveClass('text-brand-700', 'font-bold')
  })

  it('color="muted"でtext-gray-500が適用される', () => {
    render(<PriceLabel price={1000} color="muted" />)
    expect(screen.getByText('¥1,000')).toHaveClass('text-gray-500')
  })

  it('color="secondary"でtext-gray-800がboldなしで適用される', () => {
    render(<PriceLabel price={1000} color="secondary" />)
    const el = screen.getByText('¥1,000')
    expect(el).toHaveClass('text-gray-800')
    expect(el).not.toHaveClass('font-bold')
  })

  it('0円が表示される', () => {
    render(<PriceLabel price={0} />)
    expect(screen.getByText('¥0')).toBeInTheDocument()
  })
})
