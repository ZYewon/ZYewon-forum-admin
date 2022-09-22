import { IModelConfig } from "comp/common/PageModel/types";
const batchModelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "select",
      placeholder: "请选择分类",
      field: "catalog",
      fieldType: "string",
      label: "分类",
      options: [
        { field: "index", name: "全部" },
        { field: "ask", name: "提问" },
        { field: "advice", name: "建议" },
        { field: "discuss", name: "交流" },
        { field: "share", name: "分享" },
        { field: "news", name: "动态" },
        { field: "notice", name: "公告" },
      ],
    },
    {
      element: "select",
      placeholder: "请选择标签",
      field: "tags",
      fieldType: "string",
      multiple: true,
      fieldDefault: [],
      label: "标签",
      options: [],
    },
    {
      element: "radio",
      field: "isEnd",
      fieldType: "number",
      fieldDefault: -1,
      label: "是否结帖",
      options: [
        { field: -1, name: "不设置", size: "large" },
        { field: 0, name: "否", size: "large" },
        { field: 1, name: "是", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "status",
      label: "关闭评论",
      fieldType: "string",
      fieldDefault: "-1",
      options: [
        { field: "-1", name: "不设置", size: "large" },
        { field: "0", name: "打开回复", size: "large" },
        { field: "1", name: "关闭回复", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "isTop",
      fieldType: "string",
      fieldDefault: "-1",
      label: "是否置顶",
      options: [
        { field: "-1", name: "不设置", size: "large" },
        { field: "0", name: "否", size: "large" },
        { field: "1", name: "是", size: "large" },
      ],
    },
  ],
  rules: {
    catalog: [{ required: true, message: "请选择分类", trigger: "change" }],
  },
};
export default batchModelConfig;
