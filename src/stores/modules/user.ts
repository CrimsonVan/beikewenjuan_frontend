import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userInfoGetService } from '@/api/user'
export const userInfoStore = defineStore(
  'starformUser',
  () => {
    //身份信息
    const userInfo = ref()
    const getUserInfo = async (username: any) => {
      const res = await userInfoGetService({ username })
      userInfo.value = res.data.data
    }
    const clearUserInfo = () => {
      userInfo.value = null
    }
    //token
    const token = ref()
    const setToken = (t: string) => {
      token.value = t
    }

    return {
      userInfo,
      token,
      getUserInfo,
      clearUserInfo,
      setToken
    }
  },
  {
    persist: true
  }
)
