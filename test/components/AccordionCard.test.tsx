import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccordionCard } from '@/components/common/AccordionCard'

describe('AccordionCard', () => {
  it('ヘッダーが表示される', () => {
    render(
      <AccordionCard header={<span>ヘッダー内容</span>}>
        <p>パネル内容</p>
      </AccordionCard>
    )
    expect(screen.getByText('ヘッダー内容')).toBeInTheDocument()
  })

  it('初期状態でパネルが非表示である', () => {
    render(
      <AccordionCard header={<span>ヘッダー</span>}>
        <p>パネル内容</p>
      </AccordionCard>
    )
    expect(screen.queryByText('パネル内容')).not.toBeInTheDocument()
  })

  it('クリックでパネルが展開される', async () => {
    const user = userEvent.setup()
    render(
      <AccordionCard header={<span>ヘッダー</span>}>
        <p>パネル内容</p>
      </AccordionCard>
    )
    await user.click(screen.getByText('ヘッダー'))
    expect(screen.getByText('パネル内容')).toBeInTheDocument()
  })

  it('再クリックでパネルが閉じる', async () => {
    const user = userEvent.setup()
    render(
      <AccordionCard header={<span>ヘッダー</span>}>
        <p>パネル内容</p>
      </AccordionCard>
    )
    await user.click(screen.getByText('ヘッダー'))
    expect(screen.getByText('パネル内容')).toBeInTheDocument()
    await user.click(screen.getByText('ヘッダー'))
    expect(screen.queryByText('パネル内容')).not.toBeInTheDocument()
  })
})
