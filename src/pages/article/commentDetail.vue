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
</script>

<template>
  <z-paging ref="paging" use-cache cache-mode="always" :cache-key="`commentDetail-${comment?.id}`" @query="fetchData">
    <template #top>
      <wd-navbar safe-area-inset-top left-arrow :bordered="false" />
    </template>
    <template #bottom>
      <article-footer :article="(comment?.article as any)" :show-button="false" :paging="paging" />
    </template>
  </z-paging>
</template>

<style lang="scss" scoped>
//
</style>
