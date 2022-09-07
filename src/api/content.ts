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
    url: "/content/delete",
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
    url: "/content/update",
    data,
  });
};
