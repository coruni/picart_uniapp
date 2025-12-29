<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { useImagePreviewStore } from '@/store'
import { formatTime } from '@/utils/date'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
})

const imagePreviewStore = useImagePreviewStore()

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
  return images.slice(0, 3)
})

const isSingleImage = computed(() => {
  return displayImages.value.length === 1
})

function toArticleDetail() {
  uni.navigateTo({
    url: `/pages/article/index?id=${props.article.id}`,
  })
}

function handleImageClick(index: number) {
  imagePreviewStore.showPreview(displayImages.value, index, props.article)
}

function toUserDetail() {
  uni.navigateTo({
    url: `/pages-fg/user/index?id=${props.article?.author?.id}`,
  })
}
</script>

<template>
  <view @click="toArticleDetail">
    <view class="flex items-center px-4 pt-2">
      <view class="flex flex-1" @click.stop="toUserDetail">
        <view class="size-8">
          <ImageCache :src="article?.author?.avatar" border-radius="999px" border height="100%" width="100%" />
        </view>
        <view class="ml-2 flex flex-1 flex-col">
          <view class="text-sm text-gray-800 font-500">
            {{ article?.author?.nickname ?? article?.author?.username ?? '' }}
          </view>
          <wd-text :text="articleTime" size="10px" />
        </view>
      </view>
    </view>
    <view class="px-4 pt-2">
      <view>
        <text class="font-500">{{ article?.title }}</text>
      </view>
      <view class="py-1">
        <text v-if="articleSummary?.length" class="line-clamp-2 text-xs text-gray-400">{{ articleSummary }}</text>
      </view>
      <view v-if="!!article.cover">
        <view class="relative mt-2 h-48 w-full overflow-hidden rounded-xl" @click.stop="handleImageClick(0)">
          <ImageCache :src="article.cover" border-radius="12px" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          <view class="absolute bottom-1 right-1 flex items-center gap-1 rounded-lg bg-black/60 px-1.5 py-0.5 text-[10px] text-white space-x-1">
            <i class="i-lucide:newspaper" />
          </view>
        </view>
      </view>
      <view v-if="displayImages.length > 0 && !article.cover" class="mt-2">
        <view v-if="isSingleImage" class="relative max-h-48 max-w-32 overflow-hidden rounded-lg" @click.stop="handleImageClick(0)">
          <ImageCache :src="displayImages[0]" mode="widthFix" width="100%" height="100%" :use-cache="true" />
        </view>
        <view v-else-if="displayImages.length === 2" class="h-48 flex gap-1">
          <view class="relative flex-1 overflow-hidden rounded-l-lg" @click.stop="handleImageClick(0)">
            <ImageCache :src="displayImages[0]" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden rounded-r-lg" @click.stop="handleImageClick(1)">
            <ImageCache :src="displayImages[1]" mode="aspectFill" width="100%" height="100%" :use-cache="true" />
          </view>
        </view>
        <view v-else-if="displayImages.length === 3" class="h-28 flex gap-1">
          <view class="relative flex-1 overflow-hidden rounded-l-lg" @click.stop="handleImageClick(0)">
            <ImageCache :src="displayImages[0]" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden" @click.stop="handleImageClick(1)">
            <ImageCache :src="displayImages[1]" width="100%" height="100%" :use-cache="true" />
          </view>
          <view class="relative flex-1 overflow-hidden rounded-r-lg" @click.stop="handleImageClick(2)">
            <ImageCache :src="displayImages[2]" width="100%" height="100%" :use-cache="true" />
            <view class="absolute bottom-1 right-1 flex items-center gap-1 rounded-lg bg-black/60 px-1 py-0.5 text-[10px] text-white space-x-1">
              <i class="i-lucide-image" />
              +{{ article.imageCount - 3 }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="article?.tags?.length" class="px-4 pt-2 space-x-2">
      <block v-for="tag in article?.tags" :key="tag.id">
        <wd-tag size="small" round plain type="primary" custom-class="rounded-full! mt-2">
          {{ tag.name }}
        </wd-tag>
      </block>
    </view>
    <view class="px-4 pt-4">
      <view class="flex items-center justify-between text-xs text-gray-400">
        <view class="flex flex-1 items-center space-x-3">
          <view class="flex items-center space-x-1">
            <i class="i-lucide-eye" />
            <text>{{ article?.views || 0 }}</text>
          </view>
          <view class="flex items-center space-x-1">
            <i class="i-lucide-message-circle" />
            <text>{{ article?.commentCount || 0 }}</text>
          </view>
        </view>

        <view class="flex items-center space-x-1">
          <i class="i-lucide-heart" />
          <text>{{ article?.likes || 0 }}</text>
        </view>
      </view>
    </view>
    <view class="my-4 h-[1px] bg-gray-100 dark:bg-gray-700" />
  </view>
</template>
