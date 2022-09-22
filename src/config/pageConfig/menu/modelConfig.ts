import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入资源名称",
      field: "name",
      fieldType: "string",
      label: "资源名称",
    },
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入资源路径",
      field: "path",
      fieldType: "string",
      label: "资源路径",
    },
    {
      element: "select",
      placeholder: "请选择请求类型",
      field: "method",
      label: "请求类型",
      width: "150px",
      options: [
        { field: "get", name: "GET" },
        { field: "post", name: "POST" },
        { field: "delete", name: "DELETE" },
        { field: "update", name: "UPDATE" },
      ],
    },
    {
      element: "select",
      placeholder: "请选择资源类型",
      field: "type",
      label: "资源类型",
      width: "150px",
      options: [
        { field: "api", name: "接口" },
        { field: "btn", name: "按钮" },
      ],
    },
    {
      element: "input",
      inputType: "textarea",
      placeholder: "请输入资源描述",
      field: "remark",
      label: "资源描述",
    },
  ],
  rules: {
    name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
    path: [{ required: true, message: "请输入资源路径", trigger: "blur" }],
    method: [{ required: true, message: "请选择请求类型", trigger: "blur" }],
    type: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
  },
};
export default modelConfig;
