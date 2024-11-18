<template>
  <!-- 填空 -->
  <div class="edit" v-if="editVal?.type === '填空'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
  </div>

  <!-- 简答 -->
  <div class="edit" v-if="editVal?.type === '简答题'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
  </div>

  <!-- 单选 -->
  <div class="edit" v-if="editVal?.type === '单选题'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
    <div class="edit-option" v-for="(item, index) in editVal.options" :key="index">
      <div class="option-name">
        <span style="color: #0095ff" class="star">*</span> <span>选项{{ index + 1 }}</span>
        <el-icon><CirclePlusFilled @click="addSelectOption(index)" /></el-icon>
        <el-icon><RemoveFilled @click="delSelectOption(index)" /></el-icon>
      </div>
      <el-input class="option-inp" v-model="editVal.options[index]" placeholder="Please input" />
    </div>
  </div>

  <!-- 多选 -->
  <div class="edit" v-if="editVal?.type === '多选题'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
    <div class="edit-option" v-for="(item, index) in editVal.options" :key="index">
      <div class="option-name">
        <span style="color: #0095ff" class="star">*</span> <span>选项{{ index + 1 }}</span>
        <el-icon @click="addSelectOption(index)"><CirclePlusFilled /></el-icon>
        <el-icon @click="delSelectOption(index)"><RemoveFilled /></el-icon>
      </div>
      <el-input class="option-inp" v-model="editVal.options[index]" placeholder="Please input" />
    </div>
  </div>

  <!-- 评分 -->
  <div class="edit" v-if="editVal?.type === '评分题'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
  </div>

  <!-- 日期 -->
  <div class="edit" v-if="editVal?.type === '日期题'">
    <div class="edit-name"><span style="color: #0095ff">* </span><span>标题</span></div>
    <el-input v-model="editVal.title" class="edit-inp" placeholder="Please input" />
  </div>
</template>
<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'
const editVal = ref<any>({
  type: null,
  title: null,
  options: null
})
const addSelectOption = (index: any) => {
  console.log('打印index', index)
  if (editVal.value.options.length >= 7) {
    console.log('选项最多7个')
    return
  }
  editVal.value.options.splice(index + 1, 0, '默认选项')
}
const delSelectOption = (index: any) => {
  console.log('打印index', index)
  if (editVal.value.options.length <= 2) {
    console.log('选项至少2个')
    return
  }
  editVal.value.options.splice(index, 1)
}
const open = (e: any) => {
  editVal.value = e
}

defineExpose({
  open
})
</script>
<style lang="scss" scoped>
.edit {
  width: 100%;
  overflow: hidden;
  padding: 20px 12px;
  .edit-name {
    color: black;
    font-size: 15px;
    font-weight: 600;
  }
  .edit-inp {
    margin-top: 6px;
    width: 100%;
    height: 32px;
    margin-bottom: 10px;
  }
  .edit-option {
    width: 100%;
    .option-name {
      overflow: hidden;
      color: black;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      .star {
        margin-right: 4px;
      }
      .el-icon {
        font-size: 15px;
        cursor: pointer;
        &:nth-child(3) {
          margin-left: auto;
          color: #0095ff;
        }
        &:nth-child(4) {
          margin-left: 5px;
          margin-right: 3px;
          color: #6e6e6e;
        }
      }
    }
    .option-inp {
      margin-top: 6px;
      width: 100%;
      height: 32px;
      margin-bottom: 10px;
    }
  }
}
</style>
