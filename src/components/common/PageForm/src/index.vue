<template>
  <div class="page-form">
    <el-form
      v-bind="formConfig"
      :model="FormModel"
      :rules="formConfig.rules"
      ref="form"
    >
      <template v-for="(item, index) in formConfig.configList">
        <template v-if="item.element === 'input'">
          <el-form-item
            :label="item.label"
            :prop="item.field"
            :key="'input' + index"
          >
            <el-input v-bind="item" v-model="FormModel[item.field]">
              <template v-if="item.prepend" #prepend>
                {{ item.prepend }}
              </template>
              <template v-if="item.append" #append>
                {{ item.append }}
              </template>
            </el-input>
          </el-form-item>
        </template>
        <template v-if="item.element === 'select'">
          <el-form-item
            :label="item.label"
            :prop="item.field"
            :key="'input' + index"
          >
            <el-select v-model="FormModel[item.field]" v-bind="item">
              <el-option
                v-for="opt in item.options"
                :key="opt.field"
                :label="opt.name"
                :value="opt.field"
              />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <el-form-item>
        <slot name="handler"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, withDefaults } from "vue";
import { IModelConfig } from "comp/common/PageModel/types";
import { ElForm } from "element-plus";
import _ from "lodash";
const props = withDefaults(
  defineProps<{
    formConfig: IModelConfig;
    defaultValue: any;
  }>(),
  {}
);
const FormModel = ref<any>({});
const form = ref<InstanceType<typeof ElForm>>();
const setFormModel = (configList: any[]) => {
  configList.forEach((item) => {
    FormModel.value[item.field] = item.fieldDefault ?? "";
  });
};
watch(
  () => props.defaultValue,
  (newVal) => {
    FormModel.value = { ...FormModel.value, ...newVal };
  }
);
watch(
  () => props.formConfig,
  (newVal) => {
    setFormModel(newVal.configList);
    // newVal.configList.forEach((item) => {
    //   FormModel.value[item.field] = item.fieldDefault ?? "";
    // });
  },
  {
    immediate: true,
  }
);
defineExpose({
  getData() {
    return _.cloneDeepWith(FormModel.value);
  },
  async validate() {
    try {
      await form.value?.validate();
      return true;
    } catch (e) {
      return false;
    }
  },
  resetField() {
    FormModel.value = {};
    setFormModel(props.formConfig.configList);
    form.value?.resetFields();
  },
});
</script>

<style scoped></style>
