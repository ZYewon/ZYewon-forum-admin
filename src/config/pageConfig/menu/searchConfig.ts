import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "name input", label: "资源名称" },
      { value: "path input", label: "资源路径" },
      { value: "method input", label: "请求类型" },
      { value: "type radio", label: "资源类型" },
      { value: "remark input", label: "资源描述" },
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
      element: "radio",
      field: "radio",
      show: "radio",
      fieldDetault: "",
      prop: "radio",
      listOptions: [
        {
          label: "",
          title: "全部",
        },
        {
          label: "api",
          title: "接口",
        },
        {
          label: "btn",
          title: "按钮",
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
    radio: [{ required: true, message: "请选择", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
