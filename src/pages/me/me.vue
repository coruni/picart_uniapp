<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { addUnit, getRect } from 'wot-design-uni/components/common/util'
import { t } from '@/locale'
import { bannersActiveUsingGet } from '@/service'
import { useTokenStore, useUserStore } from '@/store'
import { toLoginPage } from '@/utils/toLoginPage'
import ArticleComponent from './components/article.vue'

defineOptions({
  name: 'Me',
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { hasLogin } = storeToRefs(useTokenStore())
const currentSwiper = ref<number>(0)
const { proxy } = getCurrentInstance()
const articleComponent = ref<InstanceType<typeof ArticleComponent>>()
const opacity = ref(0)
const swiperList = ref<{
  type: 'image' | 'video'
  value: string
  poster?: string

}[]>([])
const currentTab = ref(0)

async function fetchBanners() {
  // 获取轮播
  const banners = await bannersActiveUsingGet({})

  // 处理轮播数据
  swiperList.value = banners?.map(item => ({
    type: 'image',
    value: item.linkUrl,
    poster: item.imageUrl,
  })) || []
}
fetchBanners()

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '%tabbar.me%',
  },
})

function handleQuery(page: number, limit: number) {
  console.log('Query user data:', page, limit)
}

function handleScroll(e: any) {
  const { scrollTop } = e.detail
  opacity.value = scrollTop / 200
}

// 计算导航栏高度
const navbarHeight = ref(0)
onReady(() => {
  // #ifdef APP
  getRect('#navbar', false, proxy).then((rect) => {
    navbarHeight.value = rect.height
  })

  // #endif
})
const marginTop = ref<string>()
// #ifdef H5
marginTop.value = addUnit(180 - 36)
// #endif
// #ifdef APP-PLUS
marginTop.value = addUnit(180 - navbarHeight.value - 92)
// #endif

function handleClickSwiper(item: { type: string, value: string, poster?: string }) {
  // 正则匹配id /article/3068
  const id = item.value.match(/\/article\/(\d+)/)?.[1]
  if (id) {
    uni.navigateTo({
      url: `/pages/article/index?id=${id}`,
    })
  }
}

// 滚动到底部事件
function handleScrollLower() {
  articleComponent.value?.loadMore()
}
</script>

<template>
  <z-paging

    safe-area-inset-bottom @query="handleQuery" @scroll="handleScroll" @scrolltolower="handleScrollLower"
  >
    <template #top>
      <wd-navbar
        v-if="hasLogin" id="navbar" safe-area-inset-top custom-class="z-10"
        :custom-style="`background-color: rgba(255, 255, 255, ${opacity}) !important`" :bordered="false"
      >
        <template #right>
          <view
            class="size-8 flex items-center justify-center rounded-full"
            :class="[{ 'bg-black/30': opacity === 0 }]"
          >
            <i class="i-lucide:sparkles text-sm" :class="[{ 'text-white': opacity === 0 }]" />
          </view>
        </template>
      </wd-navbar>
    </template>
    <view v-if="hasLogin" class="relative flex flex-col">
      <view class="fixed left-0 top-0 z-0 h-48 w-full">
        <ImageCache use-cache height="100%" width="100%" mode="aspectFill" :src="userInfo?.avatar" />
        <view class="absolute left-0 top-0 h-full w-full bg-black/20" />
      </view>

      <view class="relative flex-1 rounded-t-xl bg-white" :style="`margin-top: ${marginTop}`">
        <view class="flex items-start justify-between gap-4 px-4">
          <view class="relative size-18 flex-shrink-0 border-4 border-white rounded-full shadow-lg -mt-8">
            <ImageCache
              use-cache height="100%" border-radius="9999px" width="100%" mode="aspectFill"
              :src="userInfo?.avatar"
            />
            <view
              v-if="userInfo?.isMember"
              class="absolute bottom-0 right-1 h-4 w-4 flex items-center justify-center border-2 border-white rounded-full bg-primary/80 text-white"
            >
              <i class="i-lucide-badge-check" />
            </view>
          </view>
          <view class="pt-2">
            <wd-button size="small">
              <view class="flex items-center gap-1">
                <i class="i-lucide-pen" />
                <text>编辑</text>
              </view>
            </wd-button>
          </view>
        </view>
        <view class="px-4">
          <view class="flex flex-col gap-1 pb-2">
            <text class="text-lg font-bold" :class="[{ 'text-purple-500 text-shadow ': userInfo?.isMember }]">
              {{ userInfo?.nickname
                || userInfo?.username }}
            </text>
            <view class="flex items-center gap-1 text-xs text-gray-500">
              <i class="i-lucide-id-card size-3" />
              <text>UID: {{ userInfo?.id }}</text>
            </view>
            <view class="flex items-center gap-1 text-xs text-gray-500">
              <i class="i-lucide:clipboard-list size-3" />
              <text>{{ userInfo?.description }}</text>
            </view>
          </view>
        </view>
        <view class="px-4">
          <wd-swiper
            v-model:current="currentSwiper" autoplay height="80" :indicator="true" :list="swiperList"
            @change="currentSwiper = $event"
          >
            <template #default="{ item }">
              <ImageCache
                use-cache :src="(item as any).poster" height="100%" width="100%"
                @click="handleClickSwiper(item as any)"
              />
            </template>
          </wd-swiper>
        </view>

        <wd-tabs v-model="currentTab" :offset-top="navbarHeight" sticky slidable="always">
          <wd-tab :title="t('me.article')">
            <ArticleComponent ref="articleComponent" />
          </wd-tab>
        </wd-tabs>
      </view>
    </view>
    <view v-else class="h-[calc(100vh-55px)] flex flex-1 items-center justify-center">
      <wd-button size="small" @click="toLoginPage">
        {{ t('me.login') }}
      </wd-button>
    </view>
    <template #bottom>
      <view class="h-50px" />
    </template>
  </z-paging>
</template>

<style scoped>
:deep(.wd-tabs__nav-item) {
  @apply px-4 !;
}
</style>
