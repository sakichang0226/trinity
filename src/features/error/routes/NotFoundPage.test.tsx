import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NotFoundPage } from '@/features/error/routes/NotFoundPage'

describe('NotFoundPage', () => {
  it('デフォルトの見出しが表示される', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByText('お探しのページは見つかりませんでした。')).toBeInTheDocument()
  })

  it('デフォルトの説明文が表示される', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByText('削除されたか、URLが間違っている可能性があります。')).toBeInTheDocument()
  })

  it('propsで渡したメッセージが表示される', () => {
    render(<NotFoundPage title="お探しの商品は見つかりませんでした。" description="商品が存在しません。" />, { wrapper: MemoryRouter })
    expect(screen.getByText('お探しの商品は見つかりませんでした。')).toBeInTheDocument()
    expect(screen.getByText('商品が存在しません。')).toBeInTheDocument()
  })

  it('TOPへ戻るリンクが/を指す', () => {
    render(<NotFoundPage />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toHaveAttribute('href', '/')
  })
})
