import request from '../utils/request'
// 登录接口
export const userLoginService = ({ username, password }: any) =>
  request.post<any>('/user/login', { username, password })
// 获取用户信息接口
export const userInfoGetService = ({ username }: any) =>
  request.post<any>('/user/getInfo', { username })
// 沙盒支付接口
export const vipPayService = ({ age, totalAmount }: any) =>
  request.post<any>('/user/pay', { age, totalAmount })
