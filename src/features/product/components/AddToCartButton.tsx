import { SubmitButton } from '@/shared/components/SubmitButton'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export function AddToCartButton({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label?: string }) {
  return (
    <SubmitButton
      onClick={onClick}
      disabled={disabled}
      label="カートに追加する"
      disabledLabel={label ?? '在庫切れ'}
      icon={<ShoppingCartIcon className="w-6 h-6" />}
      className="mt-6"
    />
  )
}
