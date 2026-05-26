import { render } from '@testing-library/react'
import { ClipboardIcon } from '@/components/common/ClipboardIcon'

describe('ClipboardIcon', () => {
  it('SVG要素がレンダリングされる', () => {
    const { container } = render(<ClipboardIcon />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('適切なサイズクラスが適用される', () => {
    const { container } = render(<ClipboardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('w-16', 'h-16')
  })

  it('テキストカラーが適用される', () => {
    const { container } = render(<ClipboardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-gray-300')
  })
})
