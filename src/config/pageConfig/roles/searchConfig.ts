import { ISearchConfig } from "comp/common/PageSearch/types";

const searchConfig: ISearchConfig = {
  inline: true,
  selectOptions: {
    placeholder: "请选择搜索分类",
    field: "selectValue",
    prop: "selectValue",
    options: [
      { value: "all", label: "全部" },
      { value: "roleName input", label: "角色名称" },
      { value: "permissions select", label: "权限" },
      { value: "created date-picker", label: "创建时间" },
    ],
  },
  configList: [
    {
      element: "input",
      placeholder: "请输入角色名称",
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
      placeholder: "请选择权限",
      field: "permissions",
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
      prop: "permissions",
    },
  ],
  customFormItem: [
    {
      slotName: "handler",
    },
  ],
  rules: {
    field: [{ required: true, message: "请输入角色名", trigger: "blur" }],
    date: [{ required: true, message: "请选择日期", trigger: "blur" }],
    permissions: [{ required: true, message: "请选择权限", trigger: "change" }],
    selectValue: [{ required: true, message: "请选择", trigger: "change" }],
  },
};
export default searchConfig;
