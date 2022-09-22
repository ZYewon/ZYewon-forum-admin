<template>
  <el-dialog
    v-model="isShow"
    :title="title"
    :width="modelConfig.dialogWidth ? modelConfig.dialogWidth : '40%'"
    @close="close"
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
              :disabled="item.disabled ? item.disabled : false"
              :rows="item.rows ? item.rows : 2"
              :style="{ width: item.width }"
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
              v-bind="item"
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
    defaultValue?: any;
    modelConfig: IModelConfig;
    title?: string;
  }>(),
  {
    title: "model",
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
const modelRef = ref<InstanceType<typeof ElForm>>();
const setPageModel = (config: IConfigList[]) => {
  config.forEach((item) => {
    pageModel.value[item.field] = item.fieldDefault ?? "";
  });
};
// 当传入配置项时，读取并创建 v-model 所需要的变量
watch(
  () => props.modelConfig,
  (newVal) => {
    setPageModel(newVal.configList);
  },
  {
    immediate: true,
  }
);
// 在打开编辑框时如果传递了 default 则读取并赋值
watch(
  () => props.defaultValue,
  (newVal) => {
    pageModel.value = { ...pageModel.value, ...newVal };
  }
);

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
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
  resetField() {
    modelRef.value?.resetFields();
    setPageModel(props.modelConfig.configList);
    modelRef.value?.clearValidate();
  },
  resetAll() {
    pageModel.value = {};
    modelRef.value?.resetFields();
    modelRef.value?.clearValidate();
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
