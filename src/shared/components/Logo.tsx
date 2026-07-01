import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="shrink-0">
      <img src="/header_logo.png" alt="SUNABA" className="h-10" />
    </Link>
  )
}
