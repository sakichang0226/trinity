import { Logo } from '@/components/common/Logo'
import { SearchBar } from '@/components/common/SearchBar'
import { CartIcon } from '@/components/common/CartIcon'
import { UserMenu } from '@/components/header/UserMenu'

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
