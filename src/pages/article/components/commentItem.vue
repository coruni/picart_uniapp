<script setup lang="ts">
import type { CommentEntity } from '@/api/types/comments'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const props = defineProps({
  comment: {
    type: Object as PropType<CommentEntity>,
    default: () => ({}),
  },
  articleId: {
    type: [String, Number],
    default: '',
  },
  paging: {
    type: Object as () => ZPagingRef | null,
    default: null,
  },
})

const emit = defineEmits<{
  (e: 'reply', comment: CommentEntity): void
}>()
const { userInfo } = storeToRefs(useUserStore())

function handleReply(comment: CommentEntity) {
  emit('reply', comment)
}

// 计算时间 分钟前 小时前 几天前 最后是具体时间
function formatTime(time: string) {
  const now = new Date()
  const commentTime = new Date(time)
  const diff = now.getTime() - commentTime.getTime()
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
const commentTime = computed(() => formatTime(props.comment.createdAt))
function toCommentDetail(comment: CommentEntity) {
  // encodeURIComponent 编码
  const commentData = encodeURIComponent(JSON.stringify(comment))
  uni.navigateTo({
    url: `/pages/article/commentDetail?id=${comment.id}&commentData=${commentData}`,
  })
}
</script>

<template>
  <view class="px-4" @click="handleReply(comment)">
    <view class="flex items-center gap-2">
      <view class="size-8 rounded-full">
        <ImageCache
          :src="comment?.author?.avatar || null" height="100%" width="100%" border-radius="999px" lazy-load
          viewport-lazy-load
        />
      </view>
      <view class="flex flex-1 flex-col">
        <view class="flex-1 text-sm font-semibold">
          <text>
            {{ comment?.author?.nickname || comment?.author?.username || '匿名用户' }}
          </text>
        </view>
        <view class="text-xs">
          <wd-text size="10px" :text="commentTime" />
        </view>
      </view>
      <view class="text-xs text-gray-400" @click="handleReply(comment)">
        <text>回复</text>
      </view>
    </view>
    <view class="py-2 pl-10">
      <text class="text-sm">
        {{ comment?.content || '' }}
      </text>
    </view>
    <view class="pb-2 pl-10">
      <block v-for="sub in comment.replies.slice(0, 2)" :key="sub.id">
        <view class="flex gap-1 py-1 text-xs">
          <view class="size-4 shrink-0">
            <ImageCache
              :src="sub?.author?.avatar || null" height="100%" width="100%" border-radius="999px" lazy-load
              viewport-lazy-load
            />
          </view>
          <view class="flex-1">
            <text class="font-semibold">
              {{ sub?.author?.nickname || sub?.author?.username || '' }}
            </text>
            <text v-if="sub.parent.id">回复</text>
            <text class="text-primary">
              {{ sub?.parent?.author?.nickname || sub?.parent?.author?.username || '' }}:
            </text>
            <text>{{ sub.content }}</text>
          </view>
        </view>
      </block>
      <view
        v-if="comment?.replyCount && comment?.replyCount > 2" class="bg-info-100 mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500"
        type="info"
        custom-class="w-12" @click.prevent="toCommentDetail(comment)"
      >
        <text>更多评论({{ comment?.replyCount || 0 }})</text>
        <i class="i-lucide:chevron-right size-4" />
      </view>
    </view>
  </view>
</template>
