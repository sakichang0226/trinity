import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { AuthProvider } from '@/contexts/AuthContext'

const mockLogin = vi.fn()
const mockFetchMe = vi.fn()

vi.mock('@/services/userService', () => ({
  login: (...args: unknown[]) => mockLogin(...args),
  fetchMe: () => mockFetchMe(),
}))

const renderLoginPage = () => {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<div>TOPページ</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchMe.mockResolvedValue({ success: true, data: null })
  })

  describe('画面表示', () => {
    it('ログインタイトルが表示される', () => {
      renderLoginPage()
      expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument()
    })
  })

  describe('認証成功', () => {
    it('ログイン成功後にTOP画面へ遷移する', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: true, data: { user_name: 'Taro' } })
      mockFetchMe.mockResolvedValue({
        success: true,
        data: { userId: 1, userName: 'Taro', email: 'taro@example.com' },
      })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('TOPページ')).toBeInTheDocument()
      })
    })

    it('ログインAPIにemail/passwordが送信される', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: true, data: { user_name: 'Taro' } })
      mockFetchMe.mockResolvedValue({
        success: true,
        data: { userId: 1, userName: 'Taro', email: 'taro@example.com' },
      })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({ email: 'taro@example.com', password: 'password123' })
      })
    })

    it('refreshUserがnullの場合もTOP画面へ遷移する', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: true, data: { user_name: 'Taro' } })
      mockFetchMe.mockResolvedValue({ success: true, data: null })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('TOPページ')).toBeInTheDocument()
      })
    })
  })

  describe('認証失敗（API_LOGIN_ERR001）', () => {
    it('認証エラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: false, errorCode: 'API_LOGIN_ERR001', message: 'invalid password or email' })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'wrong')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('メールアドレスまたはパスワードが正しくありません')).toBeInTheDocument()
      })
    })

    it('認証エラー時にTOPページに遷移しない', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: false, errorCode: 'API_LOGIN_ERR001', message: 'invalid password or email' })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'wrong')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('メールアドレスまたはパスワードが正しくありません')).toBeInTheDocument()
      })
      expect(screen.queryByText('TOPページ')).not.toBeInTheDocument()
    })
  })

  describe('システムエラー（500/タイムアウト）', () => {
    it('500エラー時にServerErrorPageが表示される', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })
    })

    it('エラーコードがnullの場合もServerErrorPageが表示される', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: false, errorCode: null, message: null })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })
    })

    it('再読み込みボタンでログインフォームに戻る', async () => {
      const user = userEvent.setup()
      mockLogin.mockResolvedValue({ success: false, errorCode: 'API_ERR999', message: 'server error.' })
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
      })

      await user.click(screen.getByText('再読み込み'))
      expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument()
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    })
  })

  describe('ローディング状態', () => {
    it('API呼び出し中にローディング表示になる', async () => {
      const user = userEvent.setup()
      mockLogin.mockReturnValue(new Promise(() => {}))
      renderLoginPage()

      await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))

      expect(screen.getByText('ログイン中...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ログイン中...' })).toBeDisabled()
    })
  })
})
