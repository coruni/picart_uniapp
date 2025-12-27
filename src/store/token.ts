import type { UserLoginForm, UserLoginRes } from '@/api/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue' // 修复：导入 computed

import { isDoubleTokenRes, isSingleTokenRes } from '@/api/types/login'
import { userLoginUsingPost, userLogoutUsingPost, userRefreshTokenUsingPost } from '@/service'
import { useUserStore } from './user'

/**
 * 是否是双token模式
 */
export const isDoubleTokenMode = import.meta.env.VITE_AUTH_MODE === 'double'
// 初始化状态
const tokenInfoState = isDoubleTokenMode
  ? {
      token: '',
      refreshToken: '',
    }
  : {
      token: '',
      refreshToken: '',
    }

export const useTokenStore = defineStore(
  'token',
  () => {
    // 定义用户信息
    const tokenInfo = ref<UserLoginRes>({
      id: 0,
      username: '',
      nickname: '',
      email: '',
      phone: null,
      status: '',
      banned: null,
      banReason: null,
      avatar: '',
      description: '',
      address: null,
      gender: '',
      birthDate: null,
      articleCount: 0,
      followerCount: 0,
      followingCount: 0,
      level: 0,
      experience: 0,
      score: 0,
      wallet: 0,
      membershipLevel: 0,
      membershipLevelName: '',
      membershipStatus: '',
      membershipStartDate: '',
      membershipEndDate: '',
      lastLoginAt: '',
      lastActiveAt: null,
      inviterId: null,
      inviteCode: null,
      inviteEarnings: '',
      inviteCount: 0,
      roles: [],
      config: {
        id: 0,
        userId: 0,
        articleCommissionRate: '',
        membershipCommissionRate: '',
        productCommissionRate: '',
        serviceCommissionRate: '',
        enableCustomCommission: false,
        enableSystemNotification: false,
        enableCommentNotification: false,
        enableLikeNotification: false,
        enableFollowNotification: false,
        enableMessageNotification: false,
        enableOrderNotification: false,
        enablePaymentNotification: false,
        enableInviteNotification: false,
        enableEmailNotification: false,
        enableSmsNotification: false,
        enablePushNotification: false,
        remark: '',
        createdAt: '',
        updatedAt: '',
      },
      createdAt: '',
      updatedAt: '',
      isMember: false,
      refreshToken: '',
      token: '',
    })

    // 添加一个时间戳 ref 作为响应式依赖
    const nowTime = ref(Date.now())
    /**
     * 更新响应式数据:now
     * 确保isTokenExpired/isRefreshTokenExpired重新计算,而不是用错误过期缓存值
     * 可useTokenStore内部适时调用;也可链式调用:tokenStore.updateNowTime().hasLogin
     * @returns 最新的tokenStore实例
     */
    const updateNowTime = () => {
      nowTime.value = Date.now()
      return useTokenStore()
    }

    // 设置用户信息
    const setTokenInfo = (val: UserLoginRes) => {
      updateNowTime()
      tokenInfo.value = val

      // 计算并存储过期时间
      const now = Date.now()
      if (isSingleTokenRes(val)) {
        // 单token模式
        // const expireTime = now + val.expiresIn * 1000
        // uni.setStorageSync('accessTokenExpireTime', expireTime)
      }
      else if (isDoubleTokenRes(val)) {
        // 双token模式
        // const accessExpireTime = now + val.accessExpiresIn * 1000
        // uni.setStorageSync('accessTokenExpireTime', accessExpireTime)
        // uni.setStorageSync('refreshTokenExpireTime', refreshExpireTime)
      }
    }

    /**
     * 判断token是否过期
     */
    const isTokenExpired = computed(() => {
      if (!tokenInfo.value) {
        return true
      }

      const now = nowTime.value
      const expireTime = uni.getStorageSync('accessTokenExpireTime')

      if (!expireTime)
        return true
      return now >= expireTime
    })

    /**
     * 判断refreshToken是否过期
     */
    const isRefreshTokenExpired = computed(() => {
      if (!isDoubleTokenMode)
        return true

      const now = nowTime.value
      const refreshExpireTime = uni.getStorageSync('refreshTokenExpireTime')

      if (!refreshExpireTime)
        return true
      return now >= refreshExpireTime
    })

    /**
     * 登录成功后处理逻辑
     * @param tokenInfo 登录返回的token信息
     */
    async function _postLogin(tokenInfo: UserLoginRes) {
      setTokenInfo(tokenInfo)
      const userStore = useUserStore()
      await userStore.fetchUserInfo()
    }

    /**
     * 用户登录
     * 有的时候后端会用一个接口返回token和用户信息，有的时候会分开2个接口，一个获取token，一个获取用户信息
     * （各有利弊，看业务场景和系统复杂度），这里使用2个接口返回的来模拟
     * @param loginForm 登录参数
     * @returns 登录结果
     */
    const login = async (loginForm: UserLoginForm) => {
      try {
        const res = await userLoginUsingPost({
          body: loginForm,
        })
        console.log('普通登录-res: ', res)
        await _postLogin(res)
        // uni.showToast({
        //   title: '登录成功',
        //   icon: 'success',
        // })
        return res
      }
      catch (error) {
        console.error('登录失败:', error)
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'error',
        })
        throw error
      }
      finally {
        updateNowTime()
      }
    }

    /**
     * 微信登录
     * 有的时候后端会用一个接口返回token和用户信息，有的时候会分开2个接口，一个获取token，一个获取用户信息
     * （各有利弊，看业务场景和系统复杂度），这里使用2个接口返回的来模拟
     * @returns 登录结果
     */
    // const wxLogin = async () => {
    //   try {
    //     // 获取微信小程序登录的code
    //     const code = await getWxCode()
    //     console.log('微信登录-code: ', code)
    //     const res = await _wxLogin(code)
    //     console.log('微信登录-res: ', res)
    //     await _postLogin(res)
    //     uni.showToast({
    //       title: '登录成功',
    //       icon: 'success',
    //     })
    //     return res
    //   }
    //   catch (error) {
    //     console.error('微信登录失败:', error)
    //     uni.showToast({
    //       title: '微信登录失败，请重试',
    //       icon: 'error',
    //     })
    //     throw error
    //   }
    //   finally {
    //     updateNowTime()
    //   }
    // }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      try {
        // TODO 实现自己的退出登录逻辑
        await userLogoutUsingPost({})
      }
      catch (error) {
        console.error('退出登录失败:', error)
      }
      finally {
        updateNowTime()

        // 无论成功失败，都需要清除本地token信息
        // 清除存储的过期时间
        uni.removeStorageSync('accessTokenExpireTime')
        uni.removeStorageSync('refreshTokenExpireTime')
        console.log('退出登录-清除用户信息')
        tokenInfo.value = { ...tokenInfoState } as UserLoginRes
        uni.removeStorageSync('token')
        const userStore = useUserStore()
        userStore.clearUserInfo()
      }
    }

    /**
     * 刷新token
     * @returns 刷新结果
     */
    const refreshToken = async () => {
      if (!isDoubleTokenMode) {
        console.error('单token模式不支持刷新token')
        throw new Error('单token模式不支持刷新token')
      }

      try {
        // 安全检查，确保refreshToken存在
        if (!isDoubleTokenRes(tokenInfo.value as UserLoginRes) || !tokenInfo.value.refreshToken) {
          throw new Error('无效的refreshToken')
        }

        const refreshToken = tokenInfo.value.refreshToken
        const res = await userRefreshTokenUsingPost({
          body: {
            refreshToken,
          },
        })
        console.log('刷新token-res: ', res)
        setTokenInfo(res as UserLoginRes)
        return res as UserLoginRes
      }
      catch (error) {
        console.error('刷新token失败:', error)
        throw error
      }
      finally {
        updateNowTime()
      }
    }

    /**
     * 获取有效的token
     * 注意：在computed中不直接调用异步函数，只做状态判断
     * 实际的刷新操作应由调用方处理
     * 建议这样使用 tokenStore.updateNowTime().validToken
     */
    const getValidToken = computed(() => {
      // token已过期，返回空
      if (isTokenExpired.value) {
        return ''
      }

      if (!isDoubleTokenMode) {
        return isSingleTokenRes(tokenInfo.value as UserLoginRes) ? tokenInfo.value.token : ''
      }
      else {
        return isDoubleTokenRes(tokenInfo.value as UserLoginRes) ? tokenInfo.value.token : ''
      }
    })

    /**
     * 检查是否有登录信息（不考虑token是否过期）
     */
    const hasLoginInfo = computed(() => {
      if (!tokenInfo.value) {
        return false
      }
      if (isDoubleTokenMode) {
        return isDoubleTokenRes(tokenInfo.value as UserLoginRes) && !!tokenInfo.value.token
      }
      else {
        return isSingleTokenRes(tokenInfo.value as UserLoginRes) && !!tokenInfo.value.token
      }
    })

    /**
     * 检查是否已登录且token有效
     * 建议这样使用tokenStore.updateNowTime().hasLogin
     */
    const hasValidLogin = computed(() => {
      console.log('hasValidLogin', hasLoginInfo.value, !isTokenExpired.value)
      return hasLoginInfo.value
    })

    /**
     * 尝试获取有效的token，如果过期且可刷新，则刷新token
     * @returns 有效的token或空字符串
     */
    const tryGetValidToken = async (): Promise<string> => {
      updateNowTime()
      if (!getValidToken.value && isDoubleTokenMode && !isRefreshTokenExpired.value) {
        try {
          await refreshToken()
          return getValidToken.value
        }
        catch (error) {
          console.error('尝试刷新token失败:', error)
          return ''
        }
      }
      return getValidToken.value
    }

    /**
     * 清除token信息（不调用退出登录接口）
     */
    const clearToken = () => {
      updateNowTime()

      // 清除存储的过期时间
      uni.removeStorageSync('accessTokenExpireTime')
      uni.removeStorageSync('refreshTokenExpireTime')
      console.log('清除token信息')
      tokenInfo.value = { ...tokenInfoState } as UserLoginRes
      uni.removeStorageSync('token')
      const userStore = useUserStore()
      userStore.clearUserInfo()
    }

    return {
      // 核心API方法
      login,
      logout,
      clearToken,

      // 认证状态判断（最常用的）
      hasLogin: hasValidLogin,

      // 内部系统使用的方法
      refreshToken,
      tryGetValidToken,
      validToken: getValidToken,

      // 调试或特殊场景可能需要直接访问的信息
      tokenInfo,
      setTokenInfo,
      updateNowTime,
    }
  },
  {
    // 添加持久化配置，确保刷新页面后token信息不丢失
    persist: true,
  },
)
