<script lang="ts" setup>
import type { CommentEntity } from '@/api/types/comments'
import { commentArticleIdUsingGet } from '@/service'
import articleFooter from './components/articleFooter.vue'

const comment = ref<CommentEntity | null>(null)
const commentList = ref<CommentEntity[]>([])
const paging = ref<ZPagingRef>()
definePage({
  style: {
    navigationBarTitleText: '评论详情',
  },
})

onLoad((options) => {
  if (!options.commentData) {
    return
  }
  const commentData = decodeURIComponent(options.commentData)
  comment.value = commentData ? JSON.parse(commentData) as CommentEntity : null
})

async function fetchData(page: number, limit: number) {
  try {
    const res = await commentArticleIdUsingGet({
      params: {
        id: Number(comment?.value.article.id),
        page,
        limit,
      },
    })
    paging.value?.complete(res.data)
  }
  catch {
    paging.value?.complete(false)
  }
}
function handleClickLeft() {
  uni.navigateBack()
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
const commentTime = computed(() => formatTime(comment.value?.createdAt || ''))
</script>

<template>
  <z-paging
    ref="paging" v-model="commentList" use-cache cache-mode="always" :cache-key="`commentDetail-${comment?.id}`"
    @query="fetchData"
  >
    <template #top>
      <wd-navbar safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    </template>
    <view class="px-4">
      <view class="flex items-center gap-2">
        <view class="size-8">
          <ImageCache border :src="comment?.author?.avatar" border-radius="999px" height="100%" width="100%" />
        </view>
        <view class="flex flex-1 flex-col">
          <view class="flex items-center">
            <text class="text-sm font-bold">{{ comment?.author?.nickname || comment?.author?.username || '' }}</text>
          </view>
          <wd-text :text="commentTime" size="10px" />
        </view>
      </view>
    </view>
    <view class="pl-14 pr-4 pt-2">
      <text class="text-sm">
        {{ comment?.content || '' }}
      </text>
    </view>
    <view class="flex items-center justify-end px-4 pt-2">
      <view class="text-[#999999]] flex flex-col items-center justify-center">
        <i class="i-lucide-heart size-4" />
        <text class="text-xs">{{ 0 }}</text>
      </view>
    </view>
    <view class="my-4 h-1 bg-gray-100" />
    <view class="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2">
      <view class="text-sm font-medium">
        <text>评论</text>
      </view>
    </view>
    <block v-for="item in commentList" :key="item.id">
      <view class="px-4">
        <view class="flex items-center gap-2">
          <view class="size-7">
            <ImageCache
              :src="item?.author?.avatar || null" height="100%" width="100%" border-radius="999px"
              lazy-load viewport-lazy-load border
            />
          </view>
          <view class="flex flex-1 flex-col">
            <view class="flex-1 text-sm font-semibold">
              <text>
                {{ item?.author?.nickname || item?.author?.username || '' }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <view class="pl-13 pr-4 pt-2">
        <text class="text-sm">
          {{ item?.content || '' }}
        </text>
      </view>
    </block>
    <template #bottom>
      <article-footer
        :article="(comment?.article as any)" :show-button="false" :paging="paging" :reply-to="comment ? {
          id: comment.id.toString(),
          author: {
            nickname: comment.author.nickname,
            username: comment.author.username,
          },
        } : null"
      />
    </template>
  </z-paging>
</template>

<style lang="scss" scoped>
//
</style>
