<script setup lang="ts">
import type { ArticleEntity } from '@/types/api/article'
import ImageCache from '@/components/imageCache.vue'
import { articleIdLikeUsingPost } from '@/service'
import { useUserStore } from '@/store'

const props = defineProps({
  article: {
    type: Object as () => ArticleEntity,
    default: () => ({}),
  },
})
// 定义emit事件
const emit = defineEmits<{
  (e: 'update:likeStatus', status: boolean): void
  (e: 'update:likeCount', count: number): void
  (e: 'comment'): void
}>()
const userStore = useUserStore()
// 加载状态
const likeLoading = ref(false)

// 点赞按钮
async function handleClickLike() {
  if (likeLoading.value) {
    return
  }
  try {
    likeLoading.value = true
    const currentStatus = props.article.isLiked || false
    const currentCount = props.article.likes || 0

    // TODO: 调用点赞API
    await articleIdLikeUsingPost({
      params: {
        id: String(props.article.id),
      },
      body: {
        reactionType: 'like',
      },
    })

    // 通过emit通知父组件更新状态
    emit('update:likeStatus', !currentStatus)
    emit('update:likeCount', currentStatus ? currentCount - 1 : currentCount + 1)
  }

  finally {
    likeLoading.value = false
  }
}

// 评论按钮
function handleClickComment() {
  emit('comment')
}
</script>

<template>
  <view class="relative h-12 flex items-center gap-2 px-4">
    <view class="flex flex-1 items-center">
      <!-- 输入框 -->
      <view
        class="block h-8 flex flex-1 items-center gap-2 rounded-full bg-[#f5f5f5] px-2"
        @click="handleClickComment"
      >
        <ImageCache :src="userStore.userInfo.avatar || ''" border-radius="9999px" height="24px" width="24px" />
        <text class="text-sm text-sm text-[#999999]">{{ $t('article.comment') }}</text>
      </view>
    </view>
    <!-- 交互控件 -->
    <view class="flex items-center justify-around gap-2">
      <view class="flex flex-col items-center justify-center px-2" @click="handleClickLike">
        <i
          class="size-4" :class="[
            article?.isLiked ? 'i-lucide:thumbs-up text-[#ff6b6b]' : 'i-lucide:thumbs-up text-[#999999]',
          ]"
        />
        <text class="text-sm" :class="article?.isLiked ? 'text-[#ff6b6b]' : 'text-[#999999]'">
          {{ article?.likes || 0 }}
        </text>
      </view>
    </view>
    <view class="top-border-only" />
  </view>
</template>

<style scoped>
.top-border-only {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 1px;
  left: 0;
  top: 0;
  transform: scaleY(0.5);
  background: var(--wot-color-border-light, #e8e8e8);
}
</style>
