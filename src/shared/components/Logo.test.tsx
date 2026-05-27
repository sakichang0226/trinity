import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Logo } from '@/shared/components/Logo'

describe('Logo', () => {
  it('「EC Store」テキストが表示される', () => {
    render(<Logo />, { wrapper: MemoryRouter })
    expect(screen.getByText('EC Store')).toBeInTheDocument()
  })

  it('リンクが/を指す', () => {
    render(<Logo />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
