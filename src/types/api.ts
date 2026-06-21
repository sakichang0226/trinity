export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; errorCode: string; message: string }
  | { success: false; errorCode: null; message: null }

export const ErrorCode = {
  LOGIN_AUTH: 'API_LOGIN_ERR001',
  ORDER_PRODUCT_NOT_FOUND: 'API_ORDER_ERR001',
  ORDER_PRODUCT_UNAVAILABLE: 'API_ORDER_ERR002',
  ORDER_STOCK_INSUFFICIENT: 'API_ORDER_ERR003',
  PRODUCT_NOT_FOUND: 'API_ERR004',
  UNKNOWN: 'API_ERR999',
} as const

export const ErrorMessage: Record<string, string> = {
  [ErrorCode.ORDER_PRODUCT_NOT_FOUND]: 'カート内の商品が見つかりませんでした。商品が削除された可能性があります。',
  [ErrorCode.ORDER_PRODUCT_UNAVAILABLE]: 'カート内に現在購入できない商品が含まれています。',
  [ErrorCode.ORDER_STOCK_INSUFFICIENT]: '在庫が不足している商品があります。数量をご確認ください。',
  [ErrorCode.UNKNOWN]: 'システムエラーが発生しました。しばらく時間をおいて再度お試しください。',
} as const

export const ORDER_ERROR_CODES = [
  ErrorCode.ORDER_PRODUCT_NOT_FOUND,
  ErrorCode.ORDER_PRODUCT_UNAVAILABLE,
  ErrorCode.ORDER_STOCK_INSUFFICIENT,
] as const
