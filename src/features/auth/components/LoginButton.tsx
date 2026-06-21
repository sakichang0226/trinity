import { SubmitButton } from '@/shared/components/SubmitButton'

export function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <SubmitButton type="submit" label="ログイン" loadingLabel="ログイン中..." isLoading={isLoading} />
  )
}
