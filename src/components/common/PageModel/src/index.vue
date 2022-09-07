<template>
  <el-dialog
    v-model="isShow"
    title="编辑文章属性"
    :width="modelConfig.dialogWidth ? modelConfig.dialogWidth : '40%'"
  >
    <el-form
      :model="pageModel"
      :label-width="modelConfig.labelWidth ? modelConfig.labelWidth : '100px'"
      :rules="modelConfig.rules"
      ref="modelRef"
    >
      <template v-for="(item, index) in modelConfig.configList">
        <template v-if="item.element === 'input'">
          <el-form-item
            :label="item.label"
            :key="'input' + index"
            :prop="item.field"
          >
            <el-input
              :placeholder="item.placeholder"
              :type="item.inputType"
              v-model="pageModel[item.field]"
            ></el-input>
          </el-form-item>
        </template>
        <template v-if="item.element === 'select'">
          <el-form-item
            :label="item.label"
            :key="'select' + index"
            :prop="item.field"
          >
            <el-select
              class="m-2 select"
              :placeholder="item.placeholder"
              v-model="pageModel[item.field]"
            >
              <el-option
                v-for="opt in item.options"
                :key="opt.field"
                :label="opt.name"
                :value="opt.field"
              />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="item.element === 'radio'">
          <el-form-item
            :label="item.label"
            :key="'radio' + index"
            :prop="item.field"
          >
            <el-radio-group class="ml-4" v-model="pageModel[item.field]">
              <template v-for="rad in item.options">
                <el-radio
                  :label="rad.field"
                  :size="rad.size ? rad.size : 'large'"
                  >{{ rad.name }}</el-radio
                >
              </template>
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-if="item.element === 'slider'">
          <el-form-item :label="item.label" :key="'slider' + index">
            <el-slider v-bind="item" v-model="pageModel[item.field]" />
          </el-form-item>
        </template>
      </template>
    </el-form>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps, withDefaults, watch } from "vue";
import { ElForm } from "element-plus";
import { IModelConfig, IConfigList } from "../types";
// 设置 props
const props = withDefaults(
  defineProps<{
    defaultValue: any;
    modelConfig: IModelConfig;
  }>(),
  {
    defaultValue: () => ({}),
    modelConfig: () => ({
      configList: [],
    }),
  }
);
// 打开模态框
const isShow = ref(false);
// form 表单数据对象
const pageModel = ref<any>({});
const setPageModel = (config: IConfigList[]) => {
  config.forEach((item) => {
    if (item.fieldType === "string") {
      pageModel.value[item.field] = "";
    } else {
      pageModel.value[item.field] = item.fieldDefault;
    }
  });
};
// 当传入配置项时，读取并创建 v-model 所需要的变量
watch(
  () => props.modelConfig,
  (newVal) => {
    setPageModel(newVal.configList);
  }
);
// 在打开编辑框时如果传递了 default 则读取并赋值
watch(
  () => props.defaultValue,
  (newVal) => {
    pageModel.value = { ...pageModel.value, ...newVal };
  }
);

const modelRef = ref<InstanceType<typeof ElForm>>();
// 向外抛出方法
defineExpose({
  show() {
    isShow.value = true;
  },
  hide() {
    isShow.value = false;
  },
  getData() {
    return pageModel.value;
  },
  validate() {
    return modelRef.value?.validate();
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
