<script setup lang="ts">
import { RouterView } from 'vue-router'
import { initColorTheme } from './utils/color'
initColorTheme()
// import '@/style/common.css'
// import '@/style/dark.css'
</script>
<template>
  <RouterView></RouterView>
</template>
