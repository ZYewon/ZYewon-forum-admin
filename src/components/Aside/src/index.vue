<template>
  <div class="aside-container">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img src="~@/assets/img/logo.png" alt="" />
      </router-link>
    </div>
    <div class="menu-list">
      <el-menu
        :default-active="route.name"
        class="el-menu-vertical-demo"
        background-color="#001524"
        text-color="#fff"
        :collapse="isCollapse"
        router
      >
        <template v-for="item in menuList" :key="item._id">
          <template v-if="item.children && item.children.length > 0">
            <el-sub-menu :index="item._id">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </template>
              <el-menu-item
                :index="item2.path"
                v-for="item2 in item.children"
                :key="item2._id"
              >
                <el-icon> <component :is="item2.icon"></component></el-icon>
                <template #title>
                  <span>{{ item2.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item._id">
              <el-icon> <component :is="item.icon"></component></el-icon>
              <template #title>
                <span>{{ item.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from "vue";
import { useRoute } from "vue-router";
import MenuStore from "store/menu";
const route = useRoute();
const menuStore = MenuStore();
const props = withDefaults(
  defineProps<{
    isCollapse: boolean;
  }>(),
  {
    isCollapse: false,
  }
);

const menuList = computed(() => menuStore.menuList);
</script>

<style scoped lang="scss">
.aside-container {
  width: 100%;
  overflow: hidden;
}
.logo {
  height: 60px;
  margin: 10px 0;
  img {
    width: 200px;
    height: 100%;
  }
}
.el-menu-vertical-demo {
  border-right: none !important;
}
</style>
