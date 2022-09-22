import { Component } from "vue";
export interface IConfigListOptions {
  field?: string | number;
  name?: string;
  size?: string;
}
//  注意 default 的值必须要和配置表中的字段一样
export interface IConfigList {
  element: string;
  inputType?: string;
  placeholder?: string;
  field: string;
  fieldType?: string;
  fieldDefault?: any;
  label: string;
  options?: IConfigListOptions[];
  step?: number;
  size?: string;
  showInput?: boolean;
  multiple?: true;
  width?: string;
  prefixIcon?: Component;
  prepend?: string;
  append?: string;
  disabled?: boolean;
  rows?: number;
}
export interface rulesConfig {
  required?: boolean;
  max?: number;
  min?: number;
  pattern?: any;
  message: string;
  trigger?: string;
}
export interface IModelConfig {
  dialogWidth?: string | number;
  labelWidth?: number | string;
  configList: IConfigList[];
  disabled?: boolean;
  rules?: {
    [propName: string]: rulesConfig[];
  };
}
