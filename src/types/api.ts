export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; errorCode: string; message: string }
  | { success: false; errorCode: null; message: null }

export const ApiErrorCode = {
  UNKNOWN: 'API_ERR999',
} as const
