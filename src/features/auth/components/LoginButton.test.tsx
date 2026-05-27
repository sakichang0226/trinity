import { render, screen } from '@testing-library/react'
import { LoginButton } from '@/features/auth/components/LoginButton'

describe('LoginButton', () => {
  it('通常時に「ログイン」と表示される', () => {
    render(<LoginButton isLoading={false} />)
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  it('ローディング時に「ログイン中...」と表示される', () => {
    render(<LoginButton isLoading={true} />)
    expect(screen.getByText('ログイン中...')).toBeInTheDocument()
  })

  it('ローディング時にボタンがdisabledになる', () => {
    render(<LoginButton isLoading={true} />)
    expect(screen.getByRole('button', { name: 'ログイン中...' })).toBeDisabled()
  })
})
