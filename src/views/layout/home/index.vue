<template>
  <!-- 我的问卷 -->
  <div class="all-form">
    <!-- 标题 & 搜索框 -->
    <div class="header">
      <div class="title">问卷列表</div>
      <el-input placeholder="请输入问卷吗进行搜索" :prefix-icon="Search" v-model="searchVal" />
      <el-button @click="goSearch" type="primary" size="small">搜索</el-button>
    </div>
    <!-- 问卷列表 -->
    <div class="all-form-item" v-for="item in formList" :key="item.id">
      <div class="form-item-top">
        <div class="item-top-title">{{ item.form_name }}</div>
        <div class="item-top-date">
          <span class="date-item">ID:232901685{{ item.id }}</span>
          <span
            class="date-item"
            :style="item.status === '未发布' ? { color: '#6e6e6e' } : { color: '#627ce5' }"
            >{{ item.status }}</span
          >
          <span class="date-item">答卷:{{ item.res_count }}</span>
          <span class="date-item">{{ item.pub_time }}</span>
        </div>
      </div>
      <div class="form-item-bottom">
        <div
          v-if="item.status === '未发布'"
          @click="goEdit(item.id, item.form_name)"
          class="item-bottom-left"
        >
          <el-icon><Management /></el-icon><span>编辑问卷</span>
        </div>
        <div
          v-else
          class="item-bottom-left"
          @click="router.push(`/preview?id=${item.id}&type=预览`)"
        >
          <el-icon><Management /></el-icon><span>预览问卷</span>
        </div>
        <div @click="goData(item.id, item.status, item.form_name)" class="item-bottom-left">
          <el-icon :style="item.status === '未发布' ? { color: '#ccc' } : { color: '#627ce5' }"
            ><TrendCharts /></el-icon
          ><span :style="item.status === '未发布' ? { color: '#ccc' } : { color: '#6e6e6e' }"
            >数据统计</span
          >
        </div>
        <div
          v-if="item.status === '未发布'"
          @click="updateStatus(item.id, item.form_name, '已发布')"
          class="item-bottom-middle"
        >
          <el-icon><CirclePlusFilled /></el-icon><span>发布</span>
        </div>
        <div
          v-if="item.status === '已发布'"
          @click="updateStatus(item.id, item.form_name, '已完成')"
          class="item-bottom-middle"
        >
          <el-icon><RemoveFilled /></el-icon><span>停止</span>
        </div>
        <div v-if="item.status === '已完成'" class="item-bottom-middle">
          <el-icon><SuccessFilled /></el-icon><span>完成</span>
        </div>
        <div class="item-bottom-end">
          <el-icon><DocumentCopy /></el-icon><span @click="goCopyEdit(item)">复制</span>
        </div>
        <div class="item-bottom-end">
          <el-icon><Delete /></el-icon><span>删除</span>
        </div>
        <div class="item-bottom-end">
          <el-icon><FolderOpened /></el-icon><span>文件夹</span>
        </div>
        <div class="item-bottom-end">
          <el-icon><Bell /></el-icon><span>提醒</span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div style="margin-top: 20px; margin-bottom: 60px; display: flex; justify-content: flex-end">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  Search,
  Management,
  CirclePlusFilled,
  DocumentCopy,
  Delete,
  FolderOpened,
  Bell,
  RemoveFilled,
  TrendCharts,
  SuccessFilled
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { formDelGetService } from '@/api/form'
import { userInfoStore } from '@/stores'
import { useRouter } from 'vue-router'
import { formUpdateStatusService } from '@/api/form'
import type { formDataResponse, formData } from '@/types/form'
import { getTotal } from '@/utils/getTotal'

const router = useRouter()
const userStore = userInfoStore()
const formList = ref<formData[]>([]) //问卷列表
const currentPage = ref<number>(1) //当前页数
const searchVal = ref<string>('') //搜索内容
const total = ref<number>(100)
const reqQuery = ref<{ idDelete: string; pagenum: number; form_name?: string; username: string }>({
  pagenum: 1,
  idDelete: '0',
  username: userStore.userInfo.username
}) //请求参数

const goEdit = (id: any, form_name: any) => {
  router.push(`/edit?title=${form_name}&id=${id}`)
}
//取数据展示页
const goData = (id: any, status: any, form_name: any) => {
  if (status === '已发布' || status === '已完成') {
    router.push(`/data?id=${id}&form_name=${form_name}`)
  }
}
const updateStatus = async (id: any, form_name: any, status: any) => {
  await formUpdateStatusService({ status: status, id: id })
  router.push(`/data?id=${id}&form_name=${form_name}`)
}
//前往编辑页面
const goCopyEdit = (item: any) => {
  router.push(`/edit?copyid=${item.id}&title=${item.form_name}`)
}
//获取问卷列表
const getFormList = async () => {
  let res: formDataResponse = await formDelGetService(reqQuery.value)
  formList.value = res.data.data.results
  total.value = getTotal(res.data.data.total!)
}
//页数改变操作
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
onMounted(() => {
  getFormList()
})
</script>
<style lang="scss" scoped>
.all-form {
  // padding: 20px 30px 20px 100px;
  width: 100%;

  .header {
    height: 50px;
    font-weight: 600;
    font-size: 21px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--title-color);
    .el-input {
      height: 26px;
      width: 220px;
      margin-left: auto;
      margin-right: 10px;
    }
  }
  .all-form-item {
    width: 100%;
    height: 130px;
    background-color: var(--card-color);
    margin-bottom: 20px;
    padding: 12px 24px;
    .form-item-top {
      width: 100%;
      height: 36px;
      border-bottom: 1px solid var(--bg-color);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .item-top-title {
        font-size: 15px;
        color: var(--title-color);
      }
      .item-top-date {
        font-size: 12px;
        color: var(--text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 270px;
      }
    }
    .form-item-bottom {
      margin-top: 23px;
      width: 100%;
      height: 27px;
      display: flex;
      align-items: center;
      .item-bottom-left {
        font-size: 14px;
        color: #6e6e6e;
        margin-left: 22px;
        // background-color: cornsilk;
        display: flex;
        align-items: center;
        cursor: pointer;

        .el-icon {
          font-size: 20px;
          margin-right: 2px;
          color: #4b97ce;
        }
        &:nth-child(1) {
          margin-left: 0px;
        }
      }
      .form-link {
        width: 100%;
        height: 40px;
        background-color: palegoldenrod;
      }
      .item-bottom-middle {
        font-size: 12px;
        color: #6e6e6e;
        margin-left: auto;
        margin-right: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .el-icon {
          font-size: 24px;
          color: var(--text-color);
          color: var(--el-color-primary);
          margin-right: 3px;
        }
        &:hover {
          // color: black;
          color: var(--title-color);

          .el-icon {
            color: var(--el-color-primary);
          }
        }
      }
      .item-bottom-end {
        font-size: 12px;
        color: #6e6e6e;
        margin-left: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .el-icon {
          font-size: 16px;
          margin-right: 3px;
          color: #ccc;
        }
        &:hover {
          color: var(--title-color);
        }
      }
    }
  }
}
</style>
