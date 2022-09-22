<template>
  <div class="not-found">
    <div class="container">
      <el-button class="goHome" type="primary" @click="goHome"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
  router.replace({ name: "home" });
};
</script>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  background-color: #f1f2f3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/404.webp");
  background-size: cover;
  background-repeat: no-repeat;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 30px;
    }
    .goHome {
      width: 150px;
      height: 40px;
      border-radius: 30px;
      margin-top: 30px;
    }
  }
}
</style>
