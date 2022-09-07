import request from "@/service";
// 获取用户信息
export const getUserInfo = () => {
  return request.get({
    url: "/user/getUserInfo",
  });
};
