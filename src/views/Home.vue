<template>
  <div v-if="showHome">
    <div class="card-container">
      <el-row :gutter="12">
        <el-col :span="4" v-for="(item, index) in cardData" :key="item.title">
          <div class="card-count-container">
            <div class="left" :style="{ backgroundColor: item.bg }">
              <el-icon size="50px" color="#fff"
                ><component :is="item.icon"></component
              ></el-icon>
            </div>
            <div class="right">
              <div class="right-count">
                <div class="count" :id="'count' + index">{{ item.count }}</div>
                <div class="count-title">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics mt20">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card>
            <div id="cake"></div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card>
            <div id="bar"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="line mt20">
      <WeekStat :week-data="weekData"></WeekStat>
    </div>
  </div>
  <div v-else class="showHome-text">欢迎访问 ZYewon 交流社区后台管理系统！</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { CountUp } from "countup.js";
import { getStatData } from "api/stat";
import dayjs from "dayjs";
import * as echarts from "echarts";
import WeekStat from "comp/WeekStat";
const showHome = ref(true);
const cardData = reactive([
  {
    title: "新增用户",
    icon: "Avatar",
    count: 0,
    bg: "#2d8cf0",
  },
  {
    title: "发帖累计",
    icon: "View",
    count: 0,
    bg: "#19be6b",
  },
  {
    title: "新增评论",
    icon: "ChatDotSquare",
    count: 0,
    bg: "#ff9900",
  },
  {
    title: "本周采纳",
    icon: "Select",
    count: 0,
    bg: "#ed3f14",
  },
  {
    title: "本周签到",
    icon: "Pointer",
    count: 0,
    bg: "#2d8cf0",
  },
  {
    title: "本周发帖",
    icon: "DocumentChecked",
    count: 0,
    bg: "#9a66e4",
  },
]);
const weekData = ref<any>({});
const initPie = (arr: any[]) => {
  const cakeDom = document.getElementById("cake");
  const cakeChart = echarts.init(cakeDom as HTMLDivElement);
  let options = {
    title: {
      text: "发帖统计",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "统计内容",
        type: "pie",
        radius: "50%",
        data: arr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  options && cakeChart.setOption(options);
};
const initBar = (data: any) => {
  const barDom = document.getElementById("bar");
  const barChart = echarts.init(barDom as HTMLDivElement);
  const keys = Object.keys(data);
  const values = Object.values(data);
  let option = {
    title: {
      text: "近6月的累计发帖",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: keys,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: values,
        type: "bar",
      },
    ],
  };
  option && barChart.setOption(option);
};
const getData = async () => {
  const res = await getStatData();
  if (res.code === 200) {
    // 赋值顶部的数字动画数据
    res.data.infoCardData.forEach((item: any, index: number) => {
      const c = new CountUp(`count${index}`, res.data.infoCardData[index] || 0);
      c.start();
    });
    // 赋值饼状图
    const pieArr = [];
    const pieData = res.data.pieData ? res.data.pieData : {};
    pieArr.push({ name: "提问", value: pieData.ask || 0 });
    pieArr.push({ name: "分享", value: pieData.share || 0 });
    pieArr.push({ name: "讨论", value: pieData.discuss || 0 });
    pieArr.push({ name: "建议", value: pieData.advice || 0 });
    initPie(pieArr);
    // 得到后端返回的最近六个月的数据
    // 赋值柱状图
    if (res.data.monthData) {
      const result: any = {};
      for (let i = 0; i <= 5; i++) {
        const key = dayjs()
          .subtract(5 - i, "M")
          .format("YYYY-MM");
        result[key] = res.data.monthData[key] || 0;
      }
      initBar(result);
    }
    if (res.data.weekData) {
      weekData.value = res.data.weekData;
    }
  } else {
    // 接口权限没过关，给用户提示未有权限
    showHome.value = false;
  }
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.card-count-container {
  display: flex;
  height: 120px;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  .left {
    width: 35%;
    background-color: aqua;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .right-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      .count {
        font-size: 50px;
      }
      .count-title {
        font-size: 14px;
      }
    }
  }
}
.mt20 {
  margin-top: 20px;
}
#cake {
  width: 100%;
  height: 300px;
}
#bar {
  width: 100%;
  height: 300px;
}
.showHome-text {
  font-size: 40px;
  color: #ad52c3;
  line-height: 900px;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/login-bg.jpg");
  background-size: 100% 100%;
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
}
</style>
