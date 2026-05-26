import { render } from '@testing-library/react'
import { ChevronIcon } from '@/components/common/ChevronIcon'

describe('ChevronIcon', () => {
  it('SVG要素がレンダリングされる', () => {
    const { container } = render(<ChevronIcon />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('回転アニメーション用のクラスが適用される', () => {
    const { container } = render(<ChevronIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('transition-transform', 'duration-300')
  })

  it('group-data-[open]:rotate-180クラスが適用される', () => {
    const { container } = render(<ChevronIcon />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('group-data-[open]:rotate-180')
  })
})
