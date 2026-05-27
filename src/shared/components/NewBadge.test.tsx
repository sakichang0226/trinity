import { render, screen } from '@testing-library/react'
import { NewBadge } from '@/shared/components/NewBadge'

describe('NewBadge', () => {
  it('「NEW」テキストが表示される', () => {
    render(<NewBadge />)
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })
})
