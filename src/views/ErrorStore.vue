<template>
  <div class="main-container">
    <PageSearch :search-config="searchConfig" ref="searchForm">
      <template #handler>
        <el-button type="primary" @click="search">搜索</el-button>
      </template>
    </PageSearch>
    <PageTable
      :table-config="tableConfig"
      :table-data="errorList"
      @select="select"
      @selectAll="select"
    >
      <template #default="{ props }">
        <div class="err-detail">
          <div class="error-message">
            <em>错误信息：</em>
            <span>{{ props.row.message }}</span>
          </div>
          <div class="path">
            <em>请求路径：</em>
            <span>{{ props.row.path }}</span>
          </div>
          <div class="params">
            <em>请求参数：</em>
            <span>{{ formatParams(props.row.param) }}</span>
            <div v-if="props.row.param" class="mt20">
              <el-button @click="showJsonParam(props.row.param)" type="primary"
                >查看JSON格式</el-button
              >
            </div>
          </div>
        </div>
      </template>
    </PageTable>
    <PagePagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-model:page-size="params.limit"
      v-model:current-page="params.pageNum"
      background
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    >
      <template #handler>
        <el-button type="danger" @click="batchDeleteErr">批量删除</el-button>
        <el-button type="primary">导出表格</el-button>
      </template>
    </PagePagination>
  </div>
  <PageModel
    :model-config="modelConfig"
    :default-value="defaultValue"
    ref="model"
    title="查看JSON格式数据"
  ></PageModel>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import PageSearch from "comp/common/PageSearch";
import PageTable from "comp/common/PageTable";
import PagePagination from "comp/common/PagePagination";
import PageModel from "comp/common/PageModel";
import searchConfig from "@/config/pageConfig/errorStore/searchConfig";
import tableConfig from "@/config/pageConfig/errorStore/tableConfig";
import modelConfig from "@/config/pageConfig/errorStore/modelConfig";
import dayjs from "dayjs";
import { getError, deleteError, addError } from "api/errorStore";
const searchForm = ref<InstanceType<typeof PageSearch>>();
const errorList = ref<any[]>([]);
const total = ref<number>(0);
const params = reactive({
  limit: 10,
  pageNum: 1,
});
const selectTableRow = ref<any[]>([]);
const model = ref<InstanceType<typeof PageModel>>();
const defaultValue = ref<any>({});
const formatParams = (data: any) => {
  if (typeof data === "object" && data !== null) {
    return qs.stringify(data);
  } else {
    return data;
  }
};
const getErrorAsync = async (data?: any) => {
  const res = await getError({ ...data, ...params });
  if (res.code === 200) {
    ElMessage.success(res.msg);
    errorList.value = res.data;
    total.value = res.total;
  }
};
onMounted(() => {
  getErrorAsync();
});
// 搜索
const search = async () => {
  const valid = await searchForm.value.validate();
  if (valid) {
    const data: any = searchForm.value.getData();
    const params: any = {};
    if (data.field) {
      params[data.selectValue] = data.field;
    } else if (data.date) {
      params[data.selectValue] = dayjs(data.date).format("YYYY-MM-DD HH:mm:ss");
    } else if (data.method) {
      params[data.selectValue] = data.method;
    }
    await getErrorAsync(params);
  }
};
// 翻页
const handleSizeChange = (e: number) => {
  params.limit = e;
  getErrorAsync();
};
const handleCurrentChange = (e: number) => {
  params.pageNum = e;
  getErrorAsync();
};
const select = (e: any[]) => {
  selectTableRow.value = e;
};
// 批量删除
const batchDeleteErr = async () => {
  if (selectTableRow.value.length === 0) {
    return ElMessage.info("请选择至少一项后再继续操作");
  }
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${selectTableRow.value.length} 项错误信息吗？`,
      "警告!",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    const ids = selectTableRow.value.map((item) => item._id);
    const res = await deleteError(ids);
    if (res.code === 200) {
      ElMessage.success(res.msg);
      await getErrorAsync();
    }
  } catch (e) {
    ElMessage.info("取消了操作");
  }
};

const showJsonParam = (param: any) => {
  defaultValue.value = {
    param: JSON.stringify(param, null, 2),
  };
  model.value.show();
};
</script>

<style scoped lang="scss">
.err-detail {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 15px;
  em {
    font-weight: 600;
  }
}
.mt20 {
  margin-top: 20px;
}
</style>
