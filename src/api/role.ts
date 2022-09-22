import request from "@/service";
export const addRole = (data: any) => {
  return request.post({
    url: "/admin/role-add",
    data,
  });
};
export const getRole = () => {
  return request.get({
    url: "/admin/roles-get",
  });
};
export const deleteRole = (id: string) => {
  return request.post({
    url: "/admin/role-delete",
    data: {
      _id: id,
    },
  });
};
export const updateRole = (data: any) => {
  return request.post({
    url: "/admin/role-edit",
    data,
  });
};

export const getRoleNames = () => {
  return request.get({
    url: "/admin/roleNames-get",
  });
};
