import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { OrderErrorCard } from '@/components/common/OrderErrorCard'

describe('OrderErrorCard', () => {
  it('エラータイトルが表示される', () => {
    render(<OrderErrorCard message="テストエラー" isProductError={false} onRetry={() => {}} />, { wrapper: MemoryRouter })
    expect(screen.getByText('注文の処理に失敗しました')).toBeInTheDocument()
  })

  it('エラーメッセージが表示される', () => {
    render(<OrderErrorCard message="在庫が不足しています" isProductError={false} onRetry={() => {}} />, { wrapper: MemoryRouter })
    expect(screen.getByText('在庫が不足しています')).toBeInTheDocument()
  })

  describe('商品起因エラー', () => {
    it('「カートへ戻る」リンクが表示される', () => {
      render(<OrderErrorCard message="エラー" isProductError={true} onRetry={() => {}} />, { wrapper: MemoryRouter })
      expect(screen.getByRole('link', { name: /カートへ戻る/ })).toHaveAttribute('href', '/cart')
    })

    it('「もう一度試す」ボタンは表示されない', () => {
      render(<OrderErrorCard message="エラー" isProductError={true} onRetry={() => {}} />, { wrapper: MemoryRouter })
      expect(screen.queryByRole('button', { name: /もう一度試す/ })).not.toBeInTheDocument()
    })
  })

  describe('システムエラー', () => {
    it('「もう一度試す」ボタンが表示される', () => {
      render(<OrderErrorCard message="エラー" isProductError={false} onRetry={() => {}} />, { wrapper: MemoryRouter })
      expect(screen.getByRole('button', { name: /もう一度試す/ })).toBeInTheDocument()
    })

    it('「カートへ戻る」リンクは表示されない', () => {
      render(<OrderErrorCard message="エラー" isProductError={false} onRetry={() => {}} />, { wrapper: MemoryRouter })
      expect(screen.queryByRole('link', { name: /カートへ戻る/ })).not.toBeInTheDocument()
    })

    it('「もう一度試す」クリックでonRetryが呼ばれる', async () => {
      const user = userEvent.setup()
      const onRetry = vi.fn()
      render(<OrderErrorCard message="エラー" isProductError={false} onRetry={onRetry} />, { wrapper: MemoryRouter })
      await user.click(screen.getByRole('button', { name: /もう一度試す/ }))
      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })
})
