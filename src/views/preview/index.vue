<template>
  <div class="pre">
    <el-scrollbar class="scroll">
      <div class="form-area">
        <!-- 问卷禁止填写 -->
        <div class="ban-top" v-if="isFormBan">此 问 卷 禁 止 填 写 !</div>
        <!-- 问卷标题 -->
        <div class="form-top">
          <div class="form-top-title">{{ formDetail?.form_name }}</div>
          <div class="form-top-desc">请根据实际情况填写</div>
        </div>
        <!-- 问卷题目 -->
        <questionOption
          v-for="(item, index) in formDetail?.questionList"
          :key="index"
          :index="index"
          :detail="item"
          :isEdit="false"
        >
        </questionOption>
        <!-- 提交问卷 -->
        <div class="submit">
          <el-button :disabled="isBtnBan" @click="submit" class="sub-btn" type="primary"
            >提交问卷</el-button
          >
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { formGetOneService } from '@/api/form'
import { useRoute } from 'vue-router'
import questionOption from '@/components/questionOption.vue'
import { ElMessage } from 'element-plus'
import { resultAddService } from '@/api/result'
import { getNowDate } from '@/utils/data'
import type { formDataResponse, formData } from '@/types/form'
const route = useRoute()
const formDetail = ref<formData>() //问卷信息
const isBtnBan = ref<boolean>(false)
const isFormBan = ref<boolean>(false)
//是否完成填写
const isFinish = () => {
  let res = formDetail.value?.questionList.some(
    (item: any) =>
      item.value === '' ||
      item.value === null ||
      item.value === undefined ||
      item.value.length === 0
  )
  if (res === true) {
    return true
  } else {
    return false
  }
}
//提交问卷
const submit = async () => {
  if (isFinish()) {
    ElMessage({
      type: 'warning',
      message: '还有未填题目'
    })
    return
  }
  console.log('打印要提交的问卷', formDetail.value?.questionList)
  let res = await resultAddService({
    form_id: route.query.id,
    resList: formDetail.value?.questionList,
    pub_time: getNowDate()
  })
  console.log('打印新增问卷后的结果', res.data)
  if (res.data.message === '新增填写结果成功') {
    ElMessage({
      type: 'success',
      message: '提交成功'
    })
  }
}
onMounted(async () => {
  if (route.query.type === '预览') {
    isBtnBan.value = true
  }
  let res: formDataResponse = await formGetOneService({ id: route.query.id })
  console.log('打印获取单个问卷', res.data.data)
  if (res.data.data.results[0].status === '已完成') {
    isBtnBan.value = true
    isFormBan.value = true
  }
  formDetail.value = res.data.data.results[0]
  console.log('打印填写问卷页面', formDetail.value)
})
</script>
<style lang="scss" scoped>
.pre {
  width: 100%;
  height: 100vh;
  background-color: var(--bg-color);
  .scroll {
    width: 100%;
    height: 100%;
    .form-area {
      width: 420px;
      min-height: 650px;
      background-color: var(--card-color);
      margin: 40px auto 30px;
      padding: 10px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .ban-top {
        width: 100%;
        height: 50px;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        color: var(--bg-color);
      }
      .form-top {
        width: 100%;
        height: 90px;
        overflow: hidden;
        .form-top-title {
          width: 100%;
          text-align: center;
          font-weight: 600;
          font-size: 24px;
          margin-top: 10px;
        }
        .form-top-desc {
          width: 100%;
          text-align: center;
          color: var(--text-color);
          font-size: 14px;
          margin-top: 16px;
        }
      }
      .submit {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: 5px;
        .sub-btn {
          width: 80px;
          height: 35px;
        }
      }
    }
  }
}
</style>
