<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { useImagePreviewStore } from '@/store'
import { navigateTo } from '@/utils/router'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
  imageHeight: {
    type: Number,
    default: 200,
  },
})

const imagePreviewStore = useImagePreviewStore()

const maxImageHeight = ref(0)

onMounted(() => {
  uni.getSystemInfo({
    success: (res) => {
      maxImageHeight.value = Math.floor(res.windowHeight * 0.75)
    },
  })
})

const actualImageHeight = computed(() => {
  if (maxImageHeight.value === 0) {
    return props.imageHeight
  }
  return Math.min(props.imageHeight, maxImageHeight.value)
})

const shouldUseFixedHeight = computed(() => {
  return props.imageHeight > maxImageHeight.value && maxImageHeight.value > 0
})

function toArticleDetail() {
  navigateTo(`/pages/article/index?id=${props.article.id}`)
}

function handleImageClick() {
  const images = props.article.images || []
  const cover = props.article.cover

  let displayImages: string[] = []
  if (images.length === 0 && cover) {
    displayImages = [cover]
  }
  else if (images.length === 1 && cover) {
    displayImages = [cover]
  }
  else {
    displayImages = images
  }

  imagePreviewStore.showPreview(displayImages, 0, props.article)
}
</script>

<template>
  <view class="relative" @click="toArticleDetail">
    <view
      class="overflow-hidden rounded-xl"
      :style="{
        height: `${actualImageHeight}px`,
        maxHeight: `${maxImageHeight || 300}px`,
      }"
      @click.stop="handleImageClick"
    >
      <ImageCache
        :src="article.cover || article?.images?.[0]"
        width="100%"
        height="100%"
        :use-cache="true"
        :mode="shouldUseFixedHeight ? 'widthFix' : 'aspectFill'"
        lazy-load
        custom-class="rounded-xl"
        :style="{
          objectFit: 'cover',
          maxHeight: '100%',
        }"
      />
    </view>
    <view class="overflow-hidden p-3 pt-1!">
      <view class="line-clamp-2 text-sm">
        {{ article.title }}
      </view>
    </view>
    <view class="flex items-center justify-between overflow-hidden px-3 pb-3">
      <view class="flex items-center space-x-2">
        <view class="size-4">
          <ImageCache
            width="100%"
            height="100%"
            mode="widthFix"
            :src="article?.author?.avatar || ''"
            border-radius="9999px"
            use-cache
            viewport-lazy-load
            border
          />
        </view>
        <wd-text :text="article?.author?.nickname || article?.author?.username || ''" size="12px" />
      </view>
      <view class="flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-sm space-x-2">
        <view class="i-lucide-heart size-4 text-[#999]" />
        <wd-text mode="text" :text="article?.likes || 0" size="12px" />
      </view>
    </view>
  </view>
</template>
