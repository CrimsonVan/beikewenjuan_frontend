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

//问卷请求参数类型
export type formRegQuery = {
  idDelete: string
  pagenum: number
  form_name?: string
  username: string
}

//所有问卷返回数据类型
export type formDataResponse = GlobalResponseData<{ results: formData[]; total?: number }>
