<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside" :width="isCollapse ? '60px' : '200px'">
        <Aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <div class="flex flex-align-center" style="height: 100%">
            <div class="icon" @click="isCollapse = !isCollapse">
              <el-icon v-if="!isCollapse" size="24px"><Fold /></el-icon>
              <el-icon v-else size="24px"><Expand /></el-icon>
            </div>
            <k-header />
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import Aside from "comp/Aside";
import KHeader from "comp/Header";
const isCollapse = ref(false);
</script>

<style lang="scss">
.common-layout {
  height: 100%;
  .container {
    height: 100%;
  }
  .aside {
    transition: all 0.5s;
    background-color: #001524;
  }
  .icon {
    display: inline-block;
    cursor: pointer;
    margin: 0 20px 0 0;
  }
}
.main {
  background-color: #f5f7f9;
}
</style>
