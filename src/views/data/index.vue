<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <div @click="() => router.back()" class="back">
        <el-icon><ArrowLeft /></el-icon><span>返回</span>
      </div>
      <div class="title">
        <span>{{ route.query.form_name }}</span>
      </div>
      <el-input v-model="link" class="copy-inp" />
      <el-button @click="copy(link)" class="copy-btn" color="#626aef"> 复制链接</el-button>
      <el-button @click="() => (posterVisible = true)" class="copy-btn2" color="#626aef"
        >海报分享</el-button
      >

      <div v-if="!isEmpty" class="num">
        <span> 答卷数量：{{ resArr?.length }}份</span>
      </div>
    </el-header>
    <!-- 主要内容 -->
    <el-main>
      <el-scrollbar class="main">
        <div class="data" v-if="!isEmpty">
          <div v-if="newKeyArr.length >= 1" class="data-header">
            <span>数据统计分析报告</span>
            <el-button @click="exportExcel" type="primary" color="#217346">导出excel</el-button>
          </div>
          <!-- 数据表格 -->
          <el-table
            v-if="newKeyArr.length >= 1"
            :border="true"
            :data="resArr"
            style="width: 100%; margin: 10px auto"
          >
            <el-table-column type="expand">
              <template #default="props">
                <div :m="newKeyArr.length" style="padding: 10px 60px 0px">
                  <p
                    style="margin-bottom: 20px"
                    m="t-0 b-2"
                    v-for="(item, index) in newKeyArr"
                    :key="index"
                  >
                    <span v-if="!(props.row[item.title] instanceof Array)"
                      >{{ item.title }}: {{ props.row[item.title] }}</span
                    >
                    <span v-else>{{ item.title }}: {{ props.row[item.title].join('  ') }}</span>
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="newKeyArr[0].title" :prop="newKeyArr[0].title" />
            <el-table-column :label="newKeyArr[1].title" :prop="newKeyArr[1].title" />
          </el-table>
          <div v-if="echartsOptionList.length >= 1" class="data-header2">
            <span>选择题&评分题填写结果</span>
          </div>
          <!-- echarts图表 -->
          <div v-if="echartsOptionList.length >= 1">
            <div class="data-show" v-for="(item, index) in echartsOptionList" :key="index">
              <!-- 问题 -->
              <div class="ques">
                <div class="ques-header">
                  <span>{{ index + 1 }}.</span>{{ item.title }}?
                  <span class="ques-header-type"> ({{ item.type }})</span>
                </div>
                <div class="ques-item" v-for="(i, index) in item.echartsArr" :key="index">
                  {{ getAbcd(index) }}.
                  {{ i.option }}
                </div>
              </div>
              <!-- 图表 -->
              <timeNum
                :data="item.echartsArr"
                :title="item.title"
                :titleType="item.type"
                ref="echartRef"
              ></timeNum>
              <!-- 切换按钮 -->
              <div class="change-style">
                <el-radio-group
                  v-model="echartStatusArr[index]"
                  @change="(e: any) => changeStatus(e, index)"
                >
                  <el-radio-button label="饼状图" value="饼状图" />
                  <el-radio-button label="柱状图" value="柱状图" />
                  <el-radio-button label="折线图" value="折线图" />
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <el-empty image-size="240" description="暂时没人填写问卷，快分享给别人吧！" />
        </div>
        <!-- 生成海报 -->
        <el-dialog v-model="posterVisible" title="生成海报" width="350">
          <!-- 海报绘制 -->
          <div ref="posterRef" class="share_canvas">
            <div class="share_title">{{ route.query.form_name }}</div>
            <div class="qr_img">
              <QrcodeVue :value="link" :size="90"></QrcodeVue>
            </div>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button type="primary" @click="downloadImg" :icon="Download" circle></el-button>
            </div>
          </template>
        </el-dialog>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ArrowLeft, Download } from '@element-plus/icons-vue'
import { resultGetService } from '@/api/result'
import { copy } from '@/utils/copy'
import timeNum from './component/timeNum.vue'
import { getAbcd } from '@/utils/abcd'
import { countBy } from '@/utils/countBy'
import type { resultDataResponse, echartsData } from '@/types/result'
import type { questionItem } from '@/types/form'
import * as xls from 'xlsx'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
const router = useRouter()
const route = useRoute()
const resArr = ref<any[]>([]) //填写结果列表
const newKeyArr = ref<questionItem[]>([]) //问卷问题列表
const echartsOptionList = ref<echartsData[]>([]) //单选题、多选题、评分题的echarts的数据
const link = ref<string>(window.location.origin + `/starform#/preview?id=${route.query.id}`) //问卷填写链接
const isEmpty = ref<boolean>(false)
const echartStatusArr = ref<string[]>([])
const posterVisible = ref<boolean>(false) //海报弹窗是否可见
const posterRef = ref<any>(null) //分享海报dom
let echartRef = ref<any>(null)
//改变echarts
const changeStatus = (e: any, index: any) => {
  echartRef.value[index].changeType(e)
}
//导出excel
const exportExcel = () => {
  const data = xls.utils.json_to_sheet(resArr.value) //此处tableData.value为表格的数据
  const wb = xls.utils.book_new()
  xls.utils.book_append_sheet(wb, data, route.query.form_name as string) //test-data为自定义的sheet表名
  xls.writeFile(wb, `${route.query.form_name}.xlsx`) //test.xlsx为自定义的文件名
}
//下载海报
const downloadImg = async () => {
  console.log('打印海报dom', posterRef.value.clientHeight)
  await html2canvas(posterRef.value, {
    backgroundColor: '#fff'
  }).then((canvas) => {
    let url = canvas.toDataURL('image/png')
    let images = url
    const a = document.createElement('a')
    a.href = images
    a.download = '下载页面.png'
    a.click()
  })
}
onMounted(async () => {
  let res: resultDataResponse = await resultGetService({ form_id: route.query.id })
  console.log('打印result的res', res.data.data)

  if (res.data.data) {
    newKeyArr.value = res.data.data.newKeyArr //答卷问题列表
    resArr.value = res.data.data.resArr //填写结果列表
    // let testCountList: any = []
    newKeyArr.value.forEach((item: any) => {
      if (item.type === '单选题' || item.type === '多选题' || item.type === '评分题') {
        let obj = {
          title: item.title,
          type: item.type,
          echartsArr: countBy(resArr.value, (u: any) => u[item.title])
        }
        // testCountList.push(obj)
        echartsOptionList.value.push(obj)
      }
    })
    // echartsOptionList.value = testCountList
    console.log('echarts图表', echartsOptionList.value)

    for (let i = 0; i < echartsOptionList.value.length; i++) {
      echartStatusArr.value.push('饼状图')
    }
  } else {
    console.log('暂无填写结果')
    isEmpty.value = true
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
      color: var(--title-color);
      font-weight: 600;
      font-size: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .num {
      margin-left: auto;
      margin-right: 20px;
      color: var(--title-color);
      font-weight: 600;
      font-size: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .copy-inp {
      margin-left: 370px;
      width: 320px;
      height: 30px;
    }
    .copy-btn {
      min-width: 28px;
      height: 28px;
      margin-left: 6px;
    }
    .copy-btn2 {
      min-width: 28px;
      // height: 28px;
      height: 28px;
      margin-left: 6px;
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
      .data {
        width: 1000px;
        margin: 30px auto;
        // background-color: cornsilk;
        padding: 10px 30px;
        border-radius: 16px;
        .data-header {
          width: 100%;
          height: 50px;
          background-color: var(--card-color);
          line-height: 50px;
          font-weight: 600;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          color: var(--title-color);
        }
        .data-show {
          width: 100%;
          margin-bottom: 20px;
          // height: 230px;
          overflow: hidden;
          background-color: var(--card-color);
          display: flex;
          border: 1px solid var(--bg-color); // justify-content: flex-end;
          // align-items: center;
          flex-wrap: wrap;
          .ques {
            flex: 1;
            // background-color: palegoldenrod;
            padding: 20px 25px;
            .ques-header {
              font-size: 18px;
              font-weight: 600;
              color: var(--text-color);
              // background-color: pink;
              margin-bottom: 15px;
              .ques-header-type {
                color: var(--text-color);
              }
            }
            .ques-item {
              font-size: 17px;
              margin-bottom: 15px;
              color: var(--text-color);
              // font-weight: 600;
              // background-color: pink;
              padding-left: 20px;
            }
          }
          .change-style {
            width: 100%;
            display: flex;
            background-color: var(--bg-color);
            justify-content: flex-end;
            padding: 10px 0px 10px;
          }
        }
        .data-header2 {
          width: 100%;
          height: 50px;
          background-color: var(--card-color);
          line-height: 50px;
          font-weight: 600;
          font-size: 20px;
          text-align: center;
          margin-bottom: 10px;
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          color: var(--title-color);
        }
      }
      .empty {
        width: 1000px;
        margin: 30px auto;
        height: 500px;
        padding: 10px 30px;
        border-radius: 16px;
        background-color: var(--card-color);
      }
      .share_canvas {
        width: 100%;
        height: 550px;
        background-color: #626aef;
        overflow: hidden;
        .share_title {
          text-align: center;
          margin: 20px auto;
          color: #fff;
          font-size: 24px;
        }
        .qr_img {
          margin: 280px auto;
          width: 110px;
          height: 110px;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
