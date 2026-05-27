import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

const mockUseAuth = vi.fn()

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}))

const renderWithGuard = (initialEntries = ['/protected']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/protected" element={<AuthGuard><div>保護コンテンツ</div></AuthGuard>} />
        <Route path="/login" element={<div>ログイン画面</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('AuthGuard', () => {
  it('認証済みの場合は子要素を表示する', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, isLoading: false })
    renderWithGuard()
    expect(screen.getByText('保護コンテンツ')).toBeInTheDocument()
  })

  it('未認証の場合は/loginへリダイレクトする', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: false })
    renderWithGuard()
    expect(screen.getByText('ログイン画面')).toBeInTheDocument()
  })

  it('ローディング中は何も表示しない', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: true })
    const { container } = renderWithGuard()
    expect(container).toBeEmptyDOMElement()
  })
})
