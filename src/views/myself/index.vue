<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <navTop></navTop>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="340px">
        <div class="myself_nav">
          <div
            class="myself_nav_item"
            :class="activeRoute === '/profile' ? 'active' : ''"
            @click="routeHandle('/profile')"
          >
            个人资料
          </div>
          <div
            class="myself_nav_item"
            :class="activeRoute === '/password' ? 'active' : ''"
            @click="routeHandle('/password')"
          >
            账号设置
          </div>
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
import navTop from '@/components/navTop.vue'
const router = useRouter()
const route = useRoute()
const activeRoute = ref<string>('/profile')
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
    height: 50px;
  }
  .el-aside {
    height: 92vh;
    background-color: var(--bg-color);
    position: relative;
    .myself_nav {
      width: 180px;
      background-color: var(--card-color);
      position: absolute;
      top: 15px;
      right: 10px;
      padding-top: 15px;
      padding-bottom: 10px;

      .myself_nav_item {
        height: 45px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 15px;
        color: var(--title-color);
        &:hover {
          background-color: var(--bg-color);
        }
        &.active {
          background-color: var(--bg-color);
        }
      }
    }
  }
  .el-main {
    padding: 0;
    height: calc(100vh - 50px);
    width: 100%;
    .main {
      background-color: var(--bg-color);
      width: 100%;
      height: 100%;
      padding-top: 15px;
    }
  }
}
</style>
