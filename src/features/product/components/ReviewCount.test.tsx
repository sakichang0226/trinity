import { render, screen } from '@testing-library/react'
import { ReviewCount } from '@/features/product/components/ReviewCount'

describe('ReviewCount', () => {
  it('レビュー件数が表示される', () => {
    render(<ReviewCount count={12} />)
    expect(screen.getByText('12件のレビュー')).toBeInTheDocument()
  })

  it('0件でも表示される', () => {
    render(<ReviewCount count={0} />)
    expect(screen.getByText('0件のレビュー')).toBeInTheDocument()
  })
})
