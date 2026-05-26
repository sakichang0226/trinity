import { render } from '@testing-library/react'
import { CardSkeleton } from '@/components/common/CardSkeleton'

describe('CardSkeleton', () => {
  it('デフォルトで3件のスケルトンを表示する', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(3)
  })

  it('count=1で1件のスケルトンを表示する', () => {
    const { container } = render(<CardSkeleton count={1} />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(1)
  })

  it('count=5で5件のスケルトンを表示する', () => {
    const { container } = render(<CardSkeleton count={5} />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(5)
  })
})
