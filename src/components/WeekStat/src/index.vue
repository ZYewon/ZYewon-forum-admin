<template>
  <el-card>
    <div id="weekstat"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, defineProps, watch } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
const props = defineProps({
  weekData: {
    type: Object,
    default: () => ({}),
  },
});
const initBars = (weekData: any) => {
  var app: any = {};
  var chartDom = document.getElementById("weekstat");
  var myChart = echarts.init(chartDom as HTMLDivElement);
  var option;

  const posList = [
    "left",
    "right",
    "top",
    "bottom",
    "inside",
    "insideTop",
    "insideLeft",
    "insideRight",
    "insideBottom",
    "insideTopLeft",
    "insideTopRight",
    "insideBottomLeft",
    "insideBottomRight",
  ];
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90,
    },
    align: {
      options: {
        left: "left",
        center: "center",
        right: "right",
      },
    },
    verticalAlign: {
      options: {
        top: "top",
        middle: "middle",
        bottom: "bottom",
      },
    },
    position: {
      options: posList.reduce(function (map: any, pos: any) {
        map[pos] = pos;
        return map;
      }, {}),
    },
    distance: {
      min: 0,
      max: 100,
    },
  };
  app.config = {
    rotate: 0,
    align: "left",
    verticalAlign: "middle",
    position: "insideBottom",
    distance: 15,
    onChange: function () {
      const labelOption = {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance,
      };
      myChart.setOption({
        series: [
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
        ],
      });
    },
  };
  const labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: "{c}",
    fontSize: 12,
  };
  const seriesArr: any = [];
  Object.keys(props.weekData).forEach((i) => {
    const key = {
      comments: "回复总数",
      post: "发帖总数",
      user: "新增用户",
      sign: "签到总数",
    }[i];
    seriesArr.push({
      name: key,
      type: "bar",
      barGap: 0,
      label: labelOption,
      data: props.weekData[i],
    });
  });
  const dateArr = [];
  for (let i = 0; i <= 6; i++) {
    const key = dayjs()
      .subtract(6 - i, "day")
      .format("YYYY-MM-DD");
    dateArr.push(key);
  }

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Forest", "Steppe", "Desert", "Wetland"],
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: dateArr,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: seriesArr,
  };

  option && myChart.setOption(option);
};
watch(
  () => props.weekData,
  (newVal) => {
    initBars(newVal);
  }
);
</script>

<style scoped lang="scss">
#weekstat {
  width: 100%;
  height: 300px;
}
</style>
