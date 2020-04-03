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
          <!-- <a-col :span="12">
            <a-card>
              <a-statistic
                title="任务一览"
                :value="10"
                :valueStyle="{ color: '#3f8600' }"
              >
              </a-statistic>
            </a-card>
          </a-col> -->
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
              <!-- <p>暂无数据</p> -->
              <a-empty />
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card size="small" title="待处理报警">
              <a-empty />
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card size="small" title="合同续签提醒">
              <a-empty />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <!--地图-->
      <a-col :span="16" class="index-map">
        <div id="container"></div>
        <div class="info">
          <p><a-icon type="environment" v-margin:right="10" />{{ cityName }}</p>
        </div>
        <div class="status">
          <span><i class="green"></i>联网</span>
          <span><i class="gray"></i>断线</span>
        </div>
      </a-col>
    </a-row>
    <histogram-charts></histogram-charts>
  </div>
</template>

<script>
import AMap from "AMap";
import histogramCharts from "@/components/index/histogram-charts";
export default {
  components: { histogramCharts },
  data() {
    return {
      map: null,
      place: null,
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
      },
      cityName: "惠州市"
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
        center: [113.53, 23.36], //初始化地图中心点
        doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图
        mapStyle: "amap://styles/darkblue"
      });
      this.map.setZoomAndCenter(8, [113.53, 23.36]);
      this.createCityPolygon(this.cityName);
    },
    //创建行政区划覆盖物
    createCityPolygon(city) {
      // 创建行政区查询对象
      this.place = new AMap.DistrictSearch({
        // 返回行政区边界坐标等具体信息
        extensions: "all",
        // 设置查询行政区级别为 区
        level: "district"
      });
      let that = this;
      this.place.search(city, function(status, result) {
        // 获取city的边界信息
        var bounds = result.districtList[0].boundaries;
        var polygons = [];
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              map: that.map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.7,
              fillColor: "#80d8ff",
              strokeColor: "#0091ea"
            });
            polygons.push(polygon);
          }
          // 地图自适应
          that.map.setFitView();
        }
      });
    }
  }
};
</script>
