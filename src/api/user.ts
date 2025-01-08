import request from '../utils/request'
import type { userInfoDataResponse } from '@/types/user'
// 登录接口
export const userLoginService = ({ username, password }: any) =>
  request.post<any>('/user/login', { username, password })
// 获取用户信息接口
export const userInfoGetService = ({ username }: any) =>
  request.post<userInfoDataResponse, any>('/user/getInfo', { username })
//updateUserInfo
export const updateUserInfoService = (obj: {
  username: string
  nick_name?: string
  gender?: string
  signature?: string
}) => request.post<any>('/user/updateUserInfo', obj)
//updatePassword
export const updatePasswordService = (obj: {
  oldPass: string
  newPass: string
  reNewPass: string
}) => request.post<any>('/user/updatePassword', obj)
// 沙盒支付接口
export const vipPayService = ({ age, totalAmount }: any) =>
  request.post<any>('/user/pay', { age, totalAmount })
//再次请求沙盒支付接口
export const vipPaySecondService = ({ out_trade_no, trade_no }: any) =>
  request.post<any>('/user/secondPay', { out_trade_no, trade_no })
//升级vip接口
export const vipUpdateService = ({ username }: any) =>
  request.post<any>('/user/updateVip', { username })
