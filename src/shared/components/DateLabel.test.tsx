import { render, screen } from '@testing-library/react'
import { DateLabel } from '@/shared/components/DateLabel'

describe('DateLabel', () => {
  it('タイムスタンプをyyyy/MM/dd形式で表示する', () => {
    render(<DateLabel timestamp={new Date('2025-01-15').getTime()} />)
    expect(screen.getByText('2025/01/15')).toBeInTheDocument()
  })

  it('年末の日付が正しく表示される', () => {
    render(<DateLabel timestamp={new Date('2024-12-31').getTime()} />)
    expect(screen.getByText('2024/12/31')).toBeInTheDocument()
  })

  it('年始の日付が正しく表示される', () => {
    render(<DateLabel timestamp={new Date('2025-01-01').getTime()} />)
    expect(screen.getByText('2025/01/01')).toBeInTheDocument()
  })
})
