<template>
  <!-- 问卷填空题目 -->
  <div class="question-item" v-if="detail">
    <!-- 问题名称 -->
    <div class="ques-name">
      {{ (index as any) + 1 }}.
      {{ detail?.title }}
    </div>
    <!-- 问题的输入框or选择框 -->
    <el-input
      v-if="detail?.type === '填空'"
      class="ques-inp"
      v-model="detail.value"
      placeholder="Please input"
    />
    <el-input
      v-if="detail?.type === '简答题'"
      class="ques-long-inp"
      type="textarea"
      v-model="detail.value"
      :autosize="{ minRows: 3, maxRows: 3 }"
      placeholder="Please input"
      show-word-limit
      maxlength="110"
    />
    <el-radio-group v-if="detail?.type === '单选题'" class="ques-select-one" v-model="detail.value">
      <el-radio v-for="(option, index) in detail?.options" :key="index" :value="option">{{
        option
      }}</el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-if="detail?.type === '多选题'"
      class="ques-select-more"
      v-model="detail.value"
    >
      <el-checkbox
        v-for="(option, index) in detail?.options"
        :key="index"
        :value="option"
        name="type"
      >
        {{ option }}
      </el-checkbox>
    </el-checkbox-group>
    <el-rate
      v-if="detail?.type === '评分题'"
      class="ques-rate"
      v-model="detail.value"
      show-score
      text-color="#333333"
      :colors="colors"
    />
    <el-date-picker
      v-if="detail?.type === '日期题'"
      v-model="detail.value"
      class="ques-date"
      type="date"
      placeholder="Pick a Date"
      format="YYYY/MM/DD"
    />
    <!-- 编辑 & 删除 & 上下移动 -->
    <div class="ques-hover" v-if="isEdit">
      <el-icon @click="() => emit('sendUpIndex', index)"><Top /></el-icon>
      <el-icon @click="() => emit('sendDownIndex', index)"><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>
</template>
<script lang="ts" setup>
import { Edit, Delete, Top, Bottom } from '@element-plus/icons-vue'
import { ref } from 'vue'
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
defineProps({
  detail: {
    type: Object
  },
  index: {
    type: Number
  },
  isEdit: {
    type: Boolean
  }
})
const emit = defineEmits(['sendIndex', 'sendDelIndex', 'sendVal', 'sendUpIndex', 'sendDownIndex'])
</script>
<style lang="scss" scoped>
.question-item {
  width: 100%;
  padding: 6px 0px 0px;
  .ques-name {
    color: var(--title-color);
    font-size: 15px;
    font-weight: 600;
    margin-left: 4px;
    // background-color: salmon;
  }
  .ques-hover {
    visibility: hidden;
    width: 100%;
    height: 25px;
    // background-color: pink;
    color: var(--text-color);
    display: flex;
    align-items: flex-end;
    .el-icon {
      font-size: 14px;
      margin-left: 8px;
      cursor: pointer;
      &:hover {
        color: #0095ff;
      }
      &:nth-child(1) {
        margin-left: auto;
      }
    }
  }
  .ques-inp {
    margin-top: 10px;
    width: 100%;
    height: 32px;
  }
  .ques-select-one {
    margin-top: 2px;
  }
  .ques-select-more {
    margin-top: 2px;
  }
  .ques-rate {
    margin-top: 0px;
    // padding-top: 0;
  }
  ::v-deep(.el-date-editor) {
    margin-top: 10px;
    width: 100%;
    height: 32px;
  }
  .ques-long-inp {
    margin-top: 10px;
    width: 100%;
    // height: 100px;
  }
  &:hover {
    .ques-hover {
      visibility: visible;
    }
  }
}
</style>
