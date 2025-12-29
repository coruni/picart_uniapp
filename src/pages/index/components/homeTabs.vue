<script lang="ts" setup>
import { t } from '@/locale'

const emit = defineEmits(['change'])

const currentTab = ref('home')
const tabs = ref([{
  name: 'follow',
  title: t('home.followTitle'),
}, {
  name: 'home',
  title: t('home.title'),
}])

function handleTabChange({ index, name }: { index: number, name: string }) {
  currentTab.value = name
  if (name === 'recommend') {
    emit('change', '')
  }
  else {
    emit('change', name)
  }
}
</script>

<template>
  <view>
    <status-bar />
    <view class="flex items-center space-x-4">
      <wd-tabs v-model="currentTab" slidable="always" custom-class="flex-1">
        <block v-for="item in tabs" :key="item.name">
          <wd-tab :title="item.title" :name="item.name" />
        </block>
      </wd-tabs>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-navbar__title) {
  max-width: 70%;
}

:deep(.wd-tabs__nav-item) {
  padding: 0 12px !important;
  color: var(--wot-tabs-nav-color, rgba(0, 0, 0, 0.65)) !important;
  font-size: 16px;
}

:deep(.wd-tabs__nav-item.is-active) {
  color: var(--wot-tabs-nav-active-color, rgba(0, 0, 0, 0.85)) !important;
  font-size: 18px;
}
</style>
