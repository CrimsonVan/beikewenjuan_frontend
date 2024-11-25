<template>
  <div class="login">
    <div class="login-form">
      <el-form
        ref="ruleFormRef"
        style="width: 400px"
        :model="ruleForm"
        status-icon
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item>
          <div class="form_title">账 号 登 录</div>
        </el-form-item>
        <el-form-item prop="user_name">
          <el-input
            :prefix-icon="User"
            v-model="ruleForm.user_name"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="user_id">
          <el-input
            :prefix-icon="Lock"
            v-model.number="ruleForm.user_id"
            type="password"
            autocomplete="off"
            placeholder="请输入登录密码"
          />
        </el-form-item>
        <el-form-item>
          <div class="login-tip">
            <span style="color: #8a8a8a">下次自动登录</span>
            <span style="color: #8a8a8a">忘记密码/用户名？</span>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            :disabled="isEmpty"
            type="primary"
            class="btn"
            @click="submitForm(ruleFormRef)"
          >
            现在登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="read">我已阅读并同意问卷星 《用户服务协议》和《隐私条款》</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive, computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { userLoginService } from '../../api/user'
import { userInfoStore } from '@/stores'
const userStore = userInfoStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  user_id: '123456',
  user_name: '13114209341'
})

const isEmpty = computed(() => !ruleForm.user_id || !ruleForm.user_name)

const rules = reactive<FormRules<typeof ruleForm>>({
  user_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 11, message: '用户名长度请在2至11位间' }
  ],
  user_id: [
    { required: true, message: '请输入用户的user_id', trigger: 'blur' },
    {
      pattern: /^\d{1,6}$/,
      message: 'user_id必须是 1—6位 的数字'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let res = await userLoginService({
        username: ruleForm.user_name,
        password: ruleForm.user_id
      })
      userStore.setToken(res.data.token)

      if (res.data.message === '登录成功') {
        await userStore.getUserInfo(ruleForm.user_name)
        router.push('/')
        ElMessage({
          type: 'success',
          message: '登录成功'
        })
      }
    } else {
      console.log('error submit!22222222222222222')
    }
  })
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 480px;
    height: 80vh;
    background-color: var(--card-color);
    border-radius: 18px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .el-form-item {
      height: 50px;
      margin-bottom: 15px;
      &:nth-child(1) {
        margin-bottom: 30px;
        margin-top: 30px;
      }
      &:nth-child(3) {
        margin-bottom: 7px;
      }
      &:nth-child(4) {
        height: 25px;
        // background-color: pink;
        margin-bottom: 20px;
      }

      .form_title {
        font-size: 25px;
        font-weight: bold;
        display: flex;
        align-items: center;
        width: fit-content;
        height: 100%;
        color: var(--title-color);
        // background-color: pink;
        margin: 0 auto;
      }

      .el-input {
        height: 45px;
        .el-input__wrapper {
          border-radius: 6px;
        }
      }
      .login-tip {
        width: 100%;
        height: 100%;
        font-size: 12px;
        color: var(--text-color);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        // background-color: salmon;
        // padding: 0;
      }

      .btn {
        // color: #ffffff;
        width: 100%;
        margin-top: 10px;
        height: 42px;
        font-size: 16px;
        border-radius: 6px;
        margin: 0 auto;
      }
    }
    .read {
      width: 400px;
      font-size: 12px;
      color: #6e6e6e;
      margin-top: auto;
      margin-bottom: 30px;
      text-align: center;
    }
  }
}
</style>
