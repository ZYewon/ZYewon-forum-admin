import _ from "lodash";

export const isEmpty = (value: any) => {
  return typeof value === "undefined" || value === null || value === "";
};

export const sortObj = (arr: any[], prop: string) => {
  return arr.sort((a: any, b: any) => {
    return a[prop] - b[prop];
  });
};
interface TableData {
  method: string;
  title: string;
  path: string;
  type: string;
  remark?: string;
}
interface Tree {
  title?: string;
  children?: Tree[];
  parent?: Tree[] | null;
  current?: Tree | null;
  operations?: TableData[];
  parentNode?: Tree | null;
}
export const deepTree = (
  treeList: Tree[],
  tree: Tree,
  parentNode: Tree | null = null
) => {
  let res: any = {};
  for (let i = 0; i < treeList.length; i++) {
    if (Object.keys(res).length > 0) return res;
    const item = treeList[i];
    item.parentNode = parentNode;
    if (item.title === tree.title) {
      res = {
        parent: treeList,
        current: item,
        parentNode,
      };
      return res;
    } else {
      if (item.children && item.children.length > 0) {
        res = deepTree(item.children, tree, item);
      }
    }
  }
  return res;
};
// 获取选中的节点的根节点
export const getRootNode = (node: Tree) => {
  let copyNode = _.cloneDeepWith(node);
  while (copyNode.parentNode) {
    copyNode = copyNode.parentNode;
  }
  deleteKey([copyNode], "parentNode");
  return copyNode;
};
// 删除循环引用的节点
export const deleteKey = (node: any[], key: string) => {
  for (let i = 0; i < node.length; i++) {
    const item = node[i];
    if (item[key] !== null) {
      delete item[key];
    }
    if (item.children && item.children.length > 0) {
      deleteKey(item.children, key);
    }
  }
  return node;
};
