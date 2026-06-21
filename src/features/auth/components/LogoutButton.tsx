import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export function LogoutButton({ className }: { className?: string }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <button onClick={handleLogout} className={className ?? "flex items-center gap-2 text-sm text-danger-600 hover:text-danger-700"}>
      <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
      ログアウト
    </button>
  )
}
