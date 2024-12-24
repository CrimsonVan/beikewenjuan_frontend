<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <navTop></navTop>
    </el-header>

    <el-container>
      <el-main>
        <el-scrollbar class="main">
          <div class="start">
            <!-- 创建问卷 -->
            <div class="start-top">
              创建调查<span class="start-top-right"
                >72种题型, 强大逻辑设置, 支持红包抽奖等功能 了解更多→</span
              >
            </div>
            <div class="start-middle">
              <div class="start-middle-left">
                <div class="start-middle-left-title">
                  从空白创建<span style="color: #0095ff">调查</span>
                </div>
                <div class="start-middle-left-inp">
                  <el-input v-model="formTitle" class="create-inp" placeholder="请输入问卷标题" />
                </div>
                <div class="start-middle-left-handle">
                  <el-button @click="goEditForm" class="createBtn" type="primary"
                    >创建调查</el-button
                  >
                </div>
              </div>
              <div class="start-middle-right"></div>
              <div class="start-middle-right"></div>
              <div class="start-middle-right"></div>
            </div>

            <!-- 其他问卷模板 -->
            <div class="copy-top">复制模板问卷</div>
            <el-scrollbar class="copy-scroll">
              <div class="copy-main">
                <div v-for="(item, index) in copyArr" :key="item.id" class="copy-item">
                  <div class="copy-item-header">
                    <span>{{ item.copy_name }}</span>
                    <span class="vip-copy" v-if="item.isVip === '是'">Vip专享</span>
                  </div>
                  <div class="copy-item-info">
                    <span>共{{ item.copyList.length }}题</span
                    ><span class="preview" @click="previewCopy(index)">预览</span>
                  </div>
                </div>
                <div v-for="item in copyArr" :key="item.id" class="copy-item">
                  <div class="copy-item-header">{{ item.copy_name }}</div>
                  <div class="copy-item-info">
                    <span>共{{ item.copyList.length }}题</span><span class="preview">预览</span>
                  </div>
                </div>
                <div v-for="item in copyArr" :key="item.id" class="copy-item">
                  <div class="copy-item-header">{{ item.copy_name }}</div>
                  <div class="copy-item-info">
                    <span>共{{ item.copyList.length }}题</span><span class="preview">预览</span>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <el-drawer v-model="drawer" :direction="direction">
            <el-scrollbar class="copy-main">
              <div class="form-area">
                <!-- 问卷标题 -->
                <div class="form-top">
                  <div class="form-top-title">{{ copyArr[curIndex]?.copy_name }}</div>
                  <div class="form-top-desc">请根据实际情况填写</div>
                </div>
                <!-- 问卷题目 -->
                <questionOption
                  v-for="(item, index) in copyArr[curIndex]?.copyList"
                  :key="index"
                  :index="index"
                  :detail="item"
                  :isEdit="false"
                >
                </questionOption>
                <!-- 提交问卷 -->
                <div class="submit">
                  <el-button class="sub-btn" type="primary" @click="goCopyEdit">一键复制</el-button>
                </div>
              </div>
            </el-scrollbar>
          </el-drawer>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import navTop from '@/components/navTop.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { copyGetService } from '@/api/copy'
import type { copyDataResponse, copyData } from '@/types/copy'
import questionOption from '@/components/questionOption.vue'
import { userInfoStore } from '@/stores'
const router = useRouter()
const formTitle = ref('爱吃美食调查')
const copyArr = ref<copyData[]>([])
const curIndex = ref<number>(0)
const drawer = ref<boolean>(false)
const direction = ref<string>('rtl')
const userStore = userInfoStore()
const goEditForm = () => {
  if (formTitle.value === '') {
    ElMessage({
      type: 'warning',
      message: '问卷标题不能为空'
    })
    return
  }
  router.push(`/edit?title=${formTitle.value}`)
}
const previewCopy = (index: any) => {
  console.log('打印index', index)
  curIndex.value = index
  drawer.value = true
}
const goCopyEdit = () => {
  if (copyArr.value[curIndex.value].isVip === '是' && userStore.userInfo.isVip === '否') {
    router.push('/vippay')
    return
  }
  router.push(
    `/edit?copyid=${copyArr.value[curIndex.value].id}&title=${copyArr.value[curIndex.value].copy_name}`
  )
}
onMounted(async () => {
  let res: copyDataResponse = await copyGetService()
  console.log('打印模板问卷', res.data.data)
  copyArr.value = res.data.data
})
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    padding: 0;
    background-color: var(--card-color);
    display: flex;
    height: 8vh;
    // border-bottom: 1px solid ;
  }
  .el-main {
    padding: 0;
    height: 92vh;
    width: 100%;
    .main {
      padding: 0 140px;
      background-color: var(--bg-color);
      width: 100%;
      height: 100%;
      .start {
        padding: 20px 50px;
        .start-top {
          width: 100%;
          //   background-color: salmon;
          color: var(--title-color);
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          .start-top-right {
            color: #6e6e6e;
            font-weight: 500;
            margin-left: 10px;
            font-size: 14px;
          }
        }
        .start-middle {
          width: 100%;
          margin-top: 25px;
          height: 270px;
          //   background-color: cornsilk;
          display: flex;
          justify-content: space-between;
          .start-middle-left {
            width: 55%;

            height: 100%;
            // background-color: salmon;
            background-color: var(--card-color);
            overflow: hidden;
            .start-middle-left-title {
              width: 100%;
              font-size: 18px;
              text-align: center;
              margin-top: 35px;
              //   background-color: #fff;
              color: var(--title-color);
              font-weight: 600;
            }
            .start-middle-left-inp {
              width: 100%;
              margin-top: 40px;
              padding: 0 35px;
              //   background-color: #fff;
              //   background-color: cornsilk;
              .create-inp {
                width: 100%;
                height: 40px;
              }
            }
            .start-middle-left-handle {
              width: 100%;
              margin-top: 20px;
              //   background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              .createBtn {
                width: 100px;
                height: 42px;
              }
            }
          }
          .start-middle-right {
            width: 14%;
            height: 100%;
            background-color: var(--card-color);
          }
        }
        .copy-top {
          width: 100%;
          margin-top: 30px;
          color: var(--title-color);
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .copy-scroll {
          width: 100%;
          height: 240px;
          margin-top: 20px;
          background-color: var(--bg-color);
          .copy-main {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .copy-item {
              width: 280px;
              margin: 0px calc((100% - 4 * 280px) / 8) 8px;
              height: 110px;
              background-color: var(--card-color);
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .copy-item-header {
                font-size: 14px;
                color: var(--title-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .vip-copy {
                  color: #f6bf83;
                }
              }
              .copy-item-info {
                font-size: 11px;
                color: #ccc;
                display: flex;
                justify-content: space-between;
                .preview {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .copy-main {
        width: 100%;
        height: 100%;
        .form-area {
          width: 400px;
          min-height: 650px;
          background-color: var(--card-color);
          margin: 0px auto 30px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .form-top {
            width: 100%;
            height: 90px;
            overflow: hidden;
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
              color: var(--title-color);
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
  }
}
</style>
