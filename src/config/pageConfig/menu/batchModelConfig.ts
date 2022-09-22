import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
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
  ],
};
export default modelConfig;
