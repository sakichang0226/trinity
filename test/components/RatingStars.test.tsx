import { render, screen } from '@testing-library/react'
import { RatingStars } from '@/components/common/RatingStars'

describe('RatingStars', () => {
  it('rating=4で★4つ☆1つが表示される', () => {
    render(<RatingStars rating={4} />)
    expect(screen.getByText('★★★★☆')).toBeInTheDocument()
  })

  it('rating=5で★5つが表示される', () => {
    render(<RatingStars rating={5} />)
    expect(screen.getByText('★★★★★')).toBeInTheDocument()
  })

  it('scoreLabelが表示される', () => {
    render(<RatingStars rating={4} scoreLabel={4.0} />)
    expect(screen.getByText('(4)')).toBeInTheDocument()
  })

  it('scoreLabelが未指定の場合スコアが表示されない', () => {
    const { container } = render(<RatingStars rating={4} />)
    expect(container.textContent).not.toContain('(')
  })

  it('size=lgで大きいスタイルが適用される', () => {
    render(<RatingStars rating={4} scoreLabel={4} size="lg" />)
    const starsEl = screen.getByText('★★★★☆')
    expect(starsEl.className).toContain('text-lg')
  })

  it('size=smで小さいスタイルが適用される', () => {
    render(<RatingStars rating={4} scoreLabel={12} size="sm" />)
    const starsEl = screen.getByText('★★★★☆')
    expect(starsEl.className).toContain('text-xs')
  })
})
