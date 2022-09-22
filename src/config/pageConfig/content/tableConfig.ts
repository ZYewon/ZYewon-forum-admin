import dayjs from "dayjs";
import { ITableConfig } from "comp/common/PageTable/types";
const tableConfig: ITableConfig = {
  border: true,
  emptyText: "暂无数据",
  customColumn: [
    {
      label: "操作",
      slotName: "operate",
      minWidth: 150,
      align: "center",
    },
  ],
  headColumn: [
    {
      type: "selection",
      width: 55,
    },
  ],
  configList: [
    {
      prop: "title",
      label: "标题",
      minWidth: 200,
      align: "left",
    },
    {
      prop: "created",
      label: "创建时间",
      minWidth: 200,
      formatter(row: any, column: any, value: string) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      prop: "uid.nickname",
      label: "作者",
    },
    {
      prop: "catalog",
      label: "分类",
      formatter(row: any, column: any, value: string) {
        return {
          index: "全部",
          ask: "提问",
          advice: "建议",
          discuss: "交流",
          share: "分享",
          news: "动态",
        }[value];
      },
    },
    {
      prop: "favs",
      label: "积分",
    },
    {
      prop: "tags",
      label: "标签",
      minWidth: 80,
      // slotName: "tags",
      formatter(row: any, column: any, value: any) {
        if(!value)return''
        return value.map((item: any) => item.name).join("， ");
   
      },
    },
    {
      prop: "isEnd",
      label: "是否结帖",
      formatter(row: any, column: any, cellValue: string) {
        return {
          "0": "否",
          "1": "是",
        }[cellValue];
      },
    },
    {
      prop: "reads",
      label: "阅读计数",
    },
    {
      prop: "answer",
      label: "评论计数",
    },
    {
      prop: "status",
      label: "状态",
      slotName: "status",
    },
    {
      prop: "isTop",
      label: "是否置顶",
      formatter(row: any, column: any, cellValue: string) {
        return {
          "0": "否",
          "1": "是",
        }[cellValue];
      },
    },
  ],
};
export default tableConfig;
