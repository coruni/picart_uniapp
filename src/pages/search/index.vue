<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'
import { articleSearchUsingGet } from '@/service'

interface ExtendedArticleEntity extends Omit<ArticleEntity, 'author'> {
  _imageHeight?: number
  author: ArticleEntity['author'] & {
    lastActiveAt: unknown
  }
}

defineOptions({
  name: 'SearchPage',
})
definePage({
  style: {
    navigationStyle: 'custom',
  },
})

const searchKeyword = ref('')
const articleData = ref<ExtendedArticleEntity[]>([])
const paging = ref<ZPagingRef>()
const waterfallRef = ref()
const showHistory = ref(true)
const showHot = ref(true)
const isFocused = ref(false)
const showSuggestions = ref(false)
const suggestions = ref<string[]>([])
const inputRef = ref()
const navbarRef = ref()

const hotKeywords = ref([
  'Vue3',
  'TypeScript',
  'Uniapp',
  'Vite',
  '前端开发',
  '移动端',
  '小程序',
  'H5',
  '跨平台',
  '组件库',
])

const historyKeywords = ref<string[]>([])

onMounted(() => {
  loadHistoryKeywords()
})

function loadHistoryKeywords() {
  try {
    const saved = uni.getStorageSync('search_history')
    if (saved && Array.isArray(saved)) {
      historyKeywords.value = saved
    }
  }
  catch (e) {
    console.error('加载搜索历史失败:', e)
  }
}

function saveHistoryKeyword(keyword: string) {
  if (!keyword.trim())
    return

  const index = historyKeywords.value.indexOf(keyword)
  if (index > -1) {
    historyKeywords.value.splice(index, 1)
  }
  historyKeywords.value.unshift(keyword)

  if (historyKeywords.value.length > 10) {
    historyKeywords.value = historyKeywords.value.slice(0, 10)
  }

  try {
    uni.setStorageSync('search_history', historyKeywords.value)
  }
  catch (e) {
    console.error('保存搜索历史失败:', e)
  }
}

function clearHistory() {
  uni.showModal({
    title: '提示',
    content: '确定清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        historyKeywords.value = []
        try {
          uni.removeStorageSync('search_history')
        }
        catch (e) {
          console.error('清空搜索历史失败:', e)
        }
      }
    },
  })
}

function handleSearch(keyword?: string) {
  const targetKeyword = keyword || searchKeyword.value
  if (!targetKeyword.trim())
    return

  searchKeyword.value = targetKeyword
  saveHistoryKeyword(targetKeyword)
  showHistory.value = false
  showHot.value = false
  waterfallRef.value?.clearCache()
  paging.value?.reload()
}

function handleKeywordClick(keyword: string) {
  handleSearch(keyword)
}

function handleInputConfirm() {
  handleSearch()
}

function handleClear() {
  searchKeyword.value = ''
  showHistory.value = true
  showHot.value = true
  articleData.value = []
  showSuggestions.value = false
  suggestions.value = []
}

function handleFocus() {
  isFocused.value = true
  updateSuggestions()
}

function handleBlur() {
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

function handleInput() {
  updateSuggestions()
}

function updateSuggestions() {
  if (!searchKeyword.value.trim()) {
    showSuggestions.value = false
    suggestions.value = []
    return
  }

  const keyword = searchKeyword.value.toLowerCase().trim()
  const allKeywords = [...historyKeywords.value, ...hotKeywords.value]
  const filtered = allKeywords.filter(k => k.toLowerCase().includes(keyword))

  suggestions.value = [...new Set(filtered)].slice(0, 10)
  showSuggestions.value = suggestions.value.length > 0
}

function handleSuggestionClick(keyword: string) {
  searchKeyword.value = keyword
  showSuggestions.value = false
  suggestions.value = []
  handleSearch()
}

async function fetchData(page: number, limit: number) {
  if (!searchKeyword.value.trim()) {
    paging.value?.complete([])
    return
  }

  try {
    const res = await articleSearchUsingGet({
      params: {
        page,
        limit,
        keyword: searchKeyword.value,
      },
    })

    const articles = (res.data || []).map(article => ({
      ...article,
      _imageHeight: undefined,
    })) as ExtendedArticleEntity[]

    paging.value?.complete(articles)
  }
  catch (error) {
    console.error('搜索失败:', error)
    paging.value?.complete(false)
  }
}

function handleScroll(event: ZPagingParams.ScrollInfo) {
  console.log('Scroll:', event.detail.scrollTop)
}
</script>

<template>
  <z-paging
    ref="paging" v-model="articleData"
    @query="fetchData" @scroll="handleScroll"
  >
    <template #top>
      <view class="relative">
        <wd-navbar ref="navbarRef" left-arrow safe-area-inset-top :bordered="false" placeholder>
          <template #title>
            <view class="relative h-full flex flex-1 items-center">
              <view
                class="h-8 flex flex-1 items-center gap-2 rounded-full bg-[#f5f5f5] px-4"
                :class="{ 'ring-2 ring-primary': isFocused }"
              >
                <i class="i-lucide-search size-4 text-gray-400" />
                <input
                  ref="inputRef"
                  v-model="searchKeyword"
                  class="flex-1 bg-transparent text-sm"
                  placeholder="搜索文章"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @input="handleInput"
                  @confirm="handleInputConfirm"
                >
              </view>
            </view>
          </template>
          <template #right>
            <text class="text-sm text-primary" @click="handleSearch">搜索</text>
          </template>
        </wd-navbar>
        <view
          v-if="showSuggestions && suggestions.length > 0"
          class="absolute left-4 right-4 z-50 mt-2 rounded-xl bg-white shadow-lg"
        >
          <view class="max-h-80 overflow-y-auto">
            <view
              v-for="(item, index) in suggestions"
              :key="index"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
              @click="handleSuggestionClick(item)"
            >
              <i class="i-lucide-search size-4 text-gray-400" />
              <text class="flex-1 text-sm text-gray-700">{{ item }}</text>
              <i class="i-lucide-arrow-up-right size-4 text-gray-300" />
            </view>
          </view>
        </view>

        <view v-if="showHistory || showHot" class="bg-white px-4 pb-4">
          <view v-if="showHistory && historyKeywords.length > 0" class="mb-6">
            <view class="mb-3 flex items-center justify-between">
              <text class="text-sm text-gray-900 font-medium">搜索历史</text>
              <view class="flex items-center gap-1 text-gray-400" @click="clearHistory">
                <i class="i-lucide-trash-2 size-4" />
              </view>
            </view>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="(keyword, index) in historyKeywords" :key="index"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                @click="handleKeywordClick(keyword)"
              >
                {{ keyword }}
              </view>
            </view>
          </view>

          <view v-if="showHot">
            <view class="mb-3 flex items-center justify-between">
              <text class="text-sm text-gray-900 font-medium">热门搜索</text>
            </view>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="(keyword, index) in hotKeywords" :key="index"
                class="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                @click="handleKeywordClick(keyword)"
              >
                {{ keyword }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>

    <template #loading>
      <view class="h-full flex flex-col items-center justify-center">
        <wd-loading size="24px" />
        <text class="mt-4 text-gray-500">搜索中...</text>
      </view>
    </template>

    <template #empty>
      <view class="flex flex-col items-center justify-center py-20">
        <i class="i-lucide-search-x mb-4 size-16 text-gray-300" />
        <text class="text-sm text-gray-500">暂无搜索结果</text>
      </view>
    </template>

    <WaterfallFlow
      ref="waterfallRef" :articles="(articleData as ExtendedArticleEntity[])"
      :column-count="2" column-gap="4px" container-padding="1"
    >
      <template #item="{ article, imageHeight }">
        <ArticleCard :article="article as ArticleEntity" :image-height="imageHeight" />
      </template>
    </WaterfallFlow>
  </z-paging>
</template>

<style lang="scss" scoped>
:deep(.wd-navbar__title) {
  max-width: 70%;
  flex: 1;
}
</style>
