import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",

  configList: [
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入标签名",
      field: "name",
      fieldType: "string",
      label: "标签",
    },
    {
      element: "select",
      placeholder: "请选择类名",
      field: "class",
      fieldType: "string",
      label: "分类",
      options: [
        { field: "layui-bg-red", name: "layui-bg-red" },
        { field: "layui-bg-orange", name: "layui-bg-orange" },
        { field: "layui-bg-green", name: "layui-bg-green" },
        { field: "layui-bg-cyan", name: "layui-bg-cyan" },
        { field: "layui-bgblue", name: "layui-bg-blue" },
        { field: "layui-bg-black", name: "layui-bg-black" },
        { field: "layui-bg-gray", name: "layui-bg-gray" },
      ],
    },
  ],
  rules: {
    name: [{ required: true, message: "请输入标签", trigger: "blur" }],
    class: [{ required: true, message: "请选择类名", trigger: "blur" }],
  },
};
export default modelConfig;
