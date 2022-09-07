<template>
  <div class="aside-container">
    <div class="logo">
      <img src="~@/assets/img/logo.png" alt="" />
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
        <template v-for="item in data" :key="item.icon">
          <template v-if="item.level === 1">
            <el-sub-menu :index="item.link">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                :index="level2.link"
                v-for="level2 in item.children"
                :key="level2.id"
                route
                >{{ level2.title }}</el-menu-item
              >
            </el-sub-menu>
          </template>
          <template v-if="item.level === 2">
            <el-menu-item :index="item.link" :key="item.id">
              <el-icon><UserFilled color="#fff" /></el-icon>
              <template #title>
                <span>{{ item.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { useRoute } from "vue-router";
import { Location, UserFilled } from "@element-plus/icons-vue";
const route = useRoute();
const props = withDefaults(
  defineProps<{
    isCollapse: boolean;
  }>(),
  {
    isCollapse: false,
  }
);
const data = [
  {
    title: "文章管理",
    icon: "Memo",
    level: 1,
    id: "1",
    link: "",
    children: [
      {
        title: "内容管理",
        icon: "Document",
        level: 2,
        id: "1-1",
        link: "content",
      },
      {
        title: "标签管理",
        icon: "Flag",
        level: 2,
        id: "1-2",
        link: "tag",
      },
    ],
  },
  {
    level: 2,
    icon: "User",
    title: "评论管理",
    id: "2",
    link: "comment",
  },
];
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
