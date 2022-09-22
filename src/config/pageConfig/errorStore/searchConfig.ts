import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "message input", label: "错误消息" },
      { value: "code input", label: "错误码" },
      { value: "method select", label: "请求类型" },
      { value: "created date-picker", label: "日期" },
    ],
  },
  configList: [
    {
      element: "input",
      placeholder: "请输入",
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
      element: "select",
      field: "method",
      show: "select",
      prop: "method",
      listOptions: [
        { label: "GET", title: "GET" },
        { label: "POST", title: "POST" },
        { label: "DELETE", title: "DELETE" },
        { label: "UPDATE", title: "UPDATE" },
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
    method: [{ required: true, message: "请选择分类", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
