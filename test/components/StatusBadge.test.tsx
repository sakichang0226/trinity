import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/components/common/StatusBadge'

describe('StatusBadge', () => {
  it('ラベルが表示される', () => {
    render(<StatusBadge label="配送済み" color="green" />)
    expect(screen.getByText('配送済み')).toBeInTheDocument()
  })

  it('greenで緑のクラスが適用される', () => {
    render(<StatusBadge label="配送済み" color="green" />)
    expect(screen.getByText('配送済み')).toHaveClass('bg-green-100', 'text-green-700')
  })

  it('blueで青のクラスが適用される', () => {
    render(<StatusBadge label="処理中" color="blue" />)
    expect(screen.getByText('処理中')).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('redで赤のクラスが適用される', () => {
    render(<StatusBadge label="キャンセル" color="red" />)
    expect(screen.getByText('キャンセル')).toHaveClass('bg-red-100', 'text-red-700')
  })

  it('yellowで黄のクラスが適用される', () => {
    render(<StatusBadge label="注意" color="yellow" />)
    expect(screen.getByText('注意')).toHaveClass('bg-yellow-100', 'text-yellow-700')
  })

  it('grayで灰のクラスが適用される', () => {
    render(<StatusBadge label="無効" color="gray" />)
    expect(screen.getByText('無効')).toHaveClass('bg-gray-100', 'text-gray-700')
  })

  it('共通のスタイルクラスが適用される', () => {
    render(<StatusBadge label="テスト" color="green" />)
    expect(screen.getByText('テスト')).toHaveClass('text-xs', 'font-medium', 'rounded-full')
  })
})
