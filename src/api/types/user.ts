import type { userLoginUsingPost, userProfileUsingGet } from '@/service'

export type UserProfile = Awaited<ReturnType<typeof userProfileUsingGet>>
export type UserLoginRes = Awaited<ReturnType<typeof userLoginUsingPost>>
export interface UserLoginForm {
  account: string
  password: string
}
