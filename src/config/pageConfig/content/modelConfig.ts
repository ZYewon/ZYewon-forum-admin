import { IModelConfig } from "comp/common/PageModel/types";
const modelConfig: IModelConfig = {
  dialogWidth: "30%",
  labelWidth: "80px",
  configList: [
    {
      element: "input",
      inputType: "text",
      placeholder: "请输入标题",
      field: "title",
      fieldType: "string",
      label: "标题",
    },
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
      element: "radio",
      field: "isEnd",
      fieldType: "number",
      fieldDefault: 0,
      label: "是否结帖",
      options: [
        { field: 0, name: "未结帖", size: "large" },
        { field: 1, name: "已结帖", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "status",
      fieldType: "string",
      label: "回复状态",
      options: [
        { field: "0", name: "打开回复", size: "large" },
        { field: "1", name: "关闭回复", size: "large" },
      ],
    },
    {
      element: "radio",
      field: "isTop",
      fieldType: "string",
      label: "是否置顶",
      options: [
        { field: "0", name: "未置顶", size: "large" },
        { field: "1", name: "已置顶", size: "large" },
      ],
    },
    {
      element: "slider",
      field: "favs",
      fieldType: "number",
      fieldDefault: 0,
      label: "帖子积分",
      step: 10,
      size: "small",
      showInput: true,
    },
    {
      element: "select",
      placeholder: "请选择标签",
      field: "tag",
      fieldType: "string",
      label: "标签",
      options: [
        {
          field: "hot",
          name: "热门",
        },
        {
          field: "prime",
          name: "精华",
        },
      ],
    },
  ],
  rules: {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  },
};
export default modelConfig;
