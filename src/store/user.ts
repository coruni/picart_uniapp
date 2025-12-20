import type { UserProfile } from '@/types/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userProfileUsingGet } from '@/service'

// 初始化状态
const userInfoState: UserProfile = {
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
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<UserProfile>({ ...userInfoState })
    const isLogin = ref<boolean>(false)
    const token = ref<string>('')
    // 设置用户信息
    const setUserInfo = (val: UserProfile) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      userInfo.value = val
    }
    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('user')
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
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
      setUserAvatar,
    }
  },
  {
    persist: true,
  },
)
