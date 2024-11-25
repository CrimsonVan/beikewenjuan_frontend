import type { GlobalResponseData } from './global'
//问卷模板信息类型
export type copyData = {
  id: number
  copy_name: string
  isVip: string
  copyList: {
    type: string
    title: string
    value?: any
  }[]
}
//问卷模板信息返回数据类型
export type copyDataResponse = GlobalResponseData<copyData[]>
