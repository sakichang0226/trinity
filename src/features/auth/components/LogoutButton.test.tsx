import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LogoutButton } from '@/features/auth/components/LogoutButton'
import { AuthProvider } from '@/contexts/AuthContext'

vi.mock('@/services/userService', () => ({
  fetchMe: vi.fn().mockResolvedValue({ success: true, data: null }),
}))

describe('LogoutButton', () => {
  it('ログアウトボタンが表示される', () => {
    render(
      <MemoryRouter>
        <AuthProvider><LogoutButton /></AuthProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
  })
})
