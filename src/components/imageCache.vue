<script lang="ts" setup>
interface Props {
  src: string
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
}

const props = withDefaults(defineProps<Props>(), {
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

// 计算容器样式
const containerStyle = computed(() => {
  const style: any = {}

  // 宽度处理
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  // 高度处理
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  // 圆角处理
  if (props.borderRadius !== '0') {
    style.borderRadius = typeof props.borderRadius === 'number'
      ? `${props.borderRadius}px`
      : props.borderRadius
  }

  return style
})

// 计算容器类名
const containerClasses = computed(() => {
  const classes = ['relative', 'block', 'bg-gray-100', 'overflow-hidden']

  // 如果没有传递宽度，默认占满父容器宽度
  if (!props.width) {
    classes.push('w-full')
  }

  // 如果没有传递高度，默认占满父容器高度
  if (!props.height) {
    classes.push('h-full')
  }

  // 边框处理
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
      success: (res) => {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath
          uni.saveFile({
            tempFilePath,
            success: (saveRes) => {
              const savedFilePath = saveRes.savedFilePath
              saveImageToCache(getCacheKey(src), savedFilePath)
              console.log('图片已保存到本地:', savedFilePath)
              resolve(savedFilePath)
            },
            fail: (err) => {
              console.warn('保存文件失败，使用临时路径', err)
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
  if (!props.src) {
    isError.value = true
    isLoading.value = false
    imageSrc.value = ''
    return
  }

  isLoading.value = true
  isError.value = false
  isLoaded.value = false

  try {
    let finalSrc = props.src

    if (props.useCache && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
      const cacheKey = getCacheKey(props.src)
      const cachedPath = getImageFromCache(cacheKey)

      if (cachedPath) {
        // #ifdef H5
        finalSrc = cachedPath
        console.log('使用缓存图片(H5):', cachedPath)
        // #endif

        // #ifndef H5
        try {
          await new Promise((resolve, reject) => {
            uni.getSavedFileInfo({
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
          console.log('使用缓存图片:', cachedPath)
        }
        catch (error) {
          console.log('缓存失效，重新下载', error)
          finalSrc = await downloadAndCacheImage(props.src)
        }
        // #endif
      }
      else {
        console.log('首次下载图片')
        try {
          finalSrc = await downloadAndCacheImage(props.src)
        }
        catch (error) {
          console.warn('下载图片失败，使用原始URL', error)
          finalSrc = props.src
        }
      }
    }

    imageSrc.value = finalSrc
    isLoading.value = false
  }
  catch (error) {
    console.error('加载图片失败', error)
    isError.value = true
    imageSrc.value = ''
    isLoading.value = false
  }
}

function handleLoad(event: any) {
  isLoaded.value = true
  isLoading.value = false
  emit('load', event)
}

function handleError(event: ImageErrorEvent) {
  isError.value = true
  isLoading.value = false
  imageSrc.value = ''
  emit('error', event)
}

function handleClick(event: Event) {
  emit('click', event)
}

watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    loadImage()
  }
})

onMounted(() => {
  loadImage()
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
    @click="handleClick"
  >
    <!-- 加载中状态 -->
    <view v-if="isLoading" class="absolute left-0 top-0 h-full w-full">
      <view v-if="placeholder" class="h-full w-full">
        <image :src="placeholder" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else class="h-full w-full flex flex-col items-center justify-center bg-gray-100">
        <wd-loading type="ring" :size="40" />
      </view>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="isError" class="absolute left-0 top-0 h-full w-full">
      <view v-if="errorImage" class="h-full w-full">
        <image :src="errorImage" :mode="mode" class="block h-full w-full" />
      </view>
      <view v-else class="h-full w-full flex flex-col items-center justify-center bg-gray-100">
        <view class="mb-2 h-15 w-15 flex items-center justify-center rounded-full bg-red-500">
          <text class="text-4 text-white font-bold">!</text>
        </view>
        <text class="mt-2 text-3 text-gray-500">加载失败</text>
      </view>
    </view>

    <!-- 正常图片 -->
    <image
      v-else-if="imageSrc"
      :src="imageSrc"
      :mode="mode"
      :lazy-load="lazyLoad"
      class="object-cover"
      :class="[{
        'animate-fade-in animate-duration-300': fadeShow && isLoaded,
      }, customClass]"
      :style="{
        transitionDuration: `${duration}ms`,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }"
      @load="handleLoad"
      @error="handleError"
    />
  </view>
</template>

<style scoped>
/* 只保留动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
