<template>
  <div class="chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object
  },
  title: {
    type: String
  },
  titleType: {
    type: String
  }
})
const echartsType = ref('饼状图')
const changeType = (type: any) => {
  echartsType.value = type
  initChart()
}

const chartRef = ref(null)
let chartInstance: any = null
defineExpose({
  changeType
})
onMounted(() => {
  initChart()
})

const initChart = () => {
  //如果为空 则正常进行渲染 反之 不再进行初始化
  if (chartInstance == null) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance = echarts.getInstanceByDom(chartRef.value!)

  const circleOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  const barOption = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      x: 50,
      y: 30,
      x2: 30,
      y2: 35
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6e6e6e',
        fontSize: 10,
        formatter: '{value}'
      }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#6e6e6e',
        fontSize: 10,
        formatter: function (value: any) {
          if (value.length > 4) {
            return `${value.slice(0, 4)}...`
          }
          return value
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 35,
        color: '#0095ff'
      }
    ]
  }
  const lineOption = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      x: 50,
      y: 30,
      x2: 30,
      y2: 35
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: '#6e6e6e',
        fontSize: 10,
        formatter: function (value: any) {
          if (value.length > 4) {
            return `${value.slice(0, 4)}...`
          }
          return value
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  }
  let newData = props.data
  if (echartsType.value === '柱状图') {
    barOption.series[0].data = newData?.map((item: any) => item.num)
    barOption.xAxis.data = newData?.map((item: any) => item.option)

    chartInstance.setOption(barOption, true)
  }
  if (echartsType.value === '饼状图') {
    circleOption.series[0].data = newData?.map((item: any) => {
      return { value: item.num, name: item.option }
    })
    chartInstance.setOption(circleOption, true)
  }
  if (echartsType.value === '折线图') {
    lineOption.series[0].data = newData?.map((item: any) => item.num)
    lineOption.xAxis.data = newData?.map((item: any) => item.option)
    chartInstance.setOption(lineOption, true)
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 50%;
  height: 300px;
}
</style>
