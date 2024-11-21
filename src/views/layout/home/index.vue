<template>
  <!-- 我的问卷 -->
  <div class="all-form">
    <div class="all-form-header">
      <div class="all-form-title">问卷列表</div>
      <el-input placeholder="请输入问卷吗进行搜索" :prefix-icon="Search" />
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
          <el-icon><DocumentCopy /></el-icon><span>复制</span>
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
import { formGetService } from '@/api/form'
import { userInfoStore } from '@/stores'
import { useRouter } from 'vue-router'
import { formUpdateStatusService } from '@/api/form'
const router = useRouter()
const userstore = userInfoStore()
const formList = ref<any>()
const goEdit = (id: any, form_name: any) => {
  router.push(`/edit?title=${form_name}&id=${id}`)
}
const goData = (id: any, status: any, form_name: any) => {
  if (status === '已发布' || status === '已完成') {
    router.push(`/data?id=${id}&form_name=${form_name}`)
  }
}
const updateStatus = async (id: any, form_name: any, status: any) => {
  let res = await formUpdateStatusService({ status: status, id: id })
  if (res.data.message === '修改发布状态成功') {
    console.log('修改状态成功')
    router.push(`/data?id=${id}&form_name=${form_name}`)
  }
}
onMounted(async () => {
  let res = await formGetService({ username: userstore.userInfo.username })
  formList.value = res.data.data
  console.log('打印问卷列表', formList.value)
})
</script>
<style lang="scss" scoped>
.all-form {
  padding: 20px 30px 20px 100px;
  .all-form-header {
    width: 100%;
    // background-color: salmon;
    height: 49px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .all-form-title {
      color: black;
      font-weight: 600;
      font-size: 21px;
      display: flex;
      align-items: center;
      //   background-color: skyblue;
    }
    .el-input {
      height: 85%;
      width: 250px;
    }
  }
  .all-form-item {
    width: 100%;
    height: 130px;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 12px 24px;
    .form-item-top {
      width: 100%;
      // background-color: salmon;
      height: 36px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .item-top-title {
        font-size: 15px;
        color: black;
        cursor: pointer;
        &:hover {
          color: #4b97ce;
        }
      }
      .item-top-date {
        font-size: 12px;
        // background-color: cornsilk;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 270px;
      }
    }
    .form-item-bottom {
      margin-top: 23px;
      width: 100%;
      // background-color: salmon;
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
          color: #333333;
          color: var(--el-color-primary);
          margin-right: 3px;
        }
        &:hover {
          color: black;
          .el-icon {
            color: var(--el-color-primary);
          }
        }
      }
      .item-bottom-end {
        font-size: 12px;
        color: #6e6e6e;
        margin-left: 14px;
        // background-color: cornsilk;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .el-icon {
          font-size: 16px;
          margin-right: 3px;
          color: #ccc;
        }
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>
