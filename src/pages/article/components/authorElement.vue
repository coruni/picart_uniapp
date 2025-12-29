<script setup lang="ts">
import type { ArticleEntity } from '@/api/types/article'
import ImageCache from '@/components/imageCache.vue'
import { userIdFollowUsingPost, userIdUnfollowUsingPost } from '@/service'

const props = defineProps({
  article: {
    type: Object as () => ArticleEntity,
    default: () => ({}),
  },
})

// 定义emit事件
const emit = defineEmits<{
  (e: 'update:followStatus', status: boolean): void
}>()

const authorElement = ref<HTMLElement>()

defineExpose({
  authorElement,
  handleClickFollow,
})

const loading = ref(false)

// 关注按钮
async function handleClickFollow() {
  try {
    loading.value = true
    const currentStatus = props.article.author.isFollowed
    const userId = String(props.article.author.id)

    if (currentStatus) {
      // 取消关注
      await userIdUnfollowUsingPost({
        params: {
          id: userId,
        },
      })
    }
    else {
      // 关注
      await userIdFollowUsingPost({
        params: {
          id: userId,
        },
      })
    }

    // 通过emit通知父组件更新状态
    emit('update:followStatus', !currentStatus)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <view id="author-element" ref="authorElement" class="px-4">
    <view class="box-border w-full flex items-center rounded-xl bg-gray-100 px-3 py-1">
      <view class="flex flex-1 items-center space-x-2">
        <view class="size-10">
          <ImageCache border-radius="9999px" use-cache width="100%" height="100%" :src="article.author?.avatar || ''" />
        </view>
        <view class="h-full">
          <view class="text-sm font-bold">
            {{ article.author?.nickname || article.author?.username || '未知作者' }}
          </view>
          <view class="line-clamp-1 text-ellipsis">
            <wd-text size="10px" :text="article.author?.description || ''" />
          </view>
        </view>
      </view>
      <view class="flex items-center justify-center">
        <wd-button
          custom-class="bg-transparent! px-6!"
          plain
          size="small" :type="article.author.isFollowed ? 'info' : 'primary'" :loading="loading"
          @click="handleClickFollow"
        >
          <text>{{ article.author.isFollowed ? '已关注' : '关注' }}</text>
        </wd-button>
      </view>
    </view>
  </view>
</template>
