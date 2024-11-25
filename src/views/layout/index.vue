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
        <div
          @click="routeHandle('/home')"
          class="home-option"
          :class="activeRoute === '/home' ? 'active' : ''"
        >
          <el-icon><Document /></el-icon><span class="home-option-text">全部问卷</span>
        </div>
        <div
          @click="routeHandle('/delete')"
          class="home-option"
          :class="activeRoute === '/delete' ? 'active' : ''"
        >
          <el-icon><Delete /></el-icon><span class="home-option-text">回收站</span>
        </div>
        <div
          class="home-option"
          @click="routeHandle('/folder')"
          :class="activeRoute === '/folder' ? 'active' : ''"
        >
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
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Plus, Document, Delete, FolderOpened } from '@element-plus/icons-vue'
import navTop from '@/components/navTop.vue'
const router = useRouter()
const route = useRoute()
const activeRoute = ref<string>('/home')
const routeHandle = (route: any) => {
  activeRoute.value = route
  router.push(route)
}
onMounted(() => {
  routeHandle(route.path)
})
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    padding: 0;
    background-color: var(--card-color);
    display: flex;
    height: 8vh;
    border-bottom: 1px solid #292828;
  }
  .el-aside {
    height: 92vh;
    background-color: var(--bg-color);
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
        background-color: var(--active-nav-color);
        color: var(--text-color);
      }
      &.active {
        background-color: var(--active-nav-color);
        color: var(--text-color);
      }
    }
  }
  .el-main {
    padding: 0;
    height: 92vh;
    width: 100%;
    .main {
      background-color: var(--bg-color);
      width: 100%;
      height: 100%;
    }
  }
}
</style>
