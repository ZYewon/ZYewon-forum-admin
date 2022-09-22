<template>
  <el-row :gutter="10">
    <el-col :span="5">
      <el-card class="box-card mb10">
        <template #header>
          <div class="flex flex-align-center flex-space-between">
            <div class="flex flex-align-center">
              <el-icon><component is="Avatar"></component></el-icon>
              <span class="ml5">角色列表</span>
            </div>
            <span
              class="flex flex-align-center"
              type="primary"
              @click="addRole"
              v-hasBtn="'role-add'"
            >
              <el-icon style="margin-right: 3px">
                <component is="Plus"></component>
              </el-icon>
              新增
            </span>
          </div>
        </template>
        <ul class="role-list">
          <li
            class="role-item"
            v-for="(item, index) in roleData"
            :key="'role' + index"
          >
            <span
              :class="{ active: index === curRoleIndex }"
              @click="selectRole(item, index)"
              >{{ item.roleName }}</span
            >
            <ul>
              <li @click="editRole(item, index)" v-hasBtn="'role-update'">
                <el-icon color="#515a6e"
                  ><component is="Edit"></component
                ></el-icon>
              </li>
              <li @click="editMenu(item, index)" v-hasBtn="'role-menu-set'">
                <el-icon color="#2d90f2"
                  ><component is="Setting"></component
                ></el-icon>
              </li>
              <li @click="deleteRole(item, index)" v-hasBtn="'role-delete'">
                <el-icon color="#ed4014"
                  ><component is="DeleteFilled"></component
                ></el-icon>
              </li>
            </ul>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card mb10">
        <template #header>
          <div class="flex flex-align-center flex-space-between">
            <div class="flex flex-align-center">
              <el-icon><component is="Menu"></component></el-icon>
              <span class="ml5">菜单权限</span>
            </div>

            <el-button-group size="small" v-if="isMenuEdit">
              <el-button type="primary" @click="menuConfirm">
                <el-icon class="mr5"
                  ><component is="Finished"></component
                ></el-icon>
                确认
              </el-button>
              <el-button @click="menuCancel">
                <el-icon class="mr5"
                  ><component is="Delete"></component
                ></el-icon>
                取消
              </el-button>
            </el-button-group>
          </div>
        </template>
        <el-tree
          ref="treeRef"
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="_id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node="false"
          @nodeClick="handleNodeClick"
          @check="handleCheck"
        />
      </el-card>
    </el-col>
    <el-col :span="13">
      <el-card class="box-card mb10">
        <template #header>
          <div class="flex flex-align-center">
            <el-icon><component is="Promotion"></component></el-icon>
            <span class="ml5">资源选项</span>
          </div>
        </template>
        <PageTable
          :table-config="tableConfig"
          :table-data="tableData"
          @select="selectionChange"
          @selectAll="selectionChange"
          ref="table"
        ></PageTable>
      </el-card>
    </el-col>
  </el-row>
  <PageModel
    title="添加角色"
    :model-config="modelConfig"
    :default-value="defaultValue"
    ref="model"
    @close="modelClose"
  >
    <template #footer>
      <el-button @click="modelConfirm" type="primary">确认</el-button>
      <el-button @click="modelClose">取消</el-button>
    </template>
  </PageModel>
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import _ from "lodash";
import { ElTree, ElMessageBox, ElMessage } from "element-plus";
import PageTable from "comp/common/PageTable";
import PageModel from "comp/common/PageModel";
import tableConfig from "@/config/pageConfig/roles/tableConfig";
import modelConfig from "@/config/pageConfig/roles/modelConfig";
import { getMenu } from "api/menu";
import {
  getRole,
  addRole as addRoleAsync,
  deleteRole as deleteRoleAsync,
  updateRole,
} from "api/role";
import type { TableData } from "./MenuManage.vue";
interface Tree {
  _id: string;
  title: string;
  children?: Tree[];
  operations?: TableData[];
}
interface Role {
  roleName?: string;
  remark?: string;
  roleEncoding?: string;
  menu?: string[];
}
const defaultProps = {
  children: "children",
  label: "title",
};
let actions = "";
const isMenuEdit = ref(false);
const roleData = ref<any[]>([]);
const table = ref<InstanceType<typeof PageTable>>();
const curRoleIndex = ref<any>(null);
const selectedRole = ref<Role>();
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<Tree[]>([]);
const model = ref<InstanceType<typeof PageModel>>();
const defaultValue = ref<Role>({});
const tableData = ref<TableData[]>();
const selectedMenuNode = ref<Tree | null>(null);
const selectedMenuKey = ref<string[]>([]);
const selectedTableRow = new Set(); // 记录用户选中的表格项
const _getMenu = async () => {
  const res = await getMenu();
  treeData.value = res.data;
};
const _getRole = async () => {
  const res = await getRole();
  roleData.value = res.data;
};
onMounted(() => {
  _getRole();
  _getMenu();
});
// 选择某个菜单节点
const handleNodeClick = (data: Tree) => {
  selectedMenuNode.value = data;
  tableData.value = data.operations;
  // 设置节点的选中状态
  if (!selectedRole.value) return;
  nextTick(() => {
    roleData.value[curRoleIndex.value as number].menu.forEach(
      (item: string) => {
        tableData.value?.forEach((row) => {
          if (row._id === item) {
            table.value.toggleRowSelection(row, true);
          }
        });
      }
    );
  });
};

// 菜单的确认按钮
const menuConfirm = async () => {
  // 获取当前所有选中的 ID
  const selectedKey = treeRef.value?.getCheckedKeys();
  selectedKey?.forEach((item) => {
    selectedTableRow.add(item);
  });
  const resultSelectKey = [...selectedTableRow]; // 将集合转换为数组;
  // 然后前端更新界面
  roleData.value[curRoleIndex.value].menu = resultSelectKey;
  // 然后发送请求更新数据库
  const result = await updateRole(roleData.value[curRoleIndex.value]);
  if (result.code === 200) {
    ElMessage.success(result.msg);
  }
  // 退出编辑模式
  isMenuEdit.value = false;
};
// 菜单的取消按钮
const menuCancel = () => {
  isMenuEdit.value = false;
};
// 获取选中的菜单节点和资源节点
const getMenuKey = (item: Role, index: number) => {
  selectedTableRow.clear();
  roleData.value[index].menu.forEach((item: string) => {
    selectedTableRow.add(item);
  });
  if (item.menu) {
    treeRef.value?.setCheckedKeys(item.menu, false);
  } else {
    treeRef.value?.setCheckedKeys([], false);
  }
  selectedMenuKey.value = (treeRef.value?.getCheckedKeys() as string[]) || [];
  selectedMenuKey.value = selectedMenuKey.value.concat(
    (treeRef.value?.getHalfCheckedKeys() as string[]) || []
  );
};
// 复选框选中某个菜单节点
const handleCheck = (data: any, tree: any) => {
  if (!isMenuEdit.value) {
    // 代表当前节点是选中状态
    if (selectedMenuKey.value.includes(data._id)) {
      treeRef.value?.setChecked(data, true, true);
    } else {
      treeRef.value?.setChecked(data, false, true);
    }
    return ElMessage.info("请进入编辑状态后再操作");
  }
};
// 选择某个角色
const selectRole = (item: Role, index: number) => {
  selectedRole.value = item;
  curRoleIndex.value = index;
  tableData.value = [];
  getMenuKey(item, index);
};

// 新增角色
const addRole = () => {
  actions = "add";
  model.value.show();
};
// 编辑角色
const editRole = (item: Role, index: number) => {
  actions = "edit";
  defaultValue.value = { ...item };
  selectedRole.value = item;
  curRoleIndex.value = index;
  model.value.show();
};
// 删除角色
const deleteRole = async (item: Role, index: number) => {
  curRoleIndex.value = index;
  selectedRole.value = item;
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${item.roleName} 这个角色吗？`,
      "警告",
      {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      }
    );
    const res = await deleteRoleAsync(roleData.value[index]);
    if (res.code === 200) {
      roleData.value.splice(index, 1);
      ElMessage.success("删除角色成功");
    }
  } catch (e) {
    ElMessage.info("取消删除");
    curRoleIndex.value = null;
    selectedRole.value = {};
  }
};
// 编辑菜单
const editMenu = (item: Role, index: number) => {
  selectedRole.value = item;
  curRoleIndex.value = index;
  getMenuKey(item, index);
  isMenuEdit.value = true; // 进入编辑模式，进入编辑模式后即可给角色设置权限
};
// 模态框确认按钮
const modelConfirm = async () => {
  const valid = await model.value.validate();
  if (!valid) return;
  let res = null;
  const data = model.value.getData();
  if (actions === "add") {
    roleData.value.push({ ...data });
    res = await addRoleAsync(data);
  } else if (actions === "edit") {
    roleData.value.splice(curRoleIndex.value, 1, { ...data });
    const params = {
      ...data,
      _id: roleData.value[curRoleIndex.value]._id,
    };
    res = await updateRole(params);
  }
  if (res.code === 200) {
    ElMessage.success(res.msg);
    modelClose();
  }
};
const modelClose = () => {
  model.value.resetField();
  model.value.hide();
  curRoleIndex.value = null;
};

const selectionChange = (data: any[]) => {
  if (!isMenuEdit.value) {
    return ElMessage.info("请进入编辑状态后再操作");
  }
  const selectRow = table.value.getSelectionRows();
  // 克隆一份表格数据
  const newTableData = _.cloneDeep(tableData.value);
  selectRow.map((item: any) => {
    selectedTableRow.add(item._id); // 先把所有选中的表格节点 ID 添加到集合中
    // 在将所有选中的节点从新表格数据中删除，得到所有未选中的节点
    const index = newTableData?.findIndex((t) => item._id === t._id) as number;
    if (index !== -1) {
      newTableData?.splice(index, 1);
    }
  });

  // 再把未选中的节点的ID从集合中删除
  newTableData?.forEach((item) => {
    if (selectedTableRow.has(item._id)) {
      selectedTableRow.delete(item._id);
    }
  });
};
</script>

<style lang="scss">
span[type="primary"] {
  color: #3490f1;
  font-size: 14px;
  cursor: pointer;
}
.role-list {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .role-item {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    transition: all 0.3s;
    &:hover {
      background-color: #eaf4fe;
      ul {
        visibility: initial;
      }
    }
    span {
      cursor: pointer;
      color: #515a6e;
      padding: 3px;
      &.active {
        background-color: #d5e8fc;
      }
    }
    ul {
      display: flex;
      align-items: center;
      gap: 3px;
      visibility: hidden;
      font-size: 14px;

      li {
        cursor: pointer;
      }
    }
  }
}
</style>
