import type { ITableConfig } from "comp/common/PageTable/types";

const tableConfig: ITableConfig = {
  border: true,
  emptyText: "暂无数据",
  headColumn: [
    {
      type: "index",
      align: "center",
      label: "序号",
      width: 100,
    },
  ],
  customColumn: [
    {
      label: "操作",
      slotName: "handler",
      align: "center",
      minWidth: 150,
    },
  ],
  configList: [
    {
      label: "名称",
      prop: "name",
    },
    {
      label: "类名",
      prop: "class",
    },
  ],
};
export default tableConfig;
