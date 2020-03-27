<template>
  <a-card :bordered="false" class="plan">
    <a-form layout="inline">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <a-form-item>
            <a-button
              v-margin:right="20"
              size="small"
              type="primary"
              icon="save"
              >保存计划</a-button
            >
            <a-button type="primary" size="small" icon="send"
              >立即执行</a-button
            >
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="小组">
            <a-select placeholder="请选择小组" v-width="150">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="客户">
            <a-select placeholder="请选择客户" v-width="150">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-layout style="background:#fff" class="plan-content">
      <!-- 左侧未计划站点 -->
      <a-layout-sider style="background:#fff">
        <div class="tab-bar">
          <a-popover>
            <template slot="content">
              这是提示
            </template>
            <div>
              <span v-margin:right="5" v-margin:left="10" class="tip"
                >未计划站点列表</span
              >
              <a-icon type="question-circle" />
            </div>
          </a-popover>
        </div>
        <draggable
          class="list-group"
          :list="readyPlan"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in readyPlan"
            :key="index"
          >
            {{ element.name }}
          </div>
        </draggable>
      </a-layout-sider>
      <!-- 中间表格 -->
      <a-layout-content v-margin:left="20">
        <div class="tab-bar ">
          <span class="tip">任务日历看板</span>
          <a-button type="primary" size="small" icon="table">周计划</a-button>
          <a-button type="primary" v-margin:left="5" size="small" icon="table"
            >月计划</a-button
          >
          <a-checkbox class="toggle-station">省略显示站点名</a-checkbox>
        </div>
        <week-drag-list :list="listData"></week-drag-list>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>
<script>
import draggable from "vuedraggable";
import weekDragList from "@/components/i-maintain/plan/week-drag-list";
export default {
  name: "plan",
  components: {
    draggable,
    weekDragList
  },
  data() {
    return {
      readyPlan: ["A", "B"],
      listData: []
    };
  },
  methods: {
    log(e) {
      console.log(e);
    },
    getReadyPlan() {
      //获取未分配的任务
      this.$api.iMaintain.getReadyPlan().then(res => {
        this.readyPlan = res.data.data;
      });
    },
    getWeekPlan() {
      //获取周任务
      this.$api.iMaintain.getWeekPlan().then(res => {
        console.log(res);
        this.listData = res.data.data;
      });
    }
  },
  mounted() {
    this.getReadyPlan();
    this.getWeekPlan();
  }
};
</script>
>
