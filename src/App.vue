<script setup lang="ts">
import { RouterView } from 'vue-router'
import { initColorTheme } from './utils/color'
initColorTheme()
</script>
<template>
  <RouterView></RouterView>
</template>
