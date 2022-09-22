import HttpRequest from "./request";
import type { ZyewonRequestConfig } from "./request/types";
import { publicPath, baseURL } from "@/config";
import UserStore from "store/user";
const mockUrl =
  "https://www.fastmock.site/mock/4613cda021d0f1c0ed01ab636d5bc311/api";
export default new HttpRequest({
  baseURL,
  interceptor: {
    requestInterceptors(req: ZyewonRequestConfig) {
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
      if (req.mock) {
        req.baseURL = mockUrl;
      }
      return req;
    },
  },
});
