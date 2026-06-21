import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginFormField } from '@/features/auth/components/LoginFormField'

describe('LoginFormField', () => {
  describe('共通', () => {
    it('ラベルが表示される', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" />)
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    })

    it('エラーがない場合はエラーメッセージが表示されない', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" />)
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
    })

    it('エラーがある場合はエラーメッセージが表示される', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" error="必須です" />)
      expect(screen.getByText('必須です')).toBeInTheDocument()
    })

    it('エラーがある場合は入力欄が赤枠になる', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" error="必須です" />)
      expect(screen.getByLabelText('メールアドレス')).toHaveClass('border-danger-400')
    })

    it('エラーがない場合は通常の枠線になる', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" />)
      expect(screen.getByLabelText('メールアドレス')).toHaveClass('border-gray-300')
    })
  })

  describe('テキスト入力', () => {
    it('type="email"の場合パスワード切替ボタンが表示されない', () => {
      render(<LoginFormField id="email" label="メールアドレス" type="email" />)
      expect(screen.queryByLabelText('パスワードを表示')).not.toBeInTheDocument()
    })
  })

  describe('パスワード入力', () => {
    it('初期状態ではtype="password"で表示される', () => {
      render(<LoginFormField id="pw" label="パスワード" type="password" />)
      expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password')
    })

    it('パスワード表示切替ボタンが表示される', () => {
      render(<LoginFormField id="pw" label="パスワード" type="password" />)
      expect(screen.getByLabelText('パスワードを表示')).toBeInTheDocument()
    })

    it('切替ボタンクリックでtype="text"に変わる', async () => {
      const user = userEvent.setup()
      render(<LoginFormField id="pw" label="パスワード" type="password" />)
      await user.click(screen.getByLabelText('パスワードを表示'))
      expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'text')
    })

    it('再度クリックでtype="password"に戻る', async () => {
      const user = userEvent.setup()
      render(<LoginFormField id="pw" label="パスワード" type="password" />)
      await user.click(screen.getByLabelText('パスワードを表示'))
      await user.click(screen.getByLabelText('パスワードを非表示'))
      expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password')
    })
  })
})
