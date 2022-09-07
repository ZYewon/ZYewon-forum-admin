<template>
  <el-dialog v-model="isShow" title="编辑文章属性" width="30%">
    <el-form :model="editModel" label-width="80px">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题" v-model="editModel.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="editModel.catalog"
          class="m-2 select"
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
      <el-form-item label="是否结束">
        <el-radio-group v-model="editModel.isEnd" class="ml-4">
          <el-radio :label="0" size="large">未结帖</el-radio>
          <el-radio :label="1" size="large">已结帖</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="回复状态">
        <el-radio-group v-model="editModel.status" class="ml-4">
          <el-radio label="0" size="large">打开回复</el-radio>
          <el-radio label="1" size="large">禁止回复</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-radio-group v-model="editModel.isTop" class="ml-4">
          <el-radio label="0" size="large">未置顶</el-radio>
          <el-radio label="1" size="large">已置顶</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="帖子积分">
        <el-slider
          v-model="editModel.favs"
          :step="10"
          size="small"
          show-input
        />
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="editModel.tag"
          class="m-2 select"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in tags"
            :key="item.field"
            :label="item.name"
            :value="item.field"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps, withDefaults, watch } from "vue";
import { IDefaultValue } from "../types";
const catalogs = [
  { field: "index", name: "全部" },
  { field: "ask", name: "提问" },
  { field: "advice", name: "建议" },
  { field: "discuss", name: "交流" },
  { field: "share", name: "分享" },
  { field: "news", name: "动态" },
];
const tags = [
  {
    field: "hot",
    name: "热门",
  },
  {
    field: "prime",
    name: "精华",
  },
];
interface IProps {
  defaultValue: IDefaultValue;
}
const props = withDefaults(defineProps<IProps>(), {
  defaultValue: () => ({
    title: "",
    catalog: "",
    isEnd: 0,
    status: "0",
    isTop: "0",
    favs: 0,
    tag: "",
  }),
});

const isShow = ref(false);
const editModel = ref<IDefaultValue>({
  title: "",
  catalog: "",
  favs: 0,
  status: "0",
  isEnd: 0,
  isTop: "0",
  tag: "",
});
watch(
  () => props.defaultValue,
  (newVal) => {
    editModel.value = { ...editModel.value, ...newVal };
  }
);
defineExpose({
  show() {
    isShow.value = true;
  },
  hide() {
    isShow.value = false;
  },
});
</script>

<style scoped lang="scss">
.m-2.select {
  width: 100%;
}
.ml-4 {
  position: relative;
  top: -3px;
}
</style>
