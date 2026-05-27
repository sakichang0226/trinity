import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFoundPage } from '@/features/error/routes/NotFoundPage'

describe('NotFoundPage', () => {
  it('見出しが表示される', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByText('お探しの商品は見つかりませんでした。')).toBeInTheDocument()
  })

  it('説明文が表示される', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByText('削除されたか、URLが間違っている可能性があります。')).toBeInTheDocument()
  })

  it('TOPへ戻るリンクが/を指す', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toHaveAttribute('href', '/')
  })
})
