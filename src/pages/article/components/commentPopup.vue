<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  articleId: {
    type: [String, Number],
    default: '',
  },
  paging: {
    type: Object as PropType<ZPagingRef | null>,
    default: null,
  },
  replyTo: {
    type: Object as PropType<{
      id: string
      author: {
        nickname: string
        username: string
      }
    } | null>,
    default: null,
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'comment': []
  'open': []
  'close': []
}>()
console.log('commentPopup props.replyTo:', props.replyTo)
const userStore = useUserStore()
const commentContent = ref('')
const showEmojiPanel = ref<boolean>(false)
const showImagePanel = ref<boolean>(false)
const currentKeyboardHeight = ref<number>(0)
const { keyboardHeight: storeKeyboardHeight } = storeToRefs(userStore)
const keyboardListenerRegistered = ref<boolean>(false)
const isLoading = ref(false)
const previousReplyTo = ref(props.replyTo)
const isKeyboardVisible = ref(false)

onMounted(() => {
  if (storeKeyboardHeight.value > 0) {
    currentKeyboardHeight.value = storeKeyboardHeight.value
  }
})

async function handleSubmitComment() {
  if (!commentContent.value.trim()) {
    return
  }
  try {
    isLoading.value = true
    console.log('提交评论', props.replyTo)
    // await commentUsingPost({
    //   body: {
    //     articleId: Number(props.articleId),
    //     content: commentContent.value,
    //     parentId: props.replyTo?.id ? Number(props.replyTo?.id) : undefined,
    //   },
    // })

    try {
      props.paging.reload()
    }
    catch {
      const pagings = props.paging as any
      pagings?.reload()
    }
  }
  finally {
    isLoading.value = false
    commentContent.value = ''
  }

  emit('update:modelValue', false)
  emit('comment')
}

function handleEmojiClick() {
  if (currentKeyboardHeight.value > 0) {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.hideKeyboard()
    // #endif
  }

  showEmojiPanel.value = !showEmojiPanel.value
  showImagePanel.value = false
}

function handleImageClick() {
  if (currentKeyboardHeight.value > 0) {
    // #ifdef APP-PLUS || MP-WEIXIN
    uni.hideKeyboard()
    // #endif
  }

  // showImagePanel.value = !showImagePanel.value
  selectImage()
  showEmojiPanel.value = false
}

function selectEmoji(emoji: string) {
  commentContent.value += emoji
}

function selectImage() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log('选中图片', res.tempFilePaths[0])
    },
  })
}

// 键盘高度变化监听函数
function handleKeyboardHeightChange(res: any) {
  if (res.height > 0) {
    isKeyboardVisible.value = true
    const adjustedHeight = res.height
    currentKeyboardHeight.value = adjustedHeight
    userStore.setKeyboardHeight(adjustedHeight)
    showEmojiPanel.value = false
    showImagePanel.value = false
  }
  else {
    isKeyboardVisible.value = false
    currentKeyboardHeight.value = 0
    userStore.setKeyboardHeight(0)
  }
}

function handleInputFocus(e: any) {
  if (!showEmojiPanel.value && !showImagePanel.value) {
    showEmojiPanel.value = false
    showImagePanel.value = false
  }

  // #ifdef APP-PLUS || MP-WEIXIN
  if (!keyboardListenerRegistered.value) {
    uni.onKeyboardHeightChange(handleKeyboardHeightChange)
    keyboardListenerRegistered.value = true
  }
  // #endif
}

function handleInputBlur() {
}

onUnmounted(() => {
  // #ifdef APP-PLUS || MP-WEIXIN
  if (keyboardListenerRegistered.value) {
    uni.offKeyboardHeightChange(handleKeyboardHeightChange)
    keyboardListenerRegistered.value = false
  }
  // #endif
})

const placeholderText = computed(() => {
  if (props.replyTo) {
    return `回复 ${props.replyTo.author?.nickname || props.replyTo.author?.username || ''}`
  }
  return '输入评论内容'
})

watch(() => props.replyTo, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    commentContent.value = ''
  }
  if (!newVal && oldVal) {
    commentContent.value = ''
  }
  previousReplyTo.value = newVal
})

watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (newVal) {
      emit('open')
    }
    else {
      emit('close')
      showEmojiPanel.value = false
      showImagePanel.value = false
      isKeyboardVisible.value = false
      if (props.replyTo) {
        commentContent.value = ''
      }

      uni.hideKeyboard()
      userStore.setKeyboardHeight(0)
    }
  }
})
</script>

<template>
  <wd-popup
    :model-value="modelValue" root-portal position="bottom" custom-class="rounded-t-xl"
    :safe-area-inset-bottom="true" :closable="false" @update:model-value="emit('update:modelValue', $event)"
  >
    <view
      class="flex flex-col" :style="{
        minHeight: isKeyboardVisible ? `calc(60vh - ${currentKeyboardHeight}px)` : 'auto',
        paddingBottom: isKeyboardVisible && !showEmojiPanel && !showImagePanel ? `${currentKeyboardHeight}px` : '0',
        marginBottom: isKeyboardVisible && !showEmojiPanel && !showImagePanel ? '-36px' : '0',
      }"
    >
      <view
        class="p-4" :style="{
          height: isKeyboardVisible && !showEmojiPanel && !showImagePanel
            ? `calc(60vh - ${currentKeyboardHeight}px - 120px)`
            : 'auto',
          maxHeight: isKeyboardVisible && !showEmojiPanel && !showImagePanel
            ? `calc(60vh - ${currentKeyboardHeight}px - 120px)`
            : showEmojiPanel || showImagePanel
              ? 'calc(60vh - 240px)'
              : '200px',
          overflowY: 'auto',
          flexShrink: 1,
        }"
      >
        <wd-textarea
          v-model="commentContent" auto-height show-word-limit :maxlength="2000" no-border
          :show-actions="true" :auto-focus="true"
          :custom-class="isKeyboardVisible || showEmojiPanel || showImagePanel ? 'min-h-[80px]' : 'min-h-[80px] max-h-[200px]'"
          :adjust-position="false" :placeholder="placeholderText" @focus="handleInputFocus" @blur="handleInputBlur"
        />
      </view>

      <view class="flex flex-shrink-0 flex-col">
        <view class="flex items-center justify-between border-t border-gray-100 p-4">
          <view class="flex items-center gap-4">
            <view
              class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              :class="showEmojiPanel ? 'bg-blue-100' : ''" @click="handleEmojiClick"
            >
              <view class="i-lucide:smile size-5" :class="showEmojiPanel ? 'text-primary/80' : 'text-gray-600'" />
            </view>

            <view
              class="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              :class="showImagePanel ? 'bg-blue-100' : ''" @click="handleImageClick"
            >
              <view class="i-lucide:image size-5" :class="showImagePanel ? 'text-primary/80' : 'text-gray-600'" />
            </view>
          </view>

          <wd-button
            class="rounded-full px-4 py-2 text-sm text-white" size="small"
            :disabled="commentContent.trim() === '' || isLoading" @click="handleSubmitComment"
          >
            发送
          </wd-button>
        </view>

        <view v-if="showEmojiPanel && currentKeyboardHeight === 0" class="border-t-md border-gray-100 bg-white p-3">
          <view class="max-h-[200px] flex flex-wrap gap-2 overflow-y-auto">
            <text
              v-for="(emoji, index) in ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨']"
              :key="index" class="cursor-pointer rounded p-2 text-2xl hover:bg-gray-100" @click="selectEmoji(emoji)"
            >
              {{ emoji }}
            </text>
          </view>
        </view>

        <!-- <view v-if="showImagePanel && keyboardHeight === 0" class="border-t border-gray-100 bg-white p-4">
          <view class="flex flex-col gap-3">
            <view class="flex items-center justify-center border-2 border-gray-300 rounded-lg border-dashed p-8">
              <view class="text-center">
                <view class="i-lucide:upload mx-auto mb-2 size-12 text-gray-400" />
                <text class="text-sm text-gray-500">点击选择图片</text>
              </view>
            </view>
            <view class="flex gap-2">
              <wd-button type="primary" block @click="selectImage">
                从相册选择
              </wd-button>
              <wd-button type="primary" block @click="selectImage">
                拍照
              </wd-button>
            </view>
          </view>
        </view> -->
      </view>
    </view>
  </wd-popup>
</template>
