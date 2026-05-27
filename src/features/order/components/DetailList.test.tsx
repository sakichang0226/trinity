import { render, screen } from '@testing-library/react'
import { DetailList } from '@/features/order/components/DetailList'

const rows = [
  { key: 1, name: 'Tシャツ', quantity: 2, price: 4960 },
  { key: 2, name: 'シューズ', quantity: 1, price: 6800 },
]

describe('DetailList', () => {
  it('商品名と数量が表示される', () => {
    render(<DetailList rows={rows} />)
    expect(screen.getByText('Tシャツ × 2')).toBeInTheDocument()
    expect(screen.getByText('シューズ × 1')).toBeInTheDocument()
  })

  it('価格が表示される', () => {
    render(<DetailList rows={rows} />)
    expect(screen.getByText('¥4,960')).toBeInTheDocument()
    expect(screen.getByText('¥6,800')).toBeInTheDocument()
  })
})
