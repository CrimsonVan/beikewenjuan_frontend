import request from '../utils/request'
import type { formDataResponse } from '@/types/form'
//获取问卷接口
export const formGetService = ({ username }: any) =>
  request.post<any, formDataResponse>('/form/getAll', { username })
//获取单个问卷
export const formGetOneService = ({ id }: any) =>
  request.post<any, formDataResponse>('/form/getOne', { id })
//修改单个问卷
export const formUpdateOneService = ({ questionList, form_name, id }: any) =>
  request.post<any>('/form/updateOne', { questionList, form_name, id })
//修改发布状态
export const formUpdateStatusService = ({ status, id }: any) =>
  request.post<any>('/form/updateStatus', { status, id })
// 添加问卷接口
export const formAddService = (obj: any) => request.post<any>('/form/add', obj)
