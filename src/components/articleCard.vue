<script lang="ts" setup>
import type { ArticleEntity } from '@/types/api/article'
import { navigateTo } from '@/utils/router'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleEntity>,
    default: () => ({}),
  },
})

function toArticleDetail() {
  navigateTo(`/pages/article/index?id=${props.article.id}`)
}
</script>

<template>
  <view class="relative rounded bg-white" @click="toArticleDetail">
    <view class="aspect-[3/4] overflow-hidden rounded-t">
      <ImageCache
        :src="article.cover || article.images[0]" width="100%" height="100%" :use-cache="true"
        mode="aspectFill" lazy-load custom-class="rounded-t"
      />
    </view>
    <view class="overflow-hidden p-3 pt-1!">
      <!-- <wd-tag type="primary" size="small" color="white" class="text-[10px]">
        {{ article.category.name }}
      </wd-tag> -->
      <view class="line-clamp-2 text-sm">
        {{ article.title }}
      </view>
    </view>
    <view class="flex items-center justify-between overflow-hidden px-3 pb-3">
      <view class="flex items-center space-x-2">
        <view class="size-4">
          <ImageCache use-cache border width="100%" height="100%" mode="widthFix" :src="article.author.avatar || ''" border-radius="9999px" />
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
