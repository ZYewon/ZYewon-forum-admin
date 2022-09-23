<template>
  <el-row :gutter="20">
    <el-col :lg="7" :md="9" :xs="24">
      <el-card class="box-card mb10">
        <div class="menu-operate mb10">
          <el-form :disabled="!FormConfig.disabled">
            <el-form-item>
              <el-button size="small" v-hasBtn="'menu-add'">
                <el-dropdown :disabled="!FormConfig.disabled">
                  <span class="el-dropdown-link"> 新增 </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        @click="validRecordingNode(addMenu, 'bro')"
                        >兄弟节点</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click="validRecordingNode(addMenu, 'child')"
                        >子节点</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-button>
              <el-button
                size="small"
                @click="validRecordingNode(editMenu)"
                type="primary"
                v-hasBtn="'menu-update'"
                >修改</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="validRecordingNode(deleteMenu)"
                v-hasBtn="'menu-delete'"
                >删除</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
          ref="treeRef"
          :expand-on-click-node="false"
          check-on-click-node
          highlight-current
        />
      </el-card>
    </el-col>
    <el-col :lg="17" :md="15" :xs="24">
      <el-card class="box-card mb10">
        <template #header>
          <div class="flex flex-align-center">
            <el-icon><IconMenu /></el-icon>
            <span class="ml5"> 菜单选项</span>
          </div>
        </template>
        <PageForm
          :form-config="FormConfig"
          :default-value="defaultValue"
          ref="pageForm"
        >
          <template #handler>
            <div v-if="FormConfig.disabled === false">
              <el-button type="primary" @click="menuOperateConfirm"
                >确认</el-button
              >
              <el-button @click="menuOperateCancel">取消</el-button>
            </div>
          </template>
        </PageForm>
      </el-card>
      <el-card class="box-card mb10">
        <template #header>
          <div class="flex flex-align-center">
            <el-icon><component is="Promotion"></component></el-icon>
            <span class="ml5">资源选项</span>
          </div>
        </template>
        <PageSearch :search-config="searchConfig">
          <template #handler>
            <el-button type="primary"> 搜索 </el-button>
            <el-button
              type="primary"
              v-if="!FormConfig.disabled"
              @click="addResource"
            >
              添加
            </el-button>
          </template>
        </PageSearch>
        <PageTable
          :table-config="tableConfig"
          :table-data="tableData"
          @select="select"
          @selectAll="select"
        >
          <template #handler="{ data }">
            <el-button
              type="primary"
              round
              size="small"
              @click="validateEditState(columnEdit, data.row, data.$index)"
            >
              <el-icon> <component is="Edit"></component></el-icon>
            </el-button>
            <el-button
              type="danger"
              round
              size="small"
              @click="validateEditState(columnDelete, data.row, data.$index)"
            >
              <el-icon> <component is="Delete"></component></el-icon>
            </el-button>
          </template>
        </PageTable>
        <PagePagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          v-model:page-size="params.limit"
          v-model:current-page="params.pageNum"
        >
          <template #handler v-if="!FormConfig.disabled">
            <el-button @click="validSelect(batchDelete)">批量删除</el-button>
            <el-button @click="validSelect(batchEdit)">批量设置</el-button>
          </template>
        </PagePagination>
      </el-card>
    </el-col>
  </el-row>
  <PageModel
    :model-config="ModelConfig"
    :title="modelTitle"
    ref="model"
    @close="close"
    :default-value="modelDefault"
  >
    <template #footer>
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="close">取消</el-button>
    </template>
  </PageModel>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from "vue";
import { ElMessage, ElMessageBox, ElTree } from "element-plus";
import _ from "lodash";
import PageForm from "comp/common/PageForm";
import PageSearch from "comp/common/PageSearch";
import PageTable from "comp/common/PageTable";
import PagePagination from "comp/common/PagePagination";
import PageModel from "comp/common/PageModel";
import formConfig from "@/config/pageConfig/menu/formConfig";
import searchConfig from "@/config/pageConfig/menu/searchConfig";
import tableConfig from "@/config/pageConfig/menu/tableConfig";
import modelConfig from "@/config/pageConfig/menu/modelConfig";
import batchModelConfig from "@/config/pageConfig/menu/batchModelConfig";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import {
  addMenu as addMenuAsync,
  getMenu,
  updateMenu,
  deleteMenu as deleteMenuAsync,
} from "api/menu";
import { isEmpty, sortObj, deepTree, deleteKey, getRootNode } from "@/utils";
import type { IModelConfig } from "comp/common/PageModel/types";
// 将 formConfig 转换为响应式
const FormConfig = reactive(formConfig);
// 表单默认值
const defaultValue = ref<any>({});
interface TableData {
  method: string;
  name?: string;
  path: string;
  type: string;
  remark?: string;
  _id?: string;
  title: string;
}
const tableData = ref<TableData[]>([]);
const selectValue = ref<TableData[]>([]);
const ModelConfig = ref<IModelConfig>();
const model = ref<InstanceType<typeof PageModel>>();
const modelTitle = ref("");
const modelDefault = ref<any>({});
const tableCurrent = ref(0);
// 属性节点类型
interface Tree {
  title?: string;
  children?: Tree[];
  parent?: Tree[] | null;
  current?: Tree | null;
  operations?: TableData[];
  parentNode?: Tree | null;
}
// 表格数据
const treeData = ref<Tree[]>([]);
// 树形组件
const treeRef = ref<InstanceType<typeof ElTree>>();
// 自定义 form 组件
const pageForm = ref<InstanceType<typeof PageForm>>();
// 记录新增节点的类型
let actions = "";
// 记录表格的添加或编辑
let tableActions = "";

// 记录选中的菜单项
const recordingNode = ref<any>(null);
// 设置树形组件的渲染 key
const defaultProps = {
  children: "children",
  label: "title",
};
const params = ref<any>({
  pageNum: 1,
  limit: 10,
});
const total = ref(0);
// 获取菜单列表
const _getMenu = async () => {
  const res = await getMenu();
  treeData.value = sortObj(res.data, "sort");
};
onMounted(() => {
  _getMenu();
});

// 校验通过后触发的新增节点函数（不是确认按钮）
const addMenu = (type: string) => {
  FormConfig.disabled = false;
  actions = type;
  pageForm.value?.resetField();
  tableData.value = [];
};
// 校验通过后触发的编辑节点函数（不是确认按钮）
const editMenu = () => {
  FormConfig.disabled = false;
};
// 校验通过后触发的删除节点函数（不是确认按钮）
const deleteMenu = async () => {
  try {
    await ElMessageBox.confirm("确定要删除节点吗？", "警告！", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });
    // 递归找到选择的节点
    const { parent, current, parentNode } = deepTree(
      treeData.value,
      recordingNode.value
    );
    const index = parent.findIndex((item: Tree) => {
      return item.title === current.title;
    });
    parent.splice(index, 1);
    defaultValue.value = {};
    tableData.value = [];
    // 一级节点
    let res = null;
    if (parentNode === null) {
      res = await deleteMenuAsync(current);
    } else {
      // 子节点,获取根节点
      const rootNode = getRootNode(current);
      res = await updateMenu(rootNode);
    }

    if (res.code === 200) {
      ElMessage.success("删除成功");
    } else {
      ElMessage.error(res.msg);
    }
  } catch (e) {
    ElMessage.info("取消了操作");
  }
};
// 校验用户是否选择了菜单的某一项，然后在去调用对应的编辑或删除函数（新增节点时如果当前无节点则直接校验通过）
const validRecordingNode = (func: (args?: any) => void, type?: string) => {
  if (type && treeData.value.length === 0) {
    FormConfig.disabled = false;
    return func(type);
  }
  if (!recordingNode.value) {
    return ElMessage.info("请选择节点后操作");
  }

  func(type);
};
// 点击树形菜单中的某一项时触发，将其点击的那一项缓存起来
const handleNodeClick = (data: Tree) => {
  recordingNode.value = _.cloneDeepWith(data);
  defaultValue.value = recordingNode.value;
  tableData.value =
    data.operations && data.operations.length > 0 ? [...data.operations] : [];
};
// 表单重置回初始状态
const resetForm = () => {
  FormConfig.disabled = true;
  pageForm.value?.resetField();
  recordingNode.value = null;
  defaultValue.value = {};
  actions = "";
  tableData.value = [];
};
// 点击确认按钮时执行的添加兄弟节点
const broHandler = async (data: Tree) => {
  // 如果 treeData 没有数据，那么直接插入数据即可
  data.operations = tableData.value.length > 0 ? tableData.value : [];
  if (treeData.value.length === 0) {
    treeData.value.push({
      ...data,
    });
    await addMenuAsync(data);
    pageForm.value?.resetField();
  } else {
    const res = deepTree(treeData.value, recordingNode.value);
    res.parent?.push({
      ...data,
    });
    res.parent = sortObj(res.parent, "sort");
    // 判断是否是一级节点，是的话就直接添加即可
    if (res.parentNode === null) {
      await addMenuAsync(data);
      ElMessage.success("添加兄弟节点成功");
      resetForm();
    } else {
      // 子节点的兄弟节点
      const rootNode = getRootNode(res.current);
      const result = await updateMenu(rootNode);
      if (result.code === 200) {
        ElMessage.success("添加兄弟节点成功");
        resetForm();
      } else {
        ElMessage.error(result.msg);
      }
    }
  }
};
// 点击确认按钮时执行的添加儿子节点
const childHandler = async (data: Tree) => {
  const res = deepTree(treeData.value, recordingNode.value);
  if (isEmpty(res.current?.children)) {
    res.current.children = [
      { ...data, operations: tableData.value.length ? tableData.value : [] },
    ];
  } else {
    res.current.children?.push({
      ...data,
      operations: tableData.value.length ? tableData.value : [],
    });
    res.current.children = sortObj(res.current.children, "sort");
  }
  const rootNode = getRootNode(res.current);
  // return;
  const result = await updateMenu(rootNode);
  if (result.code === 200) {
    ElMessage.success(result.msg);
    resetForm();
  }
};
// 点击确认按钮时执行的编辑菜单项
const editHandler = async (data: Tree) => {
  data.operations = tableData.value ? _.cloneDeepWith(tableData.value) : [];
  const res = deepTree(treeData.value, recordingNode.value);
  const index = res.parent.findIndex((item: any) => {
    return item.title === res.current.title;
  });
  delete data.children;
  let result = null;
  res.parent[index] = _.cloneDeepWith({ ...recordingNode.value, ...data });
  if (res.parentNode === null) {
    result = await updateMenu(res.parent[index]);
  } else {
    const rootNode = getRootNode(res.current);
    result = await updateMenu(rootNode);
  }
  if (result.code === 200) {
    ElMessage.success(result.msg);
    resetForm();
  }
};
// 操作menu 的确认按钮，会先校验表单，通过后调用上面三个函数中的某一个
const menuOperateConfirm = async () => {
  const valid = await pageForm.value?.validate();
  if (valid) {
    // 获取表单数据
    const data = pageForm.value?.getData();
    // 兄弟节点，如果 treeData
    if (actions === "bro") {
      await broHandler(data);
    } else if (actions === "child") {
      await childHandler(data);
    } else {
      await editHandler(data);
    }
  }
};
// 操作menu 的取消按钮
const menuOperateCancel = () => {
  resetForm();
};

// 模态框关闭
const close = () => {
  model.value?.hide();
  model.value?.resetAll();
  modelDefault.value = {};
  tableActions = "";
};
// 校验表格是否有选中项
const validSelect = (func: () => void) => {
  if (selectValue.value.length === 0) {
    return ElMessage.error("请先选择至少一项后再试");
  }
  func();
};
const batchEdit = () => {
  tableActions = "batchEdit";
  modelTitle.value = "批量设置";
  // 修改 modelConfig
  ModelConfig.value = batchModelConfig;
  model.value?.show();
};
// 批量删除
const batchDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除名字为 ${selectValue.value.length} 个资源吗？ `,
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );

    for (let i = 0; i < selectValue.value.length; i++) {
      tableData.value.splice(tableData.value.indexOf(selectValue.value[i], 1));
    }
    ElMessage.success("删除成功");
  } catch (e) {
    ElMessage.info("取消了操作");
  }
};
// 表格添加资源选项
const addResource = () => {
  tableActions = "add";
  modelTitle.value = "添加资源信息";
  ModelConfig.value = modelConfig;
  model.value?.show();
};
// 获取选中的表格节点
const select = (e: TableData[]) => {
  selectValue.value = e;
};
// 模态框确认按钮
const confirm = async () => {
  const valid = await model.value?.validate();
  if (!valid) return;
  const data = model.value?.getData();
  if (tableActions === "add") {
    tableData.value.push({ ...data });
    // 将其添加到对应的菜单项中的 operations 中
  } else if (tableActions === "edit") {
    // 将其重新覆盖
    tableData.value[tableCurrent.value] = { ...data };
  } else if (tableActions === "batchEdit") {
    console.log(selectValue);
    selectValue.value.forEach((item) => {
      item.method = data.method ? data.method : item.method;
      item.type = data.type ? data.type : item.type;
    });
  }

  close();
};
// 编辑或删除表单数据前，需校验是否进入了编辑模式
const validateEditState = (func: any, row: any, index?: number) => {
  if (FormConfig.disabled) {
    // 没有进入编辑状态，给用户提示不能编辑
    return ElMessage.info("请先进入编辑模式后在操作");
  }
  func(row, index);
};
// 编辑
const columnEdit = (row: any, index: number) => {
  tableActions = "edit";
  tableCurrent.value = index;
  // 设置模态框默认值
  ModelConfig.value = modelConfig;
  model.value?.show();
  nextTick(() => {
    modelDefault.value = row;
  });
};
// 删除
const columnDelete = async (row: any, index: number) => {
  tableCurrent.value = index;
  try {
    await ElMessageBox.confirm(
      `确定要删除名字为 ${tableData.value[index].name} 的资源吗？ `,
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    tableData.value.splice(tableCurrent.value, 1);
    ElMessage.success("删除成功");
  } catch (e) {
    ElMessage.info("取消了操作");
  }
};
</script>

<style scoped lang="scss">
.popover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  li {
    width: 100%;
    text-align: center;
    padding: 5px;
    cursor: pointer;
    transition: all 0.4s;
    border-radius: 10px;
    &:hover {
      background-color: #f1f2f3;
    }
  }
}
</style>
