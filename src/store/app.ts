import type { ConfigPublicUsingGetResponse } from '@/service/types'
import { defineStore } from 'pinia'
import { configPublicUsingGet } from '@/service'

type Config = ConfigPublicUsingGetResponse['data']
export const useAppStore = defineStore('app', () => {
  const appConfig = ref<Config>({} as Config)

  const getConfig = async () => {
    const res = await configPublicUsingGet({})
    console.log('获取配置', res)
    appConfig.value = res
  }
  return {
    appConfig,
    getConfig,
  }
}, {
  persist: true,
})
