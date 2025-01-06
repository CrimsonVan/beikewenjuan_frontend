<template>
  <div class="profile_top">
    <img class="profile_avatar" :src="useStore.userInfo.avatar" alt="" />
    <div class="profile_info">
      <div class="profile_info_item">
        {{ useStore.userInfo.nick_name }}
      </div>
    </div>
  </div>
  <div class="profile_main">
    <div class="profile_main_title">基本信息</div>
    <div class="profile_main_info">
      <div class="profile_main_item">
        <span>用户昵称</span><span class="profile_userinfo">{{ useStore.userInfo.nick_name }}</span>
        <el-icon><Edit /></el-icon>
      </div>
      <div class="profile_main_item">
        <span>用户账号</span><span class="profile_userinfo">{{ useStore.userInfo.username }}</span>
        <el-icon><Edit /></el-icon>
      </div>
      <div class="profile_main_item">
        <span>用户性别</span> <span class="profile_userinfo">男</span> <el-icon><Edit /></el-icon>
      </div>
      <div class="profile_main_item">
        <span>个人签名</span><span class="profile_userinfo">我要成为js高手</span>
        <el-icon><Edit /></el-icon>
      </div>
      <div class="profile_main_item">
        <span>出生日期</span><span class="profile_userinfo">2002-07-27</span>
        <el-icon><Edit /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userInfoStore } from '@/stores'
import { Edit } from '@element-plus/icons-vue'
const useStore = userInfoStore()
</script>
<style lang="scss">
.profile_top {
  width: 1000px;
  height: 150px;
  background-color: var(--card-color);
  display: flex;
  padding: 20px;
  .profile_avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  .profile_info {
    margin-left: 15px;
    color: var(--title-color);
    font-size: 21px;
  }
}
.profile_main {
  margin-top: 15px;
  width: 1000px;
  background-color: var(--card-color);
  .profile_main_title {
    height: 50px;
    width: 100%;
    border-bottom: 5px solid var(--bg-color);
    padding-left: 20px;
    line-height: 50px;
    font-size: 18px;
    color: var(--title-color);
    font-weight: 600;
  }
  .profile_main_info {
    padding: 20px 35px;
    .profile_main_item {
      width: 100%;
      height: 55px;
      display: flex;
      align-items: center;
      color: var(--title-color);
      font-size: 14px;
      .profile_userinfo {
        margin-left: 35px;
      }
      .el-icon {
        margin-left: 25px;
        cursor: pointer;
        visibility: hidden;
      }
      &:hover {
        .el-icon {
          color: #1296db;
          visibility: visible;
        }
      }
    }
  }
}
</style>
