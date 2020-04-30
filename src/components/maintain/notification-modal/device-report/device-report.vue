<template>
  <div>
    <a-card>
      <div class="card-header">
        <div class="title">设备报表</div>
      </div>
      <a-row
        type="flex"
        justify="space-around"
        align="middle"
        class="data-report"
      >
        <a-col :span="4">
          <span class="num">{{ count.total }}</span>
          <p>设备数量</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#4caf50'">{{ count.normalNumber }}</span>
          <p>正常运行</p>
        </a-col>
        <a-col :span="4">
          <span class="num" v-color="'#f44336'">{{ count.anomalyNumber }}</span>
          <p>设备故障</p>
        </a-col>
        <a-col :span="4">
          <a-progress type="circle" :percent="count.failureRate">
            <template v-slot:format="percent">
              <p v-fontsize="16">{{ percent }}%</p>
              <p>设备故障率</p>
            </template>
          </a-progress>
        </a-col>
      </a-row>
      <a-divider dashed>故障统计</a-divider>
      <ve-line
        :data="listData"
        :settings="chartSettings"
        v-if="listData.rows.length != 0"
      ></ve-line>
      <a-empty v-else :image="simpleImage" />
      <a-divider dashed>故障详情</a-divider>
      <a-descriptions layout="vertical" bordered size="small">
        <a-descriptions-item
          :span="2"
          v-for="(item, index) in anomalyList"
          :key="index"
        >
          <template>
            <span slot="label">{{ item.gmtDataTime }}</span>
            <a-list
              itemLayout="horizontal"
              :dataSource="item.list"
              class="dispatch-list"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta>
                  <span slot="title">{{ item.instrumentName }}</span>
                  <!-- <div slot="description">故障时间：{{ item.gmtEnd }}</div> -->
                </a-list-item-meta>
                <div>故障时间：{{ item.gmtDataTime }}</div>
              </a-list-item>
            </a-list>
          </template>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
<script>
import { Empty } from "ant-design-vue";
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        gmtDataTime: "日期",
        normalNumber: "设备正常",
        anomalyNumber: "设备故障",
        percent: "故障率"
      },
      axisSite: { right: ["故障率"] },
      yAxisName: ["设备数", "故障率"],
      yAxisType: ["normal", "percent"],
      stack: { 设备: ["设备正常", "设备故障"] }
    };
    return {
      count: "", //统计数据
      anomalyList: "", //异常的表格
      listData: {
        columns: ["gmtDataTime", "normalNumber", "anomalyNumber", "percent"],
        rows: []
      }
    };
  },
  methods: {
    getTableData() {
      this.getCount();
      this.getAllReportPushInstrumentData();
      this.getAllReportPushInstrumentDataEx();
      // this.listData.rows = [
      //   { 日期: "2020-5-1", 设备正常: 3792, 设备故障: 3492, 故障率: 0.323 }
      // ];
    },
    getAllReportPushInstrumentData() {
      //设备数据列表
      let params = {
        reportPushId: this.$bus.$data.notification.id
      };
      this.$api.maintain.getAllReportPushInstrumentData(params).then(res => {
        if (res.data.state == 0) {
          let list = this.formatData(res.data.data);
          this.listData.rows = this.formatDataType(list);
        }
      });
    },
    formatData(data) {
      //整理出相同天的数据
      let listData = [];
      data.forEach(item => {
        let template = {
          gmtDataTime: "",
          list: []
        };
        let index = listData.findIndex(listItem => {
          return (
            this.$moment(item.gmtDataTime).format("YYYY-MM-DD") ==
            this.$moment(listItem.gmtDataTime).format("YYYY-MM-DD")
          );
        });

        if (index == -1) {
          template.gmtDataTime = this.$moment(item.gmtDataTime).format(
            "YYYY-MM-DD"
          );
          template.list = [item];
          listData.push(template);
        } else {
          listData[index].list.push(item);
        }
      });
      return listData;
    },
    formatDataType(data) {
      //整理出当天的异常数，正常数，异常率
      let listData = data.map(item => {
        let obj = {
          gmtDataTime: item.gmtDataTime,
          normalNumber: 0, //正常数
          anomalyNumber: 0, //异常数
          percent: ""
        };
        item.list.forEach(listItem => {
          if (listItem.status == 1) {
            obj.normalNumber++;
          } else {
            obj.anomalyNumber++;
          }
          obj.percent =
            obj.anomalyNumber /
            (obj.normalNumber + obj.anomalyNumber).toFixed(3); //异常数
        });
        return obj;
      });
      return listData;
    },
    getAllReportPushInstrumentDataEx() {
      //根据报表推送id查询设备故障数据列表
      let params = {
        reportPushId: this.$bus.$data.notification.id
      };
      this.$api.maintain.getAllReportPushInstrumentDataEx(params).then(res => {
        if (res.data.state == 0) {
          this.anomalyList = this.formatData(res.data.data);
        }
      });
    },
    getCount() {
      //根据报表推送id查询统计设备数、设备故障数、故障百分比
      let params = {
        reportPushId: this.$bus.$data.notification.id
      };
      this.$api.maintain.getCount(params).then(res => {
        if (res.data.state == 0) {
          this.count = res.data.data;
        }
      });
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>
