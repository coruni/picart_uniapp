<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const currentSwiper = ref<number>(0)
const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
])
const tabsList = ref([
  {
    title: '作品',
  },
])
const currentTab = ref(0)

// 滚动相关状态
const scrollTop = ref(0)
const maxHeaderHeight = 200 // 头部最大高度
const minHeaderHeight = 100 // 头部最小高度（pinned状态）
const headerHeightRange = maxHeaderHeight - minHeaderHeight

// 计算当前头部高度
const currentHeaderHeight = computed(() => {
  const height = maxHeaderHeight - scrollTop.value
  return Math.max(minHeaderHeight, Math.min(maxHeaderHeight, height))
})

// 计算头像位置和大小
const avatarTranslateY = computed(() => {
  // 随着滚动，头像向上移动，但最小位置保持在minHeaderHeight中心
  const translateY = -scrollTop.value * 0.8
  const maxTranslate = -(maxHeaderHeight - minHeaderHeight) / 2
  return Math.max(maxTranslate, translateY)
})

const avatarScale = computed(() => {
  // 随着滚动，头像略微缩小
  const scale = 1 - (scrollTop.value / maxHeaderHeight) * 0.2
  return Math.max(0.8, scale)
})

// 计算内容区域的顶部边距
const contentMarginTop = computed(() => {
  // 内容区域始终跟随头部高度变化
  return `${currentHeaderHeight.value}px`
})

// 计算用户信息透明度
const userInfoOpacity = computed(() => {
  // 当头部接近最小高度时，用户信息透明度降低
  const progress = (scrollTop.value - (maxHeaderHeight - minHeaderHeight * 2)) / minHeaderHeight
  return Math.max(0, Math.min(1, 1 - progress))
})

// 处理滚动事件
function handleScroll(e: any) {
  scrollTop.value = e.detail.scrollTop
}
</script>

<template>
  <!-- SVG 定义拱桥形状 -->
  <svg width="0" height="0">
    <defs>
      <clipPath id="bottom-arch-shape" clipPathUnits="objectBoundingBox">
        <path
          d="
            M 0,0
            L 1,0
            L 1,1
            Q 1,0.94 0.94,0.94
            L 0.06,0.94
            Q 0,0.94 0,1
            Z
          "
        />
      </clipPath>
    </defs>
  </svg>

  <z-paging @scroll="handleScroll">
    <view class="relative flex flex-col">
      <!-- 固定头部背景图片 -->
      <view
        class="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        :style="{ height: `${currentHeaderHeight}px` }"
      >
        <ImageCache
          use-cache height="100%" width="100%" mode="aspectFill" :src="userInfo.avatar"
          style="clip-path: url(#bottom-arch-shape);"
        />
        <view
          class="absolute left-0 top-0 h-full w-full bg-black/20 backdrop-blur-[2px]"
          style="clip-path: url(#bottom-arch-shape);"
        />
      </view>

      <!-- 内容区域 -->
      <view
        class="relative z-30 flex-1 bg-white transition-all duration-300"
        :style="{ marginTop: contentMarginTop }"
      >
        <!-- 头像 -->
        <view
          class="absolute left-4 z-40 h-16 w-16 border-4 border-white rounded-full shadow-lg transition-all duration-300 -top-8"
        >
          <ImageCache
            use-cache height="100%" border-radius="9999px" width="100%" mode="aspectFill"
            :src="userInfo.avatar"
          />
          <view
            class="absolute bottom-0 right-0 h-4 w-4 flex items-center justify-center border-2 border-white rounded-full bg-primary text-white"
          >
            <i class="i-lucide-badge-check" />
          </view>
        </view>

        <!-- 用户信息 -->
        <view
          class="flex items-center gap-2 px-4 transition-opacity duration-300"
          :style="{ opacity: userInfoOpacity }"
        >
          <view class="mt-8 flex-1">
            <text class="text-lg font-medium">{{ userInfo.nickname || userInfo.username }}</text>
          </view>
          <view>
            <wd-button size="small">
              <view class="flex items-center gap-1">
                <i class="i-lucide-pen" />
                <text>编辑</text>
              </view>
            </wd-button>
          </view>
        </view>
        <view
          class="line-clamp-1 block text-ellipsis px-4 text-xs transition-opacity duration-300"
          :style="{ opacity: userInfoOpacity }"
        >
          <text class="text-gray-500">{{ userInfo.description }}</text>
        </view>

        <view class="mt-4 px-4">
          <wd-swiper
            v-model:current="currentSwiper" height="80" :indicator="{ type: 'dots-bar' }" :list="swiperList"
            @change="currentSwiper = $event"
          />
        </view>

        <!-- tab栏 -->
        <wd-tabs v-model="currentTab" animated slidable="always" sticky>
          <wd-tab title="作品">
            <view class="h-200vh" />
          </wd-tab>
        </wd-tabs>
      </view>
    </view>
    <template #bottom>
      <!-- 自定义tabbar占位 -->
      <view class="h-50px" />
    </template>
  </z-paging>
</template>
