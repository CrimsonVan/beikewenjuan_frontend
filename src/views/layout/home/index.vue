<template>
  <div class="all-form">
    <div class="all-form-header">
      <div class="all-form-title">问卷列表</div>
      <el-input placeholder="请输入问卷吗进行搜索" :prefix-icon="Search" />
    </div>
    <div class="all-form-item" v-for="item in 10" :key="item">
      <div class="form-item-top">
        <div class="item-top-title">前端调研报告</div>
        <div class="item-top-date">
          <span class="date-item">ID:2329016851</span>
          <span class="date-item">已发布</span>
          <span class="date-item">答卷:0</span>
          <span class="date-item">11月18日 13:20</span>
        </div>
      </div>
      <div class="form-item-bottom">
        <div class="item-bottom-left">
          <el-icon><Management /></el-icon><span>编辑问卷</span>
        </div>
        <div class="item-bottom-left">
          <el-icon><Promotion /></el-icon><span>发送问卷</span>
        </div>
        <div class="item-bottom-left">
          <el-icon><Platform /></el-icon><span>设计下载</span>
        </div>
        <div v-if="true" class="item-bottom-middle">
          <el-icon><CirclePlusFilled /></el-icon><span>发布</span>
        </div>
        <div v-else class="item-bottom-middle">
          <el-icon><RemoveFilled /></el-icon><span>停止</span>
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
  Promotion,
  Platform,
  CirclePlusFilled,
  DocumentCopy,
  Delete,
  FolderOpened,
  Bell,
  RemoveFilled
} from '@element-plus/icons-vue'
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
        &:hover {
          color: var(--el-color-primary);
        }
        &:nth-child(1) {
          margin-left: 0px;
        }
        &:nth-child(2) {
          .el-icon {
            color: #f59917;
          }
        }
        &:nth-child(3) {
          .el-icon {
            color: #627ce5;
          }
        }
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
