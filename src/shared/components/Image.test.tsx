import { render, screen, fireEvent } from '@testing-library/react'
import { Image } from '@/shared/components/Image'

describe('Image', () => {
  it('img要素が表示される', () => {
    render(<Image src="/test.png" alt="テスト画像" />)
    expect(screen.getByAltText('テスト画像')).toBeInTheDocument()
  })

  it('src属性が設定される', () => {
    render(<Image src="/test.png" alt="テスト画像" />)
    expect(screen.getByAltText('テスト画像')).toHaveAttribute('src', '/test.png')
  })

  it('画像読み込みエラー時に「No Image」が表示される', () => {
    render(<Image src="/broken.png" alt="壊れた画像" />)
    fireEvent.error(screen.getByAltText('壊れた画像'))
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('srcがnullの場合「No Image」が表示される', () => {
    render(<Image src={null} alt="画像なし" />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('srcがundefinedの場合「No Image」が表示される', () => {
    render(<Image src={undefined} alt="画像なし" />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })

  it('srcが空文字の場合「No Image」が表示される', () => {
    render(<Image src="" alt="画像なし" />)
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })
})
