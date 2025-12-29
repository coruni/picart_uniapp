<script setup lang="ts">
import type { CommentEntity } from '@/api/types/comments'
import { storeToRefs } from 'pinia'
import { t } from '@/locale'
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
  <view class="px-4 pb-4" @click="handleReply(comment)">
    <view class="flex items-center gap-3">
      <view class="size-8 rounded-full">
        <ImageCache
          :src="comment?.author?.avatar || null" height="100%" width="100%" border-radius="999px" lazy-load
          viewport-lazy-load border
        />
      </view>
      <view class="flex flex-1 flex-col">
        <view class="flex-1 text-sm font-semibold">
          <text>
            {{ comment?.author?.nickname || comment?.author?.username || '匿名用户' }}
          </text>
        </view>
        <view class="h-4 text-xs text-[#999]">
          <!-- <text>{{ commentTime }}</text> -->
          <!-- 这里要放楼层 -->
        </view>
      </view>
      <view class="text-lg text-[#999]" @click="handleReply(comment)">
        <i class="i-lucide:ellipsis-vertical" />
      </view>
    </view>
    <view class="py-2 pl-11">
      <text class="text-sm">
        {{ comment?.content || '' }}
      </text>
    </view>
    <view class="pb-3 pl-11">
      <view class="flex items-center space-x-2">
        <view class="flex-1">
          <text class="text-xs text-[#999]"> {{ commentTime }}</text>
        </view>
        <view class="flex items-center space-x-2">
          <view class="flex items-center text-xs space-x-1">
            <i class="i-lucide:message-circle" />
            <text>{{ t('component.comment.reply') }}</text>
          </view>
          <view class="flex items-center text-xs space-x-1">
            <i class="i-lucide-heart" />
            <text>{{ comment?.likes || 0 }}</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="comment?.replies?.length > 0" class="pb-3 pl-11">
      <view class="border-b-0 border-l-2 border-r-0 border-t-0 border-gray-100 border-solid pl-2 space-y-3" @click.prevent.stop="toCommentDetail(comment)">
        <block v-for="sub in comment.replies.slice(0, 2)" :key="sub.id">
          <view class="flex flex-col gap-1 text-xs">
            <view class="flex items-center space-x-2">
              <view class="size-4 shrink-0">
                <ImageCache
                  :src="sub?.author?.avatar || null" height="100%" width="100%" border-radius="999px"
                  lazy-load viewport-lazy-load border
                />
              </view>
              <text class="font-semibold">
                {{ sub?.author?.nickname || sub?.author?.username || '' }}
              </text>
            </view>

            <view class="flex-1">
              <view v-if="sub.parent.id !== comment.id">
                <text>{{ t('component.comment.reply') }}</text>
                <text class="text-primary">
                  {{ sub?.parent?.author?.nickname || sub?.parent?.author?.username || '' }}:
                </text>
              </view>

              <text>{{ sub?.content }}</text>
            </view>
          </view>
        </block>
      </view>

      <view
        v-if="comment?.replyCount >= 3"
        class="bg-info-100 mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500"
        type="info" custom-class="w-12" @click.prevent.stop="toCommentDetail(comment)"
      >
        <text>{{ t('component.comment.replies', { count: comment?.replyCount || 0 }) }}</text>
        <i class="i-lucide:chevron-right size-4" />
      </view>
    </view>
  </view>
</template>
