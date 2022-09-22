import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "input",
      inputType: "textarea",
      field: "param",
      label: "请求参数",
      // disabled: true,
      rows: 16,
    },
  ],
};
export default modelConfig;
