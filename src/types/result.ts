import type { GlobalResponseData } from './global'
import type { questionItem } from './form'
//问卷填写结果类型
export type resultData = {
  newKeyArr: questionItem[]
  resArr: any[]
}
export type echartsItem = {
  option: string
  num: number
}
export type echartsData = {
  type: string
  title: string
  echartsArr: echartsItem[]
}
//问卷填写结果返回数据类型
export type resultDataResponse = GlobalResponseData<resultData>
