import { defineStore } from "pinia";
import { getUserInfo } from "api/user";
interface userState {
  token: string;
  userinfo: any;
  isLogin: boolean;
}
export default defineStore("user", {
  state(): userState {
    return {
      token: "",
      userinfo: {},
      isLogin: false,
    };
  },
  actions: {
    async initUserLoginState() {
      try {
        const res = await getUserInfo();
        console.log(res);
        if (res.code !== 200) {
          this.setIsLogin(false);
          this.setToken("");
          this.setUserInfo({});
        } else {
          this.setIsLogin(true);
          this.setUserInfo(res.data);
        }
      } catch (error) {
        this.setIsLogin(false);
        this.setToken("");
        this.setUserInfo({});
      }
    },
    setIsLogin(bol: boolean = false) {
      this.isLogin = bol;
    },
    setUserInfo(data: any) {
      this.userinfo = data;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["token"],
      },
    ],
  },
});
