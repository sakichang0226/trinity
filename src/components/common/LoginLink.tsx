import { Link } from 'react-router-dom'

export function LoginLink({ className }: { className?: string }) {
  return (
    <Link to="/login" className={className ?? "bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 font-medium"}>
      ログイン
    </Link>
  )
}
