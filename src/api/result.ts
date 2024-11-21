import request from '../utils/request'
// // 获取问卷接口
// export const formGetService = ({ username }: any) => request.post<any>('/form/getAll', { username })
// //获取单个问卷
// export const formGetOneService = ({ id }: any) => request.post<any>('/form/getOne', { id })
// //修改单个问卷
// export const formUpdateOneService = ({ questionList, form_name, id }: any) =>
//   request.post<any>('/form/updateOne', { questionList, form_name, id })
// //修改发布状态
// export const formUpdateStatusService = ({ status, id }: any) =>
//   request.post<any>('/form/updateStatus', { status, id })
// 添加填写结果接口
export const resultAddService = (obj: any) => request.post<any>('/result/add', obj)
// 获取填写结果接口
export const resultGetService = ({ form_id }: any) => request.post<any>('/result/get', { form_id })
// 获取时间端填写数量结果接口
export const timeCountGetService = ({ form_id }: any) =>
  request.post<any>('/result/getTimeCount', { form_id })
