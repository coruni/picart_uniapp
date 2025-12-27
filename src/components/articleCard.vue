<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { navigateTo } from '@/utils/router'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
  // 添加图片高度属性
  imageHeight: {
    type: Number,
    default: 200,
  },
})

// 计算最大高度（屏幕高度的3/4）
const maxImageHeight = ref(0)

onMounted(() => {
  uni.getSystemInfo({
    success: (res) => {
      maxImageHeight.value = Math.floor(res.windowHeight * 0.75)
    },
  })
})

// 计算实际使用的图片高度（取较小值）
const actualImageHeight = computed(() => {
  if (maxImageHeight.value === 0) {
    return props.imageHeight
  }
  return Math.min(props.imageHeight, maxImageHeight.value)
})

// 计算图片容器是否需要固定高度
const shouldUseFixedHeight = computed(() => {
  return props.imageHeight > maxImageHeight.value && maxImageHeight.value > 0
})

function toArticleDetail() {
  navigateTo(`/pages/article/index?id=${props.article.id}`)
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
    >
      <ImageCache
        :src="article.cover || article.images[0]"
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
            :src="article.author.avatar || ''"
            border-radius="9999px"
            use-cache
            viewport-lazy-load
            border
          />
        </view>
        <wd-text :text="article.author.nickname" size="12px" />
      </view>
      <view class="flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-sm space-x-2">
        <view class="i-lucide-heart size-4 text-[#999]" />
        <wd-text mode="text" :text="article.likes" size="12px" />
      </view>
    </view>
  </view>
</template>
