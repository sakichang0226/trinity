import { Link } from 'react-router-dom'

export function Breadcrumb({ productName }: { productName: string }) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-brand-700 underline">TOP</Link>
      <span className="mx-1">&gt;</span>
      <span className="text-gray-800">{productName}</span>
    </nav>
  )
}
