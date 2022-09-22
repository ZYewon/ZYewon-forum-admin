import request from "@/service";
export const addMenu = (data: any) => {
  return request.post({
    url: "/admin/menu-add",
    data,
  });
};
export const getMenu = () => {
  return request.get({
    url: "/admin/menu-get",
  });
};
export const deleteMenu = (id: string) => {
  return request.post({
    url: "/admin/menu-delete",
    data: {
      _id: id,
    },
  });
};
export const updateMenu = (data: any) => {
  return request.post({
    url: "/admin/menu-edit",
    data,
  });
};

// 获取用户的权限菜单
export const getRoutes = () => {
  return request.get({
    url: "/admin/get-routes",
  });
};
