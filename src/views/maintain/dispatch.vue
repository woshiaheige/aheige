<template>
  <div class="dispatch">
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div class="header-info">
            <span>本周任务数</span>
            <p>35</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info">
            <span>废气因子</span>
            <p>67</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info none-border">
            <span>废水因子</span>
            <p>83</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">本周任务</div>
        <div class="extra">
          <span>本日任务数：5</span>
        </div>
      </div>
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="星期一" key="1">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="星期二" key="2">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="星期三" key="3"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list></a-tab-pane
        >
        <a-tab-pane tab="星期四" key="4"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list></a-tab-pane
        >
        <a-tab-pane tab="星期五" key="5"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list></a-tab-pane
        >
        <a-tab-pane tab="星期六" key="6"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list></a-tab-pane
        >
        <a-tab-pane tab="星期日" key="7"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>小组1-张三 方案1</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list></a-tab-pane
        >
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
const data = [
  {
    title: "企业1 监测点1",
    description: "任务1 方案1 小组1 张三"
  },
  {
    title: "企业1 监测点1",
    description: "任务1 方案1 小组1 张三"
  },
  {
    title: "企业1 监测点1",
    description: "任务1 方案1 小组1 张三"
  },
  {
    title: "企业1 监测点1",
    description: "任务1 方案1 小组1 张三"
  },
  {
    title: "企业1 监测点1",
    description: "任务1 方案1 小组1 张三"
  }
];
export default {
  data() {
    return {
      data
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style></style>
