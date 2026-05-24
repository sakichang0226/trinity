import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'

describe('ActionButton', () => {
  describe('onClick（button描画）', () => {
    it('ラベルが表示される', () => {
      render(<ActionButton label="注文手続きへ進む →" onClick={() => {}} />)
      expect(screen.getByRole('button', { name: '注文手続きへ進む →' })).toBeInTheDocument()
    })

    it('クリックでonClickが呼ばれる', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<ActionButton label="注文手続きへ進む →" onClick={onClick} />)
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('追加のclassNameが適用される', () => {
      render(<ActionButton label="テスト" onClick={() => {}} className="mt-4" />)
      expect(screen.getByRole('button')).toHaveClass('mt-4')
    })
  })

  describe('to（Link描画）', () => {
    it('リンクとして描画される', () => {
      render(
        <MemoryRouter>
          <ActionButton label="お買い物を続ける →" to="/" />
        </MemoryRouter>
      )
      expect(screen.getByRole('link', { name: 'お買い物を続ける →' })).toBeInTheDocument()
    })

    it('href属性が設定される', () => {
      render(
        <MemoryRouter>
          <ActionButton label="お買い物を続ける →" to="/" />
        </MemoryRouter>
      )
      expect(screen.getByRole('link')).toHaveAttribute('href', '/')
    })

    it('追加のclassNameが適用される', () => {
      render(
        <MemoryRouter>
          <ActionButton label="テスト" to="/" className="mt-4" />
        </MemoryRouter>
      )
      expect(screen.getByRole('link')).toHaveClass('mt-4')
    })
  })
})
