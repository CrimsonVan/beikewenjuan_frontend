import request from '../utils/request'
import type { copyDataResponse } from '@/types/copy'
// 获取问卷模板接口
export const copyGetService = () => request.post<any, copyDataResponse>('/copy/getAll')
// 获取单个模板接口
export const oneCopyGetService = ({ id }: any) =>
  request.post<any, copyDataResponse>('/copy/getOne', { id })
