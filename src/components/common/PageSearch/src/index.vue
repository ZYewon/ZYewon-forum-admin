<template>
  <div class="search">
    <el-form
      :inline="searchConfig.inline ? searchConfig.inline : false"
      :model="searchModel"
      class="demo-form-inline"
      :rules="searchConfig.rules"
      ref="searchRef"
    >
      <el-form-item
        v-if="searchConfig.selectOptions"
        :prop="searchConfig.selectOptions.prop"
      >
        <el-select
          v-model="searchModel[searchConfig.selectOptions.field]"
          class="m-2"
          :placeholder="searchConfig.selectOptions.placeholder"
        >
          <el-option
            v-for="item in searchConfig.selectOptions.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-for="item in searchConfig.configList">
        <template v-if="item.element === 'input' && item.show === show">
          <el-form-item v-bind="item">
            <el-input v-bind="item" v-model="searchModel[item.field]" />
          </el-form-item>
        </template>
        <template v-if="item.element === 'date-picker' && item.show === show">
          <el-form-item v-bind="item">
            <el-date-picker
              type="date"
              v-bind="item"
              v-model="searchModel[item.field]"
            />
          </el-form-item>
        </template>
        <template v-if="item.element === 'radio' && item.show === show">
          <el-form-item v-bind="item">
            <el-radio-group class="ml-4" v-model="searchModel[item.field]">
              <template v-for="rad in item.listOptions">
                <el-radio :label="rad.label">{{ rad.title }}</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-if="item.element === 'select' && item.show === show">
          <el-form-item v-bind="item">
            <el-select
              class="m-2"
              :placeholder="item.placeholder"
              v-model="searchModel[item.field]"
              v-bind="item"
            >
              <el-option
                v-for="sel in item.listOptions"
                :key="sel.label"
                :label="sel.title"
                :value="sel.label"
              />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <!--      <el-form-item-->
      <!--        prop="field"-->
      <!--        v-if="-->
      <!--          contentForm.selectValue === 'title' ||-->
      <!--          contentForm.selectValue === 'tag' ||-->
      <!--          contentForm.selectValue === 'nickname' ||-->
      <!--          contentForm.selectValue === ''-->
      <!--        "-->
      <!--      >-->
      <!--        <el-input v-model="contentForm.field" placeholder="请输入关键字" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item v-if="contentForm.selectValue === 'created'" prop="date">-->
      <!--        <el-date-picker-->
      <!--          v-model="contentForm.date"-->
      <!--          type="date"-->
      <!--          placeholder="请选择日期"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item v-if="contentForm.selectValue === 'catalog'" prop="catalog">-->
      <!--        <el-select-->
      <!--          v-model="contentForm.catalog"-->
      <!--          class="m-2"-->
      <!--          placeholder="请选择分类"-->
      <!--        >-->
      <!--          <el-option-->
      <!--            v-for="item in catalogs"-->
      <!--            :key="item.field"-->
      <!--            :label="item.name"-->
      <!--            :value="item.field"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item-->
      <!--        v-if="-->
      <!--          contentForm.selectValue === 'isEnd' ||-->
      <!--          contentForm.selectValue === 'isTop' ||-->
      <!--          contentForm.selectValue === 'status'-->
      <!--        "-->
      <!--      >-->
      <!--        <el-radio-group v-model="contentForm.radio" class="ml-4">-->
      <!--          <el-radio label="-1">全部</el-radio>-->
      <!--          <el-radio label="1">是</el-radio>-->
      <!--          <el-radio label="0">否</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <template v-for="item in searchConfig.customFormItem">
        <el-form-item v-bind="item">
          <slot :name="item.slotName"></slot>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<!--该组件，为了迎合此项目，当左边的选择器选择后，根据选择的字段动态显示右边的输入框、radio、select 等等-->
<script lang="ts" setup>
import { defineProps, withDefaults, ref, watch, defineExpose } from "vue";
import type { ISearchConfig, IConfigList } from "../types";
import { ElForm } from "element-plus";

const props = withDefaults(
  defineProps<{
    searchConfig: ISearchConfig;
  }>(),
  {}
);

const show = ref<string>("");
const searchModel = ref<any>({
  [props.searchConfig.selectOptions.field]: "",
});
const searchRef = ref<InstanceType<typeof ElForm>>();
const setSearchModel = (config: IConfigList[]) => {
  config.forEach((item) => {
    searchModel.value[item.field] = item.fieldDetault ?? "";
  });
};
watch(
  () => props.searchConfig,
  (newVal) => {
    setSearchModel(newVal.configList);
  },
  {
    immediate: true,
  }
);
watch(
  () => searchModel.value[props.searchConfig.selectOptions.field],
  (newVal) => {
    show.value = newVal.split(" ")[1];
    setSearchModel(props.searchConfig.configList);
  }
);

defineExpose({
  getData() {
    const data =
      searchModel.value[props.searchConfig.selectOptions.field].split(" ")[0];

    return {
      ...searchModel.value,
      [props.searchConfig.selectOptions.field]: data,
    };
  },
  validate() {
    return new Promise((resolve) => {
      searchRef.value
        ?.validate()
        .then((v) => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
});
</script>

<style scoped></style>
