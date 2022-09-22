import { createRouter, createWebHistory } from "vue-router";
import UserStore from "store/user";
import MenuStore from "store/menu";
import { isEmpty } from "@/libs";
import routes from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = UserStore();
  const menuStore = MenuStore();
  // 如果没有 token，则跳转至登录页
  if (isEmpty(userStore.token)) {
    if (to.name === "login") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    // 如果用户不是登录状态，则请求用户信息，查询 token 是否过期
    if (!userStore.isLogin) {
      await userStore.initUserLoginState();
      // 如果变成了登录状态则不让用户跳转至登录页
      if (userStore.isLogin) {
        if (to.name === "login") {
          next({ name: "home" });
        } else {
          // 如果本地存储了菜单列表则直接添加路由即可
          if (menuStore.menuList) {
            await menuStore.addRoutes();
          } else {
            // 没存储就先获取菜单列表，在添加路由
            await menuStore.getMenuListAsync();
            await menuStore.addRoutes();
          }
          next(to.path); // 如果是异步添加路由，则需要告诉 router 跳转至那个页面
        }
      } else {
        next({ name: "home" });
      }
    } else {
      // 如果用户是登录状态，则直接跳转
      if (to.name === "login") {
        next({ name: "home" });
      } else {
        next();
      }
    }
  }
});
export default router;
