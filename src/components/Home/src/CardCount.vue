<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never"> Never </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never"> Never </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
