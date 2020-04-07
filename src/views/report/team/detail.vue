<template>
  <a-layout class="team-detail">
    <!-- 头部 -->
    <a-layout-header style="background:#fff" v-margin:bottom="16">
      <a-row type="flex" justify="space-between">
        <a-col>
          <span class="reback">
            <a-icon type="arrow-left" @click="reBack" />小组汇总
          </span>
          <a-button icon="arrow-left" v-margin="'0 10'">上一组</a-button>
          <a-button icon="arrow-right">下一组</a-button>
        </a-col>
        <a-col>
          <a-range-picker />
          <a-button icon="search" v-margin:left="5"></a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <!-- 头部end -->
    <a-row>
      <!-- 左侧 -->
      <a-layout>
        <a-layout-sider class="team-detail-sider">
          <!-- <a-col> -->
          <!-- 小组详情 -->
          <a-card title="小组详情" style="background:#fff;height:auto">
            <a-row class="group-detail">
              <a-col>
                <div class="item">
                  <div class="item-label">小组名称:</div>
                  <div v-margin:left="10" class="item-content">南海A组</div>
                </div>
              </a-col>
              <a-col>
                <div class="item">
                  <div class="item-label">小组成员:</div>
                  <div v-margin:left="10" class="item-content">
                    <div v-for="(item, index) of member" :key="index">
                      <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        alt=""
                        class="photo"
                      />
                      <div>郭大炮</div>
                    </div>
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-card>
          <!-- 小组详情end -->
          <div class="devide">
            <!-- 分割区域 -->
          </div>
          <!-- 运维站点 -->
          <a-card title="运维站点" style="background:#fff" :bordered="false">
            <a-tag slot="extra" color="#f50">{{ stationList.length }}</a-tag>
            <a-list
              class="demo-loadmore-list"
              itemLayout="horizontal"
              :dataSource="stationList"
              :bordered="false"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-icon
                  type="check"
                  slot="actions"
                  v-show="item.status == 'success'"
                />
                <div>{{ item.station }}</div>
              </a-list-item>
            </a-list>
          </a-card>
          <!-- 运维站点end -->
          <!-- </a-col> -->
        </a-layout-sider>
        <a-layout-content>
          <!-- 左侧end -->

          <!-- 中间 -->
          <a-col v-margin:left="16" class="content">
            <a-row>
              <a-col class="brief" v-margin:bottom="16">
                <div>
                  <span>南海A组</span>
                  在该时间段内共完成了
                  <span>18</span>
                  个任务，共运维了
                  <span>13</span>
                  个站点，
                  <span>7</span>
                  个站点未运维
                </div>
              </a-col>
            </a-row>
            <!-- 饼图 -->
            <a-row>
              <a-col :span="12" style="background:#fff">
                <ve-pie
                  :data="chartData"
                  :extend="chartExtend"
                  :colors="colors"
                  :judge-width="true"
                ></ve-pie>
              </a-col>
              <a-col :span="12" style="background:#fff">
                <ve-pie
                  :data="chartData2"
                  :extend="chartExtend"
                  :colors="colors"
                  :judge-width="true"
                ></ve-pie>
              </a-col>
            </a-row>
            <!-- 饼图end -->
            <!-- 条形折线图 -->
            <a-row style="background:#fff" v-margin:top="16">
              <a-col :span="22">
                <ve-histogram
                  :data="moreData"
                  :settings="moreSettings"
                  :judge-width="true"
                ></ve-histogram>
              </a-col>
            </a-row>
            <!-- 条形折线图end -->

            <!-- 任务表格 -->
            <a-table
              style="background:#fff"
              rowKey="id"
              :columns="columns"
              :dataSource="tableData"
              v-margin:top="16"
              :pagination="false"
              :expandedRowKeys="['0']"
            >
              <span slot="status" slot-scope="_, row">
                <a-tag :color="row.status == '准时完成' ? '#87d068' : ''">{{
                  row.status
                }}</a-tag>
              </span>
              <span slot="action" slot-scope="row">
                <a @click="viewMission(row)">查看</a>
              </span>
            </a-table>
            <!-- 任务表格end -->
          </a-col>
          <!-- 中间end -->
        </a-layout-content>
      </a-layout>
    </a-row>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      form: "",
      member: [1, 2, 3, 4], //小组成员信息
      stationList: [
        {
          station: "务庄污水(污水)",
          status: "success"
        },
        {
          station: "佛山市南海区桂城年顺景酒楼",
          status: ""
        },
        {
          station: "务庄污水(污水)",
          status: "success"
        }
      ], //站点信息
      //饼图数据
      colors: ["#1890ff", "orange", "#cf1322", "purple"],
      chartData: {
        columns: ["name", "value"],
        rows: [
          { name: "准时完成", value: 50 },
          { name: "逾期完成", value: 8 }
        ]
      },
      chartData2: {
        columns: ["name", "value"],
        rows: [{ name: "普通任务", value: 50 }]
      },
      chartExtend: {
        legend: {
          top: 50
        }
      },
      moreData: {
        //条形图，折线图数据
        columns: ["name", "任务量", "普通任务", "突发任务"],
        rows: [
          { name: "02-02", 任务量: 93, 普通任务: 83, 突发任务: 15 },
          { name: "02-03", 任务量: 53, 普通任务: 43, 突发任务: 4 },
          { name: "02-04", 任务量: 93, 普通任务: 90, 突发任务: 5 },
          { name: "02-05", 任务量: 73, 普通任务: 67, 突发任务: 9 },
          { name: "02-06", 任务量: 92, 普通任务: 81, 突发任务: 1 },
          { name: "02-07", 任务量: 92, 普通任务: 76, 突发任务: 4 },
          { name: "02-08", 任务量: 12, 普通任务: 9, 突发任务: 7 },
          { name: "02-09", 任务量: 82, 普通任务: 73, 突发任务: 5 },
          { name: "02-10", 任务量: 72, 普通任务: 58, 突发任务: 1 }
        ]
      },
      moreSettings: {
        stack: { 用户: ["普通任务", "突发任务"] },
        showLine: ["任务量"]
      },
      //任务表格
      columns: [
        {
          title: "任务名称",
          dataIndex: "stationName",
          key: "stationName"
        },
        {
          title: "任务项",
          dataIndex: "missionNum",
          key: "missionNum"
        },
        {
          title: "完成状态",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "完成时间",
          dataIndex: "finishTime",
          key: "finishTime"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          stationName: "明珠玻璃厂(烟气) - 18/03/05",
          missionNum: "20",
          status: "准时完成",
          finishTime: "2018-03-05 16:45:11"
        }
      ],
      total: 0
    };
  },
  methods: {
    reBack() {
      this.$router.replace({ path: "/report/team" });
    },
    viewMission() {},
    getTableData() {
      this.$api.report.getTeamMissonList().then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
