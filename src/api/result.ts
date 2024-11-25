import request from '../utils/request'
import type { resultDataResponse } from '@/types/result'
// 添加填写结果接口
export const resultAddService = (obj: any) => request.post<any>('/result/add', obj)
// 获取填写结果接口
export const resultGetService = ({ form_id }: any) =>
  request.post<any, resultDataResponse>('/result/get', { form_id })
// 获取时间端填写数量结果接口
export const timeCountGetService = ({ form_id }: any) =>
  request.post<any>('/result/getTimeCount', { form_id })
