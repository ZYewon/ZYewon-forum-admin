import router from "@/router";
export const addRoute = async (name: string, menuList: any[]) => {
  const modules = import.meta.glob("/views/*.vue");
  for (const menu of menuList) {
    if (menu.children && menu.children.length > 0) {
      await addRoute(name, menu.children);
    } else {
      const url = `../views${menu.component}.vue`;
      router.addRoute(name, {
        component: () => import(/*@vite-ignore*/ url),
        meta: menu.meta,
        name: menu.path,
        path: "/" + menu.path,
      });
    }
  }
};
