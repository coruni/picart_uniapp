import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

export function checkPermission(permission: string) {
  const { userInfo } = storeToRefs(useUserStore())

  if (!userInfo.value?.roles) {
    return false
  }
  const permissions = userInfo.value?.roles
    .map(role => role.permissions?.map(perm => perm?.name) || [])
    .flat()
  return permissions.includes(permission)
}
