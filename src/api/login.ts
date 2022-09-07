import request from "@/service";
export const loginAsync = (data: any) => {
  return request.post({
    url: "/login/login",
    data,
  });
};
