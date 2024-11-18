<template>
  <!-- 问卷填空题目 -->
  <div class="question-item" v-if="detail?.type === '填空'">
    <div class="ques-name">
      {{ (index as any) + 1 }}.
      {{ detail?.title }}
    </div>
    <el-input class="ques-inp" v-model="value" placeholder="Please input" />

    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>

  <!-- 问卷多行填空项目 -->
  <div class="question-item" v-if="detail?.type === '简答题'">
    <div class="ques-name">{{ (index as any) + 1 }}.{{ detail?.title }}</div>
    <el-input
      class="ques-long-inp"
      type="textarea"
      v-model="value"
      :autosize="{ minRows: 3, maxRows: 3 }"
      placeholder="Please input"
      show-word-limit
      maxlength="110"
    />
    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>

  <!-- 问卷单选项目 -->
  <div class="question-item" v-if="detail?.type === '单选题'">
    <div class="ques-name">{{ (index as any) + 1 }}.{{ detail?.title }}</div>
    <el-radio-group class="ques-select-one" v-model="value">
      <el-radio v-for="(option, index) in detail?.options" :key="index" :value="option">{{
        option
      }}</el-radio>
    </el-radio-group>
    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>

  <!-- 问卷多选项目 -->
  <div class="question-item" v-if="detail?.type === '多选题'">
    <div class="ques-name">{{ (index as any) + 1 }}.{{ detail?.title }}</div>
    <el-checkbox-group class="ques-select-more" v-model="value">
      <el-checkbox
        v-for="(option, index) in detail?.options"
        :key="index"
        :value="option"
        name="type"
      >
        {{ option }}
      </el-checkbox>
    </el-checkbox-group>
    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>

  <!-- 评分问题 -->
  <div class="question-item" v-if="detail?.type === '评分题'">
    <div class="ques-name">{{ (index as any) + 1 }}.{{ detail?.title }}</div>
    <el-rate class="ques-rate" v-model="value" show-score text-color="#333333" :colors="colors" />
    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
      <el-icon @click="() => emit('sendIndex', index)"><Edit /></el-icon>
      <el-icon @click="() => emit('sendDelIndex', index)"><Delete /></el-icon>
    </div>
    <div v-else class="ques-hover"></div>
  </div>

  <!-- 日期问题 -->
  <div class="question-item" v-if="detail?.type === '日期题'">
    <div class="ques-name">{{ (index as any) + 1 }}.{{ detail?.title }}</div>
    <el-date-picker
      v-model="value"
      class="ques-date"
      type="date"
      placeholder="Pick a Date"
      format="YYYY/MM/DD"
    />
    <div class="ques-hover" v-if="isEdit">
      <el-icon><Top /></el-icon>
      <el-icon><Bottom /></el-icon>
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
const value = ref() //问题答复内容
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
const emit = defineEmits(['sendIndex', 'sendDelIndex'])
// const delOption = (index: any) => {
//   console.log('打印index', index)
//   if (editVal.value[] <= 2) {
//     console.log('选项至少2个')
//     return
//   }
//   editVal.value.options.splice(index, 1)
// }
</script>
<style lang="scss" scoped>
.question-item {
  width: 100%;
  padding: 6px 0px 0px;
  .ques-name {
    color: black;
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
