<template>
  <div class="main-container">
    <PageTable :table-config="tableConfig" :table-data="tableData">
      <template #handler="{ data }">
        <el-button
          size="small"
          type="primary"
          @click="editTag(data.row)"
          v-hasBtn="'tag-update'"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="deleteTag(data.row)"
          v-hasBtn="'tag-delete'"
          >删除</el-button
        >
      </template>
    </PageTable>
    <PagePagination
      layout="prev, pager, next"
      :total="total"
      v-model:page-size="pager.limit"
      v-model:current-page="pager.pageNum"
      :background="true"
    >
      <template #handler>
        <el-button type="primary" @click="addTag" v-hasBtn="'tag-add'"
          >新建标签</el-button
        >
      </template>
    </PagePagination>
    <PageModel
      title="新建标签"
      ref="model"
      :model-config="modelConfig"
      :default-value="defaultValue"
      @close="close"
    >
      <template #footer>
        <el-button @click="confirm" type="primary">确认</el-button>
        <el-button @click="close">取消</el-button>
      </template>
    </PageModel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  getTags,
  addTag as addTagAsync,
  editTag as editTagAsync,
  deleteTag as deleteTagAsync,
} from "api/tags";
import PageTable from "comp/common/PageTable";
import PageModel from "comp/common/PageModel";
import PagePagination from "comp/common/PagePagination";
import tableConfig from "@/config/pageConfig/tag/tableConfig";
import modelConfig from "@/config/pageConfig/tag/modelConfig";
import { ElMessage, ElMessageBox } from "element-plus";
// 分页参数
const pager = reactive({
  pageNum: 1,
  limit: 20,
});
// 表格数据
const tableData = ref<any[]>([]);
// 总条数
const total = ref<number>(0);
// 获取标签列表
const getTagsAsync = async () => {
  const res = await getTags({
    pageNum: pager.pageNum,
    limit: pager.limit,
  });
  if (res.code !== 200) {
    return ElMessage.error(res.msg);
  }
  tableData.value = res.data;
  total.value = res.total;
};
onMounted(() => {
  getTagsAsync();
});
// 模态框ref
const model = ref<InstanceType<typeof PageModel>>();
const defaultValue = ref<any>();
// 打开模态框
const openModel = (model: any) => {
  model.show();
};
// 添加标签
const addTag = () => {
  openModel(model.value);
};
// 编辑标签
const editTag = (row: any) => {
  nextTick(() => {
    defaultValue.value = { ...row };
  });
  openModel(model.value);
};
// 关闭模态框
const close = () => {
  model.value?.hide();
  model.value?.resetField();
};
// 添加标签
const add = async (data: any) => {
  try {
    const res = await addTagAsync(data);
    if (res.code !== 200) {
      return ElMessage.error(res.msg);
    }
    ElMessage.success(res.msg);
    await getTagsAsync();
    close();
  } catch (e) {
    ElMessage.error("添加标签失败");
  }
};
// 编辑标签
const edit = async (data: any) => {
  if (
    data.name === defaultValue.value.name &&
    data.class === defaultValue.value.class
  ) {
    return ElMessage.error("请修改数据后在提交");
  }
  const res = await editTagAsync(data);
  if (res.code !== 200) {
    return ElMessage.error(res.msg);
  }
  ElMessage.success(res.msg);
  await getTagsAsync();
  close();
};
// 删除标签
const deleteTag = async (data: any) => {
  const id = data._id;
  try {
    await ElMessageBox.confirm(`确定要删除 ${data.name} 标签吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    try {
      const isDelete = await deleteTagAsync(id);
      if (isDelete.code !== 200) {
        return ElMessage.error(isDelete.msg);
      }
      ElMessage.success(isDelete.msg);
      await getTagsAsync();
    } catch (e) {
      ElMessage.error("删除失败");
    }
  } catch (e) {
    ElMessage.warning("取消操作");
  }
};
// 模态框确认
const confirm = async (type: string) => {
  try {
    await model.value?.validate();
    const data = model.value?.getData();
    if (type === "add") {
      add(data);
    } else {
      edit(data);
    }
  } catch (e) {}
};
</script>

<style scoped></style>
