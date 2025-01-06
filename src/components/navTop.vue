<template>
  <div class="nav_logo">
    <img class="nav_logo_img" src="../assets/创建问卷.png" alt="" />
    <p class="nav_logo_text">贝壳问卷</p>
  </div>
  <div class="headerRight">
    <span @click="() => router.push('/vippay')" class="vip-btn">升级VIP</span>
    <el-switch
      @change="changeTheme"
      :active-action-icon="MostlyCloudy"
      :inactive-action-icon="Sunny"
      v-model="userStore.isDark"
    />
    <div class="user_name">管理员</div>
    <el-dropdown>
      <img class="img" :src="userStore.userInfo.avatar" alt="" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>账号设置</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <div @click="logout" class="user_name">退出</div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { userInfoStore } from '@/stores'
import { ElMessageBox } from 'element-plus'
import { Sunny, MostlyCloudy } from '@element-plus/icons-vue'
const router = useRouter()
const userStore = userInfoStore()
const logout = () => {
  ElMessageBox.confirm('确定要退出登录吗', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.clearUserInfo()
      userStore.clearToken()
      router.push('/login')
    })
    .catch(() => {})
}

const changeTheme = (e: any) => {
  console.log('打印e', e)
  userStore.switchDark(e)
}
</script>
<style lang="scss" scoped>
.nav_logo {
  display: flex;
  margin-left: 15px;
  .nav_logo_img {
    width: 38px;
    height: 38px;
    margin-top: 5px;
  }
  .nav_logo_text {
    margin-left: 2px;
    font-weight: 600;
    font-size: 20px;
    margin-top: 10px;
  }
}
.headerRight {
  min-width: 275px;
  margin-left: auto;
  margin-right: 18px;
  height: 100%;
  font-size: 14px;
  color: var(--el-color-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .vip-btn {
    font-size: 14px;
    color: #f6bf83;
  }
  .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
