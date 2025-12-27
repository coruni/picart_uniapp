<script setup lang="ts">
interface FilePickerProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
}

interface FilePickerEmits {
  (e: 'change', files: File[]): void
  (e: 'error', error: string): void
}

const props = withDefaults(defineProps<FilePickerProps>(), {
  accept: '*/*',
  multiple: false,
  maxSize: 10 * 1024 * 1024,
  disabled: false,
})

const emit = defineEmits<FilePickerEmits>()

const fileInputRef = ref<HTMLInputElement | null>(null)

function handleClick() {
  if (props.disabled)
    return
  fileInputRef.value?.click()
}
// 暴露方法
function selectFile() {
  fileInputRef.value?.click()
}

defineExpose({
  selectFile,
})

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length === 0) {
    return
  }

  const validFiles: File[] = []
  const errors: string[] = []

  files.forEach((file) => {
    if (file.size > props.maxSize) {
      errors.push(`${file.name} 超过大小限制 (${(props.maxSize / 1024 / 1024).toFixed(2)}MB)`)
    }
    else {
      validFiles.push(file)
    }
  })

  if (errors.length > 0) {
    emit('error', errors.join('; '))
  }

  if (validFiles.length > 0) {
    emit('change', validFiles)
  }

  target.value = ''
}
</script>

<template>
  <view
    class="inline-block cursor-pointer"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    @click="handleClick"
  >
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="handleFileChange"
    >
    <slot />
  </view>
</template>
