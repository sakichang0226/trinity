import { render, screen } from '@testing-library/react'
import { LogoutButton } from '@/components/common/LogoutButton'
import { AuthProvider } from '@/contexts/AuthContext'

vi.mock('@/services/userService', () => ({
  fetchMe: vi.fn().mockResolvedValue(null),
}))

describe('LogoutButton', () => {
  it('ログアウトボタンが表示される', () => {
    render(<AuthProvider><LogoutButton /></AuthProvider>)
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
  })
})
