<template>
  <div class="daily">
    <a-row>
      <a-col :span="8">
        <!-- 日历 -->
        <a-row>
          <a-col :span="24"
            ><a-date-picker v-model="date" style="width:100%"
          /></a-col>
          <a-row :span="24" :gutter="[16, 16]">
            <a-col :span="12">
              <div class="card card-mission">
                <h1 class="card-val">12</h1>
                <div class="card-tit">任务</div>
                <a-icon type="play-circle" class="card-icon" />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="card card-detail">
                <h1 class="card-val">12</h1>
                <div class="card-tit">任务项</div>
                <a-icon type="profile" class="card-icon" />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="card card-station">
                <h1 class="card-val">12</h1>
                <div class="card-tit">站点</div>
                <a-icon type="profile" class="card-icon" />
              </div>
            </a-col>
            <a-col :span="12">
              <div class="card card-instrument">
                <h1 class="card-val">12</h1>
                <div class="card-tit">站点</div>
                <a-icon type="profile" class="card-icon" />
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
      <!--饼图-->
      <a-col :span="16">
        <a-row :gutter="16">
          <a-col :span="12">
            <ve-pie
              :data="chartData"
              :extend="chartExtend"
              :colors="colors"
              :title="title"
            ></ve-pie>
          </a-col>
          <a-col :span="12">
            <ve-pie
              :data="chartData2"
              :extend="chartExtend"
              :colors="colors"
              :title="title2"
            ></ve-pie>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- 折线图 -->
    <a-row>
      <a-col>
        <ve-histogram
          :data="histogramData"
          :extend="histogramExtend"
          :title="histogramTitle"
        ></ve-histogram>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: this.$moment(new Date(), "YYYY-MM-DD"),
      colors: ["#1890ff", "orange", "#cf1322", "purple"],
      title: {
        text: "完成情况",
        x: "center",
        top: 20,
        textStyle: {
          fontSize: 16 //字体大小
        }
      },
      title2: {
        text: "任务项来源",
        x: "center",
        top: 20,
        textStyle: {
          fontSize: 16 //字体大小
        }
      },
      chartExtend: {
        legend: {
          top: 50
        }
      },
      chartData: {
        columns: ["name", "value"],
        rows: [
          { name: "准时完成", value: 50 },
          { name: "逾期完成", value: 8 }
        ]
      },
      chartData2: {
        columns: ["name", "value"],
        rows: [
          { name: "例行", value: 50 },
          { name: "现场", value: 8 },
          { name: "突发", value: 8 },
          { name: "联动", value: 8 }
        ]
      },
      //折线图》普通任务
      histogramExtend: {
        series: {
          barWidth: 25
        },
        legend: {
          top: 20
        }
      },
      histogramTitle: {
        text: "任务项数量",
        top: 14,
        left: 0,
        textStyle: {
          fontSize: 14
          // fontWeight: "normal"
        }
      },

      histogramData: {
        columns: ["name", "普通任务"],
        rows: [
          { name: "B小组", 普通任务: 353 },
          { name: "A小组", 普通任务: 133 },
          { name: "C小组", 普通任务: 293 },
          { name: "D小组", 普通任务: 173 },
          { name: "E小组", 普通任务: 392 },
          { name: "F小组", 普通任务: 92 },
          { name: "G小组", 普通任务: 312 },
          { name: "H小组", 普通任务: 192 },
          { name: "I小组", 普通任务: 72 }
        ]
      }
    };
  },
  methods: {}
};
</script>
