import { defineStore } from "pinia";

export default defineStore("global", {
  state() {
    return {
      sid: "",
    };
  },
  actions: {
    setSid(sid: string) {
      this.sid = sid;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["sid"],
      },
    ],
  },
});
