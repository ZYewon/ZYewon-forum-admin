import { IModelConfig } from "comp/common/PageModel/types";

const formConfig: IModelConfig = {
  disabled: true,
  labelWidth: 100,
  configList: [
    {
      element: "input",
      field: "title",
      label: "菜单标题",
      placeholder: "请输入菜单名称",
    },
    {
      element: "input",
      field: "path",
      label: "路由名字",
      placeholder: "请输入菜单路由名字",
    },
    {
      element: "select",
      field: "type",
      label: "菜单类型",
      placeholder: "请选择菜单类型",
      options: [
        {
          field: "dir",
          name: "目录",
        },
        {
          field: "page",
          name: "页面",
        },
      ],
    },

    {
      element: "input",
      field: "component",
      label: "组件路径",
      placeholder: "请输入组件路径",
      append: ".vue",
      prepend: '()=>import("views")',
    },
    {
      element: "input",
      field: "sort",
      label: "排序",
      fieldDefault: 0,
      placeholder: "组件默认排序",
    },
    {
      element: "input",
      field: "icon",
      label: "图标",
      placeholder: "请输入前端图标组件名称",
    },
    {
      element: "input",
      field: "redirect",
      label: "重定向",
      placeholder: "重定向组件",
    },
  ],
  rules: {
    name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
    // path: [{ required: true, message: "路由路径不能为空", trigger: "blur" }],
    sort: [{ pattern: /^\d*$/, message: "请输入正确的数值" }],
    component: [
      {
        pattern: /^\/[^\u4e00-\u9fa5 ]*[^\/]$/,
        message: "不能包含空格和中文，格式为 '/' 开头，不能以 '/' 结尾",
      },
    ],
    componentPath: [
      { required: true, message: "前端组件路径不能为空", trigger: "blur" },
    ],
  },
};

export default formConfig;
