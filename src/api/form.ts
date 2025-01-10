import request from '../utils/request'
import type { formDataResponse, formRegQuery, formAddResponse } from '@/types/form'
//获取问卷接口
export const formGetService = ({ username }: any) =>
  request.post<any, formDataResponse>('/form/getAll', { username })
//获取删除问卷接口
export const formDelGetService = (obj: formRegQuery) =>
  request.post<any, formDataResponse>('/form/getDelAll', obj)
//恢复问卷
export const formDelUpdateService = (obj: any) => request.post<any>('/form/updateDel', obj)
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
export const formAddService = (obj: any) => request.post<any, formAddResponse>('/form/add', obj)
// 删除问卷接口
export const formDelService = (obj: { id: number; status: string }) =>
  request.post<any, formAddResponse>('/form/del', obj)
//delForever
export const formDelForeverService = (obj: any) =>
  request.post<any, formAddResponse>('/form/delForever', obj)
