<template>
  <div v-if="!isPaySuccess">正在支付中</div>
  <div v-else>{{ resMessage }}</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userInfoStore } from '@/stores'
import { vipPaySecondService, vipUpdateService } from '@/api/user'
const userStore = userInfoStore()
const route = useRoute()
const router = useRouter()
const isPaySuccess = ref(false)
const resMessage = ref('')
console.log('打印out_trade_no', route.query.out_trade_no)
console.log('打印trade_no', route.query.trade_no)
onMounted(async () => {
  let res = await vipPaySecondService({
    out_trade_no: route.query.out_trade_no,
    trade_no: route.query.trade_no
  })
  if (res.data.message === '交易完成') {
    isPaySuccess.value = true
    resMessage.value = res.data.message
    let res1 = await vipUpdateService({
      username: userStore.userInfo.username
    })

    if (res1.data.message === '升级vip成功') {
      isPaySuccess.value = true
      resMessage.value = res.data.message
      router.push('/vippay')
    }
  } else {
    isPaySuccess.value = true
    resMessage.value = res.data.message
  }
})
</script>
