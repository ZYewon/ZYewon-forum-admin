import request from "@/service";

interface IEditUserAndCommentParams {
  userStatus?: string;
  commentStatus?: string;
  ids: {
    cuids: string[];
    cids: string[];
  };
}
export const editUserAndComment = (data: IEditUserAndCommentParams) => {
  return request.post({
    url: "/status/set-user-comment",
    data,
  });
};
