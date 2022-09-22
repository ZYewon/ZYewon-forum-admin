import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "radio",
      field: "commentStatus",
      fieldType: "string",
      fieldDefault: "-1",
      label: "是否显示",
      options: [
        { field: "-1", name: "不设置", size: "large" },
        { field: "0", name: "否", size: "large" },
        { field: "1", name: "是", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "userStatus",
      fieldType: "string",
      fieldDefault: "-1",
      label: "用户禁言",
      options: [
        { field: "-1", name: "不设置", size: "large" },
        { field: "0", name: "否", size: "large" },
        { field: "1", name: "是", size: "large" },
      ],
    },
  ],
};
export default modelConfig;
