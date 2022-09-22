import request from "@/service";

export interface ICommentParams {
  title?: string;
  author?: string;
  user?: string;
  content?: string;
  created?: string;
  isBest?: string;
  status?: string;
  pageNum: number;
  limit: number;
}
export const getComments = (params: ICommentParams) => {
  return request.get({
    url: "/public/comments-public",
    params,
  });
};

export const deleteComment = (params) => {
  return request.delete({
    url: `/admin/comment-delete`,
    params
  });
};

export const batchDeleteComments = (data:any) => {
  return request.post({
    url: "/admin/batch-comments-delete",
    data
  });
};
