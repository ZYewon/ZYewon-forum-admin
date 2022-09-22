import { defineStore } from "pinia";
import { getRoutes } from "api/menu";
import { addRoute } from "@/utils/addRoutes";
export default defineStore("menu", {
  state() {
    return {
      menuList: [],
      btns: [],
    };
  },
  actions: {
    async getMenuListAsync() {
      const res = await getRoutes();
      if (res.code === 200) {
        this.menuList = res.data;
        this.btns = res.btns;
        localStorage.setItem("btns", JSON.stringify(this.btns));
      }
    },
    async addRoutes() {
      await addRoute("main", this.menuList);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ["menuList"],
        storage: localStorage,
      },
    ],
  },
});
