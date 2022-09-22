import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "title input", label: "文章标题" },
      { value: "author input", label: "文章作者" },
      { value: "user input", label: "评论用户" },
      { value: "content input", label: "回复内容" },
      { value: "isBest radio", label: "是否采纳" },
      { value: "status radio", label: "是否显示" },
      { value: "created date-picker", label: "评论时间" },
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
  ],
  customFormItem: [
    {
      slotName: "handler",
    },
  ],
  rules: {
    field: [{ required: true, message: "请输入关键字", trigger: "blur" }],
    date: [{ required: true, message: "请选择日期", trigger: "blur" }],
    radio: [{ required: true, message: "请选择", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
