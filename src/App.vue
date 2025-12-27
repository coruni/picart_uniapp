<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { useAppStore } from './store/app'

onLaunch(async (options) => {
  console.log('App.vue onLaunch', options)
  const appStore = useAppStore()
  appStore.getConfig()
  appStore.fetchCategory()
})
onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 全局隐藏滚动条 - 适用于所有平台 */
/* 针对 Webkit 浏览器 */
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* 针对 Firefox */
* {
  scrollbar-width: none !important;
}

/* 针对 IE 和旧版 Edge */
* {
  -ms-overflow-style: none !important;
}

/* 针对 uni-app 小程序平台 */
page {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

/* H5 平台特殊处理 */
/* #ifdef H5 */
html,
body {
  overflow: -moz-scrollbars-none !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
/* #endif */
</style>
