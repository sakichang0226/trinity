import { useAuth } from '@/contexts/AuthContext'
import { UserIcon } from '@heroicons/react/24/outline'

export function UserLabel({ className }: { className?: string }) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <span className={className ?? "flex items-center gap-1 text-sm text-gray-700 font-medium"}>
      <UserIcon className="w-5 h-5" />
      {user.userName}
    </span>
  )
}
