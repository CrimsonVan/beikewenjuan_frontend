<template>
  <div class="delete">
    <div class="header">
      <div class="title">回收站</div>
    </div>
    <el-table
      v-if="delPosts"
      class="table"
      ref="multipleTableRef"
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
    <div style="margin-top: 10px; display: flex; justify-content: flex-end">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="100"
      />
    </div>

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
const delPosts = ref<any>()
const multipleTableRef = ref<any>()
const selectedArr = ref<any>([])
// 勾选操作
const handleSelectionChange = (val: any[]) => {
  selectedArr.value = val.map((item: any) => item.id)
  console.log('打印selectedArr', selectedArr.value)
}
//当前页数
const currentPage = ref<any>(1)
//当前页数改变
const handleCurrentChange = (val: any) => {
  console.log('页数', val)
}
//恢复操作
const updateDel = async () => {
  await formDelUpdateService({
    idArr: selectedArr.value
  })
  ElMessage.success('恢复成功')
  let res = await formDelGetService()
  delPosts.value = res.data.data
}
onMounted(async () => {
  let res = await formDelGetService()
  delPosts.value = res.data.data
})
</script>
<style lang="scss" scoped>
.delete {
  color: var(--text-color);
  .header {
    line-height: 50px;
    font-weight: 600;
    font-size: 21px;
    margin-bottom: 40px;
  }
  .bottom {
    margin-top: 15px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--card-color);
    .btn {
      margin-left: auto;
    }
  }
}
</style>
