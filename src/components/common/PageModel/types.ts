interface IConfigListOptions {
  field: string | number;
  name: string;
  size?: string;
}
export interface IConfigList {
  element: string;
  inputType?: string;
  placeholder?: string;
  field: string;
  fieldType: string;
  fieldDefault?: any;
  label: string;
  options?: IConfigListOptions[];
  step?: number;
  size?: string;
  showInput?: boolean;
}
export interface IModelConfig {
  dialogWidth?: string | number;
  labelWidth?: number | string;
  configList: IConfigList[];
  rules?: any;
}
