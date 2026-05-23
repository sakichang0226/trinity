import '@testing-library/jest-dom'
import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { LogoutButton } from '@/components/common/LogoutButton'
import { AuthProvider } from '@/contexts/AuthContext'

jest.mock('@/services/apiClient', () => ({
  apiClient: { get: jest.fn(), post: jest.fn() },
}))

jest.mock('@/services/userService', () => ({
  fetchMe: jest.fn().mockRejectedValue(new Error('mock')),
}))

describe('LogoutButton', () => {
  it('ログアウトボタンが表示される', () => {
    render(
      <AuthProvider>
        <LogoutButton />
      </AuthProvider>
    )
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
  })
})
