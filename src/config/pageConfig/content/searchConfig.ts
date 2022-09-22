import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "title input", label: "标题" },
      { value: "created date-picker", label: "创建时间" },
      { value: "nickname input", label: "作者" },
      { value: "catalog select", label: "分类" },
      { value: "tag input", label: "标签" },
      { value: "isEnd radio", label: "是否结束" },
      { value: "status radio", label: "状态" },
      { value: "isTop radio", label: "是否置顶" },
    ],
  },
  configList: [
    {
      element: "input",
      placeholder: "请输入关键字",
      field: "field",
      show: "input",
      prop: "field",
    },
    {
      element: "date-picker",
      placeholder: "请选择日期",
      field: "date",
      show: "date-picker",
      prop: "date",
    },
    {
      element: "radio",
      field: "radio",
      show: "radio",
      fieldDetault: "-1",
      prop: "radio",
      listOptions: [
        {
          label: "-1",
          title: "全部",
        },
        {
          label: "1",
          title: "是",
        },
        {
          label: "0",
          title: "否",
        },
      ],
    },

    {
      element: "select",
      field: "catalog",
      show: "select",
      prop: "catalog",
      listOptions: [
        { label: "index", title: "全部" },
        { label: "ask", title: "提问" },
        { label: "advice", title: "建议" },
        { label: "discuss", title: "交流" },
        { label: "share", title: "分享" },
        { label: "news", title: "动态" },
        { label: "notice", title: "公告" },
      ],
    },
  ],
  customFormItem: [
    {
      slotName: "handler",
    },
  ],
  rules: {
    field: [{ required: true, message: "请输入关键字", trigger: "blur" }],
    date: [{ required: true, message: "请选择日期", trigger: "blur" }],
    catalog: [{ required: true, message: "请选择分类", trigger: "change" }],
    radio: [{ required: true, message: "请选择", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
