<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <navTop></navTop>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="280px">
        <el-button
          class="create-btn"
          @click="() => router.push('/publish')"
          type="primary"
          :icon="Plus"
          >创建问卷</el-button
        >
        <div class="home-option">
          <el-icon><Document /></el-icon><span class="home-option-text">全部问卷</span>
        </div>
        <div class="home-option">
          <el-icon><Delete /></el-icon><span class="home-option-text">回收站</span>
        </div>
        <div class="home-option">
          <el-icon><FolderOpened /></el-icon><span class="home-option-text">文件夹</span>
        </div>
      </el-aside>
      <!-- 主要内容 -->
      <el-main>
        <el-scrollbar class="main">
          <RouterView></RouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Plus, Document, Delete, FolderOpened } from '@element-plus/icons-vue'
import navTop from '@/components/navTop.vue'
const router = useRouter()
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    padding: 0;
    background-color: var(--el-bg-color);
    display: flex;
    height: 8vh;
    border-bottom: 1px solid var(--el-border-color-lighter);
    // .apptitle {
    //   font-weight: bold;
    //   font-size: 20px;
    //   width: 200px;
    //   height: 100%;
    //   display: flex;
    //   align-items: center;
    //   cursor: pointer;
    //   padding-left: 50px;
    // }
    // .headerRight {
    //   min-width: 140px;
    //   margin-left: auto;
    //   margin-right: 18px;
    //   height: 100%;
    //   font-size: 14px;
    //   color: var(--el-color-primary);
    //   cursor: pointer;
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   .img {
    //     width: 32px;
    //     height: 32px;
    //     overflow: hidden;
    //     border-radius: 50%;
    //   }
    // }
  }
  .el-aside {
    height: 92vh;
    background-color: #f7f7f7;
    // background-color: cornsilk;
    padding-left: 50px;

    .create-btn {
      width: 100%;
      height: 49px;
      margin-top: 20px;
      font-size: 17px;
      margin-bottom: 10px;
    }
    .home-option {
      width: 100%;
      height: 40px;
      cursor: pointer;
      font-size: 17px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #909090;
      .el-icon {
        font-size: 21px;
        margin-left: 20px;
      }
      .home-option-text {
        margin-left: 5px;
        font-weight: 600;
      }
      &:hover {
        background-color: #ededed;
        color: #1e1a1d;
      }
    }
  }
  .el-main {
    padding: 0;
    height: 92vh;
    width: 100%;
    .main {
      background-color: #f7f7f7;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
