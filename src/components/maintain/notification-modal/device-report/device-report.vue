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
        :extend="chartExtend"
        v-if="listData.rows.length != 0"
      ></ve-line>
      <a-empty v-else :image="simpleImage" />
      <a-divider dashed>故障详情</a-divider>
      <!-- <a-descriptions bordered size="small">
        <a-descriptions-item
          :span="1"
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
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </template>
        </a-descriptions-item>
      </a-descriptions> -->
      <a-table
        size="middle"
        :loading="loading"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
      >
      </a-table>
    </a-card>
  </div>
</template>
<script>
const renderContent = (value, row) => {
  const obj = {
    children: value,
    attrs: {}
  };
  obj.attrs.rowSpan = row.mergeCol === 0 ? 0 : row.mergeCol;
  obj.attrs.colSpan = row.mergeCol === 0 ? 0 : 1;
  return obj;
};
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        gmtDataTime: "日期",
        normalNumber: "设备正常",
        anomalyNumber: "设备故障"
      },
      yAxisName: ["设备数"],
      yAxisType: ["normal"]
    };
    this.chartExtend = {
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "cross"
        // },
        formatter: function(params) {
          var res = params[0].name;
          for (var i = 0; i < params.length; i++) {
            res +=
              "<br>" +
              params[i].marker +
              params[i].seriesName +
              "：" +
              params[i].data[1];
            if (i == params.length - 1) {
              res +=
                "<br>故障率：" +
                (
                  (params[i - 1].data[1] /
                    (params[i - 1].data[1] + params[i].data[1])) *
                  100
                ).toFixed(2) +
                "%";
            }
          }

          return res;
        }
      }
    };
    return {
      count: "", //统计数据
      anomalyList: "", //异常的表格
      listData: {
        columns: ["gmtDataTime", "normalNumber", "anomalyNumber"],
        rows: []
      },
      deviceName: [],
      loading: false,
      tableData: [],
      columns: [
        {
          title: "日期",
          dataIndex: "gmtDataTime",
          customRender: renderContent
        },
        {
          title: "设备名称",
          dataIndex: "instrumentName"
        },
        {
          title: "设备型号",
          dataIndex: "deviceName"
        },
        {
          title: "生产厂家",
          dataIndex: "manufacturer"
        }
      ]
    };
  },
  methods: {
    integratedData(data) {
      // 获取所有的不同年龄值
      let arrId = [];
      data.forEach(i => {
        !arrId.includes(i.gmtDataTime) ? arrId.push(i.gmtDataTime) : arrId;
      });

      // //排序使相同gmtDataTime放在一起
      // let newData=[]
      // arrId.forEach(item=>{
      //   data.forEach((val,key,arr)=>{
      //     if(val.gmtDataTime==item){
      //       newData.push(val);

      //     }
      //   })
      // })
      // data=newData

      // 提前为每个时间值设置跨行数为0
      let arrObj = [];
      arrId.forEach(j => {
        arrObj.push({
          id: j,
          num: 0
        });
      });
      // 计算每个时间的可跨行数
      data.forEach(k => {
        arrObj.forEach(l => {
          k.gmtDataTime === l.id ? l.num++ : l.num;
        });
      });
      data.forEach(m => {
        arrObj.forEach(n => {
          if (m.gmtDataTime === n.id) {
            if (arrId.includes(m.gmtDataTime)) {
              m.mergeCol = n.num;
              arrId.splice(arrId.indexOf(m.gmtDataTime), 1);
            } else {
              m.mergeCol = 0;
            }
          }
        });
      });
      return data;
    },
    // 只针对相同时间字段合并列，时间位于第一列，columnIndex为0
    handleSpan(row, column, rowIndex, columnIndex) {
      if (columnIndex === 0) {
        return {
          rowspan: row.mergeCol === 0 ? 0 : row.mergeCol,
          colspan: row.mergeCol === 0 ? 0 : 1
        };
      }
    },
    async getTableData() {
      this.getCount();
      this.getAllReportPushInstrumentData();
      await this.geDictByParam();
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
          anomalyNumber: 0 //异常数
          // percent: ""
        };
        item.list.forEach(listItem => {
          if (listItem.status == 1) {
            obj.normalNumber++;
          } else {
            obj.anomalyNumber++;
          }
          // obj.percent =
          //   obj.anomalyNumber /
          //   (obj.normalNumber + obj.anomalyNumber).toFixed(3); //异常率
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
          let data = res.data.data.map(item => {
            item.gmtDataTime = this.$moment(item.gmtDataTime).format(
              "YYYY-MM-DD"
            );
            let nameItem = this.deviceName.find(name => {
              return item.deviceType == name.value;
            });
            item.deviceName = nameItem.name;
            return item;
          });
          this.tableData = this.integratedData(data);
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
    },
    async geDictByParam() {
      //获取设备名称
      await this.$api.common
        .geDictByParam({
          code: "DEVICE_TYPE"
        })
        .then(res => {
          if (res.data.state == 0) {
            this.deviceName = res.data.data;
          }
        });
    }
  }
};
</script>
