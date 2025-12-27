import type { CategoryEntity } from '@/api/types/category'
import type { ConfigPublicUsingGetResponse } from '@/service/types'
import { defineStore } from 'pinia'
import { categoryUsingGet, configPublicUsingGet } from '@/service'

type Config = ConfigPublicUsingGetResponse['data']
export const useAppStore = defineStore('app', () => {
  const appConfig = ref<Config>({} as Config)
  const category = ref<CategoryEntity[]>([])
  const getConfig = async () => {
    const res = await configPublicUsingGet({})
    appConfig.value = res
  }

  /**
   * 获取分类信息
   */
  const fetchCategory = async () => {
    const res = await categoryUsingGet({
      params: {
        page: 1,
        limit: 100,
      },
    })
    category.value = res.data
  }
  return {
    appConfig,
    category,
    fetchCategory,
    getConfig,
  }
}, {
  persist: true,
})
