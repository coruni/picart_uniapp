<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
})

// 计算时间 分钟前 小时前 几天前 最后是具体时间
function formatTime(time: string) {
  const now = new Date()
  const articleTime = new Date(time)
  const diff = now.getTime() - articleTime.getTime()
  const diffMinutes = Math.floor(diff / 1000 / 60)
  const diffHours = Math.floor(diff / 1000 / 60 / 60)
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24)
  if (diffMinutes < 1) {
    return '刚刚'
  }
  if (diffHours < 1) {
    return `${diffMinutes}分钟前`
  }
  if (diffDays < 1) {
    return `${diffHours}小时前`
  }
  return `${diffDays}天前`
}
const articleTime = computed(() => formatTime(props.article.createdAt))
const articleSummary = computed(() => {
  let summary: string = ''
  if (props?.article?.summary) {
    summary = props?.article?.summary
  }
  else if (!props.article?.content?.startsWith('article.')) {
    summary = props.article?.content?.substring(0, 120)
  }
  summary = summary?.replace(/<[^>]*>/g, '')
  summary = summary?.replace(/&nbsp;/g, ' ')
  summary = summary?.replace(/&lt;/g, '<')
  summary = summary?.replace(/&amp;/g, '&')
  summary = summary?.replace(/&quot;/g, '"')
  summary = summary?.replace(/&#39;/g, '\'')
  summary = summary?.replace(/&hellip;/g, '...')
  summary = summary?.replace(/&gt;/g, '>')
  summary = summary?.replace(/\n/g, '').replace(/\s+/g, ' ').replace(/\.$/, '')
  return summary
})

const displayImages = computed(() => {
  const images = props.article.images || []
  const cover = props.article.cover

  if (images.length === 0 && cover) {
    return [cover]
  }

  if (images.length === 1 && cover) {
    return [cover]
  }

  return images.slice(0, 9)
})

const hasMoreImages = computed(() => {
  return (props.article.images?.length || 0) > 9
})

const isSingleImage = computed(() => {
  return displayImages.value.length === 1
})

const imageGridClass = computed(() => {
  if (isSingleImage.value) {
    return ''
  }
  const count = displayImages.value.length
  if (count === 4) {
    return 'grid-cols-2'
  }
  else {
    return 'grid-cols-3'
  }
})

function toArticleDetail() {
  uni.navigateTo({
    url: `/pages/article/index?id=${props.article.id}`,
  })
}
</script>

<template>
  <view @click="toArticleDetail">
    <view class="flex items-center px-4 pt-4">
      <view class="flex flex-1">
        <view class="size-8">
          <ImageCache :src="article?.author?.avatar" border-radius="999px" border height="100%" width="100%" />
        </view>
        <view class="ml-2 flex flex-1 flex-col">
          <view class="text-sm text-gray-800 font-bold">
            {{ article?.author?.nickname ?? article?.author?.username ?? '' }}
          </view>
          <wd-text :text="articleTime" size="10px" />
        </view>
      </view>
    </view>
    <view class="px-4 pt-2">
      <view>
        <text class="font-bold">{{ article?.title }}</text>
      </view>
      <view class="py-1">
        <text class="line-clamp-2 text-xs text-gray-400">{{ articleSummary }}</text>
      </view>
      <view v-if="displayImages.length > 0" class="mt-2">
        <view v-if="isSingleImage" class="relative max-h-48 max-w-32 overflow-hidden rounded-lg">
          <ImageCache :src="displayImages[0]" mode="widthFix" width="100%" height="100%" :use-cache="true" />
        </view>
        <view v-else-if="displayImages.length === 2" class="flex gap-1">
          <view class="relative flex-1 overflow-hidden rounded-l-lg">
            <ImageCache :src="displayImages[0]" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden rounded-r-lg">
            <ImageCache :src="displayImages[1]" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          </view>
        </view>
      </view>

      <view v-if="displayImages.length >= 9" class="grid mt-2 gap-1" :class="imageGridClass">
        <view
          v-for="(image, index) in displayImages" :key="index"
          class="relative aspect-square overflow-hidden rounded-lg"
        >
          <ImageCache :src="image" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          <view
            v-if="index === 8 && hasMoreImages"
            class="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <text class="text-lg text-white font-bold">+{{ article.imageCount - 9 }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="px-4 pt-2 space-x-2">
      <block v-for="tag in article?.tags" :key="tag.id">
        <wd-tag size="small" round plain type="primary" custom-class="rounded-full!">
          {{ tag.name }}
        </wd-tag>
      </block>
    </view>
    <view class="px-4 pb-2 pt-2">
      <view class="flex items-center justify-between text-xs text-gray-400">
        <view class="flex flex-1 items-center space-x-3">
          <view class="flex items-center space-x-1">
            <i class="i-lucide-eye" />
            <text>{{ article?.views }}</text>
          </view>
          <view class="flex items-center space-x-1">
            <i class="i-lucide-message-circle" />
            <text>{{ article?.commentCount }}</text>
          </view>
        </view>

        <view class="flex items-center space-x-1">
          <i class="i-lucide-heart" />
          <text>{{ article?.likes }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
