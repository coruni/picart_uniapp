<script lang="ts" setup>
import { t } from '@/locale/index'
import { HOME_PAGE } from '@/utils'
import { reLaunch, switchTab } from '@/utils/router'

definePage({
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    backgroundColor: '#FFFFFF',
  },
})

function goBack() {
  // 当pages.config.ts中配置了tabbar页面时，使用switchTab切换到首页
  // 否则使用navigateTo返回首页
  try {
    switchTab(HOME_PAGE)
  }
  catch (error) {
    // 重启应用
    reLaunch('/pages/index/index')
  }
}
</script>

<template>
  <view class="h-screen flex flex-col pt-safe pb-safe">
    <wd-navbar left-arrow :title="t('page.404')" safe-area-inset-top placeholder @click-left="goBack" />

    <view class="flex flex-1 flex-col items-center justify-center">
      <view class="i-lucide:file-x-corner size-8 text-[#999]" />
      <wd-text size="32px" :text="t('page.404')" class="mt-2" />
      <wd-button type="primary" size="large" color="white" class="mt-4" @tap="goBack">
        {{ t('page.back') }}
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
