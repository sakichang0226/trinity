import { isProductUnavailable, getUnavailableLabel } from '@/utils/productStatus'

describe('isProductUnavailable', () => {
  it('stock=0 で true', () => {
    expect(isProductUnavailable(0, 'O')).toBe(true)
  })

  it('status=S で true', () => {
    expect(isProductUnavailable(10, 'S')).toBe(true)
  })

  it('status=D で true', () => {
    expect(isProductUnavailable(10, 'D')).toBe(true)
  })

  it('stock>0 かつ status=O で false', () => {
    expect(isProductUnavailable(10, 'O')).toBe(false)
  })
})

describe('getUnavailableLabel', () => {
  it('status=D で「販売終了」', () => {
    expect(getUnavailableLabel('D')).toBe('販売終了')
  })

  it('status=S で「在庫切れ」', () => {
    expect(getUnavailableLabel('S')).toBe('在庫切れ')
  })

  it('status=O で「在庫切れ」', () => {
    expect(getUnavailableLabel('O')).toBe('在庫切れ')
  })
})
