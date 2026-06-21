import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BackToTopLink } from '@/features/error/components/BackToTopLink'

describe('BackToTopLink', () => {
  it('「TOPへ戻る」リンクが表示される', () => {
    render(<BackToTopLink />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toBeInTheDocument()
  })

  it('リンクが/を指す', () => {
    render(<BackToTopLink />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: /TOPへ戻る/ })).toHaveAttribute('href', '/')
  })
})
