import type { GlobalResponseData } from './global'
//问卷中每一项问题的类型
export type questionItem = {
  type: string
  title: string
  value?: any
  options?: string[]
}
//用户信息类型
export type formData = {
  id: number
  username: string
  avatar: string
  nick_name: string
  form_name: string
  status: string
  pub_time: string
  isDelete: string
  res_count?: number
  questionList: questionItem[]
}
//单个用户信息返回数据类型
export type formDataResponse = GlobalResponseData<formData[]>
