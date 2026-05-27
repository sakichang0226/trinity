export interface LoginValidationErrors {
  email?: string
  password?: string
}

export function validateLoginForm(email: string, password: string): LoginValidationErrors {
  const errors: LoginValidationErrors = {}
  if (!email) {
    errors.email = 'メールアドレスを入力してください'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '有効なメールアドレスを入力してください'
  }
  if (!password) {
    errors.password = 'パスワードを入力してください'
  }
  return errors
}
