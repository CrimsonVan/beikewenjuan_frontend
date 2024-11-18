<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <div @click="() => router.back()" class="back">
        <el-icon><ArrowLeft /></el-icon><span>返回</span>
      </div>
      <div class="title">
        <span>{{ route.query.title }}</span>
        <el-icon><Edit /></el-icon>
      </div>
      <el-button class="save">保存</el-button>
      <el-button class="pub" type="primary">发布</el-button>
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
              <div class="form-top-title">{{ route.query.title }}</div>
              <div class="form-top-desc">请根据实际情况填写</div>
              <!-- <div class="ques-hover">edit</div> -->
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
            >
            </questionOption>
          </div>

          <!-- </div> -->
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
import { ref } from 'vue'
import { Edit, Menu, ArrowLeft } from '@element-plus/icons-vue'
import questionOption from '@/components/questionOption.vue'
import questionEdit from '@/components/questionEdit.vue'
import questionSelect from '@/components/questionSelect.vue'
const route = useRoute()
const router = useRouter()
const questionEditRef = ref<any>(null)
const compList = ref<any>(['文本显示', '用户输入', '用户选择'])
const questionList = ref([
  {
    type: '填空',
    title: '您的姓名',
    value: null
  },
  {
    type: '填空',
    title: '您的联系方式',
    value: null
  },
  {
    type: '单选题',
    title: '你的工作年限',
    options: ['应届生', '1-3年', '3-5年', '5-10年'],
    value: null
  },
  {
    type: '单选题',
    title: '你期望的薪资范围',
    options: ['小于10k', '10k-15k', '大于15k'],
    value: null
  },
  {
    type: '多选题',
    title: '你熟悉的技术栈',
    options: ['Vue2', 'Vue3', 'React', 'Jquery'],
    value: null
  },
  {
    type: '评分题',
    title: '你对公司的评价',
    value: null
  },
  {
    type: '日期题',
    title: '你的生日是',
    value: null
  },
  {
    type: '简答题',
    title: '备注信息',
    value: null
  }
])
//打开编辑选项区域
const openEditOption = (index: any) => {
  questionEditRef.value.open(questionList.value[index])
}
const deleteOption = (index: any) => {
  console.log('打印要删除的index', index)
  questionList.value.splice(index, 1)
}
//添加问卷问题
const addOption = (val: any) => {
  console.log('已确认添加', val)
  questionList.value.push(val)
}
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    background-color: var(--el-bg-color);
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
      color: #333333;
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
      color: #333333;
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
    background-color: #f7f7f7;
    padding: 20px;
    .edit-area {
      width: 100%;
      background-color: #ffffff;
      height: 100%;
      .edit-area-header {
        width: 100%;
        height: 6%;
        font-size: 14px;
        color: #0095ff;
        font-weight: 600;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
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
      background-color: #fff;
      height: 100%;
      .comp-area-header {
        width: 100%;
        height: 6%;
        font-size: 14px;
        color: #0095ff;
        font-weight: 600;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
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
      background-color: #f7f7f7;
      width: 100%;
      height: 100%;
      .form-area {
        width: 40%;
        min-height: 650px;
        background-color: #ffffff;
        margin: 40px auto 30px;
        padding: 10px;
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
            font-size: 24px;
            margin-top: 10px;
          }
          .form-top-desc {
            width: 100%;
            text-align: center;
            color: black;
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
