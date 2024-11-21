<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <navTop></navTop>
    </el-header>

    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="280px"> </el-aside>
      <!-- 主要内容 -->
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
                <div v-for="item in 15" :key="item" class="copy-item">1</div>
              </div>
            </el-scrollbar>
          </div>
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
import { resultGetService } from '@/api/result'
const router = useRouter()
const formTitle = ref('爱吃美食调查')
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
onMounted(async () => {
  let res = await resultGetService({ form_id: 2 })
  console.log('打印最终', res.data.data)
})
</script>
<style lang="scss" scoped>
.el-container-demo {
  height: 100vh;
  width: 100%;
  .el-header {
    padding: 0;
    background-color: var(--el-bg-color);
    display: flex;
    height: 8vh;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  .el-aside {
    height: 92vh;
    background-color: #f7f7f7;
    background-color: cornsilk;
  }
  .el-main {
    padding: 0;
    height: 92vh;
    width: 100%;
    .main {
      background-color: #f7f7f7;
      width: 100%;
      height: 100%;
      .start {
        padding: 20px 50px;
        .start-top {
          width: 100%;
          //   background-color: salmon;
          color: black;
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
            background-color: #fff;
            overflow: hidden;
            .start-middle-left-title {
              width: 100%;
              font-size: 18px;
              text-align: center;
              margin-top: 35px;
              //   background-color: #fff;
              color: black;
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
            background-color: #fff;
          }
        }
        .copy-top {
          width: 100%;
          margin-top: 30px;
          color: black;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .copy-scroll {
          width: 100%;
          height: 240px;
          margin-top: 20px;
          background-color: #f7f7f7;
          .copy-main {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .copy-item {
              width: 280px;
              margin: 0px calc((100% - 4 * 280px) / 8) 8px;
              height: 110px;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
