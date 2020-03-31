<template>
  <div id="workbench">
    <a-layout>
      <a-layout>
        <a-layout-header>
          <div class="header-body">
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
            <a-card title="待完成的任务">
              <a-table :columns="columns" :dataSource="data3">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                <span slot="tags" slot-scope="tags">
                  <a-tag
                    v-for="tag in tags"
                    :color="
                      tag === 'loser'
                        ? 'volcano'
                        : tag.length > 5
                        ? 'geekblue'
                        : 'green'
                    "
                    :key="tag"
                  >
                    {{ tag.toUpperCase() }}
                  </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a>Invite 一 {{ record.name }}</a>
                  <a-divider type="vertical" />
                  <a>Delete</a>
                  <a-divider type="vertical" />
                  <a class="ant-dropdown-link">
                    More actions <a-icon type="down" />
                  </a>
                </span>
              </a-table>
            </a-card>
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
              <div class="back-class">
                <a-icon type="left-square" /><a-icon type="right-square" />
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
        { title: "待完成任务", content: 5, color: "#3f8600" },
        { title: "今日计划任务", content: 3, color: "#cf1322" },
        { title: "所有完成任务", content: 120, color: "#1e1e1e" },
        { title: "待完成报告", content: 0, color: "#4f6fcf" }
      ],
      columns: [
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" }
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data3: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"]
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"]
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"]
        }
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
