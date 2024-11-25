<template>
  <div class="apptitle">问卷星</div>
  <div class="headerRight">
    <span @click="() => router.push('/vippay')" class="vip-btn">升级VIP</span>
    <el-switch
      @change="changeTheme"
      :active-action-icon="MostlyCloudy"
      :inactive-action-icon="Sunny"
      v-model="userStore.isDark"
    />
    <div class="user_name">管理员</div>
    <img class="img" :src="userStore.userInfo.avatar" alt="" />
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
// const colorHandle = () => {
//   userStore.switchDark()
// }
const changeTheme = (e: any) => {
  console.log('打印e', e)
  userStore.switchDark(e)
}
</script>
<style lang="scss" scoped>
.apptitle {
  font-weight: bold;
  font-size: 20px;
  color: var(--title-color);
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 50px;
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
    overflow: hidden;
    border-radius: 50%;
  }
}
</style>
