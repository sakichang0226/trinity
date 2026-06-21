import { render, screen } from '@testing-library/react'
import { SearchBar } from '@/shared/components/SearchBar'

describe('SearchBar', () => {
  it('検索入力欄が表示される', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('商品を検索...')).toBeInTheDocument()
  })
})
