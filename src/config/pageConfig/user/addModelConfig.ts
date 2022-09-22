import { IModelConfig } from "comp/common/PageModel/types";

const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "120px",
  configList: [
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
      element: "input",
      inputType: "text",
      placeholder: "请输入用户昵称",
      field: "nickname",
      label: "用户昵称",
    },
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入手机号",
      field: "mobile",
      label: "手机号",
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
      element: "input",
      field: "favs",
      fieldDefault: 100,
      label: "积分",
      placeholder: "请输入积分",
      width: "150px",
    },
    {
      element: "input",
      field: "location",
      label: "所在城市",
      placeholder: "请输入用户所在城市",
    },
    {
      element: "radio",
      field: "gender",
      fieldDefault: "0",
      label: "性别",
      options: [
        { field: "0", name: "男", size: "large" },
        { field: "1", name: "女", size: "large" },
      ],
    },
    {
      element: "input",
      inputType: "textarea",
      field: "remark",
      label: "个性签名",
      placeholder: "请输入个性签名",
    },
  ],
  rules: {
    nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      {
        min: 6,
        max: 12,
        message: "密码长度为 6 - 12 位",
      },
    ],
    username: [
      { required: true, message: "请输入登录名", trigger: "blur" },
      {
        pattern:
          /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        message: "邮箱格式不正确",
      },
    ],
    favs: [{ pattern: /^([1-9]\d*)$/, message: "请输入正确的数值" }],
    mobile: [
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "请输入正确的手机号",
      },
    ],
    roles: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
  },
};
export default modelConfig;
