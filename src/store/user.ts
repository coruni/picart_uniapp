import type { UserProfile } from '@/api/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userProfileUsingGet } from '@/service'

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<UserProfile>({
      id: -1,
      username: '',
      nickname: '',
      avatar: '/static/images/default-avatar.png',
      email: '',
      phone: '',
      status: '',
      banned: '',
      banReason: '',
      description: '',
      address: '',
      gender: '',
      birthDate: '',
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
      lastActiveAt: '',
      refreshToken: '',
      inviterId: '',
      inviteCode: '',
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
    })
    console.log('userInfo', userInfo.value)
    const isLogin = ref<boolean>(false)
    const token = ref<string>('')
    const keyboardHeight = ref<number>(0)

    const setUserInfo = (val: UserProfile) => {
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfo.value.avatar
      }
      userInfo.value = val
    }

    // 设置键盘高度（仅在未设置过时才设置）
    const setKeyboardHeight = (height: number) => {
      if (keyboardHeight.value === 0 && height > 0) {
        keyboardHeight.value = height
      }
    }

    // 重置键盘高度（如果需要重新获取的话）
    const resetKeyboardHeight = () => {
      keyboardHeight.value = 0
    }

    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
    }

    const setIsLogin = (val: boolean) => {
      isLogin.value = val
    }

    const setToken = (val: string) => {
      token.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = null
      isLogin.value = false
      token.value = ''
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await userProfileUsingGet({})
      setUserInfo(res)
      return res
    }

    return {
      userInfo,
      isLogin,
      token,
      keyboardHeight,
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
      setUserAvatar,
      setIsLogin,
      setToken,
      setKeyboardHeight,
      resetKeyboardHeight,
    }
  },
  {
    persist: true,
  },
)
