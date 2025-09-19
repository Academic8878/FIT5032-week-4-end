<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <header>
    <BHeader />
  </header>

  <main>
    <RouterView />  <!-- 改为 RouterView，显示路由组件 -->
  </main>
</template>

<style scoped>
/* 保持原有样式 */
</style>