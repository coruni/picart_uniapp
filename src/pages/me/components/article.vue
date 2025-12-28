<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { storeToRefs } from 'pinia'
import { articleAuthorIdUsingGet } from '@/service'
import { useUserStore } from '@/store'
import { currRoute } from '@/utils'
import ArticleCardComponent from './articleCardComponent.vue'

defineOptions({
  name: 'ArticleComponent',
})
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const { userInfo } = storeToRefs(useUserStore())
const { id } = currRoute().query
const articleList = ref<ArticleEntity[]>([])
const paging = ref<ZPagingRef>()
const queryId = computed(() => props.id || id || String(userInfo.value?.id))
async function handleQuery(page: number, limit: number) {
  // 获取用户文章
  const res = await articleAuthorIdUsingGet({
    params: {
      id: queryId.value,
      page,
      limit,
    },
  })
  paging.value?.complete(res.data)
}

function loadMore() {
  paging.value?.doLoadMore()
}

defineExpose({
  loadMore,
})
</script>

<template>
  <z-paging ref="paging" v-model="articleList" use-page-scroll auto :refresher-enabled="false" @query="handleQuery">
    <block v-for="item in articleList" :key="item.id">
      <ArticleCardComponent :article="(item as ArticleEntity)" />
    </block>
  </z-paging>
</template>
