import { ITableConfig } from "comp/common/PageTable/types";
const tableConfig: ITableConfig = {
  border: true,
  emptyText: "暂无数据",
  headColumn: [
    {
      type: "selection",
    },
  ],
  configList: [
    {
      prop: "name",
      label: "资源名称",
    },
    {
      prop: "type",
      label: "资源类型",
    },
    {
      prop: "method",
      label: "请求类型",
    },
    {
      prop: "path",
      label: "资源路径",
    },
    {
      prop: "remark",
      label: "资源描述",
    },
  ],
};
export default tableConfig;
