import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginLink } from '@/features/auth/components/LoginLink'

describe('LoginLink', () => {
  it('ログインリンクが表示される', () => {
    render(<MemoryRouter><LoginLink /></MemoryRouter>)
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })

  it('/loginへのリンクである', () => {
    render(<MemoryRouter><LoginLink /></MemoryRouter>)
    expect(screen.getByText('ログイン').closest('a')).toHaveAttribute('href', '/login')
  })
})
