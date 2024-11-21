import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
//复制链接
export const copy = async (item: any) => {
  await toClipboard(item)
  ElMessage.success('复制链接成功')
}
