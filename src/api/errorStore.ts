import request from "@/service";

export const getError = (params: any) => {
  return request.get({
    url: "/admin/get-error",
    params,
  });
};

export const deleteError = (ids: any[]) => {
  return request.post({
    url: "/admin/delete-error",
    data: {
      ids,
    },
  });
};

export const addError = (data: any) => {
  return request.post({
    url: "/user/add-error",
    data,
  });
};
