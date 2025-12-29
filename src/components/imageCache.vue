<script lang="ts" setup>
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
  viewportLazyLoad?: boolean
  viewportThreshold?: number
  hideLoading?: boolean
  transparentBackground?: boolean
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
  showSkeleton: true,
  skeletonColor: '#f0f0f0',
  viewportLazyLoad: true,
  viewportThreshold: 0.1,
  hideLoading: false,
  transparentBackground: false,
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
const isInViewport = ref(false)
const observer = ref<any>(null)
const containerRef = ref<any>(null)
const isObserving = ref(false)
const srcChangeTimer = ref<any>(null)
const minLoadingTime = 200
const loadStartTime = ref(0)
const showLoadingOverlay = ref(true)

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

  if (!props.transparentBackground && !props.hideLoading && (isLoading.value || isError.value)) {
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
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  if (!props.src) {
    isError.value = true
    isLoading.value = false
    showLoadingOverlay.value = false
    return
  }

  isLoading.value = true
  isError.value = false
  isLoaded.value = false
  showLoadingOverlay.value = true
  retryCount.value = 0
  loadStartTime.value = Date.now()

  try {
    let finalSrc = props.src

    if (props.useCache && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
      const cacheKey = getCacheKey(props.src)
      const cachedPath = getImageFromCache(cacheKey)

      if (cachedPath) {
        finalSrc = cachedPath
      }
      else {
        try {
          finalSrc = await downloadAndCacheImage(props.src)
        }
        catch {
          finalSrc = props.src
        }
      }
    }

    imageSrc.value = finalSrc
    await nextTick()
  }
  catch (error) {
    console.error('加载图片失败', error)
    isError.value = true
    isLoading.value = false
    showLoadingOverlay.value = false
  }
}

function handleLoad(event: any) {
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  const elapsed = Date.now() - loadStartTime.value
  const remainingTime = Math.max(0, minLoadingTime - elapsed)

  loadingTimer.value = setTimeout(() => {
    isLoaded.value = true
    isLoading.value = false
    showLoadingOverlay.value = false
    isError.value = false
    loadingTimer.value = null
    emit('load', event)
  }, remainingTime)
}

function handleError(event: ImageErrorEvent) {
  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  console.error('图片加载失败:', event)

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

  const elapsed = Date.now() - loadStartTime.value
  const remainingTime = Math.max(0, minLoadingTime - elapsed)

  loadingTimer.value = setTimeout(() => {
    isError.value = true
    isLoading.value = false
    showLoadingOverlay.value = false
    loadingTimer.value = null
    emit('error', event)
  }, remainingTime)
}

function handleClick(event: Event) {
  emit('click', event)
}

// 清理观察器
function cleanupObserver() {
  if (observer.value) {
    observer.value.disconnect()
    observer.value = null
  }
  isObserving.value = false
}

// 初始化IntersectionObserver
function initIntersectionObserver() {
  if (!props.viewportLazyLoad) {
    isInViewport.value = true
    return
  }

  if (isObserving.value) {
    return
  }

  // 先清理旧的观察器
  cleanupObserver()

  // #ifdef H5
  if (window.IntersectionObserver) {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInViewport.value = true
            cleanupObserver()
          }
        })
      },
      {
        threshold: Math.min(Math.max(props.viewportThreshold, 0), 1),
        rootMargin: '50px',
      },
    )

    const tryObserve = (retryCount = 0) => {
      if (!observer.value || isObserving.value) {
        return
      }

      let element = null

      if (containerRef.value) {
        if (containerRef.value instanceof HTMLElement) {
          element = containerRef.value
        }
        else if (containerRef.value.$el) {
          element = containerRef.value.$el
        }
      }

      if (!element) {
        const elements = document.querySelectorAll('.image-cache-container')
        if (elements.length > 0) {
          element = elements[elements.length - 1]
        }
      }

      if (element && element instanceof HTMLElement) {
        observer.value.observe(element)
        isObserving.value = true
      }
      else {
        if (retryCount < 3) {
          setTimeout(() => {
            tryObserve(retryCount + 1)
          }, 100 * (retryCount + 1))
        }
        else {
          console.warn('无法获取有效的DOM元素，直接加载图片')
          isInViewport.value = true
          cleanupObserver()
        }
      }
    }

    setTimeout(() => {
      tryObserve()
    }, 150)
  }
  else {
    isInViewport.value = true
  }
  // #endif

  // #ifndef H5
  try {
    const instance = getCurrentInstance()
    if (instance) {
      observer.value = uni.createIntersectionObserver(instance)

      const threshold = Math.floor(props.viewportThreshold * 100)

      observer.value.relativeToViewport({
        top: 50,
        bottom: 50,
      }).observe('.image-cache-container', (res) => {
        if (res.intersectionRatio > 0) {
          isInViewport.value = true
          cleanupObserver()
        }
      })

      isObserving.value = true
    }
    else {
      isInViewport.value = true
    }
  }
  catch (error) {
    console.warn('创建IntersectionObserver失败，直接加载图片', error)
    isInViewport.value = true
  }
  // #endif
}

watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc === oldSrc) {
    return
  }

  if (srcChangeTimer.value) {
    clearTimeout(srcChangeTimer.value)
  }

  srcChangeTimer.value = setTimeout(() => {
    if (!isMounted.value) {
      return
    }

    isInViewport.value = false
    imageSrc.value = ''
    isLoading.value = true
    isError.value = false
    isLoaded.value = false
    showLoadingOverlay.value = true

    cleanupObserver()

    if (props.viewportLazyLoad) {
      nextTick(() => {
        initIntersectionObserver()
      })
    }
    else {
      isInViewport.value = true
    }
  }, 100)
}, { immediate: false })

watch(isInViewport, (newValue) => {
  if (newValue && props.src && !isLoaded.value && !isError.value) {
    loadImage()
  }
}, { immediate: true })

watch(isLoaded, (newValue) => {
  if (newValue) {
    showLoadingOverlay.value = false
  }
})

onMounted(() => {
  isMounted.value = true

  // 如果开启视窗懒加载，初始化IntersectionObserver
  if (props.viewportLazyLoad) {
    nextTick(() => {
      initIntersectionObserver()
    })
  }
  else {
    // 未开启懒加载，直接加载
    isInViewport.value = true
  }
})

onBeforeUnmount(() => {
  isMounted.value = false

  if (loadingTimer.value) {
    clearTimeout(loadingTimer.value)
    loadingTimer.value = null
  }

  if (srcChangeTimer.value) {
    clearTimeout(srcChangeTimer.value)
    srcChangeTimer.value = null
  }

  cleanupObserver()
})

defineExpose({
  loadImage,
  reload: loadImage,
  isInViewport: readonly(isInViewport),
  forceLoad: () => {
    isInViewport.value = true
    loadImage()
  },
})
</script>

<template>
  <view
    ref="containerRef"
    :class="containerClasses"
    :style="containerStyle"
    class="image-cache-container"
    @click="handleClick"
  >
    <image
      :src="imageSrc"
      :mode="mode"
      :lazy-load="lazyLoad"
      class="block" :class="[
        {
          'opacity-0': !isLoaded,
          'transition-opacity duration-300 ease-out': fadeShow,
          'w-full': !props.width || props.width === '100%',
          'h-full': props.mode !== 'widthFix' && (!props.height || props.height === '100%'),
        },
        customClass,
      ]"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
    />

    <view
      v-show="showLoadingOverlay && isLoading && !props.hideLoading"
      class="absolute inset-0 z-10 flex items-center justify-center overflow-hidden transition-opacity duration-200"
      :class="{
        'opacity-0': !isLoading,
        'opacity-100': isLoading,
      }"
    >
      <view v-if="props.placeholder" class="h-full w-full">
        <image :src="props.placeholder" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else-if="props.showSkeleton" class="h-full w-full bg-gray-100">
        <view class="skeleton-shimmer h-full w-full" />
      </view>
      <view v-else class="flex flex-col items-center justify-center">
        <view class="relative flex items-center justify-center">
          <view class="loading-ring absolute h-12 w-12 animate-spin border-4 border-gray-200 rounded-full" />
          <view class="loading-ring-inner absolute h-12 w-12 animate-spin border-4 border-primary border-r-transparent border-t-transparent rounded-full" style="animation-duration: 1s;" />
          <view class="relative z-10 h-8 w-8 flex items-center justify-center">
            <wd-loading :type="props.loadingType" :size="20" />
          </view>
        </view>
      </view>
    </view>

    <view
      v-show="isError && !props.hideLoading"
      class="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200"
      :class="{
        'opacity-0': !isError,
        'opacity-100': isError,
        'bg-gray-50': !props.transparentBackground,
      }"
    >
      <view v-if="errorImage" class="h-full w-full">
        <image :src="errorImage" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else class="flex flex-col items-center justify-center">
        <view class="mb-3 h-14 w-14 flex items-center justify-center rounded-full bg-red-50">
          <view class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
            <i class="i-lucide:image-off size-6 text-red-500" />
          </view>
        </view>
        <text class="text-xs text-gray-400">加载失败</text>
      </view>
    </view>
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 20%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.4) 80%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.loading-ring {
  box-sizing: border-box;
}

.loading-ring-inner {
  box-sizing: border-box;
  animation-direction: reverse;
}
</style>
