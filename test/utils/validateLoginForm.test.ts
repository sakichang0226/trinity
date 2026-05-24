import { validateLoginForm } from '@/utils/validateLoginForm'

describe('validateLoginForm', () => {
  it('メールアドレスが空の場合エラーを返す', () => {
    const errors = validateLoginForm('', 'password123')
    expect(errors.email).toBe('メールアドレスを入力してください')
  })

  it('メールアドレスが不正な形式の場合エラーを返す', () => {
    const errors = validateLoginForm('invalid-email', 'password123')
    expect(errors.email).toBe('有効なメールアドレスを入力してください')
  })

  it('パスワードが空の場合エラーを返す', () => {
    const errors = validateLoginForm('test@example.com', '')
    expect(errors.password).toBe('パスワードを入力してください')
  })

  it('両方空の場合は両方のエラーを返す', () => {
    const errors = validateLoginForm('', '')
    expect(errors.email).toBe('メールアドレスを入力してください')
    expect(errors.password).toBe('パスワードを入力してください')
  })

  it('正常な入力の場合は空オブジェクトを返す', () => {
    const errors = validateLoginForm('test@example.com', 'password123')
    expect(errors).toEqual({})
  })
})
