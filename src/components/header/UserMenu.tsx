import { useAuth } from '@/contexts/AuthContext'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LoginLink } from '@/components/common/LoginLink'
import { UserLabel } from '@/components/common/UserLabel'
import { OrderHistoryLink } from '@/components/common/OrderHistoryLink'
import { LogoutButton } from '@/components/common/LogoutButton'

export function UserMenu() {
  const { user } = useAuth()

  if (!user) {
    return <LoginLink />
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-700 font-medium">
        <UserLabel />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
        <MenuItem>
          <OrderHistoryLink className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" />
        </MenuItem>
        <hr className="my-1" />
        <MenuItem>
          <LogoutButton className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full" />
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
