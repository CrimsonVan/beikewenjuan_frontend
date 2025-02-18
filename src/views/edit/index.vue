<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <div @click="() => router.back()" class="back">
        <el-icon><ArrowLeft /></el-icon><span>返回</span>
      </div>
      <div class="title">
        <span v-if="!showChangeName">{{ form_name }}</span>
        <el-input ref="inpRef" @blur="() => (showChangeName = false)" v-else v-model="form_name" />
        <el-icon @click="editHeader"><Edit /></el-icon>
      </div>
      <el-button class="save" @click="saveForm">保存</el-button>
      <el-button class="pub" @click="pubForm" type="primary">发布</el-button>
      <el-button class="pub" type="warning" @click="previewForm">预览</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边 -->
      <el-aside width="320px">
        <div class="comp-area">
          <div class="comp-area-header">
            <el-icon><Menu /></el-icon><span class="text">组件库</span>
          </div>
          <el-scrollbar class="comp-scroll">
            <questionSelect
              v-for="item in compList"
              :key="item"
              :title="item"
              @sendSelect="addOption"
            ></questionSelect>
          </el-scrollbar>
        </div>
      </el-aside>
      <!-- 主要内容 -->
      <el-main>
        <el-scrollbar class="main">
          <div class="form-area">
            <!-- 问卷标题 -->
            <div class="form-top">
              <div class="form-top-title">{{ form_name }}</div>
              <div class="form-top-desc">请根据实际情况填写</div>
            </div>
            <!-- 问卷题目 -->
            <questionOption
              v-for="(item, index) in questionList"
              :key="index"
              :index="index"
              :detail="item"
              :isEdit="true"
              @sendIndex="(index) => openEditOption(index)"
              @sendDelIndex="(index) => deleteOption(index)"
              @sendVal="(index, val) => changeVal(index, val)"
              @sendUpIndex="(index) => upQuestion(index)"
              @sendDownIndex="(index) => downQuestion(index)"
            >
            </questionOption>
          </div>
        </el-scrollbar>
      </el-main>
      <!-- 右侧边 -->
      <el-aside width="320px">
        <div class="edit-area">
          <div class="edit-area-header">
            <el-icon><Edit /></el-icon><span class="text">编辑板块</span>
          </div>
          <questionEdit ref="questionEditRef"></questionEdit>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, nextTick } from 'vue'
import { Edit, Menu, ArrowLeft } from '@element-plus/icons-vue'
import questionOption from '@/components/questionOption.vue'
import questionEdit from '@/components/questionEdit.vue'
import questionSelect from '@/components/questionSelect.vue'
import {
  formAddService,
  formGetOneService,
  formUpdateOneService,
  formUpdateStatusService
} from '@/api/form'
import { oneCopyGetService } from '@/api/copy'
import { userInfoStore } from '@/stores'
import { ElMessage } from 'element-plus'
import type { formDataResponse, questionItem, formAddResponse } from '@/types/form'
import type { copyDataResponse } from '@/types/copy'

const userStore = userInfoStore()
const route = useRoute()
const router = useRouter()
const showChangeName = ref<boolean>(false)
const questionEditRef = ref<any>(null)
const compList = ref<string[]>(['文本显示', '用户输入', '用户选择'])
const questionList = ref<questionItem[]>([])
const form_name = ref<string>() //问卷名字
const form_id = ref<number>() //问卷id
const inpRef = ref<any>(null) //标题输入框dom
const openEditOption = (index: number) => {
  questionEditRef.value.open(questionList.value[index])
}
//修改问卷标题
const editHeader = () => {
  showChangeName.value = true
  nextTick(() => {
    inpRef.value.focus()
  })
}
//删除问卷问题
const deleteOption = (index: number) => {
  questionList.value.splice(index, 1)
}
//添加问卷问题
const addOption = (val: any) => {
  questionList.value.push(val)
}
//问题位置上移
const upQuestion = (index: number) => {
  if (index === 0) {
    return
  }
  ;[questionList.value[index], questionList.value[index - 1]] = [
    questionList.value[index - 1],
    questionList.value[index]
  ]
}
//问题位置下移
const downQuestion = (index: number) => {
  if (index === questionList.value.length - 1) {
    return
  }
  ;[questionList.value[index], questionList.value[index + 1]] = [
    questionList.value[index + 1],
    questionList.value[index]
  ]
}
//编辑或新增问卷
const saveForm = async () => {
  if (form_id.value) {
    //编辑问卷
    await formUpdateOneService({
      questionList: questionList.value,
      form_name: form_name.value,
      id: form_id.value
    })
    ElMessage.success('编辑问卷成功')
  } else {
    //新增问卷
    let res: formAddResponse = await formAddService({
      username: userStore.userInfo.username,
      avatar: userStore.userInfo.avatar,
      nick_name: userStore.userInfo.nick_name,
      form_name: form_name.value,
      status: '未发布',
      questionList: questionList.value
    })
    form_id.value = res.data.data.latestFormId
    ElMessage.success('新增问卷成功')
  }
}
//发布问卷
const pubForm = async () => {
  if (!form_id.value) {
    ElMessage.error('请先保存问卷')
    return
  }
  await formUpdateStatusService({ status: '已发布', id: form_id.value })
  router.push(`/data?id=${form_id.value}&form_name=${form_name.value}`)
}
//修改问卷
const changeVal = async (index: any, val: any) => {
  console.log('打印修改的值', index, val)
}
//预览问卷
const previewForm = () => {
  if (!form_id.value) {
    ElMessage.error('请先保存问卷')
    return
  }
  router.push(`/preview?id=${form_id.value}&type=预览`)
}
onMounted(async () => {
  if (route.query.id) {
    //编辑问卷
    let res: formDataResponse = await formGetOneService({ id: route.query.id })
    questionList.value = res.data.data.results[0].questionList
    form_name.value = res.data.data.results[0].form_name
    form_id.value = res.data.data.results[0].id
  } else if (route.query.copyid) {
    //使用模板问卷
    let res: copyDataResponse = await oneCopyGetService({ id: route.query.copyid })
    questionList.value = res.data.data[0].copyList
    form_name.value = res.data.data[0].copy_name
  } else if (route.query.aiCreatId) {
    //使用ai问卷
    questionList.value = userStore.aiform.questionList
    form_name.value = userStore.aiform.form_name
  } else if (route.query.pastFormId) {
    //复制往期问卷
    let res: formDataResponse = await formGetOneService({ id: route.query.pastFormId })
    questionList.value = res.data.data.results[0].questionList
    form_name.value = res.data.data.results[0].form_name
  } else {
    //新增问卷
    form_name.value = route.query.title as string
  }
})
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    background-color: var(--card-color);
    height: 7vh;
    padding: 14px 30px;
    display: flex;
    align-items: center;
    .back {
      //   background-color: cornsilk;
      color: #0095ff;
      font-size: 14px;
      display: flex;
      cursor: pointer;
      .el-icon {
        margin-top: 3.5px;
        margin-right: 4px;
      }
    }
    .title {
      margin-left: 20px;
      //   background-color: cornsilk;
      color: var(--title-color);
      font-weight: 600;
      font-size: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .el-icon {
        margin-left: 8px;
        margin-top: 2px;
        font-size: 15px;
      }
    }
    .save {
      margin-left: auto;
      width: 50px;
      height: 28px;
      font-size: 13px;
      // color: #333333;
    }
    .pub {
      margin-left: 10px;
      width: 50px;
      height: 27px;
      font-size: 13px;
    }
  }
  .el-aside {
    height: 93vh;
    background-color: var(--bg-color);
    padding: 20px;
    .edit-area {
      width: 100%;
      background-color: var(--card-color);
      height: 100%;
      .edit-area-header {
        width: 100%;
        height: 6%;
        font-size: 14px;
        color: #0095ff;
        font-weight: 600;
        display: flex;
        border-bottom: 1px solid var(--bg-color);
        align-items: center;
        .el-icon {
          margin-top: 3px;
          margin-left: 10px;
          font-size: 18px;
        }
        .text {
          margin-left: 6px;
        }
      }
    }
    .comp-area {
      width: 100%;
      background-color: var(--card-color);
      height: 100%;
      .comp-area-header {
        width: 100%;
        height: 6%;
        font-size: 14px;
        color: #0095ff;
        font-weight: 600;
        display: flex;
        border-bottom: 1px solid var(--bg-color);
        align-items: center;
        .el-icon {
          margin-top: 3px;
          margin-left: 10px;
          font-size: 18px;
        }
        .text {
          margin-left: 6px;
        }
      }
      .comp-scroll {
        width: 100%;
        padding: 20px 10px;
        height: 94%;
      }
    }
  }
  .el-main {
    padding: 0;
    height: 93vh;
    width: 100%;
    .main {
      background-color: var(--bg-color);
      width: 100%;
      height: 100%;
      .form-area {
        width: 420px;
        min-height: 650px;
        background-color: var(--card-color);
        margin: 40px auto 30px;
        padding: 10px 25px;
        .form-top {
          width: 100%;
          // background-color: cornsilk;
          height: 90px;
          overflow: hidden;

          //   margin-bottom: 20px;
          .form-top-title {
            width: 100%;
            text-align: center;
            font-weight: 600;
            color: var(--title-color);
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
        // .question-item {
        //   width: 100%;
        //   padding: 6px 0px 0px;
        //   .ques-name {
        //     color: black;
        //     font-size: 15px;
        //     font-weight: 600;
        //     margin-left: 4px;
        //     // background-color: salmon;
        //   }
        //   .ques-hover {
        //     visibility: hidden;
        //     width: 100%;
        //     height: 25px;
        //     // background-color: pink;
        //     display: flex;
        //     align-items: flex-end;
        //     .el-icon {
        //       font-size: 14px;
        //       margin-left: 8px;
        //       cursor: pointer;
        //       &:hover {
        //         color: #0095ff;
        //       }
        //       &:nth-child(1) {
        //         margin-left: auto;
        //       }
        //     }
        //   }
        //   .ques-inp {
        //     margin-top: 10px;
        //     width: 100%;
        //     height: 32px;
        //   }
        //   .ques-select-one {
        //     margin-top: 2px;
        //   }
        //   .ques-select-more {
        //     margin-top: 2px;
        //   }
        //   .ques-rate {
        //     margin-top: 0px;
        //     // padding-top: 0;
        //   }
        //   ::v-deep(.el-date-editor) {
        //     margin-top: 10px;
        //     width: 100%;
        //     height: 32px;
        //   }
        //   .ques-long-inp {
        //     margin-top: 10px;
        //     width: 100%;
        //     // height: 100px;
        //   }
        //   &:hover {
        //     .ques-hover {
        //       visibility: visible;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>
