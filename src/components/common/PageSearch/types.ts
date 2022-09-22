interface rulesConfig {
  required?: boolean;
  max?: number;
  min?: number;
  pattern?: any;
  message: string;
  trigger?: string;
}
interface rules {
  [propName: string]: rulesConfig[];
}
interface IConfigListOptions {
  label?: string;
  title?: string;
}
export interface IConfigList {
  element?: string;
  label?: string;
  prop?: string;
  show?: string;
  placeholder?: string;
  listOptions?: IConfigListOptions[];
  required?: boolean;
  size?: "large" | "default" | "small";
  labelWidth?: number | string;
  field: string;
  fieldDetault?: any;
  multiple?: boolean;
}
interface options {
  label?: string;
  value?: string | number;
}
interface ICustomFormItem {
  slotName: string;
  labelWidth?: number | string;
  label?: string;
  prop?: string;
}
export interface ISearchConfig {
  inline?: boolean;
  rules?: rules;
  labelWidth?: number | string;
  // 右边的动态显示的内容
  configList: IConfigList[];
  // 左边的选择框配置项
  selectOptions: {
    placeholder?: string;
    field: string;
    prop?: string;
    options: options[];
  };
  // 自定义插槽
  customFormItem?: ICustomFormItem[];
}
