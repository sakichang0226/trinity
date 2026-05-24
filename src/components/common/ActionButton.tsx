import { Link } from 'react-router-dom'

/**
 * ナビゲーション・汎用アクション用ボタン。
 * - to: 単純な画面遷移の場合に使用（内部でLinkを描画）
 * - onClick: 遷移前にロジック（認証チェック等）が必要な場合に使用（内部でbuttonを描画）
 */
interface ActionButtonProps {
  label: string
  to?: string
  onClick?: () => void
  className?: string
}

export function ActionButton({ label, to, onClick, className }: ActionButtonProps) {
  if (to && onClick) {
    throw new Error('ActionButton: Cannot use both "to" and "onClick" props simultaneously')
  }

  const baseClass = 'w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition text-center text-lg'
  const cls = className ? `${baseClass} ${className}` : baseClass

  if (to) {
    return <Link to={to} className={`block ${cls}`}>{label}</Link>
  }

  return <button onClick={onClick} className={cls}>{label}</button>
}
