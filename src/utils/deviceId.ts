/**
 * 获取设备唯一标识符
 * 统一使用uni-app API
 */

/**
 * 生成随机UUID
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 获取设备唯一标识符
 * @returns 设备唯一标识符
 */
export function getDeviceId(): string {
  // 先尝试从本地存储获取
  let deviceId = uni.getStorageSync('deviceId')

  if (deviceId) {
    return deviceId
  }

  // 使用uni.getSystemInfoSync获取设备信息
  try {
    const systemInfo = uni.getSystemInfoSync()

    // 尝试使用系统提供的deviceId
    if (systemInfo.deviceId) {
      deviceId = systemInfo.deviceId
    }
    else {
      // 如果没有deviceId，则使用其他设备信息组合生成唯一标识
      const { platform, model, system, pixelRatio } = systemInfo
      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(2, 15)

      deviceId = `${platform}_${model}_${system}_${pixelRatio}_${timestamp}_${random}`
    }
  }
  catch (e) {
    console.error('获取设备信息失败', e)
    deviceId = generateUUID()
  }

  // 存储到本地
  uni.setStorageSync('deviceId', deviceId)

  return deviceId
}
