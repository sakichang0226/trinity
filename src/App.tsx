import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { Layout } from '@/layout/Layout'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { TopPage } from '@/features/home/routes/TopPage'
import { ProductDetailPage } from '@/features/product/routes/ProductDetailPage'
import { CartPage } from '@/features/cart/routes/CartPage'
import { CheckoutPage } from '@/features/order/routes/CheckoutPage'
import { OrderHistoryPage } from '@/features/order/routes/OrderHistoryPage'
import { LoginPage } from '@/features/auth/routes/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<TopPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<AuthGuard><CheckoutPage /></AuthGuard>} />
              <Route path="/orders" element={<AuthGuard><OrderHistoryPage /></AuthGuard>} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
