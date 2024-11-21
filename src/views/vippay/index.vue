<template>
  <el-container class="el-container-demo">
    <!-- 头部 -->
    <el-header>
      <navTop></navTop>
    </el-header>

    <el-container>
      <!-- 主要内容 -->
      <el-main>
        <el-scrollbar class="main">
          <div class="header">白金会员</div>
          <div class="vip">
            <div class="vips">
              <div
                class="vip-item"
                v-for="(item, index) in vipType"
                :key="index"
                :class="[index === activeIndex ? 'active' : '']"
                @click="goPay(index)"
              >
                <span class="date">{{ item.date }}</span>
                <span class="price"><span class="yuan">￥</span>{{ item.price }}</span>
                <span class="oldPrice"><span class="yuan">￥</span>{{ item.price * 2 }}</span>
                <div class="tip">{{ item.tip }}</div>
              </div>
            </div>

            <div class="vip-tip">开通连续包年,会员到期按照264/年自动续费，可随时取消</div>
            <div class="alipay">
              <div class="alipay-title">支付方式：扫码支付</div>
              <img class="qrcode" @click="goSandboxPay" src="../../assets/二维码 (2).png" alt="" />
              <div class="pay-info">
                <div class="pay-price">
                  <span class="pay-yuan">￥</span><span>{{ curVip.price }}</span
                  ><span class="pay-benefit">已优惠￥{{ (curVip.price * 0.4).toFixed() }}元</span>
                </div>
                <div class="pay-way1">支付宝扫码支付</div>
                <div class="pay-way2">微信扫码支付</div>
                <div class="warning">
                  开通前请阅读
                  <span class="pay-law">《会员协议》《自动续费规则》</span>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import navTop from '@/components/navTop.vue'
import { ref } from 'vue'
import { vipPayService } from '@/api/user'
const activeIndex = ref(0)
const vipType = [
  {
    date: '12个月',
    price: 169,
    tip: '买一得五'
  },
  {
    date: '24个月',
    price: 328,
    tip: '低至2.9折'
  },
  {
    date: '连续包季',
    price: 96,
    tip: '买一得二'
  },
  {
    date: '连续包月',
    price: 30,
    tip: '限时低价'
  }
]
const curVip = ref(vipType[0])
const goPay = (index: any) => {
  activeIndex.value = index
  curVip.value = vipType[index]
}
//测试支付宝沙盒功能
const goSandboxPay = async () => {
  let randomOreder = Math.floor(Math.random() * 999)
  let res = await vipPayService({
    age: randomOreder,
    totalAmount: curVip.value.price
  })
  window.location.href = res.data.result
}
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

  .el-main {
    padding: 0;
    height: 92vh;
    width: 100%;
    .main {
      background-color: #f7f7f7;
      width: 100%;
      height: 100%;
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        margin-top: 30px;
      }
      .vip {
        // min-height: 400px;
        // background-color: pink;
        margin: 40px auto;
        display: flex;
        justify-content: space-between;
        padding: 0 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .vips {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .vip-item {
            width: 250px;
            height: 165px;
            background-color: #fff;
            border-radius: 14px;
            color: #333333;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ccc;
            overflow: hidden;
            cursor: pointer;
            flex-wrap: wrap;

            .date {
              font-size: 19px;
              margin-top: 18px;
            }
            .price {
              font-size: 36px;
              font-weight: 600;
              margin-top: 3px;
              .yuan {
                font-size: 22px;
              }
            }
            .oldPrice {
              font-size: 17px;
              text-decoration: line-through;
              margin-top: 3px;
            }
            .tip {
              margin-top: auto;
              height: 35px;
              width: 100%;
              color: #522a19;
              background-color: #faf1e5;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            &.active {
              background-color: #fff1dd;
              border: 1px solid #dfc19d;
              .tip {
                background-color: #f5e1c8;
              }
            }
          }
        }

        .vip-tip {
          font-size: 13px;
          color: #6e6e6e;
          //   background-color: palegreen;
          margin-top: 13px;
        }

        .alipay {
          margin: 45px auto;
          width: 800px;
          height: 250px;
          border-radius: 14px;
          background-color: #ffffff;
          padding: 20px 15px;
          border: 1px solid #ccc;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          .alipay-title {
            width: 100%;
            padding-left: 10px;
            font-size: 14px;
            color: #333333;
          }
          .qrcode {
            width: 210px;
            height: 100%;
          }
          .pay-info {
            // background-color: salmon;
            height: 100%;
            padding: 20px 0px;
            display: flex;
            flex-direction: column;
            .pay-price {
              //   background-color: cornsilk;
              font-size: 34px;
              font-weight: 600;
              margin-top: 3px;
              color: #fa554c;
              .pay-yuan {
                font-size: 22px;
              }
              .pay-benefit {
                font-size: 15px;
                font-weight: 500;
                margin-bottom: 5px;
                margin-left: 3px;
              }
            }
            .pay-way1 {
              font-size: 14px;
              color: #333333;
              margin-top: 20px;
              //   background-color: palegoldenrod;
            }
            .pay-way2 {
              font-size: 14px;
              color: #333333;
              margin-top: 5px;
              //   background-color: palegoldenrod;
            }
            .warning {
              color: #ccc;
              font-size: 13px;
              margin-top: auto;
              .pay-law {
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
}
</style>
