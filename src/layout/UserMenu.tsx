import { useAuth } from '@/contexts/AuthContext'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LoginLink } from '@/features/auth/components/LoginLink'
import { UserLabel } from '@/shared/components/UserLabel'
import { OrderHistoryLink } from '@/features/order/components/OrderHistoryLink'
import { LogoutButton } from '@/features/auth/components/LogoutButton'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export function UserMenu() {
  const { user } = useAuth()

  if (!user) {
    return <LoginLink />
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1 text-sm text-gray-700 hover:text-brand-700 font-medium">
        <UserLabel />
        <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
        <MenuItem>
          <OrderHistoryLink className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" />
        </MenuItem>
        <hr className="my-1" />
        <MenuItem>
          <LogoutButton className="flex items-center gap-2 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 w-full" />
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
