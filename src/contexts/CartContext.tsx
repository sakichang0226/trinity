import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  stock: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => boolean
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

const CART_MAX_ITEMS = 20
const STORAGE_KEY = 'cart'

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const persist = (newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
  }

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number): boolean => {
    const existing = items.find(i => i.productId === item.productId)
    if (!existing && items.length >= CART_MAX_ITEMS) return false

    const newItems = existing
      ? items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i)
      : [...items, { ...item, quantity }]
    persist(newItems)
    return true
  }, [items])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    persist(items.map(i => i.productId === productId ? { ...i, quantity } : i))
  }, [items])

  const removeItem = useCallback((productId: string) => {
    persist(items.filter(i => i.productId !== productId))
  }, [items])

  const clearCart = useCallback(() => {
    persist([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
