<template>
  <div class="delete">
    <!-- 标题 & 搜索框 -->
    <div class="header">
      <div class="title">回收站</div>
      <el-input placeholder="请输入问卷吗进行搜索" :prefix-icon="Search" v-model="searchVal" />
      <el-button @click="goSearch" type="primary" size="small">搜索</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      class="table"
      :data="delPosts"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="ID" width="100" />
      <el-table-column property="form_name" label="问卷名" />
      <el-table-column property="avatar" label="头像">
        <template #default="scope">
          <img
            style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden"
            :src="scope.row.avatar"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column property="nick_name" label="创立者" />
      <el-table-column property="pub_time" label="创建时间" />
      <el-table-column property="res_count" label="问卷数量" />
      <el-table-column property="status" label="状态" />
    </el-table>
    <!-- 分页器 -->
    <div style="margin-top: 20px; display: flex; justify-content: flex-end">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="reqQuery.pagenum"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 底部按钮 -->
    <div class="bottom">
      <span>已选数量: {{ selectedArr.length }}</span>
      <el-button class="btn" type="primary" :disabled="selectedArr.length === 0" @click="updateDel"
        >恢复问卷</el-button
      >
      <el-button type="danger" :disabled="selectedArr.length === 0">彻底删除</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { formDelGetService, formDelUpdateService } from '@/api/form'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { userInfoStore } from '@/stores'
import type { formData, formRegQuery } from '@/types/form'
import { getTotal } from '@/utils/getTotal'

const userStore = userInfoStore()
const delPosts = ref<formData[]>([]) //问卷列表
const selectedArr = ref<Array<number>>([]) //勾选数组
const searchVal = ref<string>('') //搜索内容
const currentPage = ref<number>(1) //当前页数
const total = ref<number>(100) //问卷总数

//请求参数
const reqQuery = ref<formRegQuery>({
  pagenum: 1,
  idDelete: '1',
  username: userStore.userInfo.username
})
// 勾选操作
const handleSelectionChange = (val: any[]) => {
  selectedArr.value = val.map((item: any) => item.id)
}
//获取问卷
const getFormList = async () => {
  let res = await formDelGetService(reqQuery.value)
  delPosts.value = res.data.data.results
  total.value = getTotal(res.data.data.total!)
}
//当前页数改变
const handleCurrentChange = async (val: any) => {
  reqQuery.value.pagenum = val
  getFormList()
}
//搜错
const goSearch = async () => {
  if (searchVal.value.trim() === '') {
    return
  }
  reqQuery.value.form_name = searchVal.value.trim()
  reqQuery.value.pagenum = 1
  currentPage.value = 1
  getFormList()
}
//恢复操作
const updateDel = async () => {
  await formDelUpdateService({
    idArr: selectedArr.value
  })
  ElMessage.success('恢复成功')
  getFormList()
}
onMounted(() => {
  getFormList()
})
</script>
<style lang="scss" scoped>
.delete {
  .header {
    height: 50px;
    font-weight: 600;
    font-size: 21px;
    color: var(--title-color);
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-input {
      height: 26px;
      width: 220px;
      margin-left: auto;
      margin-right: 10px;
    }
  }
  .bottom {
    margin-top: 20px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--card-color);
    // background-color: black;
    // background-color: #141414;
    color: var(--title-color);
    .btn {
      margin-left: auto;
    }
  }
}
</style>
