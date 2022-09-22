import dayjs from "dayjs";
import { ITableConfig } from "comp/common/PageTable/types";
import qs from "qs";
const tableConfig: ITableConfig = {
  border: true,
  emptyText: "暂无数据",

  headColumn: [
    {
      type: "selection",
      width: 55,
    },
    {
      type: "expand",
    },
  ],
  configList: [
    {
      prop: "message",
      label: "错误消息",
      minWidth: 200,
      align: "left",
    },
    {
      prop: "code",
      label: "错误码",
      minWidth: 80,
    },
    {
      prop: "method",
      label: "请求类型",
      minWidth: 80,
    },
    {
      prop: "path",
      label: "请求路径",
    },
    {
      prop: "param",
      label: "请求参数",
      minWidth: 100,
      formatter(row: any, column: any, value: any) {
        return JSON.stringify(value);
      },
    },
    {
      prop: "username",
      label: "用户",
      minWidth: 150,
    },

    {
      prop: "created",
      label: "日期",
      minWidth: 150,
      formatter(row: any, column: any, value: string) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ],
};
export default tableConfig;
