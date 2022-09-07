<template>
  <div>
    <div class="card-container">
      <CardCount />
    </div>
    <div class="statistics">
      <CardStatistics />
    </div>
    <div class="line">
      <CardLine />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CardCount, CardLine, CardStatistics } from "comp/Home";
</script>

<style lang="scss" scoped></style>
