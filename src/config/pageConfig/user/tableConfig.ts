import type { ITableConfig } from "comp//common/PageTable/types";
import dayjs from "dayjs";

const tableConfig: ITableConfig = {
  emptyText: "暂无数据",
  headColumn: [
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
      label: "用户昵称",
      prop: "nickname",
      align: "left",
      minWidth: 150,
    },
    {
      label: "登录名",
      prop: "username",
      minWidth: 200,
    },
    {
      label: "角色",
      prop: "roles",
      slotName: "roles",
    },
    {
      label: "积分",
      prop: "favs",
    },
    {
      label: "是否禁用",
      prop: "status",
      slotName: "status",
    },
    {
      label: "是否是VIP",
      prop: "isVip",
      slotName: "isVip",
    },
    {
      label: "创建时间",
      prop: "created",
      minWidth: 150,
      formatter(row: any, column: any, value: any) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ],
};
export default tableConfig;
