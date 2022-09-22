import type { ITableConfig } from "comp//common/PageTable/types";
import dayjs from "dayjs";

const tableConfig: ITableConfig = {
  emptyText: "暂无数据",
  headColumn: [
    {
      type: "expand",
    },
    {
      type: "selection",
    },
  ],
  customColumn: [
    {
      slotName: "handler",
      label: "操作",
      align: "center",
      minWidth: 150,
    },
  ],
  configList: [
    {
      label: "文章标题",
      prop: "tid.title",
      align: "left",
    },
    {
      label: "文章作者",
      prop: "tuid.nickname",
    },
    {
      label: "评论用户",
      prop: "cuid.nickname",
    },
    {
      label: "回复内容",
      prop: "content",
      minWidth: 250,
      align: "left",
    },
    {
      label: "是否显示",
      prop: "status",
      slotName: "status",
    },
    {
      label: "是否采纳",
      prop: "isBest",
      slotName: "isBest",
    },
    {
      label: "评论时间",
      prop: "created",
      minWidth: 150,
      formatter(row: any, column: any, value: any) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ],
};
export default tableConfig;
