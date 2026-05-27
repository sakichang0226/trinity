import { render } from '@testing-library/react'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('animate-spinクラスが適用される', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('カスタムclassNameが適用される', () => {
    const { container } = render(<LoadingSpinner className="h-8 w-8 text-brand-600" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-8', 'w-8', 'text-brand-600')
  })
})
