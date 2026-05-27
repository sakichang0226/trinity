import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-75 disabled:cursor-not-allowed',
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
  disabled: 'bg-gray-400 text-white cursor-not-allowed',
} as const

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-lg',
} as const

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  children: ReactNode
  className?: string
}

export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition'
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className ?? ''}`

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
