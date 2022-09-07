import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface ZyewonRequestConfigInterceptor<T = any> {
  requestInterceptors?(config: AxiosRequestConfig): AxiosRequestConfig;
  requestInterceptorsErr?(err: T): T;
  responseInterceptors?(res: T): T;
  responseInterceptorsErr?(err: T): T;
}

interface ZyewonRequestConfig<T = any> extends AxiosRequestConfig {
  interceptor?: ZyewonRequestConfigInterceptor<T>;
}

export type { ZyewonRequestConfigInterceptor, ZyewonRequestConfig };
