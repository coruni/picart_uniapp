<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'

import { storeToRefs } from 'pinia'
import { t } from '@/locale'
import { articleUsingGet } from '@/service'
import { useAppStore } from '@/store/index'
import homeHeader from './components/homeHeader.vue'
// 扩展ArticleEntity类型，添加_imageHeight属性
interface ExtendedArticleEntity extends Omit<ArticleEntity, 'author'> {
  _imageHeight?: number
  author: ArticleEntity['author'] & {
    lastActiveAt: unknown // 允许任何类型，包括unknown
  }
}

defineOptions({
  name: 'Home',
})
const { appConfig } = storeToRefs(useAppStore())
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '%tabbar.home%',
  },
})

// 循环生成
const articleData = ref<ExtendedArticleEntity[]>([])
const paging = ref<ZPagingRef>()
const hiddenNavbar = ref<boolean>(false)
const waterfallRef = ref()
const categoryId = ref<string>()

async function fetchData(page: number, limit: number) {
  try {
    const res = await articleUsingGet({
      params: {
        page,
        limit,
        categoryId: Number(categoryId.value),
      },
    })

    // 将API返回的数据转换为ExtendedArticleEntity类型
    const articles = (res.data || []).map(article => ({
      ...article,
      _imageHeight: undefined, // 添加_imageHeight属性
    })) as ExtendedArticleEntity[]

    // 通知z-paging完成加载
    paging.value?.complete(articles)
  }
  catch (error) {
    console.error('获取文章列表失败:', error)
    paging.value?.complete(false)
  }
}

function handleScroll(event: ZPagingParams.ScrollInfo) {
  if (event.detail.scrollTop > 50) {
    hiddenNavbar.value = true
  }
  else {
    hiddenNavbar.value = false
  }
}

function handleTabChange(id: string) {
  categoryId.value = id
  waterfallRef.value?.clearCache()
  paging.value?.reload()
}
</script>

<template>
  <z-paging
    ref="paging" v-model="articleData" cache-mode="default" :cache-key="`home-article-list-${categoryId}`"
    use-cache :auto-hide-loading-after-first-loaded="false" :auto-show-loading-when-reload="true" @query="fetchData"
    @scroll="handleScroll"
  >
    <template #loading>
      <view class="h-full flex flex-col items-center justify-center">
        <wd-loading size="24px" />
        <text class="mt-4 text-gray-500">{{ t('common.loading') }}</text>
      </view>
    </template>
    <template #top>
      <view class="px-1">
        <homeHeader @change="handleTabChange" />
      </view>
    </template>
    <template v-if="appConfig.site_layout === 'waterfall'">
      <WaterfallFlow
        :key="categoryId" ref="waterfallRef" :articles="(articleData as ExtendedArticleEntity[])"
        :column-count="2" column-gap="4px" container-padding="1"
      >
        <template #item="{ article, imageHeight }">
          <ArticleCard :article="article as ArticleEntity" :image-height="imageHeight" />
        </template>
      </WaterfallFlow>
    </template>
    <template v-else>
      <block v-for="article in articleData" :key="article.id">
        <ArticleNormal :article="(article as ArticleEntity)" />
      </block>
    </template>

    <template #bottom>
      <!-- 自定义tabbar占位 -->
      <view class="h-50px" />
    </template>
  </z-paging>
</template>
