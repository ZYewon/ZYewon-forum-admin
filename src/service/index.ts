import HttpRequest from "./request";
import { publicPath, baseURL } from "@/config";
import UserStore from "store/user";
export default new HttpRequest({
  baseURL,
  interceptor: {
    requestInterceptors(req) {
      let isPublic = false;
      for (const path of publicPath) {
        if (path.test(req.url as string)) {
          isPublic = true;
          break;
        }
      }
      if (!isPublic) {
        const userStore = UserStore();
        if (req.headers) {
          req.headers["Authorization"] = "Bearer " + userStore.token;
        }
      }
      return req;
    },
  },
});
