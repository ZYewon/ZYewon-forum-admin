<template>
  <div class="main-container">
    <PageSearch :search-config="searchConfig" ref="searchRef">
      <template #handler>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </template>
    </PageSearch>
    <PageTable
      :table-config="tableConfig"
      :table-data="tableData"
      @select="select"
      @selectAll="selectAll"
    >
      <template #status="{ data }">
        <el-button
          :type="+data.row.status === 0 ? 'success' : 'danger'"
          size="small"
        >
          {{ +data.row.status === 0 ? "on" : "off" }}
        </el-button>
      </template>
      <template #operate="{ data }">
        <el-button
          size="small"
          type="primary"
          @click="handleEdit(data.row)"
          v-hasBtn="'content-update'"
        >
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDetete(data.row, data.$index)"
          v-hasBtn="'content-delete'"
          >删除</el-button
        >
      </template>
    </PageTable>
    <PagePagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-model:page-size="params.limit"
      v-model:current-page="params.page"
      :page-sizes="[20, 40, 60, 80]"
      :background="true"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    >
      <template #handler>
        <el-button
          type="danger"
          @click="batchDelete"
          v-hasBtn="'batch-content-delete'"
          >批量删除</el-button
        >
        <el-button
          type="primary"
          @click="batchEdit"
          v-hasBtn="'batch-content-update'"
          >批量设置</el-button
        >
        <el-button type="primary" :icon="Upload">导出表格</el-button>
      </template>
    </PagePagination>
    <!--单列的编辑模态框-->
    <PageModel
      ref="model"
      title="编辑文章属性"
      :default-value="defaultValue"
      :modelConfig="modelConfig"
      @close="() => closeModel(model)"
    >
      <template #footer>
        <el-button type="primary" @click="() => confirmBtn(model)"
          >确认</el-button
        >
        <el-button @click="() => closeModel(model)">取消</el-button>
      </template>
    </PageModel>
    <!--多选的编辑模态框-->
    <PageModel
      title="批量编辑文章属性"
      ref="batchRef"
      :model-config="batchModelConfig"
      @close="() => closeModel(batchRef)"
    >
      <template #footer>
        <el-button type="primary" @click="() => confirmBtn(batchRef, 'batch')"
          >确认</el-button
        >
        <el-button @click="() => closeModel(batchRef)">取消</el-button>
      </template>
    </PageModel>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import PageModel from "comp/common/PageModel";
import PageTable from "comp/common/PageTable";
import PageSearch from "comp/common/PageSearch";
import PagePagination from "comp/common/PagePagination";
import searchConfig from "@/config/pageConfig/content/searchConfig";
import modelConfig from "@/config/pageConfig/content/modelConfig";
import tableConfig from "@/config/pageConfig/content/tableConfig";
import batchModelConfig from "@/config/pageConfig/content/batchModelConfig";
import {
  getList,
  deletePost,
  updatePost,
  batchUpdatePost,
  batchDeletePost,
} from "api/content";
import { normalizedTags } from "@/libs";
import type { IDefaultValue } from "@/types/contnet";
import type { IConfigListOptions } from "comp/common/PageModel/types";
// 翻页参数
const params = reactive({
  page: 1,
  limit: 20,
});
// 数据总条数
const total = ref(0);
// 表格数据
const tableData = ref<any>([]);
// 模态框表单 ref
const model = ref<InstanceType<typeof PageModel>>();
// 帖子 ID
const tid = ref<string>("");
// 获取文章列表
const getListAsync = async (data: any = {}) => {
  const res = await getList({ ...data, ...params });
  if (res.code !== 200) {
    console.log(res);
    return ElMessage.error(res.msg);
  }
  tableData.value = res.data;
  total.value = res.total;
};
// 获取标签列表
const getTagsAsync = async () => {
  const res: IConfigListOptions[] = await normalizedTags();
  // 找到 modelConfig tags 那一项
  const tags: number = modelConfig.configList.findIndex((item) => {
    return item.field === "tags";
  });
  const batchTags: number = batchModelConfig.configList.findIndex((item) => {
    return item.field === "tags";
  });
  modelConfig.configList[tags].options = res;
  batchModelConfig.configList[batchTags].options = res;
};
// 请求获取文章列表
onMounted(() => {
  getListAsync();
  getTagsAsync();
});
// 模态框默认值
const defaultValue = ref<IDefaultValue>();
// 翻页 pageSize 变化事件
const handleSizeChange = (e: any) => {};
// 翻页 pageNum 变化事件
const handleCurrentChange = (e: any) => {};
// 编辑文章数据
const handleEdit = (row: any) => {
  tid.value = row._id;
  defaultValue.value = {
    title: row.title,
    isEnd: +row.isEnd,
    isTop: row.isTop,
    status: row.status,
    favs: +row.favs,
    catalog: row.catalog,
    tags: row.tags ? row.tags.map((item: any) => item._id) : [],
  };
  model.value?.show(); // 显示模态框
};
// 删除文章数据
const handleDetete = async (row: any, index: number) => {
  try {
    await ElMessageBox.confirm(
      `删除第 ${index + 1} 条数据， “${row.title}”这篇文章吗？`,
      "确定要删除文章吗？",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    const id = row._id;
    // 请求服务器删除
    const res = await deletePost(id);
    if (res.code !== 200) {
      return ElMessage.error(res.msg);
    }
    tableData.value = tableData.value.filter((item: any) => item._id !== id);
    total.value--;
    ElMessage.success("成功删除");
  } catch (error) {
    ElMessage.warning("取消操作");
  }
};
// 模态框确认按钮
const confirmBtn = async (model: typeof PageModel, type?: string) => {
  // 校验表单
  try {
    const res = await model.validate();
    if (res) {
      // 获得表单里的数据
      let isUpdate = null;
      const data = model.getData();

      // 批量编辑
      if (type && type === "batch") {
        const params: any = {};
        const tids = batchData.value.map((item) => {
          return item._id;
        });
        Object.keys(data).forEach((key) => {
          if (data[key] === -1) {
            params[key] = 0;
          } else if (data[key] === "-1") {
            params[key] = "0";
          } else {
            params[key] = data[key];
          }
        });
        params.tids = tids;
        isUpdate = await batchUpdatePost(params);
      } else {
        // 单独编辑
        isUpdate = await updatePost({ ...data, tid: tid.value });
      }
      // 对接口返回的状态码进行相应处理
      if (isUpdate.code !== 200) {
        return ElMessage.error(isUpdate.msg);
      } else {
        await getListAsync();
        closeModel(model);
        ElMessage.success(isUpdate.msg);
      }
    }
  } catch (error) {}
};
// 关闭模态框
const closeModel = (model: typeof PageModel) => {
  model.hide();
  model.resetField();
};
// 搜索表单组件
const searchRef = ref<InstanceType<typeof PageSearch>>();
// 搜索按钮
const onSearch = async () => {
  const valid = await searchRef.value?.validate();
  if (valid) {
    const data = searchRef.value.getData();
    const queryParams: any = {};
    const value = data.selectValue;
    if (data.field) {
      queryParams[value] = data.field;
    } else if (data.date) {
      queryParams[value] = dayjs(data.date).format("YYYY-MM-DD");
    } else if (data.catalog) {
      queryParams[value] = data.catalog;
    } else if (data.radio !== "-1") {
      if (value === "status") {
        const status: any = {
          "-1": "",
          "1": "0",
          "0": "1",
        };
        queryParams[value] = status[data.radio];
      } else {
        queryParams[value] = data.radio;
      }
    }
    await getListAsync(queryParams);
  }
};
// 批量部分
const batchRef = ref<InstanceType<typeof PageModel>>();
const batchData = ref<any[]>([]);
// 选择某几条数据
const select = (e: any[]) => {
  batchData.value = e;
};
// 全选或全不选
const selectAll = (e: any[]) => {
  batchData.value = e;
};
// 批量删除
const batchDelete = async () => {
  if (batchData.value?.length === 0) {
    return ElMessage.error("请先选择一项后再点击");
  }
  try {
    const tids: string[] = [];
    const titles: string[] = [];
    batchData.value.forEach((item) => {
      tids.push(item._id);
      titles.push(`"${item.title}"`);
    });
    await ElMessageBox.confirm(
      `确定要删除， ${titles.join(", ")} 这 ${batchData.value.length} 文章吗？`,
      "确定要删除文章吗？",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    try {
      const res = await batchDeletePost(tids);
      if (res.code !== 200) {
        return ElMessage.error(res.message);
      }
      ElMessage.success(res.message);
      await getListAsync();
    } catch (e) {
      ElMessage.error("删除失败");
    }
  } catch (e) {
    ElMessage.warning("取消操作");
  }
};
// 批量编辑
const batchEdit = () => {
  if (batchData.value?.length === 0) {
    return ElMessage.error("请先选择一项后再点击");
  }
  batchRef.value.show();
};
</script>

<style scoped lang="scss">
.other {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  .pagination {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
