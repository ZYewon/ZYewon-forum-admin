import request from "@/service";
export const getStatData = () => {
  return request.get("/admin/getstat");
};
