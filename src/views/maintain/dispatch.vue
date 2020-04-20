<template>
  <div class="dispatch">
    <a-card title="星期一" :bordered="false">
      <a-list itemLayout="horizontal" :dataSource="data" class="dispatch-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">编辑</a>
          <a slot="actions">删除</a>
          <a-list-item-meta :description="item.description">
            <span slot="title">{{ item.title }}</span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="星期二" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
    </a-card>
    <a-card title="星期三" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
    </a-card>
    <a-card title="星期四" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
    </a-card>
    <a-card title="星期五" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
    </a-card>
    <a-card title="星期六" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
    </a-card>
    <a-card title="星期日" :bordered="false">
      <p><a-badge status="success" text="任务一" /></p>
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
