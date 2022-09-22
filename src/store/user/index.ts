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
    // 刷新请求用户信息，设置用户的登陆状态
    async initUserLoginState() {
      try {
        const res = await getUserInfo();
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
