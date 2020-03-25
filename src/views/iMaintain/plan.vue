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
              <a-select-option value="2">
                Option 2
              </a-select-option>
              <a-select-option value="3">
                Option 3
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="客户">
            <a-select placeholder="请选择客户" v-width="150">
              <a-select-option value="1">
                Option 1
              </a-select-option>
              <a-select-option value="2">
                Option 2
              </a-select-option>
              <a-select-option value="3">
                Option 3
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
        <draggable class="list-group" :list="plan" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element, index) in plan"
            :key="index"
          >
            {{ element }}
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
      plan: ["A", "B"],
      listData: [
        {
          name: "周日",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周一",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周二",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周三",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周四",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周五",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        },
        {
          name: "周六",
          list: [
            "Australian walks 100km after outback crash.",
            "Man charged over missing wedding girl.",
            "Los Angeles battles huge wildfires."
          ]
        }
      ]
    };
  },
  methods: {
    log(e) {
      console.log(e);
    }
  }
};
</script>
>
