<template>
  <div class="main-container">
    <PageSearch :search-config="searchConfig" ref="searchForm">
      <template #handler>
        <el-button @click="onSearch" type="primary">搜素</el-button>
      </template>
    </PageSearch>
    <PageTable
      :table-config="tableConfig"
      :table-data="tableData"
      @select="select"
      @selectAll="selectAll"
    >
      <template #default="{ props }">
        <div class="content">
          <p>文章标题：{{ props.row.tid.title }}</p>
          <p>评论用户：{{ props.row.cuid.nickname }}</p>
          <p>评论内容：</p>
          <div>
            <span>
              {{ props.row.content }}
            </span>
          </div>
        </div>
      </template>
      <template #status="{ data }">
        <el-button
          size="small"
          :type="+data.row.status === 1 ? 'success' : 'danger'"
          plain
          >{{ +data.row.status === 1 ? "是" : "否" }}</el-button
        >
      </template>
      <template #isBest="{ data }">
        <el-button
          size="small"
          :type="+data.row.isBest === 1 ? 'primary' : 'info'"
          >{{ +data.row.isBest === 1 ? "是" : "否" }}</el-button
        >
      </template>
      <template #handler="{ data }">
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="deleteComment(data.row)"
          v-hasBtn="'comment-delete'"
        />
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
          @click="validSelectValueFunc(batchDelete)"
          v-hasBtn="'batch-comments-delete'"
          >批量删除</el-button
        >
        <el-button
          @click="validSelectValueFunc(batchEdit)"
          v-hasBtn="'batch-comments-update'"
          >批量编辑</el-button
        >
      </template>
    </PagePagination>
    <PageModel
      :model-config="modelConfig"
      ref="model"
      title="批量编辑"
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
import { Delete } from "@element-plus/icons-vue";
import PageSearch from "comp/common/PageSearch";
import PageTable from "comp/common/PageTable";
import PagePagination from "comp/common/PagePagination";
import PageModel from "comp/common/PageModel";
import searchConfig from "@/config/pageConfig/comments/searchConfig";
import tableConfig from "@/config/pageConfig/comments/tableConfig";
import modelConfig from "@/config/pageConfig/comments/modelConfig";
import {
  getComments,
  ICommentParams,
  deleteComment as deleteCommentAsync,
  batchDeleteComments,
} from "api/comments";
import { editUserAndComment } from "api/status";
import { ElMessage, ElMessageBox } from "element-plus";
// 评论列表请求参数
const params = ref<ICommentParams>({
  pageNum: 1,
  limit: 10,
});
// 表格数据
const tableData = ref<any[]>([]);
// 数据条数
const total = ref<number>(0);
// 获取评论列表
const getCommentsAsync = async () => {
  const res = await getComments(params.value);
  tableData.value = res.data;
  total.value = res.total;
};
onMounted(() => {
  getCommentsAsync();
});
const searchForm = ref<InstanceType<typeof PageSearch>>();

type ICommentParamsField =
  | "title"
  | "author"
  | "user"
  | "content"
  | "created"
  | "isBest"
  | "status";

// 搜索
const onSearch = async () => {
  const res = await searchForm.value?.validate();
  if (!res) return;
  const data = searchForm.value?.getData();
  const field: ICommentParamsField = data.selectValue;
  params.value = { limit: params.value.limit, pageNum: params.value.pageNum };
  if (data.field) {
    params.value[field] = data.field;
  } else if (data.date) {
    params.value[field] = data.date;
  } else if (data.radio !== "-1") {
    params.value[field] = data.radio;
  }
  getCommentsAsync();
};
// 选中项
const selectValue = ref<any[]>([]);
const select = (e: any[]) => {
  selectValue.value = e;
};
const selectAll = (e: any[]) => {
  selectValue.value = e;
};
// 删除一条评论
const deleteComment = async (row: any) => {
  console.log(row);
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${row.cuid.nickname} 发布的 "${row.content}" 评论吗？`,
      "警告！",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    const cid = row._id;
    const tid = row.tid._id;
    try {
      const res = await deleteCommentAsync({
        cid,
        tid,
      });
      if (res.code === 200) {
        tableData.value.splice(tableData.value.indexOf(row), 1);
        total.value--;
        ElMessage.success(res.msg);
      } else {
        ElMessage.error(res.msg);
      }
    } catch (e) {
      ElMessage.error("删除失败");
    }
  } catch (e) {}
};
const validSelectValueFunc = (func: any) => {
  if (selectValue.value.length === 0)
    return ElMessage.error("请选择评论项后在操作数据");
  return func(selectValue.value);
};
// 批量删除
const batchDelete = async (arr: any[]) => {
  const cids = arr.map((item) => item._id);
  const tids = arr.map((item) => item.tid._id);
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${cids.length} 条评论吗？`,
      "警告！",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    try {
      const res = await batchDeleteComments({
        cids,
        tids,
      });
      if (res.code === 200) {
        ElMessage.success(res.msg);
        await getCommentsAsync();
      }
    } catch (e) {}
  } catch (e) {}
};
const model = ref<InstanceType<typeof PageModel>>();
// 批量编辑
const batchEdit = () => {
  model.value?.show();
};
const close = () => {
  model.value?.hide();
  model.value?.resetField();
};
const confirm = async () => {
  const data = model.value?.getData();
  const params: any = {};
  let noRequest = true;
  Object.keys(data).forEach((key) => {
    if (data[key] !== "-1") {
      params[key] = data[key];
      noRequest = false;
    }
  });
  if (noRequest) {
    return close();
  }

  const cids = selectValue.value.map((item) => item._id);
  const cuids = selectValue.value.map((item) => item.cuid._id);
  params.ids = {
    cids,
    cuids,
  };
  const res = await editUserAndComment(params);
  if (res.code === 200) {
    ElMessage.success(res.msg);
    await getCommentsAsync();
  } else {
    ElMessage.error(res.msg);
  }
  close();
};

// 翻页
const handleCurrentChange = (e: number) => {
  params.value.pageNum = e;
  getCommentsAsync();
};
const handleSizeChange = (e: number) => {
  params.value.limit = e;
  getCommentsAsync();
};
</script>

<style scoped lang="scss">
.content {
  width: 50%;
  p {
    margin: 6px 0;
    font-weight: 700;
    &:last-child {
      margin-bottom: 0;
    }
  }
  div {
    span {
      display: inline-block;
      text-indent: 2em;
      line-height: 1.5em;
    }
  }
}
</style>
