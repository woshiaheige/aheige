<template>
  <div class="dispatch">
    <a-card title="星期一" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期二" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期三" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期四" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期五" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期六" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期日" :bordered="false">
      <a-list itemLayout="vertical" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">调度</a>
          <a-list-item-meta>
            <span slot="title">{{ item.title }}</span>
            <div slot="description">
              <p>小组1-张三</p>
              <p>方案1</p>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
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
