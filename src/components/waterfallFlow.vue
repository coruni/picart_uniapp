<script lang="ts" setup>
import type { ArticleEntity } from '@/api/types/article'

// 扩展ArticleEntity类型，添加_imageHeight属性
interface ExtendedArticleEntity extends Omit<ArticleEntity, 'author'> {
  _imageHeight?: number
  author: ArticleEntity['author'] & {
    lastActiveAt: unknown
  }
}

interface Props {
  articles: ExtendedArticleEntity[]
  columnCount?: number
  columnGap?: string
  containerPadding?: string
}

interface ImageInfo {
  width: number
  height: number
  loaded: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columnCount: 2,
  columnGap: '8px',
  containerPadding: '1',
})

// 瀑布流列数据
const columns = ref<ExtendedArticleEntity[][]>([])
// 各列高度
const columnHeights = ref<number[]>([])
// 最大图片高度（屏幕高度的3/4）
const maxImageHeight = ref(0)
// 缓存已加载的图片信息
const imageInfoCache = ref<Map<string, ImageInfo>>(new Map())
// 缓存已计算的高度信息
const heightCache = ref<Map<string, { estimated: number, precise?: number, imageHeight?: number }>>(new Map())
// 列宽度
const columnWidth = ref(0)
// 已处理的文章ID集合
const processedIds = ref<Set<string>>(new Set())

onMounted(() => {
  initColumns()

  uni.getSystemInfo({
    success: (res) => {
      maxImageHeight.value = Math.floor(res.windowHeight * 0.75)
      const padding = 16
      const gap = Number.parseInt(props.columnGap) || 8
      columnWidth.value = Math.floor((res.windowWidth - padding * 2 - gap * (props.columnCount - 1)) / props.columnCount)
    },
  })
})

// 初始化列数组
function initColumns() {
  const count = props.columnCount
  columns.value = Array.from({ length: count }, () => [])
  columnHeights.value = Array.from({ length: count }, () => 0)
}

// 估算卡片高度（使用缓存）
function getEstimatedHeight(article: ArticleEntity): number {
  const articleId = article.id.toString()
  const cached = heightCache.value.get(articleId)

  if (cached) {
    return cached.estimated
  }

  const titleLines = Math.ceil(article.title.length / 12)
  const titleHeight = titleLines * 22
  const estimatedImageHeight = 200
  const otherHeight = 60
  const cardMargin = 8

  const estimated = estimatedImageHeight + titleHeight + otherHeight + cardMargin

  heightCache.value.set(articleId, { estimated })

  return estimated
}

// 预加载图片并计算精确高度
async function loadImageAndCalculateHeight(article: ArticleEntity, columnIndex: number, articleIndex: number) {
  const articleId = article.id.toString()
  const imageUrl = article.cover || article.images?.[0]

  if (!imageUrl)
    return

  // 检查是否已经计算过精确高度
  const cached = heightCache.value.get(articleId)
  if (cached?.precise) {
    return
  }

  try {
    // 检查图片缓存
    let imageInfo = imageInfoCache.value.get(imageUrl)

    if (!imageInfo) {
      // 加载图片
      // #ifdef H5
      imageInfo = await new Promise<ImageInfo>((resolve) => {
        const img = new Image()
        img.onload = () => {
          const info: ImageInfo = {
            width: img.width,
            height: img.height,
            loaded: true,
          }
          imageInfoCache.value.set(imageUrl, info)
          resolve(info)
        }
        img.onerror = () => {
          const info: ImageInfo = { width: 300, height: 200, loaded: false }
          imageInfoCache.value.set(imageUrl, info)
          resolve(info)
        }
        img.src = imageUrl
      })
      // #endif

      // #ifndef H5
      imageInfo = await new Promise<ImageInfo>((resolve) => {
        uni.getImageInfo({
          src: imageUrl,
          success: (res) => {
            const info: ImageInfo = {
              width: res.width,
              height: res.height,
              loaded: true,
            }
            imageInfoCache.value.set(imageUrl, info)
            resolve(info)
          },
          fail: () => {
            const info: ImageInfo = { width: 300, height: 200, loaded: false }
            imageInfoCache.value.set(imageUrl, info)
            resolve(info)
          },
        })
      })
      // #endif
    }

    // 计算图片显示高度 - 保持宽高比
    const aspectRatio = imageInfo.height / imageInfo.width
    const displayHeight = columnWidth.value * aspectRatio
    const imageHeight = Math.min(displayHeight, maxImageHeight.value)

    // 计算精确的卡片高度
    const titleLines = Math.ceil(article.title.length / 12)
    const titleHeight = titleLines * 22
    const otherHeight = 60
    const cardMargin = 8
    const preciseHeight = imageHeight + titleHeight + otherHeight + cardMargin

    // 更新缓存
    const oldCache = heightCache.value.get(articleId)
    heightCache.value.set(articleId, {
      estimated: oldCache?.estimated || preciseHeight,
      precise: preciseHeight,
      imageHeight,
    })

    // 更新文章的图片高度
    if (columns.value[columnIndex]?.[articleIndex]) {
      columns.value[columnIndex][articleIndex]._imageHeight = imageHeight

      // 调整列高度
      const heightDiff = preciseHeight - (oldCache?.estimated || 0)
      columnHeights.value[columnIndex] += heightDiff
    }
  }
  catch (error) {
    console.error('加载图片失败:', error)
  }
}

// 分配单个文章到列
function distributeArticle(article: ArticleEntity) {
  const articleId = article.id.toString()

  // 避免重复处理
  if (processedIds.value.has(articleId)) {
    return
  }

  processedIds.value.add(articleId)

  // 获取估算高度
  const estimatedHeight = getEstimatedHeight(article)

  // 找到高度最小的一列
  let minHeightIndex = 0
  let minHeight = columnHeights.value[0]

  for (let i = 1; i < columnHeights.value.length; i++) {
    if (columnHeights.value[i] < minHeight) {
      minHeight = columnHeights.value[i]
      minHeightIndex = i
    }
  }

  // 添加到列中
  const articleIndex = columns.value[minHeightIndex].length

  // 检查缓存中是否有精确的图片高度
  const cached = heightCache.value.get(articleId)
  const imageHeight = cached?.imageHeight || 200

  columns.value[minHeightIndex].push({
    ...article,
    _imageHeight: imageHeight,
  })
  columnHeights.value[minHeightIndex] += estimatedHeight

  // 异步加载图片并更新高度（不阻塞）
  loadImageAndCalculateHeight(article, minHeightIndex, articleIndex)
}

// 批量分配文章
function distributeArticles(articles: ArticleEntity[]) {
  articles.forEach(article => distributeArticle(article))
}

// 重置并分配
function resetAndDistribute(articles: ArticleEntity[]) {
  initColumns()
  processedIds.value.clear()
  distributeArticles(articles)
}

// 监听文章数据变化
watch(
  () => props.articles,
  (newArticles, oldArticles) => {
    if (!newArticles || newArticles.length === 0) {
      initColumns()
      processedIds.value.clear()
      return
    }

    const isFirstLoad = !oldArticles || oldArticles.length === 0
    const isRefresh = oldArticles && oldArticles.length > 0
      && newArticles.length > 0
      && newArticles[0].id !== oldArticles[0].id

    if (isFirstLoad || isRefresh) {
      // 首次加载或刷新
      resetAndDistribute(newArticles)
    }
    else if (newArticles.length > (oldArticles?.length || 0)) {
      // 加载更多，只处理新文章
      const oldArticleIds = new Set((oldArticles || []).map(a => a.id))
      const onlyNewArticles = newArticles.filter(a => !oldArticleIds.has(a.id))

      if (onlyNewArticles.length > 0) {
        distributeArticles(onlyNewArticles)
      }
    }
  },
  { immediate: true, deep: false },
)

// 监听列数变化
watch(
  () => props.columnCount,
  () => {
    if (props.articles && props.articles.length > 0) {
      resetAndDistribute(props.articles)
    }
  },
)

// 暴露重置方法
function reset() {
  initColumns()
  processedIds.value.clear()
  // 保留 heightCache 和 imageInfoCache，避免重复计算
}

// 清除缓存方法（用于切换分类时）
function clearCache() {
  initColumns()
  processedIds.value.clear()
  // 保留 heightCache 和 imageInfoCache，避免重复计算
  // 只清除布局相关的数据，保留图片高度缓存
}

defineExpose({
  reset,
  clearCache,
})
</script>

<template>
  <view class="waterfall-container" :class="`px-${containerPadding}`">
    <view
      v-for="(column, columnIndex) in columns"
      :key="`column-${columnIndex}`"
      class="waterfall-column"
      :style="{
        width: `calc(${100 / columnCount}% - ${(columnCount - 1) * parseInt(columnGap) / columnCount}px)`,
        marginLeft: columnIndex > 0 ? columnGap : '0',
      }"
    >
      <slot
        v-for="(article, articleIndex) in column"
        :key="article.id"
        name="item"
        :article="article"
        :index="articleIndex"
        :column-index="columnIndex"
        :image-height="article._imageHeight"
      >
        <!-- 默认插槽内容 -->
        <view class="default-card">
          <view
            class="default-image"
            :style="{ minHeight: `${article._imageHeight || 200}px` }"
          >
            <image
              v-if="article.cover || article.images?.[0]"
              :src="article.cover || article.images[0]"
              mode="widthFix"
              lazy-load
            />
          </view>
          <view class="default-title">
            {{ article.title }}
          </view>
        </view>
      </slot>
    </view>
  </view>
</template>

<style scoped>
.waterfall-container {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;
}

.waterfall-column {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* 默认卡片样式 */
.default-card {
  margin-bottom: 8px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.default-image {
  width: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-image image {
  width: 100%;
  display: block;
}

.default-title {
  padding: 8px;
  font-size: 14px;
  line-height: 1.4;
}
</style>
