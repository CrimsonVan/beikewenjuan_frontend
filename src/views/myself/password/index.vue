<template>
  <div class="password">
    <el-form :model="passwordForm" ref="ruleFormRef" :rules="rules" style="width: 500px">
      <el-form-item label="原密码" prop="oldPass">
        <el-input v-model="passwordForm.oldPass" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="passwordForm.newPass" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再输入" prop="reNewPass">
        <el-input v-model="passwordForm.reNewPass" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const ruleFormRef = ref<any>()
const passwordForm = ref<any>({
  oldPass: '恐怖片',
  newPass: 10000,
  reNewPass: 1000
})
const rules = reactive<any>({
  oldPass: [
    { required: true, message: '请输入题目数量', trigger: 'blur' },
    {
      pattern: /^\d{1,6}$/,
      message: 'num必须是数字,且不超过两位数'
    }
  ],
  newPass: [
    { required: true, message: '请输入题目数量', trigger: 'blur' },
    {
      pattern: /^\d{1,6}$/,
      message: 'num必须是数字,且不超过两位数'
    }
  ],
  reNewPass: [
    { required: true, message: '请输入题目数量', trigger: 'blur' },
    {
      pattern: /^\d{1,6}$/,
      message: 'num必须是数字,且不超过两位数'
    }
  ]
})
</script>
<style lang="scss">
.password {
  width: 1000px;
  height: 300px;
  background-color: var(--card-color);
  padding: 30px 20px;
  .btn {
    margin-left: 65px;
  }
}
</style>
