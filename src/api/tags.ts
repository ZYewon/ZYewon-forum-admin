import request from "@/service";

export const getTags = (params?: any) => {
  return request.get({
    url: "/public/tags",
    params,
  });
};
interface Tags {
  id?: string;
  name?: string;
  class?: string;
}
export const addTag = (data: Tags) => {
  return request.post({
    url: "/admin/tags-add",
    data,
  });
};

export const editTag = (data: Tags) => {
  return request.post({
    url: "/admin/tags-edit",
    data,
  });
};

export const deleteTag = (id: string) => {
  return request.delete({
    url: "/admin/tags-delete",
    params: {
      id,
    },
  });
};
