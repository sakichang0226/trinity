import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroBanner } from '@/features/home/components/HeroBanner'

describe('HeroBanner', () => {
  it('初期バナーのタイトルが表示される', () => {
    render(<HeroBanner />)
    expect(screen.getByText('夏のセール開催中！')).toBeInTheDocument()
  })

  it('CTAボタンが表示される', () => {
    render(<HeroBanner />)
    expect(screen.getByText('詳しく見る →')).toBeInTheDocument()
  })

  it('ページインジケーターが3つ表示される', () => {
    render(<HeroBanner />)
    const buttons = screen.getAllByRole('button').filter(b => b.textContent === '')
    expect(buttons).toHaveLength(3)
  })

  it('インジケータークリックでバナーが切り替わる', async () => {
    const user = userEvent.setup()
    render(<HeroBanner />)
    const indicators = screen.getAllByRole('button').filter(b => b.textContent === '')
    await user.click(indicators[1])
    expect(screen.getByText('新作コレクション')).toBeInTheDocument()
  })
})
