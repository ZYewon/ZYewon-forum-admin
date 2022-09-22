interface filters {
  text: String;
  value: any;
}
export interface ITableConfigList {
  prop: string;
  label: string;
  formatter?: (...args: any[]) => any;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  slotName?: string;
  filters?: filters[];
  filterMultiple?: boolean;
  filterMethod?: any;
}

interface ICustomColum {
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  label: string;
  slotName: string;
}
interface IHeadColumn {
  type: "selection" | "index" | "expand";
  index?: (index: any) => any | number;
  width?: number | string;
  minWidth?: number | string;
  label?: string;
  align?: "left" | "center" | "right";
}
export interface ITableConfig {
  configList: ITableConfigList[];
  border?: boolean;
  rowKey?: (row: any) => any | string;
  emptyText?: string;
  customColumn?: ICustomColum[];
  headColumn?: IHeadColumn[];
}
