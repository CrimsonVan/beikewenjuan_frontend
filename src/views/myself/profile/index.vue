<template>
  <div class="profile_top">
    <div class="profile_avatar" @click="() => (dialogVisible = true)">
      <img style="width: 100%; height: 100%" :src="useStore.userInfo.avatar" alt="" />
      <el-icon class="camera_icon"><CameraFilled /></el-icon>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="修改头像"
      width="500"
      :before-close="
        () => {
          curAvatar = ''
          isUpload = false
          dialogVisible = false
        }
      "
    >
      <!-- 上传框 -->
      <el-upload
        v-if="!isUpload"
        class="upload-demo"
        multiple
        :auto-upload="false"
        :on-change="upAvatarHandle"
        :limit="1"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      </el-upload>
      <!-- 预览框 -->
      <div v-if="isUpload" class="preAvatar">
        <img class="preAvatarImg" :src="curAvatar" alt="" />
        <p class="pre_avatar_text">头像预览</p>
      </div>
      <!-- 底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button
            v-if="!isUpload"
            @click="
              () => {
                curAvatar = ''
                isUpload = false
                dialogVisible = false
              }
            "
            >取消</el-button
          >
          <el-button v-if="isUpload" @click="backUpAvatar">上一步</el-button>
          <el-button v-if="isUpload" @click="dialogVisible = false" type="primary"
            >确认上传</el-button
          >
        </div>
      </template>
    </el-dialog>
    <div class="profile_info">
      <div class="profile_info_item">
        {{ useStore.userInfo.nick_name }}
      </div>
    </div>
  </div>
  <div class="profile_main">
    <div class="profile_main_title">基本信息</div>
    <div class="profile_main_info">
      <!-- 遍历循环 -->
      <div class="profile_main_item" v-for="item in infoList" :key="item.name">
        <span>{{ item.name }}</span>
        <el-input
          v-if="hoverItem === item.alias"
          class="inp"
          ref="inpRef"
          v-model="profileForm[item.alias]"
          @blur="saveProfileChange"
        />
        <span v-else class="profile_userinfo">{{ profileForm[item.alias] }}</span>
        <el-icon @click="selectHoverItem(item.alias)"><Edit /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { userInfoStore } from '@/stores'
import { Edit, CameraFilled } from '@element-plus/icons-vue'
import { ref, nextTick } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
const useStore = userInfoStore()
const { nick_name, username } = useStore.userInfo
const profileForm = ref<any>({ nick_name, username })
const hoverItem = ref('')
const inpRef = ref<any>(null) //输入框dom
const dialogVisible = ref<boolean>(false)
const isUpload = ref<boolean>(false)
const curAvatar = ref<string>('')
// 选定要编辑对象
const selectHoverItem = (name: string) => {
  hoverItem.value = name
  nextTick(() => {
    inpRef.value[0].focus()
  })
}
// blur后保存修改
const saveProfileChange = () => {
  hoverItem.value = ''
}
//上传头像完回调
const upAvatarHandle = (uploadFile: any) => {
  curAvatar.value = URL.createObjectURL(uploadFile.raw!)
  isUpload.value = true
}
//重新选择上传图像，退回上一步回调
const backUpAvatar = () => {
  curAvatar.value = ''
  isUpload.value = false
}
const infoList = ref<any>([
  {
    name: '用户昵称',
    alias: 'nick_name'
  },
  {
    name: '用户账号',
    alias: 'username'
  }
])
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
    overflow: hidden;
    position: relative;
    cursor: pointer;
    .camera_icon {
      position: absolute;
      color: #ffffff;
      visibility: hidden;
      font-size: 38px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      .camera_icon {
        visibility: visible;
      }
    }
  }
  .profile_info {
    margin-left: 15px;
    color: var(--title-color);
    font-size: 21px;
  }
  .preAvatar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .preAvatarImg {
      width: 135px;
      height: 135px;
      border-radius: 50%;
      border: 1px solid var(--bg-color);
    }
    .pre_avatar_text {
      font-size: 14px;
      margin-top: 6px;
      color: var(--text-color);
    }
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
      .inp {
        margin-left: 35px;
        width: 200px;
        height: 23px;
        font-size: 12px;
        margin-top: 0px;
      }
      .el-icon {
        font-size: 18px;
        margin-left: 12px;
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
