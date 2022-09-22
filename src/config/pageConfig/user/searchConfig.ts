import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "nickname input", label: "用户昵称" },
      { value: "username input", label: "登录名" },
      { value: "role select", label: "角色" },
      { value: "status radio", label: "是否禁用" },
      { value: "isVip radio", label: "是否采纳" },
      { value: "created date-picker", label: "创建时间" },
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
      element: "select",
      multiple: true,
      placeholder: "请选择角色",
      field: "roles",
      fieldDetault: [],
      listOptions: [
        {
          label: "super_admin",
          title: "超级管理员",
        },
        {
          label: "admin",
          title: "管理员",
        },
        {
          label: "user",
          title: "管理员",
        },
      ],
      show: "select",
      prop: "roles",
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
    roles: [{ required: true, message: "请选择角色", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
