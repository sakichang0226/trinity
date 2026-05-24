import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubmitButton } from '@/components/common/SubmitButton'

describe('SubmitButton', () => {
  describe('通常状態', () => {
    it('ラベルが表示される', () => {
      render(<SubmitButton label="送信" />)
      expect(screen.getByText('送信')).toBeInTheDocument()
    })

    it('ボタンが有効である', () => {
      render(<SubmitButton label="送信" />)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    it('クリックでonClickが呼ばれる', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<SubmitButton label="送信" onClick={onClick} />)
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('アイコンが表示される', () => {
      render(<SubmitButton label="送信" icon={<span data-testid="icon">★</span>} />)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
  })

  describe('ローディング状態', () => {
    it('loadingLabelが表示される', () => {
      render(<SubmitButton label="送信" loadingLabel="送信中..." isLoading />)
      expect(screen.getByText('送信中...')).toBeInTheDocument()
    })

    it('loadingLabel未指定時はlabelが表示される', () => {
      render(<SubmitButton label="送信" isLoading />)
      expect(screen.getByText('送信')).toBeInTheDocument()
    })

    it('ボタンがdisabledになる', () => {
      render(<SubmitButton label="送信" isLoading />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('スピナーが表示される', () => {
      render(<SubmitButton label="送信" isLoading />)
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })
  })

  describe('disabled状態', () => {
    it('ボタンがdisabledになる', () => {
      render(<SubmitButton label="送信" disabled />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabledLabelが表示される', () => {
      render(<SubmitButton label="送信" disabled disabledLabel="利用不可" />)
      expect(screen.getByText('利用不可')).toBeInTheDocument()
    })

    it('disabledLabel未指定時はlabelが表示される', () => {
      render(<SubmitButton label="送信" disabled />)
      expect(screen.getByText('送信')).toBeInTheDocument()
    })

    it('グレー背景のスタイルが適用される', () => {
      render(<SubmitButton label="送信" disabled />)
      expect(screen.getByRole('button')).toHaveClass('bg-gray-400')
    })
  })

  describe('className', () => {
    it('追加のclassNameが適用される', () => {
      render(<SubmitButton label="送信" className="mt-6" />)
      expect(screen.getByRole('button')).toHaveClass('mt-6')
    })
  })
})
