<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { useImagePreviewStore } from '@/store'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
})

const imagePreviewStore = useImagePreviewStore()

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  const hour = date.getHours()
  return {
    year,
    month,
    day,
    hour,
  }
}

const formattedDate = computed(() => formatDate(props.article.createdAt || ''))

const displayImages = computed(() => {
  const images = props.article.images || []
  return images.slice(0, 3)
})

const isSingleImage = computed(() => {
  return displayImages.value.length === 1
})

function handleImageClick(index: number) {
  imagePreviewStore.showPreview(displayImages.value, index, props.article)
}

function handleClick() {
  uni.navigateTo({
    url: `/pages/article/index?id=${props.article.id}`,
  })
}
</script>

<template>
  <view @click="handleClick">
    <view class="flex flex-col">
      <view class="flex items-end justify-between px-4 space-x-2">
        <view class="flex flex-1 items-end space-x-1">
          <view class="text-2xl font-500">
            <text>{{ formattedDate.day }}</text>
          </view>
          <view class="text-sm text-[#999] space-x-1">
            <text>{{ formattedDate.month }}</text>
            <text>·</text>
            <text>{{ article?.category?.name }}</text>
          </view>
        </view>
        <view class="mb-3 text-lg text-[#999]">
          <i class="i-lucide:ellipsis-vertical" />
        </view>
      </view>
      <view class="px-4 font-500">
        <text>{{ article?.title }}</text>
      </view>
      <view v-if="displayImages.length > 0" class="mt-2 px-4">
        <view
          v-if="isSingleImage" class="relative max-h-48 max-w-32 overflow-hidden rounded-lg"
          @click.stop="handleImageClick(0)"
        >
          <ImageCache :src="displayImages[0]" mode="widthFix" width="100%" height="100%" :use-cache="true" />
        </view>
        <view v-else-if="displayImages.length === 2" class="h-36 flex gap-1">
          <view class="relative flex-1 overflow-hidden rounded-l-lg" @click.stop="handleImageClick(0)">
            <ImageCache :src="displayImages[0]" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden rounded-r-lg" @click.stop="handleImageClick(1)">
            <ImageCache :src="displayImages[1]" width="100%" height="100%" :use-cache="true" />
          </view>
        </view>
        <view v-else-if="displayImages.length === 3" class="h-24 flex gap-1">
          <view class="relative flex-1 overflow-hidden rounded-l-lg" @click.stop="handleImageClick(0)">
            <ImageCache :src="displayImages[0]" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden" @click.stop="handleImageClick(1)">
            <ImageCache :src="displayImages[1]" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden rounded-r-lg" @click.stop="handleImageClick(2)">
            <ImageCache :src="displayImages[2]" width="100%" height="100%" :use-cache="true" />
          </view>
        </view>
      </view>
      <view class="px-4 pt-2 space-x-2">
        <block v-for="tag in article?.tags" :key="tag.id">
          <wd-tag size="small" round plain type="primary" custom-class="rounded-full! mt-2">
            {{ tag.name }}
          </wd-tag>
        </block>
      </view>
      <view class="px-4 pb-2 pt-2">
        <view class="flex items-center justify-between text-xs text-gray-400 space-x-3">
          <view class="flex items-center space-x-1">
            <i class="i-lucide-eye" />
            <text>{{ article?.views }}</text>
          </view>
          <view class="flex items-center space-x-1">
            <i class="i-lucide-message-circle" />
            <text>{{ article?.commentCount }}</text>
          </view>
          <view class="flex items-center space-x-1">
            <i class="i-lucide-heart" />
            <text>{{ article?.likes }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 模拟边框 -->
    <view class="my-4 h-[1px] bg-gray-200 dark:bg-gray-700" />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
