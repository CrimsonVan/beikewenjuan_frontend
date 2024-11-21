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
      <el-button @click="copy(link)" class="copy-btn" color="#626aef" :icon="CopyDocument" />
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
                  <span style="color: #6e6e6e"> ({{ item.type }})</span>
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
              <div
                style="
                  width: 100%;
                  display: flex;
                  background-color: #f7f7f7;
                  justify-content: flex-end;
                  padding: 10px 0px 10px;
                "
              >
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
          <el-empty image-size="240" description="暂时没人填写问卷呢..." />
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ArrowLeft, CopyDocument } from '@element-plus/icons-vue'
import { resultGetService } from '@/api/result'
import { copy } from '@/utils/copy'
import timeNum from './component/timeNum.vue'
import { getAbcd } from '@/utils/abcd'
import { countBy } from '@/utils/countBy'
import * as xls from 'xlsx'
const router = useRouter()
const route = useRoute()
const resArr = ref<any>() //填写结果列表
const newKeyArr = ref<any>([]) //问卷问题列表
const echartsOptionList = ref<any>([]) //单选题或多选题的echarts的数据
const link = ref(window.location.origin + `/starform#/preview?id=${route.query.id}`) //问卷填写链接
const isEmpty = ref(false)
const echartStatusArr = ref<any>([])
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

onMounted(async () => {
  let res = await resultGetService({ form_id: route.query.id })
  if (res.data.data) {
    newKeyArr.value = res.data.data.newKeyArr //答卷问题列表
    resArr.value = res.data.data.resArr //填写结果列表
    let testCountList: any = []
    newKeyArr.value.forEach((item: any) => {
      if (item.type === '单选题' || item.type === '多选题' || item.type === '评分题') {
        let obj = {
          title: item.title,
          type: item.type,
          echartsArr: countBy(resArr.value, (u: any) => u[item.title])
        }
        testCountList.push(obj)
      }
    })
    echartsOptionList.value = testCountList
    for (let i = 0; i < testCountList.length; i++) {
      echartStatusArr.value.push('饼状图')
    }
    console.log('测试countBy', testCountList)
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
    background-color: var(--el-bg-color);
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
      color: #333333;
      font-weight: 600;
      font-size: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .num {
      margin-left: auto;
      margin-right: 20px;
      color: #333333;
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
      width: 28px;
      height: 28px;
      margin-left: 6px;
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
      .data {
        width: 1000px;
        margin: 30px auto;
        // background-color: cornsilk;
        padding: 10px 30px;
        border-radius: 16px;
        .data-header {
          width: 100%;
          height: 50px;
          background-color: #ffffff;
          line-height: 50px;
          font-weight: 600;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
        }
        .data-show {
          width: 100%;
          margin-bottom: 20px;
          // height: 230px;
          overflow: hidden;
          background-color: #fff;
          display: flex;
          border: 1px solid #f7f7f7; // justify-content: flex-end;
          // align-items: center;
          flex-wrap: wrap;
          .ques {
            flex: 1;
            // background-color: palegoldenrod;
            padding: 20px 25px;
            .ques-header {
              font-size: 18px;
              font-weight: 600;
              color: #333333;
              // background-color: pink;
              margin-bottom: 15px;
            }
            .ques-item {
              font-size: 17px;
              margin-bottom: 15px;
              color: #6e6e6e;
              // font-weight: 600;
              // background-color: pink;
              padding-left: 20px;
            }
          }
        }
        .data-header2 {
          width: 100%;
          height: 50px;
          background-color: #ffffff;
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
        }
      }
      .empty {
        width: 1000px;
        margin: 30px auto;
        height: 500px;
        padding: 10px 30px;
        border-radius: 16px;
        background-color: #fff;
      }
    }
  }
}
</style>
