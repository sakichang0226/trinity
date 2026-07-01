import { render, screen } from '@testing-library/react'
import { Badge } from '@/shared/components/Badge'

describe('Badge', () => {
  it('ラベルが表示される', () => {
    render(<Badge label="配送済み" color="green" />)
    expect(screen.getByText('配送済み')).toBeInTheDocument()
  })

  it('greenカラーでbrand系クラスが適用される', () => {
    render(<Badge label="配送済み" color="green" />)
    expect(screen.getByText('配送済み')).toHaveClass('bg-brand-100', 'text-brand-600')
  })

  it('blueカラーでblue系クラスが適用される', () => {
    render(<Badge label="処理中" color="blue" />)
    expect(screen.getByText('処理中')).toHaveClass('bg-blue-100', 'text-blue-600')
  })

  it('red-solidカラーでdanger系クラスが適用される', () => {
    render(<Badge label="NEW" color="red-solid" />)
    expect(screen.getByText('NEW')).toHaveClass('bg-danger-500', 'text-white')
  })

  it('デフォルトサイズはmd', () => {
    render(<Badge label="テスト" color="gray" />)
    expect(screen.getByText('テスト')).toHaveClass('px-3', 'py-1')
  })

  it('size=smで小さいパディングが適用される', () => {
    render(<Badge label="テスト" color="gray" size="sm" />)
    expect(screen.getByText('テスト')).toHaveClass('px-2', 'py-0.5')
  })
})
