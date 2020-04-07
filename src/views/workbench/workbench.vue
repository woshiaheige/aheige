<template>
  <div id="workbench">
    <a-layout>
      <a-layout>
        <div class="top-header">
          <!-- 头部 -->
          <a-layout-header>
            <div>
              <a-row :gutter="16">
                <a-col v-for="(item, index) in cardList" :key="index" :span="6">
                  <a-card>
                    <a-statistic
                      :title="item.title"
                      :value="item.content"
                      :valueStyle="{ color: item.color }"
                    >
                    </a-statistic>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </a-layout-header>
        </div>
        <div class="left-sider">
          <!-- 左侧sider -->
          <a-layout>
            <a-layout-sider width="35%">
              <div class="calendar-body">
                <a-card class="calendar-car">
                  <!--日历-->
                  <a-calendar>
                    <template slot="dateCellRender" slot-scope="value">
                      <span v-for="item in getListData(value)" :key="item.num">
                        <a-tooltip>
                          <template slot="title">
                            任务完成：{{ item.num }}
                          </template>
                          {{ item.num }}
                        </a-tooltip>
                      </span>
                    </template>
                    <template slot="monthCellRender"> </template>
                  </a-calendar>
                </a-card>
              </div>
              <div class="calendar-body">
                <a-card title="负责的站点(20个)">
                  <div
                    v-for="(item, index) in stationData"
                    :key="index"
                    class="station-list"
                  >
                    <p>{{ item.title }}</p>
                    <div class="item-box">
                      <span>{{ item.value1 }}</span
                      ><span>{{ item.value2 }}</span>
                    </div>
                  </div>
                </a-card>
              </div>
            </a-layout-sider>
            <!-- 中间content -->
            <a-layout-content class="center-content">
              <a-card title="待完成的任务">
                <a-descriptions
                  :column="2"
                  v-for="(item, index) in dutyData"
                  :key="index"
                >
                  <div slot="title">
                    <span>{{ item.name }}</span>
                    <span class="status">已创建</span>
                  </div>
                  <a-descriptions-item label="预定时间">
                    {{ item.time }}
                  </a-descriptions-item>
                  <a-descriptions-item label="任务站点">
                    {{ item.station }}
                  </a-descriptions-item>
                  <a-descriptions-item label="运维小组">
                    {{ item.team }}
                  </a-descriptions-item>
                  <a-descriptions-item label="任务项">
                    {{ item.num }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-pagination
                  v-margin:top="16"
                  :showTotal="total => `共 ${total} 条`"
                  :defaultCurrent="1"
                  :total="total"
                  style="text-align: right;"
                />
              </a-card>
            </a-layout-content>
          </a-layout>
        </div>
      </a-layout>
      <div class="right-sider">
        <!-- 右边sider -->
        <a-layout-sider>
          <div class="calendar-body">
            <a-card hoverable>
              <div class="right-top">
                <div>
                  <a-avatar
                    :size="64"
                    icon="user"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                </div>
                <div>
                  <span>Defined</span>
                  <span>未设置职位</span>
                  <span>暂无评分</span>
                </div>
              </div>
              <a-divider />
              <a-tag
                v-for="(item, index) in tagData"
                :key="index"
                color="blue"
                v-margin:bottom="5"
                >{{ item.title }}</a-tag
              >
            </a-card>
            <a-card title="系统消息">
              <div class="system-messages-back">
                <a-icon type="left-square" /><a-icon type="right-square" />
              </div>
              <div
                v-for="(item, index) in systemMessagesdata"
                :key="index"
                class="system-messages-item-box"
              >
                <div class="system-messages-add">
                  <a-icon type="plus-circle" />
                </div>
                <div class="system-messages-item">
                  <div>
                    <span>{{ item.title }}</span
                    ><span>{{ item.time }}</span>
                  </div>
                  <div>
                    <span>{{ item.content }}</span>
                  </div>
                </div>
              </div>
            </a-card>
          </div>
        </a-layout-sider>
      </div>
    </a-layout>
  </div>
</template>

<script>
import "@/assets/style/workbench/workbench.less";

export default {
  data() {
    return {
      cardList: [
        { title: "待完成任务", content: 5, color: "#3f8600" },
        { title: "今日计划任务", content: 3, color: "#cf1322" },
        { title: "所有完成任务", content: 120, color: "#1e1e1e" },
        { title: "待完成报告", content: 0, color: "#4f6fcf" }
      ],
      data: [
        {
          title: "Ant Design Title 1"
        },
        {
          title: "Ant Design Title 2"
        },
        {
          title: "Ant Design Title 3"
        },
        {
          title: "Ant Design Title 4"
        }
      ],
      stationData: [
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 32
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 3
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 5
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 8
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 12
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 15
        },
        {
          title: "务庄污水 (污水)",
          value1: 0,
          value2: 1
        },
        {
          title: "务庄污水 (污水)",
          value1: 1,
          value2: 3
        }
      ],
      systemMessagesdata: [
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        },
        {
          title: "新任务通知",
          time: "03-12 09:00",
          content: `站点[建铧玻璃1# (烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新(烟气)]增加了新任务[建铧玻璃1#(烟气)]增加了新`
        }
      ],
      tagData: [
        {
          title: "运维高手"
        },
        {
          title: "准时高手"
        },
        {
          title: "运维高手"
        },
        {
          title: "准时高手"
        },
        {
          title: "运维高手"
        },
        {
          title: "准时高手"
        }
      ],
      dutyData: [
        {
          name: "福能电厂(4#)",
          num: 1,
          station: "福能电厂(4#)",
          time: "2020-02-02",
          team: "南海A小组"
        },
        {
          name: "福能电厂(6#)",
          num: 1,
          station: "福能电厂(6#)",
          time: "2020-02-12",
          team: "南海B小组"
        },
        {
          name: "福能电厂(7#)",
          num: 1,
          station: "福能电厂(7#)",
          time: "2020-02-22",
          team: "南海c小组"
        }
      ],
      total: 10
    };
  },
  mounted() {},
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [{ num: "1" }];
          break;
        case 10:
          listData = [{ num: "2" }];
          break;
        case 15:
          listData = [{ num: "1" }];
          break;
        default:
      }
      return listData || [];
    }
  }
};
</script>
