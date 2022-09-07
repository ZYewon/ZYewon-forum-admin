import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("views/Login.vue"),
  },
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => import("views/Main.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("views/Home.vue"),
      },
      {
        path: "content",
        name: "content",
        meta: {
          title: "内容管理",
        },
        component: () => import("views/ContentManage.vue"),
      },
      {
        path: "tag",
        name: "tag",
        meta: {
          title: "标签管理",
        },
        component: () => import("views/TagsManage.vue"),
      },
      {
        path: "comment",
        name: "comment",
        meta: {
          title: "评论管理",
        },
        component: () => import("views/CommentsManage.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("views/NotFound.vue"),
  },
];

export default routes;
