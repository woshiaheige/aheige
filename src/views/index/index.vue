<template>
  <div class="index">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="服务客户"
            :value="298"
            :valueStyle="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="运维站点"
            :value="298"
            :valueStyle="{ color: '#cf1322' }"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="维护仪器"
            :value="298"
            :valueStyle="{ color: '#cf1322' }"
          >
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="运维小组"
            :value="298"
            suffix="组"
            :valueStyle="{ color: '#cf1322' }"
          >
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="charts">
      <!--任务栏-->
      <a-col :span="8">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="今日任务"
                :value="100"
                :valueStyle="{ color: '#1890ff' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="今日待完成"
                :value="10"
                :valueStyle="{ color: 'orange' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="工作中任务"
                :value="30"
                :valueStyle="{ color: '#cf1322' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="过期任务"
                :value="10"
                :valueStyle="{ color: 'red' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="突发任务"
                :value="30"
                :valueStyle="{ color: 'blue' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="任务一览"
                :value="10"
                :valueStyle="{ color: '#3f8600' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
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
    <a-row :gutter="16">
      <!--待处理-->
      <a-col :span="8">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-card
              size="small"
              title="待处理投诉"
              :headStyle="{
                background: '#1890ff',
                color: '#fff',
                textAlign: 'center'
              }"
            >
              <p>暂无数据</p>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card size="small" title="待处理报警">
              <p>暂无数据</p>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card size="small" title="合同续签提醒">
              <p>暂无数据</p>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <!--地图-->
      <a-col :span="16">
        <div id="container"></div>
      </a-col>
    </a-row>
    <charts-section></charts-section>
  </div>
</template>

<script>
import AMap from "AMap";
import chartsSection from "./charts";
export default {
  components: { chartsSection },
  data() {
    return {
      map: null,
      colors: ["#1890ff", "orange", "#cf1322"],
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
          { name: "突发", value: 8 }
        ]
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [116.397428, 39.90923], //初始化地图中心点
        mapStyle: "amap://styles/darkblue"
      });
      // this.map = new AMap.Map("container", {
      //   center: [113.53, 23.36],
      //   resizeEnable: true, //是否监控地图容器尺寸变化
      //   zoom: 8,
      //   // zoomEnable: false, //地图是否可缩放
      //   doubleClickZoom: false // 地图是否可通过双击鼠标放大地图
      // });
      // this.map.setZoomAndCenter(8, [113.53, 23.36]);
    }
  }
};
</script>
