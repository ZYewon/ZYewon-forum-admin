import request from "@/service";
// 获取用户信息
export const getUserInfo = () => {
  return request.get({
    url: "/user/getUserInfo",
  });
};

export interface IUsersParams {
  pageNum: number;
  limit: number;
  nickname?: string;
  username?: string;
  isVip?: string;
  status?: string;
  created?: string;
}
export const getUsers = (params: IUsersParams) => {
  return request.get({
    url: "/public/getusers",
    params,
  });
};

export interface IUserOperate {
  nickname?: string;
  username?: string;
  password?: string;
  roles?: string[];
  status?: string;
  isVip?: string;
  favs?: number;
  location?: string;
  gender?: string;
  remark?: string;
  type?: string;
}
export const userOperate = (data: IUserOperate) => {
  return request.post({
    url: "/admin/user-operate",
    data,
  });
};
export interface IDeleteUser {
  id?: string;
  ids?: string[];
}
export const deleteUser = (data: IDeleteUser) => {
  return request.post({
    url: "/admin/user-delete",
    data,
  });
};
