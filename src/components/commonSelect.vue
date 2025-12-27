<script lang="ts" setup>
interface CommonSelectProps {
  options: {
    label: string
    value: string
  }[]
}
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  options: {
    type: Array as PropType<CommonSelectProps['options']>,
    default: () => [],
  },
})
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [value: string]
}>()

const isOpen = ref(false)

function handleSelect(option: { label: string, value: string }) {
  emit('select', option.value)
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function handleOpen() {
  isOpen.value = !isOpen.value
}

const selectedOption = computed(() => {
  return props.options.find(item => item.value === props.modelValue)
})
</script>

<template>
  <view class="relative min-w-12" @click="handleOpen">
    <view class="flex items-center">
      <text>{{ selectedOption?.label || '请选择' }}</text>
      <wd-icon name="arrow-down" size="16" class="transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
    </view>
    <wd-transition :show="isOpen" name="fade">
      <view
        class="absolute left-0 top-full z-[1000] w-full border border-gray-200 rounded-md bg-white shadow-lg"
      >
        <view
          v-for="item in props.options" :key="item.value"
          class="px-1 py-2 text-center active:bg-gray-100" @click.stop="handleSelect(item)"
        >
          <text>{{ item.label }}</text>
        </view>
      </view>
    </wd-transition>
  </view>
</template>
