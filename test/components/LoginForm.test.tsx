import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/LoginForm'

const defaultProps = {
  onSubmit: vi.fn(),
  authError: '',
  isLoading: false,
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('フォーム表示', () => {
    it('メールアドレス入力欄が表示される', () => {
      render(<LoginForm {...defaultProps} />)
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    })

    it('パスワード入力欄が表示される', () => {
      render(<LoginForm {...defaultProps} />)
      expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    })

    it('ログインボタンが表示される', () => {
      render(<LoginForm {...defaultProps} />)
      expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
    })
  })

  describe('パスワード表示切替', () => {
    it('初期状態ではパスワードが非表示（type=password）', () => {
      render(<LoginForm {...defaultProps} />)
      expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password')
    })

    it('表示ボタンクリックでパスワードが表示される（type=text）', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.click(screen.getByLabelText('パスワードを表示'))
      expect(screen.getByPlaceholderText('パスワードを入力')).toHaveAttribute('type', 'text')
    })
  })

  describe('バリデーション', () => {
    it('メールアドレス空でsubmit時にエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument()
    })

    it('メールアドレス不正形式でsubmit時にエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.type(screen.getByLabelText('メールアドレス'), 'invalid')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(screen.getByText('有効なメールアドレスを入力してください')).toBeInTheDocument()
    })

    it('パスワード空でsubmit時にエラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument()
    })

    it('バリデーションエラー時はonSubmitが呼ばれない', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(defaultProps.onSubmit).not.toHaveBeenCalled()
    })

    it('エラー時に入力欄が赤枠になる', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(screen.getByLabelText('メールアドレス')).toHaveClass('border-red-400')
      expect(screen.getByLabelText('パスワード')).toHaveClass('border-red-400')
    })
  })

  describe('フォーム送信', () => {
    it('正常入力でsubmit時にonSubmitが呼ばれる', async () => {
      const user = userEvent.setup()
      render(<LoginForm {...defaultProps} />)
      await user.type(screen.getByLabelText('メールアドレス'), 'test@example.com')
      await user.type(screen.getByLabelText('パスワード'), 'password123')
      await user.click(screen.getByRole('button', { name: 'ログイン' }))
      expect(defaultProps.onSubmit).toHaveBeenCalledWith('test@example.com', 'password123')
    })
  })

  describe('認証エラー表示', () => {
    it('authErrorが渡された場合にエラーメッセージが表示される', () => {
      render(<LoginForm {...defaultProps} authError="メールアドレスまたはパスワードが正しくありません" />)
      expect(screen.getByText('メールアドレスまたはパスワードが正しくありません')).toBeInTheDocument()
    })

    it('authErrorが空の場合はエラーメッセージが表示されない', () => {
      render(<LoginForm {...defaultProps} />)
      expect(screen.queryByText('メールアドレスまたはパスワードが正しくありません')).not.toBeInTheDocument()
    })
  })

  describe('ローディング状態', () => {
    it('isLoading時にボタンが「ログイン中...」になる', () => {
      render(<LoginForm {...defaultProps} isLoading={true} />)
      expect(screen.getByText('ログイン中...')).toBeInTheDocument()
    })

    it('isLoading時にボタンがdisabledになる', () => {
      render(<LoginForm {...defaultProps} isLoading={true} />)
      expect(screen.getByRole('button', { name: 'ログイン中...' })).toBeDisabled()
    })
  })
})
