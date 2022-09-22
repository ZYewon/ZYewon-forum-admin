import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "select",
      placeholder: "请选择角色",
      multiple: true,
      field: "roles",
      fieldDefault: [],
      label: "角色",
      options: [],
    },
    {
      element: "radio",
      field: "isVip",
      fieldDefault: "0",
      label: "是否是VIP",
      options: [
        { field: "0", name: "否", size: "large" },
        { field: "1", name: "是", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "status",
      fieldType: "string",
      fieldDefault: "0",
      label: "是否禁用",
      options: [
        { field: "0", name: "否", size: "large" },
        { field: "1", name: "是", size: "large" },
      ],
    },
  ],
  rules: {
    roles: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
  },
};
export default modelConfig;
