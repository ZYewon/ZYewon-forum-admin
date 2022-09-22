<template>
  <div class="k-header">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ name: 'home' }" class="breadcrumb-item">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          class="breadcrumb-item"
          v-for="item in breadcrumbList"
          :key="item.name"
        >
          {{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div
      class="user"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="avatar">
        <img :src="userInfo.pic ? userInfo.pic : publicPic" alt="" />
      </div>
      <div class="user-menu-icon">
        <el-icon><CaretBottom /></el-icon>
      </div>
      <transition name="user-menu">
        <div class="user-menu" v-show="isShowMenu">
          <ul>
            <li>我的消息</li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { ArrowRight, CaretBottom } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import UserStore from "store/user";
import MenuStore from "store/menu";
const userStore = UserStore();
const menuStore = MenuStore();
const route = useRoute();
const router = useRouter();
const breadcrumbList = ref();
const isShowMenu = ref(false);
let timer: any = null;
const publicPic = ref<any>();
const getPublicPic = async () => {
  const res = await import("@/assets/img/avatar.jpeg");
  publicPic.value = res.default;
};
getPublicPic();
watch(
  () => route.matched,
  (newVal) => {
    breadcrumbList.value = newVal.filter((item) => item.meta.title);
  },
  {
    immediate: true,
  }
);
const userInfo = computed(() => userStore.userinfo);
const handleMouseEnter = () => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    isShowMenu.value = true;
  }, 300);
};
const handleMouseLeave = () => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    isShowMenu.value = false;
  }, 300);
};
const logout = () => {
  userStore.setUserInfo({});
  userStore.setToken("");
  userStore.setIsLogin(false);
  localStorage.removeItem("btns");
  menuStore.menuList = [];
  menuStore.btns = [];
  router.replace({ name: "login" });
};
</script>

<style scoped lang="scss">
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(30px);
  }
}
.user-menu-enter-active {
  animation: fadeIn 0.3s;
}
.user-menu-leave-active {
  animation: fadeOut 0.3s;
}
.k-header {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    height: 100%;
    margin-right: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    .avatar {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        height: 40px;
        border-radius: 50%;
      }
    }
    .user-menu-icon {
      margin-left: 10px;
    }
    .user-menu {
      position: absolute;
      top: 60px;
      right: -20px;
      width: 120px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.23);
      border-radius: 10px;
      z-index: 99999;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;

        li {
          width: 100%;
          padding: 10px 10px;
          text-align: center;
          letter-spacing: 1px;
          cursor: pointer;
          &:hover {
            background-color: #f1f2f3;
          }
        }
      }
    }
  }
}
.breadcrumb-item {
  cursor: pointer;
}
</style>
