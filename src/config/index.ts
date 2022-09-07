export const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://www.baidu.com";

export const publicPath = [/^\/login/, /^\/public/];
