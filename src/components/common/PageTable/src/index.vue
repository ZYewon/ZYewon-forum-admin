<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      ref="table"
    >
      <template
        v-if="tableConfig.headColumn && tableConfig.headColumn.length > 0"
      >
        <template v-for="item in tableConfig.headColumn">
          <template v-if="item.type === 'expand'">
            <el-table-column v-bind="item">
              <template #default="props">
                <slot :props="props"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item"> </el-table-column>
          </template>
        </template>
      </template>
      <el-table-column
        v-for="item in tableConfig.configList"
        :key="item.prop"
        show-overflow-tooltip
        :align="item.align ? item.align : 'center'"
        v-bind="item"
      >
        <template v-if="item.slotName" v-slot="data">
          <slot :name="item.slotName" :data="data"></slot>
        </template>
      </el-table-column>
      <template
        v-if="tableConfig.customColumn && tableConfig.customColumn.length > 0"
      >
        <template v-for="item in tableConfig.customColumn">
          <el-table-column v-bind="item">
            <template v-slot="data">
              <slot :name="item.slotName" :data="data"></slot>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, defineExpose, ref } from "vue";
import type { ITableConfig } from "../types";
import { ElTable } from "element-plus";
const props = withDefaults(
  defineProps<{
    tableData: any;
    tableConfig: ITableConfig;
  }>(),
  {}
);
const table = ref<InstanceType<typeof ElTable>>();
const emit = defineEmits(["select", "selectAll", "selectionChange"]);
const select = (e: any) => {
  emit("select", e);
};
const selectAll = (e: any) => {
  emit("selectAll", e);
};
const selectionChange = (e: any) => {
  emit("selectionChange", e);
};

defineExpose({
  toggleRowSelection(row: any, bol: boolean) {
    table.value?.toggleRowSelection(row, bol);
  },
  getSelectionRows() {
    return table.value?.getSelectionRows();
  },
});
</script>

<style scoped></style>
