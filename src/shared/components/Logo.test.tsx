import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Logo } from '@/shared/components/Logo'

describe('Logo', () => {
  it('ロゴ画像が表示される', () => {
    render(<Logo />, { wrapper: MemoryRouter })
    expect(screen.getByRole('img', { name: 'SUNABA' })).toBeInTheDocument()
  })

  it('リンクが/を指す', () => {
    render(<Logo />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
