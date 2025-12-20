/**
 * 路由导航工具
 * 封装uni-app的路由方法，提供统一的导航接口
 */

/**
 * 导航到指定页面
 * @param url 页面路径
 * @param options 导航选项
 */
export function navigateTo(url: string, options?: UniApp.NavigateToOptions) {
  return uni.navigateTo({
    url,
    ...options,
  })
}

/**
 * 重定向到指定页面
 * @param url 页面路径
 * @param options 重定向选项
 */
export function redirectTo(url: string, options?: UniApp.RedirectToOptions) {
  return uni.redirectTo({
    url,
    ...options,
  })
}

/**
 * 重新启动应用并导航到指定页面
 * @param url 页面路径
 * @param options 重启选项
 */
export function reLaunch(url: string, options?: UniApp.ReLaunchOptions) {
  return uni.reLaunch({
    url,
    ...options,
  })
}

/**
 * 切换到指定tab页面
 * @param url tab页面路径
 * @param options 切换选项
 */
export function switchTab(url: string, options?: UniApp.SwitchTabOptions) {
  return uni.switchTab({
    url,
    ...options,
  })
}

/**
 * 返回上一页面
 * @param delta 返回的页面数，默认为1
 * @param options 返回选项
 */
export function navigateBack(delta: number = 1, options?: UniApp.NavigateBackOptions) {
  return uni.navigateBack({
    delta,
    ...options,
  })
}
