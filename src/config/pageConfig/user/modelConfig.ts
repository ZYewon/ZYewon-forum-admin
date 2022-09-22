import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "120px",
  configList: [
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入用户昵称",
      field: "nickname",
      label: "用户昵称",
    },
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入登录名",
      field: "username",
      label: "登录名(邮箱)",
    },
    {
      element: "input",
      inputType: "password",
      placeholder: "请输入密码",
      field: "password",
      label: "密码",
    },

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
    {
      element: "input",
      field: "favs",
      fieldDefault: 0,
      label: "积分",
      placeholder: "请输入积分",
      width: "150px",
    },
  ],
  rules: {
    nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
    username: [
      { required: true, message: "请输入登录名", trigger: "blur" },
      {
        pattern:
          /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        message: "邮箱格式不正确",
      },
    ],
    favs: [{ pattern: /^([1-9]\d*)$/, message: "请输入正确的数值" }],
    roles: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
  },
};
export default modelConfig;
