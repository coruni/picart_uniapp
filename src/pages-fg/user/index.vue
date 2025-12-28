<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { addUnit, getRect } from 'wot-design-uni/components/common/util'
import { bannersActiveUsingGet } from '@/service'
import { userIdUsingGet } from '@/service/yonghuguanli'
import { useTokenStore } from '@/store'
import { currRoute } from '@/utils'

defineOptions({
  name: 'User',
})
const props = defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
})
const { id } = currRoute().query
const { hasLogin } = storeToRefs(useTokenStore())
const currentSwiper = ref<number>(0)
const { proxy } = getCurrentInstance()
const opacity = ref(0)
const swiperList = ref<{
  type: 'image' | 'video'
  value: string
  poster?: string
}[]>([])
const currentTab = ref(0)
const userDetail = ref<any>(null)
const loading = ref(true)

async function fetchBanners() {
  const banners = await bannersActiveUsingGet({})

  swiperList.value = banners?.map(item => ({
    type: 'image',
    value: item.linkUrl,
    poster: item.imageUrl,
  })) || []
}
fetchBanners()

async function fetchUserDetail() {
  try {
    loading.value = true
    const result = await userIdUsingGet({
      params: {
        id: String(id),
      },
    })
    userDetail.value = result
  }
  catch (error) {
    console.error('Failed to fetch user detail:', error)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserDetail()
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '用户中心',
  },
})

function handleQuery(page: number, limit: number) {
  console.log('Query user data:', page, limit)
}

function handleScroll(e: any) {
  const { scrollTop } = e.detail
  opacity.value = scrollTop / 200
}

const navbarHeight = ref(0)
onReady(() => {
  getRect('#navbar', false, proxy).then((rect) => {
    navbarHeight.value = rect.height
  })
})
const marginTop = ref<string>()
marginTop.value = addUnit(180 - navbarHeight.value - 92)

function handleClickSwiper(item: { type: string, value: string, poster?: string }) {
  const id = item.value.match(/\/article\/(\d+)/)?.[1]
  if (id) {
    uni.navigateTo({
      url: `/pages/article/index?id=${id}`,
    })
  }
}
</script>

<template>
  <z-paging safe-area-inset-bottom @query="handleQuery" @scroll="handleScroll">
    <template #top>
      <wd-navbar
        id="navbar"
        left-arrow safe-area-inset-top custom-class="z-10"
        :custom-style="`background-color: rgba(255, 255, 255, ${opacity}) !important`" :bordered="false"
      />
    </template>
    <view class="relative flex flex-col">
      <view class="fixed left-0 top-0 z-0 h-48 w-full">
        <ImageCache use-cache height="100%" width="100%" mode="aspectFill" :src="userDetail?.avatar" />
        <view class="absolute left-0 top-0 h-full w-full bg-black/20" />
      </view>

      <view class="relative flex-1 rounded-t-xl bg-white" :style="`margin-top: ${marginTop}`">
        <view class="flex items-start gap-4 px-4">
          <view class="relative size-18 flex-shrink-0 border-4 border-white rounded-full shadow-lg -mt-8">
            <ImageCache
              use-cache height="100%" border-radius="9999px" width="100%" mode="aspectFill"
              :src="userDetail?.avatar"
            />
            <view
              v-if="userDetail?.isMember"
              class="absolute bottom-0 right-1 h-4 w-4 flex items-center justify-center border-2 border-white rounded-full bg-primary/80 text-white"
            >
              <i class="i-lucide-badge-check" />
            </view>
          </view>
        </view>
        <view class="px-4">
          <view class="flex flex-col gap-1 pb-2">
            <text class="text-lg font-bold" :class="[{ 'text-purple-500 text-shadow ': userDetail?.isMember }]">
              {{ userDetail?.nickname
                || userDetail?.username }}
            </text>
            <view class="flex items-center gap-1 text-xs text-gray-500">
              <i class="i-lucide-id-card size-3" />
              <text>UID: {{ userDetail?.id }}</text>
            </view>
            <view class="flex items-center gap-1 text-xs text-gray-500">
              <i class="i-lucide:clipboard-list size-3" />
              <text>{{ userDetail?.description }}</text>
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
          <wd-tab title="作品">
            <view class="h-200vh" />
          </wd-tab>
        </wd-tabs>
      </view>
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
