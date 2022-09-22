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
  if (isEmpty(userStore.token)) {
    if (to.name === "login") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (!userStore.isLogin) {
      await userStore.initUserLoginState();
      if (userStore.isLogin) {
        if (to.name === "login") {
          next({ name: "home" });
        } else {
          await menuStore.getMenuListAsync();
          await menuStore.addRoutes();
          next(to.path);
        }
      } else {
        next({ name: "home" });
      }
    } else {
      if (to.name === "login") {
        next({ name: "home" });
      } else {
        next();
      }
    }
  }
});
export default router;
