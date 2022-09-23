<template>
  <div class="main-container">
    <PageSearch :search-config="searchConfig" ref="searchForm">
      <template #handler>
        <el-button type="primary" :icon="Search" @click="onSearch">
          搜索
        </el-button>
        <el-button
          type="primary"
          :icon="User"
          @click="addUser"
          v-hasBtn="'user-add'"
          >新增用户</el-button
        >
      </template>
    </PageSearch>
    <PageTable
      :table-config="tableConfig"
      :table-data="tableData"
      @select="select"
      @selectAll="select"
    >
      <template #roles="{ data }">
        {{ formatRole(data.row.roles) }}
      </template>
      <template #status="{ data }">
        <el-button :type="formatStatus(data.row.status).type" plain>{{
          formatStatus(data.row.status).name
        }}</el-button>
      </template>
      <template #isVip="{ data }">
        <el-button v-if="+data.row.isVip === 0" type="info" plain>
          否
        </el-button>
        <el-button v-else color="#dd001b" plain>
          VIP{{ data.row.isVip }}
        </el-button>
      </template>
      <template #handler="{ data }">
        <el-button
          :icon="Edit"
          round
          type="primary"
          @click="editUser(data.row)"
          v-hasBtn="'user-operate'"
        ></el-button>
        <el-button
          :icon="Delete"
          round
          type="danger"
          @click="deleteUser(data.row)"
          v-hasBtn="'user-operate'"
        ></el-button>
      </template>
    </PageTable>
    <PagePagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-model:page-size="params.limit"
      v-model:current-page="params.pageNum"
      :background="true"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    >
      <template #handler>
        <el-button
          @click="validSelectValueFunc(batchDeleteBtn)"
          v-hasBtn="'user-operate'"
          >批量删除</el-button
        >
        <el-button
          @click="validSelectValueFunc(batchEditBtn)"
          v-hasBtn="'user-operate'"
          >批量设置</el-button
        >
        <el-button type="primary">导出表格</el-button>
      </template>
    </PagePagination>
    <PageModel
      :model-config="configModel"
      :default-value="defaultValue"
      ref="editModel"
      :title="modelTitle"
      @close="close"
    >
      <template #footer>
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="close">取消</el-button>
      </template>
    </PageModel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { User, Search, Edit, Delete } from "@element-plus/icons-vue";
import PageSearch from "comp/common/PageSearch";
import PageTable from "comp/common/PageTable";
import PagePagination from "comp/common/PagePagination";
import PageModel from "comp/common/PageModel";
import searchConfig from "@/config/pageConfig/user/searchConfig";
import tableConfig from "@/config/pageConfig/user/tableConfig";
import modelConfig from "@/config/pageConfig/user/modelConfig";
import batchModelConfig from "@/config/pageConfig/user/batchModelConfig";
import addModelConfig from "@/config/pageConfig/user/addModelConfig";
import { IModelConfig } from "comp/common/PageModel/types";
import { getUsers, userOperate, deleteUser as deleteUserAsync } from "api/user";
import type { IUsersParams, IUserOperate } from "api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";
import { getRoleNames } from "api/role";
const nModelConfig = ref<any>(modelConfig);
const aModelConfig = ref<any>(addModelConfig);
const bModelConfig = ref<any>(batchModelConfig);
// 分页参数
const params = ref<IUsersParams>({
  limit: 10,
  pageNum: 1,
});
const total = ref<number>(0);
// 请求参数
const tableData = ref<any[]>([]);
const roleNames = ref<any[]>();

const getUsersAsync = async (data?: any) => {
  const res = await getUsers({ ...data, ...params.value });
  if (res.code === 200) {
    tableData.value = res.data;
    total.value = res.total;
  }
};
const getRoleNamesAsync = async () => {
  const res = await getRoleNames();
  if (res.code === 200) {
    roleNames.value = res.data;
    const role1: any = nModelConfig.value.configList.find(
      (item: any) => item.field === "roles"
    );

    role1.options = res.data.map((item: any) => {
      return {
        field: item.roleEncoding,
        name: item.roleName,
      };
    });
    const role2: any = aModelConfig.value.configList.find(
      (item: any) => item.field === "roles"
    );
    role2.options = res.data.map((item: any) => ({
      field: item.roleEncoding,
      name: item.roleName,
    }));
    const role3: any = bModelConfig.value.configList.find(
      (item: any) => item.field === "roles"
    );
    role3.options = res.data.map((item: any) => ({
      field: item.roleEncoding,
      name: item.roleName,
    }));
  }
};
onMounted(() => {
  getUsersAsync();
  getRoleNamesAsync();
});
// 格式化 status 视图显示的内容
const formatStatus: any = (status: string) => {
  return {
    "0": {
      name: "否",
      type: "success",
    },
    "1": {
      name: "禁言",
      type: "warning",
    },
    "2": {
      name: "封禁",
      type: "danger",
    },
  }[status];
};
const formatRole = (rolesArr: any[]) => {
  return rolesArr.join(", ");
};
let actions = "";
// 搜索部分 + 新建用户
const searchForm = ref<InstanceType<typeof PageSearch>>();
const onSearch = async () => {
  const res = await searchForm.value?.validate();
  if (!res) return;
  const params: any = {};
  const data = searchForm.value?.getData();
  const field = data.selectValue;
  if (data.field) {
    params[field] = data.field;
  } else if (data.date) {
    params[field] = dayjs(data.date).format("YYYY-MM-DD");
  } else if (data.roles && data.roles.length > 0) {
    params[field] = data.roles;
  } else if (data.radio !== "-1") {
    params[field] = data.radio;
  }
  await getUsersAsync(params);
};
const addUser = () => {
  actions = "add";
  configModel.value = aModelConfig.value;
  editModel.value?.show();
  modelTitle.value = "新增用户";
  open();
};
// 编辑、删除部分
interface IDefaultValue {
  nickname?: string;
  username?: string;
  roles?: string[];
  status?: string;
  isVip?: string;
  favs?: number;
}

const editModel = ref<InstanceType<typeof PageModel>>();
const configModel = ref<IModelConfig>();
const modelTitle = ref<string>();
const defaultValue = ref<IDefaultValue>();
const selectValue = ref<any[]>([]);
const select = (e: any[]) => {
  selectValue.value = e;
};

const editUser = (row: any) => {
  actions = "edit";
  configModel.value = nModelConfig.value;
  modelTitle.value = "编辑用户";
  defaultValue.value = {
    ...row,
    isVip: +row.isVip >= 1 ? "1" : "0",
    status: +row.status >= 1 ? "1" : "0",
  };
  open();
};
const deleteUser = (row: any) => {
  const id = row._id;
  ElMessageBox.confirm(`确定要删除 "${row.nickname}" 用户?`, "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      console.log(id);
      const res = await deleteUserAsync({ id });
      if (res.code === 200) {
        ElMessage.success(res.msg);
        await getUsersAsync();
      }
    })
    .catch(() => {
      ElMessage.info("取消了操作");
    });
};
const validSelectValueFunc = (func: (data?: any) => void) => {
  if (selectValue.value.length === 0) {
    return ElMessage.error("请选择至少一项后在操作");
  }
  return func(selectValue.value);
};
const batchEditBtn = () => {
  actions = "batchEdit";
  modelTitle.value = "批量编辑用户";
  configModel.value = bModelConfig.value;
  open();
};
const batchDeleteBtn = () => {
  const names = selectValue.value.map((item) => item.nickname);
  ElMessageBox.confirm(`确定要删除 "${names.join(", ")}" 用户?`, "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectValue.value.map((item) => item._id);
      const res = await deleteUserAsync({ ids });
      if (res.code === 200) {
        ElMessage.success(res.msg);
        await getUsersAsync();
      }
    })
    .catch(() => {
      ElMessage.info("取消了操作");
    });
};

// 模态框部分
const handleAdd = async (data: IUserOperate) => {
  const res = await userOperate({ ...data, type: actions });
  if (res.code === 200) {
    await getUsersAsync();
    ElMessage.success(res.msg);
  }
};
const handleEdit = async (data: any) => {
  // debugger;
  const res = await userOperate({ ...data, type: actions });
  if (res.code === 200) {
    await getUsersAsync();
    ElMessage.success(res.msg);
  }
};
const handleBatchEdit = async (data: any) => {
  const ids = selectValue.value.map((item) => item._id);
  const res = await userOperate({ type: actions, ...data, ids: ids });
  if (res.code === 200) {
    ElMessage.success(res.msg);
    await getUsersAsync();
  }
};
// 打开模态框
const open = (data?: any) => {
  editModel.value?.resetField();
  editModel.value?.show();
};
// 关闭模态框，包含取消按钮
const close = () => {
  editModel.value?.hide();
  editModel.value?.resetField();
  actions = "";
  editModel.value?.resetAll();
};
// 确认按钮
const confirm = async () => {
  const valid = await editModel.value?.validate();
  console.log(valid);
  if (valid) {
    const data = editModel.value?.getData();
    // debugger;
    const handler: any = {
      add: handleAdd,
      edit: handleEdit,
      batchEdit: handleBatchEdit,
    };
    await handler[actions](data);
    actions = "";
    close();
  }
};
// 翻页部分
const handleCurrentChange = async (e: any) => {
  params.value.pageNum = e;
  await getUsersAsync();
};
const handleSizeChange = async (e: any) => {
  params.value.limit = e;
  await getUsersAsync();
};
</script>

<style scoped></style>
