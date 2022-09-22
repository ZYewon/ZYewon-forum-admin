import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "100px",
  configList: [
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入角色名称",
      field: "roleName",
      label: "角色昵称",
    },
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入角色编码",
      field: "roleEncoding",
      label: "角色编码",
    },
    {
      element: "input",
      placeholder: "请输入角色描述",
      field: "remark",
      label: "角色描述",
    },
  ],
  rules: {
    roleName: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
    roleEncoding: [
      { required: true, message: "请输入用户编码", trigger: "blur" },
    ],
  },
};
export default modelConfig;
