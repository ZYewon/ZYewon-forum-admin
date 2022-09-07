<template>
  <div class="main-container">
    <div class="search">
      <el-form
        :inline="true"
        :model="contentForm"
        class="demo-form-inline"
        :rules="rules"
        ref="searchRef"
      >
        <el-form-item prop="selectValue">
          <el-select
            v-model="contentForm.selectValue"
            class="m-2"
            placeholder="请选择"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.field"
              :label="item.name"
              :value="item.field"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="field"
          v-if="
            contentForm.selectValue === 'title' ||
            contentForm.selectValue === 'tag' ||
            contentForm.selectValue === 'nickname' ||
            contentForm.selectValue === ''
          "
        >
          <el-input v-model="contentForm.field" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item v-if="contentForm.selectValue === 'created'" prop="date">
          <el-date-picker
            v-model="contentForm.date"
            type="date"
            placeholder="请选择日期"
          />
        </el-form-item>
        <el-form-item
          v-if="contentForm.selectValue === 'catalog'"
          prop="catalog"
        >
          <el-select
            v-model="contentForm.catalog"
            class="m-2"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in catalogs"
              :key="item.field"
              :label="item.name"
              :value="item.field"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            contentForm.selectValue === 'isEnd' ||
            contentForm.selectValue === 'isTop' ||
            contentForm.selectValue === 'status'
          "
        >
          <el-radio-group v-model="contentForm.radio" class="ml-4">
            <el-radio label="-1">全部</el-radio>
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in tableConfig"
          :key="item.prop"
          show-overflow-tooltip
          :align="item.prop === 'title' ? 'left' : 'center'"
          v-bind="item"
        >
          <template v-if="item.prop === 'status'" v-slot="{ row }">
            <el-button
              :type="+row.status === 0 ? 'success' : 'danger'"
              size="small"
            >
              {{ +row.status === 0 ? "on" : "off" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template v-slot="{ row, column, $index }">
            <el-button size="small" type="primary" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDetete(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="other">
      <!-- 导出为 xxx 格式文件 -->
      <div class="export-btn">
        <el-button type="primary">导出为 Excel 文件</el-button>
      </div>
      <!-- 翻页 -->
      <div class="pagination">
        <el-pagination
          v-model:currentPage="params.page"
          :page-size="params.limit"
          :page-sizes="[20, 40, 60, 80]"
          :small="true"
          :background="true"
          layout="total, prev, pager, next, jumper,sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <!-- <EditModel ref="model" :default-value="defaultValue" /> -->
  <PageModel
    ref="model"
    :default-value="defaultValue"
    :modelConfig="modelConfig"
  >
    <template #footer>
      <el-button type="primary" @click="confirmBtn">确认</el-button>
      <el-button @click="closeModel">取消</el-button>
    </template>
  </PageModel>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import { getList, deletePost, updatePost } from "api/content";
import dayjs from "dayjs";
import EditModel from "comp/Content";
import { IDefaultValue } from "comp/Content/types";
import PageModel from "@/components/common/PageModel";
import modelConfig from "@/config/pageConfig/content/modelConfig";
import tableConfig from "@/config/pageConfig/content/tableConfig";
const selectOptions = [
  {
    field: "title",
    name: "标题",
  },
  {
    field: "created",
    name: "创建时间",
  },
  {
    field: "nickname",
    name: "作者",
  },
  {
    field: "catalog",
    name: "分类",
  },
  {
    field: "tag",
    name: "标签",
  },
  {
    field: "isEnd",
    name: "是否结束",
  },
  {
    field: "status",
    name: "状态",
  },
  {
    field: "isTop",
    name: "是否置顶",
  },
];
const rules = {
  field: [{ required: true, message: "请输入关键字", trigger: "blur" }],
  date: [{ required: true, message: "请选择日期", trigger: "blur" }],
  catalog: [{ required: true, message: "请选择分类", trigger: "change" }],
  radio: [{ required: true, message: "请选择", trigger: "change" }],
  selectValue: [{ required: true, message: "请选择", trigger: "change" }],
};
const contentForm = reactive({
  field: "",
  selectValue: "",
  date: "",
  catalog: "",
  radio: "-1",
});
const catalogs = [
  { field: "index", name: "全部" },
  { field: "ask", name: "提问" },
  { field: "advice", name: "建议" },
  { field: "discuss", name: "交流" },
  { field: "share", name: "分享" },
  { field: "news", name: "动态" },
  { field: "notice", name: "公告" },
];
watch(
  () => contentForm.selectValue,
  () => {
    contentForm.field = "";
    contentForm.date = "";
    contentForm.catalog = "";
    contentForm.radio = "-1";
  }
);
const params = reactive({
  page: 1,
  limit: 20,
});
const total = ref(0);
const tableData = ref<any>([]);
const model = ref<InstanceType<typeof EditModel>>();
const tid = ref<string>("");
// 获取文章列表
const getListAsync = async () => {
  const res = await getList(params);
  if (res.code !== 200) {
    return ElMessage.error(res.msg);
  }
  tableData.value = res.data;
  total.value = res.total;
};
onMounted(() => {
  getListAsync();
});
const defaultValue = ref<IDefaultValue>();
const handleSizeChange = () => {};
const handleCurrentChange = () => {};
const handleEdit = (row: any) => {
  tid.value = row._id;
  defaultValue.value = {
    title: row.title,
    isEnd: +row.isEnd,
    isTop: row.isTop,
    status: row.status,
    favs: +row.favs,
    catalog: row.catalog,
  };
  model.value?.show(); // 显示模态框
};
const handleDetete = async (row: any, index: number) => {
  try {
    await ElMessageBox.confirm(
      `删除第 ${index} 条数据， “${row.title}”这篇文章吗？`,
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

    console.log(id);
  } catch (error) {
    ElMessage.warning("取消操作");
  }
};
// 模态框确认按钮
const confirmBtn = async () => {
  // 校验表单
  try {
    const res = await model.value?.validate();
    if (res) {
      // 获得表单里的数据
      const data = model.value?.getData();
      // 发送请求更新数据
      const isUpdate = await updatePost({ ...data, tid: tid.value });
      // 对接口返回的状态码进行相应处理
      if (isUpdate.code !== 200) {
        return ElMessage.error(isUpdate.msg);
      } else {
        await getListAsync();
        model.value?.hide();
        ElMessage.success(isUpdate.msg);
      }
    }
  } catch (error) {}
};
// 关闭模态框
const closeModel = () => {
  model.value?.hide();
};
const searchRef = ref<InstanceType<typeof ElForm>>();
const onSubmit = async () => {
  try {
    const valid = await searchRef.value?.validate();
    if (valid) {
      const params: any = {};
      if (
        contentForm.selectValue === "catalog" ||
        contentForm.selectValue === "title" ||
        contentForm.selectValue === "nickname"
      ) {
        params[contentForm.selectValue] = contentForm.field;
      } else if (contentForm.selectValue === "created") {
        params[contentForm.selectValue] = dayjs(contentForm.date).format();
      } else {
        params[contentForm.selectValue] =
          contentForm.radio === "-1" ? "" : contentForm.radio;
      }
    }
  } catch (e) {}

  // if(contentForm.selectValue === 'title')
  // console.log(contentForm);
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
