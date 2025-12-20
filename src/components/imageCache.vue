<script lang="ts" setup>
import { nextTick, onBeforeUnmount } from 'vue'

interface Props {
  src?: string
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  placeholder?: string
  errorImage?: string
  lazyLoad?: boolean
  fadeShow?: boolean
  duration?: number
  useCache?: boolean
  cacheKey?: string
  border?: boolean
  customClass?: string
  defaultHeight?: number
  loadingType?: 'ring' | 'outline'
  showSkeleton?: boolean
  skeletonColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  mode: 'aspectFill',
  width: '',
  height: '',
  borderRadius: '0',
  placeholder: '',
  errorImage: '',
  lazyLoad: true,
  fadeShow: true,
  duration: 300,
  useCache: true,
  cacheKey: '',
  border: false,
  customClass: '',
  defaultHeight: 200,
  loadingType: 'ring',
  showSkeleton: false,
  skeletonColor: '#f0f0f0',
})

const emit = defineEmits<{
  load: [event: ImageLoadEvent]
  error: [event: ImageErrorEvent]
  click: [event: Event]
}>()

interface ImageLoadEvent {
  detail: {
    width: number
    height: number
  }
}

interface ImageErrorEvent {
  detail: {
    errMsg: string
  }
}

const imageSrc = ref('')
const isLoading = ref(true)
const isError = ref(false)
const isLoaded = ref(false)
const retryCount = ref(0)
const maxRetryCount = 2
const loadingTimer = ref<number | null>(null)
const isMounted = ref(false)

// 计算容器样式 - 确保始终有明确的高度
const containerStyle = computed(() => {
  const style: any = {}

  // 宽度处理
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  // 高度处理 - 关键修复：确保加载时有明确高度
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    style.minHeight = style.height
  }
  else if (props.mode === 'widthFix') {
    // widthFix模式下，设置最小高度防止塌陷
    style.minHeight = `${props.defaultHeight}px`
  }
  else {
    // 其他模式，明确设置高度
    style.height = `${props.defaultHeight}px`
    style.minHeight = `${props.defaultHeight}px`
  }

  // 圆角处理
  if (props.borderRadius !== '0') {
    style.borderRadius = typeof props.borderRadius === 'number'
      ? `${props.borderRadius}px`
      : props.borderRadius
  }

  return style
})

// 计算图片样式
const imageStyle = computed(() => {
  const style: any = {}

  // 圆角处理
  if (props.borderRadius !== '0') {
    style.borderRadius = typeof props.borderRadius === 'number'
      ? `${props.borderRadius}px`
      : props.borderRadius
  }

  // 宽度处理
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  // 高度处理
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  else if (props.mode !== 'widthFix') {
    style.height = '100%'
  }

  return style
})

// 计算容器类名
const containerClasses = computed(() => {
  const classes = ['relative', 'block', 'overflow-hidden']

  // 确保背景色在加载时显示
  if (isLoading.value || isError.value) {
    classes.push('bg-gray-100')
  }

  if (!props.width) {
    classes.push('w-full')
  }

  if (!props.height && props.mode !== 'widthFix') {
    classes.push('flex', 'items-center', 'justify-center')
  }

  if (props.border) {
    classes.push('border', 'border-solid', 'border-gray-300')
  }

  return classes.join(' ')
})

function getCacheKey(src: string): string {
  return props.cacheKey || `image_cache_${src}`
}

function getImageFromCache(key: string): string | null {
  try {
    return uni.getStorageSync(key)
  }
  catch (e) {
    console.error('获取图片缓存失败', e)
    return null
  }
}

function saveImageToCache(key: string, src: string): void {
  try {
    uni.setStorageSync(key, src)
  }
  catch (e) {
    console.error('保存图片缓存失败', e)
  }
}

async function downloadAndCacheImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    saveImageToCache(getCacheKey(src), src)
    resolve(src)
    // #endif

    // #ifndef H5
    uni.downloadFile({
      url: src,
      timeout: 30000,
      success: (res) => {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath

          uni.saveFile({
            tempFilePath,
            success: (saveRes) => {
              const savedFilePath = saveRes.savedFilePath
              saveImageToCache(getCacheKey(src), savedFilePath)
              resolve(savedFilePath)
            },
            fail: () => {
              saveImageToCache(getCacheKey(src), tempFilePath)
              resolve(tempFilePath)
            },
          })
        }
        else {
          reject(new Error(`下载图片失败，状态码：${res.statusCode}`))
        }
      },
      fail: (error) => {
        reject(error)
      },
    })
    // #endif
  })
}

async function loadImage() {
  // 清除之前的定时器
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  if (!props.src) {
    isError.value = true
    isLoading.value = false
    return
  }

  // 重置状态
  isLoading.value = true
  isError.value = false
  isLoaded.value = false
  retryCount.value = 0

  try {
    let finalSrc = props.src

    // 处理缓存逻辑
    if (props.useCache && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
      const cacheKey = getCacheKey(props.src)
      const cachedPath = getImageFromCache(cacheKey)

      if (cachedPath) {
        // #ifdef H5
        finalSrc = cachedPath
        // #endif

        // #ifndef H5
        // 验证缓存文件
        try {
          await new Promise((resolve, reject) => {
            uni.getFileInfo({
              filePath: cachedPath,
              success: (res) => {
                if (res.size > 0) {
                  resolve(res)
                }
                else {
                  reject(new Error('文件大小为0'))
                }
              },
              fail: reject,
            })
          })
          finalSrc = cachedPath
        }
        catch {
          // 缓存失效，重新下载
          try {
            finalSrc = await downloadAndCacheImage(props.src)
          }
          catch {
            finalSrc = props.src
          }
        }
        // #endif
      }
      else {
        // 首次下载
        try {
          finalSrc = await downloadAndCacheImage(props.src)
        }
        catch {
          finalSrc = props.src
        }
      }
    }

    // 关键修复：使用nextTick确保DOM更新
    imageSrc.value = finalSrc

    await nextTick()

    // 设置超时保护，防止图片一直处于加载状态
    loadingTimer.value = setTimeout(() => {
      if (isLoading.value && !isLoaded.value && !isError.value) {
        console.warn('图片加载超时:', props.src)
        isLoading.value = false
        isError.value = true
      }
    }, 15000) as unknown as number
  }
  catch (error) {
    console.error('加载图片失败', error)
    isError.value = true
    isLoading.value = false
  }
}

function handleLoad(event: any) {
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  isLoaded.value = true
  isLoading.value = false
  isError.value = false
  emit('load', event)
}

function handleError(event: ImageErrorEvent) {
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  console.error('图片加载失败:', event)

  // 重试机制
  // #ifndef H5
  if (retryCount.value < maxRetryCount && props.src && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
    retryCount.value++
    console.log(`尝试重新加载图片 (第${retryCount.value}次):`, props.src)

    if (props.useCache) {
      const cacheKey = getCacheKey(props.src)
      try {
        uni.removeStorageSync(cacheKey)
      }
      catch (e) {
        console.warn('清除缓存失败:', e)
      }
    }

    setTimeout(() => {
      if (isMounted.value) {
        loadImage()
      }
    }, 1000)
    return
  }
  // #endif

  isError.value = true
  isLoading.value = false
  emit('error', event)
}

function handleClick(event: Event) {
  emit('click', event)
}

// 监听src变化
watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc && isMounted.value) {
    loadImage()
  }
}, { immediate: false })

onMounted(() => {
  isMounted.value = true
  loadImage()
})

onBeforeUnmount(() => {
  isMounted.value = false
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }
})

defineExpose({
  loadImage,
  reload: loadImage,
})
</script>

<template>
  <view
    :class="containerClasses"
    :style="containerStyle"
    class="image-cache-container"
    @click="handleClick"
  >
    <!-- 加载中状态 -->
    <view
      v-if="isLoading"
      class="absolute inset-0 z-10 flex items-center justify-center"
    >
      <view v-if="placeholder" class="h-full w-full">
        <image :src="placeholder" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else-if="showSkeleton" class="h-full w-full" :style="{ backgroundColor: skeletonColor }">
        <view class="h-full w-full animate-pulse">
          <view class="h-full w-full from-transparent via-white to-transparent bg-gradient-to-r opacity-30" />
        </view>
      </view>
      <view v-else class="flex flex-col items-center justify-center">
        <view class="relative">
          <view class="h-12 w-12 rounded-full bg-gray-200 opacity-50" />
          <view class="absolute left-0 top-0 h-full w-full flex items-center justify-center">
            <wd-loading :type="loadingType" :size="32" />
          </view>
        </view>
        <!-- <text class="mt-2 text-xs text-gray-500">加载中...</text> -->
      </view>
    </view>

    <!-- 错误状态 -->
    <view
      v-else-if="isError"
      class="absolute inset-0 z-10 flex items-center justify-center bg-gray-100"
    >
      <view v-if="errorImage" class="h-full w-full">
        <image :src="errorImage" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else class="flex flex-col items-center justify-center">
        <view class="mb-2 h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
          <text class="text-xl text-red-500 font-bold">!</text>
        </view>
        <!-- <text class="text-xs text-gray-500">加载失败</text> -->
      </view>
    </view>

    <!-- 正常图片 -->
    <image
      v-show="imageSrc && !isError && !isLoading"
      :src="imageSrc"
      :mode="mode"
      :lazy-load="lazyLoad"
      class="block" :class="[
        {
          'opacity-0': !isLoaded && fadeShow,
          'opacity-100 transition-opacity duration-300': isLoaded && fadeShow,
          'opacity-100': !fadeShow,
          'w-full': !props.width || props.width === '100%',
          'h-full': props.mode !== 'widthFix' && (!props.height || props.height === '100%'),
        },
        customClass,
      ]"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
    />
  </view>
</template>

<style scoped>
.image-cache-container {
  position: relative;
  display: block;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
