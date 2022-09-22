import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  ZyewonRequestConfig,
  ZyewonRequestConfigInterceptor,
} from "./types";
import { ElMessage } from "element-plus";
const CancelToken = axios.CancelToken;

class HttpRequest {
  instance: AxiosInstance;
  interceptor?: ZyewonRequestConfigInterceptor;
  pending: any;
  constructor(config: ZyewonRequestConfig) {
    this.instance = axios.create(config);
    this.interceptor = config.interceptor;
    this.pending = {};
    this.instance.interceptors.request.use(
      (req) => {
        const key = req.url + "&" + req.method;
        this.removePending(key, true);
        req.cancelToken = new CancelToken((c) => {
          this.pending[key] = c;
        });
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        const key = res.config.url + "&" + res.config.method;
        this.removePending(key);
        if (res.data.code !== 200) {
          ElMessage.error(res.data.msg);
        }
        return res.data;
      },
      (err) => {
        console.log(err);
        if (err.response) {
          return Promise.resolve(err.response.data);
        } else {
          return Promise.resolve({ code: 500, msg: "网络请求错误" });
        }
      }
    );

    if (this.interceptor) {
      const {
        requestInterceptors,
        requestInterceptorsErr,
        responseInterceptorsErr,
        responseInterceptors,
      } = this.interceptor;
      this.instance.interceptors.request.use(
        requestInterceptors,
        requestInterceptorsErr
      );
      this.instance.interceptors.response.use(
        responseInterceptors,
        responseInterceptorsErr
      );
    }
  }
  removePending(key: string, bol = false) {
    if (this.pending[key] && bol) {
      this.pending[key]("取消重复请求");
    }
    delete this.pending[key];
  }
  request(config: ZyewonRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptors) {
        this.instance.interceptors.request.use(
          config.interceptor?.requestInterceptors
        );
      }
      this.instance
        .request(config)
        .then((v) => {
          if (config.interceptor?.responseInterceptors) {
            this.instance.interceptors.response.use(
              config.interceptor?.responseInterceptors
            );
          }
          resolve(v);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  get(config: ZyewonRequestConfig | string) {
    if (typeof config === "string") {
      return this.request({
        method: "GET",
        url: config,
      });
    }
    return this.request({ method: "GET", ...config });
  }
  post(config: ZyewonRequestConfig) {
    return this.request({ method: "POST", ...config });
  }
  delete(config: ZyewonRequestConfig) {
    return this.request({ method: "DELETE", ...config });
  }
}

export default HttpRequest;
