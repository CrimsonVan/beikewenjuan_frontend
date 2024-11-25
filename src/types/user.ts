import type { GlobalResponseData } from './global'
//表格信息类型
export type userInfoData = {
  id?: number
  username: string
  password: string
  avatar: string
  nick_name: string
  isVip: string
}
//表格信息返回数据类型
export type userInfoDataResponse = GlobalResponseData<userInfoData>
