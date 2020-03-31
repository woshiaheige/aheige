<template>
  <div id="workbench">
    <a-layout>
      <a-layout>
        <a-layout-header>
          <div class="header-body">
            <div
              v-for="(item, index) of cardList"
              :key="index"
              class="Card-body"
            >
              <a-card
                :class="[item.CardClass]"
                :title="item.header"
                :bordered="false"
              >
                <p>{{ item.content }}</p>
              </a-card>
            </div>
          </div>
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="35%">
            <div class="calendar-body">
              <a-card>
                <a-calendar :fullscreen="false" @panelChange="onPanelChange"
              /></a-card>
            </div>
            <div class="calendar-body">
              <a-card title="负责的站点(20个)">
                <p>务庄污水(污水)</p>
                <p>务庄污水(污水)</p>
                <p>务庄污水(污水)</p>
                <p>务庄污水(污水)</p>
                <p>务庄污水(污水)</p>
                <p>务庄污水(污水)</p>
              </a-card>
            </div>
          </a-layout-sider>
          <a-layout-content width="100%">
            <a-card title="待完成的任务"></a-card>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <div class="layout-right">
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
              <a-tag color="blue">运维高手</a-tag>
              <a-tag color="blue">准时完成</a-tag>
              <a-tag color="blue">运维高手</a-tag>
              <a-tag color="blue">准时完成</a-tag>
              <a-tag color="blue">运维高手</a-tag>
              <a-tag color="blue">准时完成</a-tag>
            </a-card>
            <a-card title="系统消息">
              <div>
                <a-list :dataSource="data1">
                  <a-list-item slot="renderItem" slot-scope="item">{{
                    item
                  }}</a-list-item>
                </a-list>
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
    const data = [
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
    ];
    return {
      cardList: [
        { header: "待完成任务", content: 5, CardClass: "unfinished" },
        { header: "今日计划任务", content: 3, CardClass: "today" },
        { header: "所有完成任务", content: 120, CardClass: "all" },
        { header: "待完成报告", content: 0, CardClass: "report" }
      ],
      data,
      data1: [
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires."
      ]
    };
  },
  mounted() {},
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode);
    }
  }
};
</script>
