import dayjs from "dayjs";
export default [
  {
    prop: "title",
    label: "标题",
    "min-width": 200,
  },
  {
    prop: "created",
    label: "创建时间",
    "min-width": 200,
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
    prop: "tags[0].name",
    label: "标签",
    "min-width": 80,
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
];
