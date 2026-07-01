import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

export interface ToastData {
  type: 'success' | 'error'
  message: string
  sub?: string
}

export function Toast({ toast, onClose }: { toast: ToastData; onClose: () => void }) {
  return (
    <div className="fixed top-20 right-4 z-50 toast-anim">
      <div className={`bg-white border shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 ${toast.type === 'success' ? 'border-blue-200' : 'border-danger-200'}`}>
        {toast.type === 'success' ? (
          <CheckCircleIcon className="w-6 h-6 text-brand-600" />
        ) : (
          <XCircleIcon className="w-6 h-6 text-danger-600" />
        )}
        <div>
          <p className="text-sm font-medium text-gray-800">{toast.message}</p>
          {toast.sub && <p className="text-xs text-gray-500">{toast.sub}</p>}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-2">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
