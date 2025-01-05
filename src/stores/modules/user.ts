import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userInfoGetService } from '@/api/user'
import { initColorTheme } from '@/utils/color'
import type { userInfoDataResponse } from '@/types/user'
export const userInfoStore = defineStore(
  'starformUser',
  () => {
    //身份信息
    const userInfo = ref()
    const getUserInfo = async (username: any) => {
      const res: userInfoDataResponse = await userInfoGetService({ username })
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
    const clearToken = () => {
      token.value = null
    }
    //是否为夜晚模式
    const isDark = ref(false)
    const switchDark = (e: any) => {
      isDark.value = e
      initColorTheme()
    }
    //AI生成问卷
    const aiform = ref<any>({
      form_name: '',
      questionList: []
    })
    //设置ai生成问卷
    const setAiForm = (obj: {
      form_name: string
      questionList: { type: string; title: string; options?: string[] }[]
    }) => {
      aiform.value.form_name = obj.form_name
      aiform.value.questionList = obj.questionList
    }
    return {
      aiform,
      setAiForm,
      isDark,
      switchDark,
      clearToken,
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
