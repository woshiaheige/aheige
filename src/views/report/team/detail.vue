<template>
  <div class="team-detail">
    <!-- 头部 -->
    <a-row style="background:#fff" v-margin:bottom="16" class="header">
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
    </a-row>
    <!-- 头部end -->
    <a-row :gutter="16">
      <!-- 左侧 -->
      <a-col :span="8">
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

        <!-- 运维站点 -->
        <a-card title="运维站点" v-margin:top="16" style="background:#fff">
          <a-tag slot="extra" color="#f50">{{ stationList.length }}</a-tag>
          <a-list
            class="demo-loadmore-list"
            itemLayout="horizontal"
            :dataSource="stationList"
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
      </a-col>
      <!-- 左侧end -->

      <!-- 中间 -->
      <a-col :span="16" class="content">
        <a-row>
          <a-col class="brief" v-margin:bottom="16">
            <div>
              <span>南海A组</span>
              在该时段内共完成了
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
            ></ve-pie>
          </a-col>
          <a-col :span="12" style="background:#fff">
            <ve-pie
              :data="chartData2"
              :extend="chartExtend"
              :colors="colors"
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
            ></ve-histogram>
          </a-col>
        </a-row>
        <!-- 条形折线图end -->
      </a-col>
      <!-- 中间end -->
    </a-row>
  </div>
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
      }
    };
  },
  methods: {
    reBack() {
      this.$router.replace({ path: "/i-maintain/scheme" });
    }
  }
};
</script>
