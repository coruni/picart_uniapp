<script lang="ts" setup>
import { getI18nText } from '@/tabbar/i18n'
import { getCurrentPageI18nKey } from '@/utils'

onShow(() => {
  console.log('layout default - onShow')
  const i18nKey = getCurrentPageI18nKey()
  console.log('i18nKey:', i18nKey)

  // 只有当i18nKey不为空时才设置标题
  if (i18nKey) {
    try {
      const title = getI18nText(i18nKey)
      console.log('title:', title)

      // 只有当title不为空时才设置导航栏标题
      if (title) {
        uni.setNavigationBarTitle({
          title,
        })
      }
    }
    catch (error) {
      console.error('Error setting navigation bar title:', error)
    }
  }
})
</script>

<template>
  <slot />
</template>
