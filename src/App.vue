<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = zhCn;
</script>

<template>
  <ElConfigProvider :locale="locale">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<style>
@import "@/assets/css/reset.css";
@import "@/assets/css/common.css";
.ml5 {
  margin-left: 5px;
}
.mb10 {
  margin-bottom: 10px;
}
.mr5 {
  margin-right: 5px;
}
</style>
