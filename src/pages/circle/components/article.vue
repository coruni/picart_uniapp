<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { storeToRefs } from 'pinia'
import { articleUsingGet } from '@/service'
import { useAppStore } from '@/store'

interface ExtendedArticleEntity extends Omit<ArticleEntity, 'author'> {
  _imageHeight?: number
  author: ArticleEntity['author'] & {
    lastActiveAt: unknown
  }
}

defineOptions({
  name: 'ArticleComponent',
})
const props = defineProps({
  categoryId: {
    type: [Number, String],
    default: '',
  },
})

const { appConfig } = storeToRefs(useAppStore())
const articleData = ref<ExtendedArticleEntity[]>([])
const paging = ref<ZPagingRef>()
const waterfallRef = ref()

async function fetchData(page: number, limit: number) {
  try {
    const res = await articleUsingGet({
      params: {
        page,
        limit,
        categoryId: Number(props.categoryId),
      },
    })

    const articles = (res.data || []).map(article => ({
      ...article,
      _imageHeight: undefined,
    })) as ExtendedArticleEntity[]

    paging.value?.complete(articles)
  }
  catch (error) {
    console.error('获取文章列表失败:', error)
    paging.value?.complete(false)
  }
}

function handleTabChange(id: string) {
  waterfallRef.value?.clearCache()
  paging.value?.reload()
}

function loadMore() {
  paging.value?.doLoadMore()
}

function reload() {
  paging.value?.reload()
}

defineExpose({
  loadMore,
  reload,
  handleTabChange,
})
</script>

<template>
  <z-paging
    ref="paging" v-model="articleData" :fixed="false" auto use-cache :cache-key="`article-${categoryId}`" :show-loading-more-when-reload="false" :auto-show-loading-when-reload="false" @query="fetchData"
  >
    <template v-if="appConfig.site_layout === 'waterfall'">
      <WaterfallFlow
        :key="categoryId" ref="waterfallRef" :articles="(articleData as ExtendedArticleEntity[])"
        :column-count="2" column-gap="4px" container-padding="1"
      >
        <template #item="{ article, imageHeight }">
          <ArticleCard :article="(article as ArticleEntity)" :image-height="imageHeight" />
        </template>
      </WaterfallFlow>
    </template>
    <template v-else>
      <block v-for="item in articleData" :key="item.id">
        <ArticleNormal :article="(item as ArticleEntity)" />
      </block>
    </template>
  </z-paging>
</template>

<style scoped>

</style>
