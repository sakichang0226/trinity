import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** SVG要素を渡す */
  icon: ReactNode
  label: string
  className?: string
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <button className={`p-1.5 shrink-0 transition ${className ?? ''}`} title={label} aria-label={label} {...props}>
      {icon}
    </button>
  )
}
