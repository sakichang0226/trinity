import { render, screen } from '@testing-library/react'
import { UserLabel } from '@/shared/components/UserLabel'

const mockUseAuth = vi.fn()

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('UserLabel', () => {
  it('ユーザー名が表示される', () => {
    mockUseAuth.mockReturnValue({ user: { userName: 'Taro' } })
    render(<UserLabel />)
    expect(screen.getByText('Taro')).toBeInTheDocument()
  })

  it('userがnullの場合は何も表示しない', () => {
    mockUseAuth.mockReturnValue({ user: null })
    const { container } = render(<UserLabel />)
    expect(container).toBeEmptyDOMElement()
  })
})
