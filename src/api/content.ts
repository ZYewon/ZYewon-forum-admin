import request from "@/service";
interface ListType {
  page: number;
  limit?: number;
  catalog?: string;
  sort?: string;
  status?: string;
  isTop?: string;
}
// 获取文章列表
export const getList = (params: ListType) => {
  return request.get({
    url: "/public/list",
    params,
  });
};

// 删除文章
export const deletePost = (id: string) => {
  return request.delete({
    url: "/admin/content-delete",
    params: {
      id,
    },
  });
};
// 更新文章
interface IUpdatePost {
  tid: string;
  title: string;
  catalog: string;
  isEnd: number;
  isTop: string;
  favs: number;
  satatus: string;
  tag?: string;
}
export const updatePost = (data: IUpdatePost) => {
  return request.post({
    url: "/admin/content-update",
    data,
  });
};

// 批量更新文章属性
interface ITags {
  class?: string;
  name?: string;
}
interface IBatchUpdatePost {
  tids: string[];
  isEnd: 0 | 1;
  isTop: "0" | "1";
  status: "0" | "1";
  tags?: ITags[];
}
export const batchUpdatePost = (data: IBatchUpdatePost) => {
  return request.post({
    url: "/admin/batch-content-update",
    data,
  });
};

// 批量删除文章
export const batchDeletePost = (tids: string[]) => {
  return request.post({
    url: "/admin/batch-content-delete",
    data: {
      tids,
    },
  });
};
