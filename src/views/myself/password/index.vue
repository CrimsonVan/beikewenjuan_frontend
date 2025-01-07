<template>
  <div class="password">
    <el-form ref="ruleFormRef" :model="passwordForm" :rules="rules" style="width: 500px">
      <el-form-item label="原密码" prop="oldPass">
        <el-input v-model="passwordForm.oldPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="passwordForm.newPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="再输入" prop="reNewPass">
        <el-input v-model="passwordForm.reNewPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submit(ruleFormRef)">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const ruleFormRef = ref<any>()
const passwordForm = ref<any>({
  oldPass: '654321',
  newPass: '123456',
  reNewPass: '123456'
})
// 原密码校验规则
const validateOldPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入原密码'))
  } else {
    callback()
  }
}
// 新密码校验规则
const validateNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (passwordForm.value.reNewPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('reNewPass')
    }
    callback()
  }
}
// 再次输入的新密码校验规则
const validateReNewPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== passwordForm.value.newPass) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = reactive<any>({
  oldPass: [{ validator: validateOldPass, trigger: 'change' }],
  newPass: [{ validator: validateNewPass, trigger: 'change' }],
  reNewPass: [{ validator: validateReNewPass, trigger: 'change' }]
})
// 提交表单
const submit = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      console.log('submit成功', passwordForm.value)
    } else {
      console.log('submit失败')
    }
  })
}
</script>
<style lang="scss">
.password {
  width: 1000px;
  height: 300px;
  background-color: var(--card-color);
  padding: 30px 20px;
  .btn {
    margin-left: 55px;
  }
}
</style>
