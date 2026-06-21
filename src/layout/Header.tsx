import { Logo } from '@/shared/components/Logo'
import { SearchBar } from '@/shared/components/SearchBar'
import { CartIcon } from '@/features/cart/components/CartIcon'
import { UserMenu } from '@/layout/UserMenu'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Logo />
        <SearchBar />
        <div className="flex items-center gap-4 shrink-0">
          <CartIcon />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
