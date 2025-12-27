<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { t } from '@/locale/index'
import { useTokenStore } from '@/store'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { toLoginPage } from '@/utils/toLoginPage'

const props = defineProps({
  placeholder: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['change'])
const { appConfig, category } = storeToRefs(useAppStore())
const { userInfo } = storeToRefs(useUserStore())
const { hasLogin } = storeToRefs(useTokenStore())

// 将获取到的category 展平获取子分类 排除存在link的分类
const tabCategories = computed(() => {
  return category.value.map(child => child.children).flat().filter(child => !child.link)
})

// 构建tabs
const tabs = computed(() => {
  const list = [{
    name: 'recommend',
    title: t('home.recommend'),
  }]

  return list.concat(tabCategories.value.map(child => ({
    name: String(child.id),
    title: child.name,
  })))
})

const currentTab = ref<string>('recommend')
function handleTabChange({ index, name }: { index: number, name: string }) {
  currentTab.value = name
  if (name === 'recommend') {
    emit('change', '')
  }
  else {
    emit('change', name)
  }
}

function toLogin() {
  toLoginPage()
}
</script>

<template>
  <view>
    <wd-navbar safe-area-inset-top :placeholder="placeholder" :bordered="false">
      <template #left>
        <view v-if="hasLogin" class="size-8">
          <ImageCache :src="userInfo.avatar || ''" height="100%" width="100%" border-radius="999px" border />
        </view>
        <view v-else class="size-8 flex items-center justify-center border border-[#999] rounded-full bg-[#f5f5f5] text-xs" @click="toLogin">
          <text class="text-primary">{{ t('home.login') }}</text>
        </view>
      </template>
      <template #title>
        <view class="h-full flex items-center justify-center">
          <view class="box-border h-8 flex flex-1 items-center gap-2 rounded-full bg-[#f5f5f5] px-4 text-[#999]">
            <i class="i-lucide-search size-4" />
            <text class="text-xs">搜索</text>
          </view>
        </view>
      </template>
      <template #right>
        <view class="flex items-center gap-2">
          <i class="i-lucide-plus size-6" />
        </view>
      </template>
    </wd-navbar>
    <!-- 构建tab -->
    <wd-tabs v-model="currentTab" slidable="always" @change="handleTabChange">
      <block v-for="item in tabs" :key="item.name">
        <wd-tab :title="`${item.title}`" :name="item.name" custom-class="px-3" />
      </block>
    </wd-tabs>
  </view>
</template>

<style scoped>
:deep(.wd-navbar__title) {
  max-width: 70%;
}
:deep(.wd-tabs__nav-item) {
  padding: 0 12px !important;
}
</style>
