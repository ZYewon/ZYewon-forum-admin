<template>
  <div class="pagination-comp">
    <!-- 导出为 xxx 格式文件 -->
    <div class="btn">
      <slot name="handler"></slot>
    </div>
    <!-- 翻页 -->
    <div class="pagination" v-if="total !== 0">
      <el-pagination
        :current-page="currentPage"
        @update:current-page="updateCurrentPage"
        :page-size="pageSize"
        @update:page-size="updatePageSize"
        v-bind="attrs"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, useAttrs } from "vue";
const props = withDefaults(
  defineProps<{
    layout: string;
    total: number;
    pageSize: number;
    currentPage: number | string;
  }>(),
  {}
);
const attrs = useAttrs();
const emit = defineEmits([
  "update:currentPage",
  "update:pageSize",
  "sizeChange",
  "currentChange",
]);
const updateCurrentPage = (e: number | string) => {
  emit("update:currentPage", e);
};
const updatePageSize = (e: number | string) => {
  emit("update:pageSize", e);
};
const handleSizeChange = (e: number | string) => {
  emit("sizeChange", e);
};
const handleCurrentChange = (e: number | string) => {
  emit("currentChange", e);
};
</script>

<style lang="scss">
.pagination-comp {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  .btn {
    margin-right: 10px;
  }
  .pagination {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
