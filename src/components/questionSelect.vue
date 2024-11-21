<template>
  <div class="selectOne">
    <div class="select-name">{{ title }}</div>
    <!-- 问卷标题 -->
    <div class="select-area" v-if="title === '文本显示'">
      <div class="select-area-header">问卷标题</div>
      <div class="select-area-desc">问卷描述...</div>
    </div>
    <!-- 单行输入 -->
    <div @click="sendSelectInfo('填空')" class="select-area" v-if="title === '用户输入'">
      <div class="select-area-title">输入框标题</div>
      <el-input class="select-area-inp" placeholder="Please input" />
    </div>
    <!-- 多行输入 -->
    <div @click="sendSelectInfo('简答题')" class="select-area" v-if="title === '用户输入'">
      <div class="select-area-title">多行输入框标题</div>
      <el-input
        class="select-area-inp"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3 }"
        placeholder="Please input"
      />
    </div>
    <!-- 单选标题 -->
    <div @click="sendSelectInfo('单选题')" class="select-area" v-if="title === '用户选择'">
      <div class="select-area-title">单选标题</div>
      <el-radio-group class="select-more">
        <el-radio value="Sponsor">选项1</el-radio>
        <el-radio value="Venue"> 选项2</el-radio>
        <el-radio value="Venue"> 选项3</el-radio>
      </el-radio-group>
    </div>

    <!-- 多选标题 -->
    <div class="select-area" @click="sendSelectInfo('多选题')" v-if="title === '用户选择'">
      <div class="select-area-title">多选标题</div>
      <el-checkbox-group class="select-more">
        <el-checkbox value="Online activities" name="type"> 选项1 </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">选项2 </el-checkbox>
        <el-checkbox value="Offline activities" name="type"> 选项3 </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 评分标题 -->
    <div @click="sendSelectInfo('评分题')" class="select-area" v-if="title === '用户选择'">
      <div class="select-area-title">评分标题</div>
      <el-rate class="select-rate" show-score text-color="#333333" :colors="colors" />
    </div>

    <!-- 日期标题 -->
    <div @click="sendSelectInfo('日期题')" class="select-area" v-if="title === '用户选择'">
      <div class="select-area-title">日期标题</div>
      <el-date-picker
        :disabled="true"
        class="select-date"
        type="date"
        placeholder="Pick a Date"
        format="YYYY/MM/DD"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
defineProps({
  title: {
    type: String,
    default: '文本显示'
  }
})
const emit = defineEmits(['sendSelect'])
const sendSelectInfo = (val: any) => {
  let sendObj: any
  if (val === '填空') {
    sendObj = {
      type: '填空',
      title: '默认填空名称',
      value: null
    }
  }
  if (val === '单选题') {
    sendObj = {
      type: '单选题',
      title: '单选题默认标题',
      options: ['选项1', '选项2', '选项3'],
      value: null
    }
  }
  if (val === '多选题') {
    sendObj = {
      type: '多选题',
      title: '多选题默认标题',
      options: ['选项1', '选项2', '选项3'],
      value: undefined
    }
  }
  if (val === '评分题') {
    sendObj = {
      type: '评分题',
      title: '评分题默认标题',
      value: null
    }
  }
  if (val === '日期题') {
    sendObj = {
      type: '日期题',
      title: '日期题默认标题',
      value: null
    }
  }
  if (val === '简答题') {
    sendObj = {
      type: '简答题',
      title: '简答题默认标题',
      value: null
    }
  }
  emit('sendSelect', sendObj)
}
</script>
<style lang="scss" scoped>
.selectOne {
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;

  .select-name {
    color: black;
    font-size: 16px;
    font-weight: 600;
  }
  .select-area {
    width: 100%;
    min-height: 30px;
    background-color: #f7f7f7;
    margin-top: 10px;
    padding: 10px 8px;
    border-radius: 4px;
    border: 1px solid #f7f7f7;
    &:hover {
      border: 1px solid #65a3e4;
    }
    .select-area-header {
      color: black;
      font-size: 22px;
      font-weight: 600;
      text-align: center;
    }
    .select-area-desc {
      color: #6e6e6e;
      font-size: 13px;
      margin-top: 10px;
      font-weight: 600;

      text-align: center;
    }
    .select-area-title {
      color: black;
      font-size: 14px;
      font-weight: 600;
    }
    .select-area-inp {
      width: 100%;
      margin-top: 15px;
    }
    .select-more {
      margin-top: 6px;
    }
    .select-rate {
      margin-top: 5px;
    }
    ::v-deep(.el-date-editor) {
      margin-top: 10px;
      width: 100%;
      height: 32px;
    }
  }
}
</style>
