import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Breadcrumb } from '@/features/product/components/Breadcrumb'

describe('Breadcrumb', () => {
  it('TOPリンクが表示される', () => {
    render(<MemoryRouter><Breadcrumb productName="テスト商品" /></MemoryRouter>)
    expect(screen.getByText('TOP')).toBeInTheDocument()
    expect(screen.getByText('TOP').closest('a')).toHaveAttribute('href', '/')
  })

  it('商品名が表示される', () => {
    render(<MemoryRouter><Breadcrumb productName="テスト商品" /></MemoryRouter>)
    expect(screen.getByText('テスト商品')).toBeInTheDocument()
  })

  it('区切り文字>が表示される', () => {
    render(<MemoryRouter><Breadcrumb productName="テスト商品" /></MemoryRouter>)
    expect(screen.getByText('>')).toBeInTheDocument()
  })
})
